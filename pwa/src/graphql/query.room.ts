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

export const ROOM_BY_CATEGORY = gql`
  query roomsByCategory($searchRoomByCategory: String!) {
    roomsByCategory(searchRoomByCategory: $searchRoomByCategory) {
      id
      name
      category
    }
  }
`
