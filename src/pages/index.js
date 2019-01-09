import React, { Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import Layout from '../components/Layout';
import withAuth,{ PUBLIC } from '../components/withAuth';
import Storage,{ FEATHERS_STORAGE } from '../api/storage'

class Index extends Component {   
    
    
    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            auth:{
                user:  {
                    alias:null,
                    jwt:null,
                    authenticated:false,
                    groups:{}
                }
            }
        }
    }
    
    
    
    render() {
        
        const { user } = this.props;
        const name = user ? `${user.alias}` : null;
        const isAuth = user ? user.authenticated : false;
        const isLoading = this.props.loaded ? this.props.loaded  : false;
        return (
            <Layout>
                <div>
                 { isAuth ? <h1>Welcome, {name}</h1> : <button class="btn btn-warning">Sign Up</button> }

                </div>
                <div>
                    <hr/>
                    <h3>Your Info</h3>
                    
                    <ul className="list-group">

                    </ul>
                </div>

            </Layout>    
        );
    }
};

/*
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loaded:state.loaded
  }
}*/

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default compose(withAuth(PUBLIC),connect(mapStateToProps))(Index);
