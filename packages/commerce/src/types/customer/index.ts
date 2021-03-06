export * as Card from './card'
export * as Address from './address'

export type OrderResume = {
  code: string
  orderPlacedAt: any
  shippingWithTax: number
  state: string
  totalPrice: number
  currency: {
    code: string
  }
  lineItems: {
    id: string
    quantity: number
    name: string
    variant: {
      price: number
      listPrice: number
      image: {
        url: string
      }
    }
    path: string
  }[]
}

export type Customer = {
  orders: {
    items: OrderResume[]
    totalItems: number
  }
  firstName: string
  lastName: string
  email: string
}

export type CustomerTypes = {
  customer: Customer
}

export type CustomerHook<T extends CustomerTypes = CustomerTypes> = {
  data: T['customer'] | null
  fetchData: { customer: T['customer'] } | null
}

export type CustomerSchema<T extends CustomerTypes = CustomerTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getLoggedInCustomer: {
        data: { customer: T['customer'] } | null
      }
    }
  }
}
