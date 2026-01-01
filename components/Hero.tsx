"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

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

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

function TiltCard({
  children,
  className,
  maxTilt = 10,
  perspective = 900,
  lift = 6,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  lift?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  // برای نرم شدن: مقدار فعلی و مقدار هدف
  const cur = useRef({ rx: 0, ry: 0, tz: 0 });
  const target = useRef({ rx: 0, ry: 0, tz: 0 });

  const apply = () => {
    const el = ref.current;
    if (!el) return;

    // easing ساده (lerp)
    cur.current.rx += (target.current.rx - cur.current.rx) * 0.14;
    cur.current.ry += (target.current.ry - cur.current.ry) * 0.14;
    cur.current.tz += (target.current.tz - cur.current.tz) * 0.14;

    el.style.transform = `perspective(${perspective}px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg) translateY(${cur.current.tz}px)`;
  };

  const schedule = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(apply);
  };

  const onMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = clamp((e.clientX - r.left) / r.width, 0, 1);
    const y = clamp((e.clientY - r.top) / r.height, 0, 1);

    // مرکز کارت: 0.5 / 0.5
    const dx = (x - 0.5) * 2; // -1..1
    const dy = (y - 0.5) * 2; // -1..1

    target.current.ry = dx * maxTilt; // حرکت افقی -> rotateY
    target.current.rx = dy * -maxTilt; // حرکت عمودی -> rotateX (برعکس برای طبیعی شدن)
    target.current.tz = -lift;

    schedule();
  };

  const onLeave = () => {
    if (reducedMotion) return;
    target.current = { rx: 0, ry: 0, tz: 0 };
    schedule();
  };

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px)`,
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [mx, setMx] = useState(0.5);
  const [my, setMy] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width, 0, 1);
      const y = clamp((e.clientY - r.top) / r.height, 0, 1);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMx(x);
        setMy(y);
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  const styleVars: CSSVars = useMemo(() => {
    const glowX = 18 + mx * 64;
    const glowY = 16 + my * 64;
    return {
      "--glowX": `${glowX}%`,
      "--glowY": `${glowY}%`,
    };
  }, [mx, my]);

  return (
    <section
      ref={ref}
      dir="rtl"
      className="hero2"
      style={styleVars}
      aria-label="Hero"
    >
      <div className="mesh" aria-hidden="true" />
      <div className="grid" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <div className="container">
        <div className="copy">
          <div className="badge">
            <span className="ping" aria-hidden="true" />
            <span className="bTxt">Available for freelance</span>
            <span className="bSep" aria-hidden="true">
              •
            </span>
            <span className="mono">React / Next.js / TypeScript</span>
          </div>

          <h1 className="title">
            رابط کاربری که هم زیباست،
            <span className="accent"> هم سریع</span>.
          </h1>

          <p className="desc">
            تمرکز روی نتیجه: کامپوننت‌های تمیز، تجربه کاربری روان، و کدی که
            بعداً هم قابل توسعه و نگهداری باشد.
          </p>

          <div className="ctaRow">
            <a className="btn primary" href="#projects">
              دیدن پروژه‌ها
            </a>
            <a className="btn glass" href="#contact">
              شروع همکاری
            </a>
            <a className="btn link" href="#about" aria-label="About">
              بیشتر درباره من →
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
          <TiltCard
            className="floatCard"
            maxTilt={reducedMotion ? 0 : 10}
            perspective={950}
            lift={6}
          >
            <div className="floatTop">
              <span className="mono">build()</span>
              <span className="muted">→ ship → iterate</span>
            </div>

            <div className="statRow">
              <div className="stat">
                <div className="statN">+30%</div>
                <div className="statL">بهبود سرعت</div>
              </div>
              <div className="stat">
                <div className="statN">0</div>
                <div className="statL">باگ UI حیاتی</div>
              </div>
              <div className="stat">
                <div className="statN">A</div>
                <div className="statL">Core UX</div>
              </div>
            </div>

            <div className="divider" />

            <div className="chips">
              <span className="chip2 mono">TS</span>
              <span className="chip2 mono">DX</span>
              <span className="chip2 mono">UI</span>
              <span className="chip2 mono">SEO</span>
              <span className="chip2 mono">SSR</span>
            </div>
          </TiltCard>

          <TiltCard
            className="stackCard"
            maxTilt={reducedMotion ? 0 : 8}
            perspective={950}
            lift={5}
          >
            <div className="stackHead">
              <span className="dot" aria-hidden="true" />
              <span className="stackT">Stack</span>
            </div>
            <ul className="stackList">
              <li>
                <span className="k">Next.js</span>
                <span className="v">Routing / SSR / App patterns</span>
              </li>
              <li>
                <span className="k">React</span>
                <span className="v">State / Components / Hooks</span>
              </li>
              <li>
                <span className="k">TypeScript</span>
                <span className="v">Types that scale</span>
              </li>
              <li>
                <span className="k">UI</span>
                <span className="v">Tailwind / CSS / Motion</span>
              </li>
            </ul>
          </TiltCard>

          <div className="blob" aria-hidden="true" />
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
  background:
    radial-gradient(1100px 780px at var(--glowX) var(--glowY), rgba(99,102,241,0.18), transparent 62%),
    radial-gradient(900px 680px at calc(var(--glowX) - 18%) calc(var(--glowY) + 14%), rgba(16,185,129,0.12), transparent 60%),
    radial-gradient(700px 520px at 12% 18%, rgba(14,165,233,0.12), transparent 55%),
    linear-gradient(180deg, #ffffff, #f7f9ff 55%, #ffffff);
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
.bSep{ opacity: .45; }
.mono{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }

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

.stage{
  position: relative;
  min-height: 360px;
  display: grid;
  gap: 12px;
  align-content: center;
}

/* blob stays behind */
.blob{
  position:absolute;
  inset: -40px -60px -40px -60px;
  background:
    radial-gradient(320px 240px at 22% 28%, rgba(14,165,233,0.28), transparent 62%),
    radial-gradient(340px 260px at 78% 42%, rgba(99,102,241,0.26), transparent 62%),
    radial-gradient(340px 280px at 55% 82%, rgba(16,185,129,0.20), transparent 62%);
  filter: blur(18px);
  opacity: 0.75;
  z-index: 0;
}

/* cards now driven by TiltCard transform */
.floatCard, .stackCard{
  z-index: 1;
  border-radius: 22px;
  border: 1px solid rgba(15,23,42,0.12);
  background: rgba(255,255,255,0.62);
  box-shadow: 0 36px 110px rgba(15,23,42,0.10);
  backdrop-filter: blur(14px);
  padding: 16px 16px 14px;
  transform-style: preserve-3d;
  will-change: transform;
  transition: box-shadow 240ms cubic-bezier(0.4, 0, 0.2, 1), border-color 240ms cubic-bezier(0.4, 0, 0.2, 1);
}

.floatCard:hover, .stackCard:hover{
  box-shadow: 0 44px 140px rgba(15,23,42,0.14);
  border-color: rgba(255,255,255,0.32);
}

.floatTop{
  display:flex;
  gap: 10px;
  align-items: baseline;
  color: rgba(15,23,42,0.70);
}
.muted{ opacity: 0.6; }

.statRow{
  margin-top: 12px;
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.stat{
  border-radius: 16px;
  padding: 10px 10px;
  background: rgba(255,255,255,0.55);
  border: 1px solid rgba(15,23,42,0.10);
}
.statN{ font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
.statL{ margin-top: 2px; font-size: 12px; color: rgba(15,23,42,0.62); }

.divider{ height: 1px; background: rgba(15,23,42,0.10); margin: 12px 0; }

.chips{ display:flex; flex-wrap: wrap; gap: 8px; }
.chip2{
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(15,23,42,0.10);
  background: rgba(255,255,255,0.62);
  color: rgba(15,23,42,0.74);
}

.stackHead{
  display:flex;
  align-items:center;
  gap:10px;
  color: rgba(15,23,42,0.78);
  font-weight: 700;
}
.dot{
  width: 9px; height: 9px; border-radius: 50%;
  background: linear-gradient(90deg, #4f46e5, #0ea5e9);
  box-shadow: 0 0 22px rgba(79,70,229,0.22);
}

.stackList{
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  display:flex;
  flex-direction: column;
  gap: 8px;
}
.stackList li{
  display:grid;
  grid-template-columns: 110px 1fr;
  gap: 10px;
  align-items: baseline;
  padding: 9px 10px;
  border-radius: 14px;
  border: 1px solid rgba(15,23,42,0.08);
  background: rgba(255,255,255,0.50);
}
.k{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: rgba(15,23,42,0.88); }
.v{ color: rgba(15,23,42,0.62); font-size: 13px; }

@media (max-width: 960px){
  .container{ grid-template-columns: 1fr; }
  .stage{ min-height: auto; }
}
@media (max-width: 520px){
  .badge{ gap: 8px; }
  .bTxt{ display:none; }
  .statRow{ grid-template-columns: 1fr; }
  .stackList li{ grid-template-columns: 88px 1fr; }
}
@media (prefers-reduced-motion: reduce){
  .floatCard, .stackCard{ transition:none; }
  .btn{ transition:none; }
}
`;
