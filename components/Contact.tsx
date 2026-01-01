"use client";

import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
};

type Errors = Partial<Record<keyof FormState, string>>;

const persianNameOk = (v: string) => v.trim().length >= 3;
const subjectOk = (v: string) => v.trim().length >= 5;

const emailOk = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v.trim());

function validate(v: FormState): Errors {
  const e: Errors = {};

  // name
  if (!v.name.trim()) e.name = "نام خالیه؛ لطفاً نامت رو وارد کن.";
  else if (!persianNameOk(v.name)) e.name = "نام خیلی کوتاهه؛ حداقل ۳ کاراکتر.";

  // email
  if (!v.email.trim()) e.email = "ایمیل خالیه؛ لطفاً ایمیل رو وارد کن.";
  else if (!emailOk(v.email)) e.email = "ایمیل معتبر نیست. مثال: name@gmail.com";

  // subject
  if (!v.subject.trim()) e.subject = "موضوع خالیه؛ لطفاً موضوع پیام رو بنویس.";
  else if (!subjectOk(v.subject)) e.subject = "موضوع کوتاهه؛ حداقل ۵ کاراکتر.";

  // message
  const msg = v.message.trim();
  if (!msg) e.message = "پیام خالیه؛ لطفاً توضیح بده چی می‌خوای.";
  else if (msg.length < 40) e.message = "پیام کوتاهه؛ حداقل ۴۰ کاراکتر بنویس تا دقیق‌تر بررسی بشه.";
  else {
    // پیشرفته‌تر: حداقل 2 جمله یا حداقل 8 کلمه
    const words = msg.split(/\s+/).filter(Boolean);
    const sentences = msg.split(/[.!?؟\n]+/).map((s) => s.trim()).filter(Boolean);
    if (words.length < 8) e.message = "پیام خیلی خلاصه است؛ حداقل ۸ کلمه بنویس.";
    else if (sentences.length < 2) e.message = "بهتره پیام حداقل ۲ جمله باشه تا خواسته‌ها واضح‌تر بشه.";
  }

  return e;
}

function firstErrorKey(errors: Errors): keyof FormState | null {
  const order: (keyof FormState)[] = ["name", "email", "subject", "message"];
  for (const k of order) if (errors[k]) return k;
  return null;
}

