"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FaClock } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { SANITY_FETCH_ALL_RECIPES_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { APP_LOGO_URL, APP_TITLE, RELATIVE_PATHS } from "@/lib/constants";
import { toast } from "sonner";
import {
  addRecipeToFavorites,
  removeRecipeFromFavorites,
} from "@/lib/server_actions";
import { Button } from "../../ui/button";

interface RecipeCardProps {
  recipe: SANITY_FETCH_ALL_RECIPES_QUERYResult[number];
  truncate: boolean;
}

export default function RecipeCard({ recipe, truncate }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(
    recipe.isFavorite ?? false,
  );
  const [isPending, startTransition] = useTransition();

  const addToFavorites = () =>
    startTransition(async () => {
      const isFavorited = await addRecipeToFavorites(recipe._id);

      if (isFavorited.success) {
        toast.success("Recipe added to favorites!", {
          duration: 3000,
          icon: (
            <Image
              height={40}
              width={40}
              src={APP_LOGO_URL}
              title={APP_TITLE}
              alt={APP_TITLE}
            />
          ),
        });

        setIsFavorite(true);
      } else {
        toast.error("Error adding recipe to favorites!", {
          duration: 3000,
          icon: (
            <Image
              height={40}
              width={40}
              src={APP_LOGO_URL}
              title={APP_TITLE}
              alt={APP_TITLE}
            />
          ),
        });
        setIsFavorite(false);
      }
    });

  const removeFromFavorites = () =>
    startTransition(async () => {
      const isUnfavorited = await removeRecipeFromFavorites(recipe._id);

      if (isUnfavorited.success) {
        toast.success("Recipe removed from favorites!", {
          duration: 3000,
          icon: (
            <Image
              height={40}
              width={40}
              src={APP_LOGO_URL}
              title={APP_TITLE}
              alt={APP_TITLE}
            />
          ),
        });
        setIsFavorite(false);
      } else {
        toast.error("Error removing recipe from favorites!", {
          duration: 3000,
          icon: (
            <Image
              height={40}
              width={40}
              src={APP_LOGO_URL}
              title={APP_TITLE}
              alt={APP_TITLE}
            />
          ),
        });
        setIsFavorite(true);
      }
    });

  return (
    <article className="recipe-card w-full mb-4">
      <div className="relative aspect-[9/15] rounded-xl overflow-hidden mb-4">
        <Image
          src={
            recipe.recipeImages
              ? urlFor(recipe.recipeImages[0]).auto("format").url()
              : "/placeholder.svg"
          }
          alt={recipe.name || APP_TITLE}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Button
          disabled={isPending}
          onClick={isFavorite ? removeFromFavorites : addToFavorites}
          className="absolute top-2 right-2 text-white p-2 bg-black/30 rounded-sm"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {recipe.isFavorite ? (
            <GoHeartFill size={30} />
          ) : (
            <GoHeart size={30} />
          )}
        </Button>
      </div>
      <div className="">
        <h3
          className={`${truncate && "truncate"} font-semibold text-base mb-1`}
        >
          <Link href={`${RELATIVE_PATHS.recipes}/${recipe._id}`}>
            {recipe.name && recipe.name?.length > 100
              ? `${recipe.name.slice(0, 100)}...`
              : recipe.name}
          </Link>
        </h3>
        <p className="flex items-center font-semibold text-sm gap-1">
          <FaClock size={15} className="mb-0.5" />
          {recipe.cookTime}
        </p>
      </div>
    </article>
  );
}
