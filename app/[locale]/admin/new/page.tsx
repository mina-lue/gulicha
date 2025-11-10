"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Plus, Upload } from "lucide-react";
import { createListing, uploadListingImages } from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";

// ----------------------
// Zod Schema
// ----------------------
const listingSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  type: z.enum(["rent", "sale"]),
  status: z.enum(["available", "sold", "rented"]),
  location: z.string().min(3, "Location is required"),
  images: z.array(z.string()).default([])
});

export type ListingFormData = z.infer<typeof listingSchema>;

// ----------------------
// Component
// ----------------------
export default function NewListingPage() {
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const router = useRouter();

const {
  register,
  handleSubmit,
  setValue,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(listingSchema),
  defaultValues: {
    currency: 'ETB',
  },
});

  // ----------------------
  // Form Submit
  // ----------------------
  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    setUploading(true);
    try {
      const imageUrls = imageFiles.length
        ? await uploadListingImages(imageFiles)
        : [];

      await createListing({
        ...data,
        images: imageUrls,
      });

      router.push("/en/admin/dashboard");
    } catch (err) {
      console.error("Error adding listing:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-2xl font-semibold">
            <span className="flex items-center gap-1">
              <Plus className="w-6 h-6" /> Create New Listing
            </span>
            <Link href={"/admin/dashboard"}>
              <p className="text-red-600 text-md font-semibold">Cancel</p>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Title */}
            <div className="sm:col-span-2">
              <Input placeholder="Title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <Input
                type="number"
                step="any"
                placeholder="Price"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* Currency */}
            <div>
              <Input placeholder="Currency" {...register("currency")} />
              {errors.currency && (
                <p className="text-red-500 text-sm">{errors.currency.message}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <Select
                onValueChange={(val) => setValue("type", val as "rent" | "sale")}
                defaultValue="rent"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <Select
                onValueChange={(val) =>
                  setValue("status", val as "available" | "sold" | "rented")
                }
                defaultValue="available"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <Input placeholder="Location" {...register("location")} />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <Textarea
                rows={4}
                placeholder="Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="sm:col-span-2 border border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center transition hover:bg-gray-100">
              <Upload className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload property images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="text-sm"
                onChange={(e) =>
                  setImageFiles(Array.from(e.target.files || []))
                }
              />
              {imageFiles.length > 0 && (
                <p className="text-sm text-gray-700 mt-2">
                  {imageFiles.length} file(s) selected
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-4">
              <Button
                type="submit"
                disabled={isSubmitting || uploading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
              >
                {uploading ? "Uploading..." : "Create Listing"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
