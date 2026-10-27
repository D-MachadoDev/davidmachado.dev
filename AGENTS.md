<!-- ============================================================
     PLANTILLA MAESTRA DE REGLAS — el unico sitio a editar.
     Proyecto nuevo: copia este archivo a su raiz como AGENTS.md
     o importalo con una linea:  @C:\Users\da-V7\.agents\AGENTS.md
     Si cambias una regla aqui, vuelve a copiarla a los proyectos
     existentes (no existe sincronizacion automatica).
     Origen: C:\Users\da-V7\OneDrive\Documentos\Default Project\AGENTS.md
     ============================================================ -->
# Default Project — contexto del entorno (multi-agente)

Archivo estándar leído por OpenCode, Codex, Gemini, Claude y demás. `CLAUDE.md` de esta carpeta solo hace `@AGENTS.md`, así que las reglas viven aquí una sola vez.

Las reglas globales (idioma, flujo, git) están en `~/.claude/CLAUDE.md` y `~/.codex/AGENTS.md`.

## 1. Idioma

- Conversación en **español**; código, nombres de archivo, commits y docs técnicas en **inglés**.
- Hablarle al humano en lenguaje que entienda: si aparece un término técnico, se explica en una frase. Cero jerga de relleno.
- Separar **evidencia** (comando ejecutado + su salida) de **inferencia** (suposición, marcada como tal).

## 2. Reglas del harness (no negociables)

1. Leer el contexto real del repo antes de opinar o editar; nunca asumir.
2. No inventar requisitos ni archivos: si algo no está claro, **preguntar antes de editar**.
3. Demostrar cada afirmación con su comando y su salida.
4. **Cero alucinaciones.** Lo que no se verificó no se afirma. Si un archivo, carpeta o skill no existe, decirlo en lugar de describirlo como si existiera.
5. Nada de secrets: `.env` está ignorado por git. Los secretos van en variables de entorno o secret manager.
6. **Sin tracking de tareas en el repo.** No hay boards, tickets ni SDD dentro del código. El tracking que haga falta (pendientes, estado, planes de sesión) se lleva **en Obsidian**, nunca en el repositorio.
7. Cada paso deja rastro verificable: comando, salida y commit. Nada queda "dicho" sin probarse.

## 3. Flujo completo

Cada fase declara las skills que la componen. Ninguna fase se salta salvo que se diga explícitamente.

### Fase 0 — Entender la idea · `brainstorming`
- Reformular lo pedido con las palabras del usuario, antes de tocar nada.
- Ambigüedad → **preguntar**, no rellenar con suposiciones.
- Idea con forma de feature o diseño → pasar por `grill-me`: una entrevista en rondas (design tree, frontier, recomendación por pregunta) que afila el plan antes de escribir una línea.
- **Intake → Obsidian**: las respuestas del intake se guardan en la nota del proyecto (se crea si no existe): solo respuestas reales del humano, `[PENDIENTE]` en lo no contestado, nunca re-preguntar lo ya respondido, cero contenido inventado.
- **Skills y herramientas autónomas**: si falta una skill o herramienta útil, el agente la busca (`npx skills find`) e instala por su cuenta solo si cumple el estándar de la Sección 9 (≥1K installs, fuente reconocida, audits Pass) y avisa de inmediato de qué instaló y por qué. Nunca secrets.

### Fase 1 — Elegir la tecnología y el porqué · `grill-me`
- Toda elección técnica se justifica con pros/contras reales, no con opinión: *¿por qué Postgres y no SQLite? ¿por qué Redis y no cachear en memoria? ¿por qué no esta librería?*
- La decisión queda escrita en un `.md` del repo, con la alternativa descartada y la razón.
- Si el usuario cuestiona una elección, se responde con evidencia y con la fecha del contexto (las cosas cambian).

### Fase 2 — Plan · `writing-plans`
- **El plan declara, paso a paso, qué skill se va a usar en cada uno.** Sin eso, el plan no sirve.
- Cada paso lleva: objetivo · skill · comando de verificación · criterio de "listo".
- Si el plan no cabe en una sesión, se parte en **entregables funcionales** desde aquí, no a mitad de ejecución.

