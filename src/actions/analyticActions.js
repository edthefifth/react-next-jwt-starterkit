
//import restClient from '../api/restRequest';
import Storage,{ _STORAGE } from '../api/storage';
import { getCookie } from '../util/cookie';
import auth from '../api/auth';

export function getStatistics (payload){
    payload.type='statistics';
    const jwt = getCookie(_STORAGE);
    return (dispatch) => {
        return auth.authenticate(jwt)
        .then(() => {
          const result = dispatch({
            type: GET_STATISTICS,
            statistics:[],
            success:true
          }
          return result;
        });
    };

};

export function getMetrics (payload = {}){
    payload.type='snapshot';
    const jwt = getCookie(_STORAGE);
    return (dispatch) => {
        return auth.authenticate(jwt)
        .then(() => {
            const result = dispatch({
              type: GET_METRICS,
              metrics:[],
              success:true
            }
            return result;
        });
    };

};



export function getActivityLog (payload){
    const jwt = getCookie(_STORAGE);
    return (dispatch) => {
        return auth.authenticate(jwt)
        .then(() => {
          const result = dispatch({
            type: GET_ACTIVITY_LOG,
            events:[],
            success:true
          }
          return result;
        });
    };

};
