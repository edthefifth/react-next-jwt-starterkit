import { SET_AUTH, SET_REFRESH_TOKEN, REFRESH_TOKEN, LOGOUT} from './types';
// Cookie parser used for extracting the JWT in an SSR scenario
import cookieParser from 'cookie';
import auth from '../api/auth';
import Router from 'next/router';
import Storage,{ AT_STORAGE, RT_STORAGE } from '../api/storage';
import { setCookie,getCookie,removeCookie, storeInSecureSession } from '../util/cookie';

function forceLogout(dispatch){
  removeCookie(AT_STORAGE);
  removeCookie(RT_STORAGE);
  const result = dispatch({
    type: LOGOUT,
    auth: {user:{authenticated:false},jwt:null}
  });
  return result;

}

// -- ACTIONS
export function login (payload,nextURL) {

  return async (dispatch) => {
    try{
        const {user,access, refresh} = await auth.login(payload.username, payload.password);
        user.authenticated=true;
        setCookie(AT_STORAGE,access);
        setCookie(RT_STORAGE,refresh);
        console.log("setting refresh",refresh);
        dispatch({
          type: SET_REFRESH_TOKEN,
          refresh: {
            expiration:refresh.expiration,
            token:refresh.token
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
    }
    catch (error)
    {
      console.log(error);
      return Promise.reject(error.message);
    }
  };
}

export function logout () {
  return (dispatch) => {
    return auth.signout()
    .then(({user,jwt,expiration}) => {
        forceLogout(dispatch);
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

export function refreshJWT(user){
  return (dispatch) => {

    const refreshObj = JSON.parse(getCookie(RT_STORAGE));
    return auth.refresh(user,refreshObj.token)
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
