import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import SubmitLoader from '../components/SubmitLoader';
import Pagination from '../components/Pagination';

class DynamicTable extends Component {



        constructor (props) {
            super(props);
            this.state = {
                totalRecords:0,
                pageLimit:50,

            };
        }

        onPaginate = (e) => {
          console.log(e.target.name,e.target.value);
        }

        render () {

            const {onCreate,onDelete,onQuery,onUpdate} = this.props;
            const {pageLimit,totalRecords} = this.state;

            return (
                <Container>
                  <Table striped bordered>
                      {this.props.children}
                  </Table>

                  <Pagination  totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={onPaginate} />
                </Container>
            );
        }
}


export default DynamicTable;
