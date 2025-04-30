import { AppHeader, NoContent } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { RELATIVE_PATHS } from "@/lib/constants";
import { IceCreamBowl } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add New Recipe",
};

export default async function NewRecipePage() {
  return (
    <div className="w-full">
      <AppHeader showSearch={false} showAdd={false} />

      <section className="w-full px-2 overflow-x-hidden">
        <h2 className="text-lg text-gray-800 mb-4 dark:text-gray-300 font-medium flex items-center gap-1 justify-center">
          Add New Recipe <IceCreamBowl />
        </h2>

        <div className="h-[40vh] w-full">
          <NoContent
            title="Coming Soon"
            message={`Explore pre-made recipes while we work on making this feature available!`}
          >
            <Button asChild>
              <Link href={RELATIVE_PATHS.homePage}>
                Explore Recipes <IceCreamBowl />
              </Link>
            </Button>
          </NoContent>
        </div>
      </section>
    </div>
  );
}
