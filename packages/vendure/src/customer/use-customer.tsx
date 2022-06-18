import { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { ActiveCustomerQuery } from '../../schema'
import { activeCustomerQuery } from '../utils/queries/active-customer-query'
import { CustomerHook } from '../types/customer'
import { normalizeOrder } from '../utils/normalize'

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
          orders: {
            items: activeCustomer.orders.items.map(normalizeOrder),
            totalItems: activeCustomer.orders.totalItems,
          },
          firstName: activeCustomer.firstName ?? '',
          lastName: activeCustomer.lastName ?? '',
          email: activeCustomer.emailAddress ?? '',
        })
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
