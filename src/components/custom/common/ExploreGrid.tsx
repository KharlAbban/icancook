"use client";

import RecipeCard from "../recipes/RecipeCard";
import Masonry from "react-responsive-masonry";
import ExploreStaticHeader from "./ExploreStaticHeader";
import {
  SANITY_FETCH_ALL_INGREDIENTS_QUERYResult,
  SANITY_FETCH_ALL_RECIPES_QUERYResult,
} from "@/sanity/types";
import IngredientCard from "../ingredients/IngredientCard";

interface ExploreGridProps {
  recipes?: SANITY_FETCH_ALL_RECIPES_QUERYResult;
  ingredients?: SANITY_FETCH_ALL_INGREDIENTS_QUERYResult;
  useStaticText?: boolean;
}

export default function ExploreGrid({
  recipes,
  ingredients,
  useStaticText = true,
}: ExploreGridProps) {
  return (
    <>
      <Masonry columnsCount={2} gutter="24px">
        {useStaticText && <ExploreStaticHeader />}
        {recipes &&
          recipes.length > 0 &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        {ingredients &&
          ingredients.length > 0 &&
          ingredients.map((ingredient) => (
            <IngredientCard key={ingredient._id} ingredient={ingredient} />
          ))}
      </Masonry>
    </>
  );
}
