"use client";

import type { ContractData } from "../contract-wizard";
import { DynamicList, StepHeader } from "../ui";

interface Props {
  data: ContractData;
  update: (fields: Partial<ContractData>) => void;
}

export function StepPruebas({ data, update }: Props) {
  return (
    <div>
      <StepHeader
        number={5}
        title="Pruebas de Aceptación"
        subtitle="Escenarios UAT que validarán la entrega del proyecto"
      />
      <DynamicList
        items={data.escenarios_prueba}
        onChange={(items) => update({ escenarios_prueba: items })}
        placeholder="Escenario de prueba"
        label="Escenarios de prueba (UAT)"
      />
      <div className="mt-6 bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-4">
        <p className="text-xs text-zinc-500 leading-relaxed">
          <span className="text-zinc-400 font-medium">Tip:</span> Define escenarios claros
          y verificables. Ejemplo: &quot;El bot responde el precio correcto de la propiedad&quot;,
          &quot;El bot guarda el lead en la base de datos&quot;, &quot;El bot notifica al agente por WhatsApp&quot;.
        </p>
      </div>
    </div>
  );
}
