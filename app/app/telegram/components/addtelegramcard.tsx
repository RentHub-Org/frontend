'use client'
import { use, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

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

export default function AddTelegramCard({session}: {session: SessionProp}) {
    const [ locked, setLocked ] = useState(false);
    const [ name, setName ] = useState("");
    const initTelegramAdd = async ()=>{
        try{
            if(name == ""){
                toast.info("A name is required");
                return;
            }
            setLocked(true);
            // sign a txn here
            //todo: swat to the tronlink adapter for validation ..
            const message = session.address.base56 + ":" + name;
            const signature = await window.tronWeb?.trx.signMessageV2(message);
            console.log(process.env.NEXT_PUBLIC_CORE_BASE_URL);
            const res = await axios(process.env.NEXT_PUBLIC_CORE_BASE_URL+"/user/addTelegramHandle",{
                method: "POST",
                data: {
                    message,
                    signature,
                }
            });
            console.log("res:",res);
            if(res.status == 201){
                setName("");
                toast.success("Username added!");
            }
        }catch(err){
            toast.error("failed adding telegram");
            console.error("Error while adding address:",err);
        }finally{
            setLocked(false);
        }
    }
    const handleChange = (event:any) => {
        console.log(event.target.value);
        setName(event.target.value);
      };
    return (
        <Card className={cn(
            "flex flex-col bg-transparent text-theme-1",
            locked && "opacity-50 pointer-events-none"
        )}>
            <CardHeader>
                <CardTitle>Add a Handle!</CardTitle>
                <CardDescription>Authorise a telegram username to upload on ur behalf.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} placeholder="Telegram Handle" className="bg-transparent" onChange={handleChange} />
                    </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={initTelegramAdd}>Add</Button>
            </CardFooter>
        </Card>
    )
}
