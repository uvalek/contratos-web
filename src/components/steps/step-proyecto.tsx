"use client";

import type { ContractData } from "../contract-wizard";
import { FieldLabel, TextArea, TextInput, DynamicList, StepHeader } from "../ui";

interface Props {
  data: ContractData;
  update: (fields: Partial<ContractData>) => void;
}

export function StepProyecto({ data, update }: Props) {
  return (
    <div>
      <StepHeader
        number={2}
        title="Proyecto"
        subtitle="Descripción del alcance y funcionalidades del proyecto"
      />
      <div className="space-y-5">
        <div>
          <FieldLabel>Descripción del proyecto</FieldLabel>
          <TextArea
            value={data.descripcion_proyecto}
            onChange={(v) => update({ descripcion_proyecto: v })}
            placeholder="Chatbot con IA para atención de prospectos de compra de casas en Tlaxcala"
            rows={3}
          />
        </div>

        <DynamicList
          items={data.funcionalidades}
          onChange={(items) => update({ funcionalidades: items })}
          placeholder="Funcionalidad"
          label="Funcionalidades incluidas"
        />

        <DynamicList
          items={data.exclusiones_extra}
          onChange={(items) => update({ exclusiones_extra: items })}
          placeholder="Exclusión"
          label="Exclusiones adicionales (opcional)"
        />

        <div>
          <FieldLabel>Duración estimada</FieldLabel>
          <TextInput
            value={data.duracion_implementacion}
            onChange={(v) => update({ duracion_implementacion: v })}
            placeholder="4 semanas"
          />
        </div>
      </div>
    </div>
  );
}
