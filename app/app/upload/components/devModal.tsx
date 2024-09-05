'use client'    // This is a comment
import { Button } from "@/components/ui/button"
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"

export default function DevModalButton() {
  const [ file, setFile ] = useState<File | null>(null);
  const signMessageWithTimeConstrain = async () => {
    if(window.tronLink === undefined){
        throw new Error("TronLink not found");
    }
    if(!window.tronLink.ready){
        window.tronLink.request({ method: 'tron_requestAccounts' });
        return;
    }
    const sigValidTill = BigInt(Date.now() + 30000).toString(); //30 seconds validity for sig
    const message = window.tronLink.tronWeb.defaultAddress?.base58 + ":"+ sigValidTill;
    const signature = await window.tronLink.tronWeb.trx.signMessageV2(message);
    console.log("signature:",signature);
    return {message: message, signature: signature};
  }
  async function handleUpload(){
    //we uploading the file bro...
    if(file == null)return;
    const formdata = new FormData();
    try {
      const data: { message: string; signature: string } = await signMessageWithTimeConstrain() as { message: string; signature: string };
      formdata.append("file", file, file.name);
      console.log(process.env.NEXT_PUBLIC_CORE_BASE_URL);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_CORE_BASE_URL}/tronSig/testout`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'tron_message': data.message,
          'tron_signature': data.signature,      
        },
      });
      console.log(response.data);
      alert("uploded 🥹");
    } catch (err) {
      console.error("Error:", err);
    }
  }
  function handleFileSelectChange(event: any){
    setFile(event.target.files[0]);
  }
  console.log(file);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="dark:bg-theme-3 hover:dark:bg-theme-4 h-[30px] flex items-center gap-1"><IconPlus size={20}/>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Dev-enviourment</DialogTitle>
          <DialogDescription>
            Files uploded under dev-env are not subecjected to always persist.
            use rental if u want to upload files that are available for designated duration.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              File upload
            </Label>
            <Input
              id="name"
              className="col-span-3"
              type="file"
              onChange={handleFileSelectChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpload} disabled={ file == null }>upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}