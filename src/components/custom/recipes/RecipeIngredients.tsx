import { RELATIVE_PATHS } from "@/lib/constants";
import Link from "next/link";

interface RecipeIngredientsProps {
  ingredients: string[] | undefined;
}

export default function RecipeIngredients({
  ingredients,
}: RecipeIngredientsProps) {
  if (!ingredients) return "No ingredients!";

  return (
    <div className="w-full mt-2">
      <h4 className="text-xs text-gray-600 mb-2">
        Recipe Ingredients ({ingredients.length})
      </h4>

      <div className="grid grid-cols-3 gap-3">
        {ingredients.map((ingredient) => (
          <article key={ingredient}>
            <Link
              href={RELATIVE_PATHS.ingredients}
              className="font-semibold text-base block"
            >
              {ingredient}
            </Link>
            <p className="text-sm">1 tbspn of olive oil</p>
          </article>
        ))}
      </div>
    </div>
  );
}
