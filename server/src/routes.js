import graphqlHTTP from 'express-graphql'

import tagSchema from './schemas/tag'

const routes = app => {
  app.use(
    '/tags',
    graphqlHTTP(req => ({ schema: tagSchema, pretty: true, graphiql: true }))
  )
}

export default routes
