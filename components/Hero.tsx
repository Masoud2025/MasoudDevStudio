"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import HeroImage from "../public/giphy.gif";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return reduced;
}

function useTypewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  holdMs = 900,
  loop = true,
  enabled = true,
}: {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
  loop?: boolean;
  enabled?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = words[index] ?? "";

  useEffect(() => {
    if (!enabled) return;

    if (!deleting && sub === current.length) {
      const t = window.setTimeout(() => setDeleting(true), holdMs);
      return () => window.clearTimeout(t);
    }

    if (deleting && sub === 0) {
      const t = window.setTimeout(() => {
        setDeleting(false);
        setIndex((i) => {
          const next = i + 1;
          return loop ? next % words.length : Math.min(next, words.length - 1);
        });
      }, 0);

      return () => window.clearTimeout(t);
    }

    const speed = deleting ? deleteSpeed : typeSpeed;
    const t = window.setTimeout(() => {
      setSub((s) => s + (deleting ? -1 : 1));
    }, speed);

    return () => window.clearTimeout(t);
  }, [
    enabled,
    words,
    index,
    current.length,
    sub,
    deleting,
    typeSpeed,
    deleteSpeed,
    holdMs,
    loop,
  ]);

  const text = enabled ? current.slice(0, sub) : current;
  return { text, deleting, wordIndex: index };
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  const roles = useMemo(
    () => ["برنامه نویس", "توسعه دهنده وب", "Frontend Developer", "React / Next.js"],
    []
  );

  const { text: roleText } = useTypewriter({
    words: roles,
    typeSpeed: 75,
    deleteSpeed: 42,
    holdMs: 900,
    loop: true,
    enabled: !reducedMotion,
  });

  const styleVars: CSSVars = useMemo(() => ({}), []);

  return (
    <section dir="rtl" className="hero2" style={styleVars} aria-label="Hero">
      <div className="mesh" aria-hidden="true" />
      <div className="grid" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <div className="container">
        <div className="copy">
          <div className="badge">
            <span className="ping" aria-hidden="true" />
            <span className="bTxt">OPEN TO WORK</span>
          </div>

          <h1 className="title MorabaFont">
            رابط کاربری که هم زیباست،
            <span className="accent"> هم سریع</span>.
          </h1>

          <p className="typeLine MorabaFont" aria-label="Intro">
            <span className="name">مسعود جعفری</span>
            <span className="sep"> — </span>
            <span className="role">{reducedMotion ? roles[0] : roleText}</span>
            {!reducedMotion && <span className="caret" aria-hidden="true" />}
          </p>

          <p className="desc">
            تمرکز روی نتیجه: کامپوننت‌های تمیز، تجربه کاربری روان، و کدی که بعداً هم
            قابل توسعه و نگهداری باشد.
          </p>

          <div className="ctaRow">
            <a className="btn primary" href="#projects">
              دیدن پروژه‌ها
            </a>
            <a className="btn glass" href="#contact">
              شروع همکاری
            </a>
            <a className="btn link glass" href="#about" aria-label="About">
              دانلود رزومه
            </a>
          </div>

          <div className="signals" aria-label="Highlights">
            <span className="pill">A11y-first</span>
            <span className="pill">Performance</span>
            <span className="pill">Design system</span>
            <span className="pill">Clean code</span>
          </div>
        </div>

        <div className="stage" aria-label="Hero visuals">
          <div className="solar">
            <div className="center" aria-label="Illustration">
              <Image
                className="heroSvg rounded-4xl"
                src={HeroImage}
                alt="Code typing illustration"
                priority
                sizes="(max-width: 960px) 92vw, 420px"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.hero2{
  position: relative;
  overflow: hidden;
  min-height: 100svh;
  min-height: 100dvh;
  padding: 92px 18px 32px;
  display: grid;
  place-items: center;
  color: rgba(15,23,42,0.92);
}

.mesh{
  position:absolute; inset:-2px;
  pointer-events:none;
  background:
    radial-gradient(400px 280px at 18% 24%, rgba(255,255,255,0.85), transparent 62%),
    radial-gradient(520px 340px at 78% 32%, rgba(255,255,255,0.70), transparent 64%),
    radial-gradient(520px 420px at 52% 86%, rgba(255,255,255,0.65), transparent 68%);
  mix-blend-mode: overlay;
  opacity: .65;
}

.grid{
  position:absolute; inset:-2px;
  pointer-events:none;
  background-image:
    linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px),
    linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px);
  background-size: 22px 22px, 22px 22px, 68px 68px, 68px 68px;
  opacity: 0.28;
  -webkit-mask-image: radial-gradient(circle at 50% 34%, black 0%, transparent 70%);
  mask-image: radial-gradient(circle at 50% 34%, black 0%, transparent 70%);
}

