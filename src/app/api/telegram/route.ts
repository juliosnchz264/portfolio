import { NextRequest } from 'next/server';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale?: string;
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('[Telegram] Missing env vars — TELEGRAM_BOT_TOKEN:', !!botToken, '| TELEGRAM_CHAT_ID:', !!chatId);
    return Response.json({ message: 'Server configuration error' }, { status: 500 });
  }

  let body: ContactData;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, subject, message, locale = 'en' } = body;

  if (!name || !email || !subject || !message) {
    return Response.json({ message: 'All fields are required' }, { status: 400 });
  }

  const messageText =
    locale === 'es'
      ? `🔔 <b>Nuevo mensaje del portfolio</b>\n\n👤 <b>Nombre:</b> ${escapeHtml(name)}\n📧 <b>Email:</b> ${escapeHtml(email)}\n📝 <b>Asunto:</b> ${escapeHtml(subject)}\n\n💬 <b>Mensaje:</b>\n${escapeHtml(message)}`
      : `🔔 <b>New portfolio message</b>\n\n👤 <b>Name:</b> ${escapeHtml(name)}\n📧 <b>Email:</b> ${escapeHtml(email)}\n📝 <b>Subject:</b> ${escapeHtml(subject)}\n\n💬 <b>Message:</b>\n${escapeHtml(message)}`;

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: messageText, parse_mode: 'HTML' }),
  });

  if (!res.ok) {
    const telegramError = await res.json();
    console.error('[Telegram] sendMessage failed:');
    console.error('  chatId used:', chatId);
    console.error('  status:', res.status);
    console.error('  description:', telegramError.description);
    if (telegramError.description === 'Bad Request: chat not found') {
      console.error('  → Fix: open Telegram, find your bot and send /start, then call getUpdates to get the correct chat_id.');
    }
    return Response.json({ message: 'Failed to send message' }, { status: 500 });
  }

  return Response.json({ message: 'Message sent successfully' });
}
