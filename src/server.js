const express = require('express')
const next = require('next')

const env = process.env.NODE_ENV || 'dev'
const config = require('../config/'+env+'.json');
const dev =  env !== 'production' || 'dev'
const port = process.env.NODE_PORT || config.port;


// Property "dir: './src'": see https://github.com/zeit/next.js/issues/819#issuecomment-308098780
const app = next({
  dir: './src',
  dev
})

const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+port)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})