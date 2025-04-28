"use client";

import RecipeCard from "./RecipeCard";
import Masonry from "react-responsive-masonry";
import ExploreStaticHeader from "./ExploreStaticHeader";
import { SANITY_FETCH_ALL_RECIPES_QUERYResult } from "@/sanity/types";

interface ExploreGridProps {
  recipes: SANITY_FETCH_ALL_RECIPES_QUERYResult;
}

export default function ExploreGrid({ recipes }: ExploreGridProps) {
  if (!recipes || recipes.length < 1) return null;

  return (
    <>
      <Masonry columnsCount={2} gutter="24px">
        <ExploreStaticHeader />
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </Masonry>
    </>
  );
}
