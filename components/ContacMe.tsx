"use client";

import React, { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", message: "" };

export default function ContactMe() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const isValid = useMemo(() => {
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email);
    return form.name.trim().length >= 2 && emailOk && form.message.trim().length >= 10;
  }, [form.email, form.message, form.name]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setStatus("sending");

      // TODO: Replace with your API route / Server Action.
      // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
      await new Promise((r) => setTimeout(r, 700));

      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full rounded-2xl bg-transparent px-4 py-3 text-sm outline-none ring-1 ring-[#fff4ce]/20 placeholder:text-[#fff4ce]/40 focus-visible:ring-2 focus-visible:ring-[#fff4ce]/60";

  return (
    <section id="contact" className="w-full bg-[#0c151d] text-[#fff4ce]">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
          Contact me
        </h2>
        <p className="mt-2 max-w-xl text-pretty text-sm text-[#fff4ce]/70">
          Send a message and the reply will come back by email.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 w-full rounded-3xl p-5 ring-1 ring-[#fff4ce]/15 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="text-left">
              <label htmlFor="name" className="text-xs font-medium text-[#fff4ce]/80">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={onChange("name")}
                placeholder="Your name"
                className={`${inputBase} mt-2`}
              />
            </div>

            <div className="text-left">
              <label htmlFor="email" className="text-xs font-medium text-[#fff4ce]/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={onChange("email")}
                placeholder="you@example.com"
                className={`${inputBase} mt-2`}
              />
            </div>
          </div>

          <div className="mt-4 text-left">
            <label htmlFor="message" className="text-xs font-medium text-[#fff4ce]/80">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={form.message}
              onChange={onChange("message")}
              placeholder="Write your message (min 10 chars)..."
              rows={6}
              className={`${inputBase} mt-2 resize-none`}
            />
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={!isValid || status === "sending"}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[#fff4ce] px-5 py-3 text-sm font-semibold text-[#0c151d] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff4ce]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c151d]"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            <a
              href="mailto:you@example.com"
              className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold ring-1 ring-[#fff4ce]/25 transition hover:bg-[#fff4ce]/5 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff4ce]/60"
            >
              Email directly
            </a>
          </div>

          <p
            className="mt-5 text-sm text-[#fff4ce]/70"
            role="status"
            aria-live="polite"
          >
            {status === "sent" && "Message sent. Thanks!"}
            {status === "error" && "Something went wrong. Please try again."}
            {status === "idle" && ""}
          </p>
        </form>
      </div>
    </section>
  );
}
