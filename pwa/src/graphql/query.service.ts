import gql from 'graphql-tag'

export const GET_SERVICES = gql`
  query GetServices {
    services {
      id
      name
      description
      price
    }
  }
`
