// -- INITIAL STORE
const initialState = {

    user: {alias:'Anonymous',authenticated:false,groups:{}},
    jwt: null

};


import { SET_AUTH } from '../actions/types';

export default function(state = initialState,action){
    switch (action.type) {
        case SET_AUTH: {
          console.log("authReducer set_auth",state,action.auth);      
          return {...state,user:action.auth.user,jwt:action.auth.jwt};
        }

        default: return state
    }
}


