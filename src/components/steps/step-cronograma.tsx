"use client";

import { motion } from "framer-motion";
import type { ContractData, Fase } from "../contract-wizard";
import { FieldLabel, StepHeader } from "../ui";

interface Props {
  data: ContractData;
  update: (fields: Partial<ContractData>) => void;
}

export function StepCronograma({ data, update }: Props) {
  function updateFase(index: number, field: keyof Fase, value: string) {
    const updated = [...data.fases_proyecto];
    updated[index] = { ...updated[index], [field]: value };
    update({ fases_proyecto: updated });
  }

  function addFase() {
    update({
      fases_proyecto: [
        ...data.fases_proyecto,
        { fase: "", fecha_inicio: "", fecha_fin: "" },
      ],
    });
  }

  function removeFase(index: number) {
    update({
      fases_proyecto: data.fases_proyecto.filter((_, i) => i !== index),
    });
  }

  return (
    <div>
      <StepHeader
        number={6}
        title="Cronograma"
        subtitle="Fases del proyecto con fechas de inicio y fin"
      />
      <div>
        <FieldLabel>Fases con fechas</FieldLabel>
        <div className="space-y-3">
          {data.fases_proyecto.map((fase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-800/30 border border-zinc-700/40 rounded-xl p-3 space-y-2"
            >
              <div className="flex gap-2 items-center">
                <span className="text-xs font-mono text-zinc-600 w-6 shrink-0">
                  #{i + 1}
                </span>
                <input
                  value={fase.fase}
                  onChange={(e) => updateFase(i, "fase", e.target.value)}
                  placeholder="Nombre de la fase"
                  className="flex-1 bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-3 py-2 text-sm text-zinc-100
                    placeholder:text-zinc-600 transition-all duration-200
                    focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
                />
                {data.fases_proyecto.length > 1 && (
                  <button
                    onClick={() => removeFase(i)}
                    className="px-2 py-1 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex gap-2 pl-8">
                <div className="flex-1">
                  <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Inicio</span>
                  <input
                    type="date"
                    value={fase.fecha_inicio}
                    onChange={(e) => updateFase(i, "fecha_inicio", e.target.value)}
                    className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-3 py-1.5 text-sm text-zinc-100
                      transition-all duration-200
                      focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10 focus:outline-none
                      [color-scheme:dark]"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Fin</span>
                  <input
                    type="date"
                    value={fase.fecha_fin}
                    onChange={(e) => updateFase(i, "fecha_fin", e.target.value)}
                    className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-3 py-1.5 text-sm text-zinc-100
                      transition-all duration-200
                      focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10 focus:outline-none
                      [color-scheme:dark]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={addFase}
          className="mt-3 flex items-center gap-1.5 text-xs text-blue-400/70 hover:text-blue-400 transition-colors font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Agregar fase
        </button>
      </div>
    </div>
  );
}
