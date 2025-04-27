import { type SchemaTypeDefinition } from "sanity";
import { recipe_schema } from "./recipe_schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [recipe_schema],
};
