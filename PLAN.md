# Hoja de ruta — Trivia Metro de Santiago

## Objetivo y plazo
Cinco jornadas estimadas para una web publicada, proyectada y operada por el relator. El calendario depende de las validaciones del usuario; no se avanza por vencimiento de un plazo.

## Jornada 1 — Contenido y reglas
- Revisar diez preguntas, cuatro alternativas por pregunta, una respuesta correcta y una explicación de una o dos frases.
- Registrar fuentes y distinguir verificaciones parciales de confirmaciones completas.
- Corregir la pregunta 7: Universidad de Chile y Fernando Castillo Velasco, respuesta Línea 3; no Los Leones.
- Someter CUESTIONARIO.md a validación antes de continuar.
- Orden: Pajaritos, Las Rejas, Ecuador, San Alberto Hurtado, Universidad de Santiago, Estación Central, Unión Latinoamericana, República, Los Héroes y La Moneda. Neptuno es solo el origen.
- Aplicar las reglas de estación segura de GOAL.md. Mostrar aciertos y estación asegurada por separado, sin premios monetarios.

## Jornada 2 — Diseño para proyección
- Título propuesto: Destino La Moneda: Trivia Metro.
- Presentar inicio, pregunta, resultado y final; incluir los estados de mapa y comodines.
- Mapa esquemático rojo horizontal con Neptuno y diez desafíos. Nombres largos en varias líneas.
- Priorizar pregunta y alternativas; mostrar estación y Pregunta X de 10 siempre.
- Distinguir actual, completada y segura mediante texto, iconos y color.
- Tren e ilustraciones simples, sin recursos gráficos externos; teclado y movimiento reducido.
- Revisar 1366 × 768 y 1920 × 1080 sin cortes ni alternativas ocultas. Obtener validación del diseño.

## Jornadas 3 y 4 — Construcción
- HTML/CSS/JavaScript estáticos. Preguntas separadas de lógica con estación, enunciado, alternativas, respuesta y explicación.
- Estado en memoria: fase, pregunta, aciertos, estación segura, respuesta y comodines usados. Recargar vuelve al inicio.
- Comenzar mueve desde Neptuno a Pajaritos. Cada llegada dura 2,5 segundos y solo después revela la pregunta.
- Seleccionar resalta y bloquea respuestas y comodines; resolver tras 2 segundos.
- Acierto marca completada y ofrece Siguiente estación. Error muestra explicación y Ver resultado final antes de cerrar.
- Acertar la décima muestra victoria con explicación y recorrido completo.
- 50/50 elimina al azar dos incorrectas. Consulta al andén muestra votos etiquetados como simulados, suma 100 % y favorece siempre a la correcta.
- Ambos comodines son de un uso y combinables. Si 50/50 precede a consulta, repartir votos entre opciones restantes. Si consulta precede a 50/50, conservar sus porcentajes.
- Jugar de nuevo restablece toda la partida desde Neptuno.

## Jornada 5 — Verificación y entrega
- Automatizar partida perfecta, error en cada pregunta (1–10), seguro antes/después del quinto acierto, selección única, transiciones, combinaciones de comodines y reinicio desde ambos finales.
- Comprobar que nunca se elimina la correcta, cada comodín es de un uso y los votos suman 100 % con mayoría correcta.
- Revisar en navegador inicio, nombres del mapa, pregunta larga, consulta, resultado y finales a ambas resoluciones; conservar evidencia y registrar limitaciones.
- Verificar duraciones de movimiento y suspenso; probar teclado y movimiento reducido.
- Ensayar con computador/proyector previstos. Reservar 15–20 minutos orientativos, según conversación en sala.
- Preparar fuentes, guía breve, registro de pruebas y respaldo estático descargable.
- Solicitar validación de publicación con resultado probado y revisable. Publicar solo después; verificar acceso sin sesión y una partida completa en el enlace final.

## Seguimiento
- [x] Crear GOAL.md y PLAN.md según conversación.
- [x] Preparar propuesta CUESTIONARIO.md con observaciones de fuentes.
- [x] Validación humana del cuestionario.
- [x] Diseño implementado bajo autorización de continuar del usuario; revisión visual realizada.
- [x] Implementación.
- [x] Pruebas automatizadas y revisión visual. Ensayo con proyector físico pendiente del relator.
- [x] Publicación pública autorizada por el usuario.
- [ ] Publicación, verificación y entrega.

## Supuestos
Sala con internet y navegador actualizado. Enlace accesible para quien lo tenga; sin información confidencial. Sin móviles de participantes ni equipos con puntajes. El proyecto mide funcionamiento y facilidad de uso; evaluar aprendizaje queda fuera de esta versión.

## Autorización posterior del usuario
Cuestionario aprobado. El usuario solicitó implementar y desplegar públicamente en un repositorio de su cuenta GitHub, sin nueva pausa para diseño o publicación. expo.md será una guía/prompt de conversión nativa futura, no la conversión en sí.
