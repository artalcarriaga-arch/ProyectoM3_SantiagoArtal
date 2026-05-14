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

export function saveMessagesToLocalStorage(messages) {
  try {
    localStorage.setItem('maquiavelo_chat_history', JSON.stringify(messages));
  } catch (e) {
    console.warn('Could not save messages to localStorage:', e);
  }
}

export function loadMessagesFromLocalStorage() {
  try {
    const saved = localStorage.getItem('maquiavelo_chat_history');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn('Could not load messages from localStorage:', e);
    return [];
  }
}

export function clearMessagesFromLocalStorage() {
  try {
    localStorage.removeItem('maquiavelo_chat_history');
  } catch (e) {
    console.warn('Could not clear localStorage:', e);
  }
}
