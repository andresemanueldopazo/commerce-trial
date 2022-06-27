import { useCallback } from 'react'
import { MutationHook } from '@vercel/commerce/utils/types'
import useGoogleLogin, {
  UseGoogleLogin,
} from '@vercel/commerce/auth/use-google-login'
import { GoogleLoginHook } from '../types/google-login'
import useCustomer from '../customer/use-customer'
import { googleLoginMutation } from '../utils/mutations/google-log-in-mutation'

export default useGoogleLogin as UseGoogleLogin<typeof handler>

export const handler: MutationHook<GoogleLoginHook> = {
  fetchOptions: {
    query: googleLoginMutation,
  },
  async fetcher({ input: { google: token }, options, fetch }) {
    const variables: any = {
      token,
    }

    const { googleLogin } = await fetch<any>({
      ...options,
      variables,
    })

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()

      return useCallback(
        async function googleLogin(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch, mutate]
      )
    },
}
