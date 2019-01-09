import { SET_AUTH } from './types';
// Cookie parser used for extracting the JWT in an SSR scenario
import cookieParser from 'cookie';
import auth from '../api/auth';
import Storage,{ FEATHERS_STORAGE } from '../api/storage';
import Router from 'next/router';
import { setCookie, removeCookie } from '../util/cookie';



// -- ACTIONS
export function login (payload) {
  return (dispatch) => {
    return auth.login(payload.alias, payload.password)
    .then(({user, jwt}) => {
        user.authenticated=true;
        setCookie(FEATHERS_STORAGE,jwt);
        Router.push('/');
        const result = dispatch({
          type: SET_AUTH,
          auth: {
            user,
            jwt
          }
        });

        

        return result;
    });
  };
}

export function logout () {
  return (dispatch) => {
    return auth.signout()
    .then(() => {
        removeCookie(FEATHERS_STORAGE);
        const result = dispatch({
          type: SET_AUTH,
          auth: {
            user: {authenticated:false},
            jwt: null
          }
        });
      

      return result;
    });
  };
};

export function register (payload) {
    return (dispatch) => {
      return auth.register(payload.alias, payload.password)
      .then(_ => {
        return auth.login(payload.alias, payload.password)
          .then(({user, jwt}) => {
              setCookie(FEATHERS_STORAGE,jwt);
              user.authenticated=true;
              Router.push('/');
              const result = dispatch({
                type: SET_AUTH,
                auth: {
                  user,
                  jwt
                }
              });
              
              

              return result;
          });
      });
    };
}; 

export function authenticate (jwtFromCookie = null) {
  return (dispatch) => {
    return auth.authenticate(jwtFromCookie)
    .then(({user,jwt}) => {
      user.authenticated=true;
      const result = dispatch({
        type: SET_AUTH,
        auth: {
          user,
          jwt
        }
      });
      return result;
    });
  };
};



// UTILS
/*
export function setClientCookie(name, value) {
  document.cookie = name + '=' + value;
};

export function clearClientCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export function setServerCookie(res, name, value) {
  res.cookie(name, value, {});  // maxAge: 900000, httpOnly: true })
};

export function clearServerCookie(res, name) {
  res.clearCookie(name);
};

export function getServerCookie(req, name) {
  const cookies = extractCookies(req);
  const cookie = cookies ? cookies[name] : null;

  return cookie;
};

function extractCookies(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  return cookieParser.parse(cookies);
}

*/