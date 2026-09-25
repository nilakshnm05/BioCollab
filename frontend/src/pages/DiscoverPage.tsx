import CollaborationSection from "@/components/CollaborationSection";
import { useCollaboration } from "@/context/CollaborationContext";

function DiscoverPage() {
  const { collaborations } = useCollaboration();
  return <CollaborationSection collabs={collaborations} />;
}

export default DiscoverPage;
