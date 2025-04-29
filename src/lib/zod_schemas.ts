import { z } from "zod";

export const newIngredientZodSchema = z.object({
  // Step 1: Basic Info
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
