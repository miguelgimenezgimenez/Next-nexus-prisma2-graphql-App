const { GraphQLServer } = require('graphql-yoga')
const { createContext } =require('./context')
const { schema } = require('./schema')

const graphQLServer = new GraphQLServer({
  schema,
  context: createContext,
})
module.exports = graphQLServer
