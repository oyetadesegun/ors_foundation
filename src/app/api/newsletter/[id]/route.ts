import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Newsletter from "@/models/newsletter";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyToken(req);
    await connectDB();
    const { id } = await params;
    await Newsletter.findByIdAndDelete(id);
    return NextResponse.json({ message: "Subscriber removed successfully." });
  } catch (error: any) {
    console.error("Error removing subscriber:", error);
    return NextResponse.json(
      { error: "Failed to remove subscriber." },
      { status: 500 }
    );
  }
}
