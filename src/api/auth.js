import client from './restRequest'
import { removeCookie } from '../util/cookie';

import jwt from 'jsonwebtoken';

function decodeJWT (acccessJWT) {
    const decodedJWT = jwt.verify(accessJWT);
    decodedJWT.user.authenticated = true;
    return Promise.resolve({
      user: decodedJWT.user,
      jwt: acccessJWT,
      expiration: decodedJWT.exp
    });
}

function clearUser(){
    return Promise.resolve({
        user: {authenticated:false},
        jwt: null,
        expiration: -1
    });
}

const auth = {

  authenticate (accessCookie) {
    let accessJWT = accessCookie.token;
    return decodeJWT(accessJWT);
  },

  signout () {
    return clearUser();
  },

  register (username, password) {
    return client.post("/register",{
      username: username,
      password: password
    }).then((_u)=>{
        console.log('register auth',_u);
        const accessJWT = _u.access;
        return decodeJWT(accessJWT).then(({user,jwt,expiration})=>{
            return Promise.resolve({
                user: user,
                access:_u.access,
                refresh:_u.refresh
            });
        });
    });
  },

  login (username, password) {
    return client.post("/login",{
      username: username,
      password: password
    }).then((_u)=>{
        console.log('login auth',_u);
        const accessJWT = _u.access;
        return decodeJWT(accessJWT).then(({user,jwt,expiration})=>{
            return Promise.resolve({
                user: user,
                access:_u.access,
                refresh:_u.refresh
            });
        });
    });
  },

  refresh (username, refreshToken) {
    return client.post("/refreshToken",{
      username: username,
      token: refreshToken.token
    }).then((_u)=>{
        console.log('refresh response',_u);
        const accessJWT = _u.access;
        return decodeJWT(accessJWT).then(({user,jwt,expiration})=>{
            return Promise.resolve({
                user: user,
                access:_u.access
            });
        });
    });
  }

}

export default auth;
