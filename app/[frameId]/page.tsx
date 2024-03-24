// Step 1. import getFrameMetadata from @coinbase/onchainkit
import Link from "next/link";
import { currentURL, vercelURL } from "../utils";
import { createDebugUrl } from "../debug";
import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";

type Props = {
  params: { frameId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frameId } = params;
  const id = parseInt(frameId);
  // const frame = await getData(id);
  // console.log("frame", frame);

  return {
    title: "my Fundraiser",
    description: "This is my Fundraiser, go fund me!",
    other: {
      ...(await fetchMetadata(
        new URL(`/${frameId}/frames`, vercelURL() || "http://localhost:3000")
      )),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { frameId } = params;
  const id = parseInt(frameId);
  const url = currentURL(`/${frameId}`);

  return (
    <div>
      My fundraiser
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
    </div>
  );
}
