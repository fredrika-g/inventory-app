import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GETTING ITEM BY ID

export async function GET(req, options) {
  const itemId = options.params.id;

  try {
    const item = await prisma.item.findUniqueOrThrow({
      where: { id: Number(itemId) },
    });

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(req, options) {
  const itemId = options.params.id;

  try {
    await prisma.item.delete({ where: { id: Number(itemId) } });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 400 });
  }
}
