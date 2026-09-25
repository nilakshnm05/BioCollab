import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";
import type {
  CollaborationRequest,
  CollaborationRequestStatus,
} from "@/types/collaborationRequest";
import { collaborations as initialCollaborations } from "@/data/collaborations";
import type { Collaboration } from "@/types/collaboration";

type CollaborationContextType = {
  collaborations: Collaboration[];
  addCollaboration: (collaboration: Collaboration) => void;
  requests: CollaborationRequest[];
  addRequest: (request: CollaborationRequest) => void;
  updateRequestStatus: (
    requestId: number,
    status: CollaborationRequestStatus,
  ) => void;
};

const CollaborationContext = createContext<
  CollaborationContextType | undefined
>(undefined);

type CollaborationProviderProps = {
  children: ReactNode;
};
export function CollaborationProvider({
  children,
}: CollaborationProviderProps) {
  const [collaborations, setCollaborations] = useState<Collaboration[]>(
    initialCollaborations,
  );
  function addCollaboration(collaboration: Collaboration) {
    setCollaborations((prevCollabs) => {
      return [...prevCollabs, collaboration];
    });
  }

  const [requests, setRequests] = useState<CollaborationRequest[]>([]);

 function addRequest(request: CollaborationRequest) {
   console.log("ADDING REQUEST:", request);

   setRequests((prevRequests) => {
     const nextRequests = [...prevRequests, request];

     console.log("REQUESTS AFTER ADD:", nextRequests);

     return nextRequests;
   });
 }

  function updateRequestStatus(
    requestId: number,
    status: CollaborationRequestStatus,
  ) {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status } : request,
      ),
    );
  }

  return (
    <CollaborationContext.Provider
      value={{
        collaborations,
        addCollaboration,
        requests,
        addRequest,
        updateRequestStatus,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
}

export function useCollaboration() {
  const context = useContext(CollaborationContext);

  if (!context) {
    throw new Error(
      "useCollaboration must be used within CollaborationProvider",
    );
  }

  return context;
}
