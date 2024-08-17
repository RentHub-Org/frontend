import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import { getServerSession } from "next-auth";

type SessionPayload = {
    address : {
        base56: string;
        hex: string;
    }
}

export default async function Profile() {
    const { address }: SessionPayload =  await getServerSession(nextAuthOptions) as SessionPayload;
    return (
        <>
            <div className="text-2xl font-semibold leading-none tracking-tight">
                Profile
            </div>
            <div className="">
                <div className="px-4 tet-xl">
                    <span className=" text-theme-3 font-bold">{address.base56}</span> 
                </div>                
            </div>
        </>
    );
}