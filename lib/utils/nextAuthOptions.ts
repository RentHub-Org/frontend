import CredentialsProvider from "next-auth/providers/credentials";
import { utils } from "tronweb";
import prisma from "@/lib/prisma";

export default {
  providers: [
    CredentialsProvider({
      id: "tronAuth",
      name: "tronAuth",
      credentials: {
        signature: { label: "signature", type: "text" },
        message: { label: "message", type: "text" }
      },
      async authorize(credentials) {
        const { message, signature } = credentials as Record<string, string>;
        const messageAddress = message.split(":")[0];
        try {
          const sigAddress = utils.message.verifyMessage(message, signature);
          if (sigAddress !== messageAddress) {
            return null;
          }

          try {
            await prisma.user.upsert({
              where: { address: sigAddress },
              create: {
                address: sigAddress,
                creditUsage: {
                  create: {
                    credits: 50000
                  }
                }
              },
              update: {}
            });
          } catch (err) {
            console.error(err);
          }

          console.log("user created successfully !");
          return {
            id: "1",
            name: "tronUser",
            address: {
              base56: sigAddress,
              hex: utils.address.toHex(sigAddress)
            }
          };
        } catch (err) {
          console.log("ERROR :", err);
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.address = token.address;
      return session;
    }
  },
  pages: {
    signIn: "/app"
  },
  secret: process.env.NEXTAUTH_SECRET
};
