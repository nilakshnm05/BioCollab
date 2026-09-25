import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import DiscoverPage from "./pages/DiscoverPage";
import NotFoundPage from "./components/NotFoundPage";
import ResearchPage from "./pages/ResearchPage";
import WorkspacePage from "./pages/WorkspacePage";
import ProfilePage from "./pages/ProfilePage";
import CreateCollaborationPage from "./pages/CreateCollaborationPage";
import LoginPage from "./pages/LoginPage";
import GetStartedPage from "./pages/GetStartedPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route
        path="/discover/create"
        element={
          <ProtectedRoute>
            <CreateCollaborationPage />
          </ProtectedRoute>
        }
      />
      <Route path="/research" element={<ResearchPage />} />
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/get-started" element={<GetStartedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
