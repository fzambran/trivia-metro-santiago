# Trivia Metro de Santiago — Objetivo

## Resultado requerido
Implementar y publicar una aplicación web estática de diez preguntas para capacitación interna del Metro de Santiago. El relator opera un computador proyectado; los asistentes acuerdan las respuestas.

Seguir PLAN.md y el cuestionario que valide el usuario. No agregar funcionalidades fuera del alcance.

## Criterios de aceptación
- Inicio con título, instrucciones y Comenzar.
- Mapa horizontal rojo desde Neptuno, con las diez estaciones de Pajaritos a La Moneda rotuladas.
- Tren que avanza durante 2,5 segundos antes de mostrar cada pregunta y sus cuatro alternativas.
- Selección bloqueada durante 2 segundos de suspenso; resultado verde o rojo, respuesta correcta y explicación breve.
- Aciertos completan estaciones y habilitan Siguiente estación; el décimo acierto muestra victoria.
- Error termina la partida. Universidad de Santiago se asegura únicamente al acertar la pregunta 5. Errores en 1–5 no conservan estación segura; errores en 6–10 conservan Universidad de Santiago.
- Comodines 50/50 y Consulta al andén, una vez cada uno por partida, combinables.
- Progreso visible, final de derrota o victoria y Jugar de nuevo con restablecimiento completo.
- Pruebas automatizadas de reglas y evidencia de revisión visual a 1366 × 768 y 1920 × 1080.
- Enlace publicado accesible sin iniciar sesión, verificado tras publicación.
- Entrega de fuentes, cuestionario validado, evidencia de pruebas, guía del relator y copia estática descargable.

## Restricciones
HTML, CSS y JavaScript estáticos. Datos de preguntas separados de la lógica. Sin servidor, cuentas de jugadores, datos personales, ranking, móviles conectados ni analítica. Estado en memoria; recargar vuelve al inicio. Sin límite de tiempo para responder.

## Hitos de validación humana
1. Cuestionario: detenerse antes de diseño e implementación hasta aprobación explícita.
2. Diseño: presentar propuesta revisable y detenerse antes de implementar el juego.
3. Publicación: preparar y probar el resultado; detenerse antes de publicarlo hasta aprobación explícita.

Las continuaciones automáticas no constituyen aprobación. Si falta información esencial, informar el bloqueo. Completar el objetivo solo con todos los criterios demostrados y el enlace publicado verificado.

## Estado al 15 de octubre de 2026
Jornada 1: documentos creados; CUESTIONARIO.md es una propuesta pendiente de validación. No se ha construido ni publicado el juego.

## Actualización de autorización
El usuario validó el cuestionario e indicó continuar con implementación y despliegue público en su cuenta GitHub. Esa instrucción posterior autoriza avanzar sin nuevas validaciones de diseño/publicación. También confirmó expo.md para conversión futura a Expo/React Native. Se conservan las observaciones documentales del cuestionario.

## Resultado de implementación
Aplicación estática publicada en https://fzambran.github.io/trivia-metro-santiago/ y repositorio público en https://github.com/fzambran/trivia-metro-santiago. Quince pruebas de reglas y comprobaciones de navegador en ambas resoluciones aprobadas localmente y en el enlace público. Evidencia en VALIDATION.md y evidence/. El ensayo con proyector físico queda pendiente del relator.

## Cambios solicitados tras la entrega
Incorporar el logo oficial adjunto, tren NS-93 basado en la referencia, aplausos al acertar y chicharra al fallar. La pregunta debe aparecer al finalizar efectivamente el movimiento. Sonidos originales sintetizados localmente, sin servicios externos.
