import { useEffect } from "react";
import { flushSync } from "react-dom";
import { routines } from "../data/routines";

// Compatibilidad opcional de la página original. No requiere plugins ni afecta a
// navegadores que no exponen document.modelContext.
export default function useRoutineTool(openRoutine) {
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const controller = new AbortController();
    try {
      Promise.resolve(
        context.registerTool(
          {
            name: "open_routine",
            description:
              "Abre una rutina de Kaizen y muestra sus pasos. No registra progreso.",
            inputSchema: {
              type: "object",
              properties: {
                routine: {
                  type: "string",
                  enum: routines.map((item) => item.id),
                },
              },
              required: ["routine"],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false },
            execute(input) {
              if (!input || typeof input.routine !== "string")
                throw new Error("Indica una rutina válida.");
              const routine = routines.find(
                (item) => item.id === input.routine,
              );
              if (!routine) throw new Error("Rutina no disponible.");
              flushSync(() => openRoutine(routine.id));
              return {
                routine: routine.id,
                title: routine.title,
                steps: routine.steps,
              };
            },
          },
          { signal: controller.signal },
        ),
      ).catch(() => {});
    } catch {
      /* El registro opcional no bloquea la interfaz. */
    }
    return () => controller.abort();
  }, [openRoutine]);
}
