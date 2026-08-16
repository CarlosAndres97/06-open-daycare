"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEFAULT_EMAIL = "caro@opendaycare.com";

type LoginFormState = {
  email: string;
  password: string;
  errors: { email?: string; password?: string };
  submitting: boolean;
};

const EMAIL_RE = /^.+@.+\..+$/;

export function LoginForm() {
  const router = useRouter();
  const [state, setState] = useState<LoginFormState>({
    email: DEFAULT_EMAIL,
    password: "",
    errors: {},
    submitting: false,
  });

  const setField = (field: "email" | "password", value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: undefined },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: LoginFormState["errors"] = {};
    if (!state.email) {
      errors.email = "Ingresá tu email";
    } else if (!EMAIL_RE.test(state.email)) {
      errors.email = "Email inválido";
    }
    if (!state.password) {
      errors.password = "Ingresá tu contraseña";
    } else if (state.password.length < 6) {
      errors.password = "Mínimo 6 caracteres";
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
      className="w-full max-w-[392px]"
    >
      <h2 className="font-fredoka font-semibold text-[30px] text-ink-900 m-0 mb-1.5">
        Iniciar sesión
      </h2>
      <p className="text-ink-300 text-[15px] m-0 mb-7">
        Ingresá para ver el día de hoy.
      </p>

      <label
        htmlFor="login-email"
        className="block text-ink-300 text-[12px] font-extrabold tracking-[0.7px] mb-2"
      >
        EMAIL
      </label>
      <input
        id="login-email"
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
        htmlFor="login-password"
        className="block text-ink-300 text-[12px] font-extrabold tracking-[0.7px] mb-2 mt-3.5"
      >
        CONTRASEÑA
      </label>
      <input
        id="login-password"
        type="password"
        value={state.password}
        onChange={(e) => setField("password", e.target.value)}
        placeholder="••••••••"
        className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-beige-200 bg-white text-[15px] text-ink-900 focus:border-coral-400 outline-none mb-1"
      />
      {state.errors.password && (
        <p className="text-coral-700 text-[12.5px] m-0 mt-1 mb-2.5">
          {state.errors.password}
        </p>
      )}

      <div className="text-right mb-5">
        <a
          href="#"
          className="text-coral-900 text-[13.5px] font-extrabold cursor-pointer"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-[15px] rounded-[15px] bg-gradient-to-b from-coral-500 to-coral-600 text-white font-extrabold text-[16px] shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] disabled:bg-coral-700/80 disabled:cursor-not-allowed border-0 cursor-pointer"
      >
        {state.submitting ? "Ingresando…" : "Iniciar sesión"}
      </button>

      <p className="text-ink-300 text-[14.5px] mt-6 mb-0 text-center">
        ¿Te invitó la guardería?{" "}
        <Link
          href="/active-account"
          className="text-coral-900 font-extrabold"
        >
          Activá tu cuenta
        </Link>
      </p>
    </form>
  );
}
