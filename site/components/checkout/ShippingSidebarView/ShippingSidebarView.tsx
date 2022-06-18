import { FC } from 'react'
import cn from 'clsx'

import Button from '@components/ui/Button'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import useAddAddress from '@framework/customer/address/use-add-item'
import useSWR from 'swr'
import { fetcher as fetch } from '@framework/fetcher'
import { eligibleShippingMethods } from '@framework/utils/queries/eligible-shipping-methods'
import s from './ShippingSidebarView.module.css'
import { setOrderShippingMethod } from '@framework/utils/mutations/set-order-shipping-method'

interface Form extends HTMLFormElement {
  cardHolder: HTMLInputElement
  cardNumber: HTMLInputElement
  cardExpireDate: HTMLInputElement
  cardCvc: HTMLInputElement
  firstName: HTMLInputElement
  lastName: HTMLInputElement
  company: HTMLInputElement
  streetNumber: HTMLInputElement
  zipCode: HTMLInputElement
  city: HTMLInputElement
  country: HTMLSelectElement
}

const ShippingSidebarView: FC = () => {
  const { setSidebarView, closeSidebar } = useUI()
  const addAddress = useAddAddress()

  const fetcher = async () => {
      return await fetch({query: eligibleShippingMethods});
  }
  const { data, error } = useSWR('/eligibleShippingMethods', fetcher, {
    revalidateOnFocus: false,
  })

  async function handleSubmit(event: React.ChangeEvent<Form>) {
    event.preventDefault()
    const response = await fetch({
      query: setOrderShippingMethod,
      variables: {
        shippingMethodId: data.eligibleShippingMethods.filter(
          (e: any) => e.name == (event.target.method as any).value
        )[0].id
      },
    })

    await addAddress({
      // type: event.target.type.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      company: event.target.company.value,
      streetNumber: event.target.streetNumber.value,
      apartments: event.target.streetNumber.value,
      zipCode: event.target.zipCode.value,
      city: event.target.city.value,
      country: event.target.country.value,
    })

    setSidebarView('STRIPE_SIDEBAR_VIEW')
  }

  return (
    <form className="h-full" onSubmit={handleSubmit}>
      <SidebarLayout handleBack={() => setSidebarView('CART_VIEW')}>
        <div className="px-4 sm:px-6 flex-1">
          <h2 className="pt-1 stickypb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
            Shipping
          </h2>
          <div>
            <div className={s.fieldset}>
              <label className={s.label}>Shipping Method</label>
              <select name="method" className={s.select}>
                {data? (data!.eligibleShippingMethods.map((item: any) => (
                    <option id={item.id}>{item.name}</option>
                  ))) : null}
              </select>
            </div>
            <hr className="border-accent-2 my-6" />
            <div className={s.fieldset}>
              <label className={s.label}>Country/Region</label>
            </div>
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}>First Name</label>
                <input name="firstName" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}>Last Name</label>
                <input name="lastName" className={s.input} />
              </div>
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>Company (Optional)</label>
              <input name="company" className={s.input} />
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>Street and House Number</label>
              <input name="streetNumber" className={s.input} />
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>
                Apartment, Suite, Etc. (Optional)
              </label>
              <input name="apartments" className={s.input} />
            </div>
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}>Postal Code</label>
                <input name="zipCode" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}>City</label>
                <input name="city" className={s.input} />
              </div>
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>Country/Region</label>
              <select name="country" className={s.select}>
                <option>Hong Kong</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
          <Button type="submit" width="100%">
            Continue
          </Button>
        </div>
      </SidebarLayout>
    </form>
  )
}

export default ShippingSidebarView
