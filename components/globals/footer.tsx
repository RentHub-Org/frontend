import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full bg-black/90 p-4 px-10 text-gray-400", className)}>
      <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                  <h1 className='font-pixelfy text-3xl text-white'>FLUX</h1>
          {/* <img src="/assets/logo.png" alt="logo" className="w-[40px] " /> */}
          {/* copyright */}
          <h2>Copyright &copy; 2024 flux.online</h2>
        </div>

        {/* right Side */}
        <div className="flex items-center space-x-4">
          <Link target="_blank" href="https://forum.trondao.org/t/flux/23646">
            Help
          </Link>
          {/* <Link to="/discord">Discord</Link> */}
          <Link target="_blank" href="https://github.com/flux/CodeHive">
            Github
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
