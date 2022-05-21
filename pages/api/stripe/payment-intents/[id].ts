import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Stripe from "stripe";
import prisma from "../../../../lib/prisma";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {

    const productId = req.query.id

    const session = await getSession({ req })

    const product = await prisma.post.findUnique({
        where: { id: productId }
    })

    if (req.method === "POST") {
        const { amountOfDays, dates } = req.body;

        const calculateAmount = (price) => amountOfDays * price * 100

        try {
            const params = {
                amount: calculateAmount(product.price),
                currency: "dkk",
                payment_method_types: ['card'],
                metadata: {
                    user: String(session.user.email),
                    product: String(productId),
                    firstDate: dates[0],
                    secondDate: dates[1]
                }
            } 
            const payment_intent = await stripe.paymentIntents.create(params);

            console.log(payment_intent)

            res.status(200).json(payment_intent)

        } catch(error) {
            res.status(500).json({ statusCode: 500, message: error.message })
        }
    }
}