export type { Product } from '@commerce/types/product'

export type Customer = {
  id: string
  firstName: string
  lastName: string
  email: string
}

// This allows to pass a subset of Costumer and return a Costumer object.
export function mkCustomer({
  id = "",
  firstName = "",
  lastName = "",
  email = ""
}): Customer {
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
  }
}
