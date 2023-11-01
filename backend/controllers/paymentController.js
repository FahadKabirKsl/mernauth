import asyncHandler from "express-async-handler";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd", // Change to your currency
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export { createPaymentIntent };