### Fase 3 — Ejecución orquestada · `executing-plans`, `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees`
- **Un subagente especializado por fase; el orquestador coordina, no implementa.**
- Trabajo independiente en paralelo → `dispatching-parallel-agents`. Sesiones simultáneas → `using-git-worktrees` (ramas separadas).
- **Regla de no colisión:** dos agentes nunca tocan el mismo archivo o la misma rama a la vez. Un archivo, un dueño por tanda. Esto evita los *bugs invisibles* que aparecen cuando dos cambios se pisan.
- **Cuota de tokens:** revisar lo que queda antes de arrancar un bloque. Si no alcanza para **terminarlo**, no se empieza. Mejor entregar la parte anterior completa que dejar trabajo a medias.
- Cada tanda termina en un **entregable funcional completo**, con su verificación y su commit.

### Fase 4 — Código · `test-driven-development`
- Test primero, implementación mínima después.
- **Cero deuda técnica:** sin `TODO` pendientes, sin código muerto, sin "esto lo arreglo después".
- **Legibilidad a gran escala:** funciones cortas, nombres que expliquen solos, un archivo = una responsabilidad. El humano tiene que poder leer miles de líneas sin morir en el intento.

### Fase 5 — Revisión · `requesting-code-review`, `receiving-code-review`
- Auto-revisión obligatoria antes de marcar nada como listo: cobertura de tests y descripción del PR.
- Buscar **bugs invisibles**: un cambio que rompa otra parte, condiciones de carrera, errores que solo salen en producción, lógica duplicada.

### Fase 6 — Verificación · `verification-before-completion`
- Tests + build + lint, **con la salida a la vista**. Si falta alguna de las tres, decirlo y crearla: nunca fingir que se corrió.
- Lint/format: `biome check .` (JS/TS) · `ruff check .` (Python).

### Fase 7 — Seguridad y estrés · `accessibility`, `playwright-cli`
- Acceso: quién puede ver y modificar qué. Autorización probada en cada endpoint, no solo la autenticación.
- Ataques: inyección, XSS, path traversal, rate limit, secrets expuestos.
- Concurrencia: **saturar** el servicio y comprobar que aguanta y no corrompe datos.
- UI web: accesibilidad WCAG 2.2 y tests E2E en navegador.

### Fase 8 — Cierre de rama · `finishing-a-development-branch`, `resolving-merge-conflicts`
- Checklist: tests verdes → commit convencional → PR → review → merge.
- Conflictos → `resolving-merge-conflicts`. **Nunca** `--force` sobre trabajo ajeno.

## 4. Atajos

- Bug aislado → `systematic-debugging`
- UI → `impeccable`
- Diagramas → `archify`
- Antes de decir "listo" → Fase 6 completa
- Skill faltante → `find-skills`

## 5. Deploy

- Nada se despliega sin las Fases 6 y 7 en verde.
- Rollback probado **antes** de tocar producción.
- Config y secretos por variables de entorno; jamás dentro del código ni del repo.

## 6. Ritmo y cuota de tokens

- Se trabaja **por partes funcionales**: cada parte es un entregable completo y usable.
- Revisar la cuota antes de arrancar un bloque; si no alcanza, cerrar bien la parte actual (commit + verificación) en vez de empezar otra.
- No se deja trabajo a medias para el día siguiente.

## 7. Git y commits

- Conventional Commits: `type(scope): descripción en inglés en imperativo` → `feat(auth): add login rate limit`.
- Un commit = una idea. Nada de `wip`, `fix`, `fix fix`.
- Formato y lint antes de commitear: `biome check --write .`
- Código limpio al repo como en un proyecto serio: rama → PR → review → merge. Nada de empujar directo a `master`.
- `git-guardrails-claude-code` bloquea comandos destructivos (`push`, `reset --hard`, `clean`, `branch -D`).
- **Commits coherentes y justificados**: además de convencionales, el mensaje explica el porqué en una frase (qué problema resuelve o por qué importa), no solo el qué. Un commit, una idea.

## 8. Skills instaladas

33 distintas en `~/.claude/skills` (21) · `~/.agents/skills` (21) · `~/agent/skills` (12) · `~/.copilot/skills` y `~/.openclaw/skills` (8 cada uno, conjunto Cloudflare).

- **Flujo**: `brainstorming`, `writing-plans`, `executing-plans`, `grill-me`, `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees`, `finishing-a-development-branch`, `using-superpowers`, `writing-skills`
- **Calidad**: `test-driven-development`, `testing`, `systematic-debugging`, `verification-before-completion`, `requesting-code-review`, `receiving-code-review`, `resolving-merge-conflicts`
- **Seguridad y git**: `git-guardrails-claude-code`, `setup-pre-commit`
- **UI**: `impeccable`, `accessibility`
- **Cloudflare**: `cloudflare`, `wrangler`, `workers-best-practices`, `durable-objects`, `agents-sdk`, `cloudflare-email-service`, `turnstile-spin`, `web-perf`
- **Otros**: `archify` (diagramas), `find-skills`, `playwright-cli` (E2E en navegador)

## 9. Instalar skills que falten

Ante un dominio conocido, **instalar la skill antes que improvisar**:

```bash
npx skills add <owner/repo@skill> -g -y
```

Ranking en <https://skills.sh>: preferir más de 100K installs y fuentes reconocidas (`vercel-labs`, `anthropics`, `obra/superpowers`, `mattpocock/skills`). Revisar el ranking antes de recomendar cualquier cosa.

## 10. Herramientas del entorno

`git 2.54` · `gh 2.101` (instalado, **sin login** — el `GITHUB_TOKEN` del entorno es inválido) · `node 24 / npm 10.8 / pnpm 12.6` · `biome 2.5.14` · `ruff 0.16.9` · `uv 0.11` · `pip 25` · `docker 29.7`

## 11. Flujo operativo de proyecto

> Verificado el 2026-09-29 en esta máquina. Cada dato sale de un comando ejecutado aquí o de documentación oficial citada. Lo que es suposición va marcado como tal.

### 11.1 Qué es global y qué es por proyecto

| Pieza | Ubicación real | Copia por proyecto |
|---|---|---|
| Skills (proceso, 3JS, Taste, playwright) | `C:\Users\da-V7\.agents\skills` - 56 carpetas, 56 con `SKILL.md` | No |
| Skills para Antigravity | `C:\Users\da-V7\.gemini\config\skills` - 38 / 38 | No |
| Skills para Claude | `C:\Users\da-V7\.claude\skills` - 44 / 44 (12 son *junctions* hacia `.agents\skills`; 0 rotas) | No |
| Fuente original de las 12 de proceso | `C:\Users\da-V7\agent\skills` - 12 / 12 | No |
| Skills del workspace | `<proyecto>\.agents\skills` - 24 / 24 | **Sí** (van en git) |
| Plugins | `C:\Users\da-V7\.gemini\config\plugins` - caveman, chrome-devtools-plugin, i-have-adhd, ponytail, superpowers | No |
| Servidores MCP | `C:\Users\da-V7\.gemini\config\mcp_config.json` y `C:\Users\da-V7\.gemini\antigravity\mcp_config.json` - `chrome-devtools`, `obsidian` | No |
| Reglas del flujo (este archivo) | `C:\Users\da-V7\.agents\AGENTS.md` | **Sí** |
| Hook de gitleaks | `<proyecto>\.githooks\pre-commit` con `core.hooksPath` = `.githooks` | **Sí** |

Comprobación: recuento con `Get-ChildItem` por raíz, más `agy plugin list`, `agy mcp list`, `agy plugin validate`.

### 11.2 Quién lee qué (documentación oficial)

| Agente | Reglas globales | Reglas del proyecto | Regla de colisión |
|---|---|---|---|
| OpenCode | `~/.config/opencode/AGENTS.md` - **no existe hoy** | `AGENTS.md` en la raíz | concatena todas; **no** resuelve conflictos |
| Antigravity / Gemini | `~/.gemini/GEMINI.md` (990 B, solo RTK) | `AGENTS.md` | gana el más cercano al archivo editado |
| Codex / ChatGPT | `~/.codex/AGENTS.md` (1.355 B, `@RTK.md`) | `AGENTS.md` | importa `@archivo`, máximo 4 saltos, límite 32 KiB |
| Claude | `~/.claude/CLAUDE.md` (1.597 B, `@RTK.md`) | `CLAUDE.md` (no lee `AGENTS.md` por defecto) | gana el más cercano; `@` hasta 4 saltos |

Fuentes: `opencode.ai/docs/rules` · `antigravity.google/docs/skills` · `geminicli.com/docs/cli/gemini-md` · `agents.md`.

### 11.3 Proyecto desde cero

