import gql from 'graphql-tag'

export const GET_ROOMS = gql`
  query GetRooms {
    rooms {
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
      reservation {
        cleaning {
          cleaningId
          changeTheLinens
          clearTheTrash
          disinfectSurfaces
          cleanTheBathroom
          vacuumTheFloor
          mopTheFloor
          finish
          finishDate
          cleanedBy {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`

export const GET_ROOM = gql`
  query room($id: String!) {
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

export const GET_ROOM_BY_ID = gql`
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

export const GET_ROOMS_WITH_RESERVATION = gql`
  query GetRoomsWithReservation {
    roomsWithReservation {
      id
      name
      description
      rating
      category
      location
      accessCode
      reservation {
        cleaning {
          finish
        }
      }
    }
  }
`

export const ROOM_INSERT_DATA = gql`
  query insertData {
    rooms {
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
