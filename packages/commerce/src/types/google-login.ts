export type GoogleLoginBody = {
  google: {
    token: string
  }
}

export type GoogleLoginTypes = {
  body: GoogleLoginBody
}

export type GoogleLoginHook<T extends GoogleLoginTypes = GoogleLoginTypes> = {
  data: null
  actionInput: GoogleLoginBody
  fetcherInput: GoogleLoginBody
  body: T['body']
}
