const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/+$/, "");

async function request(endpoint, data) {
  const response = await fetch(`${API_URL}/api/usuarios/${endpoint}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errors = Object.values(result).flat().filter(Boolean);
    throw new Error(
      errors.length
        ? errors.join(" ")
        : "No se pudo completar la solicitud. Inténtalo de nuevo.",
    );
  }

  return result;
}

export function registerUser({ first_name, email, password }) {
  return request("registro", { first_name, email, password });
}

export function loginUser({ email, password }) {
  return request("login", { email, password });
}
