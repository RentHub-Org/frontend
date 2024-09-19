"use client";
import { IconAsterisk } from "@tabler/icons-react";
import DevModalButton from "./devModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ReactNode, useEffect, useState } from "react";
import { File } from "../page";

export default function DevSection({ files }: { files: File[] }) {
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
    <div className="px-[40px]">
      <div className="flex justify-between w-full">
        <div className="flex gap-1 items-center text-[#bab9b9]">
          <IconAsterisk className="text-theme-3" size={10} />
          <span>Upload/pin files to dev-enviourment</span>
        </div>
        <DevModalButton />
      </div>
      <div className="mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Name</TableHead>
              {isLargeScreen && <TableHead className="w-[20%]">Hash</TableHead>}
              <TableHead className="">CreatedOn</TableHead>
              {!isMobileScreen && (
                <TableHead className="text-right">Pin-status</TableHead>
              )}
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files && files.length > 0 ? (
              files.map((file: File) => (
                <FileRow file={file} screen={propDril} />
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
        <TableCell>{customTruncate(file.hash)}</TableCell>
      )}
      <TableCell>{file.created_on.toDateString()}</TableCell>
      {!screen.isMobileScreen && (
        <TableCell className="text-right">{file.sessionId}</TableCell>
      )}
      <TableCell className="text-right">
        <a
          rel="stylesheet"
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_CORE_BASE_URL}/gateway/` + file.hash}
        >
          link
        </a>
      </TableCell>
    </TableRow>
  );
}
