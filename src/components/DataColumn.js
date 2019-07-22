import React, { Component } from 'react';

class DataColumn extends Component {
    
    
    
        constructor (props) {
            super(props);
            this.state = {
                value:null
            };
        }

        render () {
            
            
            if(this.props.header){
                <th scope="col">
                        {this.props.value}
                </th>  
            } else {
                return (
                    <td scope="col">
                        {this.props.value}
                    </td>     
                );
            }
        }    
}


export default DataColumn;


