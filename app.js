const express = require('express');
// const logger = require('morgan');
const path = require('path');
//const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const next = require('./next');

const env = process.env.NODE_ENV == 'production' ? 'production' : 'dev';
const config = require('./config/'+env+'.json');
const port = process.env.NODE_PORT || config.port;

const app = express();
// Put in place textbook middlewares for express.
if (env !== 'production') {
    // app.use(logger('dev'));
}
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'static')));

const start = async (_port) => {
    // Couple Next.js with our express server.
    // app and handle from "next" will now be available as req.app and req.handle.
    await next(app);

    // Normal routing, if you need it.
    // Use your SSR logic here.
    // Even if you don't do explicit routing the pages inside app/pages
    // will still get rendered as per their normal route.
    app.get('/', (req, res) => req.app.render(req, res, '/', {
        routeParam: req.params.routeParam
    }));

    app.listen(_port);
};

// Start the express server.
start(port);
