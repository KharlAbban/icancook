import { AppHeader, ExploreGrid } from "@/components/custom";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Recipes",
};

export default function ExplorePage() {
  return (
    <div className="w-full">
      <AppHeader />

      <section className="w-full my-4 px-2 overflow-x-hidden">
        <ExploreGrid />
      </section>
    </div>
  );
}
