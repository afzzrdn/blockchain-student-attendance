"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/logout", {
      method: "POST", // <- penting!
    }).then(() => {
      router.push("/login");
    });
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
