import { Vegan } from "lucide-react";
import { defineField, defineType } from "sanity";

export const ingredient_schema = defineType({
  name: "ingredient",
  title: "Ingredient 🍅",
  type: "document",
  icon: Vegan,
  fields: [
    defineField({
      name: "name",
      title: "Ingredient Name",
      type: "string",
      description:
        "The ingredient's name, either a unique one or commonly known one",
    }),
    defineField({
      name: "ingredientImages",
      title: "Ingredient Images",
      type: "array",
      of: [{ type: "image" }],
      description: "Images to show off the ingredient in different settings",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "description",
      title: "Ingredient Description",
      type: "array",
      of: [{ type: "block" }],
      description:
        "A description of this ingredient: what it is, how to use it, when and where",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "recipeImages.[0]",
    },
  },
});
