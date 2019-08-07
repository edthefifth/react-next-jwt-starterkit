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
            const { onUpdateQuery,queryResults=[], loading} = this.props;
            if(loading) return null;


            if(headers !== null)
            {
              return <DynamicTableRow isHeader={true} headers={headers} onUpdateQuery={onUpdateQuery} />;
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
              const colspan = headers && headers.length > 0 ? headers.length : 1;
              return [<tr key={0} ><td colSpan={colspan}>Empty</td></tr>];
            }

        }



        render () {

            const {loading,queryResults,onPaginate,currentPage,headers = null, totalRecords=0,pageLimit=50} = this.props;
            let initHeaders;
            if(headers === null && queryResults && queryResults.length > 0){
              initHeaders = Object.keys(queryResults[0])
            } else {
              initHeaders = headers;
            }

            const headerRow = this.fillHeader(initHeaders);
            const tableRows = this.fillTable(initHeaders);
            return (
                <Fragment>
                  { loading &&
                    <Loading text='Querying' />
                  }
                  {!loading &&
                    <div className="table-responsive">
                      <Table striped bordered size="sm">
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
                    </div>
                  }

                </Fragment>
            );
        }
}

const mapStateToProps = (state) => {
  return {
    queryData: state.crud.read
  };
}

export default connect(mapStateToProps)(DynamicTable);
