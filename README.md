# Destino La Moneda · Trivia Metro de Santiago

Juego web estático para capacitación interna. El relator proyecta la pantalla y selecciona la respuesta acordada por el grupo.

## Jugar

Enlace previsto de GitHub Pages: https://fzambran.github.io/trivia-metro-santiago/ (consultar VALIDATION.md para el estado comprobado de publicación).

1. Abre el juego en un navegador actualizado, con zoom al 100 % y pantalla completa para proyectar.
2. Pulsa **Comenzar el viaje**. El tren parte en Neptuno y avanza a Pajaritos; cada pregunta aparece tras 2,5 segundos de viaje.
3. Conversen sin límite de tiempo y elige una alternativa. La respuesta se bloquea durante 2 segundos de suspenso.
4. Revisa la explicación y continúa. Acertar Universidad de Santiago (pregunta 5) asegura esa estación. Un error termina el juego: antes del quinto acierto no hay estación asegurada; después se conserva Universidad de Santiago.
5. Usa **50/50** y **Consulta al andén** una vez cada uno, antes de responder. Los votos son simulados.
6. Acertar las diez preguntas da la victoria. **Jugar de nuevo** borra todo el avance y restablece las ayudas. Recargar también vuelve al inicio.

Navegación con Tab y Enter/Espacio. El juego respeta la preferencia del sistema de reducir movimiento. La duración orientativa de una sesión es de 15–20 minutos, según la conversación del grupo.

## Ejecutar y verificar

Requiere Node.js 22 o posterior. El juego y sus pruebas unitarias no tienen dependencias de producción.

```sh
npm test
npm run build
npm start
```

Abre http://127.0.0.1:4173. `npm run build` produce `dist/`, listo para alojamiento estático, y `dist/trivia-offline.html`, un respaldo de un solo archivo que puede abrirse desde disco sin internet. Descarga el respaldo desde el sitio publicado en `trivia-offline.html`.

Para reproducir las pruebas de navegador:

```sh
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chrome
npm run test:browser
```

El script usa Chrome instalado (`channel: chrome`). Instala Chrome si no está disponible. Ejecuta primero `npm run build` y deja `npm start` corriendo en otra terminal. Las capturas y resultados quedan en `evidence/`. Para verificar otra URL: `GAME_URL=https://fzambran.github.io/trivia-metro-santiago/ npm run test:browser`.

## Estructura y despliegue

- `src/questions.js`: cuestionario validado por el usuario, incluidas observaciones documentales en CUESTIONARIO.md.
- `src/game.js`: reglas independientes de la interfaz; `src/app.js`: vistas, eventos y temporizadores.
- `tests/`: reglas y transiciones; `scripts/browser-check.mjs`: partidas y revisión en 1366 × 768 y 1920 × 1080.
- `.github/workflows/pages.yml`: ejecuta pruebas y publica exclusivamente `dist/` desde main. En Settings → Pages seleccionar GitHub Actions como origen.
- `expo.md`: prompt listo para una futura conversión nativa a Expo/React Native. Esa conversión no forma parte de la aplicación web entregada.

No hay servidor, cuentas, datos personales, analítica ni persistencia. Ningún voto corresponde a asistentes reales. El mapa es esquemático y representa el tramo del juego, no la Línea 1 completa. Este recurso de capacitación no es un sitio oficial de Metro.

La revisión visual local no sustituye el ensayo físico con proyector; el relator debe comprobarlo antes de su capacitación.
