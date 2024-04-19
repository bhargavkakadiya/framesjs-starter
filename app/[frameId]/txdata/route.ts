import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { baseSepolia } from "viem/chains";

import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { fundraiserABI } from "../../abi/fundraiser";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  console.log("body", body);

  const formData = body.untrustedData;
  const donationAmt = formData.inputText.trim();
  const farcasterId = formData.fid;
  const castId = formData.castId.fid;
  const fundraiserId = parseInt(formData.url?.split("/").pop() || "");

  const data = encodeFunctionData({
    abi: fundraiserABI[0].abi,
    functionName: "donate",
    args: [BigInt(fundraiserId)],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: fundraiserABI[0].abi,
      data,
      to: "0x191A1Ba3737D15AC4f7d47a41117340a84D4d021",
      value: parseEther(donationAmt).toString(),
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
