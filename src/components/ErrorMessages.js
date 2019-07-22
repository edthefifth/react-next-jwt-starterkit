import React from 'react';

class ErrorMessages extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            messages:props.messages || []
        };
    }    
    
    render(){
        
        return (
                <ul>  
                { this.props.messages.map((err, key) =>
                    
                    <li className="text-danger ml-3 align-middle enlarge-font" key={key}>{err}</li>
                   
                )}
                </ul>   
            );
    }
}

export default ErrorMessages;