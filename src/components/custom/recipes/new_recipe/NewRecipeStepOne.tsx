import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormImagesInput from "../../common/FormImagesInput";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { newRecipeFormValuesType } from "@/lib/custom_types";

interface NewRecipeStepOneProps {
  newRecipeForm: UseFormReturn<newRecipeFormValuesType>;
}

export default function NewRecipeStepOne({
  newRecipeForm,
}: NewRecipeStepOneProps) {
  return (
    <>
      <FormField
        control={newRecipeForm.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-gray-500">Recipe Name</FormLabel>
            <FormControl>
              <Input
                className="rounded-none"
                placeholder="Enter recipe name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={newRecipeForm.control}
        name="recipeType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-gray-500">Recipe Type</FormLabel>
            <FormControl>
              <Input
                className="rounded-none"
                placeholder="Snack, soup, lunch, brunch, etc."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={newRecipeForm.control}
        name="cookTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-gray-500">Cook Time</FormLabel>
            <FormControl>
              <Input
                className="rounded-none"
                placeholder="1 hour, 30 mins, 2 days, etc."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={newRecipeForm.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-gray-500">
              Recipe Description
            </FormLabel>
            <FormControl>
              <Textarea
                className="rounded-none"
                placeholder="Describe the recipe..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormImagesInput imageType="recipe" form={newRecipeForm} />
    </>
  );
}
