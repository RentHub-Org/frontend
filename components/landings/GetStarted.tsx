import { cn } from "@/lib/utils";
import { Copy, Link2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <main className="space-y-14">
      <h1 className="text-4xl font-pixelfy">
        GET STARTED IN {"<"} 1 MIN, FOR REAL REAL !
      </h1>
      <section className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-10">
      <ThemeCard
          title="Docs"
          description="A compresve docs explaning everything there is to know."
          text="Visit Docs"
          link="https://docs.renthub.cloud"
        />
        <ThemeCard
          title="SDK"
          description="Add effortless uploads to any app with our typescript SDK."
          text="npm install @ellumina/renthub-btfs"
          link="https://www.npmjs.com/package/@ellumina/renthub-btfs"
        />
      </section>
    </main>
  );
};

export default GetStarted;

const ThemeCard = ({
  title,
  description,
  text,
  link
}: {
  title: string;
  description: string;
  text: string;
  link: string;
}) => {

  return (
    <div
      className={cn(
        `p-8 py-10 max-w-[520px] rounded-2xl bg-gradient-to-tr from-purple-400 to-btfs hover:border opacity-70`,
      )}
    >
      <h1 className="font-bold text-3xl font-sans mb-5">{title}</h1>
      <p className="text-lg text-gray-800 leading-6">{description}</p>
      <div className="bg-[#0F0F0F] mt-6 w-full text-gray-300 rounded-md px-2 py-2">
        {text}
        <span className="float-right">
          <Link
            href={link}
          >
            <Link2
              fontSize={150}
              className={`bg-purple-500 hover:bg-purple-800 cursor-pointer rounded-md text-[2rem] p-1`}
            />
          </Link>
        </span>
      </div>
    </div>
  );
};
