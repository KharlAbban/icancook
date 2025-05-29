import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { newRecipeFormValuesType } from "@/lib/custom_types";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { SANITY_FETCH_ALL_INGREDIENTS_QUERYResult } from "@/sanity/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewRecipeStepTwoProps {
  newRecipeForm: UseFormReturn<newRecipeFormValuesType>;
  allIngredients: SANITY_FETCH_ALL_INGREDIENTS_QUERYResult;
}

export default function NewRecipeStepTwo({
  newRecipeForm,
  allIngredients,
}: NewRecipeStepTwoProps) {
  const { append, fields, remove } = useFieldArray({
    control: newRecipeForm.control,
    name: "ingredients",
  });
  return (
    <div className="flex flex-col gap-4 mt-6">
      <FormLabel>Recipe Ingredients</FormLabel>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col items-center gap-3 border-2 border-dashed border-gray-300 p-1"
          >
            <FormItem className="w-full">
              <FormControl>
                <Select
                  required
                  onValueChange={(value) =>
                    newRecipeForm.setValue(
                      `ingredients.${index}.ingredientReference`,
                      value,
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Ingredient" />
                  </SelectTrigger>
                  <SelectContent>
                    {allIngredients.map((ingredient) => (
                      <SelectItem key={ingredient._id} value={ingredient._id}>
                        {ingredient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className="flex items-center w-full">
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    required
                    placeholder="Amount"
                    {...newRecipeForm.register(`ingredients.${index}.amount`)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button
                variant="ghost"
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 shrink-0"
              >
                <Trash className="h-8 w-8" />
              </Button>
            </div>
            {newRecipeForm.formState.errors.ingredients?.[index] && (
              <p className="text-sm text-red-600">Please fill in all fields</p>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ ingredientReference: "", amount: "" })}
          className="flex items-center"
        >
          <Plus /> Add Ingredient
        </Button>
      </div>
      {newRecipeForm.formState.errors.ingredients && (
        <p className="text-sm text-red-600">
          Add at least one recipe and fill in all fields
        </p>
      )}
    </div>
  );
}
