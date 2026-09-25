import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCollaboration } from "@/context/CollaborationContext";
import { useAuth } from "@/context/AuthContext";
import { useResearch } from "@/context/ResearchContext";
import { useState } from "react";

const getStartedSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type GetStartedFormData = z.infer<typeof getStartedSchema>;

function GetStartedPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const collaborationId = searchParams.get("collaborationId");

  const { requests, addRequest, collaborations } = useCollaboration();
  const { registration } = useAuth();

  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetStartedFormData>({
    resolver: zodResolver(getStartedSchema),
  });

  const { pendingUnauthResearch, setPendingUnauthResearch, saveResearch } =
    useResearch();

  function onSubmit(data: GetStartedFormData) {
    try {
      const member = registration({ name: data.name, email: data.email, password: data.password });

      if (pendingUnauthResearch) {
        saveResearch(pendingUnauthResearch);
        setPendingUnauthResearch(null);
      }

      const existingRequest = requests.find(
        (request) =>
          request.collaborationId === Number(collaborationId) &&
          request.memberId === member.id,
      );

      if (collaborationId) {
        const collaboration = collaborations.find(
          (collaboration) => collaboration.id === Number(collaborationId),
        );

        if (
          collaboration?.createdByMemberId !== member.id &&
          !existingRequest
        ) {
          addRequest({
            id: Date.now(),
            collaborationId: Number(collaborationId),
            memberId: member.id,
            status: "pending",
            createdAt: new Date().toISOString(),
          });
        }
      }

      navigate("/workspace");
    } catch {
      setAuthError(
        "Unable to create your account. Please check your details and try again.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
        <div className="w-full">
          <Link to="/" className="text-lg font-semibold">
            BioCollab
          </Link>

          <div className="mt-10">
            <h1 className="text-3xl font-bold">Get started</h1>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Create your BioCollab account and begin exploring scientific
              collaboration.
            </p>

            {authError && <p>{authError}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  {...register("name")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />

                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />

                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  {...register("password")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />

                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />

                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GetStartedPage;
