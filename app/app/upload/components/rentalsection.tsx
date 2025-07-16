// "use client";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table";
// import { ReactNode, useEffect, useState, useRef } from "react";
// import { File } from "../page";
// import RentalModalButton from "./rentalModal";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
// import { CheckCircle, XCircle, Clock, AlertCircle, Server, DollarSign, FileText, History } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// export default function RentalSection({ files }: { files: File[] }) {
//   const [isLargeScreen, setIsLargeScreen] = useState(false);
//   const [isMobileScreen, setIsMobileScreen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [fileDetails, setFileDetails] = useState<any>(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [polling, setPolling] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024);
//       setIsMobileScreen(window.innerWidth < 640);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Poll for file updates if in deploying state
//   useEffect(() => {
//     if (selectedFile && drawerOpen && fileDetails?.rentalStatus === "deploying") {
//       setPolling(true);
//       intervalRef.current = setInterval(async () => {
//         const res = await fetch(`/api/file/${selectedFile.hash}`);
//         const data = await res.json();
//         setFileDetails(data.file);
//         if (data.file && data.file.rentalStatus !== "deploying") {
//           setPolling(false);
//           if (intervalRef.current) clearInterval(intervalRef.current);
//           setDrawerOpen(false);
//           window.location.reload(); // reloads the page when file is updated
//         }
//       }, 2000);
//     } else {
//       setPolling(false);
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     }
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [selectedFile, drawerOpen, fileDetails]);

//   const handleRowClick = async (file: File) => {
//     setSelectedFile(file);
//     setDrawerOpen(true);
//     const res = await fetch(`/api/file/${file.hash}`);
//     const data = await res.json();
//     setFileDetails(data.file);
//   };
// // Enhanced Status Renderer Component
//   const renderStatus = (rentalStatus: any) => {
//     if (!rentalStatus) return <div className="text-gray-400">No status available</div>;

//     const { status, tries } = rentalStatus;
//     const { Status, Message, AdditionalInfo, Shards } = status;

//     // Check if there are any successful tries
//     const hasSuccessfulTry = tries && tries.some((t:any) => t.status === 'success');
    
//     // Get shard information
//     const shardEntries = Shards ? Object.entries(Shards) : [];
//     const activeShards = shardEntries.filter(([, shard]: any) => shard.Status === 'contract');

//     const getStatusColor = (status: string) => {
//       switch (status.toLowerCase()) {
//         case 'success': return 'text-green-400';
//         case 'error': return 'text-red-400';
//         case 'contract': return 'text-blue-400';
//         case 'pending': return 'text-yellow-400';
//         default: return 'text-gray-400';
//       }
//     };

//     const getStatusIcon = (status: string) => {
//       switch (status.toLowerCase()) {
//         case 'success': return '✓';
//         case 'error': return '✗';
//         case 'contract': return '📄';
//         case 'pending': return '⏳';
//         default: return '?';
//       }
//     };
//     const getStatusBg = (status: any) => {
//       switch (status) {
//         case 'success':
//           return 'bg-emerald-500/10 border-emerald-500/20';
//         case 'error':
//           return 'bg-red-500/10 border-red-500/20';
//         case 'pending':
//           return 'bg-amber-500/10 border-amber-500/20';
//         default:
//           return 'bg-gray-500/10 border-gray-500/20';
//       }
//     };

