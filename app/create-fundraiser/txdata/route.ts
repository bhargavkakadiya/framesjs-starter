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

  const formData = body.untrustedData;
  const name = formData.inputText.split(",")[0];
  const description = formData.inputText.split(",")[1];
  const target = formData.inputText.split(",")[2];
  const farcasterId = formData.fid;
  // const castId = formData.castId.hash;
  const castId = formData.castId.fid;

  const data = encodeFunctionData({
    abi: fundraiserABI[0].abi,
    functionName: "registerFundRaiser",
    args: [
      name || "GoFundMe",
      description || "GoFundMe for a degen cause!",
      BigInt(parseEther(target || "0.99")),
      BigInt(castId),
      BigInt(farcasterId),
      BigInt(9999),
    ],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${baseSepolia.id}`,
    // ignore the warning, this is a valid method
    // @ts-ignore: Unreachable code error
    method: "eth_call",
    params: {
      abi: fundraiserABI[0].abi,
      data,
      to: "0x3433eB058e42347FA0C94246ba2073069F2186b1",
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
