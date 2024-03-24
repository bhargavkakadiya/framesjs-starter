/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { notFound } from "next/navigation";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { fundraiserABI } from "../contracts/fundraiser";
import { formatEther } from "viem";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

async function getData(frameId: number) {
  console.log("input", frameId);
  if (frameId === undefined || frameId === null) return null;

  const data = await publicClient.readContract({
    address: "0xFFF5D3CD123bb65b61136EecE184440Ba70ECb9a",
    abi: fundraiserABI[0].abi,
    functionName: "fundRaiser",
    args: [BigInt(frameId)], // Convert frameId to bigint
  });

  return data;
}

const frames = createFrames({
  basePath: "/%5BframeId%5D/frames",
});

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Thanks for Donating!
          {/* {ctx.message.transactionId} */}
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}>
          View on block explorer
        </Button>,
        <Button
          action="link"
          target="https://framesjs-starter-puce.vercel.app/create-fundraiser">
          Create Fundraiser
        </Button>,
      ],
    };
  }
  const frameId = parseInt(ctx.url.pathname.slice(1, -7));
  const frame = await getData(frameId);
  console.log("frame", frame);

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex py-8">Please Support My Cause 🤲 </div>
        {frame && (
          <>
            <div tw="flex flex-col">
              <div tw="flex">Name: {frame[0]}</div>
              <div tw="flex">Description: {frame[1]}</div>

              <div tw="flex">
                Goal: {formatEther(frame[3])} / {formatEther(frame[2])} ETH
              </div>
            </div>
          </>
        )}

        <div tw="flex">Enter ETH and donate </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="tx" target="../txdata" post_url="../frames">
        Donate
      </Button>,
      <Button
        action="link"
        target="https://framesjs-starter-puce.vercel.app/create-fundraiser">
        Create Fundraiser
      </Button>,
    ],
    textInput: "0.01",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
