import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import MapEmbed from "@/components/MapEmbed";
import transport from "@/data/transport.json";

export const metadata: Metadata = {
  title: "London Transport & Maps",
  description: "Tube, bus, train, taxi, maps, Citymapper, TfL, and National Rail links for London visitors."
};

export default function TransportPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Transport & Maps</p>
          <h1 className="mt-3 font-heading text-5xl font-bold text-navy">Move Around London with Confidence</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">A practical guide to Tube zones, contactless fares, buses, trains, taxis, and journey planning.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {transport.sections.map((section) => (
            <article key={section.id} className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-3xl font-bold text-navy">{section.title}</h2>
              <p className="mt-3 text-base leading-7 text-ink/70">{section.summary}</p>
              <div className="mt-5 grid gap-3">
                {section.tips.map((tip) => (
                  <p key={tip} className="flex gap-3 text-sm leading-6 text-ink/72">
                    <CheckCircle2 aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-gold" />
                    {tip}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {section.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/10 px-4 text-sm font-bold text-navy transition hover:border-gold hover:bg-gold/10">
                    {link.label} <ArrowUpRight aria-hidden="true" size={15} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.65fr]">
          <MapEmbed />
          <aside className="rounded-lg bg-navy p-6 text-white shadow-premium">
            <h2 className="font-heading text-3xl font-bold">Quick Links</h2>
            <div className="mt-5 grid gap-3">
              {transport.quickLinks.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-between rounded-full bg-white/10 px-4 text-sm font-bold transition hover:bg-gold hover:text-navy">
                  {link.label}
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
