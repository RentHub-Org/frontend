import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/utils/nextAuthOptions";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(nextAuthOptions);
  //  // console.log("session:", session);
  if (session == null) {
    return NextResponse.json(
      { error: "undefined session." },
      { status: 400 } // 400 Bad Request
    );
  }
  // now fetching thr database to access the apikeys reltater to the given address..
  const address = session.address.base56;
  //  // console.log("address:", address);
  const userWithApiKeys = (await prisma.user.findUnique({
    where: {
      address: address
    },
    include: {
      apiKeys: true
    }
  })) as any; // type error herer......
   // console.log("userWithApiKeys:", userWithApiKeys);

  const apiKeys = userWithApiKeys?.apiKeys;

  return NextResponse.json({ apiKeys });
}

export async function POST(req: Request) {
  const session = await getServerSession(nextAuthOptions);
   // console.log("session:", session);
  const { tagName } = await req.json();
  if (tagName == null) {
    return NextResponse.json(
      { error: "undefined tagName." },
      { status: 400 } // 400 Bad Request
    );
  }
  if (session == null) {
    return NextResponse.json(
      { error: "undefined session." },
      { status: 400 } // 400 Bad Request
    );
  }
  // creating a new api key for the user...
  const address = session.address.base56;
   // console.log("address:", address);
  const user = (await prisma.user.findUnique({
    where: {
      address: address // The address to filter by
    },
    include: {
      apiKeys: true
    }
  })) as any; // type error herer......
  const previousApiKeys = user.apiKeys;
  if (previousApiKeys.length >= 5) {
    return NextResponse.json(
      { error: "You can not create more than 5 api keys." },
      { status: 400 }
    );
  }
  const apiKey = await prisma.apiKeys.create({
    data: {
      tagName: tagName,
      owner: {
        connect: { address: address }
      }
    }
  });

  return NextResponse.json({ apiKey });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(nextAuthOptions);
   // console.log("session:", session);
  const { key } = await req.json();
  if (key == null) {
    return NextResponse.json(
      { error: "undefined key." },
      { status: 400 } // 400 Bad Request
    );
  }
  if (session == null) {
    return NextResponse.json(
      { error: "undefined session." },
      { status: 400 } // 400 Bad Request
    );
  }
  // creating a new api key for the user...
  const address = session.address.base56;
   // console.log("address:", address);
  const data = (await prisma.apiKeys.delete({
    where: {
      key
    }
  })) as any;
  return NextResponse.json({ data });
}
