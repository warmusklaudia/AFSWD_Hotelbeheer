import gql from 'graphql-tag';

export const GET_RESERVATIONS = gql`
  query GetReservations {
    reservations {
        id
        rooms
        reservationStartDate
    }
  }`

export const GET_RESERVATION_BY_ID = gql`
  query GetReservation($id: String!) {
    reservation(id: $id) {
        id
        reservationStartDate
        reservationEndDate
        price
    }
  }`