import { z } from "zod";

export const newIngredientZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ingredient name must be at least 2 characters" }),
  description: z
    .string()
    .min(10, {
      message: "Please provide a more detailed ingredient description",
    })
    .max(2500),
  ingredientImages: z
    .array(z.instanceof(File))
    .max(5, "Maximum of 5 ingredient images allowed!")
    .min(1, "Provide an ingredient image here!"),
});

const newRecipeIngredientSchema = z.object({
  ingredientReference: z.string().min(1, "Ingredient reference is required"),
  amount: z.string().min(1, "Amount is required"),
});

export const newRecipeZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Recipe name must be at least 2 characters" }),
  recipeImages: z
    .array(z.instanceof(File))
    .max(5, "Maximum of 5 recipe images allowed!")
    .min(1, "Provide an recipe image here!"),
  recipeType: z.string().min(3, {
    message: "Recipe type must have at least 3 characters, eg. soup",
  }),
  ingredients: z.array(newRecipeIngredientSchema).min(1, {
    message: "Recipe must have at least one ingredient",
  }),
  description: z
    .string()
    .min(10, {
      message: "Please provide a more detailed recipe description",
    })
    .max(2500),
  cookTime: z
    .string()
    .min(4, {
      message: "Provide a proper cook time, eg. 30 mins, 1 hour, etc.",
    })
    .max(2500),
  steps: z
    .array(
      z.object({ step: z.string().min(4, "Write something useful here!") }),
    )
    .min(1, {
      message: "You need at least one step to cook a recipe!",
    }),
});
