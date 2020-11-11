const { makeSchema, connectionPlugin } = require('@nexus/schema')
const { nexusPrisma } = require('nexus-plugin-prisma')
const typeDefs = require('./graphql')


const schema = makeSchema({
  types: typeDefs,
  plugins: [
    nexusPrisma({ experimentalCRUD: true }), 
    connectionPlugin({
    includeNodesField: true,
    extendConnection: {
      totalCount: { type: 'Int' },
    },
  })
    ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
})



module.exports = { schema }
