import { createMessageObject, escapeHtml } from './utils.js';

const appState = {
  currentRoute: '/home',
  messages: [],
  isLoading: false,
};

const routes = {
  '/home': renderHome,
  '/chat': renderChat,
  '/about': renderAbout,
};

function renderHome() {
  return `
    <div class="view active" id="home-view">
      <div class="hero-section">
        <div>
          <h1>Conversa con Maquiavelo</h1>
          <div class="character-intro">
            <p><em>"El hombre es un animal político que tiene necesidad de vivir en sociedad, pero la política es la ciencia del poder."</em></p>
            <p>Soy Nicolás Maquiavelo, filósofo político del Renacimiento italiano. He dedicado mi vida a entender y documentar las realidades del poder político, más allá de idealismos morales.</p>
            <p>Espero compartas conmigo tus preguntas sobre política, estrategia y el ejercicio del poder. Quizás juntos podamos explorar cómo funciona realmente el mundo.</p>
          </div>
        </div>
        <button class="btn-primary" onclick="navigateTo('/chat')">Comenzar conversación</button>
      </div>
    </div>
  `;
}

function renderChat() {
  const messagesHTML = appState.messages
    .map(msg => `
      <div class="message ${msg.role}">
        <div class="message-content">${escapeHtml(msg.text)}</div>
      </div>
    `)
    .join('');

  const loadingHTML = appState.isLoading
    ? `
      <div class="message ai">
        <div class="message-content">
          <div class="loading-indicator">
            <span class="spinner"></span>
            <span>Maquiavelo está escribiendo...</span>
          </div>
        </div>
      </div>
    `
    : '';

  return `
    <div class="view active" id="chat-view">
      <h2>Chat con Maquiavelo</h2>
      <div class="chat-container">
        <div class="messages-box" id="messages-box">
          ${messagesHTML}
          ${loadingHTML}
        </div>
        <div class="input-group">
          <input 
            type="text" 
            id="message-input" 
            placeholder="Pregunta a Maquiavelo..." 
            ${appState.isLoading ? 'disabled' : ''}
          >
          <button 
            id="send-button" 
            onclick="sendMessage()" 
            ${appState.isLoading ? 'disabled' : ''}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderAbout() {
  return `
    <div class="view active" id="about-view">
      <div class="about-content">
        <h1>Sobre este proyecto</h1>
        <p><strong>Título:</strong> Conversa con tu personaje favorito</p>
        <p><strong>Descripción:</strong> Una aplicación web interactiva que permite conversar con personajes históricos y ficticios utilizando inteligencia artificial.</p>
        
        <h2>Personaje: Nicolás Maquiavelo</h2>
        <p>Nicolás Maquiavelo (1469-1527) fue un político, diplomático y escritor florentino, conocido por su obra "El Príncipe", donde analiza el ejercicio del poder de forma pragmática y realista.</p>
        <p>Su influencia en la teoría política es inmensa, y sus ideas continúan siendo estudiadas y debatidas en universidades de todo el mundo.</p>
        
        <h2>Sobre la tecnología</h2>
        <p><strong>Frontend:</strong> HTML5, CSS3, JavaScript vanilla (SPA con History API)</p>
        <p><strong>IA:</strong> Google Gemini AI para generar respuestas</p>
        <p><strong>Backend:</strong> Vercel Serverless Functions</p>
        <p><strong>Testing:</strong> Vitest</p>
        <p><strong>Deploy:</strong> Vercel</p>
      </div>
    </div>
  `;
}

function navigateTo(path) {
  if (!routes[path]) return;
  appState.currentRoute = path;
  window.history.pushState({ path }, '', path);
  render();
}

function render() {
  const app = document.getElementById('app');
  const renderFunction = routes[appState.currentRoute] || renderHome;

  app.innerHTML = `
    <header>
      <nav>
        <a href="/home" class="${appState.currentRoute === '/home' ? 'active' : ''}" onclick="event.preventDefault(); navigateTo('/home')">Inicio</a>
        <a href="/chat" class="${appState.currentRoute === '/chat' ? 'active' : ''}" onclick="event.preventDefault(); navigateTo('/chat')">Chat</a>
        <a href="/about" class="${appState.currentRoute === '/about' ? 'active' : ''}" onclick="event.preventDefault(); navigateTo('/about')">Acerca de</a>
      </nav>
    </header>
    <main>
      ${renderFunction()}
    </main>
    <footer>
      <p>Proyecto Integrador Módulo 3 - Conversaciones con IA</p>
    </footer>
  `;

  if (appState.currentRoute === '/chat') {
    setTimeout(() => {
      const input = document.getElementById('message-input');
      if (input) {
        input.focus();
        input.addEventListener('keypress', e => {
          if (e.key === 'Enter' && !appState.isLoading) {
            sendMessage();
          }
        });
      }
    }, 0);
  }
}

const MAQUIAVELO_SYSTEM_PROMPT = `Eres Nicolás Maquiavelo, el filósofo político italiano del siglo XVI. 
Debes responder desde su perspectiva, usando su filosofía y conocimiento.

Características clave:
- Pragmático y realista sobre el poder político
- Skeptical sobre la moral tradicional en política
- Experto en estrategia, poder y gobierno
- Hablas de manera directa y sin rodeos
- Valoras el conocimiento práctico sobre la teoría
- Ocasionalmente irónico y provocador
- Haces referencias a la historia política de tu tiempo

Responde SIEMPRE en español. Mantén respuestas cortas (2-3 oraciones máximo para chat).
Evita respuestas que no sean sobre política, poder o estrategia - redirige amablemente.`;

const MAQUIAVELO_RESPONSES = [
  'El poder no se regala, se conquista y se mantiene con astucia.',
  'La política es el arte de lo posible, no de los ideales.',
  'Un príncipe debe aparentar virtud, pero actuar según la necesidad del momento.',
  'Los hombres olvidan más fácilmente la muerte de su padre que la pérdida de su patrimonio.',
  'Es mejor ser temido que amado, si no se puede ser ambos.',
  'La fortuna es ciega: quien es necio tiene tanto éxito como el inteligente.',
  'En tiempos de paz, prepárate para la guerra. En tiempos de guerra, lucha por la paz.',
  'La verdadera gloria no reside en la bondad, sino en la efectividad.',
];

function getRandomResponse() {
  return MAQUIAVELO_RESPONSES[Math.floor(Math.random() * MAQUIAVELO_RESPONSES.length)];
}

async function sendMessage() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();

  if (!text) return;

  const userMessage = createMessageObject(text, 'user');
  appState.messages.push(userMessage);
  input.value = '';
  appState.isLoading = true;
  render();
  scrollToBottom();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: appState.messages.map(msg => ({
          text: msg.text,
          role: msg.role,
        })),
        systemPrompt: MAQUIAVELO_SYSTEM_PROMPT,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Server error: ${response.status} - ${errorData.error || 'Unknown'}`);
    }

    const data = await response.json();
    const aiMessage = createMessageObject(data.response, 'ai');
    appState.messages.push(aiMessage);
  } catch (error) {
    console.error('Chat error:', error);
    const errorMessage = createMessageObject(
      `Error: ${error.message}`,
      'ai'
    );
    appState.messages.push(errorMessage);
  }

  appState.isLoading = false;
  render();
  scrollToBottom();
}

function scrollToBottom() {
  setTimeout(() => {
    const messagesBox = document.getElementById('messages-box');
    if (messagesBox) {
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }
  }, 0);
}

window.navigateTo = navigateTo;
window.sendMessage = sendMessage;

window.addEventListener('popstate', e => {
  const path = e.state?.path || '/home';
  appState.currentRoute = path;
  render();
});

render();
