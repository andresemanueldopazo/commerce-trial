import { orderAddressFragment } from './order-address-fragment'

export const cartFragment = /* GraphQL */ `
  fragment Cart on Order {
    id
    code
    createdAt
    totalQuantity
    subTotal
    subTotalWithTax
    total
    totalWithTax
    currencyCode
    customer {
      id
    }
    shippingAddress {
      ...OrderAddressFragment
    }
    shippingWithTax
    billingAddress {
      ...OrderAddressFragment
    }
    lines {
      id
      quantity
      linePriceWithTax
      discountedLinePriceWithTax
      unitPriceWithTax
      discountedUnitPriceWithTax
      featuredAsset {
        id
        preview
      }
      discounts {
        description
        amount
      }
      productVariant {
        id
        name
        sku
        price
        priceWithTax
        stockLevel
        product {
          slug
        }
        productId
      }
    }
  }
  ${orderAddressFragment}
`
