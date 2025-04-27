"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { Heart, Clock } from "lucide-react";
import { useState } from "react";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  isFavorite?: boolean;
}

export default function RecipeCard({
  id,
  title,
  image,
  cookTime,
  isFavorite = false,
}: RecipeCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
  };

  return (
    <Link href={`/recipe/${id}`} className="block w-full">
      <div className="recipe-card">
        <div className="relative aspect-square">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <button
            onClick={toggleFavorite}
            className="heart-button"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={24}
              className={favorite ? "fill-white stroke-white" : "stroke-white"}
            />
          </button>
        </div>
        <div className="mt-2">
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="recipe-time">
            <Clock size={16} className="mr-1" />
            <span>{cookTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
