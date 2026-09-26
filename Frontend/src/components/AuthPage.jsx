import { useEffect, useState } from "react";
import GoogleAuthButton from "./GoogleAuthButton";

export default function AuthPage({ mode, onGoogleSuccess }) {
  const isRegister = mode === "registro";
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setShowPassword(false);
    setMessage(null);
  }, [mode]);

  function showGoogleConfiguration() {
    setMessage({
      type: "info",
      text: "Añade el Client ID de Google para activar este acceso.",
    });
  }

  function handleEmailSubmit(event) {
    event.preventDefault();
    setMessage({
      type: "info",
      text: isRegister
        ? "El formulario está listo. Falta conectarlo al servicio que guardará las cuentas."
        : "El formulario está listo. Falta conectarlo al servicio que validará tus datos.",
    });
  }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <a
          className="brand"
          href="#inicio"
          aria-label="Kaizen, volver al inicio"
        >
          <img src="logo.png" alt="Kaizen" />
        </a>
        <a className="auth-back" href="#inicio">
          <span aria-hidden="true">←</span>
          <span>Volver al inicio</span>
        </a>
      </header>

      <div className="auth-layout">
        <aside className="auth-story">
          <img
            className="auth-story-photo"
            src="marcus-aurelius.jpg"
            alt="Estatua de Marco Aurelio"
          />
          <div className="auth-story-shade"></div>
          <span className="auth-story-index" aria-hidden="true">
            改善
          </span>
          <div className="auth-story-copy">
            <p className="eyebrow">
              <span></span> TU PROGRESO, A TU RITMO
            </p>
            <h2>
              No tienes que hacerlo todo.
              <br />
              Solo tienes que <em>empezar.</em>
            </h2>
            <div className="auth-story-card">
              <div>
                <small>EL MÉTODO KAIZEN</small>
                <strong>Un pequeño paso. Cada día.</strong>
              </div>
              <div className="auth-story-progress" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </div>
        </aside>

        <main className="auth-main">
          <section className="auth-card" aria-labelledby="auth-title">
            <p className="eyebrow">
              {isRegister ? "TU PRIMER PEQUEÑO PASO" : "BIENVENIDO DE VUELTA"}
            </p>
            <h1 id="auth-title">
              {isRegister ? (
                <>
                  Crea tu espacio.
                  <br />
                  Empieza a <em>avanzar.</em>
                </>
              ) : (
                <>
                  Retoma el ritmo.
                  <br />
                  Sigue <em>avanzando.</em>
                </>
              )}
            </h1>
            <p className="auth-intro">
              {isRegister
                ? "Guarda tus rutinas y convierte cada pequeño avance en parte de tu camino."
                : "Tu progreso sigue aquí. Entra y continúa desde tu último pequeño paso."}
            </p>

            <GoogleAuthButton
              label={
                isRegister ? "Registrarme con Google" : "Continuar con Google"
              }
              onSuccess={onGoogleSuccess}
              onError={(text) => setMessage({ type: "error", text })}
              onUnavailable={showGoogleConfiguration}
            />

            <div className="auth-divider" aria-hidden="true">
              <span></span>
              <small>O CONTINÚA CON TU CORREO</small>
              <span></span>
            </div>

            <form className="auth-form" onSubmit={handleEmailSubmit}>
              {isRegister && (
                <div className="auth-field">
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="¿Cómo quieres que te llamemos?"
                    required
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="password">Contraseña</label>
                <div className="auth-password">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isRegister ? "new-password" : "current-password"
                    }
                    placeholder={
                      isRegister ? "Mínimo 8 caracteres" : "Tu contraseña"
                    }
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              {isRegister ? (
                <p className="auth-legal">
                  Al crear tu cuenta aceptas los términos de uso y la política
                  de privacidad.
                </p>
              ) : (
                <div className="auth-options">
                  <label className="auth-check">
                    <input type="checkbox" name="remember" />
                    <span>Recordarme</span>
                  </label>
                  <button
                    type="button"
                    className="auth-text-button"
                    onClick={() =>
                      setMessage({
                        type: "info",
                        text: "La recuperación se activará al conectar el servicio de autenticación.",
                      })
                    }
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              <button type="submit" className="button auth-submit">
                {isRegister ? "Crear mi cuenta" : "Iniciar sesión"}
                <span aria-hidden="true">↗</span>
              </button>
            </form>

            {message && (
              <p
                className={`auth-message ${message.type}`}
                role={message.type === "error" ? "alert" : "status"}
              >
                {message.text}
              </p>
            )}

            <p className="auth-switch">
              {isRegister
                ? "¿Ya formas parte de Kaizen?"
                : "¿Aún no tienes una cuenta?"}{" "}
              <a href={isRegister ? "#login" : "#registro"}>
                {isRegister ? "Inicia sesión" : "Créala ahora"}
              </a>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
