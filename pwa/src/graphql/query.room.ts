import gql from 'graphql-tag'

export const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      id
      name
      description
      rating
    }
  }
`
