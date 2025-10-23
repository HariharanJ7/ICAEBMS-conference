import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Nav = () => {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu when the route changes
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    ['Home','/'],
    ['About','/about'],
    ['Program','/program'],
    ['Venue','/venue'],
    ['Submission','/submission'],
    ['Publications','/publications'],
    ['Register','/register'],
    ['Contact','/contact'],
    ['Admin','/admin']
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 text-white backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl tracking-tight">
          ICAEBMS 2026
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'px-3 py-2 rounded-full font-medium transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                  isActive
                    ? 'bg-white text-slate-900'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800'
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            // X icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu (opens only on click) */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? 'block' : 'hidden'} border-t border-slate-800 bg-slate-900/95 backdrop-blur`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <nav className="grid gap-1 text-sm">
            {links.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  [
                    'block w-full px-3 py-2 rounded-lg font-medium',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
                    isActive
                      ? 'bg-white text-slate-900'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800'
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Nav;
