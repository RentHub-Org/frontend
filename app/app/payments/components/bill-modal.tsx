'use client'
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@radix-ui/react-dropdown-menu";
import { Dot } from "lucide-react";
import { Bilbo_Swash_Caps } from "next/font/google";
import { Input } from "postcss";
import { useState } from "react";

export default function BillsModal({bills}: any){
  console.log(bills); 
  return (
        <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Show History</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Payment History</SheetTitle>
            <SheetDescription>
              Contains the history of your past payments.
            </SheetDescription>
          </SheetHeader>
          <div className="h-[90%] overflow-y-auto border p-1 mt-2 border-1 rounded">
            { bills && 
              bills.map((bill:any)=>{
                return ( <div className="flex flex-col items-center justify-start border-b pb-2">
                    <div className="flex items-center text-yellow-500 w-full">
                      <Dot className="h-10 w-10" /> {bill.created_on.toLocaleString()}
                    </div>
                    <div className="flex items-center pl-10 w-full gap-2">
                      <Label className="text-sm text-white-500">Txn Hash:</Label>
                      <Label className="text-sm text-gray-600">{bill.txnHash.slice(0,5) + "...." + bill.txnHash.slice(-7)}</Label>
                    </div>
                    <div className="flex items-center pl-10 w-full gap-2">
                      <Label className="text-sm text-white-500">Value:</Label>
                      <Label className="text-sm text-gray-600">{parseInt(bill.payableAmount.toString())/1000000} <span className="text-red-500">Trx</span></Label>
                    </div>
                    <div className="flex items-center pl-10 w-full gap-2">
                      <Label className="text-sm text-white-500">To:</Label>
                      <Label className="text-sm text-gray-600">{parseInt(bill.credits.toString())} <span className="text-green-500">Credits</span></Label>
                    </div>
                  </div> )
              })  
            }
              
            
          </div>
          <SheetFooter>
            
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
}