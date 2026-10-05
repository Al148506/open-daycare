# SPEC 02 — Listado y perfil de niños (/kids y /kids/[id])

> **Status:** Aprobado
> **Depends on:** SPEC 01
> **Date:** 2026-10-05
> **Objective:** Replicar las pantallas `references/pantallas/ninos.dc.html` y `references/pantallas/perfil-nino.dc.html` en `/kids` y `/kids/[id]` con datos mock y búsqueda funcional en cliente, sin backend.

## Why this spec exists

SPEC 01 fijó rutas internas en español (`/ninos`, `/avisos`, `/mi-cuenta`, `/nueva-publicacion`). El usuario decidió explícitamente lo contrario: las rutas de página van en inglés. Esta spec aplica esa convención desde ya y renombra los hrefs del sidebar que aún no tienen página, para no arrastrar la mezcla de idiomas.

## Scope

**In:**

- Ruta `/kids` (listado) según `ninos.dc.html`: cabecera "GESTIÓN / Niños" con CTA "Agregar niño" → `/kids/new`, buscador que filtra por nombre en el cliente, separador "SALA SOLES · 8 niños" y grilla de 2 columnas con las 8 tarjetas (avatar de color, "N años · M padres vinculados", badge o chevron, hover del mockup).
- Ruta `/kids/[id]` (perfil) según `perfil-nino.dc.html`: link "Volver a Niños", cabecera con avatar de 84px + nombre + "N años · Sala Soles" + botón "Editar" → `/kids/{id}/edit`, bloque rojo de alergias solo cuando el niño tiene notas, tarjeta de filas (Fecha de nacimiento, Sala, Ingreso), columna derecha con botón oscuro "Resumen del día" → `/kids/{id}/daily-summary` y tarjeta "PADRES VINCULADOS" con badges ACTIVA/PENDIENTE y link "Vincular otro padre" → `/kids/{id}/link-parent`.
- Datos mock tipados de los 8 niños en `app/data/kids.ts`, con perfil completo para todos; el id es un slug legible (`mateo-fernandez`) y un id inexistente devuelve 404 con `notFound()`.
- Refactor de `app/components/sidebar.tsx`: ítem activo detectado con `usePathname` (elimina el `isActive` hardcodeado) y hrefs renombrados a inglés: Niños → `/kids`, `/nueva-publicacion` → `/new-post`, `/avisos` → `/notices`, `/mi-cuenta` → `/account`. Actualizar en consecuencia el enlace del composer de `app/page.tsx` y el del CTA "Nueva publicación".
- Tokens nuevos en `@theme` de `app/globals.css`: 5 pares de color de avatar de niño (pastel + tinta), 2 de avatar de padre (saturado + blanco), badges de alergia (maní/lactosa), VINCULAR, ACTIVA y PENDIENTE, y el bloque de alerta de alergias.
- Iconos nuevos en `app/components/icons.tsx`: `SearchIcon`, `ChevronRightIcon`, `ChevronLeftIcon` y `AlertTriangleIcon`.
- Responsive con el patrón de SPEC 01: `AppShell` con drawer bajo 768px, grilla a 1 columna en móvil y las dos columnas del perfil apiladas.

**Out of scope (for future specs):**

- Las pantallas destino de los links: `/kids/new` (agregar), `/kids/[id]/edit`, `/kids/[id]/daily-summary` y `/kids/[id]/link-parent`. Hoy muestran el 404; cada una irá en su spec.
- `/notices` (avisos), `/account` (mi cuenta) y `/login`.
- Autenticación, sesión, base de datos, API o Server Actions.
- Agregar, editar o vincular niños con comportamiento real.
- Mover el `AppShell`/`Sidebar` de cada página a `app/layout.tsx`: se hará cuando exista una spec de navegación común (route group), no en esta.
- Sincronizar los conteos de mock entre pantallas (el feed dice "12 niños", el listado dice 8).

## Data model

```ts
// app/data/kids.ts
export type KidAvatar = "blue" | "pink" | "green" | "yellow" | "purple"; // pastel + tinta
export type ParentAvatar = "purple" | "blue"; // saturado + blanco
export type KidBadge = "peanut" | "lactose" | "linkParent"; // sin badge => chevron
export type ParentStatus = "active" | "pending";

export interface ParentLink {
  name: string; // "Lucía Fernández"
  role: string; // "Mamá" | "Papá"
  status: ParentStatus; // badge "ACTIVA" | "PENDIENTE"
  avatar: ParentAvatar;
}

export interface Kid {
  id: string; // slug: "mateo-fernandez" => /kids/mateo-fernandez
  name: string; // "Mateo Fernández"
  initial: string; // "M"
  age: number; // 3
  badge?: KidBadge;
  avatar: KidAvatar;
  birthDate: string; // "12 mar 2022"
  classroom: string; // "Soles"
  enrolled: string; // "feb 2025"
  allergyNotes?: string; // "Alergia al maní. Evitar frutos secos. …"
  parents: ParentLink[];
}

export const KIDS: Kid[]; // los 8 niños del mockup, con perfil completo cada uno
```

