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
          activeTab:'1'
        };

    }


    getList = () => {
        return [{name:'users'},{name:'groups'}]
    };






    setActiveTab = (tab) =>{
        this.setState({activeTab:tab});
    }





    componentDidMount =()=>{

    }

    render () {
        const { user } = this.props;
        const {activeTab} = this.state;
        const isAuth = user ? user.authenticated : false;
        const list = this.getList();
        let objectPanes = list.map( (listItem,itemIndex) => {
          <TabPane tabId={(itemIndex+1)} key={itemIndex}>
            <CrudTableObject total={listItem} />
          </TabPane>
        });
        const onSetActiveTab = this.setActiveTab;
        return (

                <Layout>
                    <ListNav setActiveTab={onSetActiveTab} listArray={list} activeTab={activeTab} />

                    <TabContent activeTab={activeTab}>
                    {objectPanes}
                    </TabContent>
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
