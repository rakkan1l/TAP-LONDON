"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-[linear-gradient(135deg,#070814_0%,#10152b_42%,#1a1a2e_72%,#08111f_100%)] text-white">
      <div className="absolute inset-0 london-skyline opacity-95" aria-hidden="true" />
      <svg className="absolute inset-x-0 bottom-[16%] h-44 w-full text-gold/30 sm:h-56" viewBox="0 0 1440 260" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 205H1440" stroke="currentColor" strokeWidth="3" />
        <path d="M60 205V138H118V205M154 205V86H220V205M264 205V125H320V205M366 205V52H438V205M488 205V105H548V205M604 205V72H682V205M728 205V118H786V205M842 205V40H912V205M970 205V96H1034V205M1082 205V132H1148V205M1196 205V70H1262V205M1308 205V116H1378V205" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
        <path d="M166 205C245 146 352 146 430 205M945 205C1015 152 1114 152 1185 205" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <circle cx="720" cy="112" r="54" stroke="currentColor" strokeWidth="5" />
        <path d="M720 58V166M666 112H774M682 74L758 150M758 74L682 150" stroke="currentColor" strokeWidth="3" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(201,168,76,0.20),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(77,111,171,0.26),transparent_30%),linear-gradient(180deg,rgba(7,8,20,0.1),rgba(7,8,20,0.90))]" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/10 px-4 py-2 text-sm font-semibold text-gold backdrop-blur">
            <MapPin aria-hidden="true" size={18} />
            taplondon.co.uk
          </div>
          <h1 className="font-heading text-5xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
            Welcome to London
          </h1>
          <motion.div
            className="mt-5 h-1.5 w-44 rounded-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: 176 }}
            transition={{ delay: 0.25, duration: 0.75, ease: "easeOut" }}
          />
          <p className="mt-7 max-w-2xl text-xl leading-8 text-white/82 sm:text-2xl">
            TAP LONDON - Your smart guide to the city.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/places" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 text-base font-bold text-navy shadow-premium transition hover:-translate-y-0.5 hover:bg-white">
              Start exploring <ArrowRight aria-hidden="true" size={19} />
            </Link>
            <Link href="/nfc/keyring" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 px-7 text-base font-bold text-white backdrop-blur transition hover:border-gold hover:text-gold">
              Try an NFC landing page
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
