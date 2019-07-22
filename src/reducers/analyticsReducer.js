// -- INITIAL STORE
const initialState = {
  data:[],
  success:false
};


import { GET_METRICS, GET_ACTIVITY_LOG, GET_STATISTICS } from '../actions/types';

export default function(state = initialState,action){
    switch (action.type) {
        case GET_METRICS: {
          return {...state,metrics:action.metrics,success:action.success};
        }
        case GET_ACTIVITY_LOG:{
            return {...state,events:action.events,success:action.success};
        }
        case GET_STATISTICS:{
            return {...state,statistics:action.statistics,success:action.success};
        }
        default: return state
    }
}
