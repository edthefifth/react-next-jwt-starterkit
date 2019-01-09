// -- CONSTANTS
export const FEATHERS_STORAGE = 'feathers-jwt';

const env = process.env.NODE_ENV == 'production' ? 'production' : 'dev';
const config = require('../../config/'+env+'.json');

export const API_HOST = config.api || 'http://localhost:3000';
export const HOST = config.host || 'localhost';


