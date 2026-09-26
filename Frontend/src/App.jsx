import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MethodSection from "./components/MethodSection";
import RoutinesSection from "./components/RoutinesSection";
import PhilosophySection from "./components/PhilosophySection";
import Footer from "./components/Footer";
import RoutineDialog from "./components/RoutineDialog";
import AuthPage from "./components/AuthPage";
import { routines } from "./data/routines";
import useRoutineTool from "./hooks/useRoutineTool";

function HomePage({ user, onLogout }) {
  const [selectedRoutineId, setSelectedRoutineId] = useState(null);
  const selectedRoutine =
    routines.find((routine) => routine.id === selectedRoutineId) ?? null;
  const openRoutine = useCallback((id) => {
    if (!routines.some((routine) => routine.id === id))
      throw new Error("Rutina no disponible.");
    setSelectedRoutineId(id);
  }, []);
  const closeRoutine = useCallback(() => setSelectedRoutineId(null), []);
  useRoutineTool(openRoutine);

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <main>
        <Hero />
        <MethodSection />
        <RoutinesSection onSelect={openRoutine} />
        <PhilosophySection />
      </main>
      <Footer />
      <RoutineDialog routine={selectedRoutine} onClose={closeRoutine} />
    </>
  );
}

function getViewFromHash() {
  const hash = window.location.hash.slice(1);
  return hash === "login" || hash === "registro" ? hash : "inicio";
}

function getStoredUser() {
  try {
    return JSON.parse(sessionStorage.getItem("kaizen-google-user"));
  } catch {
    return null;
  }
}

export default function App() {
  const [view, setView] = useState(getViewFromHash);
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    const updateView = () => setView(getViewFromHash());
    window.addEventListener("hashchange", updateView);
    return () => window.removeEventListener("hashchange", updateView);
  }, []);

  useEffect(() => {
    const pageName =
      view === "login"
        ? "Iniciar sesión"
        : view === "registro"
          ? "Crear cuenta"
          : "Un pequeño paso. Cada día.";
    document.title = `Kaizen — ${pageName}`;
    if (view !== "inicio" || window.location.hash === "#inicio") {
      window.scrollTo(0, 0);
    }
  }, [view]);

  function handleGoogleSuccess(profile) {
    const googleUser = {
      name: profile.name || profile.email,
      email: profile.email,
      picture: profile.picture,
    };
    sessionStorage.setItem("kaizen-google-user", JSON.stringify(googleUser));
    setUser(googleUser);
    window.location.hash = "inicio";
  }

  function handleLogout() {
    sessionStorage.removeItem("kaizen-google-user");
    setUser(null);
  }

  if (view === "login" || view === "registro") {
    return <AuthPage mode={view} onGoogleSuccess={handleGoogleSuccess} />;
  }

  return <HomePage user={user} onLogout={handleLogout} />;
}
