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
      location
      accessCode
    }
  }
`

export const GET_ROOM_By_ID = gql`
  query GetRooms($id: String!) {
    room(id: $id) {
      id
      name
      description
      rating
      category
    }
  }
`
export const ROOM_BY_NAME_CAT = gql`
  query roomsByNameCat($searchRoomByName: String!, $searchRoomByCat: String!) {
    roomsByNameCat(
      searchRoomByName: $searchRoomByName
      searchRoomByCat: $searchRoomByCat
    ) {
      id
      name
      category
    }
  }
`

export const GET_ROOMS_WITHOUT_RESERVATION = gql`
  query GetRoomsWithoutReservation {
    roomsWithoutReservation {
      id
      name
      description
      rating
      category
      location
      accessCode
    }
  }
`
