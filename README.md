# Conversa con Maquiavelo - SPA con Google Gemini AI

Una aplicación web moderna que permite conversar con Nicolás Maquiavelo, filósofo político italiano del Renacimiento, utilizando Google Gemini AI.

## 🚀 Características

- **Single Page Application (SPA)** con routing dinámico (History API)
- **Responsive Design** mobile-first con 3 breakpoints
- **Google Gemini AI** integrado para respuestas en tiempo real
- **Vercel Serverless Functions** para seguridad (API key no expuesta)
- **Tests unitarios** con Vitest (15 tests, 100% passing)
- **Animaciones fluidas** para mejor UX
- **Personaje consistente** - Maquiavelo responde como historiador político

## 🌐 Demo en Vivo

**URL**: https://proyecto-m3-santiago-artal.vercel.app

### ⚠️ Limitación Importante
La aplicación usa la **cuota gratuita de Google Gemini** (~15 requests/minuto).
- Si ves error de cuota: espera 60 segundos y intenta nuevamente
- Para uso continuo: activa facturación en Google Cloud Console

## 📋 Requisitos Previos

- Node.js >= 18
- npm >= 9
- Cuenta Google para Google Gemini API
- (Opcional) Cuenta Vercel para deploy

## 🛠️ Instalación Local

```bash
# Clonar repositorio
git clone <repo-url>
cd ProyectoM3_SantiagoArtal

# Instalar dependencias
npm install

# Crear archivo .env
echo "GEMINI_API_KEY=tu_api_key_aqui" > .env

# Iniciar servidor de desarrollo
npm run dev
```

Accede a `http://localhost:5174` (o el puerto que te indique Vite).

## 📁 Estructura del Proyecto

```
ProyectoM3_SantiagoArtal/
├── src/
│   ├── index.html          # Entry point (raíz de Vite)
│   ├── app.js              # Lógica SPA + routing
│   ├── styles.css          # Estilos responsive
│   └── utils.js            # Funciones utilitarias
├── api/
│   └── chat.js             # Vercel Serverless Function
├── tests/
│   ├── app.test.js         # Tests de app
│   └── utils.test.js       # Tests de utils (11 tests)
├── DOCUMENTACION_PRIVADA/  # Notas de desarrollo
│   ├── 00-SETUP.md
│   ├── 01-ESTRUCTURA-HTML-CSS.md
│   ├── 02-INSTALAR-NPM-Y-APP-JS.md
│   ├── 03-CHAT-DATOS-EN-MEMORIA.md
│   ├── 04-VERCEL-SERVERLESS-FUNCTION.md
│   ├── 05-CONECTAR-FRONTEND-CON-API.md
│   ├── 06-TESTS-UNITARIOS-VITEST.md
│   ├── 07-DEPLOY-VERCEL.md
│   ├── 08-GEMINI-PRODUCTION-DEBUGGING.md
│   └── 09-REGISTRO-DEL-DIA.md
├── package.json
├── vite.config.js
├── vitest.config.js
├── vercel.json
└── README.md (este archivo)
```

## 🔧 Configuración

### Variables de Entorno (.env)
```env
GEMINI_API_KEY=tu_clave_api_aqui
```

Obtén tu API key:
1. Ve a https://ai.google.dev
2. Haz clic en "Get API Key"
3. Copia la clave en .env

### Vite Config (vite.config.js)
- Root: `src/` (Vite busca index.html allí)
- Dev server: puerto 5174
- Build output: `dist/`

### Vercel Config (vercel.json)
- Reescrituras de rutas para SPA (todos los paths → index.html)
- Comandos de build/dev/install

## 🎨 Características Técnicas

### Frontend (src/)
- **Routing**: History API (sin dependencias)
- **State Management**: appState object simple pero efectivo
- **CSS**: Mobile-first, Flexbox, 3 breakpoints (mobile/tablet/desktop)
- **Animaciones**: slideIn para mensajes, spin para loading

### Backend (api/chat.js)
- **Serverless**: Vercel Functions (Node.js runtime)
- **API**: Google Generative AI REST API directo
- **Seguridad**: API key en variables de entorno, nunca expuesta
- **Modelo**: gemini-2.0-flash (rápido y accesible)

### Testing
```bash
npm run test           # Ejecutar tests
npm run test:ui        # UI interactivo
```
- Vitest + jsdom
- 15 tests unitarios (100% passing)
- Coverage en utils y app logic

## 🚀 Deploy en Vercel

```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel --prod

# Configurar variables en Vercel dashboard:
# Settings → Environment Variables
# → Añadir GEMINI_API_KEY
```

## 🎭 Personaje: Nicolás Maquiavelo

Maquiavelo (1469-1527) fue:
- Filósofo político italiano del Renacimiento
- Autor de "El Príncipe" (análisis pragmático del poder)
- Pensador realista sobre política y estrategia
- Polémico por su visión amoral del poder

### System Prompt Usado
```
Eres Nicolás Maquiavelo, filósofo político italiano del siglo XVI. 
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
```

## 📊 Scripts Disponibles

