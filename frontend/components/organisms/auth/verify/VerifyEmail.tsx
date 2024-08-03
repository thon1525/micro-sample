import { Button } from "@nextui-org/button";
import React from "react";
type VerifyEmailProp = {
  className?: string;
};
const VerifyEmail: React.FC<VerifyEmailProp> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className="flex bg-black">fddsf</div>
      <div className="flex bg-cyan-900">dfsdfdsf</div>
      <div className="flex">
        <Button>click me</Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
