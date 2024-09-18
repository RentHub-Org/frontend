import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import CurveCard from "../ui/CurveCard";
import CenterWrap from "../globals/centerwrap";
import GetStarted from "./GetStarted";
import Features from "./Features";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <CurveCard className="p-20">
      {/* header */}
      <main className="flex md:flex-row flex-col-reverse justify-between  text-gray-200 gap-10">
        <div className="flex gap-7 flex-col">
          <div>
            <h1 className="font-pixelfy font-bold text-4xl md:text-7xl text-white">
              Introducing RentHub
            </h1>
            <h1 className="font-pixelfy font-bold text-3xl md:text-6xl text-btfs">
              Powered by BTFS{" "}
            </h1>
          </div>

          <h4 className="font-roboto font-medium text-lg">
            The one stop solution to your BTFS needs.
          </h4>
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
