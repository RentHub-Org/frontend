import prisma from "@/lib/prisma";
import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authenticate } from "../actions/authenticate";
import Chart from "./Chart";

export default async function Usage() {
  const isLoggedIn = await authenticate();
  const session = await getServerSession(nextAuthOptions);
  const userAddr = session?.address?.base56;

  const files = await prisma.user.findUnique
    ({
      where: {
        address: userAddr
      },
      select: {
        rentedFiles: true
      }
    })
    .catch((err) => {
      console.error(err);
    });

  const credits = await prisma.user
    .findUnique({
      where: {
        address: userAddr
      },
    })
    .catch((err) => {
      console.error(err);
    });

  if (!isLoggedIn) {
    redirect("/app");
  }



  return (
    <main>
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Usage
      </h1>
      <section className="p-7">
        {/* boxes */}
        <div className="flex pb-14 max-w-[1100px] flex-grow flex-wrap gap-6 pr-10">
          <Box title="Files Stored" value={Number(files?.rentedFiles?.length) | 0} />
          <Box title="Credits Balance" value={Number(credits?.credits) | 0} />
          {/* <Box title="Credits Purchased" value={1000} /> */}
        </div>
        {/* graph */}
        <div>
          <Chart userAddr={userAddr} />
        </div>
        {/* <div className="flex pt-16 flex-col gap-4">
          <h2 className="text-gray-300">
            Rent Now for Unlimited Storage on BTFS
          </h2>
          <button className="px-8 rounded-md w-[150px] bg-theme-3 text-white">
            Rent
          </button>
        </div> */}
      </section>
    </main>
  );
}

const Box = ({ title, value }: { title: string; value: number }) => {
  return (
    <main className="px-6 flex-grow py-1 text-left w-auto max-w-[70%] rounded-md bg-black/100 border border-gray-600 text-white">
      <p className="text-[1.4rem]  font-semibold text-btfs">{value}</p>
      <h1 className="text-[0.9rem] text-gray-300 font-medium">{title}</h1>
    </main>
  );
};
