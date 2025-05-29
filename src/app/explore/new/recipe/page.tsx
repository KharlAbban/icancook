import { AppHeader, NewRecipeForm } from "@/components/custom";
import { sanityClient } from "@/sanity/lib/client";
import { SANITY_FETCH_ALL_INGREDIENTS_QUERY } from "@/sanity/lib/queries";
import { IceCreamBowl } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Recipe",
};

export default async function NewRecipePage() {
  const allIngredients = await sanityClient.fetch(
    SANITY_FETCH_ALL_INGREDIENTS_QUERY,
  );

  if (!allIngredients || allIngredients.length < 1) {
    return "No ingredients available. Please add ingredients first.";
  }

  return (
    <div className="w-full">
      <AppHeader showSearch={false} showAdd={false} />

      <section className="w-full px-2 overflow-x-hidden">
        <h2 className="text-lg text-gray-800 mb-4 dark:text-gray-300 font-medium flex items-center gap-1 justify-center">
          Add New Recipe <IceCreamBowl />
        </h2>

        <NewRecipeForm allIngredients={allIngredients} />
      </section>
    </div>
  );
}
