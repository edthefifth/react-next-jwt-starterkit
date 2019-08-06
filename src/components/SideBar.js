
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';
import { NavItem,NavLink,  Nav } from 'reactstrap';
import classNames from 'classnames';



class SideBar extends Component{



  render(){
    const menus = [];
    const {isOpen,toggle} = this.props;
    return (
      <div className={classNames('col','col-md-3','col-sm-6','sidebar', {'is-open': isOpen})}>
        <div className="sidebar-header">
          <span color="info" onClick={toggle} style={{color: '#fff'}}>&times;</span>
        </div>
        <hr/>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            {menus}
          </Nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth} = state
  return {
    user:auth.user,
  }
}


export default connect(mapStateToProps)(SideBar);
