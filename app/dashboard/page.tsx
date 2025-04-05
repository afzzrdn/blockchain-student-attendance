"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Sidebar from "../components/Sidebar";
import AbsenForm from "../components/AbsenForm";
import { contractABI, contractAddress } from "@/lib/abi";
import JadwalMingguan from "../components/JadwalMingguan";

const Dashboard = () => {
  const [user, setUser] = useState<{
    email: string;
    nama: string;
    nim: string;
    fakultas: string;
    jurusan: string;
  } | null>(null);
  const [absensi, setAbsensi] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAbsensi = async () => {
      if (!user?.nim) return;

      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        const logs = await contract.getAbsensiLog();

        // Filter hanya data absensi dari user yang sedang login
        const filtered = logs
          .filter((log: any) => log.nim === user.nim)
          .map((log: any) => ({
            nim: log.nim,
            kodeKelas: log.kodeKelas,
            waktu: log.waktu,
          }));

        setAbsensi(filtered);
      } catch (err) {
        console.error("Gagal ambil data absensi:", err);
      }
    };

    if (user) {
      fetchAbsensi();
    }
  }, [user]);

  return (
    <div className="w-full h-full mx-auto p-6 bg-white flex text-black">
      <Sidebar />
      {user ? (
        <div className="mx-5">
          <p><strong>Nama:</strong> {user.nama}</p>
          <p><strong>NIM:</strong> {user.nim}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Fakultas:</strong> {user.fakultas}</p>
          <p><strong>Jurusan:</strong> {user.jurusan}</p>

          <AbsenForm nim={user.nim} />
          <JadwalMingguan />
          
          <h2 className="text-lg font-semibold mt-6 mb-2">Data Absensi:</h2>
          {absensi.length > 0 ? (
            <ul className="list-disc ml-5">
              {absensi.map((item, index) => (
                <li key={index}>
                  <strong>{item.nim}</strong> - {item.kodeKelas} - {new Date(item.waktu).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Belum ada absensi tercatat.</p>
          )}

          <button
            onClick={() => router.push("/logout")}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
