import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Wizard from "./Wizard";
import Layout from "./components/Layout";
import PatientPage from "./pages/PatientPage";
import PracticePage from "./pages/PracticePage";
import ClinicPage from "./pages/ClinicPage";
import "./App.css";

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

  const handleWizardComplete = (persona: string, language: string) => {
    localStorage.setItem("persona", persona);
    localStorage.setItem("language", language);
    navigate(`/${language}/${persona}`);
  };

  return (
    <Routes>
      {/* Wizard Route - shown when no preferences */}
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
            <Wizard onComplete={handleWizardComplete} />
          )
        }
      />

      {/* Language + Persona Routes */}
      <Route
        path="/:lang/patient"
        element={
          <Layout>
            <PatientPage />
          </Layout>
        }
      />
      <Route
        path="/:lang/practice"
        element={
          <Layout>
            <PracticePage />
          </Layout>
        }
      />
      <Route
        path="/:lang/clinic"
        element={
          <Layout>
            <ClinicPage />
          </Layout>
        }
      />

      {/* Fallback - redirect to wizard if invalid route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
