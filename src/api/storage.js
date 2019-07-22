// -- CONSTANTS
export const _STORAGE = 'jwt-token';
export const RT_STORAGE = 'refresh-token';
export const AT_STORAGE = _STORAGE;

const env = process.env.NODE_ENV == 'production' ? 'production' : 'dev';
const config = require('../../config/'+env+'.json');

export const API_HOST = config.api || 'http://localhost:8000';
export const HOST = config.host || 'http://localhost:8080';
