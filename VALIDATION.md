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


## Actualización: logo, NS-93, sonido y llegada

Solicitud posterior del usuario: reemplazar la marca provisional por su logo oficial, representar el NS-93 de la fotografía, añadir aplausos/chicharra y revelar preguntas cuando el tren llega.

- `assets/metro-santiago-logo.png` es una copia exacta del adjunto. `assets/ns93.svg` es una ilustración propia basada en el modelo de la fotografía, no un recorte fotográfico.
- `src/audio.js` produce aplausos estéreo de 2,4 segundos y chicharra de unos 0,7 segundos mediante Web Audio. Se activa el contexto en la interacción del usuario; se reproduce solo después del suspenso. No usa grabaciones ni servicios externos. Reiniciar detiene el efecto en curso.
- La llegada se comprueba geométricamente y mediante `transitionend`; el temporizador de respaldo espera la posición final antes de revelar la pregunta. El reinicio vuelve inmediatamente a Neptuno.
- 18 pruebas unitarias (15 reglas + 3 audio), todas aprobadas. Se verifica la generación de audio no vacío, contexto reanudado, aplausos estéreo, osciladores de chicharra y degradación sin bloquear el juego si no hay audio disponible.
- Navegador: imágenes cargadas, eventos reales de Web Audio en estado running tras aciertos/errores, incluido el décimo acierto. Se observa la posición del tren cuando se inserta la pregunta; no debe separarse más de un píxel del centro de la estación.
- Prueba adicional: transición visual extendida a 3000 ms; la pregunta sigue oculta a los 2700 ms y aparece al llegar, sin depender solo del temporizador de 2500 ms.
- Capturas y evidencia de las dos resoluciones se actualizan en `evidence/`. La evidencia remota de esta actualización está en `evidence/remote/browser-report.json`.
- No se ha realizado escucha con los altavoces físicos de la sala; el relator debe ajustar su volumen antes de la capacitación.


### Verificación pública de la actualización

- Commit funcional: `13bc84d8b811f70669da52eda22866ddb31fe7fc`.
- Despliegue aprobado: https://github.com/fzambran/trivia-metro-santiago/actions/runs/38789509033 (`completed / success`).
- Suite de navegador repetida sobre https://fzambran.github.io/trivia-metro-santiago/: aprobada en ambas resoluciones, incluidos imágenes cargadas, audio Web Audio, llegada real y animación retrasada, victoria, derrota y reinicio.
- HTTP 200 y coincidencia exacta con fuentes verificadas para HTML, CSS, app.js, audio.js, logo oficial, NS-93 y respaldo offline.
- El logo publicado coincide byte por byte con el adjunto del usuario. Las capturas locales del repositorio se renovaron con la nueva apariencia.


## Aplausos seleccionados desde YouTube

- Fuente indicada expresamente por el usuario: https://www.youtube.com/watch?v=PsLXAIN-fxo. Fragmento local de 3 segundos (00:00.450–00:03.450), estéreo, con cierre de 350 ms. Fuente y edición en assets/AUDIO.md.
- Sustituida la síntesis de aplausos por decodificación y reproducción del MP3 local. La chicharra se conserva. No se contacta YouTube durante el juego.
- Carga asíncrona: reproducción diferida si la grabación aún no está lista, cancelada si se reinicia o llega otro resultado; fallos de carga no bloquean las reglas ni la chicharra.
- 21 pruebas unitarias aprobadas (15 reglas y 6 audio). Navegador comprueba la duración decodificada de aproximadamente 3 segundos, reproducción tras aciertos, ambas resoluciones y MP3 incrustado en respaldo offline.
- Verificación pública aprobada sobre el enlace del juego: grabación decodificada de aproximadamente 3 segundos y reproducida tras los aciertos en ambas resoluciones. Despliegue: https://github.com/fzambran/trivia-metro-santiago/actions/runs/38791618155 (success), commit funcional c0623fc55825534ee7249207843dcdca94f41039.

Las suites local y remota volvieron a pasar con el reloj de prueba pausado durante la descarga/decodificación del MP3, evitando que la latencia de red altere los límites de 2499/2500 ms. La prueba de animación real conserva su reloj real. El MP3, audio.js y el HTML offline publicados coinciden exactamente con los archivos verificados.


## Corrección del bloqueo en pregunta 7

Reproducción de la versión anterior en 1180 × 768 y 1200 × 768: tras seis aciertos, Unión Latinoamericana quedaba en pantalla de viaje sin alternativas. El tren ya no tenía animación activa, pero su centro difería de la estación en 1,328125 px y 1 px respectivamente. La condición anterior exigía menos de 1 px y esperaba indefinidamente.

Causa: CSS Grid puede dar anchos diferentes a las columnas por el tamaño mínimo del nombre en negrita «Unión Latinoamericana». El tren usaba porcentajes que suponían once columnas iguales. Las pruebas anteriores cubrían la partida en 1366 y 1920 px y animación real solo en la primera estación, por lo que no detectaban esta combinación.

Corrección:
- Destinos del tren y extremos del riel medidos desde los centros reales de las estaciones.
- Recalcular posiciones al redimensionar el mapa con ResizeObserver.
- Tras finalizar la transición de posición, asentar el tren en el centro real y revelar la pregunta; sin bucle infinito condicionado a un error de redondeo.
- Versionar la referencia a app.js para evitar reutilizar la lógica anterior desde caché. El respaldo HTML conserva el código incrustado.

Evidencia local:
- 21 pruebas unitarias aprobadas y suite de navegador estándar aprobada en 1366 × 768 y 1920 × 1080.
- scripts/arrival-check.mjs completa las diez preguntas y victoria en 900, 1024, 1180, 1200, 1280, 1366 y 1920 px, verificando en cada estación pregunta visible y error de alineación menor de 0,1 px.
- Partida completa adicional con animación CSS real y redimensionamiento de 1280 a 1180 px durante el viaje a la pregunta 7: victoria y alineación correcta.
- evidence/arrival-report.json y capturas arrival-1180-q7.png, arrival-1200-q7.png y arrival-real-q7.png.
- La regresión de llegada se ejecuta ahora en GitHub Actions antes de desplegar.

La verificación pública de esta corrección se registrará después del despliegue.