| Script | Comando | Propósito |
|--------|---------|-----------|
| dev | `npm run dev` | Inicia servidor Vite en desarrollo |
| build | `npm run build` | Build para producción (crea dist/) |
| preview | `npm run preview` | Preview de build local |
| test | `npm run test` | Ejecuta tests con Vitest |
| test:ui | `npm run test:ui` | Interfaz visual de tests |

## 🐛 Troubleshooting

### Error "Quota exceeded"
**Causa**: Cuota gratuita de Google Gemini agotada (~15 requests/minuto)
**Solución**: 
1. Espera 60 segundos
2. O activa facturación en Google Cloud Console

### Error 404 en /chat
**Causa**: Vercel no reescribe rutas a index.html
**Solución**: Verifica que `vercel.json` tenga la sección `rewrites`

### Error de API key
**Causa**: GEMINI_API_KEY no configurada
**Solución**:
1. Verifica `.env` localmente
2. En Vercel: Settings → Environment Variables → Añadir GEMINI_API_KEY

### Port 5173 en uso
**Solución**: Vite usa puerto 5174 automáticamente, o:
```bash
npx vite --port 3000
```

## 📚 Documentación Detallada

Para aprender cómo se construyó paso a paso, consulta:

- **[00-SETUP.md](DOCUMENTACION_PRIVADA/00-SETUP.md)** - Configuración inicial
- **[01-ESTRUCTURA-HTML-CSS.md](DOCUMENTACION_PRIVADA/01-ESTRUCTURA-HTML-CSS.md)** - Design responsive
- **[02-INSTALAR-NPM-Y-APP-JS.md](DOCUMENTACION_PRIVADA/02-INSTALAR-NPM-Y-APP-JS.md)** - Routing SPA
- **[03-CHAT-DATOS-EN-MEMORIA.md](DOCUMENTACION_PRIVADA/03-CHAT-DATOS-EN-MEMORIA.md)** - State & async
- **[04-VERCEL-SERVERLESS-FUNCTION.md](DOCUMENTACION_PRIVADA/04-VERCEL-SERVERLESS-FUNCTION.md)** - Backend
- **[05-CONECTAR-FRONTEND-CON-API.md](DOCUMENTACION_PRIVADA/05-CONECTAR-FRONTEND-CON-API.md)** - Integración
- **[06-TESTS-UNITARIOS-VITEST.md](DOCUMENTACION_PRIVADA/06-TESTS-UNITARIOS-VITEST.md)** - Testing
- **[07-DEPLOY-VERCEL.md](DOCUMENTACION_PRIVADA/07-DEPLOY-VERCEL.md)** - Deployment
- **[08-GEMINI-PRODUCTION-DEBUGGING.md](DOCUMENTACION_PRIVADA/08-GEMINI-PRODUCTION-DEBUGGING.md)** - Debugging en prod
- **[09-REGISTRO-DEL-DIA.md](DOCUMENTACION_PRIVADA/09-REGISTRO-DEL-DIA.md)** - Log detallado del proceso

## 🔐 Seguridad

- ✅ API key **nunca** expuesta (solo en servidor)
- ✅ Validación en backend (método POST, campos requeridos)
- ✅ Escape HTML en frontend (previene XSS)
- ✅ Sin dependencias externas inseguras (Vite + Vitest certificados)

## 🎓 Tecnologías Utilizadas

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|----------|
| **Frontend** | HTML5 | - | Estructura |
| **Frontend** | CSS3 | - | Estilos responsive |
| **Frontend** | JavaScript Vanilla | ES6+ | Lógica SPA |
| **Build** | Vite | 5.0.0 | Bundler rápido |
| **Testing** | Vitest | 1.0.0 | Test framework |
| **Testing** | jsdom | 29.1.1 | DOM simulation |
| **Backend** | Node.js | 24.x | Runtime |
| **API** | Google Gemini | 2.0 Flash | IA modelo |
| **Deploy** | Vercel | - | Hosting serverless |

## 📈 Métricas del Proyecto

- **Archivos**: 15+ (src, tests, config, docs)
- **Líneas de código**: ~500 (sin comentarios)
- **Tests**: 15 (100% passing)
- **Funcionalidades**: 7 (home, chat, about, routing, testing, deployment, IA)
- **Tiempo de desarrollo**: ~2-3 horas (con debugging)

## 🚀 Próximas Mejoras Potenciales

1. **Múltiples personajes**: Agregar más figuras históricas
2. **Persistencia**: localStorage para guardar conversaciones
3. **Dark mode**: Toggle de tema
4. **Typing indicator**: Mostrar cuando IA está "escribiendo"
5. **Rate limiting**: Implementar cache para optimizar cuota
6. **Historial**: Guardar y recuperar conversaciones previas

## 👤 Autor

Santiago Artal  
Proyecto Integrador Módulo 3 - Coaching K  
Mayo 2026

## 📝 Licencia

MIT - Libre para uso educativo y comercial

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a rama (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

## 📞 Soporte

Para preguntas o issues:
- Consulta la documentación privada en `DOCUMENTACION_PRIVADA/`
- Revisa los logs en `DOCUMENTACION_PRIVADA/09-REGISTRO-DEL-DIA.md`
- Verifica errores comunes en la sección Troubleshooting

---

**Status**: ✅ Funcional en producción | ⚠️ Requiere facturación para uso continuo
