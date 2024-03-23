/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/create-fundraiser/frames",
});

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Transaction submitted! {ctx.message.transactionId}
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
      ],
    };
  }

  return {
    image: (
      <div tw="bg-white text-black w-full h-full justify-center items-center">
        Create a Fundraiser 💚
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="tx" target="/txdata" post_url="/frames">
        Create
      </Button>,
    ],
    textInput: ["Fundraiser name", "Description", "Target Amount"],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
