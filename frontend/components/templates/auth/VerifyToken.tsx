"use client";
import { VerifyEmail } from "@/components";
import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
const VerifyToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      verifyEmail();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const verifyEmail = async () => {
    try {
      await axios.get(`${apiUrl}/v1/auth/verify?token=${token}`, {
        withCredentials: true,
      });
      router.push("/teachers");
    } catch (error) {}
  };
  return (
    <div className="grid grid-cols-[200px_300px]">
      {token}
      <VerifyEmail className="grid grid-rows-[200px_300px]" />
    </div>
  );
};

export default VerifyToken;
