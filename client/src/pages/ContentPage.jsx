import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL;
// Theme configurations
const themeConfig = {
  'theme-sapphire': {
    gradientFrom: 'from-blue-900',
    gradientTo: 'to-blue-600',
    accentColor: 'bg-blue-700',
    textColor: 'text-blue-800',
    buttonBg: 'bg-blue-600',
    buttonHover: 'hover:bg-blue-700',
    icon: <FaInfoCircle className="text-white text-3xl" />
  },
  'theme-violet': {
    gradientFrom: 'from-purple-900',
    gradientTo: 'to-violet-600',
    accentColor: 'bg-violet-700',
    textColor: 'text-violet-800',
    buttonBg: 'bg-violet-600',
    buttonHover: 'hover:bg-violet-700',
    icon: <FaCalendarAlt className="text-white text-3xl" />
  },
  'theme-slate': {
    gradientFrom: 'from-slate-800',
    gradientTo: 'to-slate-600',
    accentColor: 'bg-slate-700',
    textColor: 'text-slate-800',
    buttonBg: 'bg-slate-600',
    buttonHover: 'hover:bg-slate-700',
    icon: <FaMapMarkerAlt className="text-white text-3xl" />
  }
};

export default function ContentPage({ keyName, themeName }) {
  const [content, setContent] = useState(null);
  
  // Determine theme based on keyName or explicit themeName prop
  const getThemeName = () => {
    if (themeName) return themeName;
    
    switch(keyName) {
      case 'about': return 'theme-sapphire';
      case 'program': return 'theme-violet';
      case 'venue': return 'theme-slate';
      default: return 'theme-sapphire';
    }
  };
  
  const theme = themeConfig[getThemeName()];
  
  useEffect(() => { 
    fetch(`${API_BASE}/api/content/${keyName}`).then(r=>r.json()).then(setContent); 
  }, [keyName]);
  
  if (!content) return <div className="max-w-7xl mx-auto px-4 py-20">Loading...</div>;

  return (
    <section className="relative">
      {/* Background Image with Theme-specific Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} opacity-90 z-0`}>
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${theme.accentColor} flex items-center justify-center mr-4`}>
              {theme.icon}
            </div>
            <h1 className={`text-3xl font-extrabold ${theme.textColor}`}>
              {content.welcome?.heading || keyName}
            </h1>
          </div>
          
          <div className="mt-4 space-y-4 text-slate-700">
            {content.welcome?.paragraphs?.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <a href="#learn-more" className={`px-4 py-2 ${theme.buttonBg} ${theme.buttonHover} text-white rounded-md transition duration-200`}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
