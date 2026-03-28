"use client";

import type { ContractData } from "../contract-wizard";
import { FieldLabel, TextInput, Select, StepHeader } from "../ui";

interface Props {
  data: ContractData;
  update: (fields: Partial<ContractData>) => void;
}

export function StepCliente({ data, update }: Props) {
  return (
    <div>
      <StepHeader
        number={1}
        title="Datos del Cliente"
        subtitle="Información general del cliente para el contrato"
      />
      <div className="space-y-5">
        <div>
          <FieldLabel>Nombre completo del cliente</FieldLabel>
          <TextInput
            value={data.nombre_cliente}
            onChange={(v) => update({ nombre_cliente: v })}
            placeholder="María López García / Inmobiliaria Los Pinos S.A. de C.V."
          />
        </div>

        <div>
          <FieldLabel>Tipo de cliente</FieldLabel>
          <Select
            value={data.tipo_cliente}
            onChange={(v) => update({ tipo_cliente: v })}
            options={["Persona física", "Persona moral"]}
          />
        </div>

        <div>
          <FieldLabel>Domicilio completo</FieldLabel>
          <TextInput
            value={data.domicilio_cliente}
            onChange={(v) => update({ domicilio_cliente: v })}
            placeholder="Av. Reforma #120, Col. Centro, Tlaxcala, Tlax. C.P. 90000"
          />
        </div>

        <div>
          <FieldLabel>Correo electrónico</FieldLabel>
          <TextInput
            value={data.correo_cliente}
            onChange={(v) => update({ correo_cliente: v })}
            placeholder="maria@inmobiliaria.com"
            type="email"
          />
        </div>
      </div>
    </div>
  );
}
