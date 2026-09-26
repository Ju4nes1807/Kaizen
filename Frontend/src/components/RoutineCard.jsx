export default function RoutineCard({ routine, onSelect }) {
  return (
    <button
      type="button"
      className={`routine${routine.featured ? " featured" : ""}`}
      onClick={() => onSelect(routine.id)}
      aria-haspopup="dialog"
    >
      <img src={routine.image} alt={routine.imageAlt} loading="lazy" />
      <span className="tag">{routine.category}</span>
      <div>
        <span className="duration">{routine.duration}</span>
        <h3>{routine.title}</h3>
        <p>{routine.summary}</p>
      </div>
      <span className="round-arrow" aria-hidden="true">
        ↗
      </span>
    </button>
  );
}
