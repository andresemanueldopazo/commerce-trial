import useAddItem, {
  UseAddItem,
} from '@vercel/commerce/customer/card/use-add-item'
import useCards from '@vercel/commerce/customer/card/use-cards'
import { AddItemHook } from '@vercel/commerce/types/customer/card'
import { CommerceError } from '@vercel/commerce/utils/errors'
import { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import { setOrderBillingAddress } from '../../utils/mutations/set-order-billing-address'
import {
  ActiveOrderResult,
  EligibleShippingMethodsQuery,
  MutationSetOrderBillingAddressArgs,
  SetOrderShippingMethodResult,
} from '../../../schema'
import { eligibleShippingMethods } from '../../utils/queries/eligible-shipping-methods'
import { setOrderShippingMethod } from '../../utils/mutations/set-order-shipping-method'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: setOrderBillingAddress,
  },
  async fetcher({ input: item, options, fetch }) {
    const variables: MutationSetOrderBillingAddressArgs = {
      input: {
        fullName: `${item.firstName || ''} ${item.lastName || ''}`,
        company: item.company,
        streetLine1: item.streetNumber,
        // TODO: Because of TS error apartments
        // streetLine2: item.apartments,
        postalCode: item.zipCode,
        city: item.city,
        // TODO: Since country is statically coming as a HongKong
        countryCode: 'JP',
      },
    }
    const data = await fetch<ActiveOrderResult>({
      ...options,
      variables,
    })
    const eligibleMethods = await fetch<EligibleShippingMethodsQuery>({
      ...options,
      query: eligibleShippingMethods,
    })
    const shippingMethodId =
      eligibleMethods?.['eligibleShippingMethods']?.[0].id
    if (shippingMethodId) {
      await fetch<SetOrderShippingMethodResult>({
        ...options,
        query: setOrderShippingMethod,
        variables: {
          shippingMethodId,
        },
      })
    }

    if (data.__typename === 'Order') {
      // TODO: Not sure what card we should return
      return {
        id: '',
        mask: '',
        provider: '',
      }
    } else if (data.__typename === 'NoActiveOrderError') {
      throw new CommerceError({
        code: data.errorCode,
        message: data.message,
      })
    }
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useCards()

      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })

          await mutate([data], false)

          return data
        },
        [fetch, mutate]
      )
    },
}
