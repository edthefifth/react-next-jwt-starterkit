// -- INITIAL STORE
const initialState = {

      user: {name:'Anonymous',authenticated:false},
      jwt: null,
      expiration: -1,
      refreshExpiration: -1,
      refreshUntil:-1,
      refreshToken:null

};


import { SET_AUTH, REFRESH_TOKEN,SET_REFRESH_TOKEN } from '../actions/types';

export default function(state = initialState,action){
    console.log(action);
    switch (action.type) {

        case SET_AUTH: {
            return {...state,user:action.auth.user,jwt:action.auth.jwt,expiration:action.auth.expiration};
        }
        case SET_REFRESH_TOKEN: {
          return {...state,refreshExpiration:action.refresh.expiration,refreshToken:action.refresh.token};
        }
        case REFRESH_TOKEN: {
          return {...state,refreshUntil:action.refresh.refreshUntil};
        }

        default: return state
    }
}
