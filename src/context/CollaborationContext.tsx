import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { CollaborationRequest } from "@/types/collaborationRequest";

type CollaborationContextType = {
  requests: CollaborationRequest[];
  addRequest: (request: CollaborationRequest) => void;
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
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);

  function addRequest(request: CollaborationRequest) {
    setRequests((prevRequests) => [...prevRequests, request]);
  }

  return (
    <CollaborationContext.Provider value={{ requests, addRequest }}>
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