import React from "react";
import CenterWrap from "../globals/centerwrap";
import Image from "next/image";
import Link from "next/link";

const SdkSectin = () => {
  return (
    <main
      className="py-10 w-full border-b flex max-sm:flex-col gap-10 justify-between items-center"
      onMouseEnter={() => {
        document.querySelector("main > img")?.classList.add("animate-bounce");
      }}
      onMouseLeave={() => {
        document
          .querySelector("main > img")
          ?.classList.remove("animate-bounce");
      }}
    >
      {/* sdk image */}

      <Image
        src={"/assets/sdk.png"}
        alt="sdk"
        width={200}
        height={200}
        className="w-[200px] h-[140px] xl:w-[290px] xl:h-[220px] ease-in-out transition-all duration-[10000]"
      />

      {/* right side rows */}
      <div className="flex xl:w-[700px] flex-col gap-5">
        <h1 className="font-pixelfy text-left font-semibold text-xl md:text-3xl text-white">
          🚀 Now Supports SDK Integration!
        </h1>
        <h1 className="self-end font-medium text-[1.1rem] md:text-[1.2rem] text-gray-500">
          Developers can now easily integrate RentHub into their applications
          with our brand-new SDK!
          <span className="text-purple-400 ml-1">
            You can upload or rent files by simply pinging our servers via the
            <Link
              href="https://www.npmjs.com/package/@ellumina/renthub-btfs"
              target="_blank"
              className="ml-1 hover:border-white border-b border-btfs text-blu-600"
            >
              RentHub API.
            </Link>
          </span>{" "}
          Simplify your workflow and harness the power of decentralized storage
          today!
        </h1>
      </div>
    </main>
  );
};

export default SdkSectin;
