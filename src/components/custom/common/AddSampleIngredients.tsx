"use client";

import { Button } from "@/components/ui/button";
import { addSampleIngredients } from "@/lib/server_actions";
import { Vegan } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddSampleIngredients() {
  const [isPending, startTransition] = useTransition();

  const handleSampleIngredients = () =>
    startTransition(async () => {
      const addEm = await addSampleIngredients();

      if (addEm.success) {
        toast.success("Added sample ingredients!");
      } else {
        toast.error(`Error: ${addEm.error}`);
      }
    });

  return (
    <Button onClick={handleSampleIngredients} disabled={isPending}>
      Add Sample Ingredients <Vegan />
    </Button>
  );
}
