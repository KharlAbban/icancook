"use client";

import { SAMPLE_RECIPE_DATA } from "@/lib/constants";
import RecipeCard from "./recipe-card";
import Masonry from "react-responsive-masonry";

export default function ExploreGrid() {
  return (
    <>
      <Masonry columnsCount={2} gutter="16px">
        <div className="gap-6">
          <h2 className="text-xl">Lorem ipsum dolor sit amet.</h2>
        </div>
        {SAMPLE_RECIPE_DATA.map((recipe) => (
          <RecipeCard
            cookTime={recipe.cookTime}
            id={recipe.id}
            image={recipe.image}
            title={recipe.recipeName}
            isFavorite
            key={recipe.id}
          />
        ))}
      </Masonry>
    </>
  );
}
