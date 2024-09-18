"use client";

import CenterWrap from "@/components/globals/centerwrap";
import Footer from "@/components/globals/footer";
import Navbar from "@/components/globals/navbar";
import { Faq } from "@/components/landings/Faq";
import Features from "@/components/landings/Features";
import GetStarted from "@/components/landings/GetStarted";
// import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Hero from "@/components/landings/Hero";
import { useSession } from "next-auth/react";
import { RecoilRoot } from "recoil";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <main className="bg-black w-full max-h-max min-h-screen">
      <Navbar session={session} />
      <section className="flex flex-col py-10">
        <Hero/>
      </section>

      <CenterWrap className="p-6 flex flex-col space-y-10">
        <GetStarted />
        <Faq />
        <Features />
      </CenterWrap>
      <Footer />
    </main>
  );
}
