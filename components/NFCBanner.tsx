"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import products from "@/data/nfc-products.json";

type Product = {
  name: string;
  welcome: string;
  emoji: string;
  color: string;
};

const productMap = products as Record<string, Product | string>;
const aliases: Record<string, string> = {
  tote: "tote-bag"
};

function productLabel(slug: string) {
  const product = productMap[aliases[slug] ?? slug];
  return typeof product === "object" && product ? product.name.replace("TAP LONDON ", "") : slug;
}

export default function NFCBanner() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nfc = params.get("nfc");
    if (!nfc) return;

    const storageKey = `tap-london-nfc-${nfc}`;
    if (sessionStorage.getItem(storageKey)) return;

    sessionStorage.setItem(storageKey, "seen");
    setMessage(`🎉 You tapped your ${productLabel(nfc)}! Welcome to TAP LONDON`);
  }, []);

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed left-3 right-3 top-20 z-[60] mx-auto max-w-3xl rounded-lg border border-gold bg-navy p-4 text-white shadow-lift"
          role="status"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-navy">TAP</span>
            <p className="flex-1 text-sm font-semibold sm:text-base">{message}</p>
            <button type="button" onClick={() => setMessage(null)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Dismiss NFC welcome">
              <X aria-hidden="true" size={18} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
