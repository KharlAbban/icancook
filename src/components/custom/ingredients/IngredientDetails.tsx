"use client";

import { vetrinoFont } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { APP_TITLE } from "@/lib/constants";
import { SANITY_GET_INGREDIENT_BY_ID_QUERYResult } from "@/sanity/types";
import { notFound } from "next/navigation";
import { useState } from "react";
import { RiFileList3Line } from "react-icons/ri";
import ImageSlider from "../common/ImageSlider";

interface IngredientDetailsProps {
  ingredient: SANITY_GET_INGREDIENT_BY_ID_QUERYResult;
}

export default function IngredientDetails({
  ingredient,
}: IngredientDetailsProps) {
  const [readMore, setReadMore] = useState<boolean>(false);

  if (
    !ingredient ||
    !ingredient.ingredientImages ||
    ingredient.ingredientImages?.length < 1
  )
    return notFound();

  return (
    <div className="w-full absolute h-full top-0">
      <ImageSlider
        images={ingredient.ingredientImages}
        altText={ingredient.name || APP_TITLE}
      />
      <Sheet defaultOpen>
        <div className="max-h-[10vh] shrink-0 p-4">
          <p className="text-gray-500 text-sm">Ingredient</p>
          <h2 className={`text-3xl font-medium ${vetrinoFont.className} mb-2`}>
            {ingredient.name}
          </h2>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-xl w-full py-6">
              Ingredient Info
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent
          addOverlay={false}
          className="px-4 pt-10 pb-6 rounded-t-4xl max-h-[90vh] min-h-[34vh]"
          side="bottom"
        >
          <h2 className={`${vetrinoFont.className} text-2xl`}>
            {ingredient.name}
          </h2>
          <p className="text-gray-600 mb-4">Ingredient</p>
          <div className="transition-all duration-300 w-full overflow-y-auto">
            {readMore ? (
              <p className="transition-all duration-200 wrap-break-word">
                {ingredient.description}
              </p>
            ) : (
              <p className="transition-all duration-200 wrap-break-word">
                {ingredient.description && ingredient.description.length > 200
                  ? `${ingredient.description.slice(0, 200)}...`
                  : ingredient.description}
              </p>
            )}
          </div>
          {ingredient.description && ingredient.description.length > 200 && (
            <Button
              onClick={() => setReadMore((prevRead) => !prevRead)}
              size="lg"
              className="rounded-full w-max py-6 ml-auto outline-0 border-0"
            >
              <div className="flex items-center justify-center gap-2 w-full px-4">
                <RiFileList3Line size={20} />
                {readMore ? "Read Less" : "Read More"}
              </div>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
