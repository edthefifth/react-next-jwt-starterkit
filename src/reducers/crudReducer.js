// -- INITIAL STORE
const initialState = {
  read:{data:[]},
  delete:{data:[]},
  update:{data:[]},
  create:{data:[]},
};


import { CREATE,READ,UPDATE,DELETE } from '../actions/types';

export default function(state = initialState,action){
    switch (action.type) {
        case CREATE: {
          return {...state,create:{data:action.data,success:action.success}};
        }
        case DELETE:{
            return {...state,delete:{data:action.data,success:action.success}};
        }
        case READ:{
            return {...state,read:{data:action.data,api:action.api,paginate:action.paginate,success:action.success}};
        }
        case UPDATE:{
            return {...state,update:{data:action.data,success:action.success}};
        }
        default: return state
    }
}
