import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CodeXml,
  Copy,
  LibraryBigIcon,
  Link2,
  MessageSquareShare
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { CopyAddr } from "../globals/navbar";

const GetStarted = () => {
  return (
    <main className="space-y-14 py-10">
      <div>
        <h1 className="font-semibold md:text-3xl text-[2rem] font-pixelfy">
          Experience the Power of BTFS on RentHub
        </h1>
        <p className="text-gray-400 mt-5 max-w-[900px]">
          Get started now with our SDK and dive into our detailed documentation
          for all the information you need. Have questions? Join the
          conversation on our forum and connect with us directly for support!
        </p>
      </div>
      <section className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-10">
        <ThemeCard
          title="Docs"
          description="A compresve docs explaning everything there is to know."
          link="https://docs.renthub.cloud"
          Icon={LibraryBigIcon}
        />
        <ThemeCard
          title="SDK"
          description="Add effortless uploads to any app with our typescript SDK."
          command="npm install @ellumina/renthub-btfs"
          link="https://forum.trondao.org/t/renthub-btfs-the-one-stop-solution-to-your-btfs-needs/27072?u=arman"
          Icon={MessageSquareShare}
        />
        <ThemeCard
          title="Forum"
          description="Check out forum to ask questions and find resources for common questions."
          link="https://www.npmjs.com/package/@ellumina/renthub-btfs"
          Icon={CodeXml}
        />
      </section>
    </main>
  );
};

export default GetStarted;

const ThemeCard = ({
  title,
  description,
  command,
  link,
  Icon
}: {
  title: string;
  description: string;
  command?: string;
  link: string;
  Icon: any;
}) => {
  return (
    <div
      id="features"
      className={cn(
        `p-8 group py-10 z-10 relative max-w-[370px] rounded-2xl !bg-black shadow-2xl shadow-gray-700 hover:shadow-sky-900 border hover:border-purple-400 border-gray-700 opacity-70
        hover:cursor-pointer hover:-translate-y-5 transition-all duration-300 ease-in
        `
      )}
    >
      <section className="flex justify-center space-x-4">
        <div className="flex flex-col space-y-4 ">
          <Icon className="text-gray-300" />
          <h1 className="font-bold text-3xl font-sans mb-5 text-white group-hover:underline">
            {title}
          </h1>
          <p className="text-lg text-gray-400 leading-6 group-hover:underline border-inherit">
            {description}
          </p>
        </div>

        <Link href={link} target="_blank">
          <ArrowUpRight className="text-gray-300 hover:text-btfs" />
        </Link>
      </section>
      {/* command */}
      <div className="mt-10">{command && <CopyAddr address={command} />}</div>
    </div>
  );
};
