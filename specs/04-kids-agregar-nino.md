# SPEC 04 — Agregar niño (/kids/new)

> **Status:** Aprobado
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-10-19
> **Objective:** Replicar `references/pantallas/agregar-nino.dc.html` en `/kids/new` como formulario standalone con validación HTML5 nativa: nombre, fecha de nacimiento y sala obligatorios; alergias y notas médicas opcionales.

## Scope

**In:**

- Ruta `/kids/new` (ya enlazada por el CTA "Agregar niño" de `/kids` desde SPEC 02, hoy 404) como tarjeta centrada `max-w-[520px]` sobre fondo canvas, **sin `AppShell`** (patrón standalone de SPEC 03).
- Cabecera de tarjeta: link "Cancelar" → `/kids`, título Fredoka "Agregar niño", y "Guardar" como `<button type="submit">` rojo (`#D9583C`, token `brand-accent` existente).
- Campos con las etiquetas en versalitas del mockup: NOMBRE COMPLETO (`input`, placeholder "Ej. Martina López", `required`), FECHA DE NACIMIENTO (`input` de texto con placeholder "dd/mm/aaaa", `required`), SALA (`<select>` funcional, `required`, opción preseleccionada "Soles"), ALERGIAS (ETIQUETAS) (`input`, placeholder "Ej. Maní, Lactosa", **opcional**, etiqueta con "(opcional)" añadido) y NOTAS MÉDICAS (`textarea`, placeholder "Indicaciones, medicación, contactos…", **opcional**, etiqueta con "(opcional)").
- Envío sin backend: `onSubmit` con `preventDefault` y `router.push("/kids")`. Con obligatorios vacíos, el navegador bloquea el envío y muestra su mensaje nativo de `required` (no se navega).
- Mock `CLASSROOMS` en `app/data/kids.ts`: `["Soles", "Lunas", "Estrellas"]` (decisión del usuario: varias salas aunque el proyecto solo tenga Soles).
- Reutilizar tokens existentes de `@theme` (`auth-canvas`, `line`, `line-field`, `ink`, `ink-soft`, `ink-placeholder`, `brand-accent`); no se añaden tokens nuevos.

**Out of scope (for future specs):**

- Persistencia real del niño: Server Actions, API, base de datos, añadir a `KIDS` en memoria.
- Validación propia en JS con mensajes bajo cada campo (se usa la nativa de HTML5).
- Tag input con chips eliminables para alergias (queda como texto plano del mockup).
- Formato/validación real de la fecha (es texto con placeholder, como el mockup).
- `/kids/[id]/edit`, `/kids/[id]/daily-summary`, `/kids/[id]/link-parent` (diferidos en SPEC 02).
- Montar el `AppShell` común en `app/layout.tsx`.

## Data model

```ts
// app/data/kids.ts (nuevo export; Kid no cambia)
export const CLASSROOMS: string[] = ["Soles", "Lunas", "Estrellas"];
```

Convenciones:

- El formulario no crea tipos nuevos: lee `CLASSROOMS` para el `<select>` y no construye ningún objeto `Kid` (no hay alta real).
- Copy visible en español, identificadores en inglés (regla de SPEC 01/02).

## Implementation plan

1. `app/data/kids.ts`: añadir `CLASSROOMS` con las tres salas. Verificación: `npx tsc --noEmit` limpio.
2. `app/components/add-kid-form.tsx` (`"use client"`): la tarjeta completa —cabecera con Cancelar/título/Guardar-submit, los cinco campos con sus etiquetas (las dos últimas con "(opcional)"), `required` en nombre y fecha, `<select>` de SALA con `defaultValue="Soles"`— y `onSubmit(e){e.preventDefault(); router.push("/kids")}`. Verificación: `npx tsc --noEmit` y `npx eslint app` limpios.
3. `app/kids/new/page.tsx` (server): contenedor a pantalla completa (`min-h-screen`, fondo canvas, padding y centrado del mockup) que renderiza `<AddKidForm />`; sin `AppShell`. Verificación: `/kids/new` comparable con `agregar-nino.dc.html` a 1280px.
4. Recorrer el flujo en el navegador: CTA de `/kids` entra, vacío bloquea, válido navega a `/kids`, Cancelar navega a `/kids`, a 375px sin overflow horizontal.

## Acceptance criteria

- [ ] El CTA "Agregar niño" de `/kids` navega a `/kids/new` (deja de ser 404) y la pantalla se ve como `agregar-nino.dc.html` a 1280px: tarjeta centrada con borde `line`, cabecera Cancelar/Agregar niño/Guardar y los cinco campos con el copy exacto del mockup.
- [ ] Las etiquetas de ALERGIAS (ETIQUETAS) y NOTAS MÉDICAS incluyen el marker "(opcional)"; las de nombre, fecha y sala no.
- [ ] Con nombre o fecha vacíos, "Guardar" no navega y el navegador muestra el aviso nativo de campo obligatorio.
- [ ] Con nombre y fecha escritos (alergias y notas vacías), "Guardar" navega a `/kids` sin peticiones de red ni errores de consola; nada se persiste (volver a `/kids/new` muestra el formulario vacío).
- [ ] SALA es un `<select>` real con Soles preseleccionada y las opciones Lunas y Estrellas; cambiarla no rompe nada.
- [ ] "Cancelar" navega a `/kids`.
- [ ] `/kids/new` no renderiza el sidebar: es tarjeta centrada sobre fondo `#F6ECDF` a pantalla completa.
- [ ] A 375x812 la tarjeta ocupa el ancho disponible con su padding y no hay scroll horizontal.
- [ ] No hay tokens nuevos en `globals.css`; los colores salen de los existentes.
- [ ] `npx tsc --noEmit` y `npx eslint app` terminan sin errores.

## Decisions

- **Sí:** validación HTML5 nativa (`required`) en nombre y fecha, decisión del usuario; alergias y notas quedan opcionales con "(opcional)" visible. **No:** validación JS propia con mensajes: excesiva para una spec de interfaz sin backend.
- **Sí:** submit con `preventDefault` + volver a `/kids` (simula alta exitosa), decisión del usuario. **No:** botón sin acción como SPEC 03: con campos required un submit que no hace nada al completarse se sentiría roto. **No:** agregar el niño al mock en memoria: sin sesión ni persistencia sería un espejismo; va con la spec de backend.
- **Sí:** `<select>` con varias salas (Soles/Lunas/Estrellas), decisión del usuario, aunque el proyecto solo usa Soles. **No:** estático decorativo como el mockup.
- **Sí:** alergias como input de texto plano (decisión del usuario). **No:** tag input con chips: merece su propia spec si llega.
- **Sí:** standalone sin `AppShell` (decisión del usuario, patrón de `/login`). **No:** fecha con `type="date"`: el render del navegador diverge del mockup ("dd/mm/aaaa").

## Risks

| Riesgo                                                       | Mitigación                                                                               |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Navegar a `/kids` tras "Guardar" puede leerse como alta real | Marcado en Scope y Decisions: no persiste; el formulario se reencuentra vacío al volver. |
| `required` en input de texto de fecha acepta cualquier texto | Aceptado: validar formatos es trabajo de la spec de backend.                             |

## What is **not** in this spec

- Alta real del niño (backend, Server Actions, base de datos, mutación del mock).
- Chips de alergias, validación JS de fecha/campos, mensajes de error propios.
- `/kids/[id]/edit` y demás pantallas difieridas por SPEC 02.
- Mover el shell común a `app/layout.tsx`.

Cada una de esas, si aterriza, va en su propia spec.
