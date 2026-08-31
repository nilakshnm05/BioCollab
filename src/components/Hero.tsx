import ProductPreview from "./ProductPreview";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-12 mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="flex-1">
          <p className="text-base font-medium text-primary">
            Healthcare & Biotech Collaboration Platform
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Find the right expertise, research, and partners to move science
            forward.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">
            Discover collaboration opportunities, explore research evidence, and
            use AI-assisted tools to navigate scientific knowledge.
          </p>
          <div className=" mt-4 flex flex-col gap-4 md:flex-row">
            <Link
              to="/discover"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Explore Collaborations
            </Link>
            <Link
              to="/research"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-medium text-foreground hover:bg-accent transition-colors"
            >
              Explore Research
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
