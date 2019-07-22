import React, { Component } from 'react';
import Link from 'next/link';

class SearchForm extends Component {
    
    
    
        constructor (props) {
            super(props);
            this.state = {
                searchValue:""
            };
        }
        
        componentDidMount(){
            this.nameInput.focus();
        }
        
        handleSubmit = (e) => {
            
            e.preventDefault();
            this.setState({
              [e.target.name]: e.target.value
            });
        }
        
        handleChange = (e) => {
            this.setState({
              [e.target.name]: e.target.value
            });
        }
    
        render () {
            
            const mainLogo = this.props.mainLogo;
            const onSubmit=this.handleSubmit;
            const onChange=this.handleChange;
            
            return (
                <div className="main img">
                    <img src={mainLogo} className="img-fluid mx-auto d-block" alt="WISL Main" />
                    <h5 className='text-red text-center mt-3'>The Tip Engine for Internet Content Creators</h5>
                    <form onSubmit={onSubmit}>
                        <div className=' container mt-3'>
                            <input className="form-control border border-dark" type='text' name='search' value={this.state.searchValue} ref={(input) => { this.nameInput = input; }}  placeholder='Search for your favorite content creators and their videos...' onChange={onChange} />
                        </div>
                        <div className='container mt-3'>
                            <div className='row'>
                                <div className='col-md mb-sm-3 mb-md-1'>
                                    <button type="submit" className="btn btn-red mx-auto btn-block ml-1 mr-1">Search</button>
                                </div>
                                <div className='col-md mb-sm-3 mb-md-1'>
                                    <Link href='#'><a className="btn btn-red mx-auto btn-block ml-1 mr-1">Add a Video</a></Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>     
            );
        }    
}


export default SearchForm;