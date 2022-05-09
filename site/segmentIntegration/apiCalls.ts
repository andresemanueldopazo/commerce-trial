import { Customer, Product } from './types'

export const identifyCustomer = (msg: string) => (customer: Customer) => {
  (window as any).analytics.identify(msg, {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  })
}

export const trackProductView = (p: Product) => {
  (window as any).analytics.track(`${p.name} viewed`, {
    event: "view product",
    productId: p.id,
    productName: p.name,
    productPrice: p.price,
  })
}
