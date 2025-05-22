import { RELATIVE_PATHS } from "@/lib/constants";
import { RecipeIngredientsType } from "@/lib/custom_types";
import Link from "next/link";

interface RecipeIngredientsProps {
  ingredients: RecipeIngredientsType;
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

      <div className="grid grid-cols-2 gap-3">
        {ingredients.map((ingredient) => (
          <article key={ingredient.ingredientReference?.name}>
            <Link
              href={RELATIVE_PATHS.ingredients}
              className="font-semibold text-base block"
            >
              {ingredient.ingredientReference?.name}
            </Link>
            <p className="text-sm">{ingredient.amount}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
