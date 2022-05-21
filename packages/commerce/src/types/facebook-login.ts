export type FacebookLoginBody = {
  facebook: {
    token: string
  }
}

export type FacebookLoginTypes = {
  body: FacebookLoginBody
}

export type FacebookLoginHook<T extends FacebookLoginTypes = FacebookLoginTypes> = {
  data: null
  actionInput: FacebookLoginBody
  fetcherInput: FacebookLoginBody
  body: T['body']
}
