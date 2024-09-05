import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import React from "react";

const GetStarted = () => {
  return (
    <main className="space-y-14">
      <h1 className="text-4xl font-pixelfy">
        GET STARTED IN {"<"} 1 MIN, FOR REAL REAL !
      </h1>
      <section className="grid grid-cols-2 gap-10">
        <ThemeCard
          title="SDK"
          description="Add effortless uploads to any app with our typescript SDK."
          command={"npm i btfs-cloud"}
          color="[#0076E8]"
        />
        <ThemeCard
          title="React Package"
          description="Add effortless componrntea to any react app with our package."
          color="[blue-400]"
          command={"npm create btfs-cloud"}
        />
        <ThemeCard
          title="BTFS CLI"
          description="simlasly integrate our btfs cloud cli into your react application."
          color="purple-400"
          command={"npm i btfs-cloud-cli"}
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
  color = "purple-400"
}: {
  title: string;
  description: string;
  command: string;
  color: any;
}) => {
  const bgColor = `from-${color}`;

  return (
    <div
      className={cn(
        `p-8 py-10 max-w-[520px] rounded-2xl bg-gradient-to-b from-${color} to-black hover:border`,
        {
          // [`from-${color}`]: color
        }
      )}
    >
      <h1 className="font-bold text-3xl font-sans mb-5">{title}</h1>
      <p className="text-lg text-gray-800 leading-6">{description}</p>
      <div className="bg-[#0F0F0F] mt-6 w-full text-gray-300 rounded-md px-2 py-2">
        {command}
        <span className="float-right">
          <Copy
            fontSize={150}
            className={`bg-purple-500 hover:bg-purple-800 cursor-pointer rounded-md text-[2rem] p-1`}
          />
        </span>
      </div>
    </div>
  );
};
