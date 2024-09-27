import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import Avvvatars from "avvvatars-react";
import CenterWrap from "./centerwrap";
import { signIn, signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { redirect } from "next/navigation";

type Props = {
  session: {
    status: string;
    data: any;
  };
};

const Navbar = ({ session }: Props) => {
  const [loading, setLoading] = useState(false);

  const initSignin = async () => {
    setLoading(true);
    try {
      // const signature: String = await signMessage(address+":loggin_in_to_session");
      if (window.tronLink === undefined) {
        console.log("TronLink not found");
        return;
      }
      if (!window.tronLink.ready) {
        window.tronLink.request({ method: "tron_requestAccounts" });
        return;
      }
      const message =
        window.tronLink.tronWeb.defaultAddress?.base58 +
        ":logging_in_to_session";
      const signature = await window.tronLink.tronWeb.trx.signMessageV2(
        message
      );
      console.log("signature:", signature);
      const res = await signIn("tronAuth", {
        message,
        signature,
        redirect: false
      });
      console.log("signInres:", res);

      if (res?.ok) {
        // router.push("/app");
      } else {
        console.error("Sign in failed");
      }
    } catch (error) {
      console.error("Error while signing in:", error);
    } finally {
      setLoading(false);
    }
  };
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (window.tronLink === undefined) {
      console.log("TronLink not found");
      return;
    }
    if (!window.tronLink.ready) {
      window.tronLink.request({ method: "tron_requestAccounts" });
      return;
    }
    setAddress(window.tronLink.tronWeb.defaultAddress?.base58 || "");
  }, []);
  function sliceAdd(add:string){
    if(!add)return "";  
    return add.slice(0, 6) + "..." + add.slice(-6);
  }
  return (
    <header className="py-5 right-0 w-full bg-base-1 flex items-center border-b-[1px] border-neutral-900 justify-between">
      <CenterWrap className="sm:px-7 flex justify-between items-center">
        <aside className="flex items-center gap-[2px]">
          <Image
            src="flux_home.svg"
            width={40}
            height={40}
            alt="fuzzie logo"
            className="shadow-sm mb-2"
          />
          <p className="text-4xl font-pixelfy font-bold">
            RentHub <span className="text-btfs text-sm">BTFS</span>
          </p>
        </aside>
        <ul className="hidden md:flex font-bold items-center gap-6 list-none">
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="https://docs.renthub.cloud">Docs</Link>
          </li>
          <li>
            <Link href="https://www.npmjs.com/package/@ellumina/renthub-btfs">
              SDK Link
            </Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
        </ul>
        <aside className="flex items-center gap-4">
          <div className="hidden md:block">
            {session.status === "authenticated" ? (
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

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avvvatars style="shape" value={String(window?.tronLink?.tronWeb.defaultAddress?.hex)} />
                  </DropdownMenuTrigger>
                  <DropdownMenuLabel>{sliceAdd(window?.tronLink?.tronWeb.defaultAddress?.hex as string)}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>

                    <DropdownMenuItem
                      onSelect={() => {
                        signOut();
                        redirect("/");
                      }}
                      >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenu>
              </div>
            ) : (
              <button
                onClick={initSignin}
                disabled={loading}
                className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#DCE1DE_0%,#216869_50%,#DCE1DE_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {loading ? "Loading..." : "Signin/Signup"}
                </span>
              </button>
            )}
          </div>
          <MenuIcon className="md:hidden" />
        </aside>
      </CenterWrap>
    </header>
  );
};

export default Navbar;
