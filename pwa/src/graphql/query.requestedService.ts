import gql from 'graphql-tag'

export const GET_REQUESTED_SERVICES = gql`
  query GetRequestedServices {
    requestedServices {
      id
      service {
        id
        name
        price
      }
      requestedDate
    }
  }
`

export const GET_REQUESTED_SERVICE = gql`
  query GetRequestedService($id: String!) {
    requestedService(id: $id) {
      id
      service {
        id
        name
        price
      }
      requestedDate
    }
  }
`

export const GET_REQUESTED_SERVICES_BY_USER_ID = gql`
  query GetRequestedServicesByUserId($uid: String!) {
    findByUserId(uid: $uid) {
      id
      service {
        id
        name
        price
      }
      requestedDate
    }
  }
`