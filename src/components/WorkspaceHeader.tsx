import { Link } from "react-router-dom";

function WorkspaceHeader() {
    return (
      <header className="flex items-center justify-between border-b border-border bg-background text-foreground px-6 py-4">
        <Link to="/" className="font-semibold">
          BioCollab
        </Link>

        <div>Oncology AI Study</div>
      </header>
    );
}

export default WorkspaceHeader;
