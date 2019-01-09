import Link from 'next/link';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import withAuth,{ PUBLIC } from '../components/withAuth';

class Navbar extends Component {
        
    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout());
    }
    
    render () {  
        const { user } = this.props;
        const isAuth = user ? user.authenticated : false;
        return (
            <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark mb-5">
              <div className="container">
                <Link href="/"><a className="navbar-brand">WISL Benefaction</a></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/helpn]"><a className="nav-link">Help</a></Link>
                    </li>

                  </ul>
                  { isAuth
                  ? <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <Link href="#"><a className="nav-link dropdown-toggle" id="navDropDownLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className='fas fa-user user-profile-icon'></i></a></Link>
                            <div className="dropdown-menu" aria-labelledby="navDropDownLink">
                                <h5 className="dropdown-item text-dark text-truncate"><strong>{user.alias}</strong></h5>
                                <div className="dropdown-divider border-dark"></div>
                                <Link href="/user"><a className="dropdown-item">Profile</a></Link>
                                <div className="dropdown-divider"></div>
                                <Link href="/logout" ><a onClick={this.handleLogout} className="dropdown-item">Logout</a></Link>
                            </div>
                        </li>
                    </ul>
                  :<ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link href="/login"><a className="nav-link">Login</a></Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/register"><a className="nav-link">Register</a></Link>
                    </li>
                  </ul> }
                  
                </div>
              </div>
            </div>
        );
    }    
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default compose(withAuth(PUBLIC),connect(mapStateToProps))(Navbar);
        

