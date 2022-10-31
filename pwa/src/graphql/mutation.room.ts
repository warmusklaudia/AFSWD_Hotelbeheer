import gql from 'graphql-tag'

export const ADD_ROOM = gql`
  mutation createRoom($createRoomInput: CreateRoomInput!) {
    createRoom(createRoomInput: $createRoomInput) {
      name
      description
      reservationId
      rating
      category
      location
    }
  }
`