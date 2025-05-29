import { z } from "zod";
import { newIngredientZodSchema, newRecipeZodSchema } from "./zod_schemas";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity/types";

export type newIngredientFormValuesType = z.infer<
  typeof newIngredientZodSchema
>;

export type newRecipeFormValuesType = z.infer<typeof newRecipeZodSchema>;

export type RecipeIngredientsType = Array<{
  amount: string | null;
  ingredientReference: {
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
      _key: string;
    } | null;
  } | null;
}> | null;
