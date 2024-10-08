"use client";

import CenterWrap from "@/components/globals/centerwrap";
import Footer from "@/components/globals/footer";
import Navbar from "@/components/globals/navbar";
import { Faq } from "@/components/landings/Faq";
import Features from "@/components/landings/Features";
import GetStarted from "@/components/landings/GetStarted";
import Hero from "@/components/landings/Hero";
import SdkSectin from "@/components/landings/SdkSectin";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <main className="bg-black P-full max-h-max min-h-screen">
      <Navbar session={session} />
      <section className="flex flex-col py-10">
        <Hero />
      </section>

      <CenterWrap className="p-6 flex flex-col space-y-10">
        <SdkSectin />
        <GetStarted />
        <Faq />
        {/* <Features /> */}
      </CenterWrap>
      <Footer />
    </main>
  );
}
