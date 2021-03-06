import Link from 'next/link';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuth,{ PUBLIC } from '../components/withAuth';
import CrudTableObject from '../components/CrudTableObject';
import ListNav from '../components/ListNav';
import Layout from '../components/Layout';
import { TabContent, TabPane, Card,Row, Col } from 'reactstrap';
//import { getActivityLog, getMetrics, getStats } from '../actions/analyticActions';

class DataPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeTab:0,
          list:[
            {name:'users',readAPI:'find'},
            {name:'groups',readAPI:'find'}
          ],
          activeObject:null
        };
        this.state.activeObject = this.state.list[this.state.activeTab];

    }








    setActiveTab = (tab) =>{
        const { list } = this.state;
        const newActiveObject = list[tab];
        this.setState({activeTab:tab,activeObject:newActiveObject});
    }







    loadTableData(activeTab,myTab){
      const tabInt = parseInt(activeTab);
      return tabInt === myTab;
    }

    render () {
        const { user } = this.props;
        const {activeTab, list } = this.state;
        const isAuth = user ? user.authenticated : false;
        const activeObject = list[activeTab];

        const onSetActiveTab = this.setActiveTab;
        return (

                <Layout>
                    <ListNav setActiveTab={onSetActiveTab} listArray={list} activeTab={activeTab} />

                    <CrudTableObject activeObject={activeObject} activeTab={activeTab} />

                </Layout>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default compose(withAuth(PUBLIC),connect(mapStateToProps))(DataPage);
