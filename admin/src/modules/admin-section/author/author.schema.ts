"use client";
import { z } from "zod";
import multiLang from "@/components/molecules/multiLang.json";

export const statusUpdateSchema = z.object({
    id: z.string(),
});

export type statusUpdateData = z.infer<typeof statusUpdateSchema> & {
    id: string;
    status: boolean | number | null | string;
};


const baseSchema = {
    name_df: z
        .string()
        .min(2, "Author name must be at least 2 characters long"),
    bio: z.string().optional(),
    born_date: z.string().optional(),
    death_date: z.string().optional(),
};


const dynamicFields = multiLang
    .filter((lang) => lang.id !== "df")
    .reduce((fields, lang) => {
        fields[`name_${lang.id}`] = z.string().optional();
        return fields;
    }, {} as Record<string, z.ZodTypeAny>);

const combinedSchema = z.object({
  ...baseSchema,
  ...dynamicFields,
});

export const authorSchema = combinedSchema
  .refine(
    (data) => {
      if (data.born_date && data.death_date) {
        return (
          new Date(data.death_date) >=
          new Date(data.born_date)
        );
      }
      return true; // Skip validation if either field is missing
    },
    {
      message:
        "Death date must be later than or equal to born date",
      path: ["death_date"], // Attach the error to the available_time_ends field
    }
  );

export type AuthorFormData = z.infer<typeof authorSchema>;