"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newIngredientFormValuesType } from "@/lib/types";
import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface FormImagesInputProps {
  form: UseFormReturn<newIngredientFormValuesType>;
}

export default function FormImagesInput({ form }: FormImagesInputProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);

    setImages((prev) => {
      const slotsLeft = Math.max(5 - prev.length, 0);

      const filesToAdd = newFiles.slice(0, slotsLeft); // Array.slice to cap length :contentReference[oaicite:1]{index=1}

      const updated = [...prev, ...filesToAdd];

      form.setValue("ingredientImages", updated);

      return updated;
    });

    setPreviewUrls((prevUrls) => {
      const slotsLeft = Math.max(5 - prevUrls.length, 0);
      const urlsToAdd = newFiles
        .slice(0, slotsLeft)
        .map((file) => URL.createObjectURL(file));

      return [...prevUrls, ...urlsToAdd];
    });
  };

  const removeImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);

    // update form
    form.setValue("ingredientImages", updatedFiles);

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  return (
    <FormField
      control={form.control}
      name="ingredientImages"
      render={() => (
        <FormItem>
          <FormLabel className="text-gray-500 text-sm">
            Ingredient Images
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 border">
                <CardContent className="flex flex-col items-center justify-center text-center pb-2">
                  <div className="mb-4 mt-2 rounded-full bg-muted p-2">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Upload clear, HD images in portrait mode. Upload up to 5
                    images
                  </p>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("images")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select Images
                  </Button>
                </CardContent>
              </div>

              {previewUrls.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Images ({previewUrls.length})</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-[9/14] rounded border bg-muted"
                      >
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="rounded-md object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
