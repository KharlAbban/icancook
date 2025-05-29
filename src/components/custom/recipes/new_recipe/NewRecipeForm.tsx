"use client";

import { newRecipeFormValuesType } from "@/lib/custom_types";
import { newRecipeZodSchema } from "@/lib/zod_schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import {
  APP_LOGO_URL,
  APP_TITLE,
  NEW_RECIPE_FORM_STEPS,
  NEW_RECIPE_TOTAL_STEPS,
  RELATIVE_PATHS,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { NewRecipeStepIndicator } from "./NewRecipeStepIndicator";
import { useState } from "react";
import NewRecipeStepOne from "./NewRecipeStepOne";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NewRecipeStepTwo from "./NewRecipeStepTwo";
import NewRecipeStepThree from "./NewRecipeStepThree";
import { SANITY_FETCH_ALL_INGREDIENTS_QUERYResult } from "@/sanity/types";
import { addNewRecipe } from "@/lib/server_actions";

export default function NewRecipeForm({
  allIngredients,
}: {
  allIngredients: SANITY_FETCH_ALL_INGREDIENTS_QUERYResult;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const newRecipeForm = useForm<newRecipeFormValuesType>({
    resolver: zodResolver(newRecipeZodSchema),
  });

  const newRecipeSubmitHandler = async (data: newRecipeFormValuesType) => {
    try {
      // 1️⃣ Validate form submission with Zod
      const isSafeData = newRecipeZodSchema.safeParse(data);
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
      const recipeNames = data.recipeImages.map((_, idx) => {
        const safeName = data.name.toLowerCase().replace(/\s+/g, "_").trim();
        return `recipe_${safeName}_${idx}`;
      });

      const uploadPromises = data.recipeImages.map(async (file, idx) => {
        const res = await fetch(
          `https://${projectId}.api.sanity.io/v${apiVersion}/assets/images/${dataset}?filename=${recipeNames[idx]}`,
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
      const recipeImagesRef = assets.map((asset) => asset._id) as string[];

      // 4️⃣ Create new recipe document
      const newRecipe = await addNewRecipe(data, recipeImagesRef);
      if (newRecipe.success) {
        newRecipeForm.reset();

        toast.success("Successfully added new recipe!", {
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
        return toast.error("Error adding new recipe!", {
          description: newRecipe.error,
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
      router.push(`${RELATIVE_PATHS.recipes}/${newRecipe.recipe_id}`);
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

  const validateCurrentStep = async () => {
    const fieldsToValidate =
      NEW_RECIPE_FORM_STEPS[currentStep as keyof typeof NEW_RECIPE_FORM_STEPS];
    return await newRecipeForm.trigger(fieldsToValidate as any);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid && currentStep < NEW_RECIPE_TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full mt-4">
      <NewRecipeStepIndicator currentStep={currentStep} />

      <FormProvider {...newRecipeForm}>
        <Form {...newRecipeForm}>
          <form
            className="space-y-6 pb-5"
            onSubmit={newRecipeForm.handleSubmit(newRecipeSubmitHandler)}
          >
            {currentStep === 1 && (
              <NewRecipeStepOne newRecipeForm={newRecipeForm} />
            )}
            {currentStep === 2 && (
              <NewRecipeStepTwo
                allIngredients={allIngredients}
                newRecipeForm={newRecipeForm}
              />
            )}
            {currentStep === 3 && (
              <NewRecipeStepThree newRecipeForm={newRecipeForm} />
            )}

            <div className="flex items-center justify-between mt-10 overflow-hidden w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="w-1/3 shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep === NEW_RECIPE_TOTAL_STEPS ? (
                <Button
                  disabled={newRecipeForm.formState.isSubmitting}
                  type="submit"
                  className="w-1/3 shrink-0"
                  size="lg"
                >
                  {newRecipeForm.formState.isSubmitting
                    ? "Adding Recipe..."
                    : "Submit Recipe"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-1/3 shrink-0"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
