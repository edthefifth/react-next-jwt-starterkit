import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import Head from 'next/head';
import Navbar from './Navbar';

class Layout extends Component {
    
    render () {   
        return (
            <div>
                <Head>
                    <title>WISL Benefaction - Anonymously Support Content Creators</title>
                    <link rel="stylesheet" href="/static/bootstrap.min.css"/>
                    <link rel="stylesheet" href="/static/index.css"/>
                    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.5.0/css/all.css' integrity='sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU' crossorigin='anonymous'/>
                    
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
                </Head>
                <Navbar />
                <div className="container pt-5">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default connect()(Layout);


