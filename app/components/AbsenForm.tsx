"use client";
import { useState } from "react";

type AbsenFormProps = {
  nim: string;
};

const AbsenForm = ({ nim }: AbsenFormProps) => {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim, kodeKelas }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Terjadi kesalahan saat mengirim absensi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label className="block font-medium">Kode Kelas:</label>
        <input
          className="border border-gray-300 px-3 py-2 rounded w-full"
          type="text"
          value={kodeKelas}
          onChange={(e) => setKodeKelas(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Mengirim..." : "Absen"}
      </button>

      {message && (
        <p className="text-sm mt-2 text-green-600 font-semibold">{message}</p>
      )}
    </form>
  );
};

export default AbsenForm;
