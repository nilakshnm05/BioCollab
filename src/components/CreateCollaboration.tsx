import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collaborationSchema } from "@/schemas/CollaborationSchema";
import type { CollaborationFormData } from "@/schemas/CollaborationSchema";
import type { Collaboration } from "@/types/collaboration";
import { useState } from "react";
import { z } from "zod";

type CreateCollaborationProps = {
  onCreate: (newCollab: Collaboration) => void;
};
function CreateCollaboration({ onCreate }: CreateCollaborationProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<
    z.input<typeof collaborationSchema>,
    any,
    z.output<typeof collaborationSchema>
  >({
    resolver: zodResolver(collaborationSchema),
    defaultValues: {
      title: "",
      description: "",
      researchAreas: [{ value: "" }],
      expertise: [{ value: "" }],
      collaborationType: "",
      status: "",
    },
  });
  const {
    fields: researchAreaFields,
    append: appendResearchArea,
    remove: removeResearchArea,
  } = useFieldArray({
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
  const [isPublished, setIsPublished] = useState(false);
  const onSubmit = (data: CollaborationFormData) => {
    const collaboration: Collaboration = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      researchAreas: data.researchAreas.map((area) => area.value),
      expertise: data.expertise.map((item) => item.value),
      collaborationType: data.collaborationType,
      status: data.status,
    };
    onCreate(collaboration);
    setIsPublished(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-8 flex w-full max-w-2xl flex-col gap-6 rounded-2xl border bg-background p-6 shadow-sm"
    >
      {/* Header */}
      <div className="border-b pb-5">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create a Collaboration
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Share an opportunity and find Members who can contribute to your work.
        </p>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Collaboration Title
        </label>

        <input
          id="title"
          {...register("title")}
          placeholder="e.g. AI-Assisted Drug Discovery"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          What are you working on?
        </label>

        <textarea
          id="description"
          {...register("description")}
          placeholder="Describe the project, problem, or research opportunity..."
          rows={5}
          className="w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Research Areas */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-medium">Research Areas</h2>
          <p className="text-xs text-muted-foreground">
            Add the scientific areas related to this collaboration.
          </p>
        </div>

        <div className="space-y-3">
          {researchAreaFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1">
                <label htmlFor={`researchAreas-${index}`} className="sr-only">
                  Research Area {index + 1}
                </label>

                <input
                  id={`researchAreas-${index}`}
                  {...register(`researchAreas.${index}.value`)}
                  placeholder="e.g. Computational Biology"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                {errors.researchAreas?.[index]?.value && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.researchAreas[index].value.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeResearchArea(index)}
                className="rounded-lg border px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => appendResearchArea({ value: "" })}
          className="w-fit rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          + Add Research Area
        </button>

        {errors.researchAreas?.message && (
          <p className="text-sm text-red-600">{errors.researchAreas.message}</p>
        )}
      </div>

      {/* Expertise */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-medium">Expertise Needed</h2>
          <p className="text-xs text-muted-foreground">
            What skills or knowledge would help with this collaboration?
          </p>
        </div>

        <div className="space-y-3">
          {expertiseFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1">
                <label htmlFor={`expertise-${index}`} className="sr-only">
                  Expertise {index + 1}
                </label>

                <input
                  id={`expertise-${index}`}
                  {...register(`expertise.${index}.value`)}
                  placeholder="e.g. Machine Learning"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                {errors.expertise?.[index]?.value && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.expertise[index].value.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeExpertise(index)}
                className="rounded-lg border px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => appendExpertise({ value: "" })}
          className="w-fit rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          + Add Expertise
        </button>

        {errors.expertise?.message && (
          <p className="text-sm text-red-600">{errors.expertise.message}</p>
        )}
      </div>

      {/* Collaboration Type + Status */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="collaborationType"
            className="block text-sm font-medium"
          >
            Collaboration Type
          </label>

          <select
            id="collaborationType"
            {...register("collaborationType")}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select type</option>
            <option value="research-partner">Research Partner</option>
            <option value="technical-contributor">Technical Contributor</option>
            <option value="data-analysis">Data Analysis</option>
            <option value="other">Other</option>
          </select>

          {errors.collaborationType && (
            <p className="text-sm text-red-600">
              {errors.collaborationType.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>

          <select
            id="status"
            {...register("status")}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="looking">Looking for Collaborations</option>
            <option value="closed">Closed</option>
          </select>

          {errors.status && (
            <p className="text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="border-t pt-5">
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Publish Collaboration
        </button>

        {isPublished && (
          <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            Collaboration published successfully!
          </p>
        )}
      </div>
    </form>
  );
}

export default CreateCollaboration;
