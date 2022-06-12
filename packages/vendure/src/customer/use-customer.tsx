import { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { ActiveCustomerQuery } from '../../schema'
import { activeCustomerQuery } from '../utils/queries/active-customer-query'
import { CustomerHook } from '../types/customer'
import { normalizeCart } from '../utils/normalize'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    query: activeCustomerQuery,
  },
  async fetcher({ options, fetch }) {
    const { activeCustomer } = await fetch<ActiveCustomerQuery>({
      ...options,
    })
    return activeCustomer
      ? ({
          orders: activeCustomer.orders.items.map((order) => {
            return {
              code: order.code,
              orderPlacedAt: order.orderPlacedAt,
              shippingWithTax: order.shippingWithTax,
              state: order.state,
              totalPrice: order.totalWithTax / 100,
              currency: { code: order.currencyCode },
              lineItems: order.lines?.map((l) => ({
                id: l.id,
                quantity: l.quantity,
                name: l.productVariant.name,
                variant: {
                  price: l.discountedUnitPriceWithTax / 100,
                  listPrice: l.unitPriceWithTax / 100,
                  image: {
                    url: l.featuredAsset?.preview + '?preset=thumb' || '',
                  },

                  // id: l.productVariant.id,
                  // name: l.productVariant.name,
                  // sku: l.productVariant.sku,
                  // requiresShipping: true,
                },
                path: l.productVariant.name,

                // url: l.productVariant.product.slug,
                // variantId: l.productVariant.id,
                // productId: l.productVariant.productId,
                // images: [{ url: l.featuredAsset?.preview + '?preset=thumb' || '' }],
                // discounts: l.discounts.map((d) => ({ value: d.amount / 100 })),
              })),          
            }
          }),
          firstName: activeCustomer.firstName ?? '',
          lastName: activeCustomer.lastName ?? '',
          email: activeCustomer.emailAddress ?? '',
        } as any)
      : null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
