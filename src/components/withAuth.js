import React, { Component } from 'react'
import Router from 'next/router'
import { authenticate } from '../actions/authActions'
import Error from 'next/error'
import apiRequest,{ get, post} from '../api/restRequest'
import Storage,{ FEATHERS_STORAGE } from '../api/storage';
import { getCookie } from '../util/cookie';

export const PUBLIC = 'PUBLIC'


export default (permission = null) => ChildComponent => class withAuth extends Component {

  static redirectToLogin (context) {
    const { isServer, req, res } = context

    if (isServer) {
      res.writeHead(302, { Location: `/login?next=${req.originalUrl}` })
      res.end()
    } else {
      Router.push(`/login?next=${context.asPath}`)
    }
  }

  static userHasPermission (user) {
    const userGroups = user.groups || {}
    let userHasPerm = true

    // go here only if we have specific permission requirements
    if (permission) {
      // for instance if the permission is "admin" and the user name starts with admin
      userHasPerm = user.alias.toLowerCase().startsWith(permission.toLowerCase())
    }
    return userHasPerm
  }
  
  async componentDidMount() {
      
        /*const isPublicPage = permission == PUBLIC;
        
        const _auth = this.context.store.getState().auth;
        
        
        if(!_auth || !_auth.jwt)
        {
            const result = await this.dispatch(authenticate(jwt));
        
            console.log("Did Auth?",result.auth);
            this.setState({auth:_auth,loaded:true});
        }
        else
        {
            this.setState({loaded:true});
        }    
        console.log(jwt);
        */
         // use file list to get single files
         
         
        //this.setState({loaded:true}); 
    }

  static async getInitialProps (context) {
    // public page passes the permission `PUBLIC` to this function
    const isPublicPage = permission == PUBLIC;
    const { isServer, store, req, res } = context;

    if (isServer) {
      // Authenticate, happens on page first load
      
      if(context.req.headers.cookie) {
        const jwtFromCookie = getCookie(FEATHERS_STORAGE,context.req);
        await store.dispatch(authenticate(jwtFromCookie));
      }

    // client side - check if the Feathers API client is already authenticated  
    } else {
        
        console.log("Client User Auth",store.getState().auth);
        const _auth = store.getState().auth;
        if(_auth)
        {
            if(!_auth.user || !_auth.user.authenticated)
            {
                console.log("Need to auth client side");
                const jwtFromCookie = getCookie(FEATHERS_STORAGE);
                await store.dispatch(authenticate(jwtFromCookie));
            }    
        }    
     
    }
    
    console.log("user init props",store.getState());
    
    return this.getInitProps(context, store.getState().auth.user, isPublicPage)
  }

  static async getInitProps (context, user, isPublicPage) {

    let proceedToPage = true
    let initProps = {}

    if (user) {
      // means the user is logged in so we verify permission
      if (!isPublicPage) {

        if (!this.userHasPermission(user)) {
          proceedToPage = false

          // Show a 404 page (see using next.js' built-in Error page) - TODO does this also work server-side?
          const statusCode = 404
          initProps = { statusCode }
        }
      }
    } else {

      // anonymous user
      if (!isPublicPage) {
        proceedToPage = false

        this.redirectToLogin(context)
      }
    }

    if (proceedToPage && typeof ChildComponent.getInitialProps === 'function') {
      initProps = await ChildComponent.getInitialProps(context)
    }
    
    

    return initProps
  }

  render () {
    // Use next's built-in error page
    if (this.props.statusCode) {
      return <Error statusCode={this.props.statusCode} />
    }

    return <ChildComponent {...this.props} />
  }
}
