"use client";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ExternalLink } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      signOut();
    }
  }, [session]);
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="flex gap-2 flex-col items-center text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-white font-sans tracking-tight">
        <div>
          <span className="bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r from-theme-1 to-[#b4b2b2]">
            How was it? Experiencing{" "}
          </span>
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-theme-3  to-theme-2 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">RentHub.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-theme-3  to-theme-2 py-4">
              <span className="">RentHub.</span>
            </div>
          </div>
        </div>
        <span className="text-sm tracking-tight font-sans flex">
          You have logged out.
          <button
            className="flex gap-1 items-center text-theme-3"
            onClick={() => {
              router.push("/app");
            }}
          >
            Signin here <ExternalLink size={15} />
          </button>
        </span>
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
