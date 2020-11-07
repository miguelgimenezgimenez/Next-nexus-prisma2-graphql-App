const { GraphQLServer } = require('graphql-yoga')
const { nexusPrisma } = require('nexus-plugin-prisma')
const { createContext } =require('./context')
const { schema } = require('./schema')

const graphQLServer = new GraphQLServer({
  schema,
  context: createContext,
})
module.exports = graphQLServer
