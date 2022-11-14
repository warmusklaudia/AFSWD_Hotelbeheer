import gql from 'graphql-tag'

export const ADD_ROOM = gql`
  mutation createRoom($createRoomInput: CreateRoomInput!) {
    createRoom(createRoomInput: $createRoomInput) {
      name
      description
      rating
      category
      location
      accessCode
    }
  }
`

export const UPDATE_ROOM = gql`
  mutation updateRoom($UpdateRoomInput: UpdateRoomInput!) {
    updateRoom(updateRoomInput: $UpdateRoomInput) {
      id
    }
  }
`