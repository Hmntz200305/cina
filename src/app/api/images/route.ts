import { NextResponse } from "next/server";

export async function GET() {
  const images = [
    {
      src: "/airport.png",
      alt: "Image 1",
      caption: "I Love You Day",
    },
    {
      src: "/FinalBW.png",
      alt: "Image 2",
      caption: "The ending that i want",
    },
    {
      src: "/alone.png",
      alt: "Image 3",
      caption: "The ending that i got",
    },
  ];

  return NextResponse.json(images);
}