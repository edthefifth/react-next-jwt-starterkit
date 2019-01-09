import React, { Component } from 'react'
import { connect } from 'react-redux';
import { initStore } from '../store'
import { register } from '../actions/authActions';
import AuthForm from '../components/authForm'
import Layout from '../components/Layout';

class Register extends Component {

  state = {
    alias: '',
    password: '',
    errorMessage: ''
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const payload = {
      alias: this.state.alias,
      password: this.state.password
    };
    dispatch(register(payload))
      .catch(err => {
        console.log('Register failed: ', err)        
        this.setState({errorMessage: err.message})
      })
  }

  render () {
    const {alias, password, errorMessage} = this.state;

    return (
      <Layout>        
        <h1 className="text-center">Registration</h1>    
        <div>
          <AuthForm {...{alias, password, errorMessage, onChange: this.handleOnChange, onSubmit: this.handleRegisterSubmit}} />
        </div>
      </Layout>  
    )
  }
}

export default connect()(Register)
