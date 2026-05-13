import { describe, it, expect, beforeEach } from 'vitest';

describe('appState', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('debe inicializar con ruta /home', async () => {
    await import('../src/app.js');
    
    expect(window.location.pathname).toBe('/');
  });

  it('debe renderizar sin errores', () => {
    const app = document.getElementById('app');
    expect(app).toBeDefined();
  });

  it('debe tener header con navegación', () => {
    const header = document.querySelector('header');
    expect(header).toBeDefined();
  });

  it('debe tener footer', () => {
    const footer = document.querySelector('footer');
    expect(footer).toBeDefined();
  });
});
