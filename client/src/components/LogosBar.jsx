import React from 'react';

export default function LogosBar({ logos = [] }) {
  if (!logos.length) return null;
  return (
    <section className="border-y bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center">
        {logos.map((l, idx) => (
          <img key={idx} src={l.url} alt={l.alt || l.name}
               className="h-10 object-contain opacity-80 hover:opacity-100 transition" />
        ))}
      </div>
    </section>
  );
}
