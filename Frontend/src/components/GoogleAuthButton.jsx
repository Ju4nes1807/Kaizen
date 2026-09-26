import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.24c1.9-1.75 2.98-4.33 2.98-7.42Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.9 6.63-2.35l-3.24-2.55c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.63A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.93A6.02 6.02 0 0 1 6.07 12c0-.67.12-1.32.32-1.93V7.44H3.04A10 10 0 0 0 2 12c0 1.64.39 3.19 1.04 4.56l3.35-2.63Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.88A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.96 5.44l3.35 2.63C7.18 7.7 9.39 5.94 12 5.94Z"
      />
    </svg>
  );
}

function ButtonContent({ label, loading }) {
  return (
    <>
      <GoogleMark />
      <span>{loading ? "Conectando con Google..." : label}</span>
    </>
  );
}

function ConfiguredGoogleButton({ label, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const loginWithGoogle = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: async ({ access_token: accessToken }) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        if (!response.ok) throw new Error("No se pudo obtener el perfil.");
        onSuccess(await response.json());
      } catch {
        onError(
          "No pudimos completar el acceso con Google. Inténtalo de nuevo.",
        );
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setLoading(false);
      onError("Google no pudo completar el acceso. Inténtalo de nuevo.");
    },
    onNonOAuthError: () => {
      setLoading(false);
      onError("La ventana de Google se cerró antes de completar el acceso.");
    },
  });

  return (
    <button
      type="button"
      className="auth-google"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        loginWithGoogle();
      }}
    >
      <ButtonContent label={label} loading={loading} />
    </button>
  );
}

export default function GoogleAuthButton({
  label,
  onSuccess,
  onError,
  onUnavailable,
}) {
  if (googleClientId) {
    return (
      <ConfiguredGoogleButton
        label={label}
        onSuccess={onSuccess}
        onError={onError}
      />
    );
  }

  return (
    <button type="button" className="auth-google" onClick={onUnavailable}>
      <ButtonContent label={label} loading={false} />
    </button>
  );
}
