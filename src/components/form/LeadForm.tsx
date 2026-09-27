"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_STEPS, FORM_TEXT, SERVICE_OPTIONS } from "@/content/form";
import { SITE } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { TONE } from "@/components/ui/tones";
import { cn } from "@/lib/cn";
import { SELECT_PLAN_EVENT, SERVICE_CHANGED_EVENT } from "@/lib/events";
import { labelOf, leadSchema, STEP_FIELDS, type Lead, type LeadInput, type UploadedPhoto } from "@/lib/lead-schema";
import { withRetry } from "@/lib/retry";
import { StepPhotos } from "./StepPhotos";
import { StepRoom } from "./StepRoom";
import { StepSpace } from "./StepSpace";
import { StepYou } from "./StepYou";
import { Stepper } from "./Stepper";
import { SuccessMessage } from "./SuccessMessage";
import { usePhotoUploads } from "./usePhotoUploads";

const DEFAULTS = {
  name: "",
  email: "",
  contact: { phone: "", preference: "whatsapp" },
  childAge: "",
  spaceType: "",
  service: "",
  message: "",
  room: { length: "", width: "", height: "" },
  budget: "no-lo-se",
  postalCode: "",
  town: "",
  photos: [],
  privacy: false,
  website: "",
} as unknown as LeadInput;

