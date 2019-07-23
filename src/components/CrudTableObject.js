import Link from 'next/link';
import React, { Component } from 'react';
import DynamicTable from '../components/DynamicTable';
import ErrorMessages from '../components/ErrorMessages';
import SuccessMessages from '../components/SuccessMessages';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';


class CrudTableObject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageLoaded:false,
            query:{},
            errorMessages:[],
            successMessages:[]
        };
    }


    onCreate = (e) => {
      const {dispatch, createAPI} = this.props;
      if(!createAPI) return null;
      else {
        console.log(e);
      }
    };

    changeQuery = (e) => {
      try{
        const query = JSON.parse(e.target.value);
        this.setState({query:query});
      }
      catch(err){
        console.log(err);
        this.setState({errorMessage:err.message});
      }

    }






    render () {
        const { onCreate, onDelete, onQuery, onUpdate, title, loadData=false, createAPI = null,readAPI = null,updateAPI=null,deleteAPI=null ,subtitle = 'data table'  } = this.props;
        const { pageLoaded, query ,errorMessages,successMessages} = this.state;
        return (
                  <Container className="mt-sm-3">

                        <Row className="mb-sm-1">
                            <Col>
                                <h2 className="text-capitalize">{title}</h2>
                                <p className='text-muted font-italic'>{subtitle}</p>
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
                            <input type='hidden' value={JSON.stringify(query)} onChange={this.changeQuery}/>
                          </Col>
                        </Row>

                        <DynamicTable crud={{read:readAPI,update:updateAPI,delete:deleteAPI}} query={query} loadData={loadData} />


                  </Container>

        );
    }
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(CrudTableObject);
