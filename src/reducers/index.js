import { combineReducers } from 'redux';
import authReducer from './authReducer';
import crudReducer from './crudReducer';
import analyticsReducer from './analyticsReducer';
export default combineReducers({
        auth:authReducer,
        crud:crudReducer,
        analyticsReducer
});
