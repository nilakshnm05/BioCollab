import { Users, BookOpen, Sparkles } from "lucide-react";
const capabilities = [
  {
    title: "Find collaborators",
    description: "Find people and opportunities to work together.",
    icon: Users,
  },
  {
    title: "Explore research",
    description: "Discover research relevant to your work.",
    icon: BookOpen,
  },
  {
    title: "Use AI tools",
    description: "Use AI to make scientific information easier to explore.",
    icon: Sparkles,
  },
];
function CoreCapabilities() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-base font-medium text-primary">
            What BioCollab helps you do
          </p>

          <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
            Find people, research, and tools to move your work forward.
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            Explore scientific knowledge, connect with the right people, and use
            AI to make research easier to navigate.
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
