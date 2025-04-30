import { IceCreamBowl, Plus, Search, TreePalm } from "lucide-react";

// app metadata
export const APP_TITLE = "icancook";
export const APP_TAGLINE = "Your personal cooking companion diary";
export const APP_DESCRIPTION =
  "icancook is a sophisticated platform designed for cooking enthusiasts who want to curate their own collection of recipes in a visually appealing and user-friendly environment. Built with a mobile-first approach, icancook transforms the way you interact with your recipes, making cooking more enjoyable and accessible. Key Features: Visually Stunning Interface, Personal Recipe Collection, Seamless Mobile Experience, Infinite Recipe Discovery, Offline Accessibility, and more!";
export const APP_DESCRIPTION_SHORT =
  "iCanCook is a mobile-first personal cooking companion that helps you discover, save, and organize your favorite recipes in a visually stunning Pinterest-style layout, making your culinary journey both beautiful and effortless.";

// routes and paths
export const APP_BASE_URL = "https://icancook.vercel.app";
export const APP_LOCAL_BASE_URL = "http://localhost:3000";
export const APP_LOGO_URL = "/logos/logo.png";
export const APP_LOGO_DARK_URL = "/logos/logo_dark.png";
export const APP_HOMEPAGE_URL = `${APP_BASE_URL}/explore`;
export const APP_INGREDIENTS_PAGE_URL = `${APP_BASE_URL}/explore/ingredients`;
export const APP_RECIPES_PAGE_URL = `${APP_BASE_URL}/explore/recipes`;

export const RELATIVE_PATHS = {
  indexPage: "/",
  homePage: "/explore",
  newRecipe: "/explore/new/recipe",
  newIngredient: "/explore/new/ingredient",
  recipeSearchPage: "/explore/recipes/search",
  ingredientSearchPage: "/explore/ingredients/search",
  ingredients: "/explore/ingredients",
  recipes: "/explore/recipes",
};

export const DEFAULT_SEARCH_LIMIT = 16;

export const SIDEBAR_MODULES = [
  {
    title: "Recipes",
    menuItems: [
      {
        linkTo: RELATIVE_PATHS.homePage,
        linkText: "Recipes",
        icon: IceCreamBowl,
      },
      {
        linkTo: RELATIVE_PATHS.recipeSearchPage,
        linkText: "Find a Recipe",
        icon: Search,
      },
      {
        linkTo: RELATIVE_PATHS.newRecipe,
        linkText: "Add A Recipe",
        icon: Plus,
      },
    ],
  },
  {
    title: "Ingredients",
    menuItems: [
      {
        linkTo: RELATIVE_PATHS.ingredients,
        linkText: "Ingredients",
        icon: TreePalm,
      },
      {
        linkTo: RELATIVE_PATHS.ingredientSearchPage,
        linkText: "Find an Ingredient",
        icon: Search,
      },
      {
        linkTo: RELATIVE_PATHS.newIngredient,
        linkText: "Add an Ingredient",
        icon: Plus,
      },
    ],
  },
];

export const SAMPLE_RECIPE_DATA = [
  {
    id: "1",
    recipeName: "Fish in Karella Sauce",
    cookTime: "1 hour",
    image: "/images/fish-recipe-image.jpg",
  },
  {
    id: "2",
    recipeName: "Fragrant Cheese Spiced Bread",
    cookTime: "30 mins",
    image: "/images/bread-recipe-image.jpg",
  },
  {
    id: "3",
    recipeName: "Vegetable-based Sandwich",
    cookTime: "5 mins",
    image: "/images/sandwich-recipe-image.jpg",
  },
  {
    id: "4",
    recipeName: "Ato's Special Bread & Egg",
    cookTime: "15 mins",
    image: "/images/bread-and-egg-recipe-image.jpg",
  },
];
