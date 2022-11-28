import gql from 'graphql-tag'

export const ADD_REQUESTED_SERVICE = gql`
  mutation createRequestedService(
    $createRequestedServiceInput: CreateRequestedServiceInput!
  ) {
    createRequestedService(
      createRequestedServiceInput: $createRequestedServiceInput
    ) {
      id
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
      resolved
      resolvedDate
    }
  }
`
