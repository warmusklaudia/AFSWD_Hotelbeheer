import gql from 'graphql-tag'

export const GET_USER_BY_UID = gql`
  query findByUid($uid: String!) {
    findByUid(uid: $uid) {
      id
      uid
      firstName
      lastName
      amountCredits
      role {
        name
      }
      preferredLanguage
      imgUrl
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
      firstName
      lastName
      imgUrl
    }
  }
`

export const GET_USERS = gql`
  query users {
    users {
      id
      uid
      firstName
      lastName
      imgUrl
      role {
        name
      }
    }
  }
`
