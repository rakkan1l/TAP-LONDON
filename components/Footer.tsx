import Link from "next/link";

const links = [
  { href: "/places", label: "Places" },
  { href: "/food", label: "Food" },
  { href: "/shopping", label: "Shopping" },
  { href: "/transport", label: "Transport" },
  { href: "/kids", label: "Kids & Family" },
  { href: "/nightlife", label: "Nightlife" },
  { href: "/muslim", label: "Muslim Guide" },
  { href: "/emergency", label: "Emergency Help" },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-heading text-3xl font-bold tracking-[0.08em] text-gold">TAP LONDON</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/72">
            Your Smart London Guide — Tap. Explore. Enjoy. Built for NFC souvenirs, mobile travellers, and unforgettable London days.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Explore</p>
          <div className="mt-4 grid gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/75 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Social</p>
          <div className="mt-4 grid gap-3 text-sm text-white/75">
            <a href="https://www.instagram.com/taplondonofficial/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
            <a href="https://www.threads.com/@taplondonofficial" target="_blank" rel="noreferrer" className="transition hover:text-white">Threads</a>
            <a href="https://www.tiktok.com/@taplondonofficial" target="_blank" rel="noreferrer" className="transition hover:text-white">TikTok</a>
            <a href="mailto:taplondonofficial@gmail.com" className="transition hover:text-white">taplondonofficial@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/55">
        © 2026 TAP LONDON. Tourism information changes; always check official venues before visiting.
      </div>
    </footer>
  );
}
