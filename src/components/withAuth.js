import React, { Component } from 'react'
import Router from 'next/router'
import { authenticate,refreshToken } from '../actions/authActions'
import Error from 'next/error'
import apiRequest,{ get, post} from '../api/restRequest'
import Storage,{ AT_STORAGE,RT_STORAGE } from '../api/storage';
import { getCookie,getFromSecureSession } from '../util/cookie';

export const PUBLIC = 'PUBLIC'


export default (permission = null) => ChildComponent => class withAuth extends Component {

  static redirectToLogin (context) {
    const { req, res } = context
    const isServer = !!req;

    if (isServer) {
      res.writeHead(302, { Location: `/login?next=${req.originalUrl}` })
      res.end()
    } else {
      Router.push(`/login?next=${context.asPath}`)
    }
  }

  static userHasPermission (user) {
    const userGroups = user.groups || {}
    const userPermissions = user.permissions || {};
    let userHasPerm = true;

    // go here only if we have specific permission requirements
    if (permission) {
      userHasPerm = userPermissions[permission.toLowerCase()] && userPermissions[permission.toLowerCase()] > 0 ? true: false;
    }
    return userHasPerm;
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
    const { store, req, res } = context;

    const isServer = !!req;

    let _auth = store.getState().auth;

    if(_auth){
      //if going to expire in the next 90 seconds refresh access token if on server, refresh page otherwise
      if(!_auth.expiration || (Date.now() >= (_auth.expiration - 90) * 1000)){
          let _refresh = store.getState().refresh;
          if(_refresh && _refresh.expiration && (Date.now() < (_refresh.expiration) * 1000)){
            console.log("refresh check auth user",_auth.user);
            if(isServer && _auth.user && _auth.user.name){
              const refreshObject = getFromSecureSession(req,RT_STORAGE);
              if(refreshObject){
                await store.dispatch(refresh(_auth.user.name,refreshObject.token));
              }
            } else {
                //hard refresh to force serverside refresh of access token
                window.location.reload();
            }
          }

      }
      //Authenticate the user with JWT
      if(!_auth.user && !_auth.user.authenticated){
        //
        const accessObject = isServer ? getCookie(AT_STORAGE,req):getCookie(AT_STORAGE);
        await store.dispatch(authenticate(accessObject.token));
      }

    }


    return this.getInitProps(context, store.getState().auth.user, isPublicPage)
  }

  static async getInitProps (context, user, isPublicPage) {

    let proceedToPage = true
    let initProps = {}



    if (user && user.authenticated) {

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
