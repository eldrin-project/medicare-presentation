import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import Wizard from "./Wizard";
import Layout from "./components/Layout";
import PatientPage from "./pages/PatientPage";
import PracticePage from "./pages/PracticePage";
import ClinicPage from "./pages/ClinicPage";

// Persona selection component
function PersonaSelector() {
  const { lang } = useParams();
  const navigate = useNavigate();

  const handlePersonaSelect = (persona: string) => {
    localStorage.setItem("persona", persona);
    localStorage.setItem("language", lang || "en");
    navigate(`/${lang}/${persona}`);
  };

  return <Wizard step={2} language={lang || "en"} onPersonaSelect={handlePersonaSelect} />;
}

// Dynamic persona page component
function PersonaPage() {
  const { persona } = useParams<{ persona: string }>();

  // Render the appropriate page based on persona
  const renderPage = () => {
    switch (persona) {
      case "patient":
        return <PatientPage />;
      case "practice":
        return <PracticePage />;
      case "clinic":
        return <ClinicPage />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed wizard
    const persona = localStorage.getItem("persona");
    const language = localStorage.getItem("language");

    // If on root path and no preferences set, stay on root to show wizard
    // If preferences exist but on root, redirect to saved preferences
    if (window.location.pathname === "/" && persona && language) {
      navigate(`/${language}/${persona}`, { replace: true });
    }
  }, [navigate]);

  const handleLanguageSelect = (language: string) => {
    navigate(`/${language}`);
  };

  return (
    <Routes>
      {/* Step 1: Language Selection */}
      <Route
        path="/"
        element={
          localStorage.getItem("persona") && localStorage.getItem("language") ? (
            <Navigate
              to={`/${localStorage.getItem("language")}/${localStorage.getItem(
                "persona"
              )}`}
              replace
            />
          ) : (
            <Wizard step={1} onLanguageSelect={handleLanguageSelect} />
          )
        }
      />

      {/* Step 2: Persona Selection at /:lang */}
      <Route
        path="/:lang"
        element={<PersonaSelector />}
      />

      {/* Language + Persona Routes */}
      <Route path="/:lang/:persona" element={<PersonaPage />} />

      {/* Fallback - redirect to wizard if invalid route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
