import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Collapse, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';


class SubMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed:true
    }
  }

  setCollapsed = (bool) =>{
    this.setState({collapsed:bool});
  }



  render(){
    const {collapsed} = this.state;
    const toggleNavbar = () => this.setCollapsed(!collapsed)
    const { icon, title, items } = this.props;



    return (
      <div>
        <NavItem onClick={toggleNavbar} className={classNames({'menu-open': !collapsed})}>
          <NavLink className="dropdown-toggle">
            {title}
          </NavLink>
        </NavItem>
        <Collapse isOpen={!collapsed} navbar className={classNames('items-menu',{'mb-1': !collapsed})}>
          {items.map((item, index) => (
              <NavItem name={item.target} active={item.active} key={item.target} className="pl-4">
                <NavLink>
                  <FontAwesomeIcon icon={icon} className="mr-2"/>{item.title}
                </NavLink>
              </NavItem>
              ))
          }
        </Collapse>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth} = state

  return {
    user:auth,
  }
}

export default connect(mapStateToProps)(SubMenu);
