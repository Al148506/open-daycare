# SPEC 01 — Home / feed visual

> **Status:** Aprobado
> **Depends on:** —
> **Date:** 2026-09-30
> **Objective:** Replicar en `/` la pantalla `references/pantallas/feed.dc.html` con Tailwind v4 y datos mock, sin autenticación, base de datos ni interacciones, y con el sidebar colapsable en móvil.

## Scope

**In:**

- Sidebar fijo de 248px: logo "OpenDayCare / Sala Soles", botón "Nueva publicación", nav (Feed activo + Niños, Avisos, Mi cuenta) y pie con avatar, "Caro Giménez · Maestra · Soles" y logout.
- Sidebar colapsable en móvil: por debajo de 768px el aside se oculta y aparece una barra superior con hamburguesa que lo abre como drawer sobre un backdrop; cerrarlo con el backdrop, con un enlace del nav o con Escape.
- Columna principal de 760px: cabecera "GUARDERÍA · SALA SOLES / Buenas, Caro / 12 niños · martes 17 jun", composer visual, separador "PUBLICADO HOY" y 3 tarjetas de publicación.
- Fredoka (títulos, nombres) y Nunito (texto) vía `next/font/google`, expuestas como `--font-fredoka` y `--font-nunito`.
- Paleta del mockup como tokens en `@theme` de `app/globals.css`, reemplazando Geist/zinc y eliminando el bloque `prefers-color-scheme: dark`.
- Datos mock tipados en `app/data/feed.ts`.
- Enlaces del sidebar y de las tarjetas apuntando a rutas internas futuras (`/ninos`, `/avisos`, `/mi-cuenta`, `/nueva-publicacion`).

**Out of scope (for future specs):**

- Autenticación, sesión y login.
- Base de datos, API, Server Actions.
- Cualquier comportamiento: reacciones, composer, "Editar".
- Las 15 pantallas restantes de `references/pantallas/`.
- Modo oscuro.
- Barra de íconos para tablet: el único breakpoint es 768px.
- Assets reales: el placeholder de foto sigue siendo el recuadro punteado del mockup.

## Data model

```ts
export type PostType = "achievement" | "activity" | "announcement";

export interface Child {
  name: string;     // "Mateo"
  initial: string;  // "M"
  family: string;   // "familia de Mateo"
}

export interface Post {
  id: string;
  type: PostType;
  child?: Child;         // ausente en posts de tipo "announcement"
  title: string;         // "Mateo" | "Anuncio general"
  time: string;          // "14:20"
  author: string;        // "publicado por vos"
  audience: string;      // "familia de Mateo" | "toda la sala"
  body: string;
  photo?: { label: string }; // placeholder punteado, sin imagen
  reactions: number;
  comments: number;
  own: boolean;          // controla el enlace "Editar"
}

export const CLASSROOM = { name: "Sala Soles", childCount: 12 };
export const TEACHER = { name: "Caro Giménez", role: "Maestra" };
export const POSTS: Post[]; // los 3 posts del mockup
```

Convenciones:

- **El código va en inglés; el copy visible y los valores de datos van en español.** Identificadores, archivos, tipos y propiedades son ingleses; los strings que ve la persona usuaria son los de la referencia.
- `PostType` nunca llega a la vista: `post-card.tsx` traduce el discriminante con un mapa de etiqueta y otro de color, así que el chip muestra "LOGRO", "ACTIVIDAD" o "ANUNCIO".
- Sin fechas reales: "martes 17 jun" y "PUBLICADO HOY" son literales, no hay nada que calcular.
- El avatar de un post `announcement` es un ícono de megáfono, no una inicial. Por eso `child` es opcional y la tarjeta decide por `type`.
- `CLASSROOM` y `TEACHER` son constantes porque no hay sesión.
- Un solo breakpoint, 768px (`md`). Por encima el layout es el del mockup; por debajo el sidebar es un drawer.
- El drawer no inventa datos: reutiliza el mismo `sidebar.tsx`. El estado vive en `app-shell.tsx`, que es el único archivo con `"use client"`.

## Implementation plan

