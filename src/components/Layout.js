import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import Head from 'next/head';
import Navbar from './GlobalNavbar';

class Layout extends Component {

    render () {
        return (
            <div className="">
                <Head>
                    <title></title>
                    <link rel="stylesheet" href="/static/bootstrap.min.css?v=1.0"/>
                    <link rel="stylesheet" href="/static/index.css?v=1.2"/>
                    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.5.0/css/all.css' integrity='sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU' crossOrigin='anonymous'/>

                </Head>
                <Navbar />
                <div className="container pt-5 screen-height">
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
