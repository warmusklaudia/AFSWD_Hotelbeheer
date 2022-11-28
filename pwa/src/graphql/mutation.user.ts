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
    }
  }
`
