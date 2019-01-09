import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import auth from '@feathersjs/authentication-client'
import axios from 'axios'
import storage,{ FEATHERS_STORAGE, API_HOST } from './storage'

//
// TODO get rid of this hardcoded API_ENDPOINT, make it configurable !
//
// Note: the standard Feathers config approach doesn't work because this is next.js, so it has to work both on client and server
// (that's "universal Javascript" biting us again - really complicating a lot of things!) - an approach we could use is this:
//
// https://github.com/zeit/next.js/tree/canary/examples/with-universal-configuration-runtime
//


const getUrl = endpoint => API_HOST + endpoint;

export const post = async (endpoint, data) => {
  return axios.post(getUrl(endpoint), data, {
    headers: { "Content-Type": "application/json" }
  });
};

export const get = async (endpoint, jwt) => {
  const headers = jwt
    ? {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    : null;
  return axios.get(getUrl(endpoint), headers);
};




const restClient =  feathers()
  .configure(rest(API_HOST).axios(axios))
  .configure(auth({header:'Authorization','prefix':'Bearer'}));

restClient.service('/users');


export default restClient;