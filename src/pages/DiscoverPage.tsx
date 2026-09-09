import CollaborationSection from "@/components/CollaborationSection";
import { collaborations } from "@/data/collaborations.ts";
import { useState } from "react";
import type { Collaboration } from "@/types/collaboration.ts";
import CreateCollaboration from "@/components/CreateCollaboration.tsx";

function DiscoverPage() {
  const [collabs, setCollabs] = useState(collaborations);

  function handleCreate(newCollab: Collaboration) {
    setCollabs((prevCollabs) => [...prevCollabs, newCollab]);
  }

  return (
    <>
      <CreateCollaboration onCreate={handleCreate} />
      <CollaborationSection collabs={collabs} />
    </>
  );
}

export default DiscoverPage;
