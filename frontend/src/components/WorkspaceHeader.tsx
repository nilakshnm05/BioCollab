import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function WorkspaceHeader() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium ${
      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
    }`;

  const navigate = useNavigate();

  const { logout } = useAuth();

  function onLogOut() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
      <NavLink to="/" className="font-semibold text-foreground">
        BioCollab
      </NavLink>

      <nav className="flex items-center gap-6">
        <NavLink to="/discover" className={navLinkClass}>
          Discover
        </NavLink>

        <NavLink to="/research" className={navLinkClass}>
          Research
        </NavLink>

        <NavLink to="/profile" className={navLinkClass}>
          Profile
        </NavLink>

        <button onClick={onLogOut} >
          Log Out
        </button>
      </nav>
    </header>
  );
}

export default WorkspaceHeader;
