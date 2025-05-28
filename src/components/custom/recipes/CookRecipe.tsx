"use client";

import { SANITY_GET_RECIPE_BY_ID_QUERYResult } from "@/sanity/types";
import { notFound } from "next/navigation";

interface CookRecipeProps {
  recipe: SANITY_GET_RECIPE_BY_ID_QUERYResult;
}

export default function CookRecipe({ recipe }: CookRecipeProps) {
  if (!recipe || !recipe.recipeImages || recipe.recipeImages?.length < 1)
    return notFound();

  return (
    <>
      <div className="w-full h-[20vh] border-b">
        <p>Cooking this recipe</p>
      </div>
    </>
  );
}
