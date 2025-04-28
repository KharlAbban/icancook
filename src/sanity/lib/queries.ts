import { defineQuery } from "next-sanity";

export const SANITY_FETCH_ALL_RECIPES_QUERY = defineQuery(`
    *[_type == "recipe"] {
        ...
    }
`);

export const SANITY_GET_INGREDIENT_BY_NAME_QUERY = defineQuery(`
    *[_type == "ingredient" && name match ("*" + $ingredientName + "*")][0] {
        ...
    }
`);

export const SANITY_GET_RECIPE_BY_ID_QUERY = defineQuery(`
    *[_type == "recipe" && _id == $recipeId][0] {
        ...
    }
`);
