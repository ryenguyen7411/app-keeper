import express from 'express'
import graphqlHTTP from 'express-graphql'
//import jwt from 'express-jwt'

import cors from 'cors'
import logger from 'morgan'

import schema from './src/schemas'
import routes from './src/routes'

import models from './db/models'
const { /*User, Session, Role, */ Sequelize } = models
const { gte } = Sequelize.Op

// Set up the express app
const app = express()
app.use('*', cors({ origin: 'http://localhost:3000' }))

// Log requests to the console.
app.use(logger('dev'))

// app.use('*', async (req, res, next) => {
//   /** Validated request header */
//   const user = req.headers.auth
//     ? await User.findOne({
//         where: { auth_id: req.header.auth, attributes: ['id', 'role_value'] }
//       })
//     : null

//   const session = req.header.session
//     ? await Session.findOne({
//         where: { session: session, expired_at: { [gte]: new Date() } }
//       })
//     : null

//   req.context = { user: user, session: session }

//   next()
// })

// GraphqQL server route
app.use(
  '/graphiql',
  graphqlHTTP(req => ({ schema, graphiql: true, pretty: true }))
)

// Main route
routes(app)

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.'
  })
)

export default app
