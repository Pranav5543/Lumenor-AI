import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { logger } from '../utils/logger.js';

function transporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}

function resendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendEmail({ to, subject, html }) {
  const resend = resendClient();
  if (resend) {
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'NOIRTHREAD <onboarding@resend.dev>',
      to,
      subject,
      html
    });

    if (error) logger.warn(`Resend email failed for ${to}: ${error.message}`);
    return;
  }

  const client = transporter();
  if (!client) {
    logger.info(`Email skipped for ${to}: ${subject}`);
    return;
  }
  await client.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
}

export function darkEmailTemplate({ title, body, cta, url }) {
  return `
    <div style="background:#0B0B0C;color:#FAFAFA;font-family:Inter,Arial;padding:40px">
      <div style="max-width:620px;margin:auto;border:1px solid #27272A;background:#121214;padding:32px">
        <h1 style="font-size:32px;margin:0 0 16px">NOIRTHREAD</h1>
        <h2 style="font-size:24px;margin:0 0 16px">${title}</h2>
        <p style="color:#A1A1AA;line-height:1.7">${body}</p>
        ${cta ? `<a href="${url}" style="display:inline-block;margin-top:24px;background:#E5E5E5;color:#0B0B0C;padding:14px 18px;text-decoration:none;font-weight:700">${cta}</a>` : ''}
      </div>
    </div>
  `;
}
