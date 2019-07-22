import Link from 'next/link';
import react from 'react';

class UserForm extends react.Component {   
    
    
    constructor (props) {
        super(props);
    }
    
    
    
    render () {
        const { user, onChange, container} = this.props;
        const fieldMap =  Object.keys(user).map(function(field){
                return (
                <div key={field} className="form-group">
                    <label >{field}</label>
                    <input className="form-control border border-dark" type='text' name={field} value={user[field]}  onChange={onChange}/>
                </div>);
        });    
        return fieldMap;
    }
    
}

export default UserForm;


