import React from 'react';

class SuccessMessages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages:props.messages || []
        };
    }


    render(){
        if(this.props.messages.length < 1) return null;
        return (
                <ul>
                { this.props.messages.map((mess, key) =>

                    <li className="text-info ml-3 align-middle enlarge-font" key={key}>{mess}</li>

                )}
                </ul>
        );
    }
}

export default SuccessMessages;
