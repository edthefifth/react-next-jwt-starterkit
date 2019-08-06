import React, { Component, Fragment} from 'react';
import { Table, Container } from 'reactstrap';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import DynamicTableRow from '../components/DynamicTableRow';
import TablePagination from '../components/TablePagination';

class DynamicTable extends Component {



        constructor (props) {
            super(props);
        }




        fillHeader = (headers = null) => {
            const { queryResults=[], loading} = this.props;
            if(loading) return null;


            if(headers !== null)
            {
              return <DynamicTableRow isHeader={true} headers={headers} />;
            }
            else {
              return <tr></tr>;
            }
        }
        fillTable = (headers) => {

            const { queryResults, loading } = this.props;

            if(loading) return null;
            let tableRows=[];
            if(queryResults && queryResults.length > 0)
            {


              queryResults.forEach((result,resInd) => {
                const _key = result.id ? result.id : (result._id ? result._id : (result.uniq ? result.uniq : (resInd+1)));
                tableRows.push(<DynamicTableRow key={_key} data={result} headers={headers} />);
              });

              return tableRows;
            }
            else{
              return [<tr key={0} ><td>Empty</td></tr>];
            }

        }



        render () {

            const {loading,queryResults,onPaginate,currentPage, totalRecords=0,pageLimit=50} = this.props;
            let headers = null;

            if(queryResults && queryResults.length > 0) {
              headers = Object.keys(queryResults[0]);
            }
            const headerRow = this.fillHeader(headers);
            const tableRows = this.fillTable(headers);
            return (
                <Container>
                  { loading &&
                    <Loading text='Querying' />
                  }
                  {!loading &&
                    <Fragment>
                      <Table striped bordered>
                        <thead>
                        {headerRow}
                        </thead>
                        <tbody>
                        {tableRows}
                        </tbody>
                      </Table>
                      <TablePagination
                        currentPage={currentPage}
                        pageLimit={pageLimit}
                        totalItems={totalRecords}
                        onClick={onPaginate}
                      />
                    </Fragment>
                  }

                </Container>
            );
        }
}

const mapStateToProps = (state) => {
  return {
    queryData: state.crud.read
  };
}

export default connect(mapStateToProps)(DynamicTable);
