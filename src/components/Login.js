import React, { Component } from 'react';
import { initStore } from '../store';
import { login } from '../actions/authActions';
import AuthForm from '../components/AuthForm';
import Router from 'next/router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth,{ PUBLIC } from '../components/withAuth';

class Login extends Component {

  state = {
    username: '',
    password: '',
    errorMessages: [],
    isRegister:false,
    resetPassword:false,
    changePassword:false,
    isLoading:false
  }
  _isMounted = false;

  redirect(){
    const {user} = this.props;
    console.log("redirecting",user);
    if(user.authenticated) {
      window.location.href = '/';
      //Router.push("/");
    }
  }


  handleOnChange = (e) => {
    if(this._isMounted) this.setState({[e.target.name]: e.target.value});
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()

    if(this._isMounted) this.setState({isLoading:true,errorMessages:[]});
    const { dispatch, next } = this.props;
    const payload = {
      username: this.state.username,
      password: this.state.password
    };

    dispatch(login(payload,this.props.next)).then(()=>{
      this.setLoading(false);
      this.redirect();
    })
    .catch(errMessage => {
        console.log(errMessage);
        if(this._isMounted)
          this.setState({errorMessages: [errMessage],isLoading:false});
    });


  }

  setLoading = (bool) => {
      if(this._isMounted) this.setState({isLoading:bool});
  }

  static  async getInitialProps(context) {
      const {query} = context;
      return{
          next: query.next
      };
  }


  render () {
    const {username, password, errorMessages,isRegister,resetPassword,changePassword,isLoading} = this.state;

    return (
      <div className="container">
        <h1 className="text-center">Login</h1>
        <div>
          <AuthForm {...{username, password, errorMessages, isRegister, resetPassword,changePassword, isLoading,onChange: this.handleOnChange, onSubmit: this.handleLoginSubmit}} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user
  }
}

export default compose(withAuth(PUBLIC),connect(mapStateToProps))(Login);
