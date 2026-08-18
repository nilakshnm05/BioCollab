import { useState } from "react";
import Hero from "./components/Hero";
import StatusPanel from "./components/StatusPanel";
import CollaborationCard from "./components/CollaborationCard";

const collaborations = [
  {
    id: 1,
    title: "Cancer Research",
    description: "phd in oncology required",
  },
  {
    id: 2,
    title: "Drug Discovery",
    description: "Clinical trial expert needed",
  },
  {
    id: 3,
    title: "AI diagnostics",
    description: "AI engineer needed",
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
      {collaborations.length > 0
        ? collaborations.map((collab) => {
            return (
              <CollaborationCard
                key={collab.id}
                id={collab.id}
                title={collab.title}
                description={collab.description}
              />
            );
          })
        : "No Collaboartions Found"}
    </>
  );
}

export default App;
