// app/api/payments/process/route.js
import { NextResponse } from 'next/server';

// M-Pesa Daraja API integration
class MpesaService {
  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    this.businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE;
    this.passkey = process.env.MPESA_PASSKEY;
    this.callbackURL = process.env.MPESA_CALLBACK_URL;
  }

  async getAccessToken() {
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    return data.access_token;
  }

  async stkPush(phoneNumber, amount, accountReference, transactionDesc) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -4);
      const password = Buffer.from(`${this.businessShortCode}${this.passkey}${timestamp}`).toString('base64');

      const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          BusinessShortCode: this.businessShortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: this.businessShortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: this.callbackURL,
          AccountReference: "CompanyXLTD",
          TransactionDesc: transactionDesc
        })
      });

      return await response.json();
    } catch (error) {
      throw new Error(`M-Pesa STK push failed: ${error.message}`);
    }
  }
}

// Stripe integration
class StripeService {
  constructor() {
    this.stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  }

  async createPaymentIntent(amount, metadata) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'kes',
        metadata: metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      throw new Error(`Stripe payment failed: ${error.message}`);
    }
  }
}

// Airtel Money integration (mock - you'll need to integrate with Airtel API)
class AirtelMoneyService {
  async processPayment(phoneNumber, amount, reference) {
    // This is a mock implementation
    // You'll need to integrate with Airtel Money API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `AIR${Date.now()}`,
          message: 'Payment initiated successfully'
        });
      }, 1000);
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { campaignId, campaignTitle, amount, paymentMethod, phoneNumber, ...paymentDetails } = body;

    // Validate input
    if (!campaignId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Rate limiting check (for 1M users)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    // Implement your rate limiting logic here

    let result;
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    switch (paymentMethod) {
      case 'mpesa':
        const mpesaService = new MpesaService();
        result = await mpesaService.stkPush(
          phoneNumber,
          amount,
          campaignId,
          `Donation for ${campaignTitle}`
        );
        break;

      case 'airtel':
        const airtelService = new AirtelMoneyService();
        result = await airtelService.processPayment(
          phoneNumber,
          amount,
          transactionId
        );
        break;

      case 'stripe':
        const stripeService = new StripeService();
        result = await stripeService.createPaymentIntent(amount, {
          campaignId,
          campaignTitle,
          transactionId
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid payment method' },
          { status: 400 }
        );
    }

    // Save transaction to database
    // await saveTransactionToDB({
    //   transactionId,
    //   campaignId,
    //   amount,
    //   paymentMethod,
    //   status: 'pending',
    //   createdAt: new Date()
    // });

    return NextResponse.json({
      success: true,
      transactionId,
      message: 'Payment initiated successfully',
      data: result
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}