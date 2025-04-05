"use client";
import { useState } from "react";

export default function AbsenPage() {
  const [nim, setNim] = useState("");
  const [kodeKelas, setKodeKelas] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/absen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nim, kodeKelas }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Form Absensi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">NIM</label>
          <input
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Kode Kelas</label>
          <input
            type="text"
            value={kodeKelas}
            onChange={(e) => setKodeKelas(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Memproses..." : "Absen"}
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-sm font-medium text-green-600">{message}</div>
      )}
    </div>
  );
}
