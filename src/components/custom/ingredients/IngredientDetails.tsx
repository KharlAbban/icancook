"use client";

import { vetrinoFont } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { APP_TITLE } from "@/lib/constants";
import { urlFor } from "@/sanity/lib/image";
import { SANITY_GET_INGREDIENT_BY_NAME_QUERYResult } from "@/sanity/types";
import { PortableText, toPlainText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { RiFileList3Line } from "react-icons/ri";

interface IngredientDetailsProps {
  ingredient: SANITY_GET_INGREDIENT_BY_NAME_QUERYResult;
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

  const plainTextPreview = toPlainText(ingredient.description || []);

  return (
    <>
      <div className="w-full aspect-[9/14] bg-black relative">
        <Image
          src={urlFor(ingredient.ingredientImages[0]).auto("format").url()}
          className="relative object-cover"
          alt={ingredient.name || APP_TITLE}
          title={ingredient.name}
          fill
        />
      </div>
      <Sheet open defaultOpen>
        <SheetContent
          addOverlay={false}
          useClose={false}
          className="px-4 pt-10 pb-6 rounded-t-4xl max-h-[90vh]"
          side="bottom"
        >
          <h2 className={`${vetrinoFont.className} text-2xl`}>
            {ingredient.name}
          </h2>
          <p className="text-gray-600 mb-4">Ingredient</p>
          <div className="transition-all duration-300 w-full overflow-y-auto">
            {readMore ? (
              <PortableText value={ingredient.description || []} />
            ) : (
              <p className="transition-all duration-200">
                {plainTextPreview.length > 200
                  ? `${plainTextPreview.slice(0, 200)}...`
                  : plainTextPreview}
              </p>
            )}
          </div>
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
        </SheetContent>
      </Sheet>
    </>
  );
}
