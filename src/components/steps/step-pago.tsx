"use client";

import type { ContractData } from "../contract-wizard";
import { FieldLabel, TextInput, NumberInput, StepHeader } from "../ui";

interface Props {
  data: ContractData;
  update: (fields: Partial<ContractData>) => void;
}

export function StepPago({ data, update }: Props) {
  return (
    <div>
      <StepHeader
        number={3}
        title="Pago"
        subtitle="Montos de implementación y mantenimiento mensual"
      />
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Monto implementación (MXN)</FieldLabel>
            <NumberInput
              value={data.monto_implementacion}
              onChange={(v) => update({ monto_implementacion: v })}
              placeholder="15000"
            />
          </div>
          <div>
            <FieldLabel>Monto implementación (letra)</FieldLabel>
            <TextInput
              value={data.monto_implementacion_letra}
              onChange={(v) => update({ monto_implementacion_letra: v })}
              placeholder="Quince mil"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Mantenimiento mensual (MXN)</FieldLabel>
            <NumberInput
              value={data.monto_mantenimiento}
              onChange={(v) => update({ monto_mantenimiento: v })}
              placeholder="3000"
            />
          </div>
          <div>
            <FieldLabel>Mantenimiento mensual (letra)</FieldLabel>
            <TextInput
              value={data.monto_mantenimiento_letra}
              onChange={(v) => update({ monto_mantenimiento_letra: v })}
              placeholder="Tres mil"
            />
          </div>
        </div>

        {/* Summary card */}
        {(data.monto_implementacion || data.monto_mantenimiento) && (
          <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-4 mt-2">
            <p className="text-xs text-blue-400/70 uppercase tracking-wider font-medium mb-2">
              Resumen
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Implementación</span>
              <span className="text-zinc-200 font-mono">
                ${Number(data.monto_implementacion || 0).toLocaleString("es-MX")} MXN
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-zinc-400">Mantenimiento /mes</span>
              <span className="text-zinc-200 font-mono">
                ${Number(data.monto_mantenimiento || 0).toLocaleString("es-MX")} MXN
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
