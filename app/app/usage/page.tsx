import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Usage() {
    const data = await getServerSession(nextAuthOptions);
    if (data == null) {
        redirect("/app");
    } 
    
    return (
       <>   show the usage of the files sabed til now...
        </>
    )
}
