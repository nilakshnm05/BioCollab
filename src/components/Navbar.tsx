import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="relative flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
      <div>
        <Link to="/" className="font-semibold">
          BioCollab
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/discover"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Discover
        </Link>
        <Link
          to="/research"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Research
        </Link>
        <Link
          to="/workspace"
          className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          WorkSpace
        </Link>
        <Link
          to="/how-it-works"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          How It Works
        </Link>
        <Link
          to="/about"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </Link>
      </div>
      <div className="hidden md:block">
        <Link
          to="/get-started"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Get Started
        </Link>
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
          <Link
            to="/discover"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Discover
          </Link>
          <Link
            to="/research"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Research
          </Link>
          <Link
            to="/workspace"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            WorkSpace
          </Link>
          <Link
            to="/how-it-works"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            to="/get-started"
            className="w-full inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
