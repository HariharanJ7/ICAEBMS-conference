import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/* tiny helper for staggered delays via style prop */
const delay = ms => ({ animationDelay: `${ms}ms` });

export default function Home() {
  const [content, setContent] = React.useState(null);
  useEffect(() => { fetch('/api/content/home').then(r=>r.json()).then(setContent); }, []);
  if (!content) return <div className="container py-16">Loading...</div>;

  // Default content if API fails
  const defaultContent = {
    banner: {
      scrollingText: "International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities",
      hybrid: "Hybrid Conference: In Person + Online",
      location: "Bangkok, Thailand",
      date: "10-11 Aug, 2026",
      isbn: "ISBN: 978-00-01161-0-3",
      title: "International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities (ICAEBMS)",
      theme: "Theme: \"Interdisciplinary Innovations for a Sustainable Future\"",
      organizedBy: "Organized by: Confuzed Educational Research and Development Association",
      logos: [
        { url: "/assets/cerada-logo.png", name: "CERADA logo", alt: "CERADA logo" },
        { url: "/assets/icaebms-logo.png", name: "ICAEBMS logo", alt: "ICAEBMS logo" },
        { url: "/assets/doci-logo.png", name: "DOCI logo", alt: "DOCI logo" },
        { url: "/assets/scopus-logo.png", name: "Scopus logo", alt: "Scopus logo" },
        { url: "/assets/wos-logo.png", name: "Clarivate Web of Science logo", alt: "Clarivate Web of Science logo" }
      ]
    },
    welcome: {
      heading: "Welcome to ICAEBMS 2026",
      paragraphs: [
        "We cordially invite you to the International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities (ICAEBMS 2026).",
        "Theme \"Interdisciplinary Innovations for a Sustainable Future\" ICAEBMS serves as a global platform where researchers, academics and professionals from around the world come together to exchange ideas, present findings and build collaborations across disciplines.",
        "The conference is not just an academic gathering; it is a space for innovation, interchange and the creation of sustainable solutions for our future. Through cross-disciplinary connections in science, engineering, education, business, management, social sciences and humanities, ICAEBMS fosters interdisciplinary connections that pave the way for meaningful change.",
        "Join us in shaping the future through knowledge, research and collaboration. Together, we can drive progress for a more sustainable and equitable world."
      ]
    },
    conferenceTheme: {
      heading: "Conference Theme",
      intro: [
        "\"Interdisciplinary Innovations for a Sustainable Future\"",
        "The theme reflects the core vision of ICAEBMS bringing together diverse fields of knowledge to address global challenges. By uniting applied science, engineering, education, business, management, social sciences and humanities, the conference aims to foster creativity, collaboration and sustainable solutions that transcend traditional boundaries."
      ],
      seeks: [
        "To encourage interdisciplinary collaboration among researchers, academicians, industry experts and policymakers.",
        "To bridge the gap between science, technology, business and society through knowledge sharing and discussion.",
        "To promote innovative research and practices that contribute to sustainable development goals.",
        "To empower future leaders and young scholars with insights and opportunities for global engagement.",
        "To facilitate solutions that are practical, inclusive and impactful in addressing real-world challenges."
      ]
    },
    highlights: [
      "Multidisciplinary Platform - A unique forum uniting applied science, engineering, education, business, management, social science and humanities professionals under one roof.",
      "Global Participation - Engage with renowned scholars, industry leaders and professionals from across the world.",
      "Publication Opportunities - Selected papers will be considered for publication in indexed journals. Selected papers from the conference will be considered for publication in high-impact journals, offering authors the chance to showcase their research on a global platform.",
      "Expert Keynote Sessions - Insights from distinguished speakers on cutting-edge research and global challenges.",
      "Interactive Workshops & Panel Discussions - Hands-on learning and thought-provoking debates on contemporary issues.",
      "Networking Opportunities - Build academic, industrial and international connections that last.",
      "Recognition & Awards - Best paper and presentation awards to acknowledge outstanding contributions.",
      "Student & Young Researcher Engagement - Special sessions to inspire and guide the next generation of scholars."
    ],
    tracks: [
      "Session 1: Applied Science",
      "Session 2: Engineering & Technological Advancements",
      "Session 3: Education & Pedagogical Innovations",
      "Session 4: Business & Management Studies",
      "Session 5: Social Science and Humanities",
      "Session 6: Finance, Accountancy and Marketing"
    ],
    deadlines: [
      { label: "Early bird registration deadline", date: "31 Dec 2025" },
      { label: "Abstract submission", date: "31 Jan 2026" },
      { label: "Full paper submission", date: "28 Feb 2026" },
      { label: "Final Registration", date: "31 Mar 2026" }
    ],
    cfpNoteLinkText: "For detailed submission guidelines, please visit the Submission Page.",
    whyJoin: [
      "Present Your Research - Share your ideas, findings and innovations with a global audience.",
      "Get Published - Opportunities to publish in reputed journals with high impact factor and indexed conference proceedings.",
      "Learn from Experts - Gain insights from keynote addresses, workshops and panel discussions by leading international professionals.",
      "Expand Your Network - Connect with academicians, industry leaders, policymakers and fellow researcher worldwide.",
      "Interdisciplinary Exposure - Explore diverse perspectives by engaging with multiple fields of study.",
      "Global Visibility - Enhance your academic profile and contribute to international collaborations.",
      "Empower the Future - Inspire and be inspired by young researchers, innovators and thought leaders."
    ],
    proceedings: {
      logosText: "Scopus, DOCI, Web of Science and Clarivate logo",
      note: "Note: ICAEBMS - 2026 Proceedings will be submitted to the Web of Science Book citation index (BCI) and Scopus for evaluation and indexing purposes (*T&C* apply)."
    }
  };

  // Merge API content with default content or use default if API fails
  const b = content?.banner || defaultContent.banner;
  const mergedContent = {
    ...defaultContent,
    ...content,
    banner: b
  };

  return (
    <>
      {/* HERO */}
      <section className="hero-grad">
        {/* marquee using brand color for strong contrast */}
        <div className="marquee text-white" style={{ backgroundColor: 'var(--brand)' }}>
          <span>{b.scrollingText}</span>
          <span>{b.hybrid}</span>
          <span>{b.location}</span>
          <span>{b.date}</span>
          <span>{b.isbn}</span>
        </div>

        <div className="container py-10">
          <div className="rounded-3xl bg-white border shadow-[0_20px_60px_-24px_rgba(16,24,40,.25)] overflow-hidden">
            {/* micro header */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-4 border-b">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary grid place-items-center font-bold">C</span>
                <span className="text-xs text-slate-600 font-semibold">ICAEBMS</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Link to="/register"
                  className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-xs font-semibold shadow hover:shadow-lg transition">
                  Register
                </Link>
                <Link to="/submission"
                  className="inline-flex items-center rounded-full bg-white border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition">
                  Submit
                </Link>
              </div>
            </div>

            {/* main grid */}
            <div className="grid lg:grid-cols-2 gap-8 px-6 sm:px-10 py-10 items-center">
              {/* LEFT copy */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-primary underline-grow animate-fade-up">
                  {b.title}
                </h1>
                <p className="mt-4 text-lg font-semibold text-slate-800 animate-fade-up" style={delay(120)}>
                  {b.theme}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[b.hybrid,b.date,b.location,b.organizedBy,b.isbn]
                    .filter(Boolean)
                    .map((m,i)=>(
                      <span key={i}
                        className="animate-pop rounded-full bg-slate-50 border text-slate-700 px-3 py-1 text-xs"
                        style={delay(150 + i*40)}>
                        {m}
                      </span>
                    ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/register"
                    className="animate-fade-up inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold shadow hover:shadow-lg transition"
                    style={delay(220)}>
                    Join Now
                  </Link>
                  <Link to="/submission"
                    className="animate-fade-up inline-flex items-center justify-center rounded-full bg-white border border-slate-300 text-slate-800 px-5 py-3 text-sm font-semibold shadow hover:bg-slate-50 transition"
                    style={delay(260)}>
                    Call for Papers
                  </Link>
                </div>
              </div>

              {/* RIGHT collage with float animation */}
              <div className="relative rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 aspect-[4/3] rounded-xl border overflow-hidden animate-float">
                    <img src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Conference attendees collaborating" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-xl border overflow-hidden animate-float-slow" style={delay(200)}>
                    <img src="https://images.pexels.com/photos/7647893/pexels-photo-7647893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Academic presentation" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[4/3] rounded-xl border overflow-hidden col-span-3 animate-float" style={delay(400)}>
                    <img src="https://images.pexels.com/photos/3184407/pexels-photo-3184407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Sustainable innovation concept" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* logos line */}
            <div className="px-6 sm:px-10 py-6 border-t grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center">
              {b.logos?.map((l,i)=>(
                <img key={i} src={l.url} alt={l.alt||l.name}
                  className="h-10 object-contain grayscale hover:grayscale-0 transition animate-fade-up"
                  style={delay(80 + i*50)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME - with background image */}
      <section 
        className="py-16 bg-cover bg-center bg-no-repeat relative"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/2566121/pexels-photo-2566121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-extrabold text-primary animate-fade-up">{mergedContent.welcome?.heading}</h2>
              <div className="mt-4 space-y-4 text-slate-700">
                {mergedContent.welcome?.paragraphs?.map((p,i)=>(
                  <p key={i} className="animate-fade-up" style={delay(80 + i*60)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white border shadow-[0_10px_30px_-12px_rgba(16,24,40,.2)] p-6 animate-fade-up" style={delay(150)}>
              <h3 className="font-semibold text-slate-800 mb-4">Event Snapshot</h3>
              {/* Adding event snapshot image */}
              <div className="mb-4 rounded-xl overflow-hidden shadow-md">
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Bangkok conference venue" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <ul className="mt-3 text-sm text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">📅</span> Hybrid: In Person + Online
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">📍</span> 10-11 Aug, 2026 — Bangkok, Thailand
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">🏢</span> Organized by CERADA
                </li>
              </ul>
              <Link to="/register"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow hover:shadow-lg transition w-full">
                Reserve Your Seat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THEME */}
      <section className="bg-slate-50">
        <div className="container py-16">
          <h2 className="text-3xl font-extrabold text-primary animate-fade-up">{mergedContent.conferenceTheme?.heading}</h2>
          {mergedContent.conferenceTheme?.intro?.map((p,i)=>(
            <p key={i} className="mt-4 text-slate-700 animate-fade-up" style={delay(80 + i*60)}>{p}</p>
          ))}
          <div className="mt-8 flex justify-center">
            <img 
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Interdisciplinary collaboration" 
              className="rounded-xl shadow-lg max-w-full w-3/4 h-64 object-cover animate-pop"
            />
          </div>
          <h3 className="mt-8 font-bold text-slate-900 animate-fade-up" style={delay(160)}>Through this theme, ICAEBMS seeks</h3>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {mergedContent.conferenceTheme?.seeks?.map((b,i)=>(
              <div key={i} className="flex items-start gap-3 bg-white border rounded-2xl p-5 shadow-sm animate-pop" style={delay(120 + i*40)}>
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                <p className="text-slate-700">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section 
        className="py-16 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
      >
        <div className="container">
          <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-extrabold text-primary animate-fade-up mb-8">Key Highlights of ICAEBMS</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mergedContent.highlights?.map((h,i)=>(
                <div key={i} className="p-5 bg-white border rounded-2xl shadow-[0_8px_24px_-16px_rgba(16,24,40,.25)] animate-pop" style={delay(80 + i*40)}>
                  <div className="flex items-start gap-3">
                    {/* Adding icons based on highlight content */}
                    <span className="text-3xl text-primary">
                      {i === 0 ? "🔄" : // Multidisciplinary
                       i === 1 ? "🌎" : // Global
                       i === 2 ? "🏅" : // Publication
                       i === 3 ? "🔍" : // Expert sessions
                       i === 4 ? "👥" : // Workshops
                       i === 5 ? "🤝" : // Networking
                       i === 6 ? "🏆" : // Awards
                       "🧠"}  
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">{h.split('-')[0].trim()}</h3>
                      <p className="text-slate-700">{h.split('-')[1]?.trim()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRACKS + DEADLINES */}
      <section className="bg-gradient-to-b from-white to-indigo-50">
        <div className="container py-16 grid lg:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-white border p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-primary animate-fade-up">Session Tracks / Call for Papers</h2>
            <div className="flex justify-center my-6">
              <img 
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Research paper presentation" 
                className="rounded-xl shadow-md w-full h-40 object-cover"
              />
            </div>
            <ul className="mt-6 space-y-3">
              {mergedContent.tracks?.map((t,i)=>(
                <li key={i} className="p-4 bg-slate-50 border rounded-xl animate-fade-up" style={delay(60 + i*40)}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white border p-6 shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 animate-fade-up">Submission Deadlines</h3>
            <div className="flex justify-center my-6">
              <img 
                src="https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Calendar and deadline concept" 
                className="rounded-xl shadow-md w-full h-40 object-cover"
              />
            </div>
            <ol className="mt-6 relative border-s-2 border-indigo-200">
              {mergedContent.deadlines?.map((d,i)=>(
                <li key={i} className="ms-4 mb-6 animate-fade-up" style={delay(60 + i*40)}>
                  <div className="absolute w-3 h-3 rounded-full bg-primary -ms-[9px] mt-2"></div>
                  <p className="font-semibold">{d.label}</p>
                  <p className="text-slate-600">{d.date}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-slate-700 animate-fade-up" style={delay(260)}>
              For detailed submission guidelines, please visit the 
              <Link to="/submission" className="text-primary font-semibold underline ml-1">Submission Page</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="container py-16">
        <h2 className="text-3xl font-extrabold text-primary animate-fade-up mb-6">Why Join Us at ICAEBMS?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-slate-700 animate-fade-up mb-6" style={delay(100)}>
              The International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities (ICAEBMS) is more than just an academic event, it's a global platform for innovation, collaboration and growth.
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg animate-fade-up" style={delay(150)}>
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Conference networking" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4">
            {mergedContent.whyJoin?.slice(0, 4).map((b,i)=>(
              <div key={i} className="p-5 bg-white border rounded-2xl shadow-[0_8px_24px_-16px_rgba(16,24,40,.25)] animate-pop" style={delay(80 + i*40)}>
                <div className="flex items-start gap-3">
                  {/* Adding icons based on the benefit content */}
                  <span className="text-xl text-primary">
                    {i === 0 ? "📝" : // Present research
                     i === 1 ? "📊" : // Get published
                     i === 2 ? "👨‍🏫" : // Learn from experts
                     i === 3 ? "🔄" : // Network
                     i === 4 ? "🔍" : // Interdisciplinary
                     i === 5 ? "🌐" : // Global visibility
                     "✨"}         
                  </span>
                  <p className="text-slate-700">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
            {mergedContent.whyJoin?.slice(4).map((b,i)=>(
              <div key={i} className="p-5 bg-white border rounded-2xl shadow-[0_8px_24px_-16px_rgba(16,24,40,.25)] animate-pop" style={delay(240 + i*40)}>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-primary">
                    {i === 0 ? "🔍" : // Interdisciplinary
                     i === 1 ? "🌐" : // Global visibility
                     "✨"}          
                  </span>
                  <p className="text-slate-700">{b}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* PROCEEDINGS */}
      <section className="bg-slate-50">
        <div className="container py-16">
          <h2 className="text-3xl font-extrabold text-primary animate-fade-up">Proceedings & Publications</h2>
          <div className="mt-6 bg-white border rounded-2xl p-6 shadow-sm animate-fade-up" style={delay(80)}>
            <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
              {[
                { url: "/public/assets/scopus.png", alt: "Scopus logo" },
                { url: "/public/assets/sdg.png", alt: "DOCI logo" },
                { url: "/public/assets/cerada.png", alt: "Web of Science logo" },
                { url: "/public/assets/clarivate.png", alt: "Clarivate logo" }
              ].map((logo, i) => (
                <img key={i} src={logo.url} alt={logo.alt} className="h-12 object-contain" />
              ))}
            </div>
            <p className="text-center text-slate-700">{mergedContent.proceedings?.note}</p>
          </div>
        </div>
      </section>
      
      {/* FOOTER NOTE */}
      <footer className="bg-primary text-white py-3 text-center text-sm">
        <div className="container">
          © 2026 ICAEBMS | Organized by Confuzed Educational Research and Development Association
        </div>
      </footer>
    </>
  );
}
