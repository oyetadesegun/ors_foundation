import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cause from "@/models/cause";
import { verifyToken } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  const cause = await Cause.findById(id);
  if (!cause)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(cause);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await verifyToken(req);
  await connectDB();

  const { id } = await params;
  const data = await req.json();
  const updated = await Cause.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await verifyToken(req);
  await connectDB();
  const { id } = await params;
  await Cause.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted successfully" });
}
