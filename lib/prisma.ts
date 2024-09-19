import { PrismaClient } from "@prisma/client";

// Declare a global variable for prisma to prevent multiple instances in development mode
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize the PrismaClient instance as a singleton
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"] // Optional logging options for better debugging
  });

// Ensure that prisma is not recreated in development mode
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
