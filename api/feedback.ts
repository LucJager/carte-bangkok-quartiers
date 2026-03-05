import type { VercelRequest, VercelResponse } from '@vercel/node'

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { district_id, rating, message, email } = req.body ?? {}

  if (!message || typeof message !== 'string' || !message.trim())
    return res.status(400).json({ error: 'Message requis' })
  if (rating !== undefined && rating !== null && (typeof rating !== 'number' || rating < 1 || rating > 5))
    return res.status(400).json({ error: 'Note entre 1 et 5' })
  if (message.length > 500)
    return res.status(400).json({ error: 'Message trop long (500 max)' })

  const district = district_id || 'Non spécifié'
  const stars = rating ? '⭐'.repeat(rating) : 'Pas de note'
  const text = [
    '📩 Nouveau feedback — Carte Bangkok',
    '',
    `📍 Quartier : ${district}`,
    `${stars}`,
    `💬 ${message.trim()}`,
    `📧 ${email || 'Non renseigné'}`,
  ].join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Erreur envoi' })
  }
}
