import React, { useState } from 'react';
import { EnvelopeIcon, UserIcon, PencilIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [msg, setMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('Sending...');
    const res = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMsg(res.ok ? 'Message sent. Thank you!' : (data?.error || 'Failed to send'));
    if (res.ok) setForm({ name:'', email:'', subject:'', message:'' });
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 theme-rose">
      <h1 className="text-4xl font-extrabold text-rose-600 mb-2 flex items-center">
        <EnvelopeIcon className="w-8 h-8 mr-2" />
        Get in Touch
      </h1>
      <p className="text-rose-500 text-lg mb-8">We'd love to hear from you! Fill out the form below to start a conversation.</p>
      
      <form onSubmit={onSubmit} className="mt-6 bg-white border border-rose-100 rounded-2xl shadow-lg p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <label className="block">
            <span className="font-semibold text-gray-700 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-rose-500" />
              Name
            </span>
            <input 
              className="mt-2 w-full rounded-xl border border-rose-200 p-3 focus:ring-2 focus:ring-rose-300 focus:outline-none" 
              value={form.name} 
              onChange={e=>setForm({...form,name:e.target.value})} 
              placeholder="Your name"
              required
            />
          </label>
          <label className="block">
            <span className="font-semibold text-gray-700 flex items-center">
              <EnvelopeIcon className="w-5 h-5 mr-2 text-rose-500" />
              Email
            </span>
            <input 
              className="mt-2 w-full rounded-xl border border-rose-200 p-3 focus:ring-2 focus:ring-rose-300 focus:outline-none" 
              type="email" 
              value={form.email} 
              onChange={e=>setForm({...form,email:e.target.value})} 
              placeholder="your.email@example.com"
              required
            />
          </label>
        </div>
        <label className="block">
          <span className="font-semibold text-gray-700 flex items-center">
            <PencilIcon className="w-5 h-5 mr-2 text-rose-500" />
            Subject
          </span>
          <input 
            className="mt-2 w-full rounded-xl border border-rose-200 p-3 focus:ring-2 focus:ring-rose-300 focus:outline-none" 
            value={form.subject} 
            onChange={e=>setForm({...form,subject:e.target.value})}
            placeholder="What's this about?"
          />
        </label>
        <label className="block">
          <span className="font-semibold text-gray-700 flex items-center">
            <PaperAirplaneIcon className="w-5 h-5 mr-2 text-rose-500" />
            Message
          </span>
          <textarea 
            className="mt-2 w-full rounded-xl border border-rose-200 p-3 focus:ring-2 focus:ring-rose-300 focus:outline-none" 
            rows="6" 
            value={form.message} 
            onChange={e=>setForm({...form,message:e.target.value})} 
            placeholder="Your message here..."
            required
          />
        </label>
        <div className="flex items-center justify-between pt-2">
          <button className="px-6 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors duration-300 flex items-center">
            <PaperAirplaneIcon className="w-5 h-5 mr-2" />
            Send Message
          </button>
          {msg && (
            <p className={`text-sm ${msg.includes('sent') ? 'text-green-600' : 'text-rose-600'} font-medium`}>
              {msg}
            </p>
          )}
        </div>
      </form>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600">You can also reach us at:</p>
        <p className="text-rose-600 font-medium mt-2">contact@example.com</p>
        <p className="text-gray-600 mt-4 text-sm">We typically respond within 1-2 business days</p>
      </div>
    </section>
  );
}
