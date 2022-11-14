import gql from 'graphql-tag'

export const UPDATE_PRICES = gql`
  mutation updatePricing($updatePricingInput: UpdatePricingInput!) {
    updatePricing(updatePricingInput: $updatePricingInput) {
      rateId
      rateName
      price
    }
  }
`
