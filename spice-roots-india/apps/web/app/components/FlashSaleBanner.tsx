'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const LS_KEY = 'sri_flash_sale';

interface FlashSaleConfig {
  isActive: boolean;
  label: string;
  message: string;
  discountPct: number;
  endsAt: string;
}

function useCountdown(endsAtMs: number) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, endsAtMs - Date.now()));

  useEffect(() => {
    if (!endsAtMs) return;
    const update = () => setTimeLeft(Math.max(0, endsAtMs - Date.now()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endsAtMs]);

  const hours   = Math.floor(timeLeft / 3_600_000);
  const minutes = Math.floor((timeLeft % 3_600_000) / 60_000);
  const seconds = Math.floor((timeLeft % 60_000) / 1_000);
  return { hours, minutes, seconds, expired: timeLeft === 0 };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-white/20 text-white font-extrabold text-sm px-2 py-0.5 rounded-md tabular-nums min-w-7 text-center">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] text-orange-200 uppercase tracking-wide mt-0.5">{label}</span>
    </div>
  );
}

export default function FlashSaleBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [config, setConfig] = useState<FlashSaleConfig | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) setConfig(JSON.parse(stored));
    } catch {}
  }, []);

  const endsAtMs = config ? new Date(config.endsAt).getTime() : 0;
  const { hours, minutes, seconds, expired } = useCountdown(endsAtMs);

  if (dismissed || !config || !config.isActive || expired) return null;

  return (
    <div className="bg-linear-to-r from-orange-700 via-orange-600 to-amber-600 text-white py-2.5 px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />

      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-center relative z-10">
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          🌶️ <span className="font-extrabold">{config.label}</span> — {config.message}
        </span>

        <div className="flex items-center gap-1.5">
          <Digit value={hours}   label="hrs" />
          <span className="text-orange-200 font-bold text-sm self-start mt-0.5">:</span>
          <Digit value={minutes} label="min" />
          <span className="text-orange-200 font-bold text-sm self-start mt-0.5">:</span>
          <Digit value={seconds} label="sec" />
        </div>

        <Link
          href="/shop"
          className="bg-white text-orange-700 font-extrabold text-xs px-3 py-1.5 rounded-lg hover:bg-orange-50 transition shrink-0 shadow"
        >
          Shop Now →
        </Link>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-200 hover:text-white transition text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