```powershell
mkdir C:\Users\da-V7\Documents\NombreDelProyecto
cd    C:\Users\da-V7\Documents\NombreDelProyecto
copy  C:\Users\da-V7\.agents\AGENTS.md AGENTS.md
git init
agy
```

Skills: **no se copian**. Plugins y MCP: **no se copian**. Solo viaja el `AGENTS.md`.

Las fases 0-8 de la sección 3 se activan solas. Para forzar una se usa `/` en el panel de prompt (documentación oficial de Antigravity: *"type / in the prompt panel"*; cada skill se convierte en slash command):

| Fase | Skill | Invocación manual |
|---|---|---|
| 0 | `brainstorming` | `/brainstorming` |
| 1 | `grill-me` | `/grill-me` |
| 2 | `writing-plans` | `/writing-plans` |
| 3 | `executing-plans`, `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees` | `/executing-plans` y demás |
| 4 | `test-driven-development` | `/test-driven-development` |
| 5 | `requesting-code-review`, `receiving-code-review` | `/requesting-code-review` |
| 6 | `verification-before-completion` | `/verification-before-completion` |
| 7 | `accessibility`, `playwright-cli` | `/accessibility`, `/playwright-cli` |
| 8 | `finishing-a-development-branch`, `resolving-merge-conflicts` | `/finishing-a-development-branch` |

### 11.4 Proyecto ya en proceso con reglas fijas

1. **Si tiene `AGENTS.md`**: se respeta tal cual. No se sobrescribe.
2. **Si no lo tiene**: `copy C:\Users\da-V7\.agents\AGENTS.md AGENTS.md`.
3. **Si tiene reglas propias y se quiere sumar este flujo**, añadir sin borrar nada:
   - Antigravity/Gemini y Codex: una línea `@C:\Users\da-V7\.agents\AGENTS.md`.
   - OpenCode: además una frase explícita, porque no importa `@` solo. Ejemplo: `Lee y aplica el archivo C:\Users\da-V7\.agents\AGENTS.md`. Fuente: *"You can teach opencode to read external files by providing explicit instructions in your AGENTS.md"*.
   - **Suposición marcada**: la ruta absoluta `@C:\...` en Windows no está comprobada en los cuatro agentes. Si alguno no la importa, se copia el archivo en vez de importarlo.
4. **Cambios de reglas**: se editan en `C:\Users\da-V7\.agents\AGENTS.md` y se vuelven a copiar a los proyectos existentes. No hay sincronización automática.
5. **Vault de Obsidian vacío o sin notas del proyecto**: el agente **no** crea nada por su cuenta al arrancar. Primero pasa por `grill-me` (Fases 0-1) con el humano: allí se define qué notas hacen falta y con qué contenido. Solo después de esa validación se crea la estructura estándar en el vault (`Projects/<Proyecto>/00-Brief.md`, `01-Stack.md`, `02-Plan.md`, `03-Estado.md`, `MAP.md`, `Decisiones.md`). La memoria vive en Obsidian: el repo **nunca** recibe `.md` sueltos (solo `README.md`, `docs/decisions.md` y `docs/STATUS.md` — este último es el snapshot de sesión: se lee al abrir cualquier sesión y se actualiza al cerrar). Specs, planes, notas de aprendizaje y todo documento que genere una skill (p. ej. `docs/superpowers/specs/`) van a la nota del proyecto en Obsidian: si una skill los escribe dentro del repo, se mueven al vault.

- **Sincronizacion verificada:** al comparar plantilla y copia hay que **normalizar los
  finales de linea** (CRLF -> LF). Verificado hoy: `core.autocrlf = true` en este repo,
  asi que la copia vive en CRLF en disco y la plantilla en LF; el contenido es identico
  (comprobado con la seccion 11 entera: `True` tras normalizar).

### 11.5 Comandos de sesión (`agy --help`, verificado)

```powershell
agy                       # sesión interactiva en la carpeta actual
agy --new-project         # crea proyecto nuevo y abre sesión
agy -p "un prompt"        # un turno no interactivo, imprime la respuesta
agy --mode plan           # solo planificar, no editar
agy --effort low|medium|high|max
agy plugin list           # plugins importados
agy plugin validate RUTA  # valida un plugin
agy mcp list              # servidores MCP
agy mcp add nombre comando arg...   # añadir MCP; los flags van antes del nombre
```

