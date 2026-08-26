import { useState } from "react";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="relative flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
      <div>
        <a href="/" className="font-semibold">
          BioCollab
        </a>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <a
          href="/discover"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Discover
        </a>
        <a
          href="/research"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Research
        </a>
        <a
          href="/how-it-works"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          How It Works
        </a>
        <a
          href="/about"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </a>
      </div>
      <div className="hidden md:block">
        <a
          href="/get-started"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Get Started
        </a>
      </div>
      <button
        type="button"
        className="md:hidden text-foreground"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {isMenuOpen ? "×" : "☰"}
      </button>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full border-t border-border bg-background p-6 flex flex-col gap-4 md:hidden">
          <a
            href="/discover"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Discover
          </a>
          <a
            href="/research"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Research
          </a>
          <a
            href="/how-it-works"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <a
            href="/about"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="/get-started"
            className="w-full inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
