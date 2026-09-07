import { useForm } from "react-hook-form";
import type { ProfileFormData } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schemas/profileSchema";
import { useFieldArray } from "react-hook-form";
import {useState} from "react";

function EditProfileForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema), defaultValues: {
      name: "",
      headline: "",
      institution: "",
      bio: "",
      researchAreas: [{ value: "" }],
      expertise: [{ value: "" }],
      collaborationInterests: [],
      location: "",
      profileVisibility: "public",
      website: "",
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "researchAreas",
  });
  const {
    fields: expertiseFields,
    append: appendExpertise,
    remove: removeExpertise,
  } = useFieldArray({
    control,
    name: "expertise",
  });
  const {
    fields: interestFields,
    append: appendInterest,
    remove: removeInterest,
  } = useFieldArray({
    control,
    name: "collaborationInterests",
  });

  const [isSaved, setIsSaved] = useState(false);

  function onSubmit(data: ProfileFormData) {
    console.log(data);
    setIsSaved(true);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-2xl flex-col gap-5 p-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep your researcher profile up to date.
        </p>
      </div>

      <label htmlFor="name" className="text-sm font-medium">
        Name
      </label>
      <input
        {...register("name")}
        id="name"
        placeholder="e.g. Dr. Jane Smith"
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {errors.name && (
        <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
      )}

      <label htmlFor="headline" className="text-sm font-medium">
        Headline
      </label>
      <input
        {...register("headline")}
        id="headline"
        placeholder="e.g. Biomedical Researcher"
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {errors.headline && (
        <p className="mt-1 text-xs text-destructive">
          {errors.headline.message}
        </p>
      )}

      <label htmlFor="institution" className="text-sm font-medium">
        Institution
      </label>
      <input
        {...register("institution")}
        id="institution"
        placeholder="e.g. Stanford University"
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {errors.institution && (
        <p className="mt-1 text-xs text-destructive">
          {errors.institution.message}
        </p>
      )}

      <label htmlFor="bio" className="text-sm font-medium">
        Bio
      </label>
      <textarea
        {...register("bio")}
        id="bio"
        placeholder="Tell us about your research background..."
        className="min-h-32 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {errors.bio && (
        <p className="mt-1 text-xs text-destructive">{errors.bio.message}</p>
      )}

      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <label
              htmlFor={`researchAreas-${index}`}
              className="text-sm font-medium"
            >
              Research Area
            </label>
            <input
              {...register(`researchAreas.${index}.value`)}
              id={`researchAreas-${index}`}
              placeholder="e.g. Genomics"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.researchAreas?.[index]?.value?.message && (
              <p className="mt-1 text-xs text-destructive">
                {errors.researchAreas[index]?.value?.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                return remove(index);
              }}
              className="text-xs font-medium text-destructive hover:underline"
            >
              Remove
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          return append({ value: "" });
        }}
        className="text-sm font-medium text-primary hover:underline"
      >
        Add Research Area
      </button>

      {expertiseFields.map((field, index) => {
        return (
          <div key={field.id}>
            <label
              htmlFor={`expertise-${index}`}
              className="text-sm font-medium"
            >
              Expertise
            </label>
            <input
              {...register(`expertise.${index}.value`)}
              id={`expertise-${index}`}
              placeholder="e.g. Bioinformatics"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.expertise?.[index]?.value?.message && (
              <p className="mt-1 text-xs text-destructive">
                {errors.expertise[index]?.value?.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                return removeExpertise(index);
              }}
              className="text-xs font-medium text-destructive hover:underline"
            >
              Remove
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          return appendExpertise({ value: "" });
        }}
        className="text-sm font-medium text-primary hover:underline"
      >
        Add Expertise
      </button>

      <label htmlFor="location" className="text-sm font-medium">
        Location
      </label>
      <input
        {...register("location")}
        id="location"
        placeholder="e.g. Chandigarh, India"
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {errors.location && (
        <p className="mt-1 text-xs text-destructive">
          {errors.location.message}
        </p>
      )}

      {interestFields.map((field, index) => {
        return (
          <div key={field.id}>
            <label
              htmlFor={`collaborationInterests-${index}`}
              className="text-sm font-medium"
            >
              Collaboration Interest
            </label>
            <input
              {...register(`collaborationInterests.${index}.value`)}
              id={`collaborationInterests-${index}`}
              placeholder="e.g. Clinical Research"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.collaborationInterests?.[index]?.value?.message && (
              <p className="mt-1 text-xs text-destructive">
                {errors.collaborationInterests[index]?.value?.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                return removeInterest(index);
              }}
              className="text-xs font-medium text-destructive hover:underline"
            >
              Remove
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          return appendInterest({ value: "" });
        }}
        className="text-sm font-medium text-primary hover:underline"
      >
        Add Collaboration Interest
      </button>

      <label htmlFor="profileVisibility" className="text-sm font-medium">
        Profile Visibility
      </label>
      <select
        {...register("profileVisibility")}
        id="profileVisibility"
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      {errors.profileVisibility && (
        <p className="mt-1 text-xs text-destructive">
          {errors.profileVisibility.message}
        </p>
      )}

      <label htmlFor="website" className="text-sm font-medium">
        Website
      </label>
      <input
        {...register("website")}
        id="website"
        placeholder="https://yourwebsite.com"
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {errors.website && (
        <p className="mt-1 text-xs text-destructive">
          {errors.website.message}
        </p>
      )}

      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Submit
      </button>

      {isSaved && (
        <p className="text-sm text-green-600">Profile saved successfully.</p>
      )}
    </form>
  );
}
export default EditProfileForm;
