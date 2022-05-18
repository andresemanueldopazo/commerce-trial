import { Customer, Product } from './types'

export const identifyCustomer = (customer: Customer) => {
  (window as any).analytics.identify(customer.id, {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  })
}

export const trackProductView = (p: Product) => {
  (window as any).analytics.track(`Product Viewed`, {
    product_id: p.id,
    name: p.name,
    price: p.price,
  })
}
