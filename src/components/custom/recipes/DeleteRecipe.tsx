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
import { deleteRecipe } from "@/lib/server_actions";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

export default function DeleteRecipe({ recipeId }: { recipeId: string }) {
  const dialogCancelref = useRef<HTMLButtonElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRecipeDelete = (Event: any) =>
    startTransition(async () => {
      try {
        Event.preventDefault();
        const isDeleted = await deleteRecipe(recipeId);

        if (isDeleted.success) {
          toast.success("Recipe successfully deleted!", {
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
          toast.error("Error deleting recipe!", {
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
        router.replace(RELATIVE_PATHS.homePage);
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
        <Button disabled variant="ghost" title="No unneceesary deletions!">
          <Trash className="h-5 w-5 text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone! This will permanently delete this
            recipe and all associated media!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} ref={dialogCancelref}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleRecipeDelete}>
            {isPending ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
