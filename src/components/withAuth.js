import React, { Component } from 'react'
import Router from 'next/router'
import { authenticate,refreshJWT } from '../actions/authActions'
import Error from 'next/error'
import apiRequest,{ get, post} from '../api/restRequest'
import Storage,{ AT_STORAGE,RT_STORAGE } from '../api/storage';
import { getCookie } from '../util/cookie';

export const PUBLIC = 'PUBLIC'


export default (permissionName = null,permissionValue = 1) => ChildComponent => class withAuth extends Component {

  static redirectToLogin (context) {
    const { req, res } = context
    const isServer = !!req;
    console.log("redirecting To Login isServer:"+isServer);
    if (isServer) {
      //res.writeHead(302, { Location: `/login?next=${req.originalUrl}` })
      //res.end()
    } else {
      Router.push(`/login?next=${context.asPath}`)
    }
  }

  static userHasPermission (user) {

    const userGroups = user.groups || {}
    const userPermissions = user.permissions || {};
    let userHasPerm = true;

    // go here only if we have specific permission requirements
    if (permissionName) {
      console.log("userHasPermission Check",userPermissions[permissionName.toLowerCase()],userPermissions[permissionName.toLowerCase()].value);
      userHasPerm = userPermissions[permissionName.toLowerCase()] && userPermissions[permissionName.toLowerCase()].value >= permissionValue ? true: false;
    }
    return userHasPerm;
  }

  static async refreshToken(context,authObj){
    const { store, req, res } = context;
    const isServer = !!req;
    console.log("refresh object & isServer",authObj.refreshExpiration,isServer)
    if(authObj.refreshExpiration && (Date.now() < (authObj.refreshExpiration) * 1000)){
      console.log("refresh check auth user",authObj.user);
      if(isServer && authObj.user && authObj.user.name){
        const refreshObject = getCookie(RT_STORAGE,context);
        console.log("refresh object",refreshObject);
        if(refreshObject){
          await store.dispatch(refreshJWT(authObj.user.name,refreshObject.token));
        }
      } else {
          //hard refresh to force serverside refresh of access token
          console.log('needs refreshing from client');
          //window.location.reload();
      }
    }
  }

  async componentDidMount() {
        /*
        const isPublicPage = permissionName == PUBLIC;

        const _auth = this.context.store.getState().auth;

        console.log(_auth);
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
        */
         // use file list to get single files


        //this.setState({loaded:true});
    }

  static async getInitialProps (context) {
    // public page passes the permissionName `PUBLIC` to this function
    const isPublicPage = permissionName == PUBLIC;
    const { store, req, res } = context;

    const isServer = !!req;

    let _auth = store.getState().auth;

    if(_auth){
      console.log(_auth,_auth.expiration,Date.now(),((_auth.expiration - 90) * 1000),((Date.now() >= (_auth.expiration - 90) * 1000)));

      //if on server reauth
      if(!_auth.user && !_auth.user.authenticated){

        const accessObject = getCookie(AT_STORAGE,context);
        await store.dispatch(authenticate(accessObject.token));
      }

      //if going to expire in the next 90 seconds refresh access token if on server, refresh page otherwise
      if(!_auth.expiration || (Date.now() >= (_auth.expiration - 90) * 1000)){
          console.log("Token needs to be refresh");
          await this.refreshToken(context,_auth);
      }
      //Authenticate the user with JWT
      /*
      if(!_auth.user && !_auth.user.authenticated){
        //
        const accessObject = isServer ? getCookie(AT_STORAGE,req):getCookie(AT_STORAGE);
        console.log(accessObject);
        //await store.dispatch(authenticate(accessObject.token));
      }*/

    }


    return this.getInitProps(context, store.getState().auth.user, isPublicPage)
  }

  static async getInitProps (context, user, isPublicPage) {

    let proceedToPage = true
    let initProps = {}


    console.log(user,user.authenticated);
    if (user && user.authenticated) {

      // means the user is logged in so we verify permission
      if (!isPublicPage) {

        if (!this.userHasPermission(user)) {
          proceedToPage = false

          // Show a 403 page (see using next.js' built-in Error page) - TODO does this also work server-side?
          const statusCode = 403
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
