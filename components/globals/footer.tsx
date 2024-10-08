import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("w-full bg-black/90 p-4 px-10 text-gray-400", className)}
    >
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-4">
          <h1 className="font-pixelfy text-3xl text-white">RentHub-BTFS</h1>
          {/* <img src="/assets/logo.png" alt="logo" className="w-[40px] " /> */}
          {/* copyright */}
          <h2>Copyright &copy; 2024 renthub.cloud</h2>
        </div>

        {/* right Side */}
        <div className="flex items-center space-x-4">
          <Link
            target="_blank"
            href="https://forum.trondao.org/t/renthub-btfs-the-one-stop-solution-to-your-btfs-needs/27072"
          >
            Help
          </Link>
          {/* <Link to="/discord">Discord</Link> */}
          <Link
            target="_blank"
            href="https://github.com/RentHub-Org/TBD-frontend"
          >
            Github
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
