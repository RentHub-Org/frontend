import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import CenterWrap from "../globals/centerwrap";

const CurveCard = ({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <CenterWrap
      className={cn(
        "rounded-3xl relative w-full max-h-max p-10 bg-gradient-to-tr from-purple-400 via-black to-btfs",
        className
      )}
    >
      <div className=" bg-black/20 w-full max-h-max shadow-lg sm:rounded-3xl bg-clip-padding bg-opacity-15 md:border md:backdrop-blur-2xl border-gray-400 max-sm:border-gray-800 md:px-20 md:py-24 max-sm:bg-transparent">
        {children}
      </div>
    </CenterWrap>
  );
};

export default CurveCard;
