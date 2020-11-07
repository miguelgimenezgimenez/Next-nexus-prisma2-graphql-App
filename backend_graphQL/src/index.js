
const graphQLServer = require('./graphQLserver')

graphQLServer.start({
  cors: {
    origin: process.env.FRONTEND_URL
  }
}, () =>
  console.log(
    `🚀 Server ready at: http://localhost:4000 ⭐️`,
  ),
)