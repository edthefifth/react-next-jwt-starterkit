import { combineReducers } from 'redux';
import authReducer from './authReducer';
import crudReducer from './crudReducer';
import emailReducer from './emailReducer';
import analyticsReducer from './analyticsReducer';
export default combineReducers({
        auth:authReducer,
        crud:crudReducer,
        analytics:analyticsReducer,
        email:emailReducer
});
