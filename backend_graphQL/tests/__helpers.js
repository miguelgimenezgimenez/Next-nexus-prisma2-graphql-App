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

      schema = `test_${nanoid()}`
   
      databaseUrl = `postgres://docker:docker@localhost:5432/testing?schema=${schema}`
      // Set the required environment variable to contain the connection string
      // to our database test schema
      process.env.DATABASE_URL = databaseUrl

      const client = new Client({
        connectionString: databaseUrl,
      })
      await client.connect()


      await client.query(`CREATE SCHEMA "${schema}"`)

      // TODO fix scripts to populate database for testing
      const creatBrandTableQuery = `      
      CREATE TABLE  "${schema}"."Brand" (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(255)
      );`
      const createPhoneTableQuery = `      
      CREATE TABLE  "${schema}"."Phone" (
        id SERIAL PRIMARY KEY NOT NULL,
        link VARCHAR(255),
        image VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        dimensions VARCHAR(255),
        os VARCHAR(255),
        storage VARCHAR(255),
        "brand_id" INTEGER NOT NULL,
        CONSTRAINT BRAND FOREIGN KEY ("brand_id") REFERENCES "${schema}"."Brand"(id) on delete SET NULL
      );`
      const createBrand = `      
      INSERT INTO  "${schema}"."Brand" (id, name)
      VALUES (1,'Apple')`
      await client.query(creatBrandTableQuery)
      await client.query(createPhoneTableQuery)
      await client.query(createBrand)
      await client.end()


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