### 11.6 Verificación antes de decir listo (Fase 6)

```powershell
git status --porcelain   # vacío = nada sin commit
biome check .            # JS/TS
ruff check .             # Python
```

Herramientas comprobadas hoy en el PATH: `git`, `node`, `npx`, `biome`, `ruff`, `playwright-cli`, `agy`. **`gh` no está en el PATH** y `git remote -v` está vacío: el flujo *rama, PR, review, merge* queda **pendiente de remoto**, no incumplido.

### 11.7 Pendiente de comprobar (no verificado aún)

- `agy plugin list` registra 4 plugins (superpowers, i-have-adhd, caveman, ponytail) y **no** `chrome-devtools-plugin`, aunque está en `~/.gemini/config/plugins`. Confirmar en `Settings > Customizations`.
- Los MCP necesitan reiniciar la sesión de Antigravity para cargar - **suposición**.
- El vault de Obsidian (`C:\Users\da-V7\OneDrive\Documentos\Obsidian Vault`) existe pero tiene **0 notas `.md`**.

### 11.8 Relacion con `generic-sdd-agent` (dos modos, no una eleccion)

`C:\Users\da-V7\.agents\skills\generic-sdd-agent\SKILL.md` es la primera version del
flujo (VERIFICADO: 1.676 lineas, 138.445 bytes, v7.0.0, secciones 0-25). Hoy convive con
este archivo. Regla de uso:

| Modo | Cuando | Que se carga | Ritual |
|---|---|---|---|
| **A - flujo ligero** (por defecto) | ~90% del trabajo: features pequenas, bugs, UI, docs, HU | Este `AGENTS.md` + la skill de la fase | Fases 0-8, sin gates |
| **B - SDD completo** | Cambios grandes o peligrosos: brownfield, migraciones, refactor de datos, seguridad | `generic-sdd-agent` sola, diciendo "aplica el modo completo" | Fases 0-9 + gates + mapa de entidades |

- **Precedencia:** la propia skill lo dice en su seccion 0.2: el `AGENTS.md` del repo
  *manda sobre el catalogo generico de esta skill*. No hay conflicto: este archivo gana.
- **Nivel 0:** su seccion 24 manda no aplicar ritual a charla tecnica, typos o
  exploraciones rapidas. Coincide con la seccion 4 (Atajos) de este archivo.
- **Adoptado del Modo B:** etiquetas de evidencia `[CONFIRMADO]` / `[SUPUESTO]` /
  `[INFERIDO]` en specs y planes; checklist de 4 preguntas antes de tocar nada
  (¿de donde sale el valor? ¿que no voy a tocar? ¿como se que termine? ¿es reversible?);
  mapa de entidades / anti-amnesia; clasificacion de riesgo 1/2/3.
- **NO adoptado:** su plantilla de `AGENTS.md` (su seccion 22) ni `SDD/SDD.md` como
  memoria principal - la memoria vive en Obsidian (ver `WORKFLOW-EXAMPLES.md`, Caso F).
- **Analisis completo y 9 simulacros de uso:** `WORKFLOW-EXAMPLES.md` en la raiz del repo.

## 12. Imagen primero, aprendizaje continuo y cero vibecoding

1. **Imagen antes que código (UI)**: toda interfaz parte de una referencia visual. Si el humano manda una imagen, se usa como base; si no, se genera con `imagegen-frontend-web` o `image-to-code` y se valida con el humano **antes** de escribir la UI. Sin referencia aprobada, no se maqueta.
2. **Aprendizaje continuo (de simple a avanzado)**: adaptarse al nivel real del humano, pero **no estancarse con él**: llevarlo hacia adelante en cada sesión. Explicar cada concepto en dos niveles — lenguaje simple primero, técnico después — con gráficos o diagramas cuando ayuden (`archify`). Una pregunta en medio del proceso («¿qué es Redis?») se responde a fondo: objetivo de **cero deuda de conocimiento**. Cada proyecto, texto, idea y sesión es ocasión de mejorar: consejos de fondo técnico y humano (habilidades blandas, inteligencia emocional, perfil profesional senior).
3. **Cero vibecoding**: prohibido escribir código que el humano no pueda explicar después. Cada decisión viene con su porqué en su nivel; si algo no queda claro, se para y se enseña antes de continuar.
