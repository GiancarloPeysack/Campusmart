require('dotenv').config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(
    require(process.env.F_SERVICE_ACCOUNT_PATH),
  ),
});

const app = express();

app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    bodyParser.raw({type: 'application/json'})(req, res, next);
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.get('/', async (req, res) => {
  return res.send('Firebase Function Server is running...');
});

app.post('/restaurant/status', async (req, res) => {
  const {restaurantId} = req.body;

  try {
    const account = await stripe.accounts.retrieve(restaurantId);

    res.json({
      status: account?.capabilities?.card_payments === 'active' ? true : false,
    });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

app.post('/payment-sheet', async (req, res) => {
  try {
    const {amount} = req.body;
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2025-02-24.acacia'},
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: {enabled: true},
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_PUBLISH_KEY,
    });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

app.post('/restaurant/connect', async (req, res) => {
  const {restaurantId, email} = req.body;

  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email,
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://Campusmart/restaurant/reauth',
      return_url: 'https://Campusmart/restaurant/dashboard',
      type: 'account_onboarding',
    });

    await admin.firestore().collection('restaurants').doc(restaurantId).update({
      stripeAccountId: account.id,
      stripeOnboardingUrl: accountLink.url,
      stripeStatus: 'pending',
    });

    res.json({onboardingUrl: accountLink.url});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

app.post('/payment-methods/create-setup-intent', async (req, res) => {
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: req.body.customerId,
      payment_method_types: ['card'],
    });
    res.json({clientSecret: setupIntent.client_secret});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

app.post('/create-payment-intent', async (req, res) => {
  const {amount, restaurantId} = req.body;

  const restaurantAmount = Math.round(amount * 0.8);
  const platformFee = Math.round(restaurantAmount * 0.05);
  const totalAmount = restaurantAmount + platformFee;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: 'eur',
      application_fee_amount: platformFee * 100,
      transfer_data: {
        destination: restaurantId,
      },
    });

    res.json({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    createOrderDocument(paymentIntent.metadata);
    sendNotifications(paymentIntent.metadata);
  }

  res.json({received: true});
});

async function createOrderDocument({userId, restaurantId}: any) {
  const orderRef = await admin.firestore().collection('orders').add({
    userId,
    restaurantId,
    items: [],
    deliveryFee: 5.99,
    status: 'paid',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return orderRef;
}

function sendNotifications(metadata: any) {
  console.log('Send notification to:', metadata);
}

exports.api = functions.https.onRequest(app);
