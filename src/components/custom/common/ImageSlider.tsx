"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: SanityImageSource[];
  altText: string;
}

export default function ImageSlider({ images, altText }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // If there's only one image, just render it without the slider
  if (images.length < 2) {
    return (
      <div className="w-full aspect-[9/14] max-h-[90vh] relative">
        <Image
          src={urlFor(images[0]).auto("format").url()}
          className="relative object-cover"
          alt={altText}
          title={altText}
          fill
        />
      </div>
    );
  }

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Left swipe
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance) {
      // Right swipe
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div className="w-full aspect-[9/14] max-h-[90vh] relative overflow-hidden">
      {/* Images */}
      <div
        className="absolute inset-0 flex transition-transform duration-300 ease-in-out"
        onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
        onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
        onTouchEnd={handleSwipe}
      >
        <Image
          src={urlFor(images[currentIndex]).auto("format").url()}
          className="relative object-cover"
          alt={altText}
          title={altText}
          fill
          sizes="100vw"
        />
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "rounded-full transition-all",
              index === currentIndex
                ? "bg-white scale-125 w-2 h-2"
                : "bg-white/50 w-1.5 h-1.5",
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
