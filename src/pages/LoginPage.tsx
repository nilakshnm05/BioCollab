import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCollaboration } from "@/context/CollaborationContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const collaborationId = searchParams.get("collaborationId");

  const { requests, addRequest, collaborations } = useCollaboration();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [authError, setAuthError] = useState<string | null>(null);

  function onSubmit(data: LoginFormData) {
    try {
      const member = login(data);

      const existingRequest = requests.find(
        (request) =>
          request.collaborationId === Number(collaborationId) &&
          request.memberId === member.id,
      );

      if (collaborationId) {
        const collaboration = collaborations.find(
          (collaboration) => collaboration.id === Number(collaborationId),
        );

        if (collaboration?.createdByMemberId !== member.id && !existingRequest) {
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
      setAuthError("Invalid email or password");
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
            <h1 className="text-3xl font-bold">Log in</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue to BioCollab.
            </p>

            {authError && <p>{authError}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
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
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />

                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Log in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to={
                  collaborationId
                    ? `/get-started?collaborationId=${collaborationId}`
                    : `/get-started`
                }
                className="font-medium text-primary hover:underline"
              >
                Get started
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
