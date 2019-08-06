import React, { Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LinkTile from '../components/LinkTile';
import Layout from '../components/Layout';
import withAuth,{ PUBLIC } from '../components/withAuth';
import Storage,{_STORAGE } from '../api/storage';
import SearchForm from '../components/SearchForm';
import Login from '../components/Login';
import { Container,Row, Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDatabase, faList } from '@fortawesome/free-solid-svg-icons'
library.add(faDatabase);
library.add(faList);

class Index extends Component {


    constructor (props) {
        super(props);
        this.state = {
            loaded: false
        };
    }



    render() {

        const { user } = this.props;
        const name = user && user.name? `${user.name}` : null;
        const isAuth = user && user.authenticated ? user.authenticated : false;
        console.log(isAuth);
        const mainLogo = '/static/logo.png?v=1.5';
        return (
            <Layout>






                    { isAuth ?
                    (
                      <Container>
                        <Row>

                            <LinkTile text='Data Tables' link='/data' bgColor='info' statIcon={faDatabase} />


                            <LinkTile text='Activity logs' link='/data' bgColor='primary' statIcon={faList} />

                        </Row>


                      </Container>
                    ):
                    (
                      <Login />
                    )
                    }

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
