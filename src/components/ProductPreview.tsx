function ProductPreview() {
  return (
    <div className="w-full rounded-xl border border-border bg-background p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="font-semibold">BioCollab</span>

        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
          <span className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-foreground">
          Find Research and Collaborators
        </p>

        <p className="mt-1 text-sm text-foreground/60">
          Search for research, people, and opportunities to work together.
        </p>
        <div className="mt-4 flex items-center rounded-md border border-border bg-background px-3 py-2">
          <span className="text-sm text-foreground/50">
            Search research, expertise...
          </span>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-background p-4">
          <p className="text-xs font-medium text-primary">
            Collaboration opportunity
          </p>

          <p className="mt-2 text-sm font-semibold text-foreground">
            Looking for partners in healthcare AI
          </p>

          <p className="mt-1 text-xs text-foreground/60">
            A research team is looking for people to work on AI tools for
            healthcare.
          </p>
          <div className="mt-4 rounded-md bg-accent p-3">
            <p className="text-xs font-medium text-primary">AI insight</p>

            <p className="mt-1 text-xs text-foreground/70">
              We found similar research and possible partners you may want to
              explore.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-background p-3">
          <p className="text-xs font-medium text-primary">Research evidence</p>

          <p className="mt-2 text-sm font-medium text-foreground">
            New research on AI in healthcare
          </p>

          <p className="mt-1 text-xs text-foreground/60">
            Explore recent studies and see how they relate to your work.
          </p>
        </div>
      </div>
    </div>
  );
}
export default ProductPreview;
