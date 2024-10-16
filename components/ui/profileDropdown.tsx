"use client";

import Avvvatars from "avvvatars-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { CopyAddr } from "../globals/navbar";

function ProfileDropdown({ session }: { session: any }) {
  if (
    typeof session?.address?.base56 == undefined ||
    !session?.address?.base56
  ) {
    return;
  }

  return (
    <main className="z-[500]">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avvvatars style="shape" value={String(session?.address?.base56)} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-max p-2 mr-20">
          <DropdownMenuLabel>
            <CopyAddr address={sliceAdd(session?.address?.base56 as string)} />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="bg-black w-max hover:bg-rose-500"
              onSelect={() => {
                signOut();
                redirect("/app/");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}

export default ProfileDropdown;

function sliceAdd(add: string) {
  if (!add) return "";
  return add.slice(0, 6) + "..." + add.slice(-6);
}
