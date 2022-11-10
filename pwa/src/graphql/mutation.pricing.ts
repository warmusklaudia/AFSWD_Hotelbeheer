import gql from 'graphql-tag'

export const UPDATE_PRICES = gql`
  mutation updatePricing($updatePricingInput: UpdatePricingInput!) {
    updatePricing(updatePricingInput: $updatePricingInput) {
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
