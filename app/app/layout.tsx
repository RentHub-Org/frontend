"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
// import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { links } from "./constants";
import ProfileDropdown from "@/components/ui/profileDropdown";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { data: session }: { data: any; status: string } = useSession();

  return (
    <div
      className={cn(
        "relative rounded-md flex flex-col md:flex-row dark:bg-theme-3 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 dark:bg-theme-3 text-theme-4">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className="dark:text-theme-3"
                />
              ))}
            </div>
          </div>
          <div className=" ">
            <ProfileDropdown session={session} />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="p-7 md:p-10 md:rounded-tl-2xl rounded-tl-0 border border-neutral-200 overflow-y-auto dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 flex-shrink-0">
        <Flux />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-extrabold text-2xl text-black dark:text-theme-5 whitespace-pre h-5"
      >
        <span className="font-pixelfy font-extrabold text-2xl text-black dark:text-theme-5 whitespace-pre h-5">
          RentHub <span className="text-sm text-[#071a52]">BTFS</span>
        </span>
      </motion.span>
    </Link>
  );
};
const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 flex-shrink-0">
        <Flux />
      </div>
    </Link>
  );
};
const Flux = () => {
  return <Image src="/flux.svg" width={28} height={28} alt="add logo" />;
};
