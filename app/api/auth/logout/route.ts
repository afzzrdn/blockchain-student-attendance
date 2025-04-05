import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logout berhasil" }, { status: 200 });
    response.cookies.set("token", "", { expires: new Date(0), path: "/", httpOnly: true });
    
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
