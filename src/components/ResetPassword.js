import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { resetPassword } from '../actions/authActions';
import AuthForm from '../components/AuthForm';
import withAuth,{ PUBLIC } from '../components/withAuth';
import ErrorMessages from '../components/ErrorMessages';
import SuccessMessages from '../components/SuccessMessages';


class ResetPassword extends React.Component {   
    
    
    constructor (props) {
        super(props);
        
        this.state = {
            newPassword: '',
            verifyPassword:'',
            errorMessages: [],
            successMessages:[],
            isRegister:false,
            resetPassword:true,
            changePassword:false,
            isLoading:false,
            resetComplete:false
        };
    }
    
    
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({isLoading:true});
        const { dispatch, next } = this.props;
        const payload = {
            action:'resetPwd',
            value:{
                token: this.props.token,
                newPassword: this.state.newPassword,
                verifyPassword:this.state.verifyPassword
            }
        };

        
        dispatch(resetPassword(payload))
        .then(()=>{
            this.setState({errorMessages: [],successMessages:["Reset Successful"],isLoading:false,'resetComplete':true});
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
        const {password, errorMessages,isRegister,resetPassword,isLoading,resetComplete} = this.state;
        
        return (
            <div className='container'>    
                <h1 className="text-center">Reset Password</h1>   

                <SuccessMessages messages={this.state.successMessages} />  
                { !resetComplete &&
                <AuthForm {...{password, errorMessages, isRegister, resetPassword, isLoading, onChange: this.handleChange, onSubmit: this.handleSubmit}} />
                }
                {resetComplete &&
                    <div className='row'>
                        <div className='col-sm-4 offset-sm-4'>
                            <Link href='/login'><a className='text-center btn btn-success mx-auto d-block'>Proceed to login &#x3E;&#x3E;</a></Link>
                        </div>    
                    </div>    
                }
                        
            </div>
        );
    }

}



export default compose(withAuth(PUBLIC),connect())(ResetPassword);

