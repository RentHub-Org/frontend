import { Check, CheckCheck, CheckCircle, CheckSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CardProps {
  title: string;
  features: string[];
  emoji: string
}

const PlanCard = (props: CardProps) => {
  return (
    <div className="w-full flex flex-col gap-16">
      <h5 className="mb-4 text-center text-6xl font-semibold text-gray-200 font-pixelfy">
        All the fun, none of the fuss with our {props.title === "free" ? "free" : "rental"} plan!
        <span className='ml-4 text-6xl'>{props.emoji}</span>
      </h5>
      {/* overviews */}
      <section className="w-full h-full gap-7 justify-around mx-auto flex flex-wrap">
        {props.features.map((f) => (
          <>
            <Feature title={f} />
          </>
        ))}
      </section>
      <Link
        href={`/app`}
        className="absolute left-10 -bottom-5 text-black bg-highlight 
        shadow-2xl hover:shadow-xl  hover:translate-y-1 transition-all ease-in-out
         focus:ring-4 shadow-black focus:outline-none focus:ring-blue-900 font-semibold rounded-lg 
         text-sm px-2 py-2.5 inline-flex justify-center w-3/4 text-center"
      >
        Get Started
      </Link>
    </div>
  );
};

export default PlanCard;

const Feature = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-start space-x-2 items-start">
      {/* checkbox */}
      <Check
        fontSize={24}
        width={30}
        height={30}
        className="bg-cyan-400 p-1 text-black mt-1 rounded-full"
      />
      <div className="-space-y-1">
        <h1 className="font-roboto font-bold lg:text-2xl text-xl text-gray-200">
          {title}
        </h1>
        <p className="lg:text-[1rem] text-sm text-gray-300">Total</p>
      </div>
    </div>
  );
};
