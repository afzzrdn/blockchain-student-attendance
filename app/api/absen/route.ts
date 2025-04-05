// app/api/absensi/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAbsensi } from "@/lib/blockchain";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nim, kodeKelas } = body;

    // Validasi mahasiswa & kelas
    const user = await prisma.user.findUnique({
      where: { nim },
    });

    const kelas = await prisma.kelas.findUnique({
      where: { kode: kodeKelas },
    });

    if (!user || !kelas) {
      return NextResponse.json(
        { message: "Mahasiswa atau kelas tidak ditemukan" },
        { status: 404 }
      );
    }

    // Simpan ke database lokal (MySQL via Prisma)
    const absen = await prisma.absensi.create({
      data: {
        mahasiswaId: user.id,
        kelasId: kelas.id,
      },
    });

    // Simpan ke Blockchain
    await logAbsensi(nim, kodeKelas, new Date().toISOString());

    return NextResponse.json({ message: "Absensi berhasil" });
  } catch (error: any) {
    console.error("Gagal absen:", error.message || error);
    return NextResponse.json({ message: "Terjadi kesalahan saat absen" }, { status: 500 });
  }
}