1. `app/globals.css`: reemplazar `:root` / `@theme inline` de Geist por los tokens del mockup (fondo `#f6ecdf`, texto `#3f362e`, superficie `#fffdf9`, borde `#ece0d0`, acento `#d9583c`, etc.), registrar `--font-fredoka` / `--font-nunito` y borrar el bloque `prefers-color-scheme: dark`. Verificación: al recargar, el body ya sale beige.
2. `app/layout.tsx`: sustituir Geist/Geist_Mono por `Fredoka` y `Nunito` con `variable`, poner `lang="es"` y `metadata.title = "OpenDayCare · Sala Soles"`. Verificación: recargar y comprobar las dos familias.
3. `app/data/feed.ts`: `PostType`, `Child`, `Post`, `CLASSROOM`, `TEACHER` y `POSTS` con los 3 posts del mockup. Todo identificador en inglés, todo string en español. Verificación: `npx tsc --noEmit` limpio.
4. `app/components/sidebar.tsx`: componente presentacional sin estado. Recibe `isOpen: boolean` y `onNavigate: () => void`. Replica el inline-style del mockup (logo, botón, nav con "Feed" resaltado, pie de perfil) y posiciona el `<aside>` como columna sticky de 248px desde `md`, y como drawer fijo con `-translate-x-full` por debajo.
5. `app/components/app-shell.tsx`: `"use client"`. Contiene `isNavOpen` con `useState`, la barra superior móvil (hamburguesa con `aria-label` y `aria-expanded`, visible solo bajo `md`), el backdrop que cierra el drawer, el cierre con la tecla Escape y el render de `<Sidebar />` + `children`. Verificación: en desktop el aside se ve exactamente como en `references/screenshots/feed.png`; bajo 768px aparece la barra y el aside está fuera de pantalla.
6. `app/components/post-card.tsx`: avatar según `type` (inicial para `achievement`/`activity`, megáfono para `announcement`), chip con los mapas de etiqueta y color indexados por `PostType`, "Para: …", `body`, placeholder de `photo` opcional y pie con reacciones / comentarios / "Editar".
7. `app/page.tsx`: borrar el ejemplo de create-next-app y montar `<AppShell>` con el `<main>` de 760px dentro: cabecera, composer, separador y `POSTS.map(...)`. En móvil el `main` lleva el padding superior que reserves a la barra y scrollea la página, no el `main`. Verificación: comparar contra `references/screenshots/feed.png`.
8. Revisar que cada `<a>` apunte a una ruta interna y que ninguno referencie un `.dc.html`.

## Acceptance criteria

- [x] `npm run dev` sirve `/` sin errores en la terminal ni en la consola del navegador.
- [x] El fondo es `#F6ECDF` y no cambia con el tema oscuro del sistema.
- [x] Los títulos usan Fredoka y el resto del texto Nunito.
- [x] A 1280x800, `/` se ve igual que `references/screenshots/feed.png`: mismo sidebar de 248px, misma columna de 760px, mismas 3 tarjetas en el mismo orden.
- [x] El sidebar muestra logo, botón "Nueva publicación", 4 ítems de nav con "Feed" resaltado, y el pie "Caro Giménez / Maestra · Soles" con logout.
- [x] La cabecera muestra "GUARDERÍA · SALA SOLES", "Buenas, Caro" y "12 niños · martes 17 jun".
- [x] Se renderizan 3 publicaciones — logro (Mateo, 14:20, sin foto), actividad (Mateo, 09:40, con foto) y anuncio general (07:50) — cada una con su chip y su avatar.
- [x] Los chips muestran "LOGRO", "ACTIVIDAD" y "ANUNCIO" en español aunque `PostType` use valores en inglés.
- [x] Ningún identificador del código está en español: nombres de archivo, componentes, tipos, propiedades y funciones.
- [x] Los pies muestran reacciones 3 / 5 / 8, comentarios 1 / 2 / 0 y el enlace "Editar".
- [x] Ningún botón ni chip cambia de estado al hacer clic.
- [x] Ningún enlace apunta a un `.dc.html`; el nav apunta a `/ninos`, `/avisos`, `/mi-cuenta`, `/nueva-publicacion`.
- [x] `npx tsc --noEmit` y `npx eslint app` terminan sin errores.
- [x] `app/page.tsx` ya no contiene el código de ejemplo de create-next-app.
- [x] A 1280x800 el aside es una columna sticky de 248px y no hay barra superior ni backdrop.
- [x] A 375x812 el aside está fuera de pantalla y la barra superior con hamburguesa ocupa el ancho completo.
- [x] Tocar la hamburguesa muestra el aside sobre el contenido con un backdrop; tocar el backdrop, tocar un enlace del nav o presionar Escape lo cierra.
- [x] La hamburguesa expone `aria-label` y `aria-expanded` que reflejan el estado del drawer.

