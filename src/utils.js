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
