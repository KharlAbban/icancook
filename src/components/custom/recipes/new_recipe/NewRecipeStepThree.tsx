"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { newRecipeFormValuesType } from "@/lib/custom_types";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface NewRecipeStepThreeProps {
  newRecipeForm: UseFormReturn<newRecipeFormValuesType>;
}

export default function NewRecipeStepThree({
  newRecipeForm,
}: NewRecipeStepThreeProps) {
  const { append, fields, remove } = useFieldArray({
    control: newRecipeForm.control,
    name: "steps",
  });

  return (
    <div className="flex flex-col gap-4 mt-6">
      <FormLabel>Recipe Steps</FormLabel>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border-2 border-dashed border-gray-200 p-1"
          >
            <div className="text-sm font-semibold mb-1">Step {index + 1}</div>
            <div className="flex gap-2">
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Cooking Step"
                    value={newRecipeForm.watch(`steps.${index}.step`) || ""}
                    onChange={(event) =>
                      newRecipeForm.setValue(
                        `steps.${index}.step`,
                        event.target.value,
                      )
                    }
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
            {newRecipeForm.formState.errors.steps?.[index]?.step && (
              <p className="text-sm text-red-600">
                {newRecipeForm.formState.errors.steps[index]?.step?.message ||
                  "Write something useful here!"}
              </p>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ step: "" })}
          className="flex items-center"
        >
          <Plus /> Add Cooking Step
        </Button>
      </div>
      {newRecipeForm.formState.errors.steps &&
        typeof newRecipeForm.formState.errors.steps.message === "string" && (
          <p className="text-sm text-red-600">
            {newRecipeForm.formState.errors.steps.message}
          </p>
        )}
    </div>
  );
}
