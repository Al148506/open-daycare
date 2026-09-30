# SPEC 01 — Home / feed visual

> **Status:** Aporbado
> **Depends on:** —
> **Date:** 2026-09-30
> **Objective:** Replicar en `/` la pantalla `references/pantallas/feed.dc.html` con Tailwind v4 y datos mock, sin autenticación, base de datos ni interacciones, y sidebar responsive colapse en mobile.

## Scope

**In:**

- Sidebar fijo de 248px: logo "OpenDayCare / Sala Soles", botón "Nueva publicación", nav (Feed activo + Niños, Avisos, Mi cuenta) y pie con avatar, "Caro Giménez · Maestra · Soles" y logout.
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
- Responsive / navegación móvil.
- Modo oscuro.
- Assets reales: el placeholder de foto sigue siendo el recuadro punteado del mockup.

## Data model

```ts
export type TipoPublicacion = "logro" | "actividad" | "anuncio";

export interface Nino {
  nombre: string; // "Mateo"
  inicial: string; // "M"
  familia: string; // "familia de Mateo"
}

export interface Publicacion {
  id: string;
  tipo: TipoPublicacion;
  titulo: string; // "Mateo" | "Anuncio general"
  hora: string; // "14:20"
  autor: string; // "publicado por vos"
  destinatario: string; // "familia de Mateo" | "toda la sala"
  texto: string;
  foto?: { etiqueta: string }; // placeholder, sin imagen
  reacciones: number;
  comentarios: number;
  propio: boolean; // controla el enlace "Editar"
}

export const SALA = { nombre: "Sala Soles", ninos: 12 };
export const DOCENTE = { nombre: "Caro Giménez", rol: "Maestra" };
export const PUBLICACIONES: Publicacion[]; // los 3 posts del mockup
```

Convenciones:

- Sin fechas reales: "martes 17 jun" y "PUBLICADO HOY" son literales, no hay nada que calcular.
- El avatar del post `anuncio` es un ícono de megáfono, no una inicial: `nino` es opcional y la tarjeta decide por `tipo`.
- Docente y sala son constantes porque no hay sesión.

## Implementation plan

1. `app/globals.css`: reemplazar `:root` / `@theme inline` de Geist por los tokens del mockup (fondo `#f6ecdf`, texto `#3f362e`, superficie `#fffdf9`, borde `#ece0d0`, acento `#d9583c`, etc.), registrar `--font-fredoka` / `--font-nunito` y borrar el bloque `prefers-color-scheme: dark`. Verificación: al recargar, el body ya sale beige.
2. `app/layout.tsx`: sustituir Geist/Geist_Mono por `Fredoka` y `Nunito` con `variable`, poner `lang="es"` y `metadata.title = "OpenDayCare · Sala Soles"`. Verificación: recargar y comprobar las dos familias.
3. `app/data/feed.ts`: los tipos, `SALA`, `DOCENTE` y `PUBLICACIONES` con los 3 posts del mockup. Verificación: `npx tsc --noEmit` limpio.
4. `app/components/barra-lateral.tsx`: el `<aside>` completo (logo, botón, nav, pie de perfil) replicando el inline-style del mockup, con "Feed" resaltado. Verificación: el componente se renderiza desarmado al importarlo en `app/page.tsx`.
5. `app/components/tarjeta-publicacion.tsx`: avatar según `tipo` (inicial para `logro`/`actividad`, megáfono para `anuncio`), chip de color por tipo, "Para: …", texto, placeholder de `foto` opcional y pie con reacciones / comentarios / "Editar".
6. `app/page.tsx`: borrar el ejemplo de create-next-app y montar el layout de dos columnas (`min-h-screen flex`), `<BarraLateral />` + `<main>` de 760px con cabecera, composer, separador y `PUBLICACIONES.map(...)`. Verificación: comparar contra `references/screenshots/feed.png`.
7. Revisar que cada `<a>` apunte a una ruta interna y que ninguno referencie un `.dc.html`.

## Acceptance criteria

