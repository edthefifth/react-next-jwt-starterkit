import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { changePassword } from '../actions/authActions';
import withAuth from '../components/withAuth';
import SubmitLoader from '../components/SubmitLoader';
import SuccessMessages from '../components/SuccessMessages';
import AuthForm from '../components/AuthForm';

class ChangePassword extends React.Component {   
    
    
    constructor (props) {
        super(props);
        this.state = {
            'password':'',
            'newPassword':'',
            'verifyPassword':'',
            'errorMessages':[],
            'successMessages':[],
            isRegister:false,
            resetPassword:false,
            changePassword:true,
            isLoading:false,
            userObject:props.user || {}
        };
    }
    
    static async getInitialProps (context) {
        const { isServer, store, req, res } = context;
        const auth = store.getState().auth;
    };
    
    
    
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({isLoading:true});
        const { dispatch, next, user} = this.props;
        const { userObject, password, newPassword, verifyPassword} = this.state;
        console.log(user, userObject);
        const payload = {
            action:'changePwd',
            value:{
                uid: userObject.uid,
                oldPassword:password,
                newPassword: newPassword,
                verifyPassword:verifyPassword
            }
        };

        
        dispatch(changePassword(payload))
        .then(()=>{
            this.setState({errorMessages: [],successMessages:["Password Updated"],isLoading:false});
        })
        .catch(err => {  
            this.setState({errorMessages: [err.message],isLoading:false});
        });
    }
    
    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    render () {
        
        const {password, errorMessages,isRegister,resetPassword,changePassword,isLoading} = this.state;
        return (
                
                <div>    
                    <h1 className="text-center">Change Password</h1>     
                    <SuccessMessages messages={this.state.successMessages} />  
                    <AuthForm {...{password, errorMessages, isRegister, resetPassword,changePassword, isLoading,onChange: this.handleChange, onSubmit: this.handleSubmit}} />
                </div>
        );
    }

}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default compose(withAuth(),connect(mapStateToProps))(ChangePassword);


