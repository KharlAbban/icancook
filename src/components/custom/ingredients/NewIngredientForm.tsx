"use client";

import { newIngredientFormValuesType } from "@/lib/types";
import { newIngredientZodSchema } from "@/lib/zod_schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import { APP_LOGO_URL, APP_TITLE, RELATIVE_PATHS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addNewIngredient, uploadImagesToSanity } from "@/lib/server_actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormImagesInput from "../common/FormImagesInput";

export default function NewIngredientForm() {
  const router = useRouter();

  const newIngredientForm = useForm<newIngredientFormValuesType>({
    resolver: zodResolver(newIngredientZodSchema),
  });

  const newIngredientSubmitHandler = async (
    data: newIngredientFormValuesType,
  ) => {
    try {
      const isSafeData = newIngredientZodSchema.safeParse(data);

      if (isSafeData.error) {
        return toast.error("Validation Error!", {
          description: "Please fill in all fields correctly!",
          duration: 8000,
          icon: (
            <Image
              src={APP_LOGO_URL}
              alt={APP_TITLE}
              title={APP_TITLE}
              height={40}
              width={40}
            />
          ),
        });
      }

      // upload images here first
      const ingredientNames = data.ingredientImages.map((_, idx) => {
        const safeName = data.name.toLowerCase().replace(/\s+/g, "_").trim();
        return `ingredient_${safeName}_${idx}`;
      });

      const ingredientimagesRef = await uploadImagesToSanity(
        data.ingredientImages,
        ingredientNames,
      );

      if (!ingredientimagesRef || ingredientimagesRef.length < 1)
        throw new Error("Failed to upload ingredient images");

      // add new ingredient
      const newIngredient = await addNewIngredient(data, ingredientimagesRef);

      if (newIngredient.success) {
        newIngredientForm.reset();

        toast.success("Successfully added new ingredient!", {
          duration: 5000,
          icon: (
            <Image
              src={APP_LOGO_URL}
              alt={APP_TITLE}
              title={APP_TITLE}
              height={40}
              width={40}
            />
          ),
        });
      } else {
        return toast.error("Error adding new ingredient!", {
          description: newIngredient.error,
          duration: 8000,
          icon: (
            <Image
              src={APP_LOGO_URL}
              alt={APP_TITLE}
              title={APP_TITLE}
              height={40}
              width={40}
            />
          ),
        });
      }

      router.push(
        `${RELATIVE_PATHS.ingredients}/${newIngredient.ingredient_id}`,
      );
    } catch (error: any) {
      console.error(error.message);
      toast.error("An error occured!", {
        description: error.message,
        duration: 8000,
        icon: (
          <Image
            src={APP_LOGO_URL}
            alt={APP_TITLE}
            title={APP_TITLE}
            height={40}
            width={40}
          />
        ),
      });
    }
  };

  return (
    <div className="w-full">
      <Form {...newIngredientForm}>
        <form
          className="space-y-6 pb-5"
          onSubmit={newIngredientForm.handleSubmit(newIngredientSubmitHandler)}
        >
          <FormField
            control={newIngredientForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-500">
                  Ingredient Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none"
                    placeholder="Enter ingredient name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={newIngredientForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-500">
                  Ingredient Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="rounded-none"
                    placeholder="Enter ingredient description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormImagesInput form={newIngredientForm} />

          <div className="w-full mt-8">
            <Button
              disabled={newIngredientForm.formState.isSubmitting}
              type="submit"
              className="w-full"
              size="lg"
            >
              {newIngredientForm.formState.isSubmitting
                ? "Adding Ingredient..."
                : "Add Ingredient"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
