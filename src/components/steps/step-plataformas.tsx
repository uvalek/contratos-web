"use client";

import { motion } from "framer-motion";
import type { ContractData, Plataforma } from "../contract-wizard";
import { FieldLabel, StepHeader } from "../ui";

interface Props {
  data: ContractData;
  update: (fields: Partial<ContractData>) => void;
}

export function StepPlataformas({ data, update }: Props) {
  function updatePlatform(index: number, field: keyof Plataforma, value: string) {
    const updated = [...data.plataformas_cliente];
    updated[index] = { ...updated[index], [field]: value };
    update({ plataformas_cliente: updated });
  }

  function addPlatform() {
    update({
      plataformas_cliente: [
        ...data.plataformas_cliente,
        { nombre: "", costo_aprox: "" },
      ],
    });
  }

  function removePlatform(index: number) {
    update({
      plataformas_cliente: data.plataformas_cliente.filter((_, i) => i !== index),
    });
  }

  return (
    <div>
      <StepHeader
        number={4}
        title="Plataformas del Cliente"
        subtitle="Plataformas que el cliente debe contratar por su cuenta"
      />
      <div>
        <FieldLabel>Plataformas y costos aproximados</FieldLabel>
        <div className="space-y-3">
          {data.plataformas_cliente.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2"
            >
              <input
                value={p.nombre}
                onChange={(e) => updatePlatform(i, "nombre", e.target.value)}
                placeholder="ManyChat Pro"
                className="flex-1 bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-2.5 text-sm text-zinc-100
                  placeholder:text-zinc-600 transition-all duration-200
                  focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
              />
              <input
                value={p.costo_aprox}
                onChange={(e) => updatePlatform(i, "costo_aprox", e.target.value)}
                placeholder="~$15 USD/mes"
                className="w-36 sm:w-44 bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-2.5 text-sm text-zinc-100
                  placeholder:text-zinc-600 transition-all duration-200
                  focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
              />
              {data.plataformas_cliente.length > 1 && (
                <button
                  onClick={() => removePlatform(i)}
                  className="px-2.5 rounded-lg bg-zinc-800/60 border border-zinc-700/40 text-zinc-500 hover:text-red-400 hover:border-red-500/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </motion.div>
          ))}
        </div>
        <button
          onClick={addPlatform}
          className="mt-3 flex items-center gap-1.5 text-xs text-blue-400/70 hover:text-blue-400 transition-colors font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Agregar plataforma
        </button>
      </div>
    </div>
  );
}
