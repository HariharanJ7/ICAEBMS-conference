import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import { sequelize } from './models/sequelize/index.js';
import { User } from './models/sequelize/User.js';
import { Submission } from './models/sequelize/Submission.js';
import { PageContent } from './models/mongoose/PageContent.js';
import { ensureDirs, assetsDir, uploadsDir, publicDir } from './utils/paths.js';
import { adminAuth } from './middleware/adminAuth.js';
import { sendMail } from './utils/mailer.js';
import path from 'path';
import { seedDB } from './seed/seedContent.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ensureDirs();

const app = express();
app.use(cors());
app.use(express.json());

seedDB().catch(err => console.error('Seeding error:', err));
// Static
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
// DB
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/icaebms';

async function createServer() {
  // 1) Connect DBs first
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  // await sequelize.sync({ alter: true });

  // 2) Build app after connections succeed
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Static
  app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
  app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

  // Health
  app.get('/api/health', (req, res) => res.json({ ok: true }));

  // Content route (example)
  // app.get('/api/content/home', async (req, res) => {
  //   const doc = await PageContent.findOne({ key: 'home' }).lean();
  //   res.json(doc || {});
  // });

  // 3) Return server instance
  return app;
}

// Start and handle fatal errors
createServer()
  .then(app => app.listen(PORT, () => console.log(`Backend on http://127.0.0.1:${PORT}`)))
  .catch(err => {
    console.error('Failed to start API:', err);
    process.exit(1);
  });

// Optional: log unhandled errors instead of silent crash
process.on('unhandledRejection', (e) => console.error('unhandledRejection', e));
process.on('uncaughtException', (e) => console.error('uncaughtException', e));

async function init() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,      // Use new URL parser
    useUnifiedTopology: true,   // Use unified topology engine
    serverSelectionTimeoutMS: 10000, // 10 sec timeout
    ssl: true,                  // Enable SSL
    tlsInsecure: false           // Do not allow insecure TLS
  });
  await sequelize.sync({ alter: true });
  console.log('MongoDB and Sequelize ready.');
}

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// CMS content
app.get('/api/content/:key', async (req, res) => {
  const doc = await PageContent.findOne({ key: req.params.key }).lean();
  res.json(doc || {});
});

// Home alias retained
app.get('/api/content/home', async (req, res) => {
  const doc = await PageContent.findOne({ key: 'home' }).lean();
  res.json(doc || {});
});

// Registration
app.post('/api/register', async (req, res) => {
  const { fullName, email, role } = req.body;
  if (!fullName || !email) return res.status(400).json({ error: 'fullName and email are required' });
  try {
    const user = await User.create({ fullName, email, role: role || 'attendee' });
    // Optional: send confirmation
    try {
      await sendMail({
        to: email,
        subject: 'ICAEBMS 2026 Registration Received',
        text: `Dear ${fullName},\n\nThank you for registering for ICAEBMS 2026.\n\nRegards,\nICAEBMS`,
      });
    } catch (e) { /* mail optional */ }
    res.status(201).json(user);
  } catch (e) {
    if (e?.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: 'Email already registered' });
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Multer for file uploads
import fs from 'fs';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const safe = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safe);
  }
});
const upload = multer({ storage });

// Submissions (with or without file)
app.post('/api/submissions', upload.single('file'), async (req, res) => {
  try {
    const body = req.body;
    const required = ['title', 'abstract', 'track', 'authorName', 'authorEmail'];
    for (const f of required) if (!body[f]) return res.status(400).json({ error: `Missing ${f}` });

    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const sub = await Submission.create({
      title: body.title,
      abstract: body.abstract,
      track: body.track,
      authorName: body.authorName,
      authorEmail: body.authorEmail,
      filePath
    });

    try {
      await sendMail({
        to: body.authorEmail,
        subject: 'ICAEBMS 2026 Submission Received',
        text: `Dear ${body.authorName},\n\nYour submission "${body.title}" has been received.\n\nRegards,\nICAEBMS`,
      });
    } catch (e) { /* optional */ }

    res.status(201).json(sub);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email, message are required' });
  try {
    await sendMail({
      to: process.env.CONTACT_TO || process.env.MAIL_USER || email,
      subject: `[ICAEBMS Contact] ${subject || 'New message'}`,
      text: `From: ${name} <${email}>\n\n${message}`
    });
  } catch (e) { /* optional */ }
  res.json({ ok: true });
});

// Admin protected endpoints
app.get('/api/admin/users', adminAuth, async (req, res) => {
  const users = await User.findAll({ order: [['createdAt', 'DESC']] });
  res.json(users);
});
app.get('/api/admin/submissions', adminAuth, async (req, res) => {
  const subs = await Submission.findAll({ order: [['createdAt', 'DESC']] });
  res.json(subs);
});

app.listen(PORT, async () => {
  await init();
  console.log(`Backend listening on http://localhost:${PORT}`);
});
