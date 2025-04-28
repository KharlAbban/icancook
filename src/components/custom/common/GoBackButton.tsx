"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  const handlePreviousPage = () => {
    router.back();
  };

  return <ArrowLeft onClick={handlePreviousPage} />;
}
