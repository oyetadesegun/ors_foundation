import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/contact";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await verifyToken(req);
    await connectDB();
    const { id } = await params;
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ message: "Message deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message." },
      { status: 500 }
    );
  }
}