Convenciones:

- **El código va en inglés; el copy visible y los valores de datos van en español** (regla heredada de SPEC 01). El usuario pidió primero `app/data/ninos.ts` y lo corrigió a `kids.ts` al detectar el choque con esa regla.
- `KidBadge` y `ParentStatus` nunca llegan a la vista en crudo: `kid-card.tsx` y el perfil los traducen con mapas de etiqueta y color, como hace `post-card.tsx` con `PostType` ("peanut" → "MANÍ", "active" → "ACTIVA").
- El subtítulo del listado se deriva: `${age} años · ${parents.length} padres vinculados`, y "sin padres vinculados" cuando `parents.length === 0`. No existe campo `linkedParents`.
- El contador "8 niños" sale de `KIDS.length`; "SALA SOLES" sale de `CLASSROOM.name` de `app/data/feed.ts` (se importa, no se modifica).
- Valentina Soto es la niña con `badge: "linkParent"` y `parents: []`. Mateo y Tomás tienen `allergyNotes`; los demás no, y ahí se ejercita el bloque condicional.
- Fechas como literales del mockup ("12 mar 2022"): nada se calcula ni se formatea.

## Implementation plan

1. `app/data/kids.ts`: tipos y `KIDS` con los 8 niños completos (Mateo exacto al mockup de perfil; los otros 7 con datos plausibles del mismo estilo, en español). Verificación: `npx tsc --noEmit` limpio.
2. `app/globals.css`: añadir a `@theme` los pares de avatar de niño y de padre, los cuatro pares de badge y el trío del bloque de alerta (fondos `#FBDAD6`, icono `#F4A8A0`, títulos `#C5413A`/`#B25249`). Verificación: el dev server recompila sin errores.
3. `app/components/icons.tsx`: `SearchIcon` (lupa del mockup), `ChevronRightIcon`, `ChevronLeftIcon` y `AlertTriangleIcon`, siguiendo el patrón `base` existente. Verificación: `npx eslint app` limpio.
4. `app/components/sidebar.tsx`: pasar a `"use client"` con `usePathname` para marcar el ítem activo (`/kids` y cualquier `/kids/...` activan "Niños") y renombrar los cuatro hrefs; actualizar en `app/page.tsx` el enlace del composer a `/new-post`. Verificación: en `/` sigue activo "Feed" y el drawer móvil funciona igual.
5. `app/components/kid-card.tsx`: `<Link>` a `/kids/${kid.id}` con avatar, nombre, subtítulo derivado, badge traducido o `ChevronRightIcon`, y hover del mockup (borde `#F2A78E` + `translateY(-2px)` con `transition`). Verificación: `npx tsc --noEmit` limpio.
6. `app/kids/page.tsx` (server) + `app/components/kids-browser.tsx` (`"use client"`): la página monta `AppShell`, la cabecera "GESTIÓN / Niños", el CTA y el navegador; el navegador contiene el buscador (`useState` + `SearchIcon`) y la grilla `grid-cols-1 md:grid-cols-2` filtrando `KIDS` por nombre (insensible a mayúsculas). Verificación: `/kids` comparable con `ninos.dc.html` y el filtro funciona.
7. `app/kids/[id]/page.tsx`: `await params`, buscar `KIDS.find(...)` y `notFound()` si no existe; renderizar volver + cabecera (avatar 84px, nombre, "Editar" outline) + bloque de alergias condicional + tarjeta de filas. Verificación: `/kids/mateo-fernandez` muestra su perfil; `/kids/pepe` da 404.
8. Completar `app/kids/[id]/page.tsx` con la columna derecha: botón oscuro "Resumen del día" (reusa `SunIcon`), tarjeta "PADRES VINCULADOS" con filas de padre (avatar, rol, badge por `ParentStatus`) y link "Vincular otro padre" con círculo punteado (`PlusIcon`). Verificación: comparable con `perfil-nino.dc.html` a 1280px y a 375px.

## Acceptance criteria

