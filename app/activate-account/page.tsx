import Link from "next/link";
import { SunIcon, CheckIcon } from "../components/icons";

export default function ActivateAccountPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-auth-canvas p-10">
      <div className="w-full max-w-[440px]">
        <div className="w-[58px] h-[58px] rounded-[18px] bg-[linear-gradient(155deg,#f8c3a8,#f2937a)] flex items-center justify-center mb-[22px] shadow-[0_12px_26px_-10px_rgba(238,129,100,0.65)]">
          <SunIcon size={30} className="text-white" />
        </div>
        <h1 className="font-display font-semibold text-[32px] leading-[1.15] mt-0 mb-2 text-ink">
          Bienvenida a OpenDayCare
        </h1>
        <p className="mt-0 mb-[26px] text-ink-soft text-[15.5px] leading-[1.55]">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para
          activar la cuenta.
        </p>

        <div className="flex items-center gap-[14px] bg-white border-[1.5px] border-line-field rounded-[16px] py-[14px] px-4 mb-[22px]">
          <div className="w-11 h-11 rounded-full bg-avatar-child text-avatar-child-ink font-display font-semibold text-[19px] flex items-center justify-center">
            M
          </div>
          <div>
            <div className="text-[13px] text-ink-soft">
              Te invitaron a seguir a
            </div>
            <div className="font-display font-semibold text-[17px] text-ink">
              Mateo · Sala Soles
            </div>
          </div>
        </div>

        <div className="text-xs font-bold tracking-[0.7px] text-ink-soft mb-2">
          CÓDIGO DE INVITACIÓN
        </div>
        <input
          defaultValue="7K4P9"
          className="w-full py-[14px] px-4 rounded-[14px] border-[1.5px] border-line-field bg-white text-[18px] tracking-[3px] font-bold text-ink mb-[18px] font-display"
        />
        <div className="text-xs font-bold tracking-[0.7px] text-ink-soft mb-2">
          EMAIL
        </div>
        <input
          type="email"
          defaultValue="lucia.fernandez@gmail.com"
          className="w-full py-[14px] px-4 rounded-[14px] border-[1.5px] border-line-field bg-white text-[15px] text-ink mb-[18px]"
        />
        <div className="text-xs font-bold tracking-[0.7px] text-ink-soft mb-2">
          CREAR CONTRASEÑA
        </div>
        <input
          type="password"
          defaultValue="contraseña"
          className="w-full py-[14px] px-4 rounded-[14px] border-[1.5px] border-[#f2a78e] bg-white text-[15px] text-ink mb-[18px]"
        />

        <label className="flex items-start gap-3 bg-consent-soft rounded-[14px] py-[14px] px-4 mb-6 cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only" />
          <span className="flex-none w-6 h-6 rounded-[8px] bg-consent flex items-center justify-center mt-px">
            <CheckIcon size={15} className="text-white" />
          </span>
          <span className="text-sm text-consent-ink leading-[1.45]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro
            de la app.
          </span>
        </label>

        <button
          type="button"
          className="block text-center w-full py-[15px] rounded-[15px] bg-[linear-gradient(180deg,#f4977e,#ee8164)] text-white font-extrabold text-base shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)]"
        >
          Activar mi cuenta
        </button>
        <p className="text-center mt-[22px] mb-0 text-ink-soft text-[14.5px]">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-brand-edit font-extrabold">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
