import { Users, BookOpen, Sparkles } from "lucide-react";
const capabilities = [
  {
    title: "Create & join collaborations",
    description:
      "Create an opportunity or discover one that matches your expertise and interests.",
    icon: Users,
  },
  {
    title: "Discover research",
    description:
      "Search and explore scientific research relevant to your work.",
    icon: BookOpen,
  },
  {
    title: "Explore evidence with AI",
    description:
      "Use the AI Research Copilot to understand and synthesize scientific evidence",
    icon: Sparkles,
  },
];
function CoreCapabilities() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-base font-medium text-primary">
            What you can do with BioCollab
          </p>

          <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
            Built around the work you already do.
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            Create opportunities, discover research, and explore evidence
            without switching between separate tools.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className="rounded-xl border border-border bg-background p-6  transition-colors hover:border-primary"
              >
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  {capability.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CoreCapabilities;
