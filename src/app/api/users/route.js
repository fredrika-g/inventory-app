import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import { validateUser } from "@/utils/helpers/apiHelpers";

const prisma = new PrismaClient();

// CREATING NEW USER

export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    const { hasErrors, errors } = validateUser(body);

    if (hasErrors) {
      return NextResponse.json(errors);
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}

// GETTING USER

export async function GET(req, options) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
