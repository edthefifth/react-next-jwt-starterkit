import React, { Component } from 'react';

class ActionColumn extends Component {
    
        
        

        render () {
            return (
                <td scope="col">
                    <button onClick={this.props.handleClick()}>{this.props.value}</button>
                </td>     
            );
        }    
}


export default ActionColumn;


