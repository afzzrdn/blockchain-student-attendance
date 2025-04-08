"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleClick = () => {
    router.push('/login')
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Hitung posisi berdasarkan kursor
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 30;
    const y = (clientY / window.innerHeight - 0.5) * 30;
    setPosition({ x, y });

    // Reset timeout setiap mouse bergerak
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Atur timeout untuk mengembalikan ke posisi awal setelah 1 detik
    timeoutRef.current = setTimeout(() => {
      setPosition({ x: 0, y: 0 });
    }, 100);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center p-5 overflow-hidden relative "
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col ml-20 z-10">
        <h1 className="text-4xl font-bold text-gray-500">Present--Chain</h1>
        <button className="bg-[#a05fb9] px-3 py-1 w-[100px] text-white font-bold rounded-lg cursor-pointer" onClick={handleClick}>
          Login
        </button>
      </div>

      <div
        className="absolute transition-transform duration-500 ease-out pointer-events-none -right-40"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <Image
          src="/images/blockchain.png"
          alt="blockchain"
          width={1100}
          height={400}
        />
      </div>
    </div>
  );
}
