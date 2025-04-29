import { AppHeader, NewIngredientForm } from "@/components/custom";
import { Vegan } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Ingredient",
};

export default async function NewIngredientPage() {
  return (
    <div className="w-full">
      <AppHeader showSearch={false} showAdd={false} />

      <section className="w-full px-2 overflow-x-hidden">
        <h2 className="text-lg text-gray-800 mb-4 dark:text-gray-300 font-medium flex items-center gap-1 justify-center">
          Add New Ingredient <Vegan />
        </h2>
        <NewIngredientForm />
      </section>
    </div>
  );
}
