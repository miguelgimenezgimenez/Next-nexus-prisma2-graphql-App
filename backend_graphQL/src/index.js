const graphQLServer = require('./graphQLserver')

graphQLServer.start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000 ⭐️`,
  ),
)