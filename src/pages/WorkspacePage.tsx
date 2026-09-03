import { useState } from "react";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import WorkspaceSidebar from "@/components/WorkspaceSidebar";
import type { WorkspaceView } from "@/types/workspace";
import OverviewView from "@/components/OverviewView";
import ResearchView from "@/components/ResearchView";
import CollaborationView from "@/components/CollaborationView";
import AiassistantView from "@/components/AiassistantView";

function WorkspacePage() {
  const [activeView, setActiveView] = useState<WorkspaceView>("overview");

  const renderActiveView = (activeView: WorkspaceView) => {
    switch (activeView) {
      case "overview":
        return <OverviewView setActiveView={setActiveView} />;
        case "collaboration":
          return <CollaborationView />;
      case "research":
        return <ResearchView />;
      case "ai":
        return <AiassistantView />;
    }
  };
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      <WorkspaceHeader />
      <div className="grid grid-cols-[240px_1fr]">
        <WorkspaceSidebar
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <main>
          {renderActiveView(activeView)}
        </main>
      </div>
    </div>
  );
}

export default WorkspacePage;
