import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GETTING USER BY ID

export async function GET(req, options) {
  const userId = options.params.id;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: Number(userId) },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
