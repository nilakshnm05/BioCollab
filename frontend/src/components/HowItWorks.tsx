function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-base font-medium text-primary">
            How BioCollab works
          </p>

          <h2 className="mt-2 text-3xl font-bold text-foreground leading-tight md:text-4xl">
            How your work moves through BioCollab
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            Move from an opportunity to an active collaboration and continue
            your work in one workspace.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div>
            <span className="text-sm font-medium text-muted-foreground">
              01
            </span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Start with an opportunity
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Create a collaboration opportunity around your work, or discover
              an existing opportunity that interests you.
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">
              02
            </span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Build the connection
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Express interest, review collaboration requests, and move from an
              initial connection toward an active collaboration.
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">
              03
            </span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Continue in your workspace
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Once you're working together, keep your collaboration, research,
              and evidence in one workspace.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Opportunity</span>
            <span>→</span>
            <span>Connection</span>
            <span>→</span>
            <span>Active Work</span>
            <span>→</span>
            <span>Workspace</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
