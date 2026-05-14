export function formatDate(date) {
  return new Date(date).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function createMessageObject(text, role) {
  return {
    id: Date.now() + Math.random(),
    text,
    role,
    timestamp: new Date().toISOString(),
  };
}

export function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

export function saveDarkModePreference(isDarkMode) {
  try {
    localStorage.setItem('maquiavelo_dark_mode', JSON.stringify(isDarkMode));
  } catch (e) {
    console.warn('Could not save dark mode preference:', e);
  }
}

export function loadDarkModePreference() {
  try {
    const saved = localStorage.getItem('maquiavelo_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  } catch (e) {
    console.warn('Could not load dark mode preference:', e);
    return true;
  }
}
