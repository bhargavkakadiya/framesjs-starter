import Link from "next/link";
import { currentURL, vercelURL } from "../utils";
import { createDebugUrl } from "../debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "my Frame",
    description: "This is my Frame",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/create-fundraiser/frames",
          vercelURL() || "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  const url = currentURL("/create-fundraiser");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "lightgreen",
      }}>
      <div>Create a fundraiser using frames on Base Sepolia ↓</div>
      <div style={{ fontSize: "2em", marginTop: "1em" }}>
        <Link
          href="https://warpcast.com/~/developers/frames?url=https%3A%2F%2Ffundcaster.vercel.app%2Fcreate-fundraiser"
          className="underline">
          Warpcast
        </Link>
      </div>
    </div>
  );
}
