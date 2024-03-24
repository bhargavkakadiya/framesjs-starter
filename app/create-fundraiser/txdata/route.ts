import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { baseSepolia } from "viem/chains";

import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { fundraiserABI } from "./contracts/fundraiser";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  console.log("body", body);

  // const { isValid } = await getFrameMessage(body, {
  //   neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  // });

  // console.log("isValid", isValid);

  // if (!isValid) {
  //   return new NextResponse("Message not valid", { status: 500 });
  // }

  const data = encodeFunctionData({
    abi: fundraiserABI[0].abi,
    functionName: "registerFundRaiser",
    args: ["", "", BigInt(0), BigInt(0), BigInt(0), BigInt(0)],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_call",
    params: {
      abi: [],
      data,
      to: "0xfa343B1755a7197B2164B8cA55CF425AEE6C6efA",
      value: parseEther("0").toString(), // 0.00004 ETH
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  console.log("POST");
  debugger;
  return getResponse(req);
}

export const dynamic = "force-dynamic";