// Autoguardado del borrador en este navegador (sin fotos ni consentimiento)
const DRAFT_KEY = "lead-draft-v2";
const readDraft = (): Partial<LeadInput> | null => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const writeDraft = (v: LeadInput) => {
  try {
    const draft: Partial<LeadInput> = { ...v };
    delete draft.photos;
    delete draft.privacy;
    delete draft.website;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {}
};
const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {}
};

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const reduce = useReducedMotion();

  const methods = useForm<LeadInput, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: DEFAULTS,
    mode: "onTouched",
  });
  const { handleSubmit, setValue, trigger, getFieldState, formState, reset, watch } = methods;

  const onPhotosChange = useCallback(
    (photos: UploadedPhoto[]) =>
      setValue("photos", photos, { shouldValidate: getFieldState("photos").isTouched || formState.isSubmitted }),
    [setValue, getFieldState, formState.isSubmitted],
  );
  const uploads = usePhotoUploads(onPhotosChange);

  // Recupera el borrador guardado y guarda cada cambio
  useEffect(() => {
    const draft = readDraft();
    if (draft) reset({ ...DEFAULTS, ...draft, photos: [], privacy: false, website: "" } as LeadInput);
    const sub = watch((values) => writeDraft(values as LeadInput));
    return () => sub.unsubscribe();
  }, [reset, watch]);

  // Avisa a la sección Servicios del servicio elegido para marcar su tarjeta
  const service = watch("service") as string;
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(SERVICE_CHANGED_EVENT, { detail: service }));
  }, [service]);

  // Preselección desde las tarjetas de servicios
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (SERVICE_OPTIONS.some((o) => o.value === id)) setValue("service", id as Lead["service"], { shouldValidate: true });
    };
    window.addEventListener(SELECT_PLAN_EVENT, handler);
    return () => window.removeEventListener(SELECT_PLAN_EVENT, handler);
  }, [setValue]);

  // Al cambiar de paso, lleva el foco al título del paso (teclado y lectores de pantalla)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    document.getElementById("empieza-form")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [step, done, reduce]);

  const last = step === FORM_STEPS.length - 1;

  const next = async () => {
    setSubmitError(null);
    const ok = await trigger(STEP_FIELDS[step] as unknown as (keyof LeadInput)[], { shouldFocus: true });
    if (ok) setStep((s) => s + 1);
  };

  const submit = async (data: Lead) => {
    setSubmitError(null);
    if (uploads.isUploading) return setSubmitError(FORM_TEXT.errors.uploading);
    try {
      await withRetry(
        async () => {
          const res = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new HttpError(res.status, body.error ?? "");
          }
        },
        // Reintenta errores de red y 5xx; los 4xx son datos incorrectos y no mejoran reintentando
        { retries: 2, baseMs: 800, shouldRetry: (e) => !(e instanceof HttpError) || e.status >= 500 },
      );
      clearDraft();
      setDone(true);
    } catch (e) {
      if (e instanceof HttpError && e.status < 500) setSubmitError(e.message || FORM_TEXT.errors.server);
      else if (e instanceof HttpError) setSubmitError(FORM_TEXT.errors.server);
      else setSubmitError(FORM_TEXT.errors.network);
    }
  };

  const restart = () => {
    reset(DEFAULTS);
    uploads.reset();
    setStep(0);
    setDone(false);
    document.getElementById("inicio")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const current = FORM_STEPS[step];
  const photoError = formState.errors.photos?.message ?? formState.errors.photos?.root?.message;

  return (
    <div id="empieza-form" className="scroll-mt-28 rounded-3xl bg-blanco p-5 shadow-(--shadow-md) sm:p-8 md:px-14 md:py-12">
      {done ? (
        <SuccessMessage headingRef={headingRef} onRestart={restart} />
      ) : (
        <FormProvider {...methods}>
          <form
            noValidate
            aria-labelledby="form-step-title"
            onSubmit={(e) => {
              if (!last) {
                e.preventDefault();
                void next();
                return;
              }
              if (uploads.isUploading) {
                e.preventDefault();
                setSubmitError(FORM_TEXT.errors.uploading);
                return;
              }
              void handleSubmit(submit)(e);
            }}
            className="flex flex-col gap-8 md:gap-10"
          >
            <Stepper current={step} />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-7"
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <span aria-hidden className={cn("flex h-[60px] w-[54px] shrink-0 items-center justify-center rounded-[999px_999px_12px_12px] md:h-[72px] md:w-16", TONE[current.tone])}>
                    <Icon name={current.icon} size={28} strokeWidth={1.4} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="hidden text-[13px] text-tinta-suave md:block">
                      Paso {step + 1} de {FORM_STEPS.length}
                      {"note" in current ? ` · ${current.note}` : ""}
                    </p>
                    <h3 id="form-step-title" ref={headingRef} tabIndex={-1} className="font-serif text-[28px] leading-[1.1] focus:outline-none md:text-[34px]">
                      {current.title}
                    </h3>
                  </div>
                </div>

                {step === 0 && service ? (
                  <p className="flex items-center gap-2 rounded-xl bg-salvia-tinte px-4 py-3 text-[15px] text-salvia-texto">
                    <Icon name="check-circle" className="shrink-0" />
                    <span>
                      Servicio elegido: <strong className="font-semibold">{labelOf(SERVICE_OPTIONS, service)}</strong>. Puedes cambiarlo en el paso 2.
                    </span>
                  </p>
                ) : null}
                {step === 0 && <StepYou />}
                {step === 1 && <StepSpace />}
                {step === 2 && <StepRoom />}
                {step === 3 && <StepPhotos uploads={uploads} error={photoError} />}
              </motion.div>
            </AnimatePresence>

            {/* Honeypot anti-spam: oculto para personas */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">No rellenes este campo</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...methods.register("website")} />
            </div>

            {submitError ? (
              <div role="alert" className="rounded-xl border border-error/30 bg-error/5 p-4 text-sm font-medium text-error">
                {submitError}
                {last ? (
                  <span className="mt-1 block font-normal text-verde">
                    También puedes escribirme a{" "}
                    <a className="text-terracota underline" href={`mailto:${SITE.contact.email}`}>
                      {SITE.contact.email}
                    </a>
                    .
                  </span>
                ) : null}
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3 border-t border-arena pt-6">
              {step > 0 ? (
                <button
                  type="button"
                  className="btn h-14 border-[1.5px] border-arena px-5 text-base text-verde md:border-0"
                  onClick={() => {
                    setSubmitError(null);
                    setStep((s) => s - 1);
                  }}
                >
                  <Icon name="arrow-left" size={18} strokeWidth={1.8} className="hidden md:block" />
                  {FORM_TEXT.back}
                </button>
              ) : (
                <p className="hidden text-sm text-tinta-suave sm:block">{FORM_TEXT.autosave}</p>
              )}
              <button
                type="submit"
                className={cn("btn-primary", step > 0 ? "flex-1 md:flex-none" : "w-full sm:w-auto")}
                disabled={formState.isSubmitting || (last && uploads.isUploading)}
              >
                {last ? (formState.isSubmitting ? FORM_TEXT.sending : FORM_TEXT.submit) : FORM_TEXT.next}
                <Icon name="arrow-right" size={18} strokeWidth={1.8} />
              </button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
