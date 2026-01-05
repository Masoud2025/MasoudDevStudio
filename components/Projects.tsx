"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  role?: string;
  summary: string;
  requirements: string[];
  challenges: string[];
  durationDays: number;
  font: string;
  colors: { name: string; hex: string }[];
  principles: string[];
  tech: string[];
  coverTall: string; // tall screenshot url
  gallery: string[]; // more images
  demoUrl?: string;
};

const P = (seed: number, w = 1200, h = 2400) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
const G = (seed: number, w = 1400, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** 12 نمونه کار (فعلا دمو/عکس نمونه) */
const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "سایت شرکتی آلفا",
    role: "UI + Frontend",
    summary: "وبسایت شرکتی با تمرکز روی اعتمادسازی، معرفی خدمات و CTA واضح.",
    requirements: [
      "ریسپانسیو کامل",
      "RTL تمیز",
      "ساختار کامپوننتی",
      "سرعت بالا",
    ],
    challenges: ["کنترل تصاویر قدی", "هماهنگی spacing", "hover بدون لگ"],
    durationDays: 6,
    font: "Vazirmatn",
    colors: [
      { name: "Indigo", hex: "#4F46E5" },
      { name: "Emerald", hex: "#10B981" },
      { name: "Ink", hex: "#0F172A" },
    ],
    principles: ["A11y", "Performance", "Reusable UI", "Responsive"],
    tech: ["Next.js", "React", "TypeScript", "CSS", "Motion"],
    coverTall: P(11),
    gallery: [G(111), G(112), G(113), G(114)],
    demoUrl: "https://example.com",
  },
  {
    id: "p2",
    title: "لندینگ محصول بتا",
    role: "Frontend + UX polish",
    summary: "لندینگ SaaS برای فروش: پلن‌ها، FAQ، و فرم تماس.",
    requirements: ["UI مدرن", "انیمیشن نرم", "قابل توسعه", "SEO پایه"],
    challenges: ["تایپوگرافی RTL", "تعادل motion با سرعت", "گالری داخل شیت"],
    durationDays: 4,
    font: "Vazirmatn",
    colors: [
      { name: "Sky", hex: "#0EA5E9" },
      { name: "Green", hex: "#22C55E" },
      { name: "Base", hex: "#FFFFFF" },
    ],
    principles: ["UX writing", "A11y", "SEO", "Perf"],
    tech: ["Next.js", "TS", "CSS", "Motion"],
    coverTall: P(22),
    gallery: [G(221), G(222), G(223)],
    demoUrl: "https://example.com",
  },
  {
    id: "p3",
    title: "فروشگاه گاما",
    role: "UI system + Front",
    summary: "فروشگاه با صفحات محصول، تجربه خرید ساده، و بخش پیشنهادها.",
    requirements: ["کامپوننت‌های قابل استفاده مجدد", "موبایل عالی", "UI تمیز"],
    challenges: ["کنترل تصاویر", "پرفورمنس لیست‌ها", "هماهنگی رنگ‌ها"],
    durationDays: 7,
    font: "Vazirmatn",
    colors: [
      { name: "Violet", hex: "#7C3AED" },
      { name: "Amber", hex: "#F59E0B" },
      { name: "Slate", hex: "#0F172A" },
    ],
    principles: ["Design system", "Perf", "A11y"],
    tech: ["React", "Next.js", "TS", "CSS"],
    coverTall: P(33),
    gallery: [G(331), G(332), G(333), G(334)],
    demoUrl: "https://example.com",
  },
  {
    id: "p4",
    title: "داشبورد دلتا",
    role: "Frontend",
    summary: "داشبورد مدیریتی با فیلترها، گزارش‌ها و نمایش داده‌ها.",
    requirements: ["ساختار مقیاس‌پذیر", "پرفورمنس", "کامپوننت‌های دیتا"],
    challenges: ["ریسپانسیو دیتاتیبل", "تعاملات بدون jank", "state management"],
    durationDays: 8,
    font: "Vazirmatn",
    colors: [
      { name: "Blue", hex: "#2563EB" },
      { name: "Cyan", hex: "#06B6D4" },
      { name: "Ink", hex: "#0F172A" },
    ],
    principles: ["Perf", "A11y", "Scalable UI"],
    tech: ["Next.js", "TS", "CSS", "Motion"],
    coverTall: P(44),
    gallery: [G(441), G(442), G(443)],
    demoUrl: "https://example.com",
  },
  {
    id: "p5",
    title: "پرتفولیو اپسیلون",
    role: "Design + Dev",
    summary: "پرتفولیو شیشه‌ای با تمرکز روی تجربه کاربری و نمایش پروژه‌ها.",
    requirements: ["Premium look", "RTL", "Sections تمیز", "گالری زیبا"],
    challenges: ["Hover scroll قدی", "Sheet تمام صفحه", "motion سبک"],
    durationDays: 5,
    font: "Vazirmatn",
    colors: [
      { name: "Indigo", hex: "#6366F1" },
      { name: "Sky", hex: "#0EA5E9" },
      { name: "Emerald", hex: "#10B981" },
    ],
    principles: ["Reusable UI", "Perf", "A11y"],
    tech: ["Next.js", "React", "TS", "Motion"],
    coverTall: P(55),
    gallery: [G(551), G(552), G(553), G(554)],
    demoUrl: "https://example.com",
  },
  {
    id: "p6",
    title: "سایت رویداد زتا",
    role: "Frontend",
    summary: "سایت رویداد با زمان‌بندی، اسپانسرها و ثبت‌نام.",
    requirements: ["CTA قوی", "ریسپانسیو", "انیمیشن سبک"],
    challenges: ["چینش سکشن‌ها", "حفظ خوانایی", "تصاویر کم‌حجم"],
    durationDays: 3,
    font: "Vazirmatn",
    colors: [
      { name: "Rose", hex: "#F43F5E" },
      { name: "Indigo", hex: "#4F46E5" },
      { name: "Base", hex: "#FFFFFF" },
    ],
    principles: ["UX", "Perf"],
    tech: ["React", "CSS", "Motion"],
    coverTall: P(66),
    gallery: [G(661), G(662), G(663)],
    demoUrl: "https://example.com",
  },
  // 6 تای دیگر
  ...Array.from({ length: 6 }).map((_, i) => {
    const n = 77 + i;
    return {
      id: `p${7 + i}`,
      title: `پروژه نمونه ${7 + i}`,
      role: "Frontend",
      summary: "نمونه‌کار جهت نمایش UI، کارت، گالری و تعاملات.",
      requirements: ["UI تمیز", "کارت‌های خوشگل", "ریسپانسیو"],
      challenges: ["هماهنگی اجزا", "حفظ سادگی", "بهینه‌سازی تعاملات"],
      durationDays: 2 + (i % 6),
      font: "Vazirmatn",
      colors: [
        { name: "Primary", hex: "#0EA5E9" },
        { name: "Accent", hex: "#10B981" },
        { name: "Ink", hex: "#0F172A" },
      ],
      principles: ["A11y", "Performance", "Clean UI"],
      tech: ["Next.js", "React", "CSS"],
      coverTall: P(n),
      gallery: [G(n * 10 + 1), G(n * 10 + 2), G(n * 10 + 3)],
      demoUrl: "https://example.com",
    } satisfies Project;
  }),
];

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function FastImg({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

function ProjectCard({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });

  return (
    <motion.article
      ref={ref}
      className="pcard"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pmedia">
        <div className="shot">
          <FastImg src={p.coverTall} alt={p.title} className="shotImg" />
        </div>

        <div className="pveil" aria-hidden="true" />
        <div className="ptop">
          <h3 className="ptitle">{p.title}</h3>
          {p.role ? <span className="prole">{p.role}</span> : null}
        </div>
      </div>

      <div className="pbody">
        <p className="psum">{p.summary}</p>

        <div className="techRow">
          {p.tech.slice(0, 6).map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>

        <div className="btnRow">
          <button className="btn primary" onClick={() => onOpen(p)}>
            توضیحات پروژه
          </button>
          {p.demoUrl ? (
            <a
              className="btn glass"
              href={p.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              مشاهده دمو آنلاین
            </a>
          ) : (
            <button className="btn glass" disabled>
              دمو ندارد
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectSheet({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.button
            className="backdrop"
            aria-label="Close"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
          <motion.aside
            className="sheet"
            role="dialog"
            aria-modal="true"
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 36, opacity: 0 }}
            transition={{ duration: 0.33, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sheetHead">
              <div className="sheetTitle">
                <h3>{project.title}</h3>
                <p className="muted">{project.role}</p>
              </div>
              <button className="closeBtn" onClick={onClose}>
                بستن
              </button>
            </div>

            <div className="sheetBody">
              <div className="sheetGrid">
                <section className="panel">
                  <h4>این پروژه چیه؟</h4>
                  <p>{project.summary}</p>

                  <div className="meta">
                    <div className="metaItem">
                      <span className="metaK">مدت زمان</span>
                      <span className="metaV">{project.durationDays} روز</span>
                    </div>
                    <div className="metaItem">
                      <span className="metaK">فونت</span>
                      <span className="metaV">{project.font}</span>
                    </div>
                  </div>

                  <h4>خواسته‌ها</h4>
                  <ul>
                    {project.requirements.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>

                  <h4>چالش‌ها</h4>
                  <ul>
                    {project.challenges.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>

                  <h4>تکنولوژی‌ها</h4>
                  <div className="chips2">
                    {project.tech.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h4>رنگ‌ها</h4>
                  <div className="colors">
                    {project.colors.map((c) => (
                      <div key={c.hex} className="color">
                        <span className="sw" style={{ background: c.hex }} />
                        <span className="mono">{c.hex}</span>
                        <span className="muted">{c.name}</span>
                      </div>
                    ))}
                  </div>

                  <h4>اصول رعایت‌شده</h4>
                  <div className="chips2">
                    {project.principles.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="panel">
                  <h4>گالری</h4>
                  <div className="gallery">
                    {project.gallery.map((src, i) => (
                      <div className="gItem" key={src + i}>
                        <FastImg
                          src={src}
                          alt={`${project.title} - ${i + 1}`}
                          className="gImg"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="sheetActions">
                    {project.demoUrl ? (
                      <a
                        className="btn primary"
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        مشاهده دمو آنلاین
                      </a>
                    ) : null}
                    <button className="btn glass" onClick={onClose}>
                      بستن
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </motion.aside>

          <style>{sheetCss}</style>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Project() {
  const chunks = useMemo(() => chunk(PROJECTS, 3), []);
  const [visibleChunks, setVisibleChunks] = useState(1);
  const [active, setActive] = useState<Project | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e.isIntersecting) return;
        setVisibleChunks((v) => Math.min(v + 1, chunks.length));
      },
      { threshold: 0.1, rootMargin: "260px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [chunks.length]);

  const visible = chunks.slice(0, visibleChunks).flat();

  return (
    <section id="projects" dir="rtl" className="projects">
      <div className="pbg" aria-hidden="true" />
      <div className="pgrid" aria-hidden="true" />

      <div className="wrap">
        <div className="head">
          <h2 className="MorabaFont">پروژه‌ها</h2>
          
        </div>

        <div className="cards">
          {visible.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={setActive} />
          ))}
        </div>

        <div ref={sentinelRef} className="sentinel" aria-hidden="true" />
        <ProjectSheet project={active} onClose={() => setActive(null)} />
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.projects{
  position: relative;
  padding: 70px 16px 90px;
  overflow: hidden;
  // background:
  //   radial-gradient(900px 700px at 18% 20%, rgba(99,102,241,0.12), transparent 60%),
  //   radial-gradient(900px 700px at 78% 36%, rgba(14,165,233,0.12), transparent 60%),
  //   radial-gradient(900px 700px at 50% 92%, rgba(16,185,129,0.10), transparent 60%),
  //   linear-gradient(180deg, #ffffff, #f7f9ff 55%, #ffffff);
  color: rgba(15,23,42,0.92);
}

.pbg{
  position:absolute; inset:-2px;
  pointer-events:none;
  background:
    radial-gradient(380px 260px at 22% 22%, rgba(255,255,255,0.85), transparent 62%),
    radial-gradient(480px 320px at 78% 34%, rgba(255,255,255,0.70), transparent 64%);
  opacity: .55;
  mix-blend-mode: overlay;
}

.pgrid{
  position:absolute; inset:-2px;
  pointer-events:none;
  background-image:
    linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px),
    linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px);
  background-size: 22px 22px, 22px 22px, 72px 72px, 72px 72px;
  opacity: 0.22;
  -webkit-mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 72%);
  mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 72%);
}

.wrap{
  width: min(1120px, 100%);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.head h2{ margin: 0; font-size: clamp(22px, 3vw, 30px); letter-spacing: -0.02em; }
.head p{ margin: 8px 0 0; color: rgba(15,23,42,0.65); line-height: 1.9; max-width: 68ch; }

.cards{
  margin-top: 18px;
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.pcard{
  border-radius: 22px;
  border: 1px solid rgba(15,23,42,0.12);
  background: rgba(255,255,255,0.72);
  box-shadow: 0 22px 70px rgba(15,23,42,0.10);
  overflow: hidden;
  display:flex;
  flex-direction: column;
  min-height: 420px;

  will-change: transform;
  transition:
    transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 220ms cubic-bezier(0.4, 0, 0.2, 1);
}
.pcard:hover{
  transform: translateY(-6px);
  box-shadow: 0 32px 110px rgba(15,23,42,0.14);
  border-color: rgba(255,255,255,0.34);
}

.pmedia{
  position: relative;
  height: 230px;
  overflow: hidden;
  border-bottom: 1px solid rgba(15,23,42,0.08);
}

.shot{ position:absolute; inset: 0; overflow: hidden; transform: translateZ(0); }
.shotImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transform: translateY(0);
  transition: transform 2200ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.pcard:hover .shotImg{ transform: translateY(-48%); }

.pveil{
  position:absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.05), transparent 35%, rgba(0,0,0,0.16));
  pointer-events:none;
}

.ptop{
  position:absolute;
  inset: 12px 12px auto 12px;
  display:flex;
  flex-direction: column;
  gap: 6px;
  pointer-events:none;
}
.ptitle{ margin:0; font-size: 16px; color: rgba(15,23,42,0.95); }
.prole{
  width: fit-content;
  font-size: 12px;
  color: rgba(15,23,42,0.72);
  background: rgba(255,255,255,0.82);
  border: 1px solid rgba(15,23,42,0.10);
  padding: 6px 10px;
  border-radius: 999px;
}

.pbody{
  padding: 14px;
  display:flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.psum{ margin:0; color: rgba(15,23,42,0.70); line-height: 1.9; font-size: 14px; }
.techRow{ display:flex; flex-wrap: wrap; gap: 8px; }

.pill{
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(15,23,42,0.10);
  background: rgba(255,255,255,0.76);
  color: rgba(15,23,42,0.72);
}

.btnRow{ display:flex; gap: 10px; margin-top: auto; }

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding: 11px 12px;
  border-radius: 14px;
  border: 1px solid rgba(15,23,42,0.12);
  text-decoration:none;
  background: transparent;
  cursor:pointer;
  user-select:none;

  transition:
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
    filter 200ms cubic-bezier(0.4, 0, 0.2, 1),
    background 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.btn:hover{ transform: translateY(-2px); filter: brightness(1.03); }
.btn:active{ transform: translateY(0px) scale(0.99); }
.btn:disabled{ opacity: .6; cursor:not-allowed; }

.primary{ background: rgba(15,23,42,0.92); color: white; }
.glass{ background: rgba(255,255,255,0.78); color: rgba(15,23,42,0.92); }

.sentinel{ height: 1px; }

@media (max-width: 1020px){ .cards{ grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px){ .cards{ grid-template-columns: 1fr; } .pmedia{ height: 240px; } }
`;

const sheetCss = `
.backdrop{
  position: fixed;
  inset: 0;
  background: rgba(2,6,23,0.35);
  backdrop-filter: blur(8px);
  border: 0;
  z-index: 80;
}

.sheet{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 8vh;
  z-index: 90;

  margin: 0 auto;
  width: min(1100px, calc(100% - 22px));

  border-radius: 22px 22px 0 0;
  border: 1px solid rgba(255,255,255,0.22);
  background: rgba(255,255,255,0.92);
  box-shadow: 0 40px 140px rgba(2,6,23,0.25);

  overflow: hidden;
  display:flex;
  flex-direction: column;
}

.sheetHead{
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 14px 12px;
  border-bottom: 1px solid rgba(15,23,42,0.10);
}

.sheetTitle h3{ margin:0; font-size: 16px; }
.sheetTitle .muted{ margin: 6px 0 0; color: rgba(15,23,42,0.60); font-size: 13px; }

.closeBtn{
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(15,23,42,0.12);
  background: rgba(15,23,42,0.92);
  color: white;
  cursor:pointer;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.closeBtn:hover{ transform: translateY(-1px); }
.closeBtn:active{ transform: translateY(0px) scale(0.99); }

.sheetBody{ padding: 12px 14px 18px; overflow: auto; }

.sheetGrid{ display:grid; grid-template-columns: 1.05fr .95fr; gap: 12px; }

.panel{
  border-radius: 18px;
  border: 1px solid rgba(15,23,42,0.10);
  background: rgba(255,255,255,0.92);
  padding: 12px;
}

.panel h4{ margin: 4px 0 8px; font-size: 14px; }
.panel p{ margin: 0 0 10px; color: rgba(15,23,42,0.70); line-height: 1.95; font-size: 14px; }
.panel ul{ margin: 0 0 10px; padding: 0 18px 0 0; color: rgba(15,23,42,0.70); line-height: 1.9; font-size: 14px; }
.panel li{ margin: 6px 0; }

.meta{
  display:grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 10px 0 12px;
}
.metaItem{
  border-radius: 16px;
  border: 1px solid rgba(15,23,42,0.08);
  background: rgba(255,255,255,0.90);
  padding: 10px;
}
.metaK{ display:block; font-size: 12px; color: rgba(15,23,42,0.62); }
.metaV{ display:block; margin-top: 2px; font-weight: 800; }
.chips2{ display:flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }

.colors{ display:flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px; }
.color{
  display:flex; align-items:center; gap: 10px;
  border-radius: 999px;
  border: 1px solid rgba(15,23,42,0.10);
  background: rgba(255,255,255,0.90);
  padding: 8px 10px;
}
.sw{ width: 18px; height: 18px; border-radius: 999px; border: 1px solid rgba(15,23,42,0.12); }
.mono{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.muted{ opacity: .75; }

.gallery{ display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.gItem{
  border-radius: 18px;
  overflow:hidden;
  border: 1px solid rgba(15,23,42,0.10);
  background: rgba(255,255,255,0.90);
}
.gImg{
  width:100%;
  height:auto;
  display:block;
}

.sheetActions{ display:flex; gap: 10px; margin-top: 12px; }

@media (max-width: 960px){
  .sheetGrid{ grid-template-columns: 1fr; }
  .gallery{ grid-template-columns: 1fr; }
}
`;
