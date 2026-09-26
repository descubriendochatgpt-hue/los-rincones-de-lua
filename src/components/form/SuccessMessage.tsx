"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FORM_TEXT } from "@/content/form";
import { Icon } from "@/components/ui/Icon";

export function SuccessMessage({ headingRef, onRestart }: { headingRef: React.RefObject<HTMLHeadingElement | null>; onRestart: () => void }) {
  const t = FORM_TEXT.success;
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[420px] flex-col items-center justify-center gap-6 py-6 text-center"
      role="status"
    >
      <div className="flex h-32 w-28 items-center justify-center rounded-[999px_999px_20px_20px] bg-salvia-tinte text-salvia-texto">
        <Icon name="check" size={44} strokeWidth={1.8} />
      </div>
      <h3 ref={headingRef} tabIndex={-1} className="font-serif text-5xl leading-[1.05] focus:outline-none">
        {t.title}
      </h3>
      <p className="max-w-[440px] text-[17px] leading-relaxed text-tinta-suave">{t.text}</p>
      <button type="button" onClick={onRestart} className="btn-outline h-[52px] px-7 text-base">
        {t.back}
      </button>
    </motion.div>
  );
}
