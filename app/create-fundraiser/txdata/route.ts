import { STORAGE_REGISTRY_ADDRESS } from "@farcaster/core";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { optimism, holesky } from "viem/chains";
// import { storageRegistryABI } from "./contracts/storage-registry";
import { fundraiserABI } from "./contracts/fundraiser";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }
  
  console.log("frameMessage", frameMessage);

  // Get current storage price
  // const units = 1n;

  // const calldata = encodeFunctionData({
  //   abi: storageRegistryABI,
  //   functionName: "rent",
  //   args: [BigInt(frameMessage.requesterFid), units],
  // });

  const publicClient = createPublicClient({
    chain: holesky,
    transport: http(),
  });

  const fundraiser = getContract({
    address: "0x",
    abi: fundraiserABI,
    client: publicClient,
  });

  // const storageRegistry = getContract({
  //   address: STORAGE_REGISTRY_ADDRESS,
  //   abi: storageRegistryABI,
  //   client: publicClient,
  // });

  // const unitPrice = await storageRegistry.read.price([units]);

  return NextResponse.json({
    chainId: "eip155:10", // OP Mainnet 10 // holesky
    method: "registerFundRaiser",
    params: {
      abi: fundraiserABI,
      to: "0xfa343b1755a7197b2164b8ca55cf425aee6c6efa", // fundraiser address
      value: 0n,
    },
  });
}
