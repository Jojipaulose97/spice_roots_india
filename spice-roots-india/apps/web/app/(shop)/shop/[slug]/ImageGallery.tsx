'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ main, thumbnails, name }: { main: string; thumbnails: string[]; name: string }) {
  const [active, setActive] = useState(main);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-stone-100 rounded-3xl overflow-hidden shadow-sm ring-1 ring-stone-200">
        <Image
          src={active}
          alt={name}
          fill
          className="object-cover transition duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[main, ...thumbnails].slice(0, 4).map((thumb, i) => (
          <button
            key={i}
            onClick={() => setActive(thumb)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition focus:outline-none ${active === thumb ? 'border-orange-500 shadow-md' : 'border-stone-200 hover:border-orange-300'}`}
          >
            <Image
              src={thumb}
              alt={`${name} view ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition duration-300"
              sizes="120px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
