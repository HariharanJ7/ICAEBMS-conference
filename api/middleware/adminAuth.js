export function adminAuth(req, res, next) {
  const hdr = req.headers.authorization || '';
  if (!hdr.startsWith('Basic ')) return res.status(401).set('WWW-Authenticate', 'Basic').send('Auth required');
  const creds = Buffer.from(hdr.split(' ')[1] || '', 'base64').toString();
  const [user, pass] = creds.split(':');
  if (user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD) return next();
  return res.status(403).send('Forbidden');
}
