import express from 'express'
import forceSSL from 'express-force-ssl'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'
const path = require('path')

export default (apiRoot, routes) => {
  const app = express()
  const publicPath = path.join(__dirname, '../../', 'public')
  /* istanbul ignore next */
  if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true
    })
    app.use(forceSSL)
  }

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }
  app.use(express.static(publicPath))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
  return app
}
