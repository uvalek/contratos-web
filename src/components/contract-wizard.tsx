"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepCliente } from "./steps/step-cliente";
import { StepProyecto } from "./steps/step-proyecto";
import { StepPago } from "./steps/step-pago";
import { StepPlataformas } from "./steps/step-plataformas";
import { StepPruebas } from "./steps/step-pruebas";
import { StepCronograma } from "./steps/step-cronograma";
import { StepFirma } from "./steps/step-firma";

export interface Plataforma {
  nombre: string;
  costo_aprox: string;
}

export interface Fase {
  fase: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface ContractData {
  nombre_cliente: string;
  tipo_cliente: string;
  domicilio_cliente: string;
  correo_cliente: string;
  descripcion_proyecto: string;
  funcionalidades: string[];
  exclusiones_extra: string[];
  duracion_implementacion: string;
  monto_implementacion: number | "";
  monto_implementacion_letra: string;
  monto_mantenimiento: number | "";
  monto_mantenimiento_letra: string;
  plataformas_cliente: Plataforma[];
  escenarios_prueba: string[];
  fases_proyecto: Fase[];
  ciudad_firma: string;
  fecha_firma: string;
}

const INITIAL_DATA: ContractData = {
  nombre_cliente: "",
  tipo_cliente: "Persona física",
  domicilio_cliente: "",
  correo_cliente: "",
  descripcion_proyecto: "",
  funcionalidades: [""],
  exclusiones_extra: [""],
  duracion_implementacion: "",
  monto_implementacion: "",
  monto_implementacion_letra: "",
  monto_mantenimiento: "",
  monto_mantenimiento_letra: "",
  plataformas_cliente: [{ nombre: "", costo_aprox: "" }],
  escenarios_prueba: [""],
  fases_proyecto: [{ fase: "", fecha_inicio: "", fecha_fin: "" }],
  ciudad_firma: "Xaloztoc",
  fecha_firma: "",
};

const STEPS = [
  { id: 1, title: "Cliente", icon: "👤" },
  { id: 2, title: "Proyecto", icon: "📋" },
  { id: 3, title: "Pago", icon: "💰" },
  { id: 4, title: "Plataformas", icon: "🔧" },
  { id: 5, title: "Pruebas", icon: "✅" },
  { id: 6, title: "Cronograma", icon: "📅" },
  { id: 7, title: "Firma", icon: "✍️" },
];

const WEBHOOK_URL =
  "https://n8n-n8n.aslx54.easypanel.host/webhook/f7228ba4-c8c9-4c26-88ce-86365eb0208c";

const STORAGE_KEY = "alek-contract-draft";

function loadSavedData(): { data: ContractData; step: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { data: { ...INITIAL_DATA, ...parsed.data }, step: parsed.step ?? 1 };
  } catch {
    return null;
  }
}

export function ContractWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<ContractData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const saved = loadSavedData();
    if (saved) {
      setData(saved.data);
      setStep(saved.step);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every change
  const persist = useCallback((newData: ContractData, newStep: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: newData, step: newStep }));
    } catch { /* quota exceeded — ignore */ }
  }, []);

  useEffect(() => {
    if (hydrated) persist(data, step);
  }, [data, step, hydrated, persist]);

  function updateData(fields: Partial<ContractData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function next() {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 7));
  }

  function prev() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

  function goToStep(target: number) {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...data,
        monto_implementacion: Number(data.monto_implementacion) || 0,
        monto_mantenimiento: Number(data.monto_mantenimiento) || 0,
        funcionalidades: data.funcionalidades.filter((f) => f.trim()),
        exclusiones_extra: data.exclusiones_extra.filter((e) => e.trim()),
        escenarios_prueba: data.escenarios_prueba.filter((e) => e.trim()),
        plataformas_cliente: data.plataformas_cliente.filter(
          (p) => p.nombre.trim()
        ),
        fases_proyecto: data.fases_proyecto.filter((f) => f.fase.trim()),
      };

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar el contrato"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl mx-auto text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8"
        >
          <svg
            className="w-12 h-12 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <h2 className="text-3xl font-bold mb-3 gradient-text">
          Contrato enviado
        </h2>
        <p className="text-zinc-400 text-lg mb-8">
          Los datos se enviaron correctamente al webhook de n8n.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium transition-colors text-white shadow-lg shadow-blue-500/20"
          >
            Revisar y reenviar
          </button>
          <button
            onClick={() => {
              setSubmitted(false);
              setData(INITIAL_DATA);
              setStep(1);
              localStorage.removeItem(STORAGE_KEY);
            }}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors border border-zinc-700"
          >
            Crear otro contrato
          </button>
        </div>
      </motion.div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          <span className="gradient-text">Alek Agency</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-1 font-mono tracking-wider uppercase">
          Generador de Contratos
        </p>
      </motion.div>

      {/* Stepper */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-1 sm:gap-2 mb-8 flex-wrap"
      >
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => goToStep(s.id)}
              className={`
                flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                ${
                  step === s.id
                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/30 glow-active"
                    : step > s.id
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 hover:border-zinc-600"
                }
              `}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`w-4 sm:w-6 h-px mx-0.5 transition-colors duration-300 ${
                  step > s.id ? "bg-emerald-500/40" : "bg-zinc-700/50"
                }`}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Step content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sm:p-8 min-h-[420px] relative overflow-hidden"
      >
        {/* Subtle gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-purple-500/[0.02] pointer-events-none" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {step === 1 && <StepCliente data={data} update={updateData} />}
            {step === 2 && <StepProyecto data={data} update={updateData} />}
            {step === 3 && <StepPago data={data} update={updateData} />}
            {step === 4 && <StepPlataformas data={data} update={updateData} />}
            {step === 5 && <StepPruebas data={data} update={updateData} />}
            {step === 6 && <StepCronograma data={data} update={updateData} />}
            {step === 7 && (
              <StepFirma data={data} update={updateData} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center mt-6"
      >
        <button
          onClick={prev}
          disabled={step === 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all
            disabled:opacity-0 disabled:pointer-events-none
            bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        <span className="text-zinc-600 text-xs font-mono">
          {step} / 7
        </span>

        {step < 7 ? (
          <button
            onClick={next}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all
              bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
          >
            Siguiente
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all
              bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                Enviar contrato
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm text-center mt-4 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
