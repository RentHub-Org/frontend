import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import { getServerSession } from "next-auth";

import { ApiKeysTable } from "./components/apikeytables";
import { redirect } from "next/navigation";

type SessionPayload = {
    address : {
        base56: string;
        hex: string;
    }
}

export default async function Api() {
    const data: SessionPayload =  await getServerSession(nextAuthOptions) as SessionPayload;
    if(data == null){
        redirect("/app");
    }
    return (
        <>
            <div className="text-2xl font-semibold leading-none tracking-tight">
                Api keys
            </div>

            <ApiKeysTable />
            
            <div className="absolute bottom-0 w-full h-[40px] border-t-2 p-2 text-sm text-[#575757]">
                Visit <a href={process.env.NEXT_PUBLIC_DOCS_LINK} className="text-theme-3 underline">docs</a> to know more on sdk api-keys.
            </div>               
        </>
    );
}