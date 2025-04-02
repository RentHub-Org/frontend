"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ReactNode, useEffect, useState } from "react";
import { File } from "../page";
import RentalModalButton from "./rentalModal";

export default function RentalSection({ files }: { files: File[] }) {
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
  const propDril = { isLargeScreen, isMobileScreen };
  return (
    <div className="md:px-[40px]">
      <div className="flex justify-end w-full">
        
        <RentalModalButton />
      </div>
      <div className="mt-2">
        <Table>
          <TableHeader>
            <TableRow className="border-theme-3  hover:bg-theme-1/0">
              <TableHead className="w-[30%] hover:bg-theme-1/10">Name</TableHead>
              {isLargeScreen && <TableHead className="w-[20%] hover:bg-theme-1/10">Hash</TableHead>}
              <TableHead className="hover:bg-theme-1/10">Pinned-On</TableHead>
              {!isMobileScreen && (
                <TableHead className="text-right hover:bg-theme-1/10">Un-pinning in</TableHead>
              )}
              <TableHead className="text-right hover:bg-theme-1/10">Link</TableHead>
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
    </div>
  );
}

function FileRow({ file, screen }: { file: File; screen: any }) {
  function calculateDays() {
    const creationDate = new Date(file.created_on);
    console.log(creationDate.getTime());
    const expirationTime =
      creationDate.getTime() + file.expires_in_days * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    console.log(currentDate, creationDate);
    const days = Math.ceil(
      (expirationTime - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days <= 0) {
      return 0;
    }
    return days + " Days";
  }
  function customTruncate(hash: string): ReactNode {
    return (
      <p className="text-[15px] cursor-pointer">
        {hash.slice(0, 2)}
        <span className="text-[12px]">
          {hash.slice(2, 4)}.....{hash.slice(-7)}
        </span>
      </p>
    );
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{file.name}</TableCell>
      {screen.isLargeScreen && (
        <TableCell
          onClick={() => {
            navigator.clipboard.writeText(file.hash);
          }}
        >
          {customTruncate(file.hash)}
        </TableCell>
      )}
      <TableCell>{file.created_on.toDateString()}</TableCell>
      {!screen.isMobileScreen && (
        <TableCell className="text-right">{calculateDays()}</TableCell>
      )}
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
