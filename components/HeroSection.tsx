"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 london-skyline opacity-95" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,168,76,0.2),transparent_34%),linear-gradient(180deg,rgba(26,26,46,0.05),rgba(26,26,46,0.92))]" aria-hidden="true" />
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
