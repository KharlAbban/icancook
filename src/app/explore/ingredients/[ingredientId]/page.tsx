import { AppHeader, IngredientDetails } from "@/components/custom";
import {
  APP_INGREDIENTS_PAGE_URL,
  APP_LOGO_DARK_URL,
  APP_TAGLINE,
  APP_TITLE,
} from "@/lib/constants";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SANITY_GET_INGREDIENT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";

// Generate metadata for this page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ ingredientId: string }>;
}): Promise<Metadata> {
  const { ingredientId } = await params;
  const ingredientInfo = await sanityClient.fetch(
    SANITY_GET_INGREDIENT_BY_ID_QUERY,
    {
      ingredientId: ingredientId,
    },
  );

  if (!ingredientInfo) {
    return {
      title: "Ingredient Not Found ❌",
      description: "The ingredient you are looking for does not exist.",
    };
  }

  return {
    title: `${ingredientInfo.name} Details ℹ️` || APP_TITLE,
    description: ingredientInfo.description || APP_TAGLINE,
    openGraph: {
      title: ingredientInfo.name || APP_TITLE,
      description: ingredientInfo.description || APP_TAGLINE,
      url: `${APP_INGREDIENTS_PAGE_URL}/${ingredientInfo.name}`,
      siteName: APP_TITLE,
      images: [
        {
          url: `${ingredientInfo.ingredientImages ? urlFor(ingredientInfo.ingredientImages[0]).auto("format").url() : APP_LOGO_DARK_URL}`,
          width: 1200,
          height: 630,
          alt: ingredientInfo.name || APP_TITLE,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: ingredientInfo._updatedAt,
      authors: [APP_TITLE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${ingredientInfo.name} Details ℹ️` || APP_TITLE,
      description: ingredientInfo.description || APP_TAGLINE,
      images: [
        `${ingredientInfo.ingredientImages ? urlFor(ingredientInfo.ingredientImages[0]).auto("format").url() : APP_LOGO_DARK_URL}`,
      ],
    },
  };
}

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ ingredientId: string }>;
}) {
  const { ingredientId } = await params;
  const ingredientInfo = await sanityClient.fetch(
    SANITY_GET_INGREDIENT_BY_ID_QUERY,
    {
      ingredientId: ingredientId,
    },
  );

  return (
    <div className="w-full h-screen relative">
      <AppHeader
        className="z-50 p-6 relative invert"
        showLogo={false}
        showSidebar={false}
        showAdd={false}
        recipeRoute={false}
      />
      <IngredientDetails ingredient={ingredientInfo} />
    </div>
  );
}
