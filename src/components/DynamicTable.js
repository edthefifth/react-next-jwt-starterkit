import React, { Component, Fragment} from 'react';
import { Table, Container } from 'reactstrap';
import { connect } from 'react-redux';
import SubmitLoader from '../components/SubmitLoader';
import Pagination from '../components/Pagination';
import DynamicTableRow from '../components/DynamicTableRow';
import { CrudREAD } from '../actions/crudActions';

class DynamicTable extends Component {



        constructor (props) {
            super(props);
            this.state = {
                totalRecords:0,
                pageLimit:50,
                headers:{},
                isQuerying:false,
                pageLoaded:false,
                tableRows:{}
            };
        }

        onPaginate = (e) => {
          console.log(e.target);
        }

        onQuery = () => {
           const {dispatch, crud, query } = this.props;
           const readAPI = crud.read ? crud.read : null;
           if(!readAPI) return null;
           dispatch(CrudREAD(readAPI,{query:query}));
           this.fillTable();
        };

        onUpdate = (e) => {
          const {dispatch, crud, query } = this.props;
          const API = crud.update ? crud.update : null;
          if(!API) return null;
          else {
            console.log(e);
          }
        };

        onDelete = (e) => {
          const {dispatch, crud} = this.props;
          const API = crud.update ? crud.update : null;
          if(!API) return null;
          else {
            console.log(e);
          }
        };




        componentDidMount = () => {
            const {loadData = false} = this.props;
            this.setState({pageLoaded:true});
            if(loadData){
              this.setState({isQuerying:true});
              this.onQuery();
              this.setState({isQuerying:false});
            }


        }

        componentDidUpdate = (prevProps) => {
           const {oldLoadData = false} = prevProps;
           const {newLoadData = false} = this.props;
           if(newLoadData && newLoadData !== oldLoadData){
              this.setState({isQuerying:true});
              this.onQuery();
              this.setState({isQuerying:false});
           }
        }


        fillTable = () => {

            const { queryData, crud } = this.props;
            const readAPI = crud.read ? crud.read : null;

            const queryResults = queryData && queryData[readAPI] ? queryData[readAPI].data : [];
            const rows = []
            if(queryResults && queryResults.length > 0)
            {
              let tableRows={};
              let headerFields=[];
              let header;

              queryResults.forEach((result,resInd) => {
                const _key = result.id ? result.id : (result._id ? result._id : (result.uniq ? result.uniq : (resInd+1)));
                if(resInd === 0){
                  headerFields = Object.keys(result);
                  header = <DynamicTableRow key={0}  isHeader={true} headers={headerFields} />;
                }
                rows.push(<DynamicTableRow key={_key} data={result} headers={headerFields} />);
                tableRows[_key]=result;
              });

              return {header:header,rows:rows};
            }
            else{
              return {header:<tr></tr>,rows:[<tr key={0} ><td>Empty</td></tr>]};
            }

        }



        render () {

            const {onCreate,onDelete,onQuery,onUpdate, loadData = false} = this.props;
            const {pageLimit,totalRecords, isQuerying, pageLoaded } = this.state;
            const tableData = this.fillTable();
            const headerRow = tableData.header;
            const tableRows = tableData.rows;
            return (
                <Container>
                  { !pageLoaded &&
                    <h4>Loading....</h4>
                  }
                  { isQuerying &&
                    <SubmitLoader text='Querying' />
                  }
                  {!isQuerying &&
                    <Fragment>
                      <Table striped bordered>
                        <thead>
                        {headerRow}
                        </thead>
                        <tbody>
                        {tableRows}
                        </tbody>
                      </Table>
                      <Pagination  totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPaginate} />
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
