import Link from 'next/link';
import React, { Component, Fragment } from 'react';
import DynamicTable from '../components/DynamicTable';
import ErrorMessages from '../components/ErrorMessages';
import SuccessMessages from '../components/SuccessMessages';
import Loading from '../components/Loading';
import { connect } from 'react-redux';
import { Container, Row, Col, Input,InputGroup,InputGroupButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import {CrudREAD} from '../actions/crudActions';
import { refreshJWT } from '../actions/authActions';
import Router from 'next/router';
import { RT_STORAGE } from '../api/storage';
import { getCookie } from '../util/cookie';
import Select from 'react-select';


class CrudTableObject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageLoaded:false,
            headers:null,
            filters:{},
            isQuerying:true,
            errorMessages:[],
            successMessages:[],
            currentTab:null,
            queryLimit:50,
            currentQuerySkip:0,
            queryDropdownOpen:false,
            dropdownField:'',
            dropdownValue:'',
            activeQuery:{}
        };
    }

    toggleQueryDropDown = () => {
        const {queryDropdownOpen} = this.state;
        this.setState({queryDropdownOpen:!queryDropdownOpen});
    }

    toggleQuerying = () => {
      const {isQuerying} = this.state;
      this.setState({isQuerying:!isQuerying});
    }


    onQuery = (skip = null) => {
       const {dispatch, crud,activeObject, activeTab, user, jwt } = this.props;
       const {activeQuery,queryLimit,currentQuerySkip} = this.state;
       const readAPI = activeObject.readAPI ? activeObject.readAPI : null;
       const querySkip = skip? skip :currentQuerySkip;
       if(!readAPI) return null;
       this.setState({isQuerying:true});
       console.log('querying',activeQuery,skip);
       dispatch(CrudREAD(readAPI,{query:activeQuery,object:activeObject.name,skip:querySkip,limit:queryLimit})).then(()=>{
         this.setState({isQuerying:false,currentQuerySkip:querySkip});
         this.setAvailableFilters();
       }).catch( (err) => {
         console.log(err);
         if(err === 'jwt expired'){

            dispatch(refreshJWT(user.name)).then(()=>{
              this.setState({errorMessages:[],isQuerying:true}, function() {
                this.onQuery();
              });

            }).catch((err) => {
              console.log("refreshJWT",err);
              Router.push(`/login`);
            });
         } else {
           this.setState({errorMessages:[err],isQuerying:false});
           Router.push(`/login?next=data&error=${err}`);
         }
       })

    };
    /*
    onUpdate = (e) => {
      const {dispatch, crud, query } = this.props;
      const API = crud.update ? crud.update : null;
      if(!API) return null;
      else {
        console.log(e);
      }
    };

    onDelete = (e) => {
      const {dispatch, crud} = this.props;
      const API = crud.update ? crud.update : null;
      if(!API) return null;
      else {
        console.log(e);
      }
    };

    onCreate = (e) => {
      const {dispatch, createAPI} = this.props;
      if(!createAPI) return null;
      else {
        console.log(e);
      }
    };*/

    addToQuery = (object) => {
      const {activeQuery,filters={}} = this.state;

      for(var field in object){
        if(filters && filters[field] === true){
          object[field]=parseFloat(object[field]);
        }
      }

      const newQuery = {...activeQuery,...object};


      try{
        this.setState({activeQuery:newQuery},function() {
          this.onQuery(0);
        });

      }
      catch(err){
        console.log(err);
        this.setState({errorMessage:err.message});
      }
    }

    changeQuery = (selectedObjects) => {
        const {activeQuery} = this.state;
        console.log("selectedObjects",selectedObjects);
        let newQuery = {};
        if(selectedObjects && selectedObjects.length > 0){
          for(var selobj of selectedObjects){
            if(activeQuery[selobj.id])
              newQuery[selobj.id]=activeQuery[selobj.id];
          }
        }
        console.log("selectedObjects & newQuery",selectedObjects,newQuery);

      try{
        this.setState({activeQuery:newQuery},function() {
          this.onQuery(0);
        });
      }
      catch(err){
        console.log(err);
        this.setState({errorMessage:err.message});
      }

    }

    changeDropdownField = (e) => {
      console.log("dropdownField",e.currentTarget.textContent);
      this.setState({dropDownField: e.currentTarget.textContent});
    }

    onPaginate = (pageNumber) => {
        const {queryLimit} = this.state;

        const skip = (((pageNumber-1) * queryLimit),0);
        this.onQuery(skip);
    }

    isNumber = (n) => { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

    setAvailableFilters = () => {
      const {queryData} = this.props;
      const queryResults = queryData.data ? queryData.data : [] ;
      if(queryResults && queryResults.length > 0){
        const filters = {};
        for(var key in queryResults[0])
        {
          filters[key]=this.isNumber(queryResults[0][key]);

        }
        this.setState({filters:filters});
      }
    }

    getSelectedFilters = () => {
      const {activeQuery = {}} = this.state;
      console.log(activeQuery);
      let filters = [];
      for(var key in activeQuery){
        let value = activeQuery[key];
        let label = `${key}: ${value}`;
        filters.push({value:value,label:label, id:key});
      }
      return filters;
    }



    getDynamicTable = () => {
            const { errorMessages,successMessages, isQuerying, currentTab, queryLimit, currentQuerySkip, dropdownField, dropdownValue, headers } = this.state;
            const { activeObject, queryData, activeTab } = this.props;
            const name = activeObject.name;
            const title = activeObject.name.replace(/_/g," ");
            const queryResults = queryData.data ? queryData.data : [] ;
            const queryTotal = queryData.paginate ? queryData.paginate.total : 0 ;
            const loading = isQuerying || currentTab !== activeTab;
            const currentPage = (currentQuerySkip/queryLimit) + 1;
            const filters = this.getSelectedFilters();
            console.log(filters);
            return (
                  <Fragment>
                        <Row className="mb-sm-1 mt-sm-1">
                          <Col>
                            <ErrorMessages messages={errorMessages}/>
                            <SuccessMessages messages={successMessages}/>
                          </Col>
                        </Row>

                        <Row className="mb-sm-1 d-flex justify-content-between">
                          <Col xs="6" sm="3"><p className="text-dark"><span className='badge badge-primary'>{queryTotal} {title}</span></p></Col>
                          <Col xs="auto" sm="auto">

                            { filters && filters.length > 0 &&

                                <Select isMulti={true} options={filters} value={filters} onChange={this.changeQuery} />

                            }
                          </Col>
                        </Row>

                        <DynamicTable  onUpdateQuery={this.addToQuery} currentPage={currentPage} onPaginate={this.onPaginate} loading={loading} name={name}  queryResults={queryResults} headers={headers} pageLimit={queryLimit} totalRecords={queryTotal}   />


                  </Fragment>
            );
    }


    componentDidMount =()=>{
        const { activeTab, activeObject } = this.props;
        const initHeaders = activeObject && activeObject.headers ? activeObject.headers : null
        this.setState({isQuerying:true,currentTab:activeTab, headers:initHeaders},function(){
          this.onQuery();
        });

    }

    componentDidUpdate = () => {
      const { activeTab } = this.props;
      const { currentTab, isQuerying } = this.state;
      if(activeTab !== currentTab && !isQuerying){
        this.setState({headers:null});
        this.onQuery(0);
        this.setState({currentTab:activeTab});
      }
    }

    render () {
      const { activeTab } = this.props;
      const { currentTab, isQuerying } = this.state;
        const table = activeTab === currentTab ? this.getDynamicTable() : <Loading />;
        return (
                  <Fragment>
                  {table}
                  </Fragment>
        );
    }
}



const mapStateToProps = (state) => {
  return {
    queryData: state.crud.read,
    user:state.auth.user,
    jwt:state.auth.jwt
  };
};


export default connect(mapStateToProps)(CrudTableObject);
