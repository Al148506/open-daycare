"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CLASSROOMS } from "../data/kids";
import { ChevronDownIcon } from "./icons";

const labelClass =
  "text-xs font-extrabold tracking-[0.7px] text-ink-soft mb-2";

const fieldClass =
  "w-full py-[13px] px-4 rounded-[14px] border-[1.5px] border-line-field bg-white text-[15px] text-ink placeholder:text-ink-placeholder";

export default function AddKidForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/kids");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[520px] bg-auth-canvas border border-line rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] overflow-hidden"
    >
      <div className="flex items-center justify-between py-5 px-[26px] border-b border-line">
        <Link
          href="/kids"
          className="text-ink-soft font-bold text-[15px] hover:text-ink transition-colors"
        >
          Cancelar
        </Link>
        <span className="font-display font-semibold text-[18px] text-ink">
          Agregar niño
        </span>
        <button
          type="submit"
          className="text-brand-accent font-extrabold text-[15px] hover:opacity-80 transition-opacity"
        >
          Guardar
        </button>
      </div>

      <div className="p-6 px-[26px]">
        <div className={labelClass}>NOMBRE COMPLETO</div>
        <input
          name="name"
          required
          placeholder="Ej. Martina López"
          className={`${fieldClass} mb-[18px]`}
        />

        <div className="flex gap-[14px] mb-[18px]">
          <div className="flex-1">
            <div className={labelClass}>FECHA DE NACIMIENTO</div>
            <input
              name="birthDate"
              required
              placeholder="dd/mm/aaaa"
              className={fieldClass}
            />
          </div>
          <div className="flex-1">
            <div className={labelClass}>SALA</div>
            <div className="relative">
              <select
                name="classroom"
                required
                defaultValue="Soles"
                aria-label="Sala"
                className={`${fieldClass} font-bold appearance-none cursor-pointer pr-11`}
              >
                {CLASSROOMS.map((classroom) => (
                  <option key={classroom} value={classroom}>
                    {classroom}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="text-ink-placeholder absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className={labelClass}>
          ALERGIAS (ETIQUETAS){" "}
          <span className="font-bold tracking-normal normal-case text-ink-placeholder">
            (opcional)
          </span>
        </div>
        <input
          name="allergies"
          placeholder="Ej. Maní, Lactosa"
          className={`${fieldClass} mb-[18px]`}
        />

        <div className={labelClass}>
          NOTAS MÉDICAS{" "}
          <span className="font-bold tracking-normal normal-case text-ink-placeholder">
            (opcional)
          </span>
        </div>
        <textarea
          name="medicalNotes"
          placeholder="Indicaciones, medicación, contactos…"
          className={`${fieldClass} min-h-[90px] resize-y leading-[1.5]`}
        />
      </div>
    </form>
  );
}
