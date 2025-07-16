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
    <main className="flex flex-col space-y-4 h-full text-white relative overflow-hidden border-yellow-300 border-2 rounded-[10px]">
      {/* <h1>Coming Soon....</h1> */}
            <div className="absolute w-[200%] left-1/2 -translate-x-1/2 top-[400px] rotate-12 z-10">
                <div className="h-[40px] flex items-center justify-center p-3 bg-yellow-300 border-t-2 border-b-2 border-black">
                <div className="w-full border-y-2 border-black border-dashed">
                    <div className="text-black font-bold text-xl tracking-widest uppercase animate-pulse whitespace-nowrap">
                    ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️
                    </div>
                </div>
                </div>
            </div>
            <div className="absolute w-[200%] left-1/2 -translate-x-1/2 top-[400px] -rotate-45 z-10">
                <div className="h-[40px] flex items-center justify-center p-3 bg-yellow-300 border-t-2 border-b-2 border-black">
                <div className="w-full border-y-2 border-black border-dashed">
                    <div className="text-black font-bold text-xl tracking-widest uppercase animate-pulse whitespace-nowrap">
                    ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️
                    </div>
                </div>
                </div>
            </div>
            <div className="absolute w-[200%] left-3/4 -translate-x-1/2 top-[400px] rotate-[37deg] z-10">
                <div className="h-[40px] flex items-center justify-center p-3 bg-yellow-300 border-t-2 border-b-2 border-black">
                <div className="w-full border-y-2 border-black border-dashed">
                    <div className="text-black font-bold text-xl tracking-widest uppercase animate-pulse whitespace-nowrap">
                    ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️ UNDER DEVELOPMENT ⚠️
                    </div>
                </div>
                </div>
            </div>

      {/* <h1 className="text-2xl font-semibold leading-none tracking-tight">
        S3 Storage
      </h1> */}

      {/* {data.address.base56 && <FilesTable bucketName={data.address.base56} />} */}
    </main>
  );
}
