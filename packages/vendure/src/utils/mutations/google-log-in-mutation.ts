export const googleLoginMutation =
  /* GraphQL */
  `
    mutation Authenticate($token: String!) {
      authenticate(input: { google: { token: $token } }) {
        ... on CurrentUser {
          id
          identifier
        }
      }
    }
  `
