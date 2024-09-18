'use client'
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { Copy, Eye, Trash2Icon, ArrowRightFromLine, Goal } from "lucide-react"
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type KeyRow = {
    key: string;
    tagName:string;
}

export function ApiKeysTable() {
    const [ keys, setKeys ] = useState<KeyRow[]>([]); 
    const call = async()=>{
        try{
        const res = await fetch("/api/keys",{
            method : "GET"
        });
        const data =await res.json();
        console.log(data);
        setKeys(data.apiKeys);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        call();
    },[]);


    return (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[400px]">Tag-name</TableHead>
                    <TableHead>key</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {   keys && 
                        keys.map((key: KeyRow) => (
                            <Row key={key.key} data={key}/>
                        ))
                    }   
                    { keys && keys.length<5 && <AddApiKey calling={call}/> }
                </TableBody>
            </Table>
    )
}

function Row({data}: {data:KeyRow}){
    const [ hidden, sethidden] = useState(true);
    function calling(){
        alert("delete");
        
    }
    async function viewIt(){
        sethidden(false);
        setTimeout(()=>{sethidden(true)},5000) 
    }
    function copy(){
        navigator.clipboard.writeText(data.key);
        toast.info("Copied");
    }   
    return (
        <>
            <TableRow key={data.key}>
            <TableCell className="font-medium">{data.tagName}</TableCell>
            <TableCell className="font-medium">
                {hidden? 
                    <div className="flex gap-2 items-center text-theme-3">********-****-****-****-************ <Eye size={15} onClick={viewIt}/></div>
                :
                    <div className="flex gap-2 items-center">
                    {data.key}<Copy onClick={copy} size={15}/> 
                    </div>
                }
            </TableCell>
            <TableCell className="flex justify-end"><Trash2Icon size={16} onClick={calling}/></TableCell>
            </TableRow>
        </>
    )
}

function AddApiKey({calling}: any){
    const [ tagName, setTagName ] = useState({
        tagName: "",
        locked: false
    });
    async function Submit(){
        if(tagName.locked){
            return;
        }
        setTagName({...tagName, locked: true});
        fetch("/api/keys",{
            method : "POST",
            body: JSON.stringify({tagName: tagName.tagName}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            if(res.status == 200)
                toast.success("New api-key created successfully.");
            console.log("res: ",res);
        })
        .catch((err)=>{
            toast.error("Error while creating a new api-key. Please try again later.");
            console.error("Error: ",err);
        })
        .finally(()=>{
            setTagName({tagName:"", locked: false});
            calling();
        });
    }    
    return (
        <TableRow >
        <TableCell className="py-[30px] font-medium flex gap-2 items-center text-[#5d5d5d]">Create a New api-key</TableCell>
        <TableCell className="font-medium">
                <div className="flex gap-2 items-center text-theme-3">
                    <Input
                        placeholder="Enter a tag name"
                        value={tagName.tagName}
                        className={cn(
                            "w-full",
                            tagName.locked && "cursor-not-allowed disabled disabled opacity-40",
                        )}
                        onChange={(e)=>{setTagName({tagName: e.target.value, locked: false})}}
                    />
                    {/* </Input> */}
                </div>
        </TableCell>
        <TableCell className={cn(
            "flex justify-end",
            tagName.locked && "cursor-not-allowed disabled",
            !tagName.locked && "text-theme-6"
        )}
            onClick={Submit}
        ><ArrowRightFromLine size={16}/></TableCell>
        </TableRow>
    )
}