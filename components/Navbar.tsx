"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/places", label: "Places" },
  { href: "/food", label: "Food" },
  { href: "/shopping", label: "Shopping" },
  { href: "/transport", label: "Transport" },
  { href: "/services", label: "Services" },
  { href: "/offers", label: "Offers" }
];

function BridgeIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8 text-gold" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" />
      <path d="M9 31h30M14 31V17h6v14M28 31V17h6v14M18 17l6-5 6 5M12 24c6-5 18-5 24 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/35 bg-cream/86 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="group flex min-h-12 items-center gap-3" onClick={() => setOpen(false)}>
          <BridgeIcon />
          <span className="font-heading text-xl font-bold tracking-[0.08em] text-navy">TAP LONDON</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link relative min-h-11 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-navy/80 transition hover:text-navy"
                data-active={active}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-navy/10 bg-cream px-4 pb-5 pt-2 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center rounded-full px-4 text-base font-semibold transition ${
                    active ? "bg-navy text-white" : "bg-white text-navy hover:bg-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
