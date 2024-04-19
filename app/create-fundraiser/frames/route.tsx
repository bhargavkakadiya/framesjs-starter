/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { baseSepolia } from "viem/chains";

import { fundraiserABI } from "../txdata/contracts/fundraiser";

import { createPublicClient, http, hexToNumber } from "viem";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

async function getFdIdFromTxHash(txHash: `0x${string}` | undefined) {
  if (!txHash) {
    throw new Error("Transaction hash is undefined.");
  }
  // wait for tx to be completed
  await publicClient.waitForTransactionReceipt({ hash: txHash });
  // get tx receipt
  const txReceipt = await publicClient.getTransactionReceipt({ hash: txHash });
  // read logs from tx receipt
  const fdIdHex = txReceipt.logs[0]?.data;
  // convert fdId hex string to number
  const fdId = hexToNumber(fdIdHex as `0x${string}`);
  return fdId;
}

const frames = createFrames({
  basePath: "/create-fundraiser/frames",
});

const handleRequest = frames(async (ctx) => {
  // const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  // let data = {};
  if (ctx.message?.transactionId) {
    const fdId = await getFdIdFromTxHash(ctx.message.transactionId);
    return {
      accepts: [
        {
          id: "farcaster",
          version: "vNext",
        },
        {
          id: "xmtp",
          version: "vNext",
        },
      ],
      image: (
        <div tw="bg-green-700 text-white w-full h-full justify-center items-center flex flex-col">
          <div tw="text-4xl">Campaign created successfully ✅</div>
          <div>Click below to see tx details and share Campaign with frens!</div>
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="link" target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}>
          View on block explorer
        </Button>,
        <Button action="link" target="https://fundcaster.vercel.app/create-fundraiser">
          Create Fundraiser
        </Button>,
        <Button
          action="link"
          target={`https://warpcast.com/~/compose?text=Please%20donate%20to%20my%20cause%20and%20join%20in%20my%20mission&embeds[]=https://fundcaster.vercel.app/${fdId}`}
        >
          Cast Fundraiser
        </Button>,
      ],
    };
  }

  return {
    accepts: [
      {
        id: "farcaster",
        version: "vNext",
      },
      {
        id: "xmtp",
        version: "vNext",
      },
    ],
    image: (
      <div tw="flex flex-col items-center">
        <div tw="flex py-8 text-5xl px-auto text-center"> Create a fundraiser Campaign on farcaster</div>
        <div tw="flex flex-col">
          Please input below :<div></div>
          <div>🚀 Whats your mission?</div>
          <div>📝 How you will use the funds?</div>
          <div>💰 Set a goal in ETH</div>
          <br />
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="tx" target="../txdata" post_url="../frames">
        Create
      </Button>,
    ],
    textInput: "mission, why , 0.00",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
