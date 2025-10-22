import 'dotenv/config';
import mongoose from 'mongoose';
import { PageContent } from '../models/mongoose/PageContent.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/icaebms';

// HOME (exactly your content, as before) ...
const homeContent = {
  key: 'home',
  banner: {
    scrollingText: 'HYBRID EVENT - You can participate in person at Bangkok, Thailand or Virtually from your home or office.',
    title: 'International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities (ICAEBMS)',
    theme: 'Theme: “Interdisciplinary Innovations for a Sustainable Future”',
    hybrid: 'Hybrid Conference: In Person + Online',
    date: 'Date: 10-11 Aug, 2026',
    location: 'City, Country: Bangkok, Thailand',
    organizedBy: 'Organized by: Confworld Educational Research and Development Association',
    isbn: 'ISBN: 978-95-813001-3-6',
    logos: [
      { name: 'CERADA', url: '/public/assets/cerada.png', alt: 'CERADA logo' },
      { name: 'ICAEBMS', url: '/public/assets/icaebms.png', alt: 'ICAEBMS logo' },
      { name: 'SDG', url: '/public/assets/sdg.png', alt: 'SDG logo' },
      { name: 'Scopus', url: '/public/assets/scopus.png', alt: 'Scopus logo' },
      { name: 'Clarivate WoS', url: '/public/assets/clarivate.png', alt: 'Clarivate Web of Science logo' }
    ]
  },
  welcome: {
    heading: 'Welcome to ICAEBMS-2026',
    paragraphs: [
      'We warmly welcome you to the International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities (ICAEBMS).',
      'Theme “Interdisciplinary Innovations for a Sustainable Future” ICAEBMS serves as a global platform where researchers, academicians, professionals and students from around the world come together to exchange ideas, present findings and build collaborations across disciplines.',
      'This conference is not just an academic gathering, it is a space for innovation, interchange and the creation of solutions that address real-world challenges. By bringing together experts in science, engineering, education, business, management, social sciences and humanities, ICAEBMS fosters interdisciplinary connections that pave the way for impactful change.',
      'Join us in shaping the future through knowledge, research and collaboration. Together, we can drive progress for a more sustainable and inclusive world.'
    ]
  },
  conferenceTheme: {
    heading: 'Conference Theme',
    intro: [
      '“Interdisciplinary Innovations for a Sustainable Future”',
      'The theme reflects the core vision of ICAEBMS bringing together diverse fields of knowledge to address global challenges. By uniting applied science, engineering, education, business, management, social sciences and humanities, the conference aims to foster creativity, collaboration and sustainable solutions that transcend traditional boundaries.'
    ],
    seeks: [
      'To encourage interdisciplinary collaboration among researchers, academicians, industry experts and policymakers.',
      'To promote innovative research and practices that contribute to sustainable development.',
      'To bridge the gap between science, technology, business and society through knowledge-sharing and discourse.',
      'To empower future leaders and young scholars with insights and opportunities for global engagement.',
      'To foster solutions that are practical, inclusive and impactful in addressing real-world challenges.'
    ]
  },
  highlights: [
    'Multidisciplinary Platform – A unique forum uniting applied science, engineering, education, business, management, social sciences and humanities.',
    'Global Participation – Engage with renowned scholars, industry leaders and professionals from across the world.',
    'Call for Papers & Publications – Opportunities to publish in reputed scopus indexed journals. Selected papers from the conference will be considered for publication in high-impact journals, offering authors the chance to showcase their research on a global platform.',
    'Expert Keynote Sessions – Insights from distinguished speakers on cutting-edge research and global challenges.',
    'Interactive Workshops & Panel Discussions – Hands-on learning and thought-provoking debates on contemporary issues.',
    'Networking Opportunities – Build academic, industrial and international collaborations.',
    'Recognition & Awards – Best paper and presentation awards to acknowledge outstanding contributions.',
    'Student & Young Researcher Engagement – Special sessions to inspire and guide the next generation of scholars.'
  ],
  tracks: [
    'Session 1: Applied Science',
    'Session 2: Engineering & Technological Advancements',
    'Session 3: Education & Pedagogical Innovations',
    'Session 4: Business & Management Studies',
    'Session 5: Social Science and Humanities',
    'Session 6: Finance, Accountancy and Marketing'
  ],
  deadlines: [
    { label: 'Early Bird registration deadline', date: '31 Dec 2025' },
    { label: 'Abstract submission', date: '31 Jan 2026' },
    { label: 'Full paper submission', date: '28 Feb 2026' },
    { label: 'Final Registration', date: '31 Mar 2026' }
  ],
  cfpNoteLinkText: 'For detailed submission guidelines, please visit the Submission Page.',
  whyJoin: [
    'Present Your Research – Share your ideas, findings and innovations with a global audience.',
    'Get Published – Opportunities to publish in reputed journals with high impact factor and indexed conference proceedings.',
    'Learn from Experts – Gain insights from keynote addresses, workshops and panel discussions by leading scholars and professionals.',
    'Expand Your Network – Connect with academicians, industry leaders, policymakers and fellow researchers worldwide.',
    'Interdisciplinary Exposure – Explore diverse perspectives by engaging with multiple fields of study.',
    'Recognition & Awards – Compete for Best Paper and Best Presentation awards.',
    'Global Visibility – Enhance your academic profile and contribute to international collaborations.',
    'Empower the Future – Inspire and be inspired by young researchers, innovators and thought leaders.'
  ],
  proceedings: {
    logosText: 'Scopus, SCIE, Web of science and clarivate logo',
    note: 'Note: ICAEBMS - 2026 Proceedings will be submitted to the Web of science Book citation index (BkCI) and Scopus for evaluation and indexing purposes (T&C)* apply.'
  },
  footer: {
    text: '© 2026 ICAEBMS | Confworld Educational Research and Development Association'
  }
};

