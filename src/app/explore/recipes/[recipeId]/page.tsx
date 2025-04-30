import { AppHeader, RecipeDetails } from "@/components/custom";
import {
  APP_INGREDIENTS_PAGE_URL,
  APP_LOGO_DARK_URL,
  APP_TAGLINE,
  APP_TITLE,
} from "@/lib/constants";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SANITY_GET_RECIPE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";

// Generate metadata for this page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}): Promise<Metadata> {
  const { recipeId } = await params;
  const recipeInfo = await sanityClient.fetch(SANITY_GET_RECIPE_BY_ID_QUERY, {
    recipeId: recipeId,
  });

  if (!recipeInfo) {
    return {
      title: "Recipe Not Found ❌",
      description: "The recipe you are looking for does not exist.",
    };
  }

  return {
    title: `${recipeInfo.name} Details ℹ️` || APP_TITLE,
    description:
      (recipeInfo.description && recipeInfo.description.slice(0, 120)) ||
      APP_TAGLINE,
    openGraph: {
      title: recipeInfo.name || APP_TITLE,
      description:
        (recipeInfo.description && recipeInfo.description.slice(0, 120)) ||
        APP_TAGLINE,
      url: `${APP_INGREDIENTS_PAGE_URL}/${recipeInfo.name}`,
      siteName: APP_TITLE,
      images: [
        {
          url: `${recipeInfo.recipeImages ? urlFor(recipeInfo.recipeImages[0]).auto("format").url() : APP_LOGO_DARK_URL}`,
          width: 1200,
          height: 630,
          alt: recipeInfo.name || APP_TITLE,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: recipeInfo._updatedAt,
      authors: [APP_TITLE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${recipeInfo.name} Details ℹ️` || APP_TITLE,
      description:
        (recipeInfo.description && recipeInfo.description.slice(0, 120)) ||
        APP_TAGLINE,
      images: [
        `${recipeInfo.recipeImages ? urlFor(recipeInfo.recipeImages[0]).auto("format").url() : APP_LOGO_DARK_URL}`,
      ],
    },
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const { recipeId } = await params;
  const recipeInfo = await sanityClient.fetch(SANITY_GET_RECIPE_BY_ID_QUERY, {
    recipeId: recipeId,
  });

  return (
    <div className="w-full h-screen relative overflow-x-hidden">
      <AppHeader
        className="fixed top-0 z-50 invert p-6"
        showLogo={false}
        showSidebar={false}
        showAdd={false}
      />
      <RecipeDetails recipe={recipeInfo} />
    </div>
  );
}
