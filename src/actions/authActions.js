import { SET_AUTH, SET_REFRESH_TOKEN, REFRESH_TOKEN} from './types';
// Cookie parser used for extracting the JWT in an SSR scenario
import cookieParser from 'cookie';
import auth from '../api/auth';
import Router from 'next/router';
import Storage,{ AT_STORAGE, RT_STORAGE } from '../api/storage';
import { setCookie,getCookie, storeInSecureSession } from '../util/cookie';



// -- ACTIONS
export function login (payload,nextURL) {
  const _destination = !nextURL || nextURL === undefined ? '/' : nextURL;
  return (dispatch) => {
    return auth.login(payload.username, payload.password)
    .then(({user, access, refresh}) => {
        user.authenticated=true;
        setCookie(AT_STORAGE,access);
        storeInSecureSession(RT_STORAGE,refresh);
        Router.push(_destination);
        dispatch({
          type: SET_REFRESH_TOKEN,
          refresh: {
            expiration:refresh.expiration
          }
        });
        const result = dispatch({
          type: SET_AUTH,
          auth: {
            user,
            jwt:access.token,
            expiration:access.expiration
          }
        });



        return result;
    });
  };
}

export function logout () {
  return (dispatch) => {
    return auth.signout()
    .then(({user,jwt,expiration}) => {
        const result = dispatch({
            type: SET_AUTH,
            auth: {
              user,
              jwt,
              expiration
            }
          });
        return result;
      });
  }
};


export function authenticate (jwtFromCookie = null) {
  return (dispatch) => {
    return auth.authenticate(jwtFromCookie)
    .then(({user,jwt,expiration}) => {
      const result = dispatch({
        type: SET_AUTH,
        auth: {
          user,
          jwt,
          expiration
        }
      });
      return result;
    });
  };
};

export function refreshJWT(user,refreshToken){
  return (dispatch) => {
    return auth.refresh(user,refreshToken)
    .then(({user, access}) => {
      setCookie(AT_STORAGE,access);
      dispatch({
        type: REFRESH_TOKEN,
        refresh: {
          refreshedUntil:access.expiration,
        }
      });
      const result = dispatch({
        type: SET_AUTH,
        auth: {
          user,
          jwt:access.token,
          expiration:access.expiration
        }
      });
      return result;
    });
  }
};
