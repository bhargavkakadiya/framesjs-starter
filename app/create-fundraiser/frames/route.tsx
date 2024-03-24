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

  // if (pageIndex === 1) {
  //   data = {
  //     name: ctx.message?.inputText,
  //   };
  // } else if (pageIndex === 2) {
  //   data = {
  //     ...data,
  //     description: ctx.message?.inputText,
  //   };
  // } else if (pageIndex === 3) {
  //   data = {
  //     ...data,
  //     targetAmount: ctx.message?.inputText,
  //   };
  // }

  //   return {
  //     image: (
  //       <div tw="flex flex-col">
  //         <div tw="flex py-8">Create a Fundraiser 💚</div>
  //         {pageIndex === 0 && (
  //           <div tw="flex">Start by adding a Fundraiser Name</div>
  //         )}
  //         {pageIndex === 1 && (
  //           <div tw="flex flex-col">
  //             <div tw="flex">Name: {(data as { name: string }).name}</div>
  //             <div tw="flex">Add a Description</div>
  //           </div>
  //         )}
  //         {pageIndex === 2 && (
  //           <div tw="flex flex-col">
  //             <div tw="flex">Name: {(data as { name: string }).name}</div>
  //             <div tw="flex">
  //               Description:{" "}
  //               {(data as { name: string; description: string }).description}
  //             </div>
  //             <div tw="flex">Add a Target Amount</div>
  //           </div>
  //         )}
  //         {pageIndex === 3 && (
  //           <div tw="flex flex-col">
  //             <div tw="flex">Name: {(data as { name: string }).name}</div>
  //             <div tw="flex">
  //               Description:{" "}
  //               {(data as { name: string; description: string }).description}
  //             </div>
  //             <div tw="flex">
  //               Target Amount:{" "}
  //               {
  //                 (
  //                   data as {
  //                     name: string;
  //                     description: string;
  //                     targetAmount: string;
  //                   }
  //                 ).targetAmount
  //               }
  //             </div>
  //           </div>
  //         )}
  //         <div tw="flex mt-40">
  //           {pageIndex + 1} / {totalPages}
  //         </div>
  //       </div>
  //     ),
  //     imageOptions: {
  //       aspectRatio: "1:1",
  //     },
  //     buttons:
  //       pageIndex === 3
  //         ? [
  //             <Button action="tx" target="/txdata" post_url="/frames">
  //               Create
  //             </Button>,
  //           ]
  //         : [
  //             // <Button
  //             //   action="post"
  //             //   target={{
  //             //     query: { pageIndex: (pageIndex - 1) % totalPages },
  //             //   }}>
  //             //   ←
  //             // </Button>,
  //             <Button
  //               action="post"
  //               target={{
  //                 query: { pageIndex: (pageIndex + 1) % totalPages },
  //               }}>
  //               →
  //             </Button>,
  //           ],
  //     textInput: "input something here!",
  //   };
  // });

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex py-8">Create a Fundraiser 💚</div>
        <div tw="flex">
          Start by adding a fundraiser_name, description, target_ETH_amt
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="tx" target="../txdata" post_url="/frame">
        Create
      </Button>,
    ],
    textInput: "input something here!",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
