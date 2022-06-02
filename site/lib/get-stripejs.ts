/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>
const getStripe = () => {
  if (!stripePromise) {
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    stripePromise = loadStripe("pk_test_51KmeyhA2nLQzAWlqvszYaBc86SPhYWsuG9oMSfqE1s77kM3djgqNO10cbTSBjvGFPSetNuZXVAHDXmB6B8X6lPsY00m5LFZ1ce")
  }
  return stripePromise
}

export default getStripe
