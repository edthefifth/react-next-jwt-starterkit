import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import Navbar from './GlobalNavbar';

class Layout extends Component {

    render () {
        return (
            <div className="">
                <Navbar />
                <div className="container pt-5 screen-height pad-bottom-40">
                    {this.props.children}
                </div>
                <footer className='bg-dark fixed-bottom'>
                    <div className='container p-sm-2'>
                        <div className='row'>

                            <div className='col'>
                                <Link href='/contact'><a className='text-white enlarge-font'>Contact</a></Link>
                            </div>
                            <div className='col'>
                                <Link href='/terms'><a className='text-white enlarge-font'>Terms of Service</a></Link>

                            </div>

                            <div className='col'>
                                <Link href='/privacy'><a className='text-white enlarge-font'>Privacy Policy</a></Link>
                            </div>
                        </div>

                    </div>
                </footer>
            </div>
        );
    }
}
export default connect()(Layout);
