import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaUserTag, FaCheckCircle, FaExclamationCircle, FaPaperPlane } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({ fullName:'', email:'', role:'attendee' });
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState(null); // 'success' or 'error'

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('Submitting...');
    setStatus(null);
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMsg('Registration successful. Thank you!');
        setStatus('success');
        setForm({ fullName:'', email:'', role:'attendee' });
      } else {
        setMsg(data?.error || 'Registration failed');
        setStatus('error');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMsg('An error occurred. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 bg-amber-50">
      <h1 className="text-4xl font-extrabold text-amber-800 mb-2 text-center">Register</h1>
      <p className="text-amber-700 text-center mb-8">Complete the form below to register for the event</p>
      
      <form onSubmit={onSubmit} className="mt-6 bg-white border border-amber-200 rounded-2xl shadow-lg p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <label className="block">
            <span className="font-bold text-amber-900 flex items-center gap-2">
              <FaUser className="text-amber-600" />
              <span>Full Name</span>
            </span>
            <input 
              className="mt-2 w-full rounded-xl border border-amber-300 p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
              value={form.fullName} 
              onChange={e=>setForm({...form,fullName:e.target.value})} 
              placeholder="Enter your full name"
              required
            />
          </label>
          
          <label className="block">
            <span className="font-bold text-amber-900 flex items-center gap-2">
              <FaEnvelope className="text-amber-600" />
              <span>Email</span>
            </span>
            <input 
              className="mt-2 w-full rounded-xl border border-amber-300 p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
              type="email" 
              value={form.email} 
              onChange={e=>setForm({...form,email:e.target.value})} 
              placeholder="Enter your email address"
              required
            />
          </label>
        </div>
        
        <label className="block">
          <span className="font-bold text-amber-900 flex items-center gap-2">
            <FaUserTag className="text-amber-600" />
            <span>Role</span>
          </span>
          <select 
            className="mt-2 w-full rounded-xl border border-amber-300 p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white" 
            value={form.role} 
            onChange={e=>setForm({...form,role:e.target.value})}
          >
            <option value="attendee">Attendee</option>
            <option value="author">Author</option>
            <option value="speaker">Speaker</option>
            <option value="sponsor">Sponsor</option>
          </select>
        </label>
        
        <div className="flex justify-center mt-6">
          <button className="px-8 py-4 rounded-full bg-amber-600 text-white font-bold text-lg hover:bg-amber-700 transition duration-300 shadow-md flex items-center gap-2">
            <FaPaperPlane />
            <span>Register Now</span>
          </button>
        </div>
        
        {msg && (
          <div className={`flex items-center gap-2 p-4 rounded-xl ${
            status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
            status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
          }`}>
            {status === 'success' && <FaCheckCircle className="text-green-500 text-xl" />}
            {status === 'error' && <FaExclamationCircle className="text-red-500 text-xl" />}
            <p className="font-medium">{msg}</p>
          </div>
        )}
      </form>
      
      <p className="text-center text-amber-700 text-sm mt-8">
        By registering, you agree to our terms of service and privacy policy.
      </p>
    </section>
  );
}
