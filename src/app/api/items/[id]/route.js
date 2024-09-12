import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { validateItem } from "@/utils/helpers/apiHelpers";

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

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 400 });
  }
}

export async function PUT(req, options) {
  const itemId = options.params.id;

  const data = await req.json();

  try {
    const { hasErrors, errors } = validateItem(data);

    if (hasErrors) {
      throw new Error(JSON.stringify(errors));
    }
  } catch (error) {
    const errorMessage = JSON.parse(error.message);
    let errorArr = [];
    for (const [key, value] of Object.entries(errorMessage)) {
      errorArr.push(value);
    }

    errorArr = errorArr.join();
    return NextResponse.json({ error: errorArr }, { status: 400 });
  }

  try {
    const updatedItem = await prisma.item.update({
      where: { id: Number(itemId) },
      data: {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        category: data.category,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error.message, { status: 400 });
  }
}