//     return (
//       <div className="max-w-2xl mx-auto p-6 space-y-6">
//         {/* Main Status Card */}
//         <div className={`rounded-xl border backdrop-blur-sm ${getStatusBg(Status)} p-6`}>
//           <div className="flex items-center gap-3">
//             <div className={`${getStatusColor(Status)} flex-shrink-0`}>
//               {getStatusIcon(Status)}
//             </div>
//             <div>
//               <h3 className={`text-xl font-semibold ${getStatusColor(Status)}`}>
//                 {Status.charAt(0).toUpperCase() + Status.slice(1)}
//               </h3>
//               <p className="text-sm text-gray-400 mt-1">
//                 File processing {Status === 'success' ? 'completed successfully' : Status}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {Status === 'error' && Message && (
//           <div className="rounded-xl border bg-red-500/10 border-red-500/20 p-6">
//             <div className="flex items-start gap-3">
//               <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <h4 className="text-red-400 font-medium text-sm">Error Details</h4>
//                 <p className="text-red-300 text-sm mt-2 leading-relaxed">{Message}</p>
//                 {AdditionalInfo && (
//                   <p className="text-red-300/80 text-xs mt-2 leading-relaxed">{AdditionalInfo}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Success Override */}
//         {hasSuccessfulTry && Status === 'error' && (
//           <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/20 p-6">
//             <div className="flex items-start gap-3">
//               <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <h4 className="text-emerald-400 font-medium text-sm">
//                   Recovery Successful
//                 </h4>
//                 <p className="text-emerald-300 text-sm mt-2 leading-relaxed">
//                   The file hash already existed but the operation completed successfully
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Active Contracts */}
//         {activeShards.length > 0 && (
//           <div className="rounded-xl border bg-blue-500/10 border-blue-500/20 p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <Server className="w-5 h-5 text-blue-400" />
//               <h4 className="text-blue-400 font-medium">Active Contracts</h4>
//               <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
//                 {activeShards.length} active
//               </span>
//             </div>
//             <div className="space-y-3">
//               {activeShards.map(([shardKey, shard]: any) => (
//                 <div key={shardKey} className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/10">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
//                     <div>
//                       <div className="text-blue-300/80 text-xs font-medium uppercase tracking-wide">Host</div>
//                       <div className="text-blue-200 mt-1 font-mono">{shard.Host}</div>
//                     </div>
//                     <div>
//                       <div className="text-blue-300/80 text-xs font-medium uppercase tracking-wide">Price</div>
//                       <div className="text-blue-200 mt-1 flex items-center gap-1">
//                         <DollarSign className="w-3 h-3" />
//                         {shard.Price.toLocaleString()}
//                       </div>
//                     </div>
//                     <div>
//                       <div className="text-blue-300/80 text-xs font-medium uppercase tracking-wide">Contract</div>
//                       <div className="text-blue-200 mt-1 font-mono text-xs">
//                         {shard.ContractID.split(',')[0]}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Processing History */}
//         {tries && tries.length > 0 && (
//           <div className="rounded-xl border bg-gray-500/10 border-gray-500/20 p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <History className="w-5 h-5 text-gray-400" />
//               <h4 className="text-gray-400 font-medium">Processing History</h4>
//               <span className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full">
//                 {tries.length} attempts
//               </span>
//             </div>
//             <div className="space-y-3">
//               {tries.map((attempt: any, index: any) => (
//                 <div key={index} className="bg-gray-500/5 rounded-lg p-4 border border-gray-500/10">
//                   <div className="flex items-center gap-3">
//                     <span className={`${getStatusColor(attempt.status)} flex-shrink-0`}>
//                       {getStatusIcon(attempt.status)}
//                     </span>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 text-sm">
//                         <span className="text-gray-300 font-medium">
//                           Attempt {index + 1}
//                         </span>
//                         <span className={`${getStatusColor(attempt.status)} capitalize`}>
//                           {attempt.status}
//                         </span>
//                       </div>
//                       {attempt.data && (
//                         <div className="text-xs text-gray-500 mt-1 font-mono">
//                           ID: {attempt.data.localId?.substring(0, 8)}...
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };






