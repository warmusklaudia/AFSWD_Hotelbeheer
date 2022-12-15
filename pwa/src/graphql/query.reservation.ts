import gql from 'graphql-tag'

export const GET_RESERVATIONS = gql`
  query GetReservations {
    reservations {
      id
      amountRooms
      amountAdults
      amountChildren
      reservationStartDate
      reservationEndDate
      price
      user {
        firstName
        lastName
      }
      rooms {
        id
        name
      }
      breakfastAccess
    }
  }
`

export const RESERVATION_BY_ID = gql`
  query GetReservation($id: String!) {
    reservation(id: $id) {
      id
      amountRooms
      amountAdults
      amountChildren
      reservationStartDate
      reservationEndDate
      price
      user {
        firstName
        lastName
      }
      rooms {
        id
        name
      }
      breakfastAccess
    }
  }
`

export const GET_RESERVATION_BY_ID = gql`
  query GetReservation($id: String!) {
    reservation(id: $id) {
      id
      amountRooms
      amountAdults
      amountChildren
      breakfastAccess
      reservationStartDate
      reservationEndDate
      rooms {
        id
        name
        accessCode
      }
      price
    }
  }
`

export const GET_RESERVATIONS_BY_USER_ID = gql`
  query GetReservationsByUserId($uid: String!) {
    findReservationsByUserId(uid: $uid) {
      id
      amountAdults
      amountChildren
      reservationStartDate
      reservationEndDate
      price
    }
  }
`

export const GET_RESERVATIONS_WITH_ROOMS_BY_USER_ID = gql`
  query GetReservationsWithRoomsByUserId($uid: String!) {
    findReservationsByUserId(uid: $uid) {
      id
      rooms {
        id
        name
        accessCode
      }
      breakfastAccess
    }
  }
`

export const GET_RESERVATIONS_WITH_BREAKFAST = gql`
  query getReservationsWithBreakfast {
    reservationsWithBreakfast {
      user {
        id
        firstName
        lastName
        imgUrl
      }
      breakfastAccess
      reservationStartDate
      reservationEndDate
    }
  }
`
export const RESERVATIONS_BY_USER_ID = gql`
  query GetReservationsByUserId($uid: String!) {
    findReservationsByUserId(uid: $uid) {
      id
      amountAdults
      amountChildren
      reservationStartDate
      reservationEndDate
      rooms {
        name
      }
    }
  }
`
