"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { s3 } from "@/lib/utils";
import {
  ListObjectsV2Command
} from "@aws-sdk/client-s3";
import { IconAsterisk } from "@tabler/icons-react";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import S3Modal from "../upload/components/s3Modal";

const FilesTable = ({ bucketName }: { bucketName: string }) => {
  const [files, setFiles] = useState<any[] | []>([]);

  // async function listAllObjects(bucketName: string) {
  //   const command = new ListObjectsV2Command({
  //     Bucket: bucketName
  //   });

  //   try {
  //     let isTruncate: any = true;
  //     let contents: any[] = [];

  //     while (isTruncate) {
  //       const { Contents, IsTruncated, NextContinuationToken } = await s3.send(
  //         command
  //       );

  //       contents = contents.concat(Contents);

  //       setFiles(contents);
  //       console.log(Contents);
  //       isTruncate = IsTruncated;
  //       command.input.ContinuationToken = NextContinuationToken;
  //     }

  //     return contents;
  //   } catch (error) {
  //     console.error("Error listing objects:", error);
  //     throw error;
  //   }
  // }

  // useEffect(() => {
  //   listAllObjects(bucketName);
  // }, []);

  return (
    <section className="md:px-[40px]">
      <div className="flex justify-between w-full">
        <div className="flex gap-1 items-center text-[#bab9b9]">
          <IconAsterisk className="text-theme-3" size={10} />
          <span>Rent btfs node to upload your data on btfs.</span>
        </div>
        <S3Modal />
      </div>
      <div className="mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Name</TableHead>
              <TableHead className="w-[30%]">Size</TableHead>
              <TableHead className="w-[20%]">Cid</TableHead>
              <TableHead className="">Uploaded on</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files && files.length > 0 ? (
              files.map((file: File, i: number) => (
                <FileRow key={i} file={file} bucketName={bucketName} />
              ))
            ) : (
              <TableRow>
                <TableCell className="font-medium">----</TableCell>
                <TableCell>---</TableCell>
                <TableCell>#----</TableCell>
                <TableCell>dd/mm/yy</TableCell>
                {/* <TableCell className="text-right">Id----</TableCell> */}
                <TableCell className="text-right">
                  <a rel="stylesheet" href="#">
                    link
                  </a>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default FilesTable;

function FileRow({ file, bucketName }: { file: any; bucketName: string }) {
  function calculateDays() {
    const creationDate = new Date(file?.lastModified);
    console.log(creationDate.getTime());
  }
  function customTruncate(hash: string): React.ReactNode {
    return (
      <p className="text-[15px] cursor-pointer">
        {hash.slice(1, 2)}
        <span className="text-[12px]">
          {hash.slice(2, 5)}.....{hash.slice(-5, -1)}
        </span>
      </p>
    );
  }

  if (file == null) {
    return null;
  }

  // async function downloadFile(key: string) {
  //   const command = new GetObjectCommand({
  //     Bucket: bucketName,
  //     Key: key
  //   });

  //   try {
  //     const response = (await s3.send(command)) as any;
  //     await pipeline(response?.Body, createWriteStream("./" + key));
  //     console.log(`File downloaded successfully: ${"./" + key}`);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //     throw error;
  //   }
  // }

  return (
    <TableRow>
      <TableCell className="font-medium">{file.Key}</TableCell>
      <TableCell>{file?.Size / 1024 + " KB"}</TableCell>
      <TableCell
      // onClick={() => {
      //   navigator.clipboard.writeText(file.hash);
      // }}
      >
        {customTruncate(file.ETag)}
      </TableCell>
      <TableCell>{file?.LastModified?.toDateString()}</TableCell>
      <TableCell className="text-right">
        <button
          className="flex hover:text-blue-700"
          // onClick={downloadFile(file.Key)}
        >
          Download <Download className="ml-2 font-small" size={16} />
        </button>
      </TableCell>
    </TableRow>
  );
}