- [ ] `/kids` se ve como `references/pantallas/ninos.dc.html`: cabecera con "GESTIÓN" y "Niños", CTA "Agregar niño", buscador, "SALA SOLES · 8 niños" y 8 tarjetas en grilla de 2 columnas a 1280px.
- [ ] Escribir "mateo" en el buscador deja solo la tarjeta de Mateo (sin distinguir mayúsculas); vaciar el campo restaura las 8.
- [ ] Cada tarjeta enlaza a su `/kids/{id}` (slug legible) y el CTA "Agregar niño" enlaza a `/kids/new`.
- [ ] Las tarjetas muestran "MANÍ", "LACTOSA" o "VINCULAR" donde el mock los muestra, y chevron en las restantes; el hover cambia el borde y eleva la tarjeta.
- [ ] El subtítulo de cada tarjeta dice "N años · M padres vinculados" derivado de los datos, y "sin padres vinculados" para Valentina.
- [ ] `/kids/mateo-fernandez` se ve como `references/pantallas/perfil-nino.dc.html`: volver a `/kids`, avatar "M" 84px, "Mateo Fernández", "3 años · Sala Soles", "Editar", bloque de alergias con triángulo, filas "12 mar 2022 / Soles / feb 2025", botón "Resumen del día" y padres Lucía (ACTIVA) y Diego (PENDIENTE) con "Vincular otro padre".
- [ ] `/kids/pepe` (u cualquier id inexistente) devuelve el 404 de Next vía `notFound()`.
- [ ] Un niño sin `allergyNotes` no renderiza el bloque de alergias.
- [ ] En `/` el sidebar resalta "Feed"; en `/kids` y `/kids/[id]` resalta "Niños", sin props manuales de estado activo.
- [ ] Ningún href apunta a `/ninos`, `/avisos`, `/mi-cuenta` o `/nueva-publicacion`: usan `/kids`, `/notices`, `/account` y `/new-post` (también el composer del feed).
- [ ] A 375x812 el listado usa 1 columna, el perfil apila sus columnas y el drawer del sidebar sigue funcionando.
- [ ] Ningún identificador, archivo o componente está en español (regla de SPEC 01); solo el copy visible y los valores de datos.
- [ ] `npx tsc --noEmit` y `npx eslint app` terminan sin errores.

## Decisions

- **Sí:** rutas de página en inglés (`/kids`, `/kids/[id]`, `/kids/new`, `/kids/{id}/edit`, `/kids/{id}/daily-summary`, `/kids/{id}/link-parent`), decisión explícita del usuario; anula las rutas en español previstas en SPEC 01. El specs/UI copy siguen en español.
- **Sí:** renombrar ya los hrefs pendientes del sidebar y del feed (`/new-post`, `/notices`, `/account`), aunque sus pantallas no existan: hoy son literales y así la convención queda consistente de una vez.
- **Sí:** buscador funcional filtrando el mock en el cliente. No requiere backend y deja la interfaz real; un input solo visual se sentiría roto.
- **No:** input puramente decorativo como en el mockup.
- **Sí:** `usePathname` en el sidebar (pasa a `"use client"`) en vez de un prop `activeHref` que cada página tendría que pasar o del hardcode actual.
- **Sí:** ids slug + `notFound()`: URLs legibles y el 404 estándar de Next sin inventar un estado vacío.
- **Sí:** perfil completo para los 8 niños y derivación del listado desde el mismo `Kid`, para que lista y perfil no diverjan; el bloque de alergias es condicional por `allergyNotes`.
- **Sí:** `app/data/kids.ts` con `Kid`/`KIDS`. El usuario eligió primero `ninos.ts` y lo corrigió a `kids.ts` para respetar la regla aprobada de SPEC 01 (cero español en identificadores).
- **No:** mover `AppShell` a `app/layout.tsx` ahora. La nota de SPEC 01 lo preveía con múltiples rutas, pero es un cambio de arquitectura de navegación que merece su propia spec; mientras, cada página monta su `AppShell`.
- **No:** tocar `app/data/feed.ts` más que su import. La discrepancia "12 niños" (feed) vs "8 niños" (listado) es mock por pantalla y se resolverá con datos reales.
- **No:** `generateMetadata` por niño ni `generateStaticParams`: no aportan a una spec de solo interfaz con mock.

## Risks

| Riesgo                                                                                                                | Mitigación                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Los links a `/kids/new`, `/kids/{id}/edit`, `/kids/{id}/daily-summary` y `/kids/{id}/link-parent` dan 404 hoy         | Aceptado: preserva el destino de cada acción (patrón de SPEC 01); cada pantalla cierra su link en su spec. |
| Renombrar `/nueva-publicacion` → `/new-post` contradice el texto de SPEC 01 (ya implementada e inmutable en `specs/`) | SPEC 02 lo documenta como decisión explícita del usuario; el cambio real es de dos literales de href.      |
| `sidebar.tsx` pasa a componente cliente y podría arrastrar re-render del layout                                       | El sidebar ya vivía dentro de `AppShell` (cliente); `usePathname` no añade jerarquías nuevas.              |
| Datos inventados para los 7 niños sin mock de perfil                                                                  | Quedan marcados como mock en `kids.ts`; la spec de backend los reemplaza sin cambiar las vistas.           |

## What is **not** in this spec

- Las pantallas `/kids/new`, `/kids/[id]/edit`, `/kids/[id]/daily-summary` y `/kids/[id]/link-parent`.
- `/notices` (avisos), `/account` (mi cuenta) y `/login`.
- Autenticación, base de datos, API, Server Actions ni persistencia.
- Agregar, editar o vincular niños con comportamiento real.
- Mover el shell/sidebar común a `app/layout.tsx`.
- Unificar los conteos mock entre feed y listado.

Cada una de esas, si aterriza, va en su propia spec.
