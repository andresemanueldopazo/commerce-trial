import { cartFragment } from '../fragments/cart-fragment'

export const activeCustomerQuery = /* GraphQL */ `
  query activeCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      orders(options: { filter: { state: {notIn: ["Cancelled", "AddingItems"]}}}) {
        items {
          id
          code
          state
          orderPlacedAt
          lines {
            id
            quantity
            productVariant {
              name
            }
            discountedUnitPriceWithTax
            unitPriceWithTax
            featuredAsset {
              preview
            }
          }
          currencyCode
          shippingWithTax
          totalWithTax
        }
        totalItems
      }
    }
  }
`
