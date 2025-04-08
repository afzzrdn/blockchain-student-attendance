"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Link from "next/link";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", nama: "", nim: "", fakultas: "", jurusan: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigation = (url: string) => {
    setRedirectUrl(url);
    setIsExiting(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setRedirectUrl("/login");
      setIsExiting(true);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <motion.div
        initial={{ x: 800 }}
        animate={isExiting ? { x: 800, opacity: 0 } : { x: 0, opacity: 1 }}
        exit={{ x: 800 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={() => {
          if (isExiting && redirectUrl) {
            router.push(redirectUrl);
          }
        }}
        className="bg-white w-3/4 h-screen absolute pl-30 pr-10 right-0 rounded-l-[100px] flex justify-center flex-col"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-10">
          <Input label="Nama" type="text" name="nama" value={formData.nama} onChange={handleChange} />
          <Input label="NIM" type="text" name="nim" value={formData.nim} onChange={handleChange} />
          <Input label="Fakultas" type="text" name="fakultas" value={formData.fakultas} onChange={handleChange} />
          <Input label="Jurusan" type="text" name="jurusan" value={formData.jurusan} onChange={handleChange} />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
          <button type="submit" className="w-full bg-[#a05fb9] text-white py-2 rounded-lg">Register</button>
        </form>
        <button
          onClick={() => handleNavigation("/login")}
          className="mt-5 text-blue-500 cursor-pointer"
        >
          Have Account? Login
        </button>
        {message && <p className="text-red-500 mt-5">{message}</p>}
      </motion.div>
    </div>
  );
};

export default Register;
function setRedirectUrl(url: any) {
  throw new Error("Function not implemented.");
}
