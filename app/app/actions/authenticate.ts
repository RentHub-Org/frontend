"use server";

import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import { getServerSession } from "next-auth";

export const authenticate = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session || session === null) {
    return false;
  }

  return true;
};
