"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-zinc-100
        placeholder:text-zinc-600 transition-all duration-200
        focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10"
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-zinc-100
        placeholder:text-zinc-600 transition-all duration-200 resize-none
        focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10"
    />
  );
}

export function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value: number | "";
  onChange: (v: number | "") => void;
  placeholder?: string;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) =>
        onChange(e.target.value === "" ? "" : Number(e.target.value))
      }
      placeholder={placeholder}
      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-zinc-100
        placeholder:text-zinc-600 transition-all duration-200
        focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-zinc-100
        transition-all duration-200 cursor-pointer
        focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function StepHeader({
  number,
  title,
  subtitle,
}: {
  number: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-mono text-blue-400/60">
          0{number}
        </span>
        <h2 className="text-xl font-bold text-zinc-100">{title}</h2>
      </div>
      <p className="text-sm text-zinc-500 pl-8">{subtitle}</p>
    </div>
  );
}

export function DynamicList({
  items,
  onChange,
  placeholder,
  label,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  label: string;
}) {
  function add() {
    onChange([...items, ""]);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function update(index: number, value: string) {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-2"
          >
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={`${placeholder} ${i + 1}`}
              className="flex-1 bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-2.5 text-sm text-zinc-100
                placeholder:text-zinc-600 transition-all duration-200
                focus:border-blue-500/50 focus:bg-zinc-800 focus:ring-2 focus:ring-blue-500/10"
            />
            {items.length > 1 && (
              <button
                onClick={() => remove(i)}
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
        onClick={add}
        className="mt-2 flex items-center gap-1.5 text-xs text-blue-400/70 hover:text-blue-400 transition-colors font-medium"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Agregar
      </button>
    </div>
  );
}
