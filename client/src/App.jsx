import React from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Submission from './pages/Submission.jsx';
import Publications from './pages/Publications.jsx';
import Register from './pages/Register.jsx';
import Contact from './pages/Contact.jsx';
import ContentPage from './pages/ContentPage.jsx';
import Admin from './pages/Admin.jsx';

const themeMap = {
    '/': 'theme-ocean',
    '/about': 'theme-sapphire',
    '/program': 'theme-violet',
    '/venue': 'theme-slate',
    '/submission': 'theme-emerald',
    '/publications': 'theme-royal',
    '/register': 'theme-amber',
    '/contact': 'theme-rose',
    '/admin': 'theme-slate'
};

function Themed({ children }) {
  const { pathname } = useLocation();
  const themeClass = themeMap[pathname] || 'theme-ocean';
  return <div className={themeClass}>{children}</div>;
}

const Nav = () => (
  <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
    <div className="container py-3 flex items-center justify-between">
      <Link to="/" className="brand-text font-extrabold text-xl">ICAEBMS 2026</Link>
      <nav className="flex items-center gap-2 text-sm">
        {[
          ['Home','/'],
          ['About','/about'],
          ['Program','/program'],
          ['Venue','/venue'],
          ['Submission','/submission'],
          ['Publications','/publications'],
          ['Register','/register'],
          ['Contact','/contact'],
          ['Admin','/admin']
        ].map(([label, to]) => (
          <NavLink key={to} to={to} end={to==='/'}
            className={({isActive}) => `px-3 py-2 rounded-full ${isActive ? 'brand-bg text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="brand-bg text-[color:var(--on-brand)]">
    <div className="container py-6 text-sm">
      © 2026 ICAEBMS | Confworld Educational Research and Development Association
    </div>
  </footer>
);

export default function App() {
  return (
    <Themed>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<ContentPage keyName="about" />} />
          <Route path="/program" element={<ContentPage keyName="program" />} />
          <Route path="/venue" element={<ContentPage keyName="venue" />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Themed>
  );
}
