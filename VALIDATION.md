# Registro de verificación

## Estado

Implementación web terminada y verificada localmente el 15 de octubre de 2026. Publicación y comprobación remota pendientes al crear este registro; se actualizará con la evidencia del despliegue.

## Reglas y contenido

`node --test tests/game.test.js`: **15 pruebas aprobadas, 0 fallos** con Node.js 24.19.0. Incluyen clave del cuestionario, diez preguntas, tiempos configurados, victoria, errores en cada pregunta 1–10, seguro solo tras el quinto acierto, selección única, guardas de fase, alternativas eliminadas, ambos órdenes de comodines sobre diez preguntas y cuatro valores aleatorios, suma de votos, mayoría correcta, uso único y reinicio.

El cuestionario fue validado por el usuario. Se conservan las limitaciones de fuentes registradas en CUESTIONARIO.md; no se presentan como verificaciones oficiales completas.

## Navegador y diseño

Chrome sin sesión de usuario, controlado por Playwright 1.62.1. `scripts/browser-check.mjs` pasó en **1366 × 768 y 1920 × 1080**:

- Inicio, pregunta, pregunta larga, consulta, seguro, victoria, error y derrota: capturas en evidence/.
- Sin desbordamiento horizontal/vertical; botones y nombres de estaciones dentro del viewport.
- Partida completa de diez aciertos y una partida con derrota, reinicio y ayudas restablecidas.
- Pregunta ausente a 2499 ms y presente a 2500 ms; resultado retenido a 1999 ms y resuelto a 2000 ms.
- Respuestas bloqueadas durante suspenso. Enter activa inicio y respuesta. Movimiento reducido desactiva transición visual.
- Ensayo separado con reloj real: tren entre origen y destino a mitad de viaje y alineado con Pajaritos al llegar. En las pruebas aceleradas se usa movimiento reducido para evitar mezclar el reloj JavaScript simulado con el compositor CSS.
- Cero errores JavaScript capturados.
- Respaldo dist/trivia-offline.html abierto directamente mediante file://: inicio y primera pregunta funcionales sin servidor.

`evidence/browser-report.json` contiene resultados y medidas de la última ejecución. Las capturas fueron revisadas visualmente, además de las comprobaciones geométricas automatizadas.

## Reproducir

Seguir README.md. Se usaron las instalaciones de Node y Playwright provistas por el entorno; el juego no tiene dependencias de ejecución. Para reproducir la misma versión de navegador automatizado: `npm install --no-save --package-lock=false playwright@1.62.1` y Chrome instalado. Las pruebas de reglas usan únicamente el ejecutor integrado de Node.

## Límites

No se ha realizado ensayo con proyector físico ni se ha comprobado Safari/Firefox o dispositivos móviles reales. El ensayo físico queda como recomendación operativa al relator, no como una verificación ejecutada. La conversión Expo no se implementó: expo.md es el encargo reproducible solicitado para realizarla posteriormente.
