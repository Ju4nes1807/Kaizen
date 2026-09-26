import ProgressCard from "./ProgressCard";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <img
        className="hero-photo"
        src="marcus-aurelius.jpg"
        alt="Estatua de Marco Aurelio"
      />
      <div className="hero-shade"></div>
      <div className="hero-copy">
        <p className="eyebrow">
          <span></span> PEQUEÑOS PASOS. CAMBIOS REALES.
        </p>
        <h1>
          El cambio
          <br />
          empieza
          <br />
          en <em>tu rutina.</em>
        </h1>
        <p className="intro">
          No necesitas cambiarlo todo.
          <br />
          Solo dar un pequeño paso, cada día.
        </p>
        <a href="#rutinas" className="button">
          Descubre tu próximo hábito <span>↗</span>
        </a>
        <div className="hero-note">
          <span className="line"></span> A tu ritmo. Con intención. Sin
          perfección.
        </div>
      </div>
      <ProgressCard />
      <div className="hero-bottom">
        <span>
          改善 <b>KAIZEN</b> · MEJORA CONTINUA
        </span>
        <a href="#metodo">EXPLORA EL MÉTODO ↓</a>
      </div>
    </section>
  );
}
