import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth,{ PUBLIC } from '../components/withAuth';
import SubmitLoader from '../components/SubmitLoader';
import ErrorMessages from '../components/ErrorMessages';
import SuccessMessages from '../components/SuccessMessages';
import { sendEmailReset } from '../actions/authActions';

class EmailResetPassword extends React.Component {   
    
    
    constructor (props) {
        super(props);
        this.state = {
            'email':'',
            'errorMessages':[],
            'successMessages':[]
        }
    }
    
    
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isLoading:true});
        const { dispatch, next } = this.props
        const payload = {
            action: 'sendResetPwd',
            value: {email:this.state.email}
        };
        dispatch(sendEmailReset(payload,this.props.next))
        .then(()=>{
            this.setState({errorMessages: [],successMessages:["Reset link sent to your email address"],isLoading:false});
            
        })
        .catch(err => {  
            this.setState({errorMessages: [err.message],successMessages:[],isLoading:false});
        });
    }
    
    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    render () {
        
        
        const { email, errorMessages, successMessages } = this.state;
        const emailAddr = 'support@whistleai.io';
        return (
            
            <div className="container">
                <h3 className="text-center">Password Reset <i className="fa fa-envelope" aria-hidden="true"></i></h3>
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 border border-dark p-3 bg-light">

                            <ErrorMessages messages={this.state.errorMessages} />  
                            <SuccessMessages messages={this.state.successMessages} />  
                            <p className="text-primary"><small>In order to reset your password, enter your email below and submit. If you have not set up and verified an email for your account, please send an email to <Link href="mailto:{emailAddr}"><a className="text-info">{emailAddr}</a></Link> and we will try and verify you another way.</small></p>
                            
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <input className="form-control border border-dark" type='text' name='email' placeholder="Enter Email" onChange={this.handleChange} />
                                </div>

                                <div className='mt-3 mb-3'>
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </div>

                            </form>
                            <p className="text-secondary"><small>* Note: For security purposes, if you enter an email not registered in or system, this function will succeed but reset email will fail to send. </small></p>  
                    </div>
                </div>
            </div>    
        );
    }

}



export default compose(withAuth(PUBLIC),connect())(EmailResetPassword);


