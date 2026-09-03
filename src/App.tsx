import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import DiscoverPage from "./pages/DiscoverPage";
import NotFoundPage from "./components/NotFoundPage";
import ResearchPage from "./pages/ResearchPage";
import WorkspacePage from "./pages/WorkspacePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/workspace" element={<WorkspacePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
