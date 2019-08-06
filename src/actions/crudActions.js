import { CREATE,READ,UPDATE,DELETE } from './types';
import client from '../api/restRequest';
import { getCookie } from '../util/cookie';
import Storage,{ AT_STORAGE, RT_STORAGE } from '../api/storage';

export function CrudREAD (api,payload) {
    return async (dispatch) => {
          try{
                const url = `/${api}`;
                const jwt = JSON.parse(getCookie(AT_STORAGE));
                console.log(jwt);
                const response = await client.postWithJWT(url,jwt.token,payload);
                console.log(response);
                const result = dispatch({
                  type: READ,
                  data: response.data,
                  api:api,
                  paginate:{
                    count:response.count,
                    next:response.next,
                    total:response.total
                  }
                });
                return result;
          }
          catch (error)
          {
            return Promise.reject(error.message);
          }

    };
}

export function CrudCREATE (api,payload) {
    return (dispatch) => {

                const result = dispatch({
                  type: CREATE,
                  data: [payload.data],
                  success:true,
                  api: api
                });
                return result;
    };
}

export function CrudUPDATE (api,payload) {
    return (dispatch) => {

                const result = dispatch({
                  type: UPDATE,
                  data: [payload.data],
                  success:true,
                  api: api
                });
                return result;
    };
}

export function CrudDELETE (api,payload) {
    return (dispatch) => {

                const result = dispatch({
                  type: DELETE,
                  success:true,
                  api: api
                });
                return result;
    };
}
