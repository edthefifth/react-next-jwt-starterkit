//import feathers from '@feathersjs/feathers'
//import rest from '@feathersjs/rest-client'
//import auth from '@feathersjs/authentication-client'
import axios from 'axios'
import { API_HOST } from './storage'

//
// TODO get rid of this hardcoded API_ENDPOINT, make it configurable !
//
// Note: the standard Feathers config approach doesn't work because this is next.js, so it has to work both on client and server
// (that's "universal Javascript" biting us again - really complicating a lot of things!) - an approach we could use is this:
//
// https://github.com/zeit/next.js/tree/canary/examples/with-universal-configuration-runtime
//

const handleError = (error) => {
  if(error.response && error.response.data && error.response.data.error){
    return {message:error.response.data.error};
  } else if(error.response) {
    return error.response;
  }
  else {
    return error;
  }
}

const responseHandler = (response) => {
  if(response.data) return response.data
  else return response;
}

const getUrl = endpoint => API_HOST + endpoint;

export const post = async (endpoint, data) => {

  const endPointUrl = getUrl(endpoint);
  try{
    const response = await axios.post(endPointUrl, data, {
      headers: { "Content-Type": "application/json","Accept":"application/json" }
    });
    return responseHandler(response);
  }
  catch(error){
    return Promise.reject(handleError(error));
  }
};

export const get = async (endpoint) => {
  const headers = jwt
    ? {
        headers: { "Accept":"application/json" }
      }
    : null;
  try{
    const response = await axios.get(getUrl(endpoint), headers);
    return responseHandler(response);
  }
  catch(error){
    return Promise.reject(handleError(error));
  }
};

export const postWithJWT = async (endpoint, jwt ,data) => {
  try{
    const response = await axios.post(getUrl(endpoint), data, {
      headers: { "Accept":"application/json","Content-Type": "application/json", "Authorization":`${jwt}` }
    });
    return responseHandler(response);
  }
  catch(error){
    return Promise.reject(handleError(error));
  }
};

export const getWithJWT = async (endpoint, jwt) => {
  const headers = jwt
    ? {
        headers: { "Accept":"application/json","Authorization": `${jwt}` }
      }
    : null;
    try{
      const response = await axios.get(getUrl(endpoint), headers);
      return responseHandler(response);
    }
    catch(error){
      return Promise.reject(handleError(error));
    }
};

export default {get,post,getWithJWT,postWithJWT};
