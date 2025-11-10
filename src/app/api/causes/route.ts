import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cause from "@/models/cause";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const causes = await Cause.find().sort({ createdAt: -1 });
  return NextResponse.json(causes);
}

export async function POST(req: Request) {
  await verifyToken(req);
  await connectDB();
  const { title, description, image, tag, goal, raise } = await req.json();

  const newCause = await Cause.create({
    title,
    description,
    image,
    tag,
    goal,
    raise,
  });
  return NextResponse.json(newCause, { status: 201 });
}
