import React, { useState } from 'react';
import { FiFileText, FiUser, FiMail, FiTag, FiUpload, FiSend, FiCalendar, FiInfo } from 'react-icons/fi';

const TRACKS = [
  'Applied Science',
  'Engineering & Technological Advancements',
  'Education & Pedagogical Innovations',
  'Business & Management Studies',
  'Social Science and Humanities',
  'Finance, Accountancy and Marketing'
];

export default function Submission() {
  const [form, setForm] = useState({ title:'', abstract:'', track:TRACKS[0], authorName:'', authorEmail:'' });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('Submitting...');
    
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if (file) fd.append('file', file);
      
      const res = await fetch('/api/submissions', { method: 'POST', body: fd });
      const data = await res.json();
      
      setMsg(res.ok 
        ? 'Submission received. Thank you!' 
        : (data?.error || 'Submission failed. Please try again.')
      );
      
      if (res.ok) setForm({ title:'', abstract:'', track:TRACKS[0], authorName:'', authorEmail:'' });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMsg('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center space-x-2 mb-4">
        <FiInfo className="text-emerald-700 text-xl" aria-hidden="true" />
        <h1 className="text-3xl font-extrabold text-emerald-700">Submission Guidelines</h1>
      </div>
      <p className="mt-2 text-slate-800 text-lg">Please align your submission with an appropriate track.</p>

      <form onSubmit={onSubmit} className="mt-8 bg-white border-2 border-emerald-100 rounded-xl shadow-lg p-8 space-y-6">
        <label className="block">
          <div className="flex items-center mb-2">
            <FiFileText className="text-emerald-700 mr-2" aria-hidden="true" />
            <span className="font-semibold text-slate-800">Title</span>
          </div>
          <input 
            className="mt-1 w-full rounded-lg border-2 border-slate-300 p-3 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition" 
            value={form.title} 
            onChange={e=>setForm({...form,title:e.target.value})} 
            placeholder="Enter your submission title"
            required
            aria-required="true"
          />
        </label>
        
        <label className="block">
          <div className="flex items-center mb-2">
            <FiFileText className="text-emerald-700 mr-2" aria-hidden="true" />
            <span className="font-semibold text-slate-800">Abstract</span>
          </div>
          <textarea 
            className="mt-1 w-full rounded-lg border-2 border-slate-300 p-3 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition" 
            rows="6" 
            value={form.abstract} 
            onChange={e=>setForm({...form,abstract:e.target.value})} 
            placeholder="Enter your abstract (max 500 words)"
            required
            aria-required="true"
          />
        </label>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <label className="block">
            <div className="flex items-center mb-2">
              <FiTag className="text-emerald-700 mr-2" aria-hidden="true" />
              <span className="font-semibold text-slate-800">Track</span>
            </div>
            <select 
              className="mt-1 w-full rounded-lg border-2 border-slate-300 p-3 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition bg-white" 
              value={form.track} 
              onChange={e=>setForm({...form,track:e.target.value})}
              aria-label="Select submission track"
            >
              {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          
          <label className="block">
            <div className="flex items-center mb-2">
              <FiUpload className="text-emerald-700 mr-2" aria-hidden="true" />
              <span className="font-semibold text-slate-800">Upload (PDF/DOC) — optional</span>
            </div>
            <div className="mt-1 relative">
              <input 
                className="w-full rounded-lg border-2 border-slate-300 p-3 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-emerald-600 file:text-white hover:file:bg-emerald-700" 
                type="file" 
                onChange={e=>setFile(e.target.files?.[0]||null)}
                accept=".pdf,.doc,.docx" 
                aria-label="Upload paper file (optional)"
              />
            </div>
          </label>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <label className="block">
            <div className="flex items-center mb-2">
              <FiUser className="text-emerald-700 mr-2" aria-hidden="true" />
              <span className="font-semibold text-slate-800">Author Name</span>
            </div>
            <input 
              className="mt-1 w-full rounded-lg border-2 border-slate-300 p-3 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition" 
              value={form.authorName} 
              onChange={e=>setForm({...form,authorName:e.target.value})} 
              placeholder="Enter your full name"
              required
              aria-required="true"
            />
          </label>
          
          <label className="block">
            <div className="flex items-center mb-2">
              <FiMail className="text-emerald-700 mr-2" aria-hidden="true" />
              <span className="font-semibold text-slate-800">Author Email</span>
            </div>
            <input 
              className="mt-1 w-full rounded-lg border-2 border-slate-300 p-3 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition" 
              type="email" 
              value={form.authorEmail} 
              onChange={e=>setForm({...form,authorEmail:e.target.value})} 
              placeholder="Enter your email address"
              required
              aria-required="true"
            />
          </label>
        </div>
        
        <div className="pt-4">
          <button 
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:opacity-75"
            disabled={loading}
            aria-label="Submit your paper"
          >
            <FiSend className="mr-2" aria-hidden="true" />
            {loading ? 'Submitting...' : 'Submit Paper'}
          </button>
          
          {msg && (
            <div className={`mt-4 p-3 rounded-lg ${msg.includes('received') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {msg}
            </div>
          )}
        </div>
      </form>

      <div className="mt-12 bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
        <div className="flex items-center space-x-2 mb-4">
          <FiCalendar className="text-emerald-700 text-xl" aria-hidden="true" />
          <h3 className="text-2xl font-bold text-emerald-700">Important Dates</h3>
        </div>
        
        <ul className="mt-4 space-y-3 text-slate-800">
          <li className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3" aria-hidden="true"></div>
            <span className="font-bold">Early Bird registration deadline:</span>
            <span className="ml-2">31 Dec 2025</span>
          </li>
          <li className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3" aria-hidden="true"></div>
            <span className="font-bold">Abstract submission:</span>
            <span className="ml-2">31 Jan 2026</span>
          </li>
          <li className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3" aria-hidden="true"></div>
            <span className="font-bold">Full paper submission:</span>
            <span className="ml-2">28 Feb 2026</span>
          </li>
          <li className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3" aria-hidden="true"></div>
            <span className="font-bold">Final Registration:</span>
            <span className="ml-2">31 Mar 2026</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
