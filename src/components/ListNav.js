import Link from 'next/link';
import React, { Component } from 'react';
import SubmitLoader from '../components/SubmitLoader';
import Pagination from '../components/Pagination';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';

class ListNav extends Component {

    constructor(props) {
        super(props);
    }



    componentWillMount = () =>{

    }

    componentDidMount = () =>{

    }

    componentWillUnmount = () =>{

    }

    componentWillUpdate = () =>{

    }

    componentDidUpdate = () =>{

    }




    render () {
        const { setActiveTab, activeTab ,listArray = []  } = this.props;
        console.log(listArray);
        let navItems = listArray.map( (listItem,listIndex) =>
        {
          console.log(listIndex,activeTab,(activeTab == (listIndex+1)));
          return (
            <NavItem key={(listIndex)}>
              <NavLink
                className={activeTab == (listIndex+1).toString() ? 'active text-capitalize' : 'text-capitalize'}
                onClick={() => { setActiveTab((listIndex+1).toString()); }}
              >
                {listItem.name}
              </NavLink>
            </NavItem>
          );
        }
      );

        return (
          <Nav tabs>
             {navItems}
          </Nav>

        );
    }
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(ListNav);
