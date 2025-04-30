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

interface RecipeSearchPageProps {
  searchQuery: string;
  page?: number;
}

export default async function RecipeSearchPage({
  searchParams,
}: {
  searchParams: Promise<RecipeSearchPageProps>;
}) {
  const { searchQuery, page } = await searchParams;
  const recipeSearchResults = await searchForItems(searchQuery || "", {
    page: page,
  });

  return (
    <section className="w-full">
      <AppHeader showSearch={false} />

      <main className="w-full px-2 overflow-x-hidden space-y-5 pb-6">
        <div className="w-full px-2">
          <SearchForm
            placeholder="Search recipes..."
            searchQuery={searchQuery}
            actionUrl={RELATIVE_PATHS.recipeSearchPage}
          />

          {/* Recipe Search Filters */}
        </div>

        {recipeSearchResults.error && (
          <div className="h-[40vh] w-full">
            <NoContent
              title="❌An error occurred!❌"
              message={recipeSearchResults.error}
            >
              <Button asChild>
                <Link href={RELATIVE_PATHS.newRecipe}>Add New Recipe</Link>
              </Button>
            </NoContent>
          </div>
        )}

        {recipeSearchResults.total < 1 && (
          <div className="h-[40vh] w-full">
            <NoContent
              title="No recipes found"
              message={`No recipes were found that matched ${recipeSearchResults.query}!`}
            >
              <Button asChild>
                <Link href={RELATIVE_PATHS.newRecipe}>Add New Recipe</Link>
              </Button>
            </NoContent>
          </div>
        )}

        {recipeSearchResults.total > 0 && (
          <>
            <Suspense fallback={<ExploreGridSkeleton />}>
              <ExploreGrid
                useStaticText={false}
                recipes={recipeSearchResults.items}
              />
            </Suspense>
            <SearchPagination
              currentPage={page}
              totalItems={recipeSearchResults.total}
            />
          </>
        )}
      </main>
    </section>
  );
}
