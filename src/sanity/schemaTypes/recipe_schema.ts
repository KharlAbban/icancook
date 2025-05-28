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
      of: [
        {
          type: "object",
          fields: [
            {
              name: "ingredientReference",
              title: "Ingredient Name",
              type: "reference",
              to: [{ type: "ingredient" }, { type: "recipe" }],
            },
            {
              name: "amount",
              type: "string",
              title: "Amount",
              description: "Amount of this ingredient needed for this recipe",
            },
          ],
          preview: {
            select: {
              title: "ingredientReference.name",
              subtitle: "amount",
              media: "ingredientReference.recipeImages.[0]",
            },
            prepare: (selection) => {
              const { title, subtitle, media } = selection;
              return {
                title: title || "No ingredient name",
                subtitle: subtitle || "No amount specified",
                media: media || undefined,
              };
            },
          },
        },
      ],
      description: "A list of ingredients used in preparing this recipe",
    }),
    defineField({
      name: "description",
      title: "Short Recipe Description",
      type: "text",
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
    defineField({
      name: "steps",
      title: "Recipe Steps",
      description: "All the steps involved in making this recipe",
      type: "array",
      of: [{ type: "string" }],
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
