import { describe, it, expect } from 'vitest';
import { createMessageObject, escapeHtml, formatDate } from '../src/utils.js';

describe('createMessageObject()', () => {
  it('debe crear un objeto de mensaje con los campos correctos', () => {
    const message = createMessageObject('Hola', 'user');
    
    expect(message).toHaveProperty('id');
    expect(message).toHaveProperty('text', 'Hola');
    expect(message).toHaveProperty('role', 'user');
    expect(message).toHaveProperty('timestamp');
  });

  it('debe generar un ID único para cada mensaje', () => {
    const msg1 = createMessageObject('Primer mensaje', 'user');
    const msg2 = createMessageObject('Segundo mensaje', 'ai');
    
    expect(msg1.id).not.toBe(msg2.id);
  });

  it('debe generar timestamp en formato ISO', () => {
    const message = createMessageObject('Test', 'user');
    const timestamp = new Date(message.timestamp);
    
    expect(timestamp instanceof Date).toBe(true);
    expect(timestamp.getTime() > 0).toBe(true);
  });

  it('debe aceptar role "user" o "ai"', () => {
    const userMsg = createMessageObject('Usuario', 'user');
    const aiMsg = createMessageObject('IA', 'ai');
    
    expect(userMsg.role).toBe('user');
    expect(aiMsg.role).toBe('ai');
  });
});

describe('escapeHtml()', () => {
  it('debe escapar caracteres especiales HTML', () => {
    const text = '<script>alert("XSS")</script>';
    const escaped = escapeHtml(text);
    
    expect(escaped).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
  });

  it('debe escapar ampersands', () => {
    const text = 'A & B';
    const escaped = escapeHtml(text);
    
    expect(escaped).toBe('A &amp; B');
  });

  it('debe escapar comillas dobles', () => {
    const text = 'Texto con "comillas"';
    const escaped = escapeHtml(text);
    
    expect(escaped).toBe('Texto con &quot;comillas&quot;');
  });

  it('debe escapar comillas simples', () => {
    const text = "Texto con 'comillas'";
    const escaped = escapeHtml(text);
    
    expect(escaped).toBe('Texto con &#039;comillas&#039;');
  });

  it('debe retornar texto sin caracteres especiales sin cambios', () => {
    const text = 'Texto normal sin caracteres especiales';
    const escaped = escapeHtml(text);
    
    expect(escaped).toBe(text);
  });
});

describe('formatDate()', () => {
  it('debe retornar una cadena de tiempo válida', () => {
    const now = new Date();
    const formatted = formatDate(now);
    
    expect(typeof formatted).toBe('string');
    expect(formatted.length > 0).toBe(true);
  });

  it('debe formatear en hora local español', () => {
    const date = new Date('2024-05-13T14:30:00');
    const formatted = formatDate(date);
    
    expect(formatted).toMatch(/\d{2}:\d{2}/);
  });
});
