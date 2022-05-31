import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {

    const session = await getSession({ req })

    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
        select: { stripeConnectId: true }
    })

    const accountId = user.stripeConnectId

    if(accountId.length === 0) {
        return res.redirect("/")
    }

    try {
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${process.env.STRIPE_CONNECT_URL}/api/stripe/stripe-connect/onboard-refresh`,
            return_url: `${process.env.STRIPE_CONNECT_URL}/profile`,
            type: "account_onboarding",
        })

        res.redirect(303, accountLink.url);
    } catch (err) {
        res.status(500).send({
          error: err.message,
        });
      }
}