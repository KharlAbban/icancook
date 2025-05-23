import { defineQuery } from "next-sanity";

// Recipe Queries
export const SANITY_FETCH_ALL_RECIPES_QUERY = defineQuery(`
    *[_type == "recipe"] | order(_updatedAt desc) {
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
        ...,
        ingredients[] {
            amount,
            ingredientReference -> {
                name,
                "image": select(
                    _type == "ingredient" => ingredientImages[0],
                    _type == "recipe" => recipeImages[0],
                )
            }
        }
    }
`);

export const SANITY_SEARCH_FOR_RECIPE_QUERY = defineQuery(`
    {
        "totalSearchResults": count(
            *[_type == "recipe"
                // Handle text search with optional parameter
                && (!defined($searchQuery) || $searchQuery == "" || 
                    name match ("*" + $searchQuery + "*"))
            ]
        ),
        "searchResults": *[_type == "recipe"
            // Handle text search with optional parameter
            && (!defined($searchQuery) || $searchQuery == "" || 
                name match ("*" + $searchQuery + "*"))
        ] | order(_updatedAt desc) [
            // Pagination
            $skip...($skip + $limit)
        ] {
            ...
        }
    }
`);

// Ingredient Queries
export const SANITY_FETCH_ALL_INGREDIENTS_QUERY = defineQuery(`
    *[_type == "ingredient"] | order(_updatedAt desc) {
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

export const SANITY_SEARCH_FOR_INGREDIENT_QUERY = defineQuery(`
    {
        "totalSearchResults": count(
            *[_type == "ingredient"
                // Handle text search with optional parameter
                && (!defined($searchQuery) || $searchQuery == "" || 
                    name match ("*" + $searchQuery + "*"))
            ]
        ),
        "searchResults": *[_type == "ingredient"
            // Handle text search with optional parameter
            && (!defined($searchQuery) || $searchQuery == "" || 
                name match ("*" + $searchQuery + "*"))
        ] | order(_updatedAt desc) [
            // Pagination
            $skip...($skip + $limit)
        ] {
            ...
        }
    }
`);
