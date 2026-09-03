const navigationItems: { id: WorkspaceView; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "collaboration", label: "Collaboration" },
  { id: "research", label: "Research" },
  { id: "ai", label: "AI Assistant" },
];

import { WorkspaceView } from "@/types/workspace";
type WorkspaceSidebarProps = {
  activeView: WorkspaceView;
  setActiveView: (view: WorkspaceView) => void;
};
function WorkspaceSidebar({
  activeView,
  setActiveView,
}: WorkspaceSidebarProps) {
  return (
    <nav className="h-full border-r border-border bg-background px-4 py-6 text-foreground">
      
      <ul className="flex flex-col gap-2">
        {navigationItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <li key={item.id}>
              <button
                className={`w-full rounded-md px-3 py-2 text-left ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                onClick={() => {
                  setActiveView(item.id);
                }}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default WorkspaceSidebar;
