import prisma from "@/lib/prisma";
import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BillsModal from "./components/bill-modal";
import PaymentModal from "./components/payment-modal";

async function getUser() {
  const session = await getServerSession(nextAuthOptions);
  return session;
}

type bills = {
  billId:           String
  txnHash:          String
  payableAmount:    BigInt
  createdFor_email: String
  credits:          BigInt
}

export default async function PaymentGateway() {
  const session = await getUser();
  //now the sessions are present
  if (session == null) {
    redirect("/app");
  }
  const bills: bills[] = await prisma.bills.findMany({
    where: {
      createdFor_email: session.address.base56
    }
  })
  .catch(()=>{
    console.error("error accessing db.");
    return [] as bills[];
  })
   // console.log("bills:", bills);
   // console.log(session.address.base56);
  return (
    <>
      <div>
        <div className="flex-col">
          <div className="text-2xl font-semibold flex justify-between items-center leading-none tracking-tight">
            Payments
            <div className="">
              <BillsModal bills={bills} />
            </div>
          </div>
        </div>
        <PaymentModal address={session.address.base56} />
      </div>
    </>
  );
}