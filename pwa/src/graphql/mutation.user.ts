import gql from 'graphql-tag'

export const ADD_CREDITS_TO_USER = gql`
  mutation addCreditsToUser($id: String!, $amount: Float!) {
    addCreditsToUser(id: $id, amount: $amount) {
      id
      uid
      amountCredits
      role {
        name
      }
      firstName
      lastName
      imgUrl
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      uid
      amountCredits
      role {
        name
      }
      firstName
      lastName
      imgUrl
    }
  }
`
