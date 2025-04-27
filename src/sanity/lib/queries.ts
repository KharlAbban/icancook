import { defineQuery } from "next-sanity";

export const SANITY_FETCH_ALL_RECIPES_QUERY = defineQuery(`
    *[_type == "recipe"] {
        ...
    }
`);
