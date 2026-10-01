---
description: Verifica, corrige y marca los checks de "Acceptance criteria" de una spec en specs/ usando el agente spec-verifier.
agent: spec-verifier
---

Verifica los criterios de aceptación de la spec indicada por el argumento (número o ruta, p. ej. `01` o `specs/01-home-feed-estilo.md`). Si `$ARGUMENTS` está vacío, pregunta cuál spec verificar antes de continuar.

Aplica el flujo completo por criterio (inspección estática, comandos, contraste con documentación Next.js vía Context7 y verificación visual vía Playwright MCP), corrige con el cambio mínimo alineado al spec, marca `[x]` solo con evidencia y entrega el reporte final en español. No hagas commit.

Argumentos: $ARGUMENTS
