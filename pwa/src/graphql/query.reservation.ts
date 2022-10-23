import gql from 'graphql-tag';

export const GET_RESERVATIONS = gql`
  query GetReservations {
    reservations {
        id
        rooms
        reservationStartDate
    }
  }`