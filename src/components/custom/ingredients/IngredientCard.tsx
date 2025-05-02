import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { SANITY_FETCH_ALL_INGREDIENTS_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { APP_TITLE, RELATIVE_PATHS } from "@/lib/constants";

interface IngredientCardProps {
  ingredient: SANITY_FETCH_ALL_INGREDIENTS_QUERYResult[number];
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <Link
      href={`${RELATIVE_PATHS.ingredients}/${ingredient._id}`}
      className="w-full mb-2"
    >
      <article className="recipe-card w-full">
        <div className="relative aspect-[9/14] rounded-xl overflow-hidden mb-4">
          <Image
            src={
              ingredient.ingredientImages
                ? urlFor(ingredient.ingredientImages[0]).auto("format").url()
                : "/placeholder.svg"
            }
            alt={ingredient.name || APP_TITLE}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="">
          <h3 className="font-semibold text-base mb-1 truncate">
            {ingredient.name}
          </h3>
        </div>
      </article>
    </Link>
  );
}
