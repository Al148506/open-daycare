import Link from "next/link";
import { SunIcon } from "../components/icons";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[1.05fr_1fr] bg-auth-canvas">
      <div className="hidden md:flex relative overflow-hidden bg-[linear-gradient(155deg,#f6a98e_0%,#f2937a_45%,#ec7e62_100%)] flex-col justify-between px-[60px] py-14 text-white">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-white/12 -top-[140px] -right-[120px]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 -bottom-[110px] -left-[80px]" />
        <div className="flex items-center gap-[13px] relative">
          <div className="w-[46px] h-[46px] rounded-[14px] bg-white/22 flex items-center justify-center">
            <SunIcon size={26} className="text-white" />
          </div>
          <span className="font-display font-semibold text-[21px] tracking-[0.5px]">
            OpenDayCare
          </span>
        </div>
        <div className="relative">
          <h1 className="font-display font-semibold text-[42px] leading-[1.12] mt-0 mb-[18px]">
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="text-[17px] leading-[1.6] mt-0 mb-0 max-w-[430px] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>
        <div className="relative text-sm text-white/90">
          🌿 Guardería Sala Soles
        </div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[392px]">
          <h2 className="font-display font-semibold text-[30px] mt-0 mb-[6px] text-ink">
            Iniciar sesión
          </h2>
          <p className="mt-0 mb-7 text-ink-soft text-[15px]">
            Ingresá para ver el día de hoy.
          </p>

          <div className="text-xs font-bold tracking-[0.7px] text-ink-soft mb-2">
            EMAIL
          </div>
          <input
            type="email"
            className="w-full py-[14px] px-4 rounded-[14px] border-[1.5px] border-line-field bg-white text-[15px] text-ink mb-[18px]"
          />
          <div className="text-xs font-bold tracking-[0.7px] text-ink-soft mb-2">
            CONTRASEÑA
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full py-[14px] px-4 rounded-[14px] border-[1.5px] border-line-field bg-white text-[15px] text-ink mb-2.5"
          />
          <div className="text-right mb-5">
            <button
              type="button"
              className="text-brand-edit text-[13.5px] font-bold cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="button"
            className="block text-center w-full py-[15px] rounded-[15px] bg-[linear-gradient(180deg,#f4977e,#ee8164)] text-white font-extrabold text-base cursor-pointer shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)]"
          >
            Iniciar sesión
          </button>

          <p className="text-center mt-6 mb-0 text-ink-soft text-[14.5px]">
            ¿Te invitó la guardería?{" "}
            <Link
              href="/activate-account"
              className="text-brand-edit font-extrabold"
            >
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
