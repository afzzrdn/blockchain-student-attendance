// components/JadwalMingguan.tsx
"use client";

import { useEffect, useState } from "react";

type JadwalItem = {
  id: number;
  kode: string;
  nama: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
};

const hariUrut = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const JadwalMingguan = () => {
  const [jadwal, setJadwal] = useState<JadwalItem[]>([]);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const res = await fetch("/api/jadwal");
        const data = await res.json();
        // Urutkan berdasarkan hari
        const sorted = data.sort((a: JadwalItem, b: JadwalItem) => {
          return hariUrut.indexOf(a.hari) - hariUrut.indexOf(b.hari);
        });
        setJadwal(sorted);
      } catch (err) {
        console.error("Gagal memuat jadwal:", err);
      }
    };

    fetchJadwal();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Jadwal Mingguan</h2>
      {jadwal.length === 0 ? (
        <p className="text-gray-500">Tidak ada jadwal ditemukan.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {jadwal.map((item) => (
            <li key={item.id} className="flex justify-between">
              <div className="font-medium">{item.nama} ({item.kode})</div>
              <div>{item.hari}, {item.jamMulai} - {item.jamSelesai}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JadwalMingguan;
