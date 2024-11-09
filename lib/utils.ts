import { S3Client } from "@aws-sdk/client-s3";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const s3 = new S3Client({
  endpoint: "https://be.renthub.cloud:6001/",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESSKEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET!
  },
  forcePathStyle: true,
  apiVersion: "v4",
  region: "us-east-1"
});
