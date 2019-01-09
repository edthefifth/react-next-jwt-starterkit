/* eslint-disable no-param-reassign */
const next = require('next');

const env = process.env.NODE_ENV == 'production' ? 'production' : 'dev';
const config = require('./config/'+env+'.json');
const dev =  env !== 'production' || true
const port = process.env.NODE_PORT || config.port;
const app = next({
  dev,  
  dir: './src'
});
const handle = app.getRequestHandler();

module.exports = (async server => {
    await app.prepare();
    // Middleware to insert app and handle inside the req object.
    server.use('/', (req, res, n) => {
        req.app = app;
        req.handle = handle;
        n();
    });
    server.originalListen = server.listen;
    server.listen = (port) => {
        // If none of the custom routing handlers from express are hit,
        // defer to next's own handler.
        server.get('*', (req, res) => {
            req.handle(req, res);
        });
        server.originalListen(port);
        console.log("Connected and listening on port:"+port);
    };
    return server;
});
