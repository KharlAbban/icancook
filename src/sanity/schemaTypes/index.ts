import { type SchemaTypeDefinition } from "sanity";
import { recipe_schema } from "./recipe_schema";
import { ingredient_schema } from "./ingredient_schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [recipe_schema, ingredient_schema],
};
