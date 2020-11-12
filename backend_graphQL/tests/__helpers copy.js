const { PrismaClient } = require('@prisma/client')


const { execSync } = require('child_process')
const getPort = require('get-port')
const { GraphQLClient } = require('graphql-request')
const { nanoid } = require('nanoid')
const { join } = require('path')
const { Client } = require('pg')
const server = require('../src/graphQLserver')
const { makeRange } = getPort

function createTestContext() {
  let ctx = {}
  const graphqlCtx = graphqlTestContext()
  const prismaCtx = prismaTestContext()
  beforeEach(async () => {
    const client = await graphqlCtx.before()
    const db = await prismaCtx.before()
    Object.assign(ctx, {
      client,
      db,
    })
  })
  afterEach(async () => {
    await graphqlCtx.after()
    await prismaCtx.after()
  })
  return ctx
}
function graphqlTestContext() {
  let serverInstance = null
  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) })
      serverInstance = await server.start({ port })
      return new GraphQLClient(`http://localhost:${port}`)
    },
    async after() {

      serverInstance.close()
    },
  }
}
function prismaTestContext() {
  const prismaBinary = join(__dirname, '../', 'node_modules', '.bin', 'prisma')
  let schema = ''
  let databaseUrl = ''
  let prismaClient = null
  return {
    async before() {
      // Generate a unique schema identifier for this test context
      schema = `test_${nanoid()}`
      // Generate the pg connection string for the test schema
      databaseUrl = `postgres://docker:docker@localhost:5432/testing?schema=${schema}`
      // Set the required environment variable to contain the connection string
      // to our database test schema
      process.env.DATABASE_URL = databaseUrl
      // Run the migrations to ensure our schema has the required structure
      execSync(`${prismaBinary} migrate up --create-db --experimental`, {
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
        },
      })
      const client = new Client({
        connectionString: databaseUrl,
      })
      await client.connect()
      const creatBrandTableQuery = `      
      CREATE TABLE IF NOT EXISTS ${schema}."Brand" (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(255)
      );`
      await client.query(creatBrandTableQuery)
      // await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
      // Construct a new Prisma Client connected to the generated Postgres schema
      prismaClient = new PrismaClient()
      return prismaClient
    },
    async after() {
      // Drop the schema after the tests have completed
      const client = new Client({
        connectionString: databaseUrl,
      })
      await client.connect()
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
      await client.end()
      // Release the Prisma Client connection
      await prismaClient?.$disconnect()
    },
  }
}
module.exports = { createTestContext }