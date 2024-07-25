import { PrismaClient } from "@prisma/client";
import { useEffect } from "react";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import * as React from "react"
import AddTelegramCard from "./components/addtelegramcard";
import TelegramTable from "./components/telegramTable";

const prisma = new PrismaClient();
async function getUser() {
    const session = await getServerSession(nextAuthOptions);
    return session;
}
export default async function Telegram() {
    const session = await getUser();
    //now the sessions are present
    if(!session || session == null){
        return <div>loading...</div>
    }
    const telegrams = await prisma.telegramEndPoints.findMany({
        where: {
            nameHolder: session.address.base56
        }
    });


    return (
        <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 overflow-y-auto dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
            <div className="text-2xl font-semibold leading-none tracking-tight">
                Telegram
            </div>
            <div className="lg:grid md:grid-flow-col gap-3">
                <div className="md:col-span-10 mb-[300px]">
                    <TelegramTable session={session} contents={telegrams}/>
                </div>
                <div className="md:col-span-1 ">
                    <AddTelegramCard session={session}/>
                </div>
            </div>
        </div>
    </div>
    );
}
