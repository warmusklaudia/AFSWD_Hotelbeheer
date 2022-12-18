import { gql } from 'apollo-boost'

export const GET_CLEANINGS = gql`
  query getCleanings {
    notFinishedCleanings {
      cleaningId
    }
  }
`
