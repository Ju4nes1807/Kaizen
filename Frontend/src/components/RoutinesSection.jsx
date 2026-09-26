import RoutineCard from "./RoutineCard";
import { routines } from "../data/routines";

export default function RoutinesSection({ onSelect }) {
  return (
    <section className="section routines" id="rutinas">
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / TU PRÓXIMO PASO</p>
          <h2>
            Rutinas que van <em>contigo.</em>
          </h2>
        </div>
        <p>
          Empieza por algo pequeño.
          <br />
          Haz espacio para lo que importa.
        </p>
      </div>
      <div className="routine-grid">
        {routines.map((routine) => (
          <RoutineCard key={routine.id} routine={routine} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
