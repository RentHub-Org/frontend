"use client";

import Navbar from "@/components/globals/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import CurveCard from "@/components/ui/CurveCard";
import { cn } from "@/lib/utils";
// import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useSession } from "next-auth/react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import Hero from "@/components/Hero";
import GetStarted from "@/components/GetStarted";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <main className="bg-black w-full min-h-screen">
      <Navbar session={session} />
      <section className="flex flex-col py-10">
        <Hero />
      </section>
    </main>
  );
}
