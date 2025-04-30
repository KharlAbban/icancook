export const dynamic = "force-dynamic";

import {
  AppHeader,
  ExploreGrid,
  NoContent,
  SearchForm,
  SearchPagination,
} from "@/components/custom";
import { ExploreGridSkeleton } from "@/components/custom/common/skeletons";
import { Button } from "@/components/ui/button";
import { RELATIVE_PATHS } from "@/lib/constants";
import { searchForItems } from "@/lib/server_actions";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

// Generate metadata for this page
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ searchQuery: string }>;
}): Promise<Metadata> {
  const { searchQuery } = await searchParams;

  if (!searchQuery || searchQuery == "")
    return {
      title: "No search query",
    };

  return {
    title: `Search for ${searchQuery}`,
  };
}

interface IngredientsSearchPageProps {
  searchQuery: string;
  page?: number;
}

export default async function IngredientsSearchPage({
  searchParams,
}: {
  searchParams: Promise<IngredientsSearchPageProps>;
}) {
  const { searchQuery, page } = await searchParams;
  const ingrSearchResults = await searchForItems(searchQuery || "", {
    page: page,
  });

  return (
    <section className="w-full">
      <AppHeader recipeRoute={false} showSearch={false} />

      <main className="w-full px-2 overflow-x-hidden space-y-5 pb-6">
        <div className="w-full px-2">
          <SearchForm
            placeholder="Search ingredients..."
            searchQuery={searchQuery}
            actionUrl={RELATIVE_PATHS.ingredientSearchPage}
          />
        </div>

        {ingrSearchResults.error && (
          <div className="h-[40vh] w-full">
            <NoContent
              title="❌An error occurred!❌"
              message={ingrSearchResults.error}
            >
              <Button asChild>
                <Link href={RELATIVE_PATHS.newIngredient}>
                  Add New Ingredient
                </Link>
              </Button>
            </NoContent>
          </div>
        )}

        {ingrSearchResults.total < 1 && (
          <div className="h-[40vh] w-full">
            <NoContent
              title="No ingredients found"
              message={`No ingredients were found that matched ${ingrSearchResults.query}!`}
            >
              <Button asChild>
                <Link href={RELATIVE_PATHS.newIngredient}>
                  Add New Ingredient
                </Link>
              </Button>
            </NoContent>
          </div>
        )}

        {ingrSearchResults.total > 0 && (
          <>
            <Suspense fallback={<ExploreGridSkeleton />}>
              <ExploreGrid
                useStaticText={false}
                ingredients={ingrSearchResults.items}
              />
            </Suspense>
            <SearchPagination
              currentPage={page}
              totalItems={ingrSearchResults.total}
            />
          </>
        )}
      </main>
    </section>
  );
}
