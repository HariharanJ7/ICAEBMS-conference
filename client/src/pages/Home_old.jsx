import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner.jsx';
import LogosBar from '../components/LogosBar.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  const [content, setContent] = useState(null);
  
  // const API = import.meta.env.VITE_API_URL || '';
  // useEffect(() => {
  //   fetch(`${API}/api/content/home`).then(r => r.json()).then(setContent);
  // }, []);

  useEffect(() => { fetch('/api/content/home').then(r=>r.json()).then(setContent); }, []);
  if (!content) return <div className="container section">Loading...</div>;
  return (
    <>
      <Banner banner={content.banner} />
      <LogosBar logos={content.banner?.logos} />

      {/* Welcome */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-primary">{content.welcome?.heading}</h2>
            <div className="mt-4 space-y-4 text-slate-700">
              {content.welcome?.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white border shadow-card p-6">
            <h3 className="font-semibold text-slate-800">Event Snapshot</h3>
            <ul className="mt-3 text-sm text-slate-700 space-y-2">
              <li>Hybrid Conference: In Person + Online</li>
              <li>10–11 Aug, 2026 — Bangkok, Thailand</li>
              <li>Organized by CERADA</li>
            </ul>
            <Link to="/register" className="mt-5 inline-block px-4 py-2 rounded-full bg-secondary text-white">Reserve Your Seat</Link>
          </div>
        </div>
      </section>

      {/* Theme */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-primary">{content.conferenceTheme?.heading}</h2>
          {content.conferenceTheme?.intro?.map((p, i) => <p key={i} className="mt-4 text-slate-700">{p}</p>)}
          <h3 className="mt-6 font-bold text-slate-900">Through this theme, ICAEBMS seeks</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3">
            {content.conferenceTheme?.seeks?.map((b, i) => (
              <li key={i} className="flex gap-3 items-start bg-white border rounded-xl p-4 shadow-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                <span className="text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-primary">Key Highlights of ICAEBMS</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {content.highlights?.map((h, i) => (
            <div key={i} className="p-5 bg-white border rounded-2xl shadow-card">
              <p className="text-slate-700">{h}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks + Deadlines */}
      <section className="bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-extrabold text-primary">Session Tracks / Call for Papers</h2>
            <ul className="mt-6 space-y-3">
              {content.tracks?.map((t, i) => (
                <li key={i} className="p-4 bg-white border rounded-xl shadow-sm">{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Submission Deadlines</h3>
            <ol className="mt-6 relative border-s-2 border-indigo-200">
              {content.deadlines?.map((d, i) => (
                <li key={i} className="ms-4 mb-6">
                  <div className="absolute w-3 h-3 rounded-full bg-secondary -ms-[9px] mt-2"></div>
                  <p className="font-semibold">{d.label}</p>
                  <p className="text-slate-600">{d.date}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-slate-700">
              {content.cfpNoteLinkText?.replace('Submission Page', '')}
              <Link className="text-secondary font-semibold underline" to="/submission">Submission Page</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-primary">Why Join Us at ICAEBMS?</h2>
        <p className="mt-4 text-slate-700">
          The International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities (ICAEBMS) is more than just an academic event, it’s a global platform for innovation, collaboration and growth.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {content.whyJoin?.map((b, i) => (
            <div key={i} className="p-5 bg-white border rounded-2xl shadow-card">
              <p className="text-slate-700">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proceedings */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-primary">Proceedings & Publications</h2>
          <p className="mt-4 text-slate-700">{content.proceedings?.logosText}</p>
          <p className="mt-2 italic text-slate-600">{content.proceedings?.note}</p>
        </div>
      </section>
    </>
  );
}
