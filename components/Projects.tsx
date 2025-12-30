"use client";
import React, { useMemo, useState } from "react";

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
    {...props}
  >
    <path
      d="M14 3h7v7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14L21 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type TabKey = "projects" | "Experience / Learning Path";

type Project = {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  liveUrl: string;
};

type ProblemSolution = {
  id: string;
  problem: string;
  solution: string;
};

const ArrowIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const AccordionItem = ({ title, content }: { title: string; content: string }) => {
  const [open, setOpen] = useState(false);
  const coloredTitle = title.replace(/(problem)/i, '<span class="text-red-500">$1</span>');
  const coloredContent = content.replace(/(solution)/i, '<span class="text-green-500">$1</span>');

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
      >
        <span className="" dangerouslySetInnerHTML={{ __html: coloredTitle }} />
        <ArrowIcon open={open} />
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
          <span dangerouslySetInnerHTML={{ __html: coloredContent }} />
        </div>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("projects");

  const projects: Project[] = useMemo(() => [
    { id: "p1", name: "Project One", description: "One-line description here.", imageSrc: "/projects/p1.jpg", liveUrl: "https://example.com/p1" },
    { id: "p2", name: "Project Two", description: "One-line description here.", imageSrc: "/projects/p2.jpg", liveUrl: "https://example.com/p2" },
    { id: "p3", name: "Project Three", description: "One-line description here.", imageSrc: "/projects/p3.jpg", liveUrl: "https://example.com/p3" },
    { id: "p4", name: "Project Four", description: "One-line description here.", imageSrc: "/projects/p4.jpg", liveUrl: "https://example.com/p4" },
    { id: "p5", name: "Project Five", description: "One-line description here.", imageSrc: "/projects/p5.jpg", liveUrl: "https://example.com/p5" },
    { id: "p6", name: "Project Six", description: "One-line description here.", imageSrc: "/projects/p6.jpg", liveUrl: "https://example.com/p6" },
  ], []);

  const problems: ProblemSolution[] = [
    { id: "pb1", problem: "Problem: I needed to store user data locally while also syncing with a server.", solution: "Solution: I created a custom Next.js API route connected to a JSON file and used localStorage for optimistic UI updates before syncing." },
    { id: "pb2", problem: "Problem: Making a responsive projects grid with hover overlays that still works well on mobile.", solution: "Solution: I implemented conditional UI: hover overlays for desktop, and mobile-friendly info blocks below each card." },
    { id: "pb3", problem: "Problem: Ensuring form validation is user-friendly and real-time.", solution: "Solution: I used controlled components and added inline validation messages for instant feedback." },
    { id: "pb4", problem: "Problem: Managing complex state across multiple components.", solution: "Solution: I used React Context and useReducer for predictable and centralized state management." },
    { id: "pb5", problem: "Problem: Connecting to an external payment gateway securely.", solution: "Solution: I implemented server-side API routes with token validation and error handling for transactions." },
    { id: "pb6", problem: "Problem: Displaying large datasets without performance issues.", solution: "Solution: I used virtualization techniques and lazy loading to render only visible items." },
    { id: "pb7", problem: "Problem: Handling user authentication and session persistence.", solution: "Solution: I integrated JWT tokens and stored them securely with httpOnly cookies." },
    { id: "pb8", problem: "Problem: Ensuring dark/light mode is consistent across the app.", solution: "Solution: I implemented Tailwind CSS dark mode with class strategy and persisted preference in localStorage." },
  ];

  const tabBase = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950";
  const tabActive = "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900";
  const tabInactive = "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Projects & Experience</h2>
          </div>

          <div role="tablist" aria-label="Projects tabs" className="flex w-full gap-2 rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800 sm:w-auto">
            <button type="button" role="tab" aria-selected={activeTab === "projects"} className={`${tabBase} ${activeTab === "projects" ? tabActive : tabInactive}`} onClick={() => setActiveTab("projects")}>Projects</button>
            <button type="button" role="tab" aria-selected={activeTab === "Experience / Learning Path"} className={`${tabBase} ${activeTab === "Experience / Learning Path" ? tabActive : tabInactive}`} onClick={() => setActiveTab("Experience / Learning Path")}>Experience / Learning Path</button>
          </div>
        </header>

        <div className="mt-8">
          {activeTab === "projects" ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <article key={p.id} className="w-full">
                  <div className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                    <img src={p.imageSrc} alt={p.name} loading="lazy" className="h-56 w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-75" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 opacity-0 transition duration-300 group-hover:opacity-100 md:group-hover:flex">
                      <div className="pointer-events-auto w-full max-w-xs rounded-xl bg-slate-950/70 p-4 text-center text-white backdrop-blur">
                        <h3 className="truncate text-base font-semibold">{p.name}</h3>
                        <p className="mt-1 line-clamp-1 text-sm text-slate-200">{p.description}</p>
                        <div className="mt-3 flex items-center justify-center">
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white ring-1 ring-white/20 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label={`Open live: ${p.name}`}>
                            <ExternalLinkIcon className="h-5 w-5" /> Live
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-friendly info always visible */}
                  <div className="mt-3 flex flex-col md:hidden gap-2">
                    <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-50">{p.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950" aria-label={`Open live: ${p.name}`}>
                      <ExternalLinkIcon className="h-5 w-5" /> Live
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Problems I solved</h3>
              <div className="space-y-4">
                {problems.map((item) => (
                  <AccordionItem key={item.id} title={item.problem} content={item.solution} />
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mt-6">Official Work Experience</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>Internship at XYZ Company - Frontend Development</li>
                <li>Junior Developer at ABC Tech - React & Next.js Projects</li>
                <li>Freelance Projects for Clients - Fullstack Web Applications</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
