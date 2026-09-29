/**
 * fp3d — motor ligero de tarjeta 3D para FaceR (sin dependencias).
 *
 * Escribe variables CSS vivas sobre el nodo raíz:
 *   --rx, --ry     rotación (deg) según puntero, giroscopio o teclado
 *   --mx, --my     posición del brillo especular (0–100%)
 *   --gi           intensidad del brillo (0–1)
 *   --lx, --ly     dirección de la sombra proyectada (px)
 *
 * La animación usa un lazo con inercia (lerp) para que el giro nunca
 * "salte": cada frame acerca el valor actual al valor objetivo.
 * Respeta prefers-reduced-motion (deja la tarjeta estática y plana).
 *
 * Uso:
 *   import { initFp3d } from "./fp3d.js";
 *   useEffect(() => initFp3d(ref.current).destroy, []);
 */

const EASE = 0.09; // factor de inercia: menor = más "pesado"/suave
const SETTLE_EPSILON = 0.01;

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function initFp3d(root, options = {}) {
  if (!root) return { destroy() {} };

  const {
    maxTilt = 10, // grados máximos de rotación
    glareMax = 0.55, // opacidad máxima del brillo especular
    gyro = true, // habilita giroscopio en dispositivos táctiles
  } = options;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    rx: 0,
    ry: 0,
    targetRx: 0,
    targetRy: 0,
    mx: 50,
    my: 50,
    targetMx: 50,
    targetMy: 50,
    gi: 0,
    targetGi: 0,
  };

  let rafId = null;
  let destroyed = false;

  root.classList.add("fp3d-ready");
  if (reduceMotion) root.classList.add("fp3d-static");

  function write() {
    root.style.setProperty("--rx", state.rx.toFixed(3) + "deg");
    root.style.setProperty("--ry", state.ry.toFixed(3) + "deg");
    root.style.setProperty("--mx", state.mx.toFixed(2) + "%");
    root.style.setProperty("--my", state.my.toFixed(2) + "%");
    root.style.setProperty("--gi", state.gi.toFixed(3));
    root.style.setProperty("--lx", (state.ry * 1.6).toFixed(2) + "px");
    root.style.setProperty("--ly", (state.rx * -1.6).toFixed(2) + "px");
  }

  function settled() {
    return (
      Math.abs(state.rx - state.targetRx) < SETTLE_EPSILON &&
      Math.abs(state.ry - state.targetRy) < SETTLE_EPSILON &&
      Math.abs(state.mx - state.targetMx) < SETTLE_EPSILON &&
      Math.abs(state.my - state.targetMy) < SETTLE_EPSILON &&
      Math.abs(state.gi - state.targetGi) < SETTLE_EPSILON
    );
  }

  function tick() {
    if (destroyed) return;
    state.rx = lerp(state.rx, state.targetRx, EASE);
    state.ry = lerp(state.ry, state.targetRy, EASE);
    state.mx = lerp(state.mx, state.targetMx, EASE * 1.4);
    state.my = lerp(state.my, state.targetMy, EASE * 1.4);
    state.gi = lerp(state.gi, state.targetGi, EASE * 1.4);
    write();
    if (!settled()) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  function wake() {
    if (rafId == null && !destroyed) rafId = requestAnimationFrame(tick);
  }

  function setFromNormalized(nx, ny) {
    state.targetRy = clamp(nx, -1, 1) * maxTilt;
    state.targetRx = clamp(ny, -1, 1) * -maxTilt;
    state.targetMx = (clamp(nx, -1, 1) * 0.5 + 0.5) * 100;
    state.targetMy = (clamp(ny, -1, 1) * 0.5 + 0.5) * 100;
    state.targetGi = glareMax;
    wake();
  }

  function reset() {
    state.targetRx = 0;
    state.targetRy = 0;
    state.targetMx = 50;
    state.targetMy = 50;
    state.targetGi = 0;
    wake();
  }

  // ---- Puntero (ratón / trackpad) ----
  function onPointerMove(e) {
    const rect = root.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setFromNormalized(nx, ny);
  }

  function onPointerLeave() {
    reset();
  }

  // ---- Teclado (foco accesible: flechas inclinan la tarjeta) ----
  function onKeyDown(e) {
    const step = 0.12;
    if (e.key === "ArrowLeft") setFromNormalized(-step * 4, state.targetRy === 0 ? 0 : state.targetMy / 50 - 1);
    if (e.key === "ArrowRight") setFromNormalized(step * 4, state.targetRy === 0 ? 0 : state.targetMy / 50 - 1);
    if (e.key === "Escape") reset();
  }

  // ---- Giroscopio (móvil) ----
  let gyroHandler = null;
  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;

  function bindGyro() {
    if (!gyro || reduceMotion || !isCoarse) return;
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;

    gyroHandler = (e) => {
      if (e.beta == null || e.gamma == null) return;
      const gx = clamp(e.gamma, -22, 22) / 22; // izquierda/derecha
      const gy = clamp(e.beta - 45, -22, 22) / 22; // 45° = sostenido "natural"
      setFromNormalized(gx, gy);
    };
    window.addEventListener("deviceorientation", gyroHandler, true);
  }

  // iOS 13+ exige permiso explícito tras un gesto del usuario.
  function requestMotionPermission() {
    const DOE = typeof window !== "undefined" ? window.DeviceOrientationEvent : null;
    if (DOE && typeof DOE.requestPermission === "function") {
      return DOE.requestPermission().then((res) => {
        if (res === "granted") bindGyro();
        return res;
      });
    }
    bindGyro();
    return Promise.resolve("granted");
  }

  if (!reduceMotion) {
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("keydown", onKeyDown);
    // Android no requiere permiso explícito.
    if (isCoarse && !(window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === "function")) {
      bindGyro();
    }
  }

  write();

  function destroy() {
    destroyed = true;
    if (rafId != null) cancelAnimationFrame(rafId);
    root.removeEventListener("pointermove", onPointerMove);
    root.removeEventListener("pointerleave", onPointerLeave);
    root.removeEventListener("keydown", onKeyDown);
    if (gyroHandler) window.removeEventListener("deviceorientation", gyroHandler, true);
  }

  return { destroy, requestMotionPermission, needsMotionPermission: () => isCoarse && !!(typeof window !== "undefined" && window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === "function") };
}

