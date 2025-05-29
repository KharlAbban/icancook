import { NEW_RECIPE_TOTAL_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
}

export function NewRecipeStepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 mb-6">
      {Array.from({ length: NEW_RECIPE_TOTAL_STEPS }, (_, i) => i + 1).map(
        (step) => (
          <div key={step} className="flex items-center justify-center">
            <div
              className={cn(
                "w-8 h-8 rounded flex shrink-0 items-center justify-center text-sm font-medium transition-colors",
                step === currentStep
                  ? "bg-orange-500 text-white"
                  : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
              )}
            >
              {step}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
