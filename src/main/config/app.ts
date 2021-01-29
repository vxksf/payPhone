import express from 'express'
import bodyParser from 'body-parser'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
setupMiddlewares(app)
setupRoutes(app)
export default app
