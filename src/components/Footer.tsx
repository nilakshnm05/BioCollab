function Footer() {
  return (
    <footer className="bg-background">
      <div className="border-t border-border mx-auto max-w-7xl px-6 py-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="/" className="font-semibold text-foreground">
            BioCollab
          </a>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Healthcare & biotech collaboration platform.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          <a
            href="/discover"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Discover
          </a>
          <a
            href="/research"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Research
          </a>
          <a
            href="/how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </a>
          <a
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
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
