/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
// const totalPages = 4;

const frames = createFrames({
  basePath: "/create-fundraiser/frames",
});

const handleRequest = frames(async (ctx) => {
  // const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  // let data = {};

  if (ctx.message?.transactionId) {
    console.log("transactionId", ctx);
    const fdId = 0;
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Transaction submitted!
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
        <Button
          action="link"
          target={`https://warpcast.com/~/compose?text=Please%20donate%20to%20my%20cause%20and%20join%20me%20for%20this%20cause&embeds[]=https://framesjs-starter-puce.vercel.app/${fdId}`}>
          Share your fundraiser
        </Button>,
      ],
    };
  }

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex py-8">Create a Fundraiser 💚</div>
        <div tw="flex text-wrap">
          Start by adding your fundraiser&apos;s name,
        </div>
        <div tw="flex text-wrap">description &amp; target Amt in ETH</div>
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
    textInput: "name, description, 0.56",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
