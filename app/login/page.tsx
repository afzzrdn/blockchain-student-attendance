"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Tambahkan loading state
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // Reset pesan error saat user mengetik ulang
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Penting agar cookies dikirim
      body: JSON.stringify(formData),
    });
  
    const data = await res.json();
    console.log("Response:", data);
  
    if (res.ok) {
      console.log("Login berhasil! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 100); // Tambahkan delay 100ms
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
          disabled={loading} // Disable tombol saat loading
        >
          {loading ? "Logging in..." : "Login"} 
        </button>
      </form>
    </div>
  );
};

export default Login;
