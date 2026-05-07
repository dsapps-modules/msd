import { NextResponse } from "next/server";
import PaytmChecksum from "paytmchecksum";
import https from "https";
import { integrationConfigurationErrorResponse } from "@/lib/server/integration-error";

const WEBSITE = "WEBSTAGING";

interface PaytmRequestBody {
  requestType: string;
  mid: string;
  websiteName: string;
  orderId: string;
  callbackUrl: string;
  txnAmount: {
    value: string;
    currency: string;
  };
  userInfo: {
    custId: string;
  };
}

interface PaytmParams {
  body: PaytmRequestBody;
  head: {
    signature: string;
  };
}

interface PaytmResponse {
  body: {
    txnToken: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const mid = process.env.PAYTM_MID;
    const merchantKey = process.env.PAYTM_MKEY;
    const adminFrontUrl = process.env.NEXT_PUBLIC_ADMIN_FRONT_URL;

    if (!mid || !merchantKey || !adminFrontUrl) {
      throw new Error("PAYTM is not configured.");
    }

    const callbackUrl = `${adminFrontUrl}/paytm-callback`;
    const { amount, orderId, customerId } = await req.json();
    const initialParams = {
      body: {
        requestType: "Payment",
        mid,
        websiteName: WEBSITE,
        orderId,
        callbackUrl,
        txnAmount: {
          value: amount.toString(),
          currency: "INR",
        },
        userInfo: {
          custId: customerId,
        },
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(initialParams.body),
      merchantKey
    );

    const completeParams: PaytmParams = {
      ...initialParams,
      head: {
        signature: checksum,
      },
    };

    const data = JSON.stringify(completeParams);
    
    return new Promise<Response>((resolve) => {
      const request = https.request({
        hostname: "securegw-stage.paytm.in",
        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length.toString(),
        },
      }, (response) => {
        let resData = "";
        response.on("data", (chunk) => {
          resData += chunk;
        });

        response.on("end", () => {
          try {
            const result: PaytmResponse = JSON.parse(resData);
            if (result.body?.txnToken) {
              resolve(NextResponse.json({
                txnToken: result.body.txnToken,
                orderId,
                amount,
              }));
            } else {
              resolve(NextResponse.json(
                { error: "Invalid response from Paytm" },
                { status: 500 }
              ));
            }
          } catch (parseError) {
            resolve(NextResponse.json(
              { error: "Failed to parse Paytm response" },
              { status: 500 }
            ));
          }
        });
      });

      request.on("error", (error) => {
        resolve(NextResponse.json(
          { error: "Failed to create Paytm transaction" },
          { status: 500 }
        ));
      });

      request.write(data);
      request.end();
    });
  } catch (error) {
    if (error instanceof Error && error.message === "PAYTM is not configured.") {
      return integrationConfigurationErrorResponse("Paytm");
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