- [ ] `npm run dev` sirve `/` sin errores en la terminal ni en la consola del navegador.
- [ ] El fondo es `#F6ECDF` y no cambia con el tema oscuro del sistema.
- [ ] Los títulos usan Fredoka y el resto del texto Nunito.
- [ ] A 1280x800, `/` se ve igual que `references/screenshots/feed.png`: mismo sidebar de 248px, misma columna de 760px, mismas 3 tarjetas en el mismo orden.
- [ ] El sidebar muestra logo, botón "Nueva publicación", 4 ítems de nav con "Feed" resaltado, y el pie "Caro Giménez / Maestra · Soles" con logout.
- [ ] La cabecera muestra "GUARDERÍA · SALA SOLES", "Buenas, Caro" y "12 niños · martes 17 jun".
- [ ] Se renderizan 3 publicaciones — logro (Mateo, 14:20, sin foto), actividad (Mateo, 09:40, con foto) y anuncio general (07:50) — cada una con su chip y su avatar.
- [ ] Los pies muestran reacciones 3 / 5 / 8, comentarios 1 / 2 / 0 y el enlace "Editar".
- [ ] Ningún botón ni chip cambia de estado al hacer clic.
- [ ] Ningún enlace apunta a un `.dc.html`; el nav apunta a `/ninos`, `/avisos`, `/mi-cuenta`, `/nueva-publicacion`.
- [ ] `npx tsc --noEmit` y `npx eslint app` terminan sin errores.
- [ ] `app/page.tsx` ya no contiene el código de ejemplo de create-next-app.

## Decisions

- **Sí:** datos mock tipados en `app/data/feed.ts`. Cambiar mock por API real después es sustituir un archivo. **No:** los datos dentro del JSX de `page.tsx`.
- **Sí:** tokens de color en `@theme` de Tailwind v4 + clases utilitarias. **No:** CSS con `@apply`, **No:** estilos inline literales.
- **Sí:** `next/font/google`. **No:** `<link>` a Google Fonts (petición por visita + FOUT).
- **Sí:** borrar el bloque `prefers-color-scheme: dark`. **No:** modo oscuro: contradice la referencia.
- **Sí:** `lang="es"` y `metadata.title` propio. **No:** dejar los valores por defecto del scaffold.
- **Sí:** archivos y componentes en español (`barra-lateral.tsx`, `tarjeta-publicacion.tsx`).
- **Sí:** el sidebar es un componente que renderiza `page.tsx`, no el layout. Se mueve al layout cuando existan `/ninos` y `/avisos`.
- **Sí:** enlaces a rutas futuras aunque hoy den 404, para preservar el destino de cada uno.
- **Sí:** exactamente 3 publicaciones, las del mockup. **No:** repetirlas para probar el scroll.
- **No:** responsive. La referencia no lo tiene; va en su propia spec.

## Risks

| Riesgo                                                           | Mitigación                                                                                                                         |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Fredoka/Nunito requieren red en el primer build                  | `next/font` cachea en `.next`; si falla, compila igual con fallback y el layout no se rompe.                                       |
| Los enlaces a rutas futuras dan 404                              | Estado intermedio explícito en "Out of scope"; cada spec de pantalla cierra el suyo.                                               |
| `line-height` y espaciados de Tailwind difieren del inline-style | Usar valores arbitratos exactos (`leading-[1.55]`, etc.) en vez de los defaults de la escala.                                      |
| El `main` del mockup scrollea solo (`100vh` + `overflow-y-auto`) | Se replica literal; en viewports muy bajos se acepta. El arreglo (scroll de página + aside `sticky`) es un one-liner en otra spec. |

## What is **not** in this spec

- Autenticación, login, sesión.
- Base de datos, API, Server Actions.
- Reacciones, composer, "Editar" con comportamiento.
- Las 15 pantallas restantes de `references/pantallas/`.
- Responsive / navegación móvil.
- Modo oscuro.
- Imágenes reales: el placeholder de foto sigue siendo punteado.

Cada una de esas, si aterriza, va en su propia spec.

##Reglas de codigo

- Usar codigo limpio, nombres, funciones,variables, etc. en ingles
