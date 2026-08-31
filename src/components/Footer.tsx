import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Link to="/" className="font-semibold text-foreground">
            BioCollab
          </Link>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Healthcare & biotech collaboration platform.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          <Link
            to="/discover"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Discover
          </Link>
          <Link
            to="/research"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Research
          </Link>
          <Link
            to="/how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-sm text-muted-foreground">
          © 2026 BioCollab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
