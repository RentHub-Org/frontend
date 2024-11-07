"use client"; // This is a comment
import { Button } from "@/components/ui/button";
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
import {
  PutObjectCommand,
  S3Client,
  S3ServiceException
} from "@aws-sdk/client-s3";

// Configure AWS S3 with BTFS endpoint and credentials
const s3 = new S3Client({
  endpoint: "http://127.0.0.1:6001/",
  credentials: {
    accessKeyId: "82f87b29-9aa5-492e-b479-2afc7bb73fe6", // Replace with your access key
    secretAccessKey: "WGicMAP6fWE9syQi1mL4utpQI3NZwpqs" // Replace with your secret key
  },
  forcePathStyle: true,
  apiVersion: "v4",
  region: "us-east-1"
});

export default function S3Modal() {
  const [files, setFiles] = useState<File[] | []>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogTrigger, setDialogTrigger] = useState<Boolean>(false);
  const bucketName = "renthub-main";

  const router = useRouter();

  //   const signMessageWithTimeConstrain = async () => {
  //     if (window.tronLink === undefined) {
  //       throw new Error("TronLink not found");
  //     }
  //     if (!window.tronLink.ready) {
  //       window.tronLink.request({ method: "tron_requestAccounts" });
  //       return;
  //     }
  //     const sigValidTill = BigInt(Date.now() + 30000).toString(); //30 seconds validity for sig
  //     const message =
  //       window.tronLink.tronWeb.defaultAddress?.base58 + ":" + sigValidTill;
  //     const signature = await window.tronLink.tronWeb.trx.signMessageV2(message);
  //     console.log("signature:", signature);
  //     return { message: message, signature: signature };
  //   };
  async function uploadHandle() {
    if (files.length === 0) return alert("Please choose files to upload.");

    setIsLoading(true);
    const uploadedFilesInfo = [];

    for (const file of files) {
      const params = {
        Bucket: bucketName,
        Key: file.webkitRelativePath || file.name,
        Body: file
        // ACL: "private"
      };

      try {
        const response = await s3.send(new PutObjectCommand(params));
        console.log(response);
      } catch (caught) {
        if (
          caught instanceof S3ServiceException &&
          caught.name === "EntityTooLarge"
        ) {
          console.error(
            `Error from S3 while uploading object to ${bucketName}. \
    The object was too large. To upload objects larger than 5GB.`
          );
        } else if (caught instanceof S3ServiceException) {
          console.error(
            `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`
          );
        } else {
          throw caught;
        }
      } finally {
        setIsLoading(false);
        setDialogTrigger(false);
      }
    }
  }

  function handleFileSelectChange(event: any) {
    setFiles(Array.from(event.target.files));
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
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle>Upload to BTFS S3</DialogTitle>
          <DialogDescription>
            Not sure what are the fields here, checkout the tutorials for this
            section.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Files upload
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={handleFileSelectChange}
              type="file"
              multiple
            />
          </div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <LoaderButton />
          ) : (
            <Button
              type="submit"
              disabled={files[0] == null}
              // onClick={uploadHandle}
              onClick={() =>
                toast.info(
                  "This feature is still in development, kind contact developers for more info."
                )
              }
            >
              upload
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
