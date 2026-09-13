function ProductPreview() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
      {/* Workspace header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <span className="font-semibold text-foreground">BioCollab</span>

        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
      </div>

      <div className="flex min-h-90">
        {/* Mini sidebar */}
        <aside className="hidden w-36 shrink-0 border-r border-border p-3 sm:block">
          <nav className="space-y-1 text-xs">
            <div className="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground">
              Overview
            </div>

            <div className="rounded-md px-3 py-2 text-muted-foreground">
              Collaboration
            </div>

            <div className="rounded-md px-3 py-2 text-muted-foreground">
              Research
            </div>

            <div className="rounded-md px-3 py-2 text-muted-foreground">
              AI Assistant
            </div>
          </nav>
        </aside>

        {/* Workspace content */}
        <div className="min-w-0 flex-1 p-5">
          <div>
            <p className="text-xs font-medium text-primary">Your workspace</p>

            <h2 className="mt-1 text-lg font-semibold text-foreground">
              Move your research forward
            </h2>
          </div>

          {/* Collaboration */}
          <div className="mt-5 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-primary">
                  Active collaboration
                </p>

                <p className="mt-1 text-sm font-semibold text-foreground">
                  Oncology AI Study
                </p>
              </div>

              <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium text-primary">
                Active
              </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Continue working with your collaborators.
            </p>
          </div>

          {/* Research + AI */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs font-medium text-primary">Research</p>

              <p className="mt-2 text-sm font-medium text-foreground">
                Artificial Intelligence in Clinical Research
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                42 citations · Open access
              </p>
            </div>

            <div className="rounded-xl border border-border bg-accent/30 p-4">
              <p className="text-xs font-medium text-primary">
                AI Research Copilot
              </p>

              <p className="mt-2 text-sm font-medium text-foreground">
                Evidence ready to review
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Explore findings from your research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
