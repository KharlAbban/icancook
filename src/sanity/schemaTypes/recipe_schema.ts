import { IceCreamBowl } from "lucide-react";
import { defineField, defineType } from "sanity";

export const recipe_schema = defineType({
  name: "recipe",
  title: "Recipe 🥣",
  type: "document",
  icon: IceCreamBowl,
  fields: [
    defineField({
      name: "name",
      title: "Recipe Name",
      type: "string",
      description:
        "The recipe's name,either a unique one or commonly known one",
    }),
    defineField({
      name: "recipeImages",
      title: "Recipe Images",
      type: "array",
      of: [{ type: "image" }],
      description: "Images to show off the finished recipe",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "recipeType",
      title: "Recipe Type",
      type: "string",
      description: "Type of recipe: breakfast, lunch, soup, stew, snack, etc",
    }),
    defineField({
      name: "ingredients",
      title: "Recipe Ingredients",
      type: "array",
      of: [{ type: "string" }],
      description: "A list of ingredients used in preparing this recipe",
    }),
    defineField({
      name: "description",
      title: "Short Recipe Description",
      type: "string",
      description:
        "A brief desciption of this recipe: why you make it, how, when - add some notes here",
    }),
    defineField({
      name: "cookTime",
      title: "Cook Time",
      type: "string",
      description:
        "A rough estimate of how long it takes to prepare this dish. Time yourself making this dish to add correct responses here",
    }),
    defineField({
      name: "isFavorite",
      title: "Favorite Recipe",
      type: "boolean",
      initialValue: false,
      description: "Is this recipe a favorite of yours?",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "recipeType",
      media: "recipeImages.[0]",
    },
  },
});