/**
 * drawFaceMesh — dibuja, en un <canvas>, una malla facial esquemática con
 * línea de escaneo biométrico en movimiento. Puramente decorativo.
 * Se detiene en un fotograma estático si prefers-reduced-motion.
 */
export function drawFaceMesh(canvas, options = {}) {
  if (!canvas || !canvas.getContext) return { destroy() {} };
  const ctx = canvas.getContext("2d");
  const { accent = "#33d1c9", line = "rgba(230,240,255,0.35)" } = options;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let raf = null;
  let destroyed = false;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Puntos aproximados de una malla facial (óvalo + ojos + nariz + boca),
  // en coordenadas normalizadas 0..1.
  const points = [
    [0.5, 0.06], [0.66, 0.1], [0.8, 0.22], [0.86, 0.4], [0.84, 0.6],
    [0.74, 0.8], [0.5, 0.92], [0.26, 0.8], [0.16, 0.6], [0.14, 0.4],
    [0.2, 0.22], [0.34, 0.1],
    [0.36, 0.42], [0.42, 0.38], [0.48, 0.42], [0.42, 0.46],
    [0.64, 0.42], [0.58, 0.38], [0.52, 0.42], [0.58, 0.46],
    [0.5, 0.5], [0.46, 0.6], [0.5, 0.64], [0.54, 0.6],
    [0.38, 0.72], [0.5, 0.76], [0.62, 0.72], [0.5, 0.7],
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,0],
    [12,13],[13,14],[14,15],[15,12],
    [16,17],[17,18],[18,19],[19,16],
    [20,21],[21,22],[22,23],[23,20],
    [24,25],[25,26],[26,27],[27,24],
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, rect.width * dpr);
    canvas.height = Math.max(1, rect.height * dpr);
  }

  function draw(t) {
    if (destroyed) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.lineWidth = Math.max(1, dpr * 0.8);
    ctx.strokeStyle = line;
    ctx.fillStyle = line;

    edges.forEach(([a, b]) => {
      const pa = points[a];
      const pb = points[b];
      ctx.beginPath();
      ctx.moveTo(pa[0] * w, pa[1] * h);
      ctx.lineTo(pb[0] * w, pb[1] * h);
      ctx.stroke();
    });

    points.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x * w, y * h, dpr * 1.4, 0, Math.PI * 2);
      ctx.fill();
    });

    // línea de escaneo biométrico
    const phase = reduceMotion ? 0.5 : (Math.sin(t / 1400) + 1) / 2;
    const sy = h * (0.08 + phase * 0.84);
    const grad = ctx.createLinearGradient(0, sy - h * 0.05, 0, sy + h * 0.05);
    grad.addColorStop(0, "transparent");
    grad.addColorStop(0.5, accent);
    grad.addColorStop(1, "transparent");
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = grad;
    ctx.fillRect(0, sy - h * 0.05, w, h * 0.1);
    ctx.globalAlpha = 1;

    if (!reduceMotion) raf = requestAnimationFrame(draw);
  }

  resize();
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(canvas);

  raf = requestAnimationFrame(draw);
  if (reduceMotion) draw(700); // un fotograma fijo, a mitad de recorrido

  function destroy() {
    destroyed = true;
    if (raf != null) cancelAnimationFrame(raf);
    if (ro) ro.disconnect();
  }

  return { destroy };
}
