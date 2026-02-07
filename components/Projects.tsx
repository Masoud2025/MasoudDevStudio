"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: "1",
    title: "سایت شرکتی",
    description: "طراحی مدرن، ریسپانسیو و سریع برای معرفی خدمات.",
    image: "https://picsum.photos/600/900?random=1",
    bgColor: "#fef3c7",
    borderColor: "#fbbf24",
  },
  {
    id: "2",
    title: "لندینگ SaaS",
    description: "صفحه فروش محصول با تمرکز روی تبدیل کاربر.",
    image: "https://picsum.photos/600/900?random=2",
    bgColor: "#dbeafe",
    borderColor: "#3b82f6",
  },
  {
    id: "3",
    title: "فروشگاه آنلاین",
    description: "UI تمیز با تجربه خرید ساده و سریع.",
    image: "https://picsum.photos/600/900?random=3",
    bgColor: "#dcfce7",
    borderColor: "#22c55e",
  },
  {
    id: "4",
    title: "داشبورد مدیریتی",
    description: "نمایش داده‌ها با ساختار مقیاس‌پذیر.",
    image: "https://picsum.photos/600/900?random=4",
    bgColor: "#ede9fe",
    borderColor: "#7c3aed",
  },
];

export default function Projects() {
  return (
    <section dir="rtl" style={{ padding: "80px 20px" }}>
      <div className="grid-container">
        {projects.map((p) => (
          <HoverCard key={p.id} project={p} />
        ))}
      </div>

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 1200px) {
          .grid-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

function HoverCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const translateY = useTransform(y, (v) => `${v}%`);

  const handleMouseEnter = () => y.set(-30);
  const handleMouseLeave = () => y.set(0);

  return (
    <motion.div
      ref={ref}
      style={{
        borderRadius: "22px",
        overflow: "hidden",
        background: project.bgColor,
        border: `2px solid ${project.borderColor}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        position: "relative",
        cursor: "pointer",
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 150 }}
    >
      {/* عکس */}
      <div
        style={{
          position: "relative",
          height: "300px",
          overflow: "hidden",
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "120%",
            objectFit: "cover",
            objectPosition: "top",
            y: translateY,
            transition: "transform 2s ease",
          }}
        />
      </div>

      {/* متن */}
      <div style={{ padding: "16px", flex: 1, position: "relative" }}>
        <h3 style={{ margin: "0 0 6px", fontSize: "18px" }}>{project.title}</h3>
        <p style={{ margin: 0, color: "#475569", fontSize: "14px", lineHeight: 1.6 }}>
          {project.description}
        </p>

        {/* دکمه کوچک روی متن */}
        <button
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            padding: "8px 12px",
            borderRadius: "12px",
            background: project.borderColor,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          پیش‌نمایش
        </button>
      </div>
    </motion.div>
  );
}
