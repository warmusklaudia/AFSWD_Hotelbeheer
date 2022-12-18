import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import useAuthentication from './useAuthentication'
import { setContext } from '@apollo/client/link/context'

export default () => {
  const { user } = useAuthentication()

  const cache = new InMemoryCache({
    typePolicies: {
      Rooms: {
        merge(existing, incoming, { mergeObjects }) {
          return mergeObjects(existing, incoming)
        },
      },
    },
  })
  const httpLink = createHttpLink({
    uri: 'http://[::1]:3003/graphql',
    credentials: 'same-origin',
  })

  const authLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      authorization: (await user.value?.getIdToken())
        ? `Bearer ${await user.value?.getIdToken()}`
        : '',
    },
  }))

  const apolloClient = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
  })

  return {
    apolloClient,
  }
}
