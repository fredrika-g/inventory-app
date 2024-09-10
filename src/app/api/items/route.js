import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import { validateItem } from "@/utils/helpers/apiHelpers";

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
      throw new Error(JSON.stringify(errors));
    }
  } catch (error) {
    const errorMessage = JSON.parse(error.message);
    console.log(errorMessage);
    let errorArr = [];
    for (const [key, value] of Object.entries(errorMessage)) {
      errorArr.push(value);
    }

    errorArr = errorArr.join();
    return NextResponse.json({ error: errorArr }, { status: 400 });
  }

  try {
    let quantity =
      Number(body.quantity) >= 0
        ? Number(body.quantity)
        : Number(body.quantity) * -1;

    const item = await prisma.item.create({
      data: {
        name: body.name,
        description: body.description ? body.description : "",
        quantity,
        category: body.category,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
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
