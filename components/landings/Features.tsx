import React from "react";
import CenterWrap from "../globals/centerwrap";
import PlansButton from "./PlanButton";
import PlanCard from "./PlanCards";
import { useRecoilValue } from "recoil";
import { RentalPlanState } from "@/app/atoms/PlansAtom";
import { Button } from "../ui/button";

const Features = () => {
  const rentPlan = useRecoilValue(RentalPlanState);

  return (
    <main className="border-y border-gray-900">
      <CenterWrap className="p-10">
        {/* <PlansButton /> */}
        {rentPlan ? (
          <PlanCard
            emoji={"😎"}
            title="Rent"
            features={[
              "5000 Pinned Files",
              "10GB Storage",
              "3 Free Gateway",
              "10G Bandwidth",
              "100k Requests"
            ]}
          />
        ) : (
          <PlanCard
            emoji="🤓"
            title="Free"
            features={[
              "500 Pinned Files",
              "1GB Storage",
              "1 Free Gateway",
              "10G Bandwidth",
              "10k Requests"
            ]}
          />
        )}
        <div className="flex mt-20 max-lg:mt-7 max-lg:gap-3 sm:space-x-7 justify-center max-sm:flex-col">
          <Button className="rounded-full px-6 bg-purple-500 py-1">
            Get Started !
          </Button>
          <PlansButton />
        </div>
      </CenterWrap>
    </main>
  );
};

export default Features;
