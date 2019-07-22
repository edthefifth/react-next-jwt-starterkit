// -- INITIAL STORE
const initialState = {
  data:[],
  success:false
};


import { CREATE,READ,UPDATE,DELETE } from '../actions/types';

export default function(state = initialState,action){
    switch (action.type) {
        case CREATE: {
          return {...state,data:action.data,success:action.success};
        }
        case DELETE:{
            return {...state,data:action.data,success:action.success};
        }
        case READ:{
            return {...state,data:action.data,success:action.success};
        }
        case UPDATE:{
            return {...state,data:action.data,success:action.success};
        }
        default: return state
    }
}
