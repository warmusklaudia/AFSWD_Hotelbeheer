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
export const ROOM_BY_ID = gql`
  query getRoom($id: String!) {
    room(id: $id) {
      id
      name
      description
      rating
      category
    }
  }
`

export const ROOM_BY_NAME = gql`
  query roomsByName($searchRoomByName: String!) {
    roomsByName(searchRoomByName: $searchRoomByName) {
      id
      name
      category
    }
  }
`
