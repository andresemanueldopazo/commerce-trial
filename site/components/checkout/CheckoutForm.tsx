import React, {FC, useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button } from '@components/ui'
import { Stripe } from '@stripe/stripe-js';
import usePrice from '@framework/product/use-price';
import { useCart } from '@framework/cart';

const CheckoutForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { data } = useCart()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: shippingPrice } = usePrice(
    data && {
      amount: Number(data.shippingWithTax/100),
      currencyCode: data.currency.code,
    }
  )

  const handleSubmit = async (event: { preventDefault: (arg0: Stripe | null) => void; }) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault(stripe);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://localhost:3000/orders',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      // setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="px-4 sm:px-6 flex-1">
        <ul className="pb-2">
          <li className="flex justify-between py-1">
            <span>Subtotal</span>
            <span>{subTotal}</span>
          </li>
          <li className="flex justify-between py-1">
            <span>Shipping</span>
            <span>{shippingPrice}</span>
          </li>
        </ul>
        <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
          <span>Total</span>
          <span>{total}</span>
        </div>
        <PaymentElement onReady={()=> setLoading(false)}/>
      </div>
      {!loading? (
        <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
          <Button disabled={!stripe} type="submit" width="100%">
            Pay
          </Button>
        </div>
      ) : null}
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default CheckoutForm;