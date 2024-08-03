"use client";
import { VerifyToken } from "@/components";
import React, { Suspense } from "react";


const Page = () => {
  return (
    <div className="flex justify-center">
      <VerifyToken />
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading.....</div>}>
    <Page />
  </Suspense>
);

export default SuspenseWrapper;
