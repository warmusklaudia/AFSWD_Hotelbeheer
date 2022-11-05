import gql from 'graphql-tag'

export const UPDATE_ROOM = gql`
  mutation updateRoom($UpdateRoomInput: UpdateRoomInput!) {
    updateRoom(updateRoomInput: $UpdateRoomInput) {
      id
    }
  }
`
