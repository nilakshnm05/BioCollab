function FinalCTA() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-medium text-primary">
            Get started with BioCollab
          </p>

          <h2 className="mt-2 text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Ready to make research easier?
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Find research, discover collaborators, and explore new possibilities
            in one place.
          </p>

          <a
            href="/get-started"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
