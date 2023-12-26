"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import { AspectRatio } from "@ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ui/carousel";
import Image from "next/image";

interface Image {
  id: number;
  url: string;
  filename: string;
}

interface Props {
  images: Image[];
}
const DemoCarousel = ({ images }: Props) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      {/* <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images.map((image) => (
          <div key={image.id} className="flex items-center justify-center">
            <img
              src={image.url}
              alt={image.filename}
              className="object-contain max-h-full max-w-full rounded-lg"
            />
          </div>
        ))}
      </Carousel> */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg">
                <Image
                  src={image.url}
                  alt={image.filename}
                  className="object-cover rounded-lg"
                  fill
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default DemoCarousel;
