import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import CurveCard from "../ui/CurveCard";
import CenterWrap from "../globals/centerwrap";
import GetStarted from "./GetStarted";
import Features from "./Features";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Hero = () => {
  return (
    <CurveCard className="p-20">
      {/* header */}
      <main className="flex md:flex-row flex-col-reverse justify-between  text-gray-200 gap-10">
        <div className="flex gap-7 flex-col">
          <div>
            <h1 className="font-protest font-bold text-4xl md:text-7xl text-white">
              Introducing RentHub
            </h1>
            <h1 className="font-pixelfy font-bold text-3xl md:text-6xl text-btfs">
              Powered by BTFS{" "}
            </h1>
          </div>

          <h4 className="font-roboto font-medium text-lg">
            The one stop solution to your BTFS needs.
          </h4>

          <Link
            href="/app/upload"
            className="w-max px-20 max-sm:px-6 py-3 bg-black hover:border-purple-800 rounded-full font-bold font-sans border border-gray-600"
          >
            🚀 Get Started
          </Link>
        </div>
        <div className="flex items-start w-[200px] md:w-[700px]">
          <Image
            src="/assets/btfs-chain.png"
            alt="spline"
            width={500}
            height={300}
          />
        </div>
      </main>
    </CurveCard>
  );
};

export default Hero;
