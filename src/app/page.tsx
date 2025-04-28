import { Button } from "@/components/ui/button";
import { APP_LOGO_DARK_URL, APP_TITLE, RELATIVE_PATHS } from "@/lib/constants";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { vetrinoFont } from "./fonts";

export const metadata: Metadata = {
  title: "Landing Page",
};

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-6">
      <Image
        src={APP_LOGO_DARK_URL}
        alt={APP_TITLE}
        title={APP_TITLE}
        height={50}
        width={50}
      />
      <h2 className={`${vetrinoFont.className} text-3xl`}>{APP_TITLE}</h2>
      <Button asChild>
        <Link href={RELATIVE_PATHS.homePage}>Go to Explore</Link>
      </Button>
    </div>
  );
}
