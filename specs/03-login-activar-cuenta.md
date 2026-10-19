# SPEC 03 — Login y activación de cuenta (/login y /activate-account)

> **Status:** Aprobado
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-10-19
> **Objective:** Replicar `references/pantallas/login.dc.html` (sin el bloque "INGRESO COMO") y `references/pantallas/activar-cuenta.dc.html` en `/login` y `/activate-account`, solo visuales y sin autenticación.

## Scope

**In:**

- `/login` según `login.dc.html`: panel izquierdo de marca (degradado durazno `#F6A98E→#EC7E62`, logo sol, headline "El día de cada niño, compartido con su familia.", pie "🌿 Guardería Sala Soles") + panel derecho con formulario EMAIL / CONTRASEÑA, link "¿Olvidaste tu contraseña?" y CTA "Iniciar sesión".
- Eliminación del bloque "INGRESO COMO": no existen los botones Personal/Familia ni la lógica de rol; el formulario es único (decisión del usuario).
- `/activate-account` según `activar-cuenta.dc.html`: tarjeta de invitación "Te invitaron a seguir a / Mateo · Sala Soles" con avatar "M", campos precargados como literales del mockup (código `7K4P9`, email `lucia.fernandez@gmail.com`, contraseña), checkbox de autorización de fotos (checked, verde) y CTA "Activar mi cuenta".
- Enlaces cruzados: "Activá tu cuenta" → `/activate-account`, "Iniciar sesión" → `/login`. "¿Olvidaste tu contraseña?" y los CTAs no navegan ni envían nada.
- Responsive: el panel de marca del login se oculta bajo `md` (768px) y el formulario pasa a ocupar la pantalla completa, consistente con el breakpoint único de SPEC 01/02.
- Tokens nuevos en `@theme` de `app/globals.css` para los colores del mockup que aún no existen (gradiente durazno `#F6A98E→#EC7E62`, CTA `#F4977E→#EE8164`, texto `#94887B`, borde `#EADFD0`, selected `#FBE3D8`/`#D9583C`, checkbox `#5FB97E`, bloque autorización `#FBF1D6`/`#8A7234`, avatar invitado `#A9D9E8`/`#1F7A93`).
- Iconos: reutilizar el `SunIcon` existente para ambos logos; añadir a `app/components/icons.tsx` solo lo que falte (check del checkbox de autorización). Los íconos de rol del mockup desaparecen con el bloque.

**Out of scope (for future specs):**

- Autenticación, sesión, cookies, middleware de protección de rutas.
- Base de datos, API, Server Actions, validación de formularios.
- El flujo Personal vs Familia (rol, destinos distintos): descartado por decisión del usuario; si el día de mañana existe login por roles, va en spec nueva.
- `/forgot-password` (recuperación de contraseña): no existe mockup; el link queda sin acción.
- Cuentas de prueba, invitations reales, generación de códigos.
- Pantallas restantes de `references/pantallas/` (avisos, mi cuenta, familia-\*, etc.).

## Data model

Esta feature no introduce estructuras de datos nuevas ni archivo de mock: ambas pantallas son estáticas y sus literales (nombres, emails, código) viven en el JSX de cada página. No se crea `app/data/auth.ts` porque no hay listas que derivar ni reutilizar entre pantallas.

## Implementation plan

