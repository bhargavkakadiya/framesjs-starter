import React from "react";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { fundraiserABI } from "../abi/fundraiser";
import { formatEther } from "viem";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

async function getData(frameId: number) {
  console.log("input", frameId);
  if (frameId === undefined || frameId === null) return null;

  const data = await publicClient.readContract({
    address: "0x191A1Ba3737D15AC4f7d47a41117340a84D4d021",
    abi: fundraiserABI[0].abi,
    functionName: "fundRaiser",
    args: [BigInt(frameId)], // Convert frameId to bigint
  });

  return data;
}

const Fundraisers = async () => {
  const frame = await getData(11);
  console.log("frame", frame);

  return <div>List of all fundraisers {String(frame)}</div>;
};

export default Fundraisers;
