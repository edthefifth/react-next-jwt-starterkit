import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initStore } from '../store';
import { login } from '../actions/authActions';
import AuthForm from '../components/AuthForm';


class Login extends Component {

  state = {
    alias: '',
    password: '',
    errorMessages: [],
    isRegister:false,
    resetPassword:false,
    changePassword:false,
    isLoading:false
  }

  setLoading = (bool) =>{
      this.setState({isLoading:bool});
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()

    this.setLoading(true);
    const { dispatch, next } = this.props;
    const payload = {
      alias: this.state.alias,
      password: this.state.password
    };
    /*
    dispatch(login(payload,this.props.next))
    .then(()=>{
        this.setLoading(false);
    })
    .catch(err => {
        this.setState({errorMessages: [err.message],isLoading:false});
    });*/
  }

  setLoading = (bool) =>{
      this.setState({isLoading:bool});
  }

    static  async getInitialProps(context) {
        const {query} = context;
        return{
            next: query.next
        };
    }


  render () {
    const {alias, password, errorMessages,isRegister,resetPassword,changePassword,isLoading} = this.state;

    return (
      <div className="container">
        <h1 className="text-center">Login</h1>
        <div>
          <AuthForm {...{alias, password, errorMessages, isRegister, resetPassword,changePassword, isLoading,onChange: this.handleOnChange, onSubmit: this.handleLoginSubmit}} />
        </div>
      </div>
    )
  }
}

export default connect()(Login)
