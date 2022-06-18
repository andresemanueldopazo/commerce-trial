import { useCallback } from 'react'
import { MutationHook } from '@vercel/commerce/utils/types'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/cart/use-remove-item'
import { CommerceError } from '@vercel/commerce/utils/errors'
import useCart from './use-cart'
import {
  RemoveOrderLineMutation,
  RemoveOrderLineMutationVariables,
} from '../../schema'
import { normalizeCart } from '../utils/normalize'
import { RemoveItemHook } from '../types/cart'
import { removeOrderLineMutation } from '../utils/mutations/remove-order-line-mutation'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    query: removeOrderLineMutation,
  },
  async fetcher({ input, options, fetch }) {
    const variables: RemoveOrderLineMutationVariables = {
      orderLineId: input.itemId,
    }
    const { removeOrderLine } = await fetch<RemoveOrderLineMutation>({
      ...options,
      variables,
    })

    if (removeOrderLine.__typename === 'Order') {
      return normalizeCart(removeOrderLine)
    }
    throw new CommerceError(removeOrderLine)
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()

      return useCallback(
        async function removeItem(input) {
          const data = await fetch({ input: { itemId: input.id } })
          await mutate(data, false)
          return data
        },
        [fetch, mutate]
      )
    },
}
