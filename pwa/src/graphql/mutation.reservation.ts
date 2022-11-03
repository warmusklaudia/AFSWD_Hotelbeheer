import gql from 'graphql-tag'

export const ADD_RESERVATION = gql`
  mutation createReservation($createReservationInput: createReservationInput!) {
    createLocation(createReservationInput: $createReservationInput) {
      id
      name
    }
  }
`
