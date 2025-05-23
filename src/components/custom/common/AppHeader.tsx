import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { APP_LOGO_DARK_URL, APP_TITLE, RELATIVE_PATHS } from "@/lib/constants";
import Image from "next/image";
import { vetrinoFont } from "@/app/fonts";
import { cn } from "@/lib/utils";
import GoBackButton from "./GoBackButton";

interface HeaderProps {
  showSidebar?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showAdd?: boolean;
  className?: string;
  recipeRoute?: boolean;
}

export default function AppHeader({
  showSidebar = true,
  showLogo = true,
  showSearch = true,
  showAdd = true,
  className,
  recipeRoute = true,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "w-full flex items-center justify-between py-4 px-4",
        className,
      )}
    >
      <div>{showSidebar ? <SidebarTrigger /> : <GoBackButton />}</div>

      <div>
        {showLogo && (
          <Link
            href={RELATIVE_PATHS.indexPage}
            className="flex items-center gap-1"
          >
            <Image
              src={APP_LOGO_DARK_URL}
              title={APP_TITLE}
              alt={APP_TITLE}
              height={30}
              width={30}
            />
            <h1 className={`${vetrinoFont.className} text-2xl`}>{APP_TITLE}</h1>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <Link
            href={
              recipeRoute
                ? RELATIVE_PATHS.recipeSearchPage
                : RELATIVE_PATHS.ingredientSearchPage
            }
            aria-label="Search"
          >
            <Search size={24} />
          </Link>
        )}

        {showAdd && (
          <Link
            href={
              recipeRoute
                ? RELATIVE_PATHS.newRecipe
                : RELATIVE_PATHS.newIngredient
            }
            aria-label="Add new recipe"
          >
            <Plus size={24} />
          </Link>
        )}
      </div>
    </header>
  );
}
