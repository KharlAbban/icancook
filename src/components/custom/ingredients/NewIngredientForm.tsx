"use client";

import { newIngredientFormValuesType } from "@/lib/custom_types";
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
import { addNewIngredient } from "@/lib/server_actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormImagesInput from "../common/FormImagesInput";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export default function NewIngredientForm() {
  const router = useRouter();

  const newIngredientForm = useForm<newIngredientFormValuesType>({
    resolver: zodResolver(newIngredientZodSchema),
  });

  const newIngredientSubmitHandler = async (
    data: newIngredientFormValuesType,
  ) => {
    try {
      // 1️⃣ Validate form submission with Zod
      const isSafeData = newIngredientZodSchema.safeParse(data);
      if (!isSafeData.success) {
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

      // 2️⃣ Upload images via Formdata fetch request to upload API route
      const ingredientNames = data.ingredientImages.map((_, idx) => {
        const safeName = data.name.toLowerCase().replace(/\s+/g, "_").trim();
        return `ingredient_${safeName}_${idx}`;
      });

      const uploadPromises = data.ingredientImages.map(async (file, idx) => {
        const res = await fetch(
          `https://${projectId}.api.sanity.io/v${apiVersion}/assets/images/${dataset}?filename=${ingredientNames[idx]}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN}`,
            },
            body: file,
          },
        );

        if (!res.ok) {
          throw new Error(`Failed to upload image: ${res.statusText}`);
        }

        const asset = await res.json();

        return {
          _id: asset.document._id,
        };
      });

      const assets = await Promise.all(uploadPromises);

      // 3️⃣ Build Sanity image references
      const ingredientimagesRef = assets.map((asset) => asset._id) as string[];

      // 4️⃣ Create new ingredient document
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

      // redirect on success
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