export default function Contact() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const [summary, setSummary] = useState<string | null>(null);

  const errors = useMemo(() => validate(values), [values]);
  const invalidCount = useMemo(() => Object.keys(errors).length, [errors]);

  const summaryRef = useRef<HTMLDivElement>(null);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((p) => ({ ...p, [k]: e.target.value }));
      // وقتی کاربر شروع کرد اصلاح کنه، خلاصه‌ی خطا رو پاک کن
      setSummary(null);
    };

  const onBlur = (k: keyof FormState) => () => setTouched((p) => ({ ...p, [k]: true }));

  const showErr = (k: keyof FormState) => Boolean(touched[k] && errors[k]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSummary(null);

    // همه فیلدها رو touched کن تا خطاها تک‌تک نمایش داده بشن
    setTouched({ name: true, email: true, subject: true, message: true });

    // honeypot
    if (values.website.trim()) {
      // برای بات‌ها وانمود کن موفق بوده
      setSummary("پیام ارسال شد.");
      return;
    }

    const errs = validate(values);
    const first = firstErrorKey(errs);

    if (first) {
      setSummary(`ارسال انجام نشد؛ ${invalidCount} مورد نیاز به اصلاح دارد.`);
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
        // فوکوس روی اولین فیلد خطادار
        document.getElementById(first)?.focus();
      });
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setSummary("پیامت رسید. به‌زودی جواب می‌دم.");
      setValues({ name: "", email: "", subject: "", message: "", website: "" });
      setTouched({});
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setSummary("ارسال ناموفق بود. دوباره تلاش کن.");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" dir="rtl" className="contact">
      <div className="bg" aria-hidden="true" />
      <div className="grid" aria-hidden="true" />

      <div className="wrap">
        <div className="head">
          <h2 className="MorabaFont">تماس</h2>
          <p>همه فیلدها باید کامل و درست پر بشن؛ در غیر این صورت ارسال انجام نمی‌شه.</p>
        </div>

        <div className="layout">
          <div className="info">
            <div className="infoTop">
              <span className="dot" aria-hidden="true" />
              <span className="infoTitle">راه‌های ارتباط</span>
            </div>

            <div className="kv">
              <span className="k">ایمیل</span>
              <span className="v mono">youremail@example.com</span>
            </div>
            <div className="kv">
              <span className="k">تلگرام</span>
              <span className="v mono">@username</span>
            </div>

            <p className="note">
              لطفاً داخل پیام: نیازها، ددلاین، و لینک‌ها را بگذار تا سریع‌تر جمع‌بندی شود.
            </p>
          </div>

          <div className="card">
            {/* Error summary (برای submit) */}
            <AnimatePresence>
              {summary && (
                <motion.div
                  ref={summaryRef}
                  tabIndex={-1}
                  aria-live="assertive"
                  className="summary"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {summary}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={onSubmit} className="form" noValidate>
              {/* honeypot */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  value={values.website}
                  onChange={onChange("website")}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div className="row2">
                <div className="field">
                  <label htmlFor="name">نام</label>
                  <input
                    id="name"
                    value={values.name}
                    onChange={onChange("name")}
                    onBlur={onBlur("name")}
                    placeholder="مثلاً مسعود"
                    aria-invalid={showErr("name")}
                    aria-describedby={showErr("name") ? "err-name" : "hint-name"}
                    autoComplete="name"
                  />
                  {!showErr("name") ? (
                    <p id="hint-name" className="hint">حداقل ۳ کاراکتر.</p>
                  ) : null}
                  <AnimatePresence>
                    {showErr("name") && (
                      <motion.p
                        id="err-name"
                        className="err"
                        role="alert"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16 }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="field">
                  <label htmlFor="email">ایمیل</label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={onChange("email")}
                    onBlur={onBlur("email")}
                    placeholder="name@gmail.com"
                    aria-invalid={showErr("email")}
                    aria-describedby={showErr("email") ? "err-email" : "hint-email"}
                    inputMode="email"
                    autoComplete="email"
                  />
                  {!showErr("email") ? (
                    <p id="hint-email" className="hint">فرمت صحیح ایمیل لازم است.</p>
                  ) : null}
                  <AnimatePresence>
                    {showErr("email") && (
                      <motion.p
                        id="err-email"
                        className="err"
                        role="alert"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">موضوع</label>
                <input
                  id="subject"
                  value={values.subject}
                  onChange={onChange("subject")}
                  onBlur={onBlur("subject")}
                  placeholder="مثلاً طراحی صفحه پروژه‌ها"
                  aria-invalid={showErr("subject")}
                  aria-describedby={showErr("subject") ? "err-subject" : "hint-subject"}
                />
                {!showErr("subject") ? (
                  <p id="hint-subject" className="hint">حداقل ۵ کاراکتر.</p>
                ) : null}
                <AnimatePresence>
                  {showErr("subject") && (
                    <motion.p
                      id="err-subject"
                      className="err"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16 }}
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="field">
                <label htmlFor="message">پیام</label>
                <textarea
                  id="message"
                  value={values.message}
                  onChange={onChange("message")}
                  onBlur={onBlur("message")}
                  placeholder="نیازها، ددلاین، لینک‌ها و هر نکته مهم..."
                  aria-invalid={showErr("message")}
                  aria-describedby={showErr("message") ? "err-message" : "hint-message"}
                  rows={6}
                />
                {!showErr("message") ? (
                  <p id="hint-message" className="hint">
                    حداقل ۴۰ کاراکتر + بهتره حداقل ۲ جمله یا ۸ کلمه باشه.
                  </p>
                ) : null}
                <AnimatePresence>
                  {showErr("message") && (
                    <motion.p
                      id="err-message"
                      className="err"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="actions">
                <motion.button
                  className="btn primary"
                  type="submit"
                  disabled={submitting}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? "در حال ارسال..." : "ارسال پیام"}
                </motion.button>

                <button
                  type="button"
                  className="btn glass"
                  onClick={() => {
                    setValues({ name: "", email: "", subject: "", message: "", website: "" });
                    setTouched({});
                    setSummary(null);
                  }}
                >
                  پاک کردن
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.contact{
  position: relative;
  padding: 70px 16px 90px;
  overflow: hidden;
  background:
    radial-gradient(900px 700px at 18% 20%, rgba(99,102,241,0.10), transparent 60%),
    radial-gradient(900px 700px at 78% 36%, rgba(14,165,233,0.10), transparent 60%),
    radial-gradient(900px 700px at 50% 92%, rgba(16,185,129,0.08), transparent 60%),
    linear-gradient(180deg, #ffffff, #f7f9ff 55%, #ffffff);
  color: rgba(15,23,42,0.92);
}

.bg{
  position:absolute; inset:-2px;
  pointer-events:none;
  background:
    radial-gradient(380px 260px at 22% 22%, rgba(255,255,255,0.85), transparent 62%),
    radial-gradient(480px 320px at 78% 34%, rgba(255,255,255,0.70), transparent 64%);
  opacity: .55;
  mix-blend-mode: overlay;
}

.grid{
  position:absolute; inset:-2px;
  pointer-events:none;
  background-image:
    linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px),
    linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px);
  background-size: 22px 22px, 22px 22px, 72px 72px, 72px 72px;
  opacity: 0.20;
  -webkit-mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 72%);
  mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 72%);
}

.wrap{
  width: min(1120px, 100%);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.head h2{ margin:0; font-size: clamp(22px, 3vw, 30px); letter-spacing: -0.02em; }
.head p{ margin: 8px 0 0; color: rgba(15,23,42,0.65); line-height: 1.9; max-width: 72ch; }

.layout{
  margin-top: 18px;
  display:grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 14px;
  align-items: start;
}

.info, .card{
  border-radius: 22px;
  border: 1px solid rgba(15,23,42,0.12);
  background: rgba(255,255,255,0.72);
  box-shadow: 0 22px 70px rgba(15,23,42,0.10);
  overflow:hidden;
}

.info{ padding: 14px; }
.infoTop{ display:flex; align-items:center; gap: 10px; }
.dot{
  width: 10px; height: 10px; border-radius: 999px;
  background: linear-gradient(90deg, #4f46e5, #0ea5e9, #10b981);
}
.infoTitle{ font-weight: 800; }

.kv{
  margin-top: 12px;
  display:flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,0.78);
  border: 1px solid rgba(15,23,42,0.08);
}
.k{ color: rgba(15,23,42,0.65); font-size: 13px; }
.v{ color: rgba(15,23,42,0.88); font-size: 13px; }
.mono{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }

.note{
  margin: 12px 0 0;
  color: rgba(15,23,42,0.65);
  line-height: 1.9;
  font-size: 14px;
}

.card{ padding: 14px; }

.summary{
  margin-bottom: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(244,63,94,0.28);
  background: rgba(244,63,94,0.07);
  color: rgba(15,23,42,0.82);
  outline: none;
}

.form{ display:flex; flex-direction: column; gap: 12px; }

.row2{
  display:grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.field label{
  display:block;
  margin-bottom: 6px;
  font-size: 13px;
  color: rgba(15,23,42,0.78);
  font-weight: 700;
}

.field input, .field textarea{
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(15,23,42,0.12);
  background: rgba(255,255,255,0.86);
  padding: 11px 12px;
  font-size: 14px;
  color: rgba(15,23,42,0.92);
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.field input:focus, .field textarea:focus{
  border-color: rgba(79,70,229,0.40);
  box-shadow: 0 0 0 6px rgba(79,70,229,0.12);
}

.field input[aria-invalid="true"], .field textarea[aria-invalid="true"]{
  border-color: rgba(244,63,94,0.55);
  box-shadow: 0 0 0 6px rgba(244,63,94,0.10);
}

.hint{
  margin: 8px 2px 0;
  font-size: 12px;
  color: rgba(15,23,42,0.60);
}

.err{
  margin: 8px 2px 0;
  font-size: 12px;
  color: rgba(244,63,94,0.95);
}

.actions{
  display:flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items:center;
  margin-top: 4px;
}

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding: 11px 12px;
  border-radius: 14px;
  border: 1px solid rgba(15,23,42,0.12);
  background: transparent;
  cursor:pointer;
  user-select:none;
  transition: transform 200ms ease, filter 200ms ease, background 200ms ease;
}
.btn:hover{ transform: translateY(-2px); filter: brightness(1.03); }
.btn:active{ transform: translateY(0px) scale(0.99); }
.btn:disabled{ opacity: .7; cursor:not-allowed; }

.primary{ background: rgba(15,23,42,0.92); color: white; }
.glass{ background: rgba(255,255,255,0.78); color: rgba(15,23,42,0.92); }

.hp{
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
  overflow:hidden;
}

@media (max-width: 960px){
  .layout{ grid-template-columns: 1fr; }
  .row2{ grid-template-columns: 1fr; }
}
`;
