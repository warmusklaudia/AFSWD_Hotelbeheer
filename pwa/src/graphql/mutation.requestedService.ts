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
