/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ketaback from "../public/Ketabak.png";
import Shopimage from '../public/onlineShopUI.png';
import cub3d from "../public/3D.png";
import hastiva from "../public/hastiva.png";

const projects = [
  {
    id: "1",
    title: "سایت شرکتی",
    image: Shopimage,
    preview: "https://masoud-jafari.vercel.app/showcase/demo1",
    tech: {
      font: "IRANSansX",
      architecture: "Atomic Design",
      pattern: "Component-Based Architecture",
    },
    gallery: [
      "https://picsum.photos/800/600?random=11",
      "https://picsum.photos/800/600?random=12",
    ],
  },
  {
    id: "2",
    title: "کتابک",
    image: ketaback,
    preview: "https://example.com",
    tech: {
      font: "Vazirmatn",
      architecture: "Feature-Sliced Design",
      pattern: "Modular Monolith",
    },
    gallery: [
      "https://picsum.photos/800/600?random=21",
      "https://picsum.photos/800/600?random=22",
    ],
  },
  {
    id: "3",
    title: "3بعدی ",
    image: cub3d,
    preview: "https://masoud-jafari.vercel.app/",
    tech: {
      font: "IRANYekan",
      architecture: "MVC",
      pattern: "Layered Architecture",
    },
    gallery: [
      "https://picsum.photos/800/600?random=31",
      "https://picsum.photos/800/600?random=32",
    ],
  },
  {
    id: "4",
    title: "هشتیوا",
    image: hastiva,
    preview: "https://hashtiva.vercel.app/",
    tech: {
      font: "Inter",
      architecture: "Component Driven",
      pattern: "SPA Architecture",
    },
    gallery: [
      "https://picsum.photos/800/600?random=41",
      "https://picsum.photos/800/600?random=42",
    ],
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <>
      <section dir="rtl" style={{ padding: "80px 20px" }}>
        <div className="grid-container">
          {projects.map((p) => (
            <HoverCard key={p.id} project={p} onOpen={setActiveProject} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1600px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}

function HoverCard({
  project,
  onOpen,
}: {
  project: (typeof projects)[0];
  onOpen: any;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      style={{
        cursor: "pointer",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <img
        src={project.image.src}
        alt={project.title}
        style={{
          width: "100%",
          height: "280px",
          objectFit: "cover",
          display: "block",
        }}
      />

      <div style={{ padding: "15px 20px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>{project.title}</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => window.open(project.preview, "_blank")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "12px",
              border: "1px solid #000",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            پیش‌نمایش
          </button>
          <button
            onClick={() => onOpen(project)}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "12px",
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            جزئیات
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        zIndex: 1000,
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "40px 30px",
          maxWidth: "900px",
          width: "100%",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            border: "none",
            background: "transparent",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>{project.title}</h2>
        <p style={{ marginBottom: "30px", lineHeight: 1.6 }}>
          این پروژه با معماری <strong>{project.tech.architecture}</strong> توسعه یافته و از
          الگوی <strong>{project.tech.pattern}</strong> استفاده می‌کند.
          <br />
          فونت اصلی پروژه: <strong>{project.tech.font}</strong>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {project.gallery.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "16px",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
