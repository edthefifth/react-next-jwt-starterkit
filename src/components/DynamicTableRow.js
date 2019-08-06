import React, { Component } from 'react';
import DataColumn from '../components/DataColumn';
import ActionColumn from '../components/ActionColumn';

class DynamicTableRow extends Component {



        constructor (props) {
            super(props);
            this.state = {
                json:'{}',
            };
        }

        headerFill = (headers) =>{
            let json = {};
            const { onUpdate, onCreate, onDelete} = this.props;
            const columns = headers.map( (field,colNum) =>{
                return (<DataColumn key={colNum} name={field} value={field} isHeader={true} />);
            });
            if(onUpdate){
              columns.push(<DataColumn key={colNum} name='updateButton' value='' isHeader={true}/>);
            }
            if(onDelete){
              columns.push(<DataColumn key={colNum} name='deleteButton' value='' isHeader={true} />);
            }
            return columns;
        }

        fill = (headers,data) =>{
            let json = {};
            const { onUpdate, onCreate, onDelete} = this.props;
            const columns = headers.map( (field,colNum) => {
               let value;
                if((typeof data[field] === 'string' || data[field] instanceof String) || (data[field] === 'number' && isFinite(data[field]))){
                   value = data[field];
                }   else if (data[field] === undefined || data[field] === null){
                   value = '';
                }
                else {
                  value = JSON.stringify(data[field]);
                }
                return (<DataColumn key={colNum} name={field} value={value} />);
            });
            if(onUpdate){
              columns.push(<ActionColumn name='updateButton' value='Update' handleClick={onUpdate} />);
            }
            if(onDelete){
              columns.push(<ActionColumn name='deleteButton' value='Delete' handleClick={onDelete} />);
            }
            return columns;
        }

        render () {
            const { data, headers, isHeader = false} = this.props;
            let fill;
            if(!isHeader){
              fill = this.fill(headers,data);
            } else {
              fill = this.headerFill(headers);
            }

            return (
                <tr>
                  {fill}
                </tr>
            );
        }
}


export default DynamicTableRow;