// Minimal placeholder pages (editable later)
const pages = [
  { key: 'about', welcome: { heading: 'About ICAEBMS 2026', paragraphs: [
    'ICAEBMS 2026 brings together global researchers and practitioners across applied science, engineering, education, business, management, social sciences and humanities.',
    'The hybrid format enables participation in person in Bangkok, Thailand, and online.'
  ]}},
  { key: 'program', welcome: { heading: 'Program', paragraphs: [
    'Detailed schedule will be announced. The program includes keynote talks, parallel paper sessions, workshops and panel discussions.'
  ]}},
  { key: 'venue', welcome: { heading: 'Venue & Accommodation', paragraphs: [
    'City: Bangkok, Thailand.',
    'Venue details and nearby accommodation options will be updated. International participants are encouraged to plan travel and visa early.'
  ]}},
  { key: 'committee', welcome: { heading: 'Organizing Committee', paragraphs: [
    'The conference is organized by Confworld Educational Research and Development Association.',
    'Advisory Board, Technical Committee, and Reviewers will be listed soon.'
  ]}},
  { key: 'fees', welcome: { heading: 'Registration Fees', paragraphs: [
    'Fee categories (student, faculty, industry) and early-bird discounts will be published soon.'
  ]}},
  { key: 'accommodation', welcome: { heading: 'Accommodation', paragraphs: [
    'Recommended hotels and special rates for participants will be updated on this page.'
  ]}},
  { key: 'visa', welcome: { heading: 'Visa & Travel', paragraphs: [
    'Participants may require a visa to enter Thailand. Please consult your local embassy/consulate. Invitation letters can be requested after registration.'
  ]}},
  { key: 'publications', welcome: { heading: 'Proceedings & Publications', paragraphs: [
    'Selected papers may be considered for reputed journals and indexed proceedings subject to review.',
    'Note: ICAEBMS - 2026 Proceedings will be submitted to the Web of Science Book Citation Index (BkCI) and Scopus for evaluation (T&C apply).'
  ]}},
  { key: 'contact', welcome: { heading: 'Contact', paragraphs: [
    'For queries regarding ICAEBMS 2026, please use the Contact form or email the organizers.'
  ]}}
];

export async function seedContent() {
  await mongoose.connect(MONGO_URI);
  await PageContent.deleteOne({ key: 'home' });
  await PageContent.create(homeContent);

  for (const p of pages) {
    await PageContent.deleteOne({ key: p.key });
    await PageContent.create(p);
  }

  console.log('Seeded content for home + additional pages.');
  await mongoose.disconnect();
};

