import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import Avvvatars from 'avvvatars-react'

type Props = {
    session : {
        status: string;
        data: any;
    }
};

const Navbar = ({ session }: Props) => {
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-base-1 backdrop-blur-lg z-[100] flex items-center border-b-[1px] bg-theme-3 border-neutral-900 justify-between">
      <aside className="flex items-center gap-[2px]">
        <Image
          src="flux.svg"
          width={32}
          height={32}
          alt="fuzzie logo"
          className="shadow-sm"
        />
        <p className="text-3xl font-bold">Flux</p>
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">Clients</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">Documentation</Link>
          </li>
          <li>
            <Link href="#">Enterprise</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <div className="hidden md:block">
            { session.status === "authenticated"? 
                <div className="flex gap-1 items-center"> 
                    <Link
                    href="/app"
                    className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#DCE1DE_0%,#216869_50%,#DCE1DE_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Dashboard
                    </span>
                    </Link>

                    <Avvvatars style='shape' value={session?.data?.address?.hex} />
                </div>
                :
                <Link
                    href="/signin"
                    className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#DCE1DE_0%,#216869_50%,#DCE1DE_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Signin/Signup
                    </span>
                </Link>
            }
        </div>
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  );
};
// authenticated 

export default Navbar;
