"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "@/components/shared/Avatar";
import { IconCheck, IconSun } from "@/components/shared/Icons";

const DEFAULT_CODE = "7K4P9";
const DEFAULT_EMAIL = "lucia.fernandez@gmail.com";
const DEFAULT_PASSWORD = "contraseña";
const DEFAULT_AUTHORIZED = true;

const INVITED_CHILD = {
  name: "Mateo",
  room: "Sala Soles",
  initial: "M",
  avatarColor: "bg-sky-300",
  avatarTextColor: "text-sky-900",
};

const EMAIL_RE = /^.+@.+\..+$/;

type ActivateFormState = {
  code: string;
  email: string;
  password: string;
  authorized: boolean;
  errors: {
    code?: string;
    email?: string;
    password?: string;
    authorized?: string;
  };
  submitting: boolean;
};

export function ActivateForm() {
  const router = useRouter();
  const [state, setState] = useState<ActivateFormState>({
    code: DEFAULT_CODE,
    email: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD,
    authorized: DEFAULT_AUTHORIZED,
    errors: {},
    submitting: false,
  });

  const setField = (
    field: "code" | "email" | "password",
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: undefined },
    }));
  };

  const toggleAuthorized = () => {
    setState((prev) => ({
      ...prev,
      authorized: !prev.authorized,
      errors: { ...prev.errors, authorized: undefined },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: ActivateFormState["errors"] = {};
    if (!state.code) {
      errors.code = "Ingresá el código";
    } else if (state.code.length !== 5) {
      errors.code = "El código tiene 5 caracteres";
    }
    if (!state.email) {
      errors.email = "Ingresá tu email";
    } else if (!EMAIL_RE.test(state.email)) {
      errors.email = "Email inválido";
    }
    if (!state.password) {
      errors.password = "Ingresá una contraseña";
    } else if (state.password.length < 6) {
      errors.password = "Mínimo 6 caracteres";
    }
    if (!state.authorized) {
      errors.authorized = "Necesitamos tu autorización";
    }
    if (Object.keys(errors).length > 0) {
      setState((prev) => ({ ...prev, errors }));
      return;
    }
    setState((prev) => ({ ...prev, errors: {}, submitting: true }));
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-[440px]"
    >
      <div className="w-[58px] h-[58px] rounded-[18px] bg-gradient-to-br from-coral-300 to-coral-400 flex items-center justify-center mb-5.5 shadow-[0_12px_26px_-10px_rgba(238,129,100,0.65)]">
        <IconSun width={30} height={30} strokeWidth={2.2} className="text-white" />
      </div>

      <h1 className="font-fredoka font-semibold text-[32px] leading-[1.15] text-ink-900 m-0 mb-2">
        Bienvenida a OpenDayCare
      </h1>
      <p className="text-ink-300 text-[15.5px] leading-[1.55] m-0 mb-6">
        Te invitaron a seguir el día de tu hijo. Creá tu contraseña para
        activar la cuenta.
      </p>

      <div className="bg-cream-soft border border-beige-200 rounded-2xl p-3.5 flex items-center gap-3.5 mb-5.5">
        <Avatar
          color={INVITED_CHILD.avatarColor}
          initial={INVITED_CHILD.initial}
          className={INVITED_CHILD.avatarTextColor}
          size={44}
        />
        <div>
          <div className="text-ink-300 text-[13px]">
            Te invitaron a seguir a
          </div>
          <div className="font-fredoka font-semibold text-[17px] text-ink-900">
            {INVITED_CHILD.name} · {INVITED_CHILD.room}
          </div>
        </div>
      </div>

      <label
        htmlFor="activate-code"
        className="block text-ink-300 text-[12px] font-extrabold tracking-[0.7px] mb-2"
      >
        CÓDIGO DE INVITACIÓN
      </label>
      <input
        id="activate-code"
        type="text"
        value={state.code}
        onChange={(e) => setField("code", e.target.value)}
        style={{
          fontFamily: "var(--font-fredoka)",
          letterSpacing: "3px",
          fontWeight: 700,
          fontSize: "18px",
        }}
        className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-beige-200 bg-white text-ink-900 focus:border-coral-400 outline-none mb-1"
      />
      {state.errors.code && (
        <p className="text-coral-700 text-[12.5px] m-0 mt-1 mb-3.5">
          {state.errors.code}
        </p>
      )}

      <label
        htmlFor="activate-email"
        className="block text-ink-300 text-[12px] font-extrabold tracking-[0.7px] mb-2 mt-3.5"
      >
        EMAIL
      </label>
      <input
        id="activate-email"
        type="email"
        value={state.email}
        onChange={(e) => setField("email", e.target.value)}
        className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-beige-200 bg-white text-[15px] text-ink-900 focus:border-coral-400 outline-none mb-1"
      />
      {state.errors.email && (
        <p className="text-coral-700 text-[12.5px] m-0 mt-1 mb-3.5">
          {state.errors.email}
        </p>
      )}

      <label
        htmlFor="activate-password"
        className="block text-ink-300 text-[12px] font-extrabold tracking-[0.7px] mb-2 mt-3.5"
      >
        CREAR CONTRASEÑA
      </label>
      <input
        id="activate-password"
        type="password"
        value={state.password}
        onChange={(e) => setField("password", e.target.value)}
        className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-beige-200 bg-white text-[15px] text-ink-900 focus:border-coral-400 outline-none mb-1"
      />
      {state.errors.password && (
        <p className="text-coral-700 text-[12.5px] m-0 mt-1 mb-3.5">
          {state.errors.password}
        </p>
      )}

      <label
        className="flex items-start gap-3 bg-warning-100 rounded-2xl p-3.5 cursor-pointer mb-6 mt-4.5"
      >
        <input
          type="checkbox"
          checked={state.authorized}
          onChange={toggleAuthorized}
          className="sr-only"
        />
        <span
          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            state.authorized ? "bg-success-500" : "bg-beige-200"
          }`}
        >
          {state.authorized && (
            <IconCheck
              width={15}
              height={15}
              strokeWidth={3}
              className="text-white"
            />
          )}
        </span>
        <span className="text-warning-700 text-[14px] leading-[1.45]">
          Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro
          de la app.
        </span>
      </label>
      {state.errors.authorized && (
        <p className="text-coral-700 text-[12.5px] m-0 -mt-4 mb-3.5">
          {state.errors.authorized}
        </p>
      )}

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-[15px] rounded-[15px] bg-gradient-to-b from-coral-500 to-coral-600 text-white font-extrabold text-[16px] shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] disabled:bg-coral-700/80 disabled:cursor-not-allowed border-0 cursor-pointer"
      >
        {state.submitting ? "Activando…" : "Activar mi cuenta"}
      </button>

      <p className="text-ink-300 text-[14.5px] mt-5.5 mb-0 text-center">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="text-coral-900 font-extrabold">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
