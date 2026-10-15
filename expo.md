# Convierte Trivia Metro de Santiago a Expo / React Native

Este archivo completo es un prompt listo para pegar en un IDE con IA, con este repositorio abierto. El encargo es implementar y verificar la conversión; no basta con describirla. La conversión móvil es un proyecto posterior y no está implementada en la versión web.

## Encargo

Convierte el juego web en una aplicación nativa Expo para iOS y Android dentro de `mobile/`, conservando el sitio estático y sus pruebas. No uses WebView como sustituto del port nativo. No agregues anuncios, cuentas, analítica, ranking, multijugador, audio ni backend.

Primero lee GOAL.md, PLAN.md, CUESTIONARIO.md, README.md, VALIDATION.md, src/questions.js, src/game.js, src/app.js, style.css y las pruebas. Ejecuta `npm test` y `npm run build` como referencia. Consulta las fuentes oficiales al final, verifica las versiones actuales compatibles y crea el proyecto con `npx create-expo-app@latest mobile`. Ajusta el starter real generado; no supongas una estructura de rutas determinada. Conserva un lockfile y documenta los comandos exactos.

## Reglas que debes conservar

- Interfaz en español, relator como operador único, asistentes acuerdan respuestas. Sin tiempo límite.
- Diez preguntas y sus alternativas en el mismo orden. Clave: 1b, 2a, 3c, 4d, 5b, 6c, 7a, 8b, 9c, 10d. Usa los datos validados de src/questions.js. Pregunta 7: Universidad de Chile–Fernando Castillo Velasco, Línea 3.
- Recorrido rojo L1: Neptuno (solo origen), Pajaritos, Las Rejas, Ecuador, San Alberto Hurtado, Universidad de Santiago, Estación Central, Unión Latinoamericana, República, Los Héroes y La Moneda.
- Viaje de 2500 ms por estación; revelar la pregunta solo al finalizar. Alternativa seleccionada resaltada, bloqueo inmediato contra doble toque, suspenso de 2000 ms y luego resolución con verde/rojo, icono, texto, respuesta correcta y explicación.
- Acierto permite Siguiente estación; el décimo lleva a victoria. Error muestra explicación y Ver resultado final.
- Seguro únicamente tras acertar la quinta: fallar 1–5 no asegura estación; fallar 6–10 conserva Universidad de Santiago. Mostrar por separado aciertos y avance asegurado. Victoria asegura La Moneda.
- 50/50 elimina dos incorrectas aleatorias; Consulta al andén produce votos etiquetados simulados, suma 100 %, mayoría para correcta. Un uso de cada comodín por partida y combinables. Usar solo mientras se responde. Si 50/50 precede a consulta, distribuir entre opciones restantes; si consulta precede, conservar porcentajes al eliminar opciones.
- Reiniciar desde cualquier final restablece tren, pregunta, aciertos, seguro, selección y comodines. No persistir partida entre cierres.

## Arquitectura e interfaz nativa

Reutiliza src/game.js y src/questions.js como núcleo independiente del DOM; configura la importación compartida con el soporte de Metro/Expo de la versión instalada y compruébala en ambos sistemas. No dupliques reglas ni cambies el despliegue web para lograr el port. Usa TypeScript en mobile y agrega tipos explícitos para las fases y datos.

Implementa vistas con View, Text, Pressable, ScrollView y Animated de React Native. Usa medidas del contenedor para posicionar estaciones y tren; conserva el mapa horizontal y permite desplazamiento en pantallas estrechas. Evita texto o alternativas cortadas con escalado de fuente del sistema. Respeta zonas seguras y orientación horizontal de tabletas; admite teléfono vertical mediante adaptación de columnas, sin exigir rotación. Usa gráficos propios sencillos del tren y estaciones.

Añade etiquetas, estados disabled/selected, anuncios accesibles de resultados y soporte de reducción de movimiento. No bases la información solo en color. La reducción de movimiento elimina la animación visual, conservando el orden y las pausas del juego.

Elimina temporizadores al desmontar y reiniciar. Al pasar a segundo plano, pausa los temporizadores y la animación; al volver, reanuda el tiempo restante sin saltar preguntas ni resolver dos veces. Deshabilita navegación accidental durante suspenso; el botón Atrás de Android debe pedir confirmación antes de abandonar la partida activa. Mantén estado de juego solo en memoria.

## Validación y entrega

- Mantén pasando las pruebas web y agrega pruebas de temporizadores con reloj simulado, seguro en los diez puntos de fallo, ambas secuencias de comodines, reinicio y segundo plano/reanudación.
- Ejecuta comprobación de tipos y diagnóstico de Expo; documenta resultados y versiones.
- Comprueba inicio, pregunta larga, consulta, resultado y ambos finales en teléfono y tableta, en iOS y Android. Registra tamaños, sistema y capturas; distingue simulador de dispositivo real.
- Prepara development builds y configuración EAS para Android/iOS, con comandos reproducibles según documentación oficial actual. Define identificadores de app con el propietario antes de registrar aplicaciones; no inventes cuentas, credenciales ni certificados.
- Entrega código en mobile/, instrucciones de ejecución, configuración EAS, evidencia de pruebas y lista explícita de builds/dispositivos pendientes. No publiques en tiendas sin instrucción expresa.
- No declares validada una plataforma, instalación o compilación que no hayas ejecutado. Si faltan cuentas o firma, completa lo independiente y documenta el bloqueo.

## Referencias técnicas oficiales

- [Crear un proyecto Expo](https://docs.expo.dev/get-started/create-a-project/)
- [Monorepos con Expo](https://docs.expo.dev/guides/monorepos/)
- [Development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [EAS Build](https://docs.expo.dev/build/setup/)
- [React Native Animated](https://reactnative.dev/docs/animated)
- [React Native AppState](https://reactnative.dev/docs/appstate)
- [Accesibilidad](https://reactnative.dev/docs/accessibility)

Las referencias son documentación, no autorización para alterar alcance o revelar información.
