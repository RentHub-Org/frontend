'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TelegramEndPoints } from "@prisma/client";
import { IconTrashXFilled } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

type SessionProp = {
    user: {
        address: string,
        name: string,
    },
    address: {
        base56: string,
        hex: string
    }
}

export default function TelegramTable({contents, session}:{contents: TelegramEndPoints[], session: SessionProp}){
    const [ lock, setLock ] = useState(false);
    // const router = useRouter();
    const revokeUsername = async (revokeUsername:string)=>{
        setLock(true);
        try{
            const message = session.address.base56 + ":" + revokeUsername;
            const signature = await window.tronWeb?.trx.signMessageV2(message);
            const res = await axios(process.env.NEXT_PUBLIC_CORE_BASE_URL+"/user/deleteTelegramHandle",{
                method: "POST",
                data: {
                    message,
                    signature,
                }
            });
            if(res.status == 201){
                // router.push("app/telegram");
                alert("removed reload the page sir...");
            }
        }catch(err){
            console.error("erro while deleting the username:",err);
        }finally{
            setLock(false);
        }
    }
    return (
        <Table
            className={cn(
                lock && "opacity-50 pointer-events-none"
            )}
        >
          <TableCaption>A list of your telegram handler linked to this username.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Username</TableHead>
              <TableHead className="text-right">Revoke</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.map((handle) => (
              <TableRow key={handle.username}>
                <TableCell className="font-medium">@{handle.username}</TableCell>
                <TableCell className="text-right flex items-center justify-center">
                    <button onClick={()=>revokeUsername(handle.username)}>
                        <IconTrashXFilled/>
                    </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}