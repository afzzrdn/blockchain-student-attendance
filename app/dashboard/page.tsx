"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import AbsenForm from "../components/AbsenForm";
import { contractABI, contractAddress } from "@/lib/abi";
import JadwalMingguan from "../components/JadwalMingguan";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [showPreload, setShowPreload] = useState(true);
  const [user, setUser] = useState<{
    email: string;
    nama: string;
    nim: string;
    fakultas: string;
    jurusan: string;
  } | null>(null);
  const [absensi, setAbsensi] = useState<any[]>([]);
  const router = useRouter();

  // Preload 1.5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreload(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Ambil data user
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

  // Ambil data absensi dari blockchain
  useEffect(() => {
    const fetchAbsensi = async () => {
      if (!user?.nim) return;

      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        const logs = await contract.getAbsensiLog();

        const filtered = logs
          .filter((log: any) => log.nim === user.nim)
          .map((log: any) => ({
            nim: log.nim,
            kodeKelas: log.kodeKelas,
            nama: log.nama,
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
    <>
      {showPreload ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-screen flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#a05fb9] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-[#a05fb9] font-medium">Loading dashboard...</p>
          </div>
        </motion.div>
      ) : (
        <div className="min-h-screen bg-[#f4f5fa] text-gray-800 grid grid-cols-2 p-6 gap-6">
          <div>
            {user ? (
              <div className="flex-1 space-y-6">
                {/* Profil Card */}
                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 relative">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-indigo-600">
                    {user.nama[0]}
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{user.nama}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm">{user.nim}</p>
                    <p className="text-sm">{user.fakultas} - {user.jurusan}</p>
                  </div>
                  <button
                    onClick={() => router.push("/logout")}
                    className="mt-4 bg-[#a05fb9] text-white text-sm py-2 px-6 rounded-xl right-10 absolute cursor-pointer"
                  >
                    Logout
                  </button>
                </div>

                {/* Statistik */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r h-[100px] from-purple-500 to-indigo-500 text-white rounded-2xl p-4 shadow">
                    <p className="text-sm">Total Kehadiran</p>
                    <p className="text-4xl font-bold mt-3">{absensi.length}</p>
                  </div>
                  <div className="bg-gradient-to-r h-[100px] from-cyan-500 to-blue-500 text-white rounded-2xl p-4 shadow">
                    <p className="text-sm">Jumlah Mata Kuliah</p>
                    <p className="text-4xl font-bold mt-3">2</p>
                  </div>
                </div>

                <AbsenForm nim={user.nim} />
              </div>
            ) : (
              <p>Loading user...</p>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <JadwalMingguan />
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Data Absensi</h2>
              {absensi.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {absensi.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="font-medium">{item.kodeKelas}</span>
                      <span className="font-medium">{item.nama}</span>
                      <span className="text-gray-600">{new Date(item.waktu).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">Belum ada absensi tercatat.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
