import React, { Component } from 'react';

class ActionColumn extends Component {



        render () {
            return (
                <td scope="col">
                    <button name={this.props.name} onClick={this.props.handleClick()}>{this.props.value}</button>
                </td>
            );
        }
}


export default ActionColumn;
