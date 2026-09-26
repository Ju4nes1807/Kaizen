export default function Header({ user, onLogout }) {
  const firstName = user?.name?.split(" ")[0];

  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Kaizen, inicio">
        <img src="logo.png" alt="Kaizen" />
      </a>
      <nav aria-label="Navegación principal">
        <a href="#metodo">El método</a>
        <a href="#rutinas">Rutinas</a>
        <a href="#filosofia">Nuestra filosofía</a>
      </nav>
      {user ? (
        <div className="header-user">
          {user.picture && (
            <img src={user.picture} alt="" referrerPolicy="no-referrer" />
          )}
          <span>
            Hola, <strong>{firstName}</strong>
          </span>
          <button type="button" onClick={onLogout}>
            Salir
          </button>
        </div>
      ) : (
        <div className="header-actions">
          <a className="header-login" href="#login">
            Iniciar sesión
          </a>
          <a className="button small" href="#registro">
            Crear cuenta <span>↗</span>
          </a>
        </div>
      )}
    </header>
  );
}
