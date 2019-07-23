import React, { Component } from 'react';

class DataColumn extends Component {



        constructor (props) {
            super(props);
            this.state = {
                value:null
            };
        }

        render () {

            const {name, value, isHeader = false} = this.props;

            if(isHeader){
                return (
                  <th scope="col" name={name}>
                          {this.props.value}
                  </th>
                );
            } else {
                return (
                    <td scope="col" name={name}>
                        {this.props.value}
                    </td>
                );
            }
        }
}


export default DataColumn;
