import Link from 'next/link';
import React, { Component, Fragment } from 'react';
import DynamicTable from '../components/DynamicTable';
import ErrorMessages from '../components/ErrorMessages';
import SuccessMessages from '../components/SuccessMessages';
import Loading from '../components/Loading';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {CrudREAD} from '../actions/crudActions';
import { refreshJWT } from '../actions/authActions';
import Router from 'next/router';
import { RT_STORAGE } from '../api/storage';
import { getCookie } from '../util/cookie';


class CrudTableObject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageLoaded:false,
            headers:{},
            isQuerying:true,
            errorMessages:[],
            successMessages:[],
            currentTab:null,
            queryLimit:50,
            currentQuerySkip:0
        };
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
       console.log('querying',getCookie(RT_STORAGE));
       dispatch(CrudREAD(readAPI,{query:activeQuery,object:activeObject.name,skip:querySkip,limit:queryLimit})).then(()=>{
         this.setState({isQuerying:false,currentQuerySkip:querySkip});
       }).catch( (err) => {
         console.log(err);
         if(err === 'jwt expired'){

            dispatch(refreshJWT(user.name)).then(()=>{
              this.setState({errorMessages:[],isQuerying:true});
              this.onQuery();
            }).catch((err) => {
              console.log("refreshJWT",err);
              Router.push(`/login`);
            });
         } else {
           this.setState({errorMessages:[err],isQuerying:false});

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

    changeQuery = (e) => {
      try{
        const query = JSON.parse(e.target.value);
        this.setState({activeQuery:query});
        this.onQuery();
      }
      catch(err){
        console.log(err);
        this.setState({errorMessage:err.message});
      }

    }

    onPaginate = (pageNumber) => {
        const {queryLimit} = this.state;

        const skip = (((pageNumber-1) * queryLimit),0);
        this.onQuery(skip);
    }

    getDynamicTable = () => {
            const { activeQuery,errorMessages,successMessages, isQuerying, currentTab, queryLimit, currentQuerySkip } = this.state;
            const { activeObject, queryData, activeTab } = this.props;
            const name = activeObject.name;
            const title = activeObject.name.replace(/_/g," ");
            const queryResults = queryData.data ? queryData.data : [] ;
            const queryTotal = queryData.paginate ? queryData.paginate.total : 0 ;
            const loading = isQuerying || currentTab !== activeTab;
            const currentPage = (currentQuerySkip/queryLimit) + 1;
            const headers = activeObject && activeObject.headers ? activeObject.headers : null
            return (
                  <Container className="mt-sm-3">

                        <Row className="mb-sm-1">
                            <Col>
                                <h2 className="text-capitalize">{title}</h2>
                            </Col>
                        </Row>
                        <Row className="mb-sm-1">
                          <Col>
                            <ErrorMessages messages={errorMessages}/>
                            <SuccessMessages messages={successMessages}/>
                          </Col>
                        </Row>
                        <Row className="mb-sm-1">
                          <Col></Col>
                          <Col>
                            <label>Filters:</label>
                            <input type='hidden' value={JSON.stringify(activeQuery)} onChange={this.changeQuery}/>
                          </Col>
                        </Row>

                        <DynamicTable currentPage={currentPage} onPaginate={this.onPaginate} loading={loading} name={name}  queryResults={queryResults} headers={headers} pageLimit={queryLimit} totalRecords={queryTotal}   />


                  </Container>
            );
    }


    componentDidMount =()=>{
        const { activeTab } = this.props;
        this.setState({isQuerying:true,currentTab:activeTab});
        this.onQuery();
    }

    componentDidUpdate = () => {
      const { activeTab } = this.props;
      const { currentTab, isQuerying } = this.state;
      if(activeTab !== currentTab && !isQuerying){
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
