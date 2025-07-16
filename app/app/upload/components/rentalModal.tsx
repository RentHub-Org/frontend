"use client"; // This is a comment
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoaderButton from "@/components/ui/LoaderButton";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";

export default function RentalModalButton() {
  const [days, setDays] = useState<number>(31);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogTrigger, setDialogTrigger] = useState<Boolean>(false);

  const router = useRouter();

  const signMessageWithTimeConstrain = async () => {
    if (window.tronLink === undefined) {
      throw new Error("TronLink not found");
    }
    if (!window.tronLink.ready) {
      window.tronLink.request({ method: "tron_requestAccounts" });
      return;
    }
    const sigValidTill = BigInt(Date.now() + 30000).toString(); //30 seconds validity for sig
    const message =
      window.tronLink.tronWeb.defaultAddress?.base58 + ":" + sigValidTill;
    const signature = await window.tronLink.tronWeb.trx.signMessageV2(message);
     // console.log("signature:", signature);
    return { message: message, signature: signature };
  };
  async function uploadHandle() {
    //checks
    if (file == null) {
      toast.error("Please select a file to upload.");
      return;
    }

     // console.log(file);
    if (!days || days < 31) {
      toast.error("Please enter the days for which you want to rent the node.");
      return;
    }

    setIsLoading(true);

    const formdata = new FormData();
    try {
      const data: { message: string; signature: string } =
        (await signMessageWithTimeConstrain()) as {
          message: string;
          signature: string;
        };
      formdata.append("file", file, file.name);
      var config = {
        method: "post",
        url: `${
          process.env.NEXT_PUBLIC_CORE_BASE_URL
        }/tronSig/upload?to-blockchain=true&days=${days}&fileSize=${
          file.size / 1024
        }`,
        headers: {
          tron_message: data.message,
          tron_signature: data.signature,
          "Content-Type": "multipart/form-data"
        },
        data: formdata
      };
      try {
        const response = await axios(config);
         // console.log("response baby:", response.data);
        toast.success("Uploded!!");

        const { bttCost, creditsCost } = response.data.rentalCost;

        toast.info(`${creditsCost} Credits used \t and  ${bttCost} BTT used`, {
          duration: 5000,
          position: "bottom-center"
        });

        setTimeout(() => {
          return router.refresh();
        }, 1000);
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    } catch (err) {
      toast.error("Error while uploding the file. Please try again later.");
       // console.log("ERROR:", err);
    } finally {
      setIsLoading(false);
      setDialogTrigger(false);
    }
  }

  function handleFileSelectChange(files: any) {
    const selectedFile = files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/json"
    ];

    const isAllowedType = allowedTypes.includes(selectedFile.type);
    const isWithinSizeLimit = selectedFile.size <= 10 * 1024 * 1024;

    if (!isAllowedType) {
      toast.error(`Only ${allowedTypes.join(", ")} files are allowed.`);
      return;
    }
    if (!isWithinSizeLimit) {
      toast.error("File size must not exceed 10MB.");
      return;
    }

    setFile(files[0]);
  }

  return (
    <Dialog open={dialogTrigger == true} onOpenChange={setDialogTrigger}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="dark:bg-theme-3 hover:dark:bg-theme-4 h-[30px] flex items-center gap-1"
        >
          <IconUpload size={20} />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[505px] bg-black">
        <DialogTitle></DialogTitle>
        <DialogHeader>
          <DialogTitle>Upload to Rental</DialogTitle>
          <DialogDescription>
            Not sure what are the fields here, checkout the tutorials for this
            section.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              File upload
            </Label> */}
            {/* <Input
              id="name"
              className="col-span-3"
              onChange={handleFileSelectChange}
              type="file"
            /> */}
            <div className=" w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <FileUpload onChange={handleFileSelectChange} />
            </div>
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
              onChange={(e: any) => {
                setDays(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <LoaderButton />
          ) : (
            <Button
              type="submit"
              disabled={file == null}
              onClick={uploadHandle}
            >
              upload
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}