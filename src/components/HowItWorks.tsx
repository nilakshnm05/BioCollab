function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-base font-medium text-primary">How BioCollab works</p>

          <h2 className="mt-2 text-3xl font-bold text-foreground leading-tight md:text-4xl">
            Find what you need, without the hassle.
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            Search for research, discover people with useful expertise, and find
            opportunities to work together.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div>
            <span className="text-sm font-medium text-muted-foreground">01</span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">Find</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Search for research, people, and collaboration opportunities.
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">02</span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Explore
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Learn about research and find information that matches your
              interests.
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">03</span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Connect
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Reach out to people and teams who can help move your work forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
