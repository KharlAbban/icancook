"use server";

import { sanityClient } from "@/sanity/lib/client";
import { SANITY_GET_RECIPE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { sanityWriteClient } from "@/sanity/lib/write_client";
import { revalidatePath } from "next/cache";
import { RELATIVE_PATHS } from "./constants";

export async function addRecipeToFavorites(recipeId: string) {
  try {
    const existingRecipe = await sanityClient.fetch(
      SANITY_GET_RECIPE_BY_ID_QUERY,
      { recipeId: recipeId },
    );

    if (!existingRecipe) throw new Error("No recipe found!");

    if (existingRecipe.isFavorite)
      throw new Error("Recipe is already a favorite");

    await sanityWriteClient
      .patch(recipeId)
      .set({
        isFavorite: true,
      })
      .commit();

    revalidatePath(RELATIVE_PATHS.homePage);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error.message);

    return {
      error: error.message,
    };
  }
}

export async function removeRecipeFromFavorites(recipeId: string) {
  try {
    const existingRecipe = await sanityClient.fetch(
      SANITY_GET_RECIPE_BY_ID_QUERY,
      { recipeId: recipeId },
    );

    if (!existingRecipe) throw new Error("No recipe found!");

    if (!existingRecipe.isFavorite)
      throw new Error("Recipe is not a favorite!");

    await sanityWriteClient
      .patch(recipeId)
      .set({
        isFavorite: false,
      })
      .commit();

    revalidatePath(RELATIVE_PATHS.homePage);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error.message);

    return {
      error: error.message,
    };
  }
}
