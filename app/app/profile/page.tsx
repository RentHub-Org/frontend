import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type SessionPayload = {
  address: {
    base56: string;
    hex: string;
  };
};

export default async function Profile() {
    const data : SessionPayload =  await getServerSession(nextAuthOptions) as SessionPayload;
    // const router = useRouter();

    if (data == null) {
        redirect("/app");
    }
    return (
        <>
            <div className="text-2xl font-semibold leading-none tracking-tight">
                Profile
            </div>
            <div className="">
                <div className="px-4 tet-xl">
                    <span className=" text-theme-3 font-bold">{data?.address.base56}</span> 
                </div>                
            </div>
        </>
    );
}
