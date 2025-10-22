import nodemailer from 'nodemailer';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM } = process.env;

let transporter = null;
if (MAIL_HOST && MAIL_USER && MAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT || 587),
    secure: false,
    auth: { user: MAIL_USER, pass: MAIL_PASS }
  });
}

export async function sendMail({ to, subject, text, html }) {
  if (!transporter) {
    console.log('[mail:disabled]', { to, subject });
    return { disabled: true };
  }
  return transporter.sendMail({
    from: MAIL_FROM || '"ICAEBMS 2026" <no-reply@icaebms.org>',
    to, subject, text, html
  });
}
