"use client";

import { useEffect, useRef, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
}

const Home: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [days, setDays] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startDate = new Date("2021-07-21T00:00:00+07:00");

    const calculateTimeElapsed = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const daysElapsed = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setDays(daysElapsed);
      setTimeElapsed(`${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    };

    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/images");
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((error) => {
        console.error("Pemutaran audio gagal dimulai:", error);
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <audio ref={audioRef} src="/audio.m4a" loop autoPlay /> {/* Audio diputar otomatis */}
      <div>
        <Carousel
          className="rounded-xl"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {images.map((image, index) => (
            <div key={index} className="relative group overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={2560}
                height={1440}
                className="h-full w-full object-cover transition-all duration-700 group-hover:brightness-100 brightness-50"
                priority={index === 0}
              />
              {index === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                  <h1 className="text-white text-3xl font-bold">
                    I Love You Day {days} ❤️
                  </h1>
                  <p className="text-sm font-extralight text-gray-400 mt-4">
                    {timeElapsed}
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
