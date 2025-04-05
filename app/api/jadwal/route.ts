// app/api/jadwal/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const jadwal = await prisma.kelas.findMany();
    return NextResponse.json(jadwal);
  } catch (error) {
    console.error("Gagal ambil jadwal:", error);
    return NextResponse.json({ message: "Gagal mengambil data jadwal" }, { status: 500 });
  }
}
