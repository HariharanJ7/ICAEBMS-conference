import mongoose from 'mongoose';

const LogoSchema = new mongoose.Schema({
  name: String, url: String, alt: String
}, { _id: false });

const PageContentSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true, trim: true, index: true }, // REQUIRED
  banner: { /* ... */ },
  welcome: { heading: String, paragraphs: [String] },
  conferenceTheme: { heading: String, intro: [String], seeks: [String] },
  highlights: [String],
  tracks: [String],
  deadlines: [{ label: String, date: String }],
  cfpNoteLinkText: String,
  whyJoin: [String],
  proceedings: { logosText: String, note: String },
  footer: { text: String }
}, { timestamps: true, strict: true });

export const PageContent = mongoose.model('PageContent', PageContentSchema);
