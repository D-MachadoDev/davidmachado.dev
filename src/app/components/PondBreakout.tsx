import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { t, type Language } from "../i18n";

/**
 * Reef breaker — a small cabinet in the corner. The board is drawn at 192x120
 * and scaled by CSS, so every edge lands on the same pixel grid the ocean uses.
 */
const W = 192;
const H = 120;
const COLS = 24;
const ROWS = 11;
const CELL = 8;
const TOP = 14;
const PADDLE_W = 28;
const PADDLE_H = 3;
const PADDLE_Y = H - 10;
const BALL_R = 1.8;
const PADDLE_SPEED = 168;

type Mode = "ready" | "playing" | "won" | "lost";

interface Brick {
  x: number;
  y: number;
  hp: number;
}

const LEVELS: string[][] = [
  // a fish, tail first
  [
    "........................",
    "........................",
    "..........oooooooo......",
    "...oo.oooooooooooooo....",
    "..ooo.ooooooooooooooo...",
    "..ooo.ooooooooooooooo...",
    "...oo.oooooooooooooo....",
    "..........oooooooo......",
    "........................",
    "........................",
    "........................",
  ],
  // a shark, and it takes two hits to sink
  [
    "........................",
    "..............###.......",
    "............#####.......",
    "..........########......",
    "....##...###########....",
    "..#####.#############...",
    ".####################...",
    "..##################....",
    "....##############......",
    "..........#####.........",
    "........................",
  ],
  // the tide comes in flat and merciless
  [
    "...###....###....###....",
    "........................",
    ".###....###....###....##",
    "........................",
    "...###....###....###....",
    "........................",
    ".###....###....###....##",
    "........................",
    "...###....###....###....",
    "........................",
    ".###....###....###....##",
  ],
];

