import { projects, type Project } from "../data/projects";

const COLUMNS = 34;
const ROWS = 22;

const GLYPHS = ["·", "+", "×", "=", "#", "~"] as const;

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function buildCoverRows(seed: number): string[] {
  const rows: string[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    let line = "";
    for (let column = 0; column < COLUMNS; column += 1) {
      const x = column / (COLUMNS - 1);
      const y = row / (ROWS - 1);
      const wave =
        Math.sin(x * 7.4 + seed * 0.11) * Math.cos(y * 6.1 - seed * 0.07) +
        Math.sin((x + y) * 4.3 + seed * 0.05) * 0.6;
      if (wave > 0.92) line += GLYPHS[4];
      else if (wave > 0.5) line += GLYPHS[3];
      else if (wave > 0.12) line += GLYPHS[1];
      else if (wave > -0.24) line += GLYPHS[0];
      else if (wave > -0.5) line += GLYPHS[2];
      else line += " ";
    }
    rows.push(line.trimEnd());
  }
  return rows;
}

export function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const seed = hashString(project.id);
  const rows = buildCoverRows(seed);
  const index = projects.findIndex((entry) => entry.id === project.id) + 1;
  const gradientId = `cover-${project.id}`;

  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className ?? "h-full w-full"}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={project.accent} stopOpacity="0.22" />
          <stop offset="55%" stopColor={project.accent} stopOpacity="0.04" />
          <stop offset="100%" stopColor="#050505" stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill="#08080A" />
      <rect width="1200" height="800" fill={`url(#${gradientId})`} />

      {Array.from({ length: 9 }, (_, line) => (
        <line
          key={`v-${line}`}
          x1={150 + line * 120}
          y1="0"
          x2={150 + line * 120}
          y2="800"
          stroke="#FFFFFF"
          strokeOpacity="0.035"
        />
      ))}
      {Array.from({ length: 6 }, (_, line) => (
        <line
          key={`h-${line}`}
          x1="0"
          y1={100 + line * 120}
          x2="1200"
          y2={100 + line * 120}
          stroke="#FFFFFF"
          strokeOpacity="0.035"
        />
      ))}

      <text
        x="72"
        y="104"
        fill={project.accent}
        fillOpacity="0.55"
        fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="13"
        letterSpacing="4"
      >
        {project.category.toUpperCase()}
      </text>

      <g
        fill={project.accent}
        fillOpacity="0.7"
        fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="18"
        letterSpacing="8"
      >
        {rows.map((row, index) => (
          <text key={index} x="72" y={156 + index * 27} xmlSpace="preserve">
            {row}
          </text>
        ))}
      </g>

      <text
        x="1128"
        y="112"
        textAnchor="end"
        fill={project.accent}
        fillOpacity="0.14"
        fontFamily="Inter, ui-sans-serif, sans-serif"
        fontSize="168"
        fontWeight="600"
        letterSpacing="-8"
      >
        {String(index).padStart(2, "0")}
      </text>

      <line
        x1="72"
        y1="722"
        x2="1128"
        y2="722"
        stroke="#FFFFFF"
        strokeOpacity="0.1"
      />
      <circle cx="80" cy="748" r="4" fill={project.accent} />
      <text
        x="96"
        y="753"
        fill="#A1A1AA"
        fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="12"
        letterSpacing="3"
      >
        {project.id.replaceAll("-", " ").toUpperCase()}
      </text>
      <text
        x="1128"
        y="753"
        textAnchor="end"
        fill="#71717A"
        fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="12"
        letterSpacing="3"
      >
        {project.year}
      </text>
    </svg>
  );
}
