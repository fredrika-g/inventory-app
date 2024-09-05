import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  try {
    let quantity = body.quantity >= 0 ? quantity : body.quantity * -1;

    const item = await prisma.item.create({
      data: {
        name: body.name,
        quantity,
        category: body.category,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
