import client from './restRequest'
import { removeCookie } from '../util/cookie';

import jwt from 'jsonwebtoken';

function decodeJWT (accessJWT) {
    const decodedJWT = jwt.decode(accessJWT);
    decodedJWT.user.authenticated = true;
    if(decodedJWT.permissions) decodedJWT.user.permissions = decodedJWT.permissions;
    const authObj = {
      user: decodedJWT.user,
      jwt: accessJWT,
      expiration: decodedJWT.exp
    };
    return authObj;
}

function clearUser(){
    return {
        user: {authenticated:false},
        jwt: null,
        expiration: -1
    };
}

const auth = {

  authenticate (accessCookie) {
    if(!accessCookie || !accessCookie.token){
      return Promise.reject('Token is not set');
    }
    else{
      let accessJWT = decodeJWT(accessCookie.token);
      return Promise.resolve(accessJWT);
    }
  },

  signout () {
    return Promise.resolve(clearUser());
  },

  async register (username, password) {
        const resp = await client.post("/register",{username,password})
        const accessJWT = _u.access.token;
        const {user} = decodeJWT(accessJWT)
        return {
            user: user,
            access:_u.access,
            refresh:_u.refresh
        };

  },

  async login (username, password) {

        const resp = await client.post("/login",{username,password});
        const {user} = decodeJWT(resp.access.token);
        return {
            user: user,
            access:resp.access,
            refresh:resp.refresh
        };

  },

  async refresh (username, refreshToken) {
    const resp = await client.post("/refreshtoken",{
      username,
      refreshToken
    });
    console.log('refresh response',resp);
    const {user} = decodeJWT(resp.access.token);
    return {
            user: user,
            access:resp.access
    };

  }

};

export default auth;
