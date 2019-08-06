import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import appReducer from "./reducers";
const middleware = [thunkMiddleware];
import { persistStore } from 'redux-persist'
const storage = require('redux-persist/lib/storage').default;

const rootReducer = (state,action) =>{
  if (action.type === 'LOGOUT') {
    console.log('Logging out');
    state = undefined;
    storage.removeItem('persist:rootRed')
  }
  return appReducer(state,action);
}




export default (initialState) => {
  let store;
  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');


    const persistConfig = {
      key: 'rootRed',
      storage
    };
    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    );

    store.__persistor = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    );
  }
  return store;
};
