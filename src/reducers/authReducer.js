// -- INITIAL STORE
const initialState = {

    user: {alias:'Anonymous',authenticated:false,groups:{},profile:{},metadata:{},permissions:{}},
    jwt: null,
    expiration: -1
};


import { SET_AUTH, REFRESH_TOKEN,SET_REFRESH_TOKEN, VERIFY_EMAIL, SEND_VERIFY_EMAIL, SEND_EMAIL_RESET, RESET_PASSWORD, CHANGE_PASSWORD } from '../actions/types';

export default function(state = initialState,action){
    switch (action.type) {

        case SET_AUTH: {
          return {...state,user:action.auth.user,jwt:action.auth.jwt,expiration:action.auth.expiration};
        }
        case SET_REFRESH_TOKEN: {
          return {...state,refreshExpiration:action.refresh.expiration};
        }
        case REFRESH_TOKEN: {
          return {...state,refreshUntil:action.refresh.refreshUntil};
        }
        case SEND_VERIFY_EMAIL:{
            return {...state,sent:action.sent};
        }
        case VERIFY_EMAIL:{
            return {...state,success:action.success};
        }
        case SEND_EMAIL_RESET:{
            return {...state,sent:action.sent};
        }
        case RESET_PASSWORD:{
            return {...state,success:action.success};
        }
        case CHANGE_PASSWORD:{
            return {...state,success:action.success};
        }
        default: return state
    }
}
