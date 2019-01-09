import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initStore } from '../store';
import { login } from '../actions/authActions';
import AuthForm from '../components/authForm';
import Layout from '../components/Layout';

class Login extends Component {

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

  handleLoginSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const payload = {
      alias: this.state.alias,
      password: this.state.password
    }
    dispatch(login(payload))
      .catch(err => {
        console.log('Login failed: ', err)        
        this.setState({errorMessage: err.message})
      })
  }

  render () {
    const {alias, password, errorMessage} = this.state;

    return (
      <Layout>  
        <h1 className="text-center">Login to WISL</h1>    
        <div>
          <AuthForm {...{alias, password, errorMessage, onChange: this.handleOnChange, onSubmit: this.handleLoginSubmit}} />
        </div>
      </Layout>
    )
  }
}

export default connect()(Login)
