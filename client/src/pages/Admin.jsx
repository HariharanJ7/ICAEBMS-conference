import React, { useState } from 'react';
import { FiUsers, FiFileText, FiLock, FiDownload, FiMail, FiCalendar, FiUser, FiTag, FiRefreshCw } from 'react-icons/fi';

const API_BASE = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [creds, setCreds] = useState({ u: '', p: '' });
  const [users, setUsers] = useState([]);
  const [subs, setSubs] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const headers = creds.u && creds.p ? { Authorization: 'Basic ' + btoa(`${creds.u}:${creds.p}`) } : {};

  async function load() {
    setLoading(true);
    setStatus('Loading...');
    try {
      const [ru, rs] = await Promise.all([
        fetch(`${API_BASE}/api/admin/users`, { headers }),
        fetch(`${API_BASE}/api/admin/submissions`, { headers })
      ]);
      
      if (!ru.ok || !rs.ok) { 
        setStatus('Invalid admin credentials'); 
        return; 
      }
      
      setUsers(await ru.json());
      setSubs(await rs.json());
      setStatus('Data loaded successfully');
    } catch (error) {
      setStatus('Error loading data: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 theme-slate">
      <div className="bg-slate-800 text-white p-6 rounded-t-2xl flex items-center space-x-3">
        <FiLock className="text-2xl" />
        <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-b-2xl shadow-lg p-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
          <h2 className="text-slate-700 font-bold mb-3 flex items-center">
            <FiUser className="mr-2" /> Authentication
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-slate-400" />
              </div>
              <input 
                className="rounded-xl border border-slate-300 p-3 pl-10 w-full focus:ring-2 focus:ring-slate-500 focus:border-slate-500" 
                placeholder="Username" 
                value={creds.u} 
                onChange={e => setCreds({...creds, u: e.target.value})}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-slate-400" />
              </div>
              <input 
                className="rounded-xl border border-slate-300 p-3 pl-10 w-full focus:ring-2 focus:ring-slate-500 focus:border-slate-500" 
                placeholder="Password" 
                type="password" 
                value={creds.p} 
                onChange={e => setCreds({...creds, p: e.target.value})}
              />
            </div>
            
            <button 
              onClick={load} 
              disabled={loading}
              className="rounded-xl bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 flex items-center justify-center font-medium transition-colors"
            >
              {loading ? <FiRefreshCw className="animate-spin mr-2" /> : <FiRefreshCw className="mr-2" />}
              Load Data
            </button>
          </div>
          
          <div className={`mt-3 px-4 py-2 rounded-lg text-sm ${
            status.includes('Error') || status.includes('Invalid') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : status.includes('success') 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'text-slate-600'
          }`}>
            {status || 'Enter credentials to access admin data'}
          </div>
        </div>

        <div className="mt-8 mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center mb-4">
            <FiUsers className="mr-2 text-slate-600" /> Registrations
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left font-semibold text-slate-700">Name</th>
                  <th className="p-3 text-left font-semibold text-slate-700">Email</th>
                  <th className="p-3 text-left font-semibold text-slate-700">Role</th>
                  <th className="p-3 text-left font-semibold text-slate-700">Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? users.map(u => (
                  <tr key={u.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">{u.fullName}</td>
                    <td className="p-3 text-slate-700 flex items-center">
                      <FiMail className="mr-2 text-slate-400" />
                      {u.email}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 flex items-center">
                      <FiCalendar className="mr-2 text-slate-400" />
                      {new Date(u.createdAt).toLocaleString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-slate-500">No users to display</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-800 flex items-center mb-4">
            <FiFileText className="mr-2 text-slate-600" /> Submissions
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left font-semibold text-slate-700">Title</th>
                  <th className="p-3 text-left font-semibold text-slate-700">Author</th>
                  <th className="p-3 text-left font-semibold text-slate-700">Email</th>
                  <th className="p-3 text-left font-semibold text-slate-700">Track</th>
                  <th className="p-3 text-left font-semibold text-slate-700">File</th>
                  <th className="p-3 text-left font-semibold text-slate-700">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {subs.length > 0 ? subs.map(s => (
                  <tr key={s.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">{s.title}</td>
                    <td className="p-3 text-slate-700">{s.authorName}</td>
                    <td className="p-3 text-slate-700">{s.authorEmail}</td>
                    <td className="p-3">
                      <span className="flex items-center">
                        <FiTag className="mr-1 text-slate-400" />
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {s.track}
                        </span>
                      </span>
                    </td>
                    <td className="p-3">
                      {s.filePath ? (
                        <a 
                          className="flex items-center text-blue-600 hover:text-blue-800 font-medium" 
                          href={s.filePath} 
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FiDownload className="mr-1" />
                          Download
                        </a>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-600 flex items-center">
                      <FiCalendar className="mr-2 text-slate-400" />
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-slate-500">No submissions to display</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
