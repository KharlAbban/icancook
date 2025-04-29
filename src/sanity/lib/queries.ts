import { defineQuery } from "next-sanity";

// Recipe Queries
export const SANITY_FETCH_ALL_RECIPES_QUERY = defineQuery(`
    *[_type == "recipe"] | order(_createdAt desc) {
        ...
    }
`);

export const SANITY_GET_RECIPE_BY_NAME_QUERY = defineQuery(`
    *[_type == "recipe" && name match ("*" + $recipeName + "*")][0] {
        ...
    }
`);

export const SANITY_GET_RECIPE_BY_ID_QUERY = defineQuery(`
    *[_type == "recipe" && _id == $recipeId][0] {
        ...
    }
`);

// Ingredient Queries
export const SANITY_FETCH_ALL_INGREDIENTS_QUERY = defineQuery(`
    *[_type == "ingredient"] | order(_createdAt desc) {
        ...
    }
`);

export const SANITY_GET_INGREDIENT_BY_NAME_QUERY = defineQuery(`
    *[_type == "ingredient" && name match ("*" + $ingredientName + "*")][0] {
        ...
    }
`);

export const SANITY_GET_INGREDIENT_BY_ID_QUERY = defineQuery(`
    *[_type == "ingredient" && _id == $ingredientId][0] {
        ...
    }
`);
