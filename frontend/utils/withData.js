import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { getDataFromTree } from '@apollo/react-ssr'
import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'

const BACKEND_URL = process.env.BACKEND_URL

function createClient({ initialState }) {

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          )
      }),

      createHttpLink({ uri: BACKEND_URL })

    ]),

    cache: new InMemoryCache({}).restore(initialState || {}),
  })
}

export default withApollo(createClient, { getDataFromTree })