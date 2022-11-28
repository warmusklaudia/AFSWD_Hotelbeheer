import gql from 'graphql-tag'

export const ADD_CREDITS_TO_USER = gql`
  mutation addCreditsToUser($id: String!, $amount: Int!) {
    addCreditsToUser(id: $id, amount: $amount) {
      id
      uid
      amountCredits
    }
  }
`
