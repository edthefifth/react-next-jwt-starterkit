import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initStore } from '../store';
import Layout from '../components/Layout';
import Login from '../components/Login';


class LoginPage extends Component 
{
  render () {
    return (
      <Layout>  
        <Login />
      </Layout>
    )
  }
}

export default connect()(LoginPage)
