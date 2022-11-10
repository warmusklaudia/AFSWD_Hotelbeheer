import gql from 'graphql-tag'

export const PRICE_BY_RESTIME = gql`
  query priceByReservationTime($reservationTime: String!) {
    priceByReservationTime(reservationTime: $reservationTime) {
      child
      adult
      night
      standard
      luxe
      breakfast
    }
  }
`

export const GET_PRICES = gql`
  query getPrices {
    prices {
      id
      child
      adult
      night
      standard
      luxe
      breakfast
      childWeekend
      adultWeekend
      nightWeekend
      standardWeekend
      luxeWeekend
      breakfastWeekend
    }
  }
`
