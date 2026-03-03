export function initTheme() {
  const stored = localStorage.getItem('theme')
  const theme = stored || 'light'
  document.documentElement.dataset.theme = theme

  const btn = document.createElement('button')
  btn.className = 'ctrl-btn'
  btn.setAttribute('aria-label', 'Changer le thème')
  btn.innerHTML = `<span class="ctrl-icon">${theme === 'dark' ? '☀️' : '🌙'}</span><span class="ctrl-label">Thème</span>`
  document.getElementById('map-controls-wrapper')!.appendChild(btn)

  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
    btn.querySelector('.ctrl-icon')!.textContent = next === 'dark' ? '☀️' : '🌙'
    document.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: next } }))
  })
}
