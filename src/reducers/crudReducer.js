// -- INITIAL STORE
const initialState = {
  read:[],
  delete:[],
  update:[],
  create:[]
};


import { CREATE,READ,UPDATE,DELETE } from '../actions/types';

export default function(state = initialState,action){
    switch (action.type) {
        case CREATE: {
          return {...state,create:{[action.api]:{data:action.data,success:action.success}}};
        }
        case DELETE:{
            return {...state,delete:{[action.api]:{data:action.data,success:action.success}}};
        }
        case READ:{
            return {...state,read:{[action.api]:{data:action.data,success:action.success}}};
        }
        case UPDATE:{
            return {...state,update:{[action.api]:{data:action.data,success:action.success}}};
        }
        default: return state
    }
}
