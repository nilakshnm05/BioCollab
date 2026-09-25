import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  headline: z.string().min(3, "Headline must be at least 3 characters"),
  institution: z.string().min(5, "Institution must be at least 5 characters"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  researchAreas: z.array(
    z.object({ value: z.string().min(1, "Research area must not be empty") }),
  ),
  expertise: z.array(
    z.object({ value: z.string().min(1, "Expertise must not be empty") }),
  ),
  location: z.string().optional(),
  collaborationInterests: z
    .array(
      z.object({
        value: z.string().min(1, "Collaboration interest must not be empty"),
      }),
    )
    .optional(),
  profileVisibility: z.enum(["public", "private"]),
  website: z.union([z.url(), z.literal("")]),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
