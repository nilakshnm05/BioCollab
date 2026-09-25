import ProductPreview from "./ProductPreview";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-12 mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="flex-1">
          <p className="text-base font-medium text-primary">
            Scientific collaboration & research workspace
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Bring your scientific work forward.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">
            Discover research, create or join collaboration opportunities, and
            use AI to explore scientific evidence — all in one workspace.
          </p>
          <div className=" mt-4 flex flex-col gap-4 md:flex-row">
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/discover"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-medium text-foreground hover:bg-accent transition-colors"
            >
              Explore Collaborations
            </Link>
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}

export default Hero;
