import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = verifyJWT(token);
  if (!decoded)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  return NextResponse.json({ user: decoded });
}
