import { useEffect, useRef } from "react";

export default function RoutineDialog({ routine, onClose }) {
  const dialogRef = useRef(null);

  // El diálogo nativo conserva foco, navegación con teclado y cierre con Escape.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (routine && !dialog.open) dialog.showModal();
    if (!routine && dialog.open) dialog.close();
  }, [routine]);

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      id="routine-dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onClick={closeOnBackdrop}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <button
        type="button"
        className="close"
        aria-label="Cerrar"
        onClick={onClose}
      >
        ×
      </button>
      <p className="eyebrow">TU PEQUEÑO PASO DE HOY</p>
      <h2 id="dialog-title">{routine?.title}</h2>
      <p id="dialog-description">{routine?.description}</p>
      <ol>
        {routine?.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="dialog-note">
        Prueba esta rutina a tu ritmo. Puedes volver cuando quieras.
      </p>
      <button type="button" className="button" onClick={onClose}>
        Listo, voy a intentarlo <span aria-hidden="true">↗</span>
      </button>
    </dialog>
  );
}
