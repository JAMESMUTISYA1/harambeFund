// app/api/payments/mpesa-status/route.js
import { NextResponse } from 'next/server';

class MpesaService {
  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    this.businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE;
    this.passkey = process.env.MPESA_PASSKEY;
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

  async checkTransactionStatus(checkoutRequestId) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -4);
      const password = Buffer.from(`${this.businessShortCode}${this.passkey}${timestamp}`).toString('base64');

      const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          BusinessShortCode: this.businessShortCode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestId
        })
      });

      const result = await response.json();
      
      // Map M-Pesa response codes to status
      if (result.ResultCode === '0') {
        return { status: 'success', message: 'Payment completed successfully', data: result };
      } else if (result.ResultCode === '1032') {
        return { status: 'pending', message: 'Payment request cancelled by user' };
      } else {
        return { status: 'failed', message: result.ResultDesc || 'Payment failed' };
      }
    } catch (error) {
      throw new Error(`M-Pesa status check failed: ${error.message}`);
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { checkoutRequestId } = body;

    if (!checkoutRequestId) {
      return NextResponse.json(
        { error: 'Checkout request ID is required' },
        { status: 400 }
      );
    }

    const mpesaService = new MpesaService();
    const statusResult = await mpesaService.checkTransactionStatus(checkoutRequestId);

    return NextResponse.json(statusResult);

  } catch (error) {
    console.error('M-Pesa status check error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check payment status' },
      { status: 500 }
    );
  }
}