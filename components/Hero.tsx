import Image from "next/image";
import NotFoundImg from "../public/HeroImage/ErrorNotFound-removebg-preview.png";
import RightArrow from "../public/HeroImage/Right arrow .jpg";
import ProgrammerFoundImg from "../public/HeroImage/programmerFound-removebg-preview.png";
import Arrow from "../public/icons/Bottom Alignment.svg";
import GithubIcon from "../public/icons/github.svg";
import Linkedin from "../public/icons/linkedin.svg";
import Twitter from "../public/icons/twitter.svg";

type Stat = { label: string; value: string };

export default function Hero() {
  const stats: Stat[] = [
    { value: "3+", label: "Years experience" },
    { value: "0", label: "Completed projects" },
    { value: "2", label: "Satisfied customers" },
  ];

  return (
    <section className="w-full bg-[#0c151d] text-[#fff4ce]">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Masoud Jafari
        </h1>

        <h2 className="mt-2 text-pretty text-base font-medium text-[#fff4ce]/70 sm:text-lg">
          Software Engineer
        </h2>

        {/* Socials */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            { href: "https://github.com/", label: "GitHub", icon: GithubIcon },
            {
              href: "https://linkedin.com/",
              label: "LinkedIn",
              icon: Linkedin,
            },
            { href: "https://twitter.com/", label: "Twitter", icon: Twitter },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="rounded-full p-2 ring-1 ring-[#fff4ce]/20 transition hover:bg-[#fff4ce]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff4ce]/60"
            >
              <Image
                src={s.icon}
                alt={`${s.label} icon`}
                width={28}
                height={28}
                sizes="28px"
                className="h-7 w-7"
              />
            </a>
          ))}
        </div>
        <div className="HeroImages flex flex-col justify-between items-center md:hidden ">
          <Image src={NotFoundImg} alt=""  />
          <Image
            src={RightArrow}
            alt=""
            width={80}
            height={4}
            className="h-14 mt-3 rotate-90"
          />
          <Image src={ProgrammerFoundImg} alt=""  />
        </div>
        {/* Stats */}
        <dl className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-transparent p-4 ring-1 ring-[#fff4ce]/15"
            >
              <dt className="text-xs font-medium text-[#fff4ce]/70">
                {s.label}
              </dt>
              <dd className="mt-1 text-xl font-semibold">{s.value}</dd>
            </div>
          ))}
        </dl>

        {/* CTAs */}
        <div className="mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/Masoud-Jafari-CV.pdf"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#fff4ce] px-5 py-3 text-sm font-semibold text-[#0c151d] transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff4ce]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c151d]"
          >
            Download CV
            <Image
              src={Arrow}
              alt="Download arrow"
              width={18}
              height={18}
              sizes="18px"
              className="h-[18px] w-[18px]"
            />
          </a>

          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-transparent px-5 py-3 text-sm font-semibold ring-1 ring-[#fff4ce]/25 transition hover:bg-[#fff4ce]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff4ce]/60 sm:w-auto"
          >
            Contact me
          </a>
        </div>

        <p className="mt-6 max-w-xl text-sm text-[#fff4ce]/70">
          Building modern web apps with React, TypeScript, and clean UI.
        </p>
      </div>
    </section>
  );
}