//   const propDril = { isLargeScreen, isMobileScreen };
//   return (
//     <div className="md:px-[40px]">
//       <div className="flex justify-end w-full">
//         <RentalModalButton />
//       </div>
//       <div className="mt-2">
//         <Table>
//           <TableHeader>
//             <TableRow className="border-theme-3  hover:bg-theme-1/0">
//               <TableHead className="w-[30%] hover:bg-theme-1/10">Name</TableHead>
//               {isLargeScreen && <TableHead className="w-[20%] hover:bg-theme-1/10">Hash</TableHead>}
//               <TableHead className="hover:bg-theme-1/10">Pinned-On</TableHead>
//               {!isMobileScreen && (
//                 <TableHead className="text-right hover:bg-theme-1/10">Un-pinning in</TableHead>
//               )}
//               <TableHead className="text-right hover:bg-theme-1/10">Link</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {files && files.length > 0 ? (
//               files.map((file: File, i: number) => (
//                 <FileRow key={i} file={file} screen={propDril} onClick={() => handleRowClick(file)} />
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell className="font-medium">----</TableCell>
//                 {isLargeScreen && <TableCell>#----</TableCell>}
//                 <TableCell>dd/mm/yy</TableCell>
//                 {!isMobileScreen && (
//                   <TableCell className="text-right">Id----</TableCell>
//                 )}
//                 <TableCell className="text-right">
//                   <a rel="stylesheet" href="#">
//                     link
//                   </a>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* Drawer for file details */}
//       <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
//         <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto bg-neutral-900 text-white border-none shadow-2xl">
//           <div className="flex flex-col items-center justify-center min-h-[40vh] py-6">
//             <Card className="w-full max-w-xl bg-neutral-800 text-white border-none shadow-xl">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold tracking-tight">File Details</CardTitle>
//                 <CardDescription className="text-neutral-300">Detailed information about your file</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {fileDetails ? (
//                   <>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <div className="font-semibold text-neutral-200">Name</div>
//                         <div className="text-lg">{fileDetails.name}</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-neutral-200">Hash</div>
//                         <div className="break-all text-lg">{fileDetails.hash}</div>
//                       </div>
//                       <div className="col-span-2">
//                         <div className="font-semibold text-neutral-200 mb-1">Status</div>
//                         {renderStatus(fileDetails.rentalStatus)}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-neutral-200">Session ID</div>
//                         <div className="break-all text-lg">{fileDetails.sessionId || "-"}</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-neutral-200">Created On</div>
//                         <div className="text-lg">{new Date(fileDetails.created_on).toLocaleString()}</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-neutral-200">Updated On</div>
//                         <div className="text-lg">{fileDetails.updated_on ? new Date(fileDetails.updated_on).toLocaleString() : "-"}</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-neutral-200">Expires In</div>
//                         <div className="text-lg">{fileDetails.expires_in_days} days</div>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-neutral-200">Worked By</div>
//                         <div className="break-all text-lg">{fileDetails.workedBy || "-"}</div>
//                       </div>
//                     </div>
//                     {polling && <div className="mt-6 text-yellow-400 text-center animate-pulse">Checking for deployment status...</div>}
//                   </>
//                 ) : (
//                   <div className="flex items-center justify-center h-32">Loading...</div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

