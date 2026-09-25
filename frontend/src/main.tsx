import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CollaborationProvider } from "@/context/CollaborationContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ResearchProvider } from "./context/ResearchContext";
import { AIProvider } from "./context/AIContext";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CollaborationProvider>
          <ResearchProvider>
            <AIProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AIProvider>
          </ResearchProvider>
        </CollaborationProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
