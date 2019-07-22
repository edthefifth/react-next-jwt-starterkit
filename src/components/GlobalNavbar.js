import Link from 'next/link';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import withAuth,{ PUBLIC } from '../components/withAuth';
import { Navbar, NavbarToggler, NavbarBrand, Nav, Collapse, DropdownMenu, NavLink } from 'reactstrap';
import DropdownNavbar from '../components/DropdownNavbar';



class GlobalNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout());
        window.location.reload();
    }

    toggle  = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render () {
        const { user } = this.props;
        const isAuth = user ? user.authenticated : false;
        const isAdmin = user && user.permissions && user.permissions.admin > 0 ? true : false;
        const isCreator = user && user.permissions && user.permissions.creator > 0 ? true : false;
        const isVerifiedUser = user && user.metadata && user.metadata.emailVerified ? user.metadata.emailVerified : false;
        const logo = '/static/small-logo.png?v=1.5';
        return (

            <nav className="navbar  navbar-expand-lg fixed-top navbar-dark bg-dark mb-5">
              <div className="container">
                <NavbarBrand href="/"><img src={logo} className="mt-1 w-25"/></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <nav className="navbar-nav">
                    <div className="nav-item">
                        <NavLink href="/help">Help</NavLink>
                    </div>
                    { isAdmin &&
                    <div className="nav-item">
                        <NavLink href="/admin">Admin</NavLink>
                    </div>
                    }
                    { isCreator &&
                    <div className="nav-item">
                        <NavLink href="/creator">Creator Profile</NavLink>
                    </div>
                    }
                    { isVerifiedUser && !isCreator &&
                    <div className="nav-item">
                        <NavLink href="/creator/apply">Become a Creator</NavLink>
                    </div>
                    }
                  </nav>

                  { isAuth
                  ? <DropdownNavbar logout={this.handleLogout} alias={user.alias} />
                  :(<nav className="navbar-nav ml-auto">
                    <div className="nav-item">
                        <Link href="/login"><a className="nav-link">Login</a></Link>
                    </div>
                    <div className="nav-item">
                        <Link href="/register"><a className="nav-link">Register</a></Link>
                    </div>
                  </nav>)}
                  
                </Collapse>
              </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}

export default compose(withAuth(PUBLIC),connect(mapStateToProps))(GlobalNavbar);
