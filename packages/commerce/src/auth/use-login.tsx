import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { LoginHook } from '../types/login'
import type { Provider } from '..'
import { Customer, mkCustomer } from '../../../../site/segmentIntegration/types'
import { identifyCustomer } from '../../../../site/segmentIntegration/apiCalls'
import useCustomer from '../customer/use-customer'

const identifyCustomerLogin = identifyCustomer("Customer logged in")

export type UseLogin<
  H extends MutationHook<LoginHook<any>> = MutationHook<LoginHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<LoginHook> = mutationFetcher

const fn = (provider: Provider) => provider.auth?.useLogin!

const useLogin: UseLogin = (...args) => {
  const hook = useHook(fn)
  const result = useMutationHook({ fetcher, ...hook })(...args)
  const { data } = useCustomer()
  console.log("useLogin, data: ", data)
  if (!!data) {
    identifyCustomerLogin(mkCustomer(data as Customer))
  }
  return result
}

export default useLogin
