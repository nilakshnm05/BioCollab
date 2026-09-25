import CreateCollaboration from "@/components/CreateCollaboration";
import { useCollaboration } from "@/context/CollaborationContext";
import { useNavigate, Link } from "react-router-dom";
import type { Collaboration } from "@/types/collaboration";
import { useAuth } from "@/context/AuthContext";

function CreateCollaborationPage() {
  const { addCollaboration } = useCollaboration();
  const { currentMember } = useAuth();
  const navigate = useNavigate();

  function handleCreate(newCollaboration: Collaboration) {
    if (!currentMember) {
      navigate("/login");
      return;
    }

    addCollaboration({
      ...newCollaboration,
      createdByMemberId: currentMember.id,
    });
    
    navigate("/discover");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <Link
        to="/discover"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to Discover
      </Link>

      <CreateCollaboration onCreate={handleCreate} />
    </main>
  );
}

export default CreateCollaborationPage;
