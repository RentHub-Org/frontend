import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@radix-ui/react-dropdown-menu";
import Avvvatars from "avvvatars-react";
import { MenuIcon } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import CenterWrap from "./centerwrap";

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
      await window?.tronLink?.request({ method: "tron_requestAccounts" });

      const message =
        window?.tronLink?.tronWeb?.defaultAddress?.base58 +
        ":logging_in_to_session";
      const signature = await window?.tronLink?.tronWeb.trx.signMessageV2(
        message
      );
      const res = await signIn("tronAuth", {
        message,
        signature,
        redirect: false
      });

      if (res?.ok) {
        // router.push("/app");
      } else {
        console.error("Sign in failed");
      }
    } catch (error) {
      alert("Please install TronLink to connect your wallet.");
      console.error("Error while signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  function sliceAdd(add: string) {
    if (!add) return "";
    return add.slice(0, 6) + "..." + add.slice(-4);
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
            <Link href="/#features">Features</Link>
          </li>
          {/* <li>
            <Link href="#">Pricing</Link>
          </li> */}
          <li>
            <Link target="_blank" href="https://docs.renthub.cloud">
              Docs
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://www.npmjs.com/package/@ellumina/renthub-btfs"
            >
              SDK
            </Link>
          </li>
          <li>
            <Link href="/#faq">FAQ</Link>
          </li>
        </ul>
        <aside className="flex items-center gap-4">
          <div className="hidden md:block">
            {session.status === "authenticated" &&
            window?.tronLink?.tronWeb.defaultAddress?.hex ? (
              <div className="flex gap-1 items-center">
                <Link
                  href="/app"
                  className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0061C6_0%,#216869_50%,#967CF8_100%)]" />{" "}
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Dashboard
                  </span>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avvvatars
                      style="shape"
                      value={String(
                        window?.tronLink?.tronWeb.defaultAddress?.hex
                      )}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-max p-2 mr-20">
                    <DropdownMenuLabel>
                      <CopyAddr
                        address={sliceAdd(
                          window?.tronLink?.tronWeb.defaultAddress
                            ?.hex as string
                        )}
                      />
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="bg-black w-max"
                        onSelect={() => {
                          signOut();
                          redirect("/");
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <button
                onClick={initSignin}
                disabled={loading}
                className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0061C6_0%,#216869_50%,#967CF8_100%)]" />{" "}
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

export const CopyAddr = ({ address }: { address: string }) => {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.info("address copied !");
        console.log("Copied!", { text });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <div className="w-full max-w-[16rem]">
      <div className="relative">
        <label htmlFor="npm-install-copy-button" className="sr-only">
          {address}
        </label>
        <input
          id="npm-install-copy-button"
          type="text"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={address}
          disabled
          readOnly
        />
        <button
          className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg p-2 inline-flex items-center justify-center"
          onClick={handleCopy(address)}
        >
          <span id="default-icon">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
          <span id="success-icon" className="hidden items-center">
            <svg
              className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};
