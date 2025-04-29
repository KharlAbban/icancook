import { z } from "zod";
import { newIngredientZodSchema } from "./zod_schemas";

export type newIngredientFormValuesType = z.infer<
  typeof newIngredientZodSchema
>;
