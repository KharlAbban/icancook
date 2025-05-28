"use client";

import { vetrinoFont } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { APP_TITLE, RELATIVE_PATHS } from "@/lib/constants";
import { SANITY_GET_RECIPE_BY_ID_QUERYResult } from "@/sanity/types";
import { notFound } from "next/navigation";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiCookingPotLight } from "react-icons/pi";
import ImageSlider from "../common/ImageSlider";
import { Trash } from "lucide-react";
import RecipeIngredients from "./RecipeIngredients";
import { useState } from "react";
import Link from "next/link";

interface RecipeDetailsProps {
  recipe: SANITY_GET_RECIPE_BY_ID_QUERYResult;
}

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const [showIngr, setShowIngr] = useState<boolean>(false);
  if (!recipe || !recipe.recipeImages || recipe.recipeImages?.length < 1)
    return notFound();

  return (
    <>
      <ImageSlider
        images={recipe.recipeImages}
        altText={recipe.name || APP_TITLE}
      />
      <Sheet defaultOpen>
        <div className="shrink-0 p-4">
          <p className="text-gray-500 mb-2 text-xs flex items-center justify-between w-full gap-6">
            Recipe
            <Trash className="h-5 w-5 text-red-600" />
          </p>
          <h2 className={`text-2xl font-medium ${vetrinoFont.className} mb-2`}>
            {recipe.name}
          </h2>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-xl w-full py-6">
              Recipe Brief
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent
          addOverlay={false}
          useClose={false}
          className="px-4 pt-10 pb-6 rounded-t-4xl max-h-[90vh]"
          side="bottom"
        >
          <div className="flex justify-between items-end">
            <h2 className={`${vetrinoFont.className} text-2xl`}>
              {recipe.name}
            </h2>
            <div className="flex flex-col shrink-0 min-w-1/3 items-end">
              <p className="text-xs text-gray-500">Cook time</p>
              <h3 className="font-bold text-xl">{recipe.cookTime}</h3>
            </div>
          </div>
          <p className="text-gray-600">{recipe.recipeType}</p>
          <div className="transition-all duration-300 w-full overflow-y-auto">
            <p className="transition-all duration-200">{recipe.description}</p>
          </div>
          {showIngr && <RecipeIngredients ingredients={recipe.ingredients} />}
          <div className="flex items-center justify-between w-full overflow-x-hidden">
            <Button
              onClick={() => setShowIngr(!showIngr)}
              variant="outline"
              size="lg"
              className="rounded-full outline-0"
            >
              <HiOutlineShoppingBag size={20} />
              {showIngr ? "Hide Ingredients" : "See Ingredients"}
            </Button>
            <Button asChild size="lg" className="rounded-full truncate">
              <Link href={`${RELATIVE_PATHS.recipes}/${recipe._id}/cooking`}>
                <PiCookingPotLight size={20} />
                Start Cooking
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
