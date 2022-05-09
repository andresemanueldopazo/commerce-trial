import { createContext } from 'react'
import useCustomer from '@framework/customer/use-customer'

import { Customer } from './types'
import { identifyCustomer } from './apiCalls';

export const CustomerInfoContext = createContext<Customer | undefined>(undefined)

export const putCustomerInContext = (): Customer | undefined => {
  const { data } = useCustomer();
  if (data) {
    const customer = data as Customer
    console.log("Database response: ", data)
    identifyCustomer("view Home page")(customer)
    return customer
  } else {
    console.log("Anonymous customer");
    return undefined
  }
};
