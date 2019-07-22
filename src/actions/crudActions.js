import { CREATE,READ,UPDATE,DELETE } from './types';


export function crudREAD (api,payload) {
    return (dispatch) => {

                const result = dispatch({
                  type: READ,
                  data: [{id:'96a3be3cf272e017046d1b2674a52bd3',name:'ed',email:'ed@example.com'},
                         {id:'a2ef406e2c2351e0b9e80029c909242d',name:'max',email:'max@example.com'},
                         {id:'e45ee7ce7e88149af8dd32b27f9512ce',name:'john',email:'john@example.com'},
                         {id:'7d0665438e81d8eceb98c1e31fca80c1',name:'bob',email:'bob@example.com'},
                         {id:'751d31dd6b56b26b29dac2c0e1839e34',name:'anne',email:'anne@example.com'},
                       ]
                });
                return result;
        });
    };
}

export function crudCREATE (api,payload) {
    return (dispatch) => {

                const result = dispatch({
                  type: CREATE,
                  data: [payload.data],
                  success:true
                });
                return result;
        });
    };
}

export function crudUPDATE (api,payload) {
    return (dispatch) => {

                const result = dispatch({
                  type: UPDATE,
                  data: [payload.data],
                  success:true
                });
                return result;
        });
    };
}

export function crudDELETE (api,payload) {
    return (dispatch) => {

                const result = dispatch({
                  type: DELETE,
                  success:true
                });
                return result;
        });
    };
}
