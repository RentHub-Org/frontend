'use client'
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CheckCircle, Circle } from "lucide-react";
import React from "react";

export default function InfoModal ({trigger}: {trigger: any}){
    return (
      <div className="w-full">
      <CardSpotlight className="w-full rounded-[20px]">
        <div className="w-full p-4">
          <p className="text-xl font-bold relative z-20 mt-2 text-white">
            Points to Consider
          </p>
          <ul className="text-xl font-bold relative z-20 mt-2 text-white text-theme-1/60 space-y-2">
            <Step title="Our payment window is time-sensitive. Ensure you have ample time and focus for a smooth transaction." />
            <Step title="Keep your transaction environment secure: use a private network and avoid public Wi-Fi during payment." />
            <Step title="Prepare your crypto wallet and verify your available balance before starting the process." />
            <Step title="Session continuity is critical. Avoid navigating away, refreshing, or interrupting the payment flow." />
            <Step title="Maintain a stable internet connection to prevent transaction disruptions." />
            <Step title="Double-check all transaction details before confirming to prevent irreversible errors." />
            <Step title="Familiarize yourself with the exact cryptocurrency amount required to complete the transaction." />
            <Step title="Plan ahead and allocate dedicated time for this transaction to minimize potential complications." />
            <Step title="Understand that cryptocurrency transactions are final and cannot be reversed once confirmed." />
            <Step title="Fee Deduction: The initial amount in **SUN** (1 TRX = 1,000,000 SUN) is reduced by **10 TRX** (i.e., 10,000,000 SUN) before further calculations.  " />
            <Step title="Conversion to TRX: The remaining SUN amount is converted to TRX by multiplying it by **0.000001** (since 1 SUN = 0.000001 TRX). " />
            <Step title="Credit Calculation: The TRX amount is then multiplied by **CREDITS_PER_TRX** (a configurable value from the environment) to determine the total credits." />
          </ul>
        </div>
      </CardSpotlight>
        <div className="w-full h-[40px] flex p-4 gap-3 text-sm text-[#575757] items-center justify-end mt-2"> 
            <Button className="text-black color-theme-2 hover:bg-theme-3 text-[20px] mt-3" onClick={()=>{trigger(false)}}>
              Continue to Paymnet Gateway.
            </Button>
        </div>
      </div>
    )
}


const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
