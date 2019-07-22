import React, { Component } from 'react';

class TableRow extends Component {
    
    
    
        constructor (props) {
            super(props);
            this.state = {
                json:'[]'
            };
        }

        render () {
            

            
            return (
                <tr>
                    {this.props.children}
                </tr>     
            );
        }    
}


export default TableRow;
