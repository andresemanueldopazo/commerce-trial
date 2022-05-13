import * as Core from '@vercel/commerce/types/login'
import { GoogleLoginBody, GoogleLoginTypes } from '@vercel/commerce/types/google-login'
import type { LoginMutationVariables } from '../../schema'

export * from '@vercel/commerce/types/google-login'

export type GoogleLoginHook<T extends GoogleLoginTypes = GoogleLoginTypes> = {
  data: null
  actionInput: GoogleLoginBody
  fetcherInput: GoogleLoginBody
  body: T['body']
}
