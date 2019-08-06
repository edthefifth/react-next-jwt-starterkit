
import React, { Component } from 'react';
import { Navbar, Dropdown,  Nav, DropdownToggle, DropdownMenu, NavLink, DropdownItem } from 'reactstrap';

class DropdownNavbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
          dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }


    render() {
        return (

            <Nav className="ml-auto" >
                  <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret color="primary" className="bg-transparent">
                          <i className='fas fa-user enlarge-font'></i>
                      </DropdownToggle>
                      <DropdownMenu>
                          <h5 className="dropdown-item text-dark text-truncate"><strong>{this.props.name}</strong></h5>
                          <DropdownItem divider className="border-dark" /><div ></div>
                          <NavLink href="/user" className="dropdown-item">Profile</NavLink>
                          <DropdownItem divider className="border-dark" />
                          <NavLink href="/logout" onClick={this.props.logout}>Logout</NavLink>
                      </DropdownMenu>
                  </Dropdown>
            </Nav>
        );
    }

}


export default DropdownNavbar;
