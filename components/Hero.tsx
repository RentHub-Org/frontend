import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import CurveCard from "./ui/CurveCard";
import CenterWrap from "./globals/centerwrap";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <CenterWrap className="p-6 flex flex-col space-y-10">
      {/* introduction card */}
      <CurveCard className="p-20">
        {/* header */}
        <main className="flex md:flex-row flex-col-reverse justify-between  text-gray-200 gap-10">
          <div className="flex gap-7 flex-col">
            <div>
              <h1 className="font-pixelfy font-bold text-4xl md:text-7xl text-white">
                Introducing BTFS
              </h1>
              <h1 className="font-pixelfy font-bold text-3xl md:text-6xl text-btfs">
                Cloudinary{" "}
              </h1>
            </div>

            <h4 className="font-roboto font-medium">
              One click deployment of your files with centralised dashboard to
              handle your files on BTFS seemless nodes on Blockchain.
            </h4>
            <Button className="bg-[#9778ff] w-[180px] h-[30px]">
              Get Started
            </Button>
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
      {/* get started card */}
      <GetStarted />
    </CenterWrap>
  );
};

export default Hero;
