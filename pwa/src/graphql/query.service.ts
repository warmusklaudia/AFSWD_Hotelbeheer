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

export const GET_SERVICE = gql`
  query getService($id: String!) {
    service(id: $id) {
      name
    }
  }
`
