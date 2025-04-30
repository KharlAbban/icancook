"use client";

import { vetrinoFont } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { APP_TITLE } from "@/lib/constants";
import { SANITY_GET_RECIPE_BY_ID_QUERYResult } from "@/sanity/types";
import { notFound } from "next/navigation";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiCookingPotLight } from "react-icons/pi";
import ImageSlider from "../common/ImageSlider";

interface RecipeDetailsProps {
  recipe: SANITY_GET_RECIPE_BY_ID_QUERYResult;
}

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  if (!recipe || !recipe.recipeImages || recipe.recipeImages?.length < 1)
    return notFound();

  return (
    <>
      <ImageSlider
        images={recipe.recipeImages}
        altText={recipe.name || APP_TITLE}
      />
      <Sheet defaultOpen>
        <div className="max-h-[10vh] shrink-0 p-4">
          <p className="text-gray-500 text-xs">Recipe</p>
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
          className="px-4 pt-10 pb-6 rounded-t-4xl max-h-[90vh]"
          side="bottom"
        >
          <h2 className={`${vetrinoFont.className} text-2xl`}>{recipe.name}</h2>
          <p className="text-gray-600 mb-4">{recipe.recipeType}</p>
          <div className="transition-all duration-300 w-full overflow-y-auto">
            <p className="transition-all duration-200">{recipe.description}</p>
          </div>
          <div className="flex items-center justify-between w-full overflow-hidden">
            <Button
              onClick={() => {}}
              variant="outline"
              className="rounded-full outline-0"
            >
              <HiOutlineShoppingBag size={20} />
              See Ingredients
            </Button>
            <Button onClick={() => {}} className="rounded-full truncate">
              <PiCookingPotLight size={20} />
              Start Cooking
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
