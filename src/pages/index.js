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
        };
    }



    render() {

        const { user } = this.props;
        const name = user ? `${user.alias}` : null;
        const isAuth = user ? user.authenticated : false;
        const mainLogo = '/static/logo.png?v=1.5';
        return (
            <Layout>






                    { isAuth ?
                    (
                      <Container>
                        <Row>
                          <Col>
                            <LinkTile text='Data Tables' link='/data' color='orange' />
                          </Col>
                          <Col>
                            <LinkTile text='Activity logs' link='/data' color='blue' />
                          </Col>
                        </Row>
                        <Row>

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
