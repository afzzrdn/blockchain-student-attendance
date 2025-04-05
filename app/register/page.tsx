"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", nama: "", nim: "", fakultas: "", jurusan: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Nama" type="text" name="nama" value={formData.nama} onChange={handleChange} />
        <Input label="NIM" type="text" name="nim" value={formData.nim} onChange={handleChange} />
        <Input label="Fakultas" type="text" name="fakultas" value={formData.fakultas} onChange={handleChange} />
        <Input label="Jurusan" type="text" name="jurusan" value={formData.jurusan} onChange={handleChange} />
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Register</button>
      </form>
    </div>
  );
};

export default Register;
