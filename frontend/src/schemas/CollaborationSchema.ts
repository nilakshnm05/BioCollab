import { z } from "zod";

export const collaborationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please enter a collaboration title.")
    .max(100, "Title must be 100 characters or less."),
  description: z
    .string()
    .trim()
    .min(1, "Please describe what you are working on.")
    .max(1000, "Description should be 1000 characters or less."),
  researchAreas: z
    .array(
      z.object({
        value: z.string().trim().min(1, "Research area cannot be empty."),
      }),
    )
    .min(1, "Add at least one research area."),
  expertise: z
    .array(
      z.object({
        value: z.string().trim().min(1, "Expertise cannot be empty."),
      }),
    )
    .min(1, "Add at least one area of expertise."),
  collaborationType: z
    .string()
    .min(1, "Please select a collaboration type.")
    .pipe(
      z.enum([
        "research-partner",
        "technical-contributor",
        "data-analysis",
        "other",
      ]),
    ),

  status: z
    .string()
    .min(1, "Please select a collaboration status.")
    .pipe(z.enum(["open", "looking", "closed"])),
});

export type CollaborationFormData = z.infer<typeof collaborationSchema>;