## Decisions

- **Sí:** datos mock tipados en `app/data/feed.ts`. Cambiar mock por API real después es sustituir un archivo. **No:** los datos dentro del JSX de `page.tsx`.
- **Sí:** tokens de color en `@theme` de Tailwind v4 + clases utilitarias. **No:** CSS con `@apply`, **No:** estilos inline literales.
- **Sí:** `next/font/google`. **No:** `<link>` a Google Fonts (petición por visita + FOUT).
- **Sí:** borrar el bloque `prefers-color-scheme: dark`. **No:** modo oscuro: contradice la referencia.
- **Sí:** `lang="es"` y `metadata.title` propio. **No:** dejar los valores por defecto del scaffold.
- **Sí:** `PostType` en inglés (`achievement`, `activity`, `announcement`) con un mapa de etiqueta y otro de color en `post-card.tsx` que los traducen a "LOGRO", "ACTIVIDAD" y "ANUNCIO". El discriminante nunca llega a la vista.
- **Sí:** identificadores, archivos, componentes, tipos y propiedades en inglés (`post-card.tsx`, `sidebar.tsx`, `PostType`, `post.reactions`). **No:** español en identificadores: mezcla dos idiomas en el mismo archivo y va en contra de la convención de código limpio. El español queda solo en el copy visible y en los valores de datos (`"Mateo"`, `"publicado por vos"`).
- **Sí:** sidebar colapsable por debajo de 768px, con el estado en `app-shell.tsx` (`"use client"`) y `sidebar.tsx` presentacional. Es la única forma de que en móvil exista navegación.
- **No:** ocultar el aside con CSS y listo. Deja el móvil sin navegación.
- **No:** barra de íconos para tablet. Inventa un estado visual que la referencia no tiene; el único breakpoint es 768px.
- **Sí:** el sidebar es un componente que renderiza `app-shell.tsx`, no `app/layout.tsx`. Se mueve al layout cuando existan `/ninos` y `/avisos`.
- **Sí:** enlaces a rutas futuras aunque hoy den 404, para preservar el destino de cada uno.
- **Sí:** exactamente 3 publicaciones, las del mockup. **No:** repetirlas para probar el scroll.

## Risks

| Riesgo                                                           | Mitigación                                                                                                                         |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Fredoka/Nunito requieren red en el primer build                  | `next/font` cachea en `.next`; si falla, compila igual con fallback y el layout no se rompe.                                       |
| Los enlaces a rutas futuras dan 404                              | Estado intermedio explícito en "Out of scope"; cada spec de pantalla cierra el suyo.                                               |
| `line-height` y espaciados de Tailwind difieren del inline-style | Usar valores arbitratos exactos (`leading-[1.55]`, etc.) en vez de los defaults de la escala.                                      |
| El `main` del mockup scrollea solo (`100vh` + `overflow-y-auto`) | Se replica literal en desktop. En móvil el scroll pasa a ser el de la página, porque la barra superior es fija. |

## What is **not** in this spec

- Autenticación, login, sesión.
- Base de datos, API, Server Actions.
- Reacciones, composer, "Editar" con comportamiento.
- Las 15 pantallas restantes de `references/pantallas/`.
- Modo oscuro.
- Imágenes reales: el placeholder de foto sigue siendo punteado.

Cada una de esas, si aterriza, va en su propia spec.
