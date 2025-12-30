type SocialLink = {
  label: string;
  href: string;
};

export default function Footer() {
  const year = new Date().getFullYear();

  const links: SocialLink[] = [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Twitter", href: "https://twitter.com/" },
  ];

  return (
    <footer className="w-full bg-[#0c151d] text-[#fff4ce]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium">Masoud Jafari</p>
            <p className="text-sm text-[#fff4ce]/70">Software Engineer</p>
          </div>

          <nav aria-label="Footer links">
            <ul className="flex flex-wrap items-center justify-center gap-4">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg px-2 py-1 text-sm text-[#fff4ce]/80 ring-1 ring-transparent transition hover:text-[#fff4ce] hover:ring-[#fff4ce]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff4ce]/60"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="h-px w-full max-w-xl bg-[#fff4ce]/15" />

          <p className="text-xs text-[#fff4ce]/60">
            © {year} Masoud Jafari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
