import { FC } from 'react'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import s from './CheckoutSidebarView.module.css'
import CheckoutForm from '../CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { fetcher as fetch } from '@framework/fetcher'
import getStripe from '@lib/get-stripejs'
import useSWR from 'swr'

const CheckoutSidebarView: FC = () => {
  const { setSidebarView } = useUI()

  const query = /* GraphQL */ `
    mutation createStripePaymentIntent {
      createStripePaymentIntent
    }
  `
  const fetcher = async () => {
    return await fetch({query});
  }
  const { data, error } = useSWR('/createStripePaymentIntent', fetcher, {
    revalidateOnFocus: false,
  })

  return (
    <SidebarLayout
      className={s.root}
      handleBack={() => setSidebarView('SHIPPING_VIEW')}
    >
      <div className="px-4 sm:px-6 flex-1">
        <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
          Payment
        </h2>
      </div>
      {data? (
        <Elements stripe={getStripe()} options={{clientSecret: data.createStripePaymentIntent}}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </SidebarLayout>
  )
}

export default CheckoutSidebarView
