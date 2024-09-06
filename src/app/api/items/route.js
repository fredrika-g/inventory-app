import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import { validateUser, validateItem } from "@/utils/helpers/apiHelpers";

const prisma = new PrismaClient();

// CREATING NEW ITEM

export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    const { hasErrors, errors } = validateItem(body);

    if (hasErrors) {
      return NextResponse.json(errors);
    }
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

// GETTING ITEMS

export async function GET(req, options) {
  try {
    const items = await prisma.item.findMany();

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
