import Link from 'next/link';
import React, { Component } from 'react';
import SubmitLoader from '../components/SubmitLoader';
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
        let navItems = listArray.map( (listItem,listIndex) =>
        {
          const name = listItem.name.replace(/_/g," ");
          return (
            <NavItem key={(listIndex)}>
              <NavLink
                className={activeTab === (listIndex) ? 'active text-capitalize' : 'text-capitalize'}
                onClick={() => { setActiveTab((listIndex)); }}
              >
                {name}
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
