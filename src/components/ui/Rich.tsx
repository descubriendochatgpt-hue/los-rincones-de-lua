import { Fragment } from "react";

/** Pinta un texto marcando *entre asteriscos* la parte en cursiva. */
export function Rich({ text, emClassName = "" }: { text: string; emClassName?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className={`italic ${emClassName}`}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
