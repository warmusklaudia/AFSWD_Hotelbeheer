import gql from 'graphql-tag'

export const ADD_ROOM = gql`
  mutation createRoom($createRoomInput: CreateRoomInput!) {
    createRoom(createRoomInput: $createRoomInput) {
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

export const UPDATE_ROOM = gql`
  mutation updateRoom($updateRoomInput: UpdateRoomInput!) {
    updateRoom(updateRoomInput: $updateRoomInput) {
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

export const DELETE_ROOM = gql`
  mutation removeRoom($id: String!) {
    removeRoom(id: $id) {
      id
    }
  }
`
