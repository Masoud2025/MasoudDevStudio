"use client";

import Image from "next/image";
import laptopMock from "@/public/laptopmock-removebg-preview.png";
import mobileMock from "@/public/phonemock-removebg-preview.png";

const projects = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
}));

function Projects() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-14 text-center">
        پروژه‌ها
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative bg-neutral-900 rounded-2xl p-6 overflow-hidden hover:scale-[1.02] transition-transform"
          >
            {/* Laptop */}
            <Image
              src={laptopMock}
              alt="Laptop project preview"
              width={420}
              className="mx-auto"
              priority
            />

            {/* Mobile */}
            <Image
              src={mobileMock}
              alt="Mobile project preview"
              width={120}
              className="absolute bottom-4 right-6"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
