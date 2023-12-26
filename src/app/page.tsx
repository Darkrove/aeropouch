import Image from "next/image";
import Balance from "react-wrap-balancer";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export default function Home() {
  return (
    <main>
      <div className="h-screen max-h-[800px] w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full flex flex-col items-center px-4 pt-4 pb-2 md:py-10 md:pl-10 md:pr-5 justify-center">
          <div className="rounded-3xl overflow-hidden p-4 bg-[#ea712a] flex flex-col items-center justify-center w-full h-full ">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] text-white">
              Aero Pouch
            </h1>
            <Balance className="max-w-[46rem] text-lg text-gray-100 sm:text-xl text-center">
              Belive in yourself and you will be unstoppable
            </Balance>
            <Button size="lg" className="mt-2">
              Shop Now
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full px-4 pt-2 pb-4 md:py-10 md:pl-5 md:pr-10 ">
          <div className="relative h-full aspect-w-2 aspect-h-1">
            <Image
              src="/hero-2.png"
              alt="Lavish Linen"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-3xl border"
            />
          </div>
        </div>
      </div>
      {/* 
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Welcome to Next.js + Commerce.js Template" />
      </div> */}
    </main>
  );
}