.noise{
  position:absolute; inset:-2px;
  pointer-events:none;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
}

.container{
  width: min(1100px, 100%);
  z-index: 1;
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 28px;
  align-items: center;
}

.copy{ padding: 0 6px; }

.badge{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.68);
  border: 1px solid rgba(15,23,42,0.10);
  box-shadow: 0 16px 60px rgba(15,23,42,0.06);
  backdrop-filter: blur(12px);
  font-size: 13px;
  color: rgba(15,23,42,0.70);
}

.ping{
  width: 9px; height: 9px; border-radius: 999px;
  background: #10b981;
  box-shadow: 0 0 0 5px rgba(16,185,129,0.16), 0 0 26px rgba(16,185,129,0.32);
}

.title{
  margin: 18px 0 10px;
  font-size: clamp(36px, 4.4vw, 60px);
  line-height: 1.05;
  letter-spacing: -0.03em;
}
.accent{
  background: linear-gradient(90deg, #4f46e5, #0ea5e9, #10b981);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.typeLine{
  margin: 10px 0 0;
  font-size: 16px;
  color: rgba(15,23,42,0.70);
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}
.typeLine .name{ font-weight: 800; color: rgba(15,23,42,0.90); }
.typeLine .sep{ opacity: .5; }
.typeLine .role{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.typeLine .caret{
  width: 10px;
  height: 18px;
  border-radius: 2px;
  background: rgba(15,23,42,0.55);
  display: inline-block;
  animation: caretBlink 1s steps(2, jump-none) infinite;
}
@keyframes caretBlink { 50% { opacity: 0; } }

.desc{
  margin: 0 0 16px;
  max-width: 62ch;
  line-height: 1.95;
  font-size: 16px;
  color: rgba(15,23,42,0.68);
}

.ctaRow{
  display:flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items:center;
  margin-top: 8px;
}

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding: 11px 14px;
  border-radius: 14px;
  text-decoration:none;
  border: 1px solid rgba(15,23,42,0.12);
  user-select:none;
  will-change: transform;
  transition:
    transform 240ms cubic-bezier(0.4, 0, 0.2, 1),
    filter 240ms cubic-bezier(0.4, 0, 0.2, 1),
    background 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
.btn:hover{ transform: translateY(-2px); filter: brightness(1.03); }
.btn:active{ transform: translateY(0px) scale(0.99); }

.primary{ background: rgba(15,23,42,0.92); color: white; }
.glass{ background: rgba(255,255,255,0.68); color: rgba(15,23,42,0.92); backdrop-filter: blur(12px); }
.link{ border-color: transparent; background: transparent; color: rgba(15,23,42,0.72); padding-inline: 6px; }

.signals{ display:flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
.pill{
  font-size: 12px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(15,23,42,0.10);
  background: rgba(255,255,255,0.66);
  color: rgba(15,23,42,0.70);
  backdrop-filter: blur(10px);
}

/* ---- stage ---- */
.stage{
  position: relative;
  min-height: 360px;
  display: grid;
  place-items: center;
}

.solar{
  position: relative;
  width: min(420px, 92vw);
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  isolation: isolate;
}

.center{
  position: relative;
  width: clamp(220px, 34vw, 340px);
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  z-index: 2;
}

.heroSvg{
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: none;
}

/* responsive */
@media (max-width: 960px){
  .container{
    grid-template-columns: 1fr;
    gap: 12px; /* فاصله بین ستون‌ها/ردیف‌ها کمتر شود */ /* gap controls gutters */ 
  }

  .copy{ padding: 0; }

  .title{ margin: 14px 0 8px; }
  .desc{ margin: 0 0 10px; }

  .ctaRow{
    gap: 6px;
    margin-top: 6px;
  }

  .signals{
    gap: 6px;
    margin-top: 10px;
  }

  .stage{
    min-height: auto;
    margin-top: 6px;
  }

  /* بزرگ‌تر شدن تصویر در موبایل */
  .center{
    width: clamp(300px, 78vw, 420px);
  }

  .badge{ box-shadow: none; }
  .ping{ box-shadow: none; }
  .glass{ backdrop-filter: none; }
  .pill{ backdrop-filter: none; }
}

@media (max-width: 520px){
  .badge{ gap: 8px; padding: 8px 12px; }
  .bTxt{ display:none; }

  /* اگر خیلی فشرده می‌خوای */
  .ctaRow{ gap: 5px; }
  .signals{ gap: 5px; }
}

@media (prefers-reduced-motion: reduce){
  .btn{ transition:none; }
  .typeLine .caret{ animation:none; }
}
`;
