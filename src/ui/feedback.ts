import { districts } from '../data/districts'

const RATE_LIMIT_KEY = 'feedback_last'
const RATE_LIMIT_MS = 30 * 1000

export function initFeedback() {
  const btn = document.createElement('button')
  btn.id = 'feedback-btn'
  btn.className = 'ctrl-btn'
  btn.setAttribute('aria-label', 'Donner un feedback')
  btn.innerHTML = '<span class="ctrl-icon">💬</span><span class="ctrl-label">Support</span>'
  btn.addEventListener('click', () => openModal())
  document.getElementById('map-controls-wrapper')!.appendChild(btn)
}

function isRateLimited(): boolean {
  const last = localStorage.getItem(RATE_LIMIT_KEY)
  return !!last && Date.now() - parseInt(last) < RATE_LIMIT_MS
}

export function openFeedbackFor(districtId: string) { openModal(districtId) }

function openModal(districtId?: string) {
  if (document.getElementById('feedback-overlay')) return

  const overlay = document.createElement('div')
  overlay.id = 'feedback-overlay'
  overlay.innerHTML = `
    <div class="feedback-modal">
      <button class="feedback-close" aria-label="Fermer">&times;</button>
      <h3>Votre avis</h3>
      <label class="feedback-label">Quartier (optionnel)
        <select id="fb-district">
          <option value="">— Aucun —</option>
          ${districts.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
        </select>
      </label>
      <div class="feedback-label">Note
        <div id="fb-stars" class="feedback-stars">${[1,2,3,4,5].map(n => `<span data-star="${n}">☆</span>`).join('')}</div>
      </div>
      <label class="feedback-label">Email (optionnel)
        <input id="fb-email" type="email" placeholder="votre@email.com" />
      </label>
      <label class="feedback-label">Message
        <textarea id="fb-msg" maxlength="500" rows="4" placeholder="Votre feedback..."></textarea>
        <span id="fb-count" class="feedback-count">0 / 500</span>
      </label>
      <button id="fb-send" class="feedback-send">Envoyer</button>
    </div>`

  document.body.appendChild(overlay)

  if (districtId) (overlay.querySelector('#fb-district') as HTMLSelectElement).value = districtId

  let rating = 0
  const stars = overlay.querySelector('#fb-stars')!
  const msg = overlay.querySelector('#fb-msg') as HTMLTextAreaElement
  const count = overlay.querySelector('#fb-count')!
  const send = overlay.querySelector('#fb-send') as HTMLButtonElement

  stars.addEventListener('click', (e) => {
    const s = (e.target as HTMLElement).dataset.star
    if (!s) return
    rating = parseInt(s)
    stars.querySelectorAll('span').forEach((el, i) => { el.textContent = i < rating ? '★' : '☆' })
  })

  msg.addEventListener('input', () => { count.textContent = `${msg.value.length} / 500` })

  overlay.querySelector('.feedback-close')!.addEventListener('click', close)
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close() })

  send.addEventListener('click', async () => {
    const text = msg.value.trim()
    if (!text) { msg.focus(); return }
    if (isRateLimited()) { showToast(overlay, 'Merci, vous avez déjà envoyé un feedback récemment.'); return }

    send.disabled = true
    send.textContent = '...'
    const email = (overlay.querySelector('#fb-email') as HTMLInputElement).value.trim()
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        district_id: (overlay.querySelector('#fb-district') as HTMLSelectElement).value || null,
        rating: rating || null,
        message: text,
        email: email || null,
      }),
    })

    if (!document.body.contains(overlay)) return
    if (!res.ok) { send.disabled = false; send.textContent = 'Envoyer'; showToast(overlay, 'Erreur, réessayez.'); return }
    localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()))
    showToast(overlay, 'Merci !')
    setTimeout(close, 1500)
  })

  function close() { overlay.remove() }
}

function showToast(parent: HTMLElement, text: string) {
  let toast = parent.querySelector('.feedback-toast')
  if (toast) toast.remove()
  toast = document.createElement('div')
  toast.className = 'feedback-toast'
  toast.textContent = text
  parent.querySelector('.feedback-modal')!.appendChild(toast)
  setTimeout(() => toast?.remove(), 2500)
}
