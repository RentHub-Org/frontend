import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NEXT_OPTIONS from "../../../lib/utils/nextAuthOptions";
import DevSection from "./components/devsection";
import RentalSection from "./components/rentalsection";

type SessionPayload = {
  address: {
    base56: string;
    hex: string;
  };
};
type FileField = {
  id: number;
  hash: string;
  name: string;
  sessionId: string;
  size: bigint;
  expires_in_days: number;
  createdBy_email: string;
  rentralStatusId: string;
  updated_on: Date;
  created_on: Date;
  listType: "DEV" | "RENTAL";
};
export type File = {
  hash: string;
  name: string;
  sessionId: string;
  size: bigint;
  expires_in_days: number;
  created_on: Date;
  listType: "DEV" | "RENTAL";
};

export default async function DashBoard() {
  const data: SessionPayload = (await getServerSession(
    NEXT_OPTIONS
  )) as SessionPayload;

  if (data == null) {
    redirect("/app");
  }  const THE_FILES = await prisma.file
    .findMany({
      where: {
        createdBy_email: data.address.base56
      }
    })
    .then((fields: FileField[]) => {
      return fields.map((field: FileField): File => {
        return {
          hash: field.hash,
          name: field.name,
          sessionId: field.sessionId,
          size: field.size,
          expires_in_days: field.expires_in_days,
          listType: field.listType,
          created_on: field.created_on
        };
      });
    });
  const devFiles = THE_FILES.filter((file: File) => file.listType == "DEV");
  const rentalFiles = THE_FILES.filter(
    (file: File) => file.listType == "RENTAL"
  );
  console.log("FILES🥹🥹:", THE_FILES);
  return (
    <Tabs defaultValue="dev">
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-semibold leading-none tracking-tight">
          Uploads
        </p>
        <TabsList className="h-[32px]">
          <TabsTrigger value="dev" className="px-5 h-[25px]">
            Dev
          </TabsTrigger>
          <TabsTrigger value="rental" className="px-5 h-[25px]">
            Rental
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="dev">
        <DevSection files={devFiles} />
      </TabsContent>
      <TabsContent value="rental">
        <RentalSection files={rentalFiles} />
      </TabsContent>
      <div className="absolute bottom-0 w-full h-[40px] border-t-2 p-2 text-sm text-[#575757]">
        Visit{" "}
        <a
          href={process.env.NEXT_PUBLIC_TUTORIALS_LINK}
          className="text-theme-3 underline"
        >
          this link
        </a>{" "}
        to see tutorials on using this interface. And{" "}
        <a
          href={process.env.NEXT_PUBLIC_DOCS_LINK}
          className="text-theme-3 underline"
        >
          docs
        </a>{" "}
        to use telegram and SDK.
      </div>
    </Tabs>
  );
}
