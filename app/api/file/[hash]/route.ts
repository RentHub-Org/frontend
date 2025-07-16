import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { hash: string } }) {
  const { hash } = params;
  if (!hash) {
    return NextResponse.json({ error: "Missing file hash." }, { status: 400 });
  }
  try {
    const file = await prisma.file.findFirst({
      where: { hash },
    });
    if (!file) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }
    return NextResponse.json({ file });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
} 