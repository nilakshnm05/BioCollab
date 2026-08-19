import { useState } from "react";
import Hero from "./components/Hero";
import StatusPanel from "./components/StatusPanel";
import CollaborationSection from "./components/CollaborationSection";
import type { Collaboration } from "@/types/collaboration";

const collaborations: Collaboration[] = [
  {
    id: 1,
    title: "Cancer Research",
    description: "phd in oncology required",
    status: "looking"
  },
  {
    id: 2,
    title: "Drug Discovery",
    description: "Clinical trial expert needed",
    status: "open"
  },
  {
    id: 3,
    title: "AI diagnostics",
    description: "AI engineer needed",
    status: "closed"
  },
];

function App() {
  const [isExploring, setIsExploring] = useState(false);
  function handleExplore() {
    setIsExploring(true);
  }
  return (
    <>
      <Hero
        title="BioCollab"
        description="Healthcare & Biotech Collaboration Platform."
        updateState={handleExplore}
      />
      <StatusPanel exploring={isExploring} />
      <CollaborationSection collabs={collaborations} />
    </>
  );
}

export default App;
