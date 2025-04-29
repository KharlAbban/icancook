import { Button } from "@/components/ui/button";
import { APP_TAGLINE, APP_TITLE, RELATIVE_PATHS } from "@/lib/constants";
import { Metadata } from "next";
import Link from "next/link";
import { vetrinoFont } from "./fonts";
import { DynamicLogo } from "@/components/custom";
import { IceCreamBowl, Vegan } from "lucide-react";

export const metadata: Metadata = {
  title: "Landing Page",
};

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-6">
      <DynamicLogo height={40} width={40} />
      <h2 className={`${vetrinoFont.className} text-3xl`}>{APP_TITLE}</h2>
      <p className="text-sm">{APP_TAGLINE}</p>
      <Button asChild>
        <Link href={RELATIVE_PATHS.homePage}>
          Explore Recipes <IceCreamBowl />
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href={RELATIVE_PATHS.ingredients}>
          See Ingredients <Vegan />
        </Link>
      </Button>
    </div>
  );
}
