import dotenv from 'dotenv';
import { darkEmailTemplate, sendEmail } from '../services/email.service.js';

dotenv.config();

const to = process.argv[2] || 'npranavpranav951@gmail.com';

if (!process.env.RESEND_API_KEY && !process.env.SMTP_HOST) {
  console.error('Add RESEND_API_KEY to server/.env before sending a test email.');
  process.exit(1);
}

await sendEmail({
  to,
  subject: 'NOIRTHREAD email system ready',
  html: darkEmailTemplate({
    title: 'Email delivery is live',
    body: 'Congrats. NOIRTHREAD can now send premium dark HTML emails through Resend.',
    cta: 'Open NOIRTHREAD',
    url: process.env.CLIENT_URL || 'http://localhost:5173'
  })
});

console.info(`Test email sent to ${to}`);
