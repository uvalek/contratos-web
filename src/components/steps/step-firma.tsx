"use client";

import type { ContractData } from "../contract-wizard";
import { FieldLabel, TextInput, StepHeader } from "../ui";

interface Props {
  data: ContractData;
  update: (fields: Partial<ContractData>) => void;
}

export function StepFirma({ data, update }: Props) {
  return (
    <div>
      <StepHeader
        number={7}
        title="Firma"
        subtitle="Datos finales para la firma del contrato"
      />
      <div className="space-y-5">
        <div>
          <FieldLabel>Ciudad de firma</FieldLabel>
          <TextInput
            value={data.ciudad_firma}
            onChange={(v) => update({ ciudad_firma: v })}
            placeholder="Xaloztoc"
          />
        </div>

        <div>
          <FieldLabel>Fecha de firma</FieldLabel>
          <input
            type="date"
            value={data.fecha_firma}
            onChange={(e) => update({ fecha_firma: e.target.value })}
            className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-zinc-100
              transition-all duration-200
              focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10 focus:outline-none
              [color-scheme:dark]"
          />
        </div>

        {/* Summary card */}
        <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-5 mt-4">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-3">
            Resumen del contrato
          </p>
          <div className="space-y-2 text-sm">
            <Row label="Cliente" value={data.nombre_cliente || "—"} />
            <Row label="Tipo" value={data.tipo_cliente} />
            <Row label="Proyecto" value={truncate(data.descripcion_proyecto, 60) || "—"} />
            <Row
              label="Implementación"
              value={data.monto_implementacion ? `$${Number(data.monto_implementacion).toLocaleString("es-MX")} MXN` : "—"}
            />
            <Row
              label="Mantenimiento"
              value={data.monto_mantenimiento ? `$${Number(data.monto_mantenimiento).toLocaleString("es-MX")} MXN/mes` : "—"}
            />
            <Row label="Duración" value={data.duracion_implementacion || "—"} />
            <Row label="Ciudad" value={data.ciudad_firma || "—"} />
            <Row label="Fecha" value={data.fecha_firma || "—"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className="text-zinc-200 font-mono text-xs">{value}</span>
    </div>
  );
}

function truncate(str: string, max: number) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}
