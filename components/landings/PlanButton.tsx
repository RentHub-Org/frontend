import { RentalPlanState } from "@/app/atoms/PlansAtom";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const PlansButton = () => {
  const [plan, setPlan] = useRecoilState(RentalPlanState);

  return (
    <div className="relative">
      {/* individual */}
      {!plan ? (
        <Button
          className={`
            ${"z-10 bg-btfs hover:bg-black text-white border-black border"}
           font-semibold rounded-3xl border px-10 py-1 text-center`}
          onClick={() => {
            setPlan(!plan);
          }}
        >
          Rent <ArrowRight className="ml-2" />
        </Button>
      ) : (
        <Button
          className={`
        ${"z-10 bg-cyan-500 text-white border-black border"}
       font-semibold rounded-3xl hover:bg-black border px-10 py-1 text-center`}
          onClick={() => {
            setPlan(!plan);
          }}
        >
          Free <ArrowRight className="ml-2" />
        </Button>
      )}
    </div>
  );
};

export default PlansButton;
