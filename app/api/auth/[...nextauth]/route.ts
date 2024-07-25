import NextAuth from "next-auth/next"
import NEXTAUTH_Options from "@/lib/utils/nextAuthOptions"

const handler = NextAuth(NEXTAUTH_Options);

export const GET = handler;
export const POST = handler;