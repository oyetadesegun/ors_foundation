import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, merchantTransactionReference, redirectUrl, customer } =
      body;

    if (!amount || !merchantTransactionReference || !customer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const headers = {
      apikey: process.env.GLOBALPAY_API_KEY as string,
      language: "en",
      "Content-Type": "application/json",
    };

    const payload = {
      amount,
      merchantTransactionReference,
      redirectUrl,
      //   currency: customer.currency,
      customer,
    };

    console.log(customer);

    const response = await fetch(
      "https://paygw.globalpay.com.ng/globalpay-paymentgateway/api/paymentgateway/generate-payment-link",
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        redirect: "follow",
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.message || "Payment request failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      paymentLink: data?.data?.checkoutUrl,
    });
  } catch (error: any) {
    console.error("Payment API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
