import gql from 'graphql-tag'

export const GET_PRICES = gql`
  query getPrices {
    prices {
      rateId
      rateName
      price
    }
  }
`
export const PRICE_BY_ID = gql`
  query getPrice($id: String!) {
    price(id: $id) {
      rateId
      rateName
      price
    }
  }
`
