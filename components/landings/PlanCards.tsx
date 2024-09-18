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
    <div className="relative w-full flex flex-col gap-16">
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
