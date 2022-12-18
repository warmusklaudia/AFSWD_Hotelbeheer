import gql from 'graphql-tag'

export const ADD_REQUESTED_SERVICE = gql`
  mutation createRequestedService(
    $createRequestedServiceInput: CreateRequestedServiceInput!
  ) {
    createRequestedService(
      createRequestedServiceInput: $createRequestedServiceInput
    ) {
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

export const UPDATE_REQUESTED_SERVICE = gql`
  mutation updateRequestedService(
    $updateRequestedServiceInput: UpdateRequestedServiceInput!
  ) {
    updateRequestedService(
      updateRequestedServiceInput: $updateRequestedServiceInput
    ) {
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
