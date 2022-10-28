import gql from 'graphql-tag'

export const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      id
      name
      description
      rating
      category
    }
  }
`

export const GET_ROOM_By_ID = gql`
  query GetRooms {
    rooms {
      id
      name
      description
      rating
      category
    }
  }
`