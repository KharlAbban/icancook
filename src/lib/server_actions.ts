"use server";

import { sanityClient } from "@/sanity/lib/client";
import {
  SANITY_GET_INGREDIENT_BY_ID_QUERY,
  SANITY_GET_RECIPE_BY_ID_QUERY,
  SANITY_SEARCH_FOR_INGREDIENT_QUERY,
  SANITY_SEARCH_FOR_RECIPE_QUERY,
} from "@/sanity/lib/queries";
import { sanityWriteClient } from "@/sanity/lib/write_client";
import { revalidatePath } from "next/cache";
import { DEFAULT_SEARCH_LIMIT, RELATIVE_PATHS } from "./constants";
import { newIngredientFormValuesType } from "./custom_types";
import { SanityImageAssetDocument } from "next-sanity";

interface SearchFilterProps {
  page?: number;
}

// General Actions
export async function uploadImagesToSanity(
  assets: File[],
  imageNames: string[],
): Promise<SanityImageAssetDocument[] | null> {
  try {
    console.log("Sanity bulk asset upload start...");

    // Validate all images before uploading
    for (const asset of assets) {
      if (asset.size > 10 * 1024 * 1024) {
        // 10MB limit
        throw new Error(
          "One or more images are too large. Please use images smaller than 10MB each.",
        );
      }
    }

    // Upload images sequentially to avoid overwhelming the connection
    const uploadedAssets = [];
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const filename = imageNames[i];

      const uploadedAsset = await sanityClient.assets.upload("image", asset, {
        filename: filename,
        timeout: 60000, // 60 second timeout
      });

      uploadedAssets.push(uploadedAsset);

      // Add a small delay between uploads to prevent connection issues
      if (i < assets.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    console.log("All assets uploaded!");

    return uploadedAssets;
  } catch (error: any) {
    console.error("Sanity bulk asset upload error:", error.message);
    throw error;
  }
}

export async function searchForItems(
  searchQuery: string,
  searchFilters?: SearchFilterProps,
  recipeSearch: boolean = true,
) {
  try {
    const queryParams = {
      searchQuery: searchQuery,
      skip: searchFilters?.page
        ? (searchFilters.page - 1) * DEFAULT_SEARCH_LIMIT
        : 0,
      limit: DEFAULT_SEARCH_LIMIT,
    };

    const results = await sanityClient.fetch(
      recipeSearch
        ? SANITY_SEARCH_FOR_RECIPE_QUERY
        : SANITY_SEARCH_FOR_INGREDIENT_QUERY,
      queryParams,
    );

    const { totalSearchResults, searchResults } = results;

    if (totalSearchResults < 1)
      return {
        query: searchQuery,
        total: 0,
      };

    return {
      query: searchQuery,
      success: true,
      total: totalSearchResults,
      items: searchResults,
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      query: searchQuery,
      error: error.message,
    };
  }
}

export async function deleteAsset(assetId: string) {
  try {
    await sanityWriteClient.delete(assetId);
    return true;
  } catch (error) {
    console.error(`Failed to delete asset ${assetId}:`, error);
    return false;
  }
}

// Recipe Actions
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

// Ingredient Actions
export async function addNewIngredient(
  ingredientData: newIngredientFormValuesType,
  imagesRef: string[],
) {
  try {
    // Add timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 second timeout

    const ingredientDoc = {
      _type: "ingredient",
      name: ingredientData.name,
      description: ingredientData.description,
      ingredientImages: imagesRef?.map((imageRef) => ({
        _type: "image",
        _key: imageRef,
        asset: {
          _type: "reference",
          _ref: imageRef,
        },
      })),
    };

    const newIngredientDoc = await sanityWriteClient.create(ingredientDoc, {
      timeout: 120000,
    });

    clearTimeout(timeoutId);

    return {
      success: true,
      ingredient_id: newIngredientDoc._id,
    };
  } catch (error: any) {
    console.error(error.message);

    return {
      error: error.message,
    };
  }
}

export async function deleteIngredient(ingredientId: string) {
  try {
    const existingIngredient = await sanityClient.fetch(
      SANITY_GET_INGREDIENT_BY_ID_QUERY,
      {
        ingredientId: ingredientId,
      },
    );

    if (!existingIngredient || !existingIngredient.ingredientImages)
      throw new Error("Ingredient does not exist!");

    const imageAssetIds = [];

    // Get document photos if they exist
    for (const photo of existingIngredient.ingredientImages) {
      if (photo.asset?._ref) {
        imageAssetIds.push(photo.asset._ref);
      }
    }

    // Delete ingredient document
    await sanityWriteClient.delete(ingredientId);

    // Delete all images
    for (const assetId of imageAssetIds) {
      await deleteAsset(assetId);
    }

    revalidatePath(RELATIVE_PATHS.ingredients);

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
