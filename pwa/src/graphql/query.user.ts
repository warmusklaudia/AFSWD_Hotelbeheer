import gql from 'graphql-tag'

export const GET_USER_BY_UID = gql`
  query findByUid($uid: String!) {
    findByUid(uid: $uid) {
      id
      uid
      role {
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_CURRENT_USER = gql`
  query findByCurrentUserUid {
    findByCurrentUserUid {
      id
      uid
      amountCredits
      role {
        name
      }
    }
  }
`
