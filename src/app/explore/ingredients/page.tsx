import { AppHeader, ExploreGrid } from "@/components/custom";
import { sanityClient } from "@/sanity/lib/client";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RELATIVE_PATHS } from "@/lib/constants";
import { vetrinoFont } from "@/app/fonts";
import { SANITY_FETCH_ALL_INGREDIENTS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Explore Ingredients",
};

export default async function ExploreIngredientsPage() {
  const ingredients = await sanityClient.fetch(
    SANITY_FETCH_ALL_INGREDIENTS_QUERY,
  );

  if (!ingredients || ingredients.length < 1)
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
        <h2 className={`${vetrinoFont.className} text-2xl font-medium`}>
          No ingredients found
        </h2>
        <Button>
          <Link href={RELATIVE_PATHS.newIngredient}>Add an Ingredient</Link>
        </Button>
      </div>
    );

  return (
    <div className="w-full">
      <AppHeader recipeRoute={false} />

      <section className="w-full my-6 px-2 overflow-x-hidden">
        <ExploreGrid useStaticText={false} ingredients={ingredients} />
      </section>
    </div>
  );
}
