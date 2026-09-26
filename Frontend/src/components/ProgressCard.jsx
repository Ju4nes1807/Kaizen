export default function ProgressCard() {
  return (
    <aside className="progress">
      <div className="progress-top">
        <span>ASÍ SE VE EL PROGRESO</span>
        <span className="demo">Ejemplo</span>
      </div>
      <div className="progress-body">
        <div>
          <strong>Un día más.</strong>
          <p>Una mejor versión de ti.</p>
        </div>
        <div className="ring">
          <span>
            75<small>%</small>
          </span>
        </div>
      </div>
      <div className="progress-bottom">
        <span>Tu semana</span>
        <div className="days">
          <i>L</i>
          <i>M</i>
          <i>X</i>
          <i>J</i>
          <i>V</i>
          <i className="today">S</i>
          <i className="off">D</i>
        </div>
      </div>
    </aside>
  );
}