// function FileRow({ file, screen, onClick }: { file: File; screen: any; onClick?: () => void }) {
//   function calculateDays() {
//     const creationDate = new Date(file.created_on);
//     const expirationTime =
//       creationDate.getTime() + file.expires_in_days * 24 * 60 * 60 * 1000;
//     const currentDate = new Date();
//     const days = Math.ceil(
//       (expirationTime - currentDate.getTime()) / (1000 * 60 * 60 * 24)
//     );
//     if (days <= 0) {
//       return 0;
//     }
//     return days + " Days";
//   }
//   function customTruncate(hash: string): ReactNode {
//     return (
//       <p className="text-[15px] cursor-pointer">
//         {hash.slice(0, 2)}
//         <span className="text-[12px]">
//           {hash.slice(2, 4)}.....{hash.slice(-7)}
//         </span>
//       </p>
//     );
//   }
//   return (
//     <TableRow onClick={onClick} className="cursor-pointer hover:bg-theme-1/10">
//       <TableCell className="font-medium">{file.name}</TableCell>
//       {screen.isLargeScreen && (
//         <TableCell
//           onClick={e => {
//             e.stopPropagation();
//             navigator.clipboard.writeText(file.hash);
//           }}
//         >
//           {customTruncate(file.hash)}
//         </TableCell>
//       )}
//       <TableCell>{file.created_on.toDateString()}</TableCell>
//       {!screen.isMobileScreen && (
//         <TableCell className="text-right">{calculateDays()}</TableCell>
//       )}
//       <TableCell className="text-right">
//         <a
//           rel="stylesheet"
//           target="_blank"
//           href={"https://gateway.btfs.io/btfs/" + file.hash}
//           onClick={e => e.stopPropagation()}
//         >
//           link
//         </a>
//       </TableCell>
//     </TableRow>
//   );
// }

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ReactNode, useEffect, useState, useRef } from "react";
import { File } from "../page";
import RentalModalButton from "./rentalModal";
import {
  Sheet,
  SheetContent
} from "@/components/ui/sheet";
import {
  CheckCircle,
  XCircle,
  Server,
  DollarSign,
  History
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function RentalSection({ files }: { files: File[] }) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [polling, setPolling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      setIsMobileScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      selectedFile &&
      drawerOpen &&
      fileDetails?.rentalStatus?.status?.Status === "deploying"
    ) {
      setPolling(true);
      intervalRef.current = setInterval(async () => {
        const res = await fetch(`/api/file/${selectedFile.hash}`);
        const data = await res.json();
        const parsedStatus =
          typeof data.file.rentalStatus === "string"
            ? JSON.parse(data.file.rentalStatus)
            : data.file.rentalStatus;
        setFileDetails({ ...data.file, rentalStatus: parsedStatus });
        if (parsedStatus.status?.Status !== "deploying") {
          setPolling(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDrawerOpen(false);
          window.location.reload();
        }
      }, 2000);
    } else {
      setPolling(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedFile, drawerOpen, fileDetails]);

  const handleRowClick = async (file: File) => {
    setSelectedFile(file);
    setDrawerOpen(true);
    const res = await fetch(`/api/file/${file.hash}`);
    if(res.status !== 200) {
      setFileDetails({present: false});
      return;
    }
    const data = await res.json();
    const parsedStatus =
      typeof data.file.rentalStatus === "string"
        ? JSON.parse(data.file.rentalStatus)
        : data.file.rentalStatus;
    setFileDetails({ ...data.file, rentalStatus: parsedStatus , present: true});
  };

  const propDril = { isLargeScreen, isMobileScreen };
  return (
    <div className="md:px-[40px]">
      <div className="flex justify-end w-full">
        <RentalModalButton />
      </div>
      <div className="mt-2">
        <Table>
          <TableHeader>
            <TableRow className="border-theme-3 hover:bg-theme-1/0">
              <TableHead className="w-[30%] hover:bg-theme-1/10">Name</TableHead>
              {isLargeScreen && <TableHead className="w-[20%] hover:bg-theme-1/10">Hash</TableHead>}
              <TableHead className="hover:bg-theme-1/10">Pinned-On</TableHead>
              {!isMobileScreen && <TableHead className="text-right hover:bg-theme-1/10">Un-pinning in</TableHead>}
              <TableHead className="text-right hover:bg-theme-1/10">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files && files.length > 0 ? (
              files.map((file: File, i: number) => (
                <FileRow key={i} file={file} screen={propDril} onClick={() => handleRowClick(file)} />
              ))
            ) : (
              <TableRow>
                <TableCell className="font-medium">----</TableCell>
                {isLargeScreen && <TableCell>#----</TableCell>}
                <TableCell>dd/mm/yy</TableCell>
                {!isMobileScreen && <TableCell className="text-right">Id----</TableCell>}
                <TableCell className="text-right"><a rel="stylesheet" href="#">link</a></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto bg-zinc-950 text-white border-none shadow-2xl"
        >
          <div className="flex flex-col items-center justify-center min-h-[40vh] py-6">
            <Card className="w-full max-w-4xl bg-neutral-900 text-white border border-neutral-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight">File Details</CardTitle>
                <CardDescription className="text-neutral-400">
                  More about your file and its rental process.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(fileDetails && fileDetails.present) ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-neutral-300">Name</div>
                        <div className="text-lg text-neutral-100 break-all">{fileDetails.name}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-300">Hash</div>
                        <div className="text-xs text-neutral-400 break-all">{fileDetails.hash}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-300">Session ID</div>
                        <div className="text-xs text-neutral-400 break-all">{fileDetails.sessionId || "-"}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-300">Created On</div>
                        <div className="text-sm text-neutral-100">{new Date(fileDetails.created_on).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-300">Updated On</div>
                        <div className="text-sm text-neutral-100">{fileDetails.updated_on ? new Date(fileDetails.updated_on).toLocaleString() : "-"}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-300">Expires In</div>
                        <div className="text-sm text-neutral-100">{fileDetails.expires_in_days} days</div>
                      </div>
                      <div className="col-span-full">
                        <div className="font-semibold text-neutral-300">Worked By</div>
                        <div className="text-sm text-neutral-100">{fileDetails.workedBy || "-"}</div>
                      </div>
                      <div className="col-span-full">
                        <div className="font-semibold text-neutral-300">Status</div>
                        <div className="mt-2">
                          {fileDetails.rentalStatus && renderStatus(fileDetails.rentalStatus)}
                        </div>
                      </div>
                    </div>
                    {polling && (
                      <div className="mt-6 text-yellow-400 text-center animate-pulse">
                        Checking for deployment status...
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-32">Loading...</div>
                )}
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function FileRow({ file, screen, onClick }: { file: File; screen: any; onClick?: () => void }) {
  function calculateDays() {
    const creationDate = new Date(file.created_on);
    const expirationTime = creationDate.getTime() + file.expires_in_days * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const days = Math.ceil((expirationTime - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;
    return days + " Days";
  }
  function customTruncate(hash: string): ReactNode {
    return (
      <p className="text-[15px] cursor-pointer">
        {hash.slice(0, 2)}<span className="text-[12px]">{hash.slice(2, 4)}.....{hash.slice(-7)}</span>
      </p>
    );
  }
  return (
    <TableRow onClick={onClick} className="cursor-pointer hover:bg-theme-1/10">
      <TableCell className="font-medium">{file.name}</TableCell>
      {screen.isLargeScreen && (
        <TableCell
          onClick={e => {
            e.stopPropagation();
            navigator.clipboard.writeText(file.hash);
          }}
        >
          {customTruncate(file.hash)}
        </TableCell>
      )}
      <TableCell>{new Date(file.created_on).toDateString()}</TableCell>
      {!screen.isMobileScreen && (
        <TableCell className="text-right">{calculateDays()}</TableCell>
      )}
      <TableCell className="text-right">
        <a
          rel="stylesheet"
          target="_blank"
          href={"https://gateway.btfs.io/btfs/" + file.hash}
          onClick={e => e.stopPropagation()}
        >
          link
        </a>
      </TableCell>
    </TableRow>
  );
}

function renderStatus(rentalStatus: any) {
  if (!rentalStatus) return <div className="text-gray-400">No status available</div>;

  const { status, tries } = rentalStatus;
  const { Status, Message, AdditionalInfo, Shards } = status;
  const activeShards = Object.entries(Shards || {}).filter(([, shard]: any) => shard.Status === "contract");

  return (
    <div className="space-y-6">
      {Status === "error" && (
        <div className="rounded-md border border-red-500 bg-red-500/10 p-4">
          <div className="flex gap-3">
            <XCircle className="text-red-400" />
            <div className="text-sm">
              <div className="font-semibold text-red-300">{Message}</div>
              {AdditionalInfo && <div className="text-red-200 text-xs mt-1">{AdditionalInfo}</div>}
            </div>
          </div>
        </div>
      )}

      {tries?.some((t: any) => t.status === "success") && Status === "error" && (
        <div className="rounded-md border border-green-500 bg-green-500/10 p-4">
          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <div className="text-sm">
              <div className="font-semibold text-green-300">Recovery Successful</div>
              <div className="text-green-200 text-xs mt-1">The file hash already existed but operation completed successfully</div>
            </div>
          </div>
        </div>
      )}

      {activeShards.length > 0 && (
        <div className="rounded-md border border-blue-500 bg-blue-500/5 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Server className="w-4 h-4 text-blue-400" />
            <div className="text-sm font-semibold text-blue-300">Active Contracts</div>
            <span className="ml-auto text-xs text-blue-200 bg-blue-500/20 px-2 py-0.5 rounded-full">
              {activeShards.length} active
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeShards.map(([k, shard]: any) => (
              <div key={k} className="rounded-lg bg-blue-500/10 p-3 space-y-2">
                <div>
                  <div className="text-[10px] uppercase text-blue-300/70">Host</div>
                  <div className="text-xs font-mono break-all text-blue-200">{shard.Host}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-blue-300/70">Price</div>
                  <div className="text-xs font-mono text-blue-200">{shard.Price.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-blue-300/70">Contract</div>
                  <div className="text-xs font-mono break-all text-blue-200">{shard.ContractID.split(',')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tries && tries.length > 0 && (
        <div className="rounded-md border border-neutral-600 bg-neutral-800 p-4">
          <div className="flex items-center gap-3 mb-2">
            <History className="w-4 h-4 text-neutral-400" />
            <div className="text-sm font-semibold text-neutral-300">Processing History</div>
            <span className="ml-auto text-xs text-neutral-400 bg-neutral-600/50 px-2 py-0.5 rounded-full">
              {tries.length} attempts
            </span>
          </div>
          <div className="space-y-2">
            {tries.map((attempt: any, index: number) => (
              <div key={index} className="rounded bg-neutral-700/50 p-2">
                <div className="text-xs font-mono text-neutral-300">#{index + 1} - {attempt.status.toUpperCase()}</div>
                {attempt.data?.localId && (
                  <div className="text-[10px] text-neutral-400">ID: {attempt.data.localId}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
