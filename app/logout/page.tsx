"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Logout = () => {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    fetch("/api/auth/logout", {
      method: "POST",
    }).then(() => {
      setIsExiting(true);
    });
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={isExiting ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={() => {
          if (isExiting) router.push("/login");
        }}
        className="flex flex-col items-center"
      >
        {/* Custom spinner */}
        <div className="w-12 h-12 border-4 border-[#a05fb9] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-[#a05fb9] font-medium">Logging out...</p>
      </motion.div>
    </div>
  );
};

export default Logout;
