'use client'    // This is a comment
import { Button } from "@/components/ui/button"
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
import { IconUpload } from "@tabler/icons-react"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

export default function RentalModalButton() {
  const [ days , setDays ] = useState<number>(31);
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
  async function uploadHandle(){
    //checks
    if(file == null){
      toast.info("Please select a file to upload.");
      return;
    }
    if(!days || days<31){
      toast.info("Please enter the days for which you want to rent the node.");
      return;
    }
    const formdata = new FormData();
    try{
      const data: { message: string; signature: string } = await signMessageWithTimeConstrain() as { message: string; signature: string };
      formdata.append("file", file, file.name);
      var config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_CORE_BASE_URL}/tronSig/upload?to-blockchain=true&days=${days}`,
        headers: { 
          'tron_message': data.message, 
          'tron_signature': data.signature, 
          'Content-Type': 'multipart/form-data',
        },
        data : formdata
      };
      try{
        const response = await axios(config);
        console.log("response baby:",response.data);
        toast.success("Uploded!!");
      }catch(err:any){
        toast.error(err.response.data.message);
      }
    }catch(err){
      toast.error("Error while uploding the file. Please try again later.");
      console.log("ERROR:",err);
    }
  }

  function handleFileSelectChange(event: any){
    setFile(event.target.files[0]);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="dark:bg-theme-3 hover:dark:bg-theme-4 h-[30px] flex items-center gap-1"><IconUpload size={20}/>Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload to Rental</DialogTitle>
          <DialogDescription>
            Not sure what are the fields here, checkout the tutorials for this section.
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
              onChange={handleFileSelectChange}
              type="file"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              For Days
            </Label>
            <Input
              id="name"
              className="col-span-2"
              min={31}
              placeholder="Atleast 31 days"
              type="number"
              onChange={(e:any)=>{setDays(e.target.value)}}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={uploadHandle} disabled={ file == null || !days || days < 31 }>upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