1. `app/globals.css`: añadir a `@theme` los tokens de color nuevos listados en Scope. Verificación: el dev server recompila sin errores.
2. `app/login/page.tsx`: página standalone (sin `AppShell`) con el grid `md:grid-cols-[1.05fr_1fr]`; panel de marca oculto bajo `md` (`hidden md:flex`) y formulario con inputs `defaultValue` vacío, placeholder `••••••••`, link a `/activate-account` y CTA como `<button>` sin acción. Verificación: `/login` comparable con el mockup a 1280px, salvo el bloque de rol ausente.
3. `app/activate-account/page.tsx`: tarjeta centrada `max-w-[440px]` con invitación "Mateo · Sala Soles", inputs precargados (`7K4P9`, `lucia.fernandez@gmail.com`), checkbox verde checked y CTA sin acción, link "Iniciar sesión" → `/login`. Verificación: comparable con `activar-cuenta.dc.html`.
4. Ajustar `app/components/icons.tsx` solo si falta algún ícono (check del checkbox); reutilizar `SunIcon` para ambos logos. Verificación: `npx eslint app` limpio.
5. Revisar que ningún `<a>` apunte a `.dc.html` y pasar `npx tsc --noEmit` + `npx eslint app`.

## Acceptance criteria

- [ ] `/login` renderiza sin errores de consola y sin el bloque "INGRESO COMO": no hay botones "Personal" ni "Familia" ni la etiqueta de rol.
- [ ] `/login` a 1280x800 coincide con `login.dc.html` en layout, colores y copy (headline, "Guardería Sala Soles", "Iniciar sesión", "¿Te invitó la guardería? Activá tu cuenta").
- [ ] A 375x812 el panel de marca desaparece y el formulario ocupa todo el ancho.
- [ ] "Activá tu cuenta" navega a `/activate-account` y "Iniciar sesión" (pie de activación) navega a `/login`.
- [ ] `/activate-account` a 1280x800 coincide con `activar-cuenta.dc.html`: tarjeta "Mateo · Sala Soles", código `7K4P9`, email `lucia.fernandez@gmail.com`, checkbox verde marcado con el texto de autorización, CTA "Activar mi cuenta".
- [ ] Ningún submit envía datos: "Iniciar sesión" y "Activar mi cuenta" no navegan ni llaman a nada; "¿Olvidaste tu contraseña?" no tiene href a pantalla inexistente.
- [ ] Ambas páginas usan Fredoka (títulos) y Nunito (texto) vía las variables de SPEC 01, fondo `#FBF4EC`.
- [ ] `npx tsc --noEmit` y `npx eslint app` terminan sin errores.

## Decisions

- **Sí:** eliminar el bloque "INGRESO COMO" por completo (decisión explícita del usuario). **No:** dejar un botón único "Familia" preseleccionado: conserva una UI de roles que ya no existe.
- **Sí:** solo visual, sin submit ni validación, igual que SPEC 01/02. **No:** formulario funcional con credenciales mock: la autenticación merece su propia spec.
- **Sí:** rutas `/login` y `/activate-account` en inglés (convención de SPEC 02); `/activate` se descartó para no ambiguar con `/account` (Mi cuenta).
- **Sí:** campos de activación precargados con los literales del mockup, decisión del usuario. **No:** `searchParams` con el código de invitación: no hay backend que lo emita todavía.
- **Sí:** literales en el JSX sin `app/data/auth.ts`. No hay lista ni derivación; un archivo de datos sería ceremonia.
- **Sí:** el panel de marca se oculta bajo `md`, único breakpoint heredado de SPEC 01.
- **No:** `/forgot-password`. No existe mockup; inventar esa pantalla excedería la spec. El link queda sin acción.
- **No:** montar `AppShell` en estas páginas: el mockup es una pantalla completa sin sidebar, y SPEC 02 ya difiere el shell común.

## Risks

| Riesgo                                                      | Mitigación                                                                  |
| ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| Los CTAs sin acción pueden leerse como bugs al demo         | Marcado en Scope y Acceptance; la spec de autenticación les dará destino.   |
| El degradado de 3 stops del panel no mapea a un token único | Se define como gradiente arbitrario de Tailwind en la clase, no como token. |

## What is **not** in this spec

- Autenticación, sesión, roles Personal/Familia, validación de formularios.
- `/forgot-password`, base de datos, API, Server Actions.
- Invitation codes reales ni pantallas restantes de `references/pantallas/`.

Cada una de esas, si aterriza, va en su propia spec.
