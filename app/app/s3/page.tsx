// pages/btfsStorage.js
import { s3 } from "@/lib/utils";
import { getServerSession } from "next-auth";
import FilesTable from "./FilesTable";
import NEXT_OPTIONS from "../../../lib/utils/nextAuthOptions";
import { redirect } from "next/navigation";

type SessionPayload = {
  address: {
    base56: string;
    hex: string;
  };
};

export default async function BtfsStorage() {
  const data: SessionPayload = (await getServerSession(
    NEXT_OPTIONS
  )) as SessionPayload;

  if (data == null) {
    redirect("/app");
  }

  console.log("data : ", data);

  return (
    <main className="flex flex-col space-y-4 min-h-screen text-white">
      <h1>Coming Soon....</h1>

      {/* <h1 className="text-2xl font-semibold leading-none tracking-tight">
        S3 Storage
      </h1> */}

      {/* {data.address.base56 && <FilesTable bucketName={data.address.base56} />} */}
    </main>
  );
}
