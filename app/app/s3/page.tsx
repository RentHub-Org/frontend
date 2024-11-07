"use client";

// pages/btfsStorage.js
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { IconAsterisk } from "@tabler/icons-react";
import {
  PutObjectCommand,
  S3Client,
  S3ServiceException
} from "@aws-sdk/client-s3";
import S3Modal from "../upload/components/s3Modal";

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

export default function BtfsStorage() {
  const [files, setFiles] = useState<File[] | []>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any>("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      setIsMobileScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //   const retrieveFile = async (fileName: string) => {
  //     setLoading(true);
  //     const params = {
  //       Bucket: bucketName,
  //       Key: fileName
  //     };

  //     try {
  //       const data = await s3.getObject(params).promise();
  //       const fileUrl = URL.createObjectURL(new Blob([data.Body as any]));
  //       setUploadedFileUrl(fileUrl);
  //       alert("File retrieved successfully!");
  //     } catch (error) {
  //       console.error("Error retrieving file:", error);
  //       alert("Failed to retrieve file.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const propDril = { isLargeScreen, isMobileScreen };

  return (
    <main className="flex flex-col space-y-4 min-h-screen text-white">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        S3 Storage
      </h1>

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
                {isLargeScreen && (
                  <TableHead className="w-[20%]">Cid</TableHead>
                )}
                <TableHead className="">Uploaded on</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files && files.length > 0 ? (
                files.map((file: File, i: number) => (
                  <FileRow key={i} file={file} screen={propDril} />
                ))
              ) : (
                <TableRow>
                  <TableCell className="font-medium">----</TableCell>
                  {isLargeScreen && <TableCell>#----</TableCell>}
                  <TableCell>dd/mm/yy</TableCell>
                  {!isMobileScreen && (
                    <TableCell className="text-right">Id----</TableCell>
                  )}
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
    </main>
  );
}

function FileRow({ file, screen }: { file: any; screen: any }) {
  function calculateDays() {
    const creationDate = new Date(file?.lastModified);
    console.log(creationDate.getTime());
  }
  function customTruncate(hash: string): React.ReactNode {
    return (
      <p className="text-[15px] cursor-pointer">
        {hash.slice(0, 2)}
        <span className="text-[12px]">
          {hash.slice(2, 4)}.....{hash.slice(-7)}
        </span>
      </p>
    );
  }

  if (file == null) {
    return null;
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{file.name}</TableCell>
      {screen.isLargeScreen && (
        <TableCell
        // onClick={() => {
        //   navigator.clipboard.writeText(file.hash);
        // }}
        >
          {customTruncate(file.hash)}
        </TableCell>
      )}
      <TableCell>{file?.created_on?.toDateString()}</TableCell>
      <TableCell className="text-right">
        <a
          rel="stylesheet"
          target="_blank"
          href={"https://gateway.btfs.io/btfs/" + file.hash}
        >
          link
        </a>
      </TableCell>
    </TableRow>
  );
}
