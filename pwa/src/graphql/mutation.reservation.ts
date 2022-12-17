import gql from 'graphql-tag'

export const ADD_RESERVATION = gql`
  mutation createReservation($CreateReservationInput: CreateReservationInput!) {
    createReservation(createReservationInput: $CreateReservationInput) {
      id
    }
  }
`
