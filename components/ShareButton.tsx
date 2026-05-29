"use client";

import { Share2 } from "lucide-react";

type ShareButtonProps = {
  title: string;
  text: string;
};

export default function ShareButton({ title, text }: ShareButtonProps) {
  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  }

  return (
    <button type="button" onClick={share} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-navy shadow-premium transition hover:-translate-y-0.5 hover:bg-white">
      Share TAP LONDON with a friend <Share2 aria-hidden="true" size={17} />
    </button>
  );
}
