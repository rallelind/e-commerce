import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {

    const session = await getSession({ req })

    const account = await stripe.accounts.create({type: "standard"});

    await prisma.user.update({
        where: { email: session?.user?.email },
        data: {
            stripeConnectId: account.id
        }
    })

    const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${process.env.STRIPE_CONNECT_URL}/api/stripe/stripe-connect/onboard-refresh`,
        return_url: `${process.env.STRIPE_CONNECT_URL}/profile`,
        type: "account_onboarding",
    })

    res.redirect(303, accountLink.url)
}