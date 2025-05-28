"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { APP_LOGO_URL, APP_TITLE, RELATIVE_PATHS } from "@/lib/constants";
import { deleteIngredient } from "@/lib/server_actions";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

export default function DeleteIngredient({
  ingredientId,
}: {
  ingredientId: string;
}) {
  const dialogCancelref = useRef<HTMLButtonElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleIngredientDelete = (Event: any) =>
    startTransition(async () => {
      try {
        Event.preventDefault();
        const isDeleted = await deleteIngredient(ingredientId);

        if (isDeleted.success) {
          toast.success("Ingredient successfully deleted!", {
            duration: 3000,
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
          toast.error("Error deleting ingredient!", {
            description: isDeleted.error,
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
        }

        dialogCancelref.current?.click();
        router.replace(RELATIVE_PATHS.ingredients);
      } catch (error: any) {
        console.error(error.message);
        toast.error("An error has occurred!", {
          description: error.message,
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
        dialogCancelref.current?.click();
      }
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" disabled title="No unneceesary deletions!">
          <Trash className="h-5 w-5 text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone! This will permanently delete this
            ingredient and remove it from storage!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} ref={dialogCancelref}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleIngredientDelete}
          >
            {isPending ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