function buildBricks(stage: number): Brick[] {
  const pattern = LEVELS[stage % LEVELS.length];
  const bricks: Brick[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    const line = (pattern[row] ?? "").padEnd(COLS, ".").slice(0, COLS);
    for (let column = 0; column < COLS; column += 1) {
      const cell = line[column];
      if (cell === "." || cell === " ") continue;
      bricks.push({
        x: column * CELL,
        y: TOP + row * CELL,
        hp: cell === "#" ? 2 : 1,
      });
    }
  }
  return bricks;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function PondBreakout({ language }: { language: Language }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hud, setHud] = useState({ score: 0, lives: 3, stage: 0, mode: "ready" as Mode });
  const [visible, setVisible] = useState(false);

  const game = useRef({
    mode: "ready" as Mode,
    stage: 0,
    score: 0,
    lives: 3,
    paddleX: W / 2 - PADDLE_W / 2,
    ball: { x: W / 2, y: PADDLE_Y - BALL_R - 1, vx: 0, vy: 0 },
    bricks: buildBricks(0),
    speed: 66,
    trail: [] as { x: number; y: number }[],
    pressed: { left: false, right: false },
  });

  const publish = useCallback(() => {
    const g = game.current;
    setHud({ score: g.score, lives: g.lives, stage: g.stage, mode: g.mode });
  }, []);

  const ready = useCallback(
    (stage: number) => {
      const g = game.current;
      g.ball = { x: g.paddleX + PADDLE_W / 2, y: PADDLE_Y - BALL_R - 1, vx: 0, vy: 0 };
      g.bricks = buildBricks(stage);
      g.trail = [];
      g.speed = 66 + stage * 8;
      g.mode = "ready";
      publish();
    },
    [publish],
  );

  const launch = useCallback(() => {
    const g = game.current;
    if (g.mode !== "ready") return;
    const angle = (-Math.PI / 3) * (Math.random() > 0.5 ? 1 : -1) - Math.PI / 2;
    g.ball.vx = Math.cos(angle) * g.speed;
    g.ball.vy = Math.sin(angle) * g.speed;
    g.mode = "playing";
    publish();
  }, [publish]);

  const reset = useCallback(() => {
    const g = game.current;
    g.stage = 0;
    g.score = 0;
    g.lives = 3;
    g.paddleX = W / 2 - PADDLE_W / 2;
    ready(0);
  }, [ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.15 },
    );
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !visible) return;

    const style = getComputedStyle(document.documentElement);
    const ink = style.getPropertyValue("--foreground").trim() || "#EDEDED";
    const accent = style.getPropertyValue("--accent").trim() || "#3B82F6";

    let raf = 0;
    let last = 0;

    const draw = () => {
      const g = game.current;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += CELL * 2) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      for (const brick of g.bricks) {
        ctx.globalAlpha = brick.hp > 1 ? 0.95 : 0.65;
        ctx.fillStyle = accent;
        ctx.fillRect(brick.x + 1, brick.y + 1, CELL - 2, CELL - 3);
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = accent;
      for (let index = 0; index < g.trail.length; index += 1) {
        const point = g.trail[index];
        ctx.globalAlpha = 0.04 + (index / g.trail.length) * 0.18;
        ctx.fillRect(Math.round(point.x), Math.round(point.y), 2, 2);
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = ink;
      ctx.fillRect(Math.round(g.paddleX), PADDLE_Y, PADDLE_W, PADDLE_H);
      ctx.fillRect(
        Math.round(g.ball.x - BALL_R),
        Math.round(g.ball.y - BALL_R),
        BALL_R * 2,
        BALL_R * 2,
      );
    };

    const update = (dt: number) => {
      const g = game.current;

      if (g.mode !== "playing" && g.mode !== "ready") return;

      if (g.pressed.left) g.paddleX -= PADDLE_SPEED * dt;
      if (g.pressed.right) g.paddleX += PADDLE_SPEED * dt;
      g.paddleX = clamp(g.paddleX, 0, W - PADDLE_W);

      if (g.mode === "ready") {
        g.ball.x = g.paddleX + PADDLE_W / 2;
        g.ball.y = PADDLE_Y - BALL_R - 1;
        return;
      }

      const steps = Math.max(1, Math.ceil((g.speed * dt) / (BALL_R * 1.2)));
      const slice = dt / steps;

      for (let step = 0; step < steps; step += 1) {
        g.ball.x += g.ball.vx * slice;
        g.ball.y += g.ball.vy * slice;

        if (g.ball.x - BALL_R < 0) {
          g.ball.x = BALL_R;
          g.ball.vx = Math.abs(g.ball.vx);
        } else if (g.ball.x + BALL_R > W) {
          g.ball.x = W - BALL_R;
          g.ball.vx = -Math.abs(g.ball.vx);
        }
        if (g.ball.y - BALL_R < 0) {
          g.ball.y = BALL_R;
          g.ball.vy = Math.abs(g.ball.vy);
        }

        const paddleHit =
          g.ball.y + BALL_R >= PADDLE_Y &&
          g.ball.y - BALL_R <= PADDLE_Y + PADDLE_H &&
          g.ball.x >= g.paddleX - BALL_R &&
          g.ball.x <= g.paddleX + PADDLE_W + BALL_R &&
          g.ball.vy > 0;

        if (paddleHit) {
          const offset = (g.ball.x - (g.paddleX + PADDLE_W / 2)) / (PADDLE_W / 2);
          const angle = clamp(offset, -1, 1) * (Math.PI / 3);
          g.ball.y = PADDLE_Y - BALL_R;
          g.ball.vx = Math.sin(angle) * g.speed;
          g.ball.vy = -Math.cos(angle) * g.speed;
        }

        for (let index = 0; index < g.bricks.length; index += 1) {
          const brick = g.bricks[index];
          if (
            g.ball.x + BALL_R < brick.x ||
            g.ball.x - BALL_R > brick.x + CELL ||
            g.ball.y + BALL_R < brick.y ||
            g.ball.y - BALL_R > brick.y + CELL
          ) {
            continue;
          }

          const overlapX =
            Math.min(g.ball.x + BALL_R, brick.x + CELL) -
            Math.max(g.ball.x - BALL_R, brick.x);
          const overlapY =
            Math.min(g.ball.y + BALL_R, brick.y + CELL) -
            Math.max(g.ball.y - BALL_R, brick.y);

          if (overlapX < overlapY) g.ball.vx = -g.ball.vx;
          else g.ball.vy = -g.ball.vy;

          brick.hp -= 1;
          g.score += brick.hp > 0 ? 5 : 10;
          g.speed = Math.min(g.speed * 1.012, 132);
          const magnitude = Math.hypot(g.ball.vx, g.ball.vy) || 1;
          g.ball.vx = (g.ball.vx / magnitude) * g.speed;
          g.ball.vy = (g.ball.vy / magnitude) * g.speed;

          if (brick.hp <= 0) {
            g.bricks.splice(index, 1);
            index -= 1;
          }
          publish();
          break;
        }

        if (g.ball.y - BALL_R > H) break;
      }

      g.trail.push({ x: g.ball.x, y: g.ball.y });
      if (g.trail.length > 8) g.trail.shift();

      if (g.bricks.length === 0) {
        g.mode = "won";
        g.stage += 1;
        g.paddleX = W / 2 - PADDLE_W / 2;
        ready(g.stage);
        g.mode = "won";
        publish();
        return;
      }

      if (g.ball.y - BALL_R > H) {
        g.lives -= 1;
        g.paddleX = W / 2 - PADDLE_W / 2;
        if (g.lives <= 0) {
          g.mode = "lost";
          publish();
        } else {
          ready(g.stage);
        }
      }
    };

    const frame = (time: number) => {
      raf = requestAnimationFrame(frame);
      if (!last) {
        last = time;
        draw();
        return;
      }
      const dt = Math.min((time - last) / 1000, 1 / 30);
      last = time;
      update(dt);
      draw();
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [visible, ready, publish]);

  const act = useCallback(() => {
    const g = game.current;
    if (g.mode === "ready") launch();
    else if (g.mode === "won") {
      ready(g.stage);
      launch();
    } else if (g.mode === "lost") {
      reset();
      launch();
    }
  }, [launch, ready, reset]);

  // Anywhere on the page, an arrow or the space bar starts the game and hands
  // the keys to the board, so the first thing a visitor presses already plays.
  useEffect(() => {
    if (!visible) return;

    const onWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      const g = game.current;
      if (g.mode === "playing") return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName))
      ) {
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        g.pressed[event.key === "ArrowLeft" ? "left" : "right"] = true;
      } else if (event.key !== " " && event.key !== "Enter") {
        return;
      }

      canvasRef.current?.focus({ preventScroll: true });
      event.preventDefault();
      act();
    };

    window.addEventListener("keydown", onWindowKeyDown);
    return () => window.removeEventListener("keydown", onWindowKeyDown);
  }, [visible, act]);

  const movePaddle = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * W;
    game.current.paddleX = clamp(x - PADDLE_W / 2, 0, W - PADDLE_W);
  };

  // Keys only while the board has focus, so the page still scrolls everywhere
  // else.
  const onKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    const g = game.current;
    if (event.key === "ArrowLeft" || event.key === "a") {
      g.pressed.left = true;
      event.preventDefault();
    } else if (event.key === "ArrowRight" || event.key === "d") {
      g.pressed.right = true;
      event.preventDefault();
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      act();
    }
  };

  const onKeyUp = (event: KeyboardEvent<HTMLCanvasElement>) => {
    const g = game.current;
    if (event.key === "ArrowLeft" || event.key === "a") g.pressed.left = false;
    if (event.key === "ArrowRight" || event.key === "d") g.pressed.right = false;
  };

  const status = (() => {
    if (hud.mode === "won") return t(language, "game.win");
    if (hud.mode === "lost") return t(language, "game.lose");
    if (hud.mode === "ready") return t(language, "game.start");
    return `${t(language, "game.level")} ${hud.stage + 1}`;
  })();

  return (
    <div className="pond-breakout w-[248px] font-mono text-[10px] lowercase">
      <div className="flex items-baseline justify-between gap-3 border-b border-border/50 pb-1.5 text-muted">
        <span className="text-foreground">{t(language, "game.title")}</span>
        <span className="sr-only">{`${t(language, "game.score")}: ${hud.score}`}</span>
        <span aria-hidden="true" className="tabular-nums tracking-[0.2em]">
          {String(hud.score).padStart(3, "0")}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label={t(language, "game.a11y")}
        onPointerDown={act}
        onPointerMove={movePaddle}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        className="mt-2 w-full cursor-crosshair outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
      <div className="mt-1.5 flex items-baseline justify-between gap-3 text-muted">
        <span className={hud.mode === "won" ? "text-accent" : undefined}>{status}</span>
        <span aria-hidden="true" className="text-foreground/70">
          {Array.from({ length: hud.lives }, () => "·").join("")}
        </span>
      </div>
    </div>
  );
}
