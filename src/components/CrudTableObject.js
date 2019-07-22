import Link from 'next/link';
import React, { Component } from 'react';
import DynamicTable from '../components/DynamicTable';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

class CrudTableObject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageLoaded:false,
            createAPI:null,
            readAPI:null,
            updateAPI:null,
            deleteAPI:null

        };
    }

    componentWillMount = () =>{

    }

    componentDidMount =() =>{
        this.setState({pageLoaded:true});
    }

    componentWillUnmount = () =>{

    }

    componentWillUpdate = () =>{

    }

    componentDidUpdate = () =>{

    }

    onPaginate = (e) => {
       console.log(e);
    };


    onQuery = (e) => {
       console.log(e);
    };

    onUpdate = (e) => {
      if(!updateAPI) return;
      else {
        console.log(e);
      }
    };

    onDelete = (e) => {
      if(!deleteAPI) return;
      else {
        console.log(e);
      }
    };

    onCreate = (e) => {
      if(!createAPI) return null;
      else {
        console.log(e);
      }
    };



    render () {
        const { onCreate, onDelete, onQuery, onUpdate, title, subtitle = 'Paginated data'  } = this.props;
        const { pageLoaded } = this.state;
        return (
                  <Container>
                        <Row>
                            <Col>
                                <h4 className="text-capitalize">{title}</h4>
                                <p>{subtitle}</p>
                            </Col>
                        </Row>


                        <DynamicTable onQuery={onQuery} onDelete={onDelete} onCreate={onCreate} onUpdate={onUpdate} />


                    </Container>

        );
    }
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(CrudTableObject);
