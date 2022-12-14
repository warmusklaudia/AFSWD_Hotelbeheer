import gql from 'graphql-tag'

export const GET_REQUESTED_SERVICES = gql`
  query GetRequestedServices {
    requestedServices {
      id
      user {
        uid
        firstName
        lastName
        imgUrl
      }
      service {
        id
        name
        price
      }
      message
      requestedDate
      resolvedDate
      resolved
    }
  }
`

export const GET_REQUESTED_SERVICE = gql`
  query GetRequestedService($id: String!) {
    requestedService(id: $id) {
      id
      user {
        uid
        firstName
        lastName
        imgUrl
      }
      service {
        id
        name
        price
      }
      message
      requestedDate
      resolvedDate
      resolved
    }
  }
`

export const GET_REQUESTED_SERVICES_BY_USER_ID = gql`
  query GetRequestedServicesByUserId($uid: String!) {
    findRequestedServicesByUserId(uid: $uid) {
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

export const GET_UNRESOLVED_SERVICES = gql`
  query getUnresolvedServices {
    unresolvedRequestedServices {
      id
      user {
        uid
        firstName
        lastName
        imgUrl
      }
      service {
        id
        name
        price
      }
      message
      requestedDate
      resolvedDate
      resolved
    }
  }
`
