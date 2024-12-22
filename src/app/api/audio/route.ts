import { NextResponse } from "next/server";

export async function GET() {
  const audioUrl = "/audio.m4a";
  return NextResponse.json({ url: audioUrl });
}
