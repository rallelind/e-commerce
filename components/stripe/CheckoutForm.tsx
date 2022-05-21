import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import stripeStyles from "../../styles/Stripe.module.css";


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    console.log(stripe.retrievePaymentIntent(clientSecret))

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    console.log(process.env.NEXT_PUBLIC_STRIPE_RETURN_URL)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_STRIPE_RETURN_URL}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };


  return (
    <div>
    <form id={stripeStyles.paymentForm} className={stripeStyles.stripeForm} onSubmit={handleSubmit}>
      <PaymentElement id={stripeStyles.paymentElement} />
      <button className={stripeStyles.btn} disabled={isLoading || !stripe || !elements} id={stripeStyles.submit}>
        <span id={stripeStyles.buttonText}>
          {isLoading ? <div className={stripeStyles.spinner} id={stripeStyles.spinner}></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id={stripeStyles.paymentMessage}>{message}</div>}
    </form>
    </div>
  );
}