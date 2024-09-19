"use server";

import prisma from "@/lib/prisma"; // Adjust the path based on your project structure

// Server action to fetch credit usage data for a specific user
export async function getCreditsUsage(userAddr: string) {
  const credits = await prisma?.creditUsage?.findMany({
    where: { userAddr: userAddr },
    select: { timestamp: true, credits: true },
    orderBy: { timestamp: "asc" }
  });

  return credits;
}
