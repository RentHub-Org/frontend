import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import * as React from "react"
import AddTelegramCard from "./components/addtelegramcard";
import TelegramTable from "./components/telegramTable";
import { IconExclamationMark } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();
async function getUser() {
    const session = await getServerSession(nextAuthOptions);
    return session;
}
export default async function Telegram() {
    const session = await getUser();
    //now the sessions are present
    if (session == null) {
        redirect("/app");
    }
    const telegrams = await prisma.telegramEndPoints.findMany({
        where: {
            nameHolder: session.address.base56
        }
    });
    console.log(telegrams);


    return (
        <>
            <div className="text-2xl font-semibold leading-none tracking-tight">
                Telegram
            </div>
            <div className="lg:grid md:grid-flow-col gap-3">
                <div className="md:col-span-10 mb-[300px]">
                    <DescriptiveContent state={(telegrams.length>0)}/>
                    <TelegramTable session={session} contents={telegrams}/>
                </div>
                <div className="md:col-span-1 ">
                    <AddTelegramCard session={session}/>
                </div>
            </div>
        </>
    );
}

function DescriptiveContent({state}:{state:boolean}){
    console.log(state);
    return (
        <div className={cn(
            "p-1 mt-3 rounded-[10px] bg-theme-1 flex gap-2 items-center",
            state && "hidden"
        )}>
            <IconExclamationMark size={40} className="text-red-400"/>
            <div className="text-[#414141] font-mono">By adding a userhandle here will allow that telegram to add files to btfs using your quota.</div>
        </div>
    )
}
