import CollaborationSection from "@/components/CollaborationSection";
import { collaborations } from "@/data/collaborations.ts";

function DiscoverPage() {
  return <CollaborationSection collabs={collaborations} />;
}

export default DiscoverPage;
