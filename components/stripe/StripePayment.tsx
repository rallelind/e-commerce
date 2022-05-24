import React, { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import stripeStyles from "../../styles/Stripe.module.css";

import CheckoutForm from "./CheckoutForm";

interface appearance {
    theme: 'flat';
}

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PK}`)

const StripePayment = ({ amountOfDays, productId, dates }) => {

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {

        const body = { amountOfDays, productId, dates }

        fetch(`/api/stripe/payment-intents/${String(productId)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.client_secret))
    }, [amountOfDays, dates, productId])

    const appearance: appearance = {
        theme: 'flat'
    }

    const options = {
        clientSecret,
        appearance,
    }

    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default StripePayment