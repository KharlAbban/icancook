export const dynamic = "force-dynamic";

import { AppHeader, ExploreGrid } from "@/components/custom";
import { sanityClient } from "@/sanity/lib/client";
import { SANITY_FETCH_ALL_RECIPES_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { vetrinoFont } from "../fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RELATIVE_PATHS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Explore Recipes",
};

export default async function ExploreRecipesPage() {
  const recipes = await sanityClient.fetch(SANITY_FETCH_ALL_RECIPES_QUERY);

  if (!recipes || recipes.length < 1)
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
        <h2 className={`${vetrinoFont.className} text-2xl font-medium`}>
          No recipes found
        </h2>
        <Button>
          <Link href={RELATIVE_PATHS.newRecipe}>Add a Recipe</Link>
        </Button>
      </div>
    );
  return (
    <div className="w-full">
      <AppHeader />

      <section className="w-full my-6 px-2 overflow-x-hidden">
        <ExploreGrid recipes={recipes} />
      </section>
    </div>
  );
}
