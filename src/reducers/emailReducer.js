


// -- INITIAL STORE
const initialState = {

};


import { VERIFY_EMAIL, SEND_VERIFY_EMAIL, SEND_EMAIL_RESET, RESET_PASSWORD, CHANGE_PASSWORD } from '../actions/types';








export default function(state = initialState,action){
  switch(action.type){
    case SEND_VERIFY_EMAIL:{
        return {...state,email:{...state.email,verifySent:action.sent}};
    }
    case VERIFY_EMAIL:{
        return {...state,email:{verifySuccess:action.success}};
    }
    case SEND_EMAIL_RESET:{
        return {...state,email:{...state.email,resetSent:action.sent}};
    }
    case RESET_PASSWORD:{
        return {...state,email:{...state.email,resetSuccess:action.sucess}};
    }
    case CHANGE_PASSWORD:{
        return {...state,email:{...state.email,changeSuccess:action.sucess}};
    }
    default:
      return state;
  }
};
