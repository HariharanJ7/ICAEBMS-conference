import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner({ banner }) {
  if (!banner) return null;
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white">
      {/* marquee */}
      <div className="bg-primary text-white overflow-hidden">
        <div className="whitespace-nowrap py-2 animate-marquee">
          <span className="mx-6">{banner.scrollingText}</span>
          <span className="mx-6">Hybrid: In Person + Online • Bangkok, Thailand • 10–11 Aug, 2026</span>
          <span className="mx-6">ISBN: 978-95-813001-3-6</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
              {banner.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-slate-800">{banner.theme}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {[banner.hybrid, banner.date, banner.location, banner.organizedBy, banner.isbn].map((m,i)=>(
                <li key={i} className="px-3 py-1 rounded-full bg-white border text-slate-700 shadow-sm">
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="px-5 py-3 rounded-full bg-primary text-white shadow-card hover:shadow-lg transition">
                Register Now
              </Link>
              <Link to="/submission" className="px-5 py-3 rounded-full bg-white border border-slate-300 shadow hover:bg-slate-50">
                Submit Paper
              </Link>
            </div>
          </div>

          {/* logos block on right */}
          <div className="rounded-2xl bg-white/70 border shadow-card p-6">
            <p className="text-sm text-slate-500 mb-4">Partner Indexing and Organizers</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
              {banner.logos?.map((l, i) => (
                <img key={i} src={l.url} alt={l.alt || l.name}
                     className="h-12 object-contain grayscale hover:grayscale-0 transition" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
