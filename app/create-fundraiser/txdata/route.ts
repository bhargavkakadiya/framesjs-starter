/** @format */

import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { baseSepolia } from "viem/chains";

import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { fundraiserABI } from "./contracts/fundraiser";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
	const body: FrameRequest = await req.json();
	console.log("body", body);

	// const { isValid } = await getFrameMessage(body, {
	//   neynarApiKey: "NEYNAR_ONCHAIN_KIT",
	// });

	// console.log("isValid", isValid);

	// if (!isValid) {
	//   return new NextResponse("Message not valid", { status: 500 });
	// }

	const options = {
		method: "POST",
		headers: {
			Authorization: `Bearer $eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNGQ4ODBmNC1iMDQ5LTRhYWItYjFjZS0yODJmYmExOWJiOTIiLCJlbWFpbCI6InNoeWFtcGtpcmFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImFjZWEwYmNiNjZkZjg4YjU5M2FmIiwic2NvcGVkS2V5U2VjcmV0IjoiOTE5M2M2OTJhMDE4ZjFhMmE4ZGUyNmVlMmZjMDdmZGIwMDAwOTNmZGUzOGMyNTY5M2MwODk5MThmYzcwNjZhNCIsImlhdCI6MTcxMTI5MDQ5Mn0.chc-FVYfDg5O2q-4tJXIW56oP7GAVFnSNiv4FYklZes`,
			"Content-Type": "application/json",
		},
		body: `{"custom_id":"shyampkira","data":{"trustedData":{"messageBytes": ${body.trustedData.messageBytes}},"untrustedData":${body.untrustedData}},"frame_id":"my-custom-frame"}`,
	};

	fetch("https://api.pinata.cloud/farcaster/frames/interactions", options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));

	const formData = body.untrustedData;
	const name = formData.inputText.split(",")[0];
	const description = formData.inputText.split(",")[1];
	const target = formData.inputText.split(",")[2];
	const farcasterId = formData.fid;
	// const castId = formData.castId.hash;
	const castId = formData.castId.fid;

	const data = encodeFunctionData({
		abi: fundraiserABI[0].abi,
		functionName: "registerFundRaiser",
		args: [
			name || "GoFundMe",
			description || "GoFundMe for a degen cause!",
			BigInt(parseEther(target || "0.99")),
			BigInt(castId),
			BigInt(farcasterId),
			BigInt(9999),
		],
	});

	const txData: FrameTransactionResponse = {
		chainId: `eip155:${baseSepolia.id}`,
		method: "eth_sendTransaction",
		params: {
			abi: fundraiserABI[0].abi,
			data,
			to: "0xFFF5D3CD123bb65b61136EecE184440Ba70ECb9a",
			value: parseEther("0").toString(), // 0.00004 ETH
		},
	};
	return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
	console.log("POST");
	return getResponse(req);
}

export const dynamic = "force-dynamic";
