# Registro de verificación

## Estado

Implementación web terminada, publicada y verificada el 15 de octubre de 2026.

- Juego público: https://fzambran.github.io/trivia-metro-santiago/
- Repositorio público: https://github.com/fzambran/trivia-metro-santiago
- Despliegue comprobado: https://github.com/fzambran/trivia-metro-santiago/actions/runs/38697470232 — completed / success.
- Commit del código desplegado y verificado: bb483be79e78da1f3d3b8a57b39f69750d9ccd6b. Las actualizaciones posteriores de evidencia no cambian el código del juego.
- HTTP 200 desde GitHub Pages; navegador nuevo sin sesión completó victoria, derrota, reinicio, tiempos, teclado y ambas resoluciones sobre el enlace público.
- Evidencia remota: evidence/remote/browser-report.json. Evidencia local y 16 capturas: evidence/.

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


## Auditoría de aceptación

| Requisito | Evidencia |
| --- | --- |
| Inicio e instrucciones | 1366-inicio.png, 1920-inicio.png |
| Neptuno + diez estaciones y progreso | Capturas de inicio, pregunta, seguro y victoria; preguntas de src/questions.js |
| Recorrido animado antes de cada pregunta | Prueba real de desplazamiento y límites 2499/2500 ms en ambos informes |
| Suspenso, bloqueo y resultado | Límites 1999/2000 ms, captura error y seguro; tests de selección repetida |
| Seguro y terminación | Diez escenarios de fallo unitarios y captura seguro; victoria/derrota en navegador |
| Ambos comodines y combinación | Dos secuencias × diez preguntas × cuatro valores aleatorios, captura consulta |
| Victoria y reinicio completo | Partida completa y reinicio en ambas resoluciones; test unitario de restablecimiento |
| Publicación accesible sin cuenta | Despliegue success, HTTP 200 y pruebas remotas en contexto de navegador limpio |
| Fuentes, guía y respaldo | README.md, CUESTIONARIO.md, archivos src/, tests/ y respaldo público trivia-offline.html |
| expo.md solicitado | Prompt de conversión nativa completo; no se afirma una conversión ya implementada |

El ensayo físico con proyector no se presenta como realizado y debe ejecutarse antes de la capacitación. No bloquea la entrega técnica publicada; no se ha reducido el alcance funcional solicitado.
