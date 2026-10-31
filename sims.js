// Interactive simulations. Each sim is function(el) -> stop()
const W = 760;
const C = { bg: '#0c111d', fg: '#e6e9f2', mut: '#8a93ab', acc: '#ffb454', cy: '#5ad1e6', red: '#ff6b6b', grn: '#7bd88f', vio: '#b69cff', grid: '#1c2438' };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

export const plain = x => { const a = Math.abs(x); if (a >= 1e5 || a < 1e-2) { const e = Math.floor(Math.log10(a)); return (x / Math.pow(10, e)).toFixed(2) + '×10^' + e; } return Number(x.toPrecision(3)).toString(); };
export function sci(x, d = 3) {
  if (!isFinite(x)) return '∞';
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 1e5 || a < 1e-2) {
    const e = Math.floor(Math.log10(a));
    const m = x / Math.pow(10, e);
    return `${m.toFixed(d - 1)}×10<sup>${e}</sup>`;
  }
  return Number(x.toPrecision(d)).toString();
}

function arrow(ctx, x1, y1, x2, y2, color = C.acc, w = 2.5) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (L < 2) return;
  const ux = dx / L, uy = dy / L, hs = Math.min(10, L * 0.5);
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * hs * 0.6, y2 - uy * hs * 0.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - ux * hs - uy * hs * 0.5, y2 - uy * hs + ux * hs * 0.5);
  ctx.lineTo(x2 - ux * hs + uy * hs * 0.5, y2 - uy * hs - ux * hs * 0.5);
  ctx.closePath(); ctx.fill();
}
function txt(ctx, s, x, y, color = C.fg, size = 13, align = 'left') {
  ctx.fillStyle = color; ctx.font = `${size}px system-ui, sans-serif`; ctx.textAlign = align; ctx.fillText(s, x, y);
}
function circle(ctx, x, y, r, fill, stroke) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}

function mk(el, cfg) {
  el.innerHTML = '';
  const H = cfg.h || 380;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H; cv.className = 'simcanvas';
  const ctl = document.createElement('div'); ctl.className = 'controls';
  const ro = document.createElement('div'); ro.className = 'readout';
  el.append(cv, ctl, ro);
  const ctx = cv.getContext('2d');
  const vals = {}, st = {};
  const touch = () => { cfg.onChange && cfg.onChange(vals, st); };
  cfg.controls.forEach(c => {
    if (c.type === 'button') {
      const b = document.createElement('button'); b.textContent = c.label;
      b.onclick = () => c.onClick(vals, st); ctl.append(b); return;
    }
    const w = document.createElement('label'); w.className = 'ctl';
    if (c.type === 'select') {
      vals[c.id] = c.options[0].v;
      w.innerHTML = `<div class="row"><span>${c.label}</span></div>`;
      const s = document.createElement('select');
      c.options.forEach((o, i) => { const op = document.createElement('option'); op.value = i; op.textContent = o.l; s.append(op); });
      s.onchange = () => { vals[c.id] = c.options[+s.value].v; touch(); };
      w.append(s);
    } else {
      vals[c.id] = c.val;
      const dec = (String(c.step).split('.')[1] || '').length;
      w.innerHTML = `<div class="row"><span>${c.label}</span><b></b></div>`;
      const b = w.querySelector('b'), inp = document.createElement('input');
      inp.type = 'range'; inp.min = c.min; inp.max = c.max; inp.step = c.step; inp.value = c.val;
      const show = () => { b.textContent = (+inp.value).toFixed(dec) + (c.unit ? ' ' + c.unit : ''); };
      inp.oninput = () => { vals[c.id] = +inp.value; show(); touch(); };
      show(); w.append(inp);
    }
    ctl.append(w);
  });
  cfg.init && cfg.init(vals, st);
  let raf, last = performance.now(), t = 0, stop = false;
  function loop(now) {
    if (stop) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    cfg.frame(ctx, W, H, vals, t, dt, st);
    const r = cfg.readout(vals, st);
    if (r !== ro._l) { ro.innerHTML = r; ro._l = r; }
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return () => { stop = true; cancelAnimationFrame(raf); };
}
const R = (label, v) => `<span>${label}: <b>${v}</b></span>`;

/* ---------------- 1. PROJECTILE ---------------- */
function projectile(el) {
  const calc = v => {
    const th = v.ang * Math.PI / 180, vx = v.u * Math.cos(th), vy = v.u * Math.sin(th);
    const T = (vy + Math.sqrt(vy * vy + 2 * v.g * v.h0)) / v.g;
    return { vx, vy, T, Rg: vx * T, Hm: v.h0 + vy * vy / (2 * v.g) };
  };
  return mk(el, {
    controls: [
      { id: 'u', label: 'Launch speed u', min: 5, max: 50, step: 1, val: 25, unit: 'm/s' },
      { id: 'ang', label: 'Launch angle θ', min: 0, max: 90, step: 1, val: 45, unit: '°' },
      { id: 'h0', label: 'Launch height', min: 0, max: 40, step: 1, val: 0, unit: 'm' },
      { id: 'g', label: 'Gravity g (Moon 1.6 · Earth 9.8 · Jupiter 24.8)', min: 1.6, max: 24.8, step: 0.1, val: 9.8, unit: 'm/s²' },
    ],
    frame(ctx, w, h, v, t) {
      const c = calc(v), gy = h - 40, x0 = 50;
      const sc = Math.min((w - 90) / Math.max(c.Rg, 1), (gy - 40) / Math.max(c.Hm, 1));
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (let x = x0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, gy); ctx.stroke(); }
      for (let y = gy; y > 20; y -= 40) { ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(w - 10, y); ctx.stroke(); }
      ctx.fillStyle = '#1d3a2a'; ctx.fillRect(0, gy, w, 40);
      ctx.strokeStyle = C.mut; ctx.setLineDash([4, 5]); ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const tt = c.T * i / 120, x = c.vx * tt, y = v.h0 + c.vy * tt - 0.5 * v.g * tt * tt;
        const px = x0 + x * sc, py = gy - y * sc;
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.stroke(); ctx.setLineDash([]);
      const k = Math.max(1, c.T / 5), tau = (t * k) % (c.T + 0.8), tt = Math.min(tau, c.T);
      const x = c.vx * tt, y = v.h0 + c.vy * tt - 0.5 * v.g * tt * tt, vyn = c.vy - v.g * tt;
      const px = x0 + x * sc, py = gy - y * sc;
      // apex marker
      const ta = c.vy / v.g;
      if (ta > 0) { circle(ctx, x0 + c.vx * ta * sc, gy - c.Hm * sc, 3, C.vio); txt(ctx, 'max height', x0 + c.vx * ta * sc + 6, gy - c.Hm * sc - 6, C.vio, 12); }
      circle(ctx, px, py, 8, C.acc);
      arrow(ctx, px, py, px + c.vx * 3, py, C.cy);
      arrow(ctx, px, py, px, py - vyn * 3, C.grn);
      arrow(ctx, px, py, px + c.vx * 3, py - vyn * 3, C.fg, 1.5);
      arrow(ctx, px + 14, py, px + 14, py + v.g * 2.2, C.red, 2);
      txt(ctx, 'vₓ (constant)', 20, 30, C.cy); txt(ctx, 'vᵧ (changes)', 20, 48, C.grn); txt(ctx, 'v (resultant)', 20, 66, C.fg); txt(ctx, 'g (always ↓)', 20, 84, C.red);
      txt(ctx, `t = ${tt.toFixed(2)} s`, w - 20, 30, C.fg, 14, 'right');
      txt(ctx, `vᵧ = ${vyn.toFixed(1)} m/s`, w - 20, 50, C.grn, 14, 'right');
    },
    readout(v) {
      const c = calc(v);
      return R('Range', sci(c.Rg) + ' m') + R('Max height', sci(c.Hm) + ' m') + R('Time of flight', sci(c.T) + ' s') + R('vₓ', sci(c.vx) + ' m/s') + R('u<sub>y</sub>', sci(c.vy) + ' m/s') + R('Impact speed', sci(Math.hypot(c.vx, c.vy - v.g * c.T)) + ' m/s');
    }
  });
}

/* ---------------- 2. CIRCULAR ---------------- */
function circular(el) {
  return mk(el, {
    controls: [
      { id: 'm', label: 'Mass m', min: 1, max: 1500, step: 1, val: 1000, unit: 'kg' },
      { id: 'v', label: 'Speed v', min: 1, max: 40, step: 0.5, val: 15, unit: 'm/s' },
      { id: 'r', label: 'Radius r', min: 5, max: 100, step: 1, val: 50, unit: 'm' },
      { type: 'button', label: 'Release / Reset', onClick: (v, st) => { st.rel = st.rel ? null : 'go'; } },
    ],
    frame(ctx, w, h, v, t, dt, st) {
      const cx = 280, cy = 190, Rp = 130, om = clamp(v.v / v.r, 0.3, 5);
      st.ang = (st.ang || 0) + om * dt;
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1; circle(ctx, cx, cy, Rp, null, '#2b3556');
      circle(ctx, cx, cy, 4, C.mut);
      const a = v.v * v.v / v.r;
      if (st.rel === 'go') {
        if (!st.fly) { st.fly = { x: cx + Rp * Math.cos(st.ang), y: cy + Rp * Math.sin(st.ang), vx: -Math.sin(st.ang) * 150, vy: Math.cos(st.ang) * 150 }; }
        st.fly.x += st.fly.vx * dt; st.fly.y += st.fly.vy * dt;
        if (st.fly.x < -20 || st.fly.x > w + 20 || st.fly.y < -20 || st.fly.y > h + 20) st.fly = null;
        if (st.fly) { circle(ctx, st.fly.x, st.fly.y, 11, C.acc); arrow(ctx, st.fly.x, st.fly.y, st.fly.x + st.fly.vx * .35, st.fly.y + st.fly.vy * .35, C.cy); }
        txt(ctx, 'No net force → straight line (Newton\'s 1st law)', cx, 28, C.grn, 14, 'center');
      } else {
        st.fly = null;
        const bx = cx + Rp * Math.cos(st.ang), by = cy + Rp * Math.sin(st.ang);
        ctx.strokeStyle = C.mut; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
        circle(ctx, bx, by, 11, C.acc);
        const tx = -Math.sin(st.ang), ty = Math.cos(st.ang), vl = 20 + v.v * 2.2, al = clamp(18 + a * 6, 18, 100);
        arrow(ctx, bx, by, bx + tx * vl, by + ty * vl, C.cy);
        arrow(ctx, bx, by, bx - Math.cos(st.ang) * al, by - Math.sin(st.ang) * al, C.red);
      }
      txt(ctx, 'velocity v (tangent)', 520, 120, C.cy, 14); txt(ctx, 'acceleration a & net force (toward centre)', 520, 146, C.red, 14);
      txt(ctx, 'Speed is constant,', 520, 190, C.fg, 14); txt(ctx, 'but velocity changes direction', 520, 210, C.fg, 14); txt(ctx, 'so the object accelerates.', 520, 230, C.fg, 14);
      txt(ctx, 'Press "Release" to cut the string', 520, 275, C.mut, 13);
    },
    readout(v) {
      const a = v.v * v.v / v.r;
      return R('a = v²/r', sci(a) + ' m/s²') + R('F<sub>net</sub> = ma', sci(a * v.m) + ' N') + R('T = 2πr/v', sci(2 * Math.PI * v.r / v.v) + ' s') + R('ω = v/r', sci(v.v / v.r) + ' rad/s') + R('a in g', sci(a / 9.8) + ' g');
    }
  });
}

/* ---------------- 3. ORBITS ---------------- */
function orbit(el) {
  const G = 6.67e-11;
  return mk(el, {
    controls: [
      { id: 'M', label: 'Central mass M (Earth = 5.97)', min: 0.3, max: 20, step: 0.01, val: 5.97, unit: '×10²⁴ kg' },
      { id: 'r', label: 'Orbital radius r (from centre!)', min: 6.8, max: 60, step: 0.1, val: 6.8, unit: '×10⁶ m' },
    ],
    frame(ctx, w, h, v, t, dt, st) {
      const M = v.M * 1e24, r = v.r * 1e6, vel = Math.sqrt(G * M / r), T = 2 * Math.PI * r / vel;
      const cx = 280, cy = 190, rp = 62 + (v.r - 6.8) / (60 - 6.8) * 120;
      const om = clamp(2 * Math.PI / (T / 3600) * 0.6, 0.12, 4);
      st.ang = (st.ang || 0) + om * dt; st.trail = st.trail || [];
      const sx = cx + rp * Math.cos(st.ang), sy = cy + rp * Math.sin(st.ang);
      st.trail.push([sx, sy]); if (st.trail.length > 80) st.trail.shift();
      circle(ctx, cx, cy, rp, null, '#2b3556');
      st.trail.forEach((p, i) => { ctx.fillStyle = `rgba(90,209,230,${i / 120})`; ctx.fillRect(p[0] - 1.5, p[1] - 1.5, 3, 3); });
      circle(ctx, cx, cy, 30 + Math.min(12, v.M * 0.6), '#2f6fb5', '#5aa4ea');
      circle(ctx, sx, sy, 7, C.acc);
      arrow(ctx, sx, sy, sx - Math.cos(st.ang) * 45, sy - Math.sin(st.ang) * 45, C.red);
      arrow(ctx, sx, sy, sx - Math.sin(st.ang) * 45, sy + Math.cos(st.ang) * 45, C.cy);
      txt(ctx, 'F = g·m (gravity = centripetal force)', 510, 100, C.red, 14); txt(ctx, 'v (tangent)', 510, 124, C.cy, 14);
      txt(ctx, 'Satellite mass cancels out:', 510, 170, C.fg, 14); txt(ctx, 'GMm/r² = mv²/r', 510, 192, C.acc, 15);
      txt(ctx, '⇒ v = √(GM/r)', 510, 214, C.acc, 15);
      txt(ctx, 'Not to scale; speed of animation', 510, 270, C.mut, 12); txt(ctx, 'is for illustration only.', 510, 286, C.mut, 12);
    },
    readout(v) {
      const M = v.M * 1e24, r = v.r * 1e6, vel = Math.sqrt(G * M / r), T = 2 * Math.PI * r / vel;
      return R('g at r = GM/r²', sci(G * M / (r * r)) + ' N/kg') + R('Orbital speed', sci(vel) + ' m/s') + R('Period', sci(T) + ' s (' + sci(T / 3600) + ' h)') + R('T²/r³', sci(T * T / (r * r * r)) + ' s²/m³') + R('4π²/GM', sci(4 * Math.PI * Math.PI / (G * M)));
    }
  });
}

/* ---------------- 4. ELECTRIC FIELD ---------------- */
function efield(el) {
  const k = 8.99e9;
  return mk(el, {
    h: 400,
    controls: [
      { id: 'q1', label: 'Left charge q₁', min: -5, max: 5, step: 0.5, val: 3, unit: 'μC' },
      { id: 'q2', label: 'Right charge q₂', min: -5, max: 5, step: 0.5, val: -3, unit: 'μC' },
      { id: 'd', label: 'Separation d', min: 0.2, max: 1.0, step: 0.05, val: 0.6, unit: 'm' },
    ],
    frame(ctx, w, h, v) {
      const ppm = 600, cy = h / 2, x1 = w / 2 - v.d * ppm / 2, x2 = w / 2 + v.d * ppm / 2;
      const q1 = v.q1 * 1e-6, q2 = v.q2 * 1e-6;
      for (let gx = 22; gx < w; gx += 38) for (let gy = 22; gy < h; gy += 38) {
        let Ex = 0, Ey = 0, ok = true;
        [[x1, q1], [x2, q2]].forEach(([qx, q]) => {
          const dx = (gx - qx) / ppm, dy = (gy - cy) / ppm, r2 = dx * dx + dy * dy, r = Math.sqrt(r2);
          if (r * ppm < 18) ok = false;
          const E = k * q / r2; Ex += E * dx / r; Ey += E * dy / r;
        });
        if (!ok) continue;
        const m = Math.hypot(Ex, Ey); if (m < 1) continue;
        const s = clamp((Math.log10(m) - 4) / 3, 0, 1), len = 8 + 22 * s, ux = Ex / m, uy = Ey / m;
        arrow(ctx, gx - ux * len / 2, gy - uy * len / 2, gx + ux * len / 2, gy + uy * len / 2, `rgba(255,180,84,${0.25 + 0.75 * s})`, 1.8);
      }
      [[x1, v.q1], [x2, v.q2]].forEach(([qx, q]) => {
        circle(ctx, qx, cy, 15, q > 0 ? '#c0392b' : q < 0 ? '#2c6fbb' : '#555', '#fff');
        txt(ctx, q > 0 ? '+' : q < 0 ? '−' : '0', qx, cy + 6, '#fff', 20, 'center');
        txt(ctx, `${q} μC`, qx, cy + 34, C.fg, 12, 'center');
      });
      txt(ctx, 'Arrows show the direction of force on a +ve test charge (longer/brighter = stronger field)', 12, h - 10, C.mut, 12);
    },
    readout(v) {
      const q1 = v.q1 * 1e-6, q2 = v.q2 * 1e-6, F = k * Math.abs(q1 * q2) / (v.d * v.d), Em = k * (q1 - q2) / Math.pow(v.d / 2, 2);
      const kind = q1 * q2 > 0 ? 'repulsion' : q1 * q2 < 0 ? 'attraction' : 'none';
      return R('Coulomb force F', sci(F) + ' N (' + kind + ')') + R('E at midpoint', sci(Math.abs(Em)) + ' N/C ' + (Em === 0 ? '' : Em > 0 ? '→ (towards q₂)' : '← (towards q₁)')) + R('E from q₁ alone at 0.5 m', sci(k * Math.abs(q1) / 0.25) + ' N/C');
    }
  });
}

/* ---------------- 5. MAGNETIC ---------------- */
function magnetic(el) {
  const P = {
    e: { n: 'Electron', m: 9.11e-31, q: -1.6e-19 },
    p: { n: 'Proton', m: 1.673e-27, q: 1.6e-19 },
    a: { n: 'Alpha particle', m: 6.64e-27, q: 3.2e-19 },
  };
  return mk(el, {
    controls: [
      { id: 'p', type: 'select', label: 'Particle', options: [{ v: 'e', l: 'Electron (−)' }, { v: 'p', l: 'Proton (+)' }, { v: 'a', l: 'Alpha particle (2+)' }] },
      { id: 'dir', type: 'select', label: 'Magnetic field direction', options: [{ v: 1, l: 'Into the page (×)' }, { v: -1, l: 'Out of the page (•)' }] },
      { id: 'v', label: 'Speed v', min: 0.5, max: 10, step: 0.1, val: 2, unit: '×10⁶ m/s' },
      { id: 'B', label: 'Field strength B', min: 1, max: 100, step: 1, val: 10, unit: 'mT' },
    ],
    onChange(v, st) { st.reset = true; },
    frame(ctx, w, h, v, t, dt, st) {
      const p = P[v.p], vel = v.v * 1e6, B = v.B * 1e-3, r = p.m * vel / (Math.abs(p.q) * B), T = 2 * Math.PI * p.m / (Math.abs(p.q) * B);
      const Rp = clamp(70 + 30 * Math.log10(r / 1e-3), 14, 150);
      const s = Math.sign(p.q) * v.dir; // +1: curve up
      const ex = 170, ey = h / 2;
      if (st.reset || st.t0 === undefined) { st.t0 = t; st.reset = false; st.trail = []; }
      ctx.fillStyle = '#121a30'; ctx.fillRect(ex, 0, w - ex, h);
      ctx.strokeStyle = C.grid; ctx.strokeRect(ex, 0, w - ex, h);
      ctx.fillStyle = C.mut; ctx.font = '16px sans-serif'; ctx.textAlign = 'center';
      for (let x = ex + 30; x < w; x += 46) for (let y = 24; y < h; y += 46) ctx.fillText(v.dir === 1 ? '×' : '•', x, y + 5);
      txt(ctx, 'B = ' + v.B + ' mT ' + (v.dir === 1 ? '(into page)' : '(out of page)'), w - 12, 20, C.mut, 13, 'right');
      txt(ctx, 'field-free', 20, 30, C.mut, 13);
      const om = clamp(3 * (2 * Math.PI * 9.11e-31 / (1.6e-19 * B)) / T, 0.3, 3);
      const tt = t - st.t0, lead = 0.9;
      let px, py;
      if (tt < lead) { px = 20 + (ex - 20) * tt / lead; py = ey; }
      else { const phi = om * (tt - lead); px = ex + Rp * Math.sin(phi); py = ey - s * Rp + s * Rp * Math.cos(phi); }
      st.trail.push([px, py]); if (st.trail.length > 400) st.trail.shift();
      ctx.strokeStyle = 'rgba(90,209,230,.7)'; ctx.lineWidth = 2; ctx.beginPath();
      st.trail.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
      circle(ctx, px, py, 8, p.q > 0 ? '#e0584a' : '#4a8fe0', '#fff');
      txt(ctx, p.q > 0 ? '+' : '−', px, py + 4, '#fff', 12, 'center');
      // force arrow
      if (tt >= lead) {
        const phi = om * (tt - lead), cxx = ex, cyy = ey - s * Rp;
        const c0x = cxx, c0y = cyy; // centre
        const dx = c0x - px, dy = c0y - py, L = Math.hypot(dx, dy) || 1;
        arrow(ctx, px, py, px + dx / L * 40, py + dy / L * 40, C.red);
        txt(ctx, 'F = qvB (toward centre)', 20, h - 36, C.red, 13);
      }
      txt(ctx, 'Drawing is scaled for clarity (radius shown on log scale)', 20, h - 14, C.mut, 12);
    },
    readout(v) {
      const p = P[v.p], vel = v.v * 1e6, B = v.B * 1e-3, F = Math.abs(p.q) * vel * B, r = p.m * vel / (Math.abs(p.q) * B), T = 2 * Math.PI * p.m / (Math.abs(p.q) * B);
      return R('Force F = qvB', sci(F) + ' N') + R('Radius r = mv/qB', sci(r) + ' m') + R('Period T = 2πm/qB', sci(T) + ' s') + R('Work done by B', '0 J (F ⟂ v)');
    }
  });
}

/* ---------------- 6. INDUCTION ---------------- */
function induction(el) {
  return mk(el, {
    controls: [
      { id: 'N', label: 'Number of turns N', min: 1, max: 200, step: 1, val: 50 },
      { id: 'B', label: 'Magnetic field B', min: 10, max: 500, step: 10, val: 100, unit: 'mT' },
      { id: 'A', label: 'Coil area A', min: 10, max: 500, step: 10, val: 100, unit: 'cm²' },
      { id: 'f', label: 'Frequency of rotation f', min: 1, max: 100, step: 1, val: 50, unit: 'Hz' },
    ],
    frame(ctx, w, h, v, t) {
      const per = 2, th = (t % per) / per * 2 * Math.PI;
      const cx = 150, cy = 150;
      for (let i = -2; i <= 2; i++) { arrow(ctx, 20, cy + i * 45, 280, cy + i * 45, '#33406a', 1.5); }
      txt(ctx, 'B →', 20, 40, C.vio, 14);
      const nx = Math.cos(th), ny = Math.sin(th);
      ctx.strokeStyle = C.acc; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(cx - ny * 60, cy + nx * 60); ctx.lineTo(cx + ny * 60, cy - nx * 60); ctx.stroke(); ctx.lineCap = 'butt';
      arrow(ctx, cx, cy, cx + nx * 50, cy + ny * 50, C.cy);
      txt(ctx, 'normal to coil', cx + nx * 55, cy + ny * 55 + 4, C.cy, 12, nx < 0 ? 'right' : 'left');
      txt(ctx, `θ = ${(th * 180 / Math.PI).toFixed(0)}°`, cx, 290, C.fg, 15, 'center');
      txt(ctx, '(top view of rotating coil)', cx, 312, C.mut, 12, 'center');
      const Bt = v.B * 1e-3, At = v.A * 1e-4, om = 2 * Math.PI * v.f, Phi0 = Bt * At, E0 = v.N * Phi0 * om;
      const px0 = 330, pw = 400;
      const plot = (y0, hh, fn, col, lab, unit) => {
        ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.strokeRect(px0, y0, pw, hh);
        ctx.strokeStyle = C.mut; ctx.beginPath(); ctx.moveTo(px0, y0 + hh / 2); ctx.lineTo(px0 + pw, y0 + hh / 2); ctx.stroke();
        ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath();
        for (let i = 0; i <= 200; i++) { const a = i / 200 * 4 * Math.PI, y = fn(a); i ? ctx.lineTo(px0 + i / 200 * pw, y0 + hh / 2 - y * hh / 2 * 0.9) : ctx.moveTo(px0, y0 + hh / 2 - y * hh / 2 * 0.9); }
        ctx.stroke();
        txt(ctx, lab, px0 + 6, y0 + 16, col, 13); txt(ctx, unit, px0 + pw - 6, y0 + 16, C.mut, 12, 'right');
        const cxp = px0 + ((th + 0) / (4 * Math.PI)) * pw; // cursor over first period
        ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cxp, y0); ctx.lineTo(cxp, y0 + hh); ctx.stroke(); ctx.setLineDash([]);
      };
      plot(24, 150, a => Math.cos(a), C.cy, 'Flux Φ = BA cos θ', `peak ${plain(Phi0)} Wb`);
      plot(204, 150, a => Math.sin(a), C.red, 'Induced emf ε = −N dΦ/dt', `peak ${plain(E0)} V`);
      txt(ctx, `2 periods shown (T = ${plain(1000 / v.f)} ms)`, px0 + pw / 2, 372, C.mut, 12, 'center');
    },
    readout(v) {
      const Phi0 = v.B * 1e-3 * v.A * 1e-4, om = 2 * Math.PI * v.f, E0 = v.N * Phi0 * om;
      return R('Φ<sub>max</sub> = BA', sci(Phi0) + ' Wb') + R('ε<sub>peak</sub> = NBAω', sci(E0) + ' V') + R('ε<sub>rms</sub> = peak/√2', sci(E0 / Math.SQRT2) + ' V') + R('Notice', 'emf is max when flux is zero');
    }
  });
}

/* ---------------- 7. RELATIVITY ---------------- */
function relativity(el) {
  return mk(el, {
    controls: [
      { id: 'b', label: 'Speed v as % of c', min: 0, max: 99.9, step: 0.1, val: 80, unit: '% c' },
      { id: 't0', label: 'Proper time t₀ (clock at rest with the event)', min: 1, max: 10, step: 0.5, val: 1, unit: 's' },
      { id: 'L0', label: 'Proper length L₀ (object in its own rest frame)', min: 10, max: 200, step: 5, val: 100, unit: 'm' },
    ],
    frame(ctx, w, h, v, t) {
      const b = v.b / 100, g = 1 / Math.sqrt(1 - b * b);
      txt(ctx, 'Light clock: one tick = light goes up and back', 20, 24, C.fg, 14);
      const base = 340, sc = 270 / g, vh = sc, bw = sc * g * b, hy = sc * g, x0 = 40;
      ctx.strokeStyle = C.cy; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, base); ctx.lineTo(x0, base - vh); ctx.stroke();
      txt(ctx, 'ct₀/2', x0 - 8, base - vh / 2, C.cy, 12, 'right');
      ctx.strokeStyle = C.grn; ctx.beginPath(); ctx.moveTo(x0, base); ctx.lineTo(x0 + bw, base); ctx.stroke();
      txt(ctx, 'vΔt/2', x0 + bw / 2, base + 16, C.grn, 12, 'center');
      ctx.strokeStyle = C.acc; ctx.beginPath(); ctx.moveTo(x0, base - vh); ctx.lineTo(x0 + bw, base); ctx.stroke();
      txt(ctx, 'cΔt/2', x0 + bw / 2 + 10, base - vh / 2 - 6, C.acc, 12);
      const ph = (t * 0.6) % 1; circle(ctx, x0 + bw * ph, base - vh + vh * ph, 5, '#fff');
      txt(ctx, 'To scale: moving clock\'s light path is longer', 20, 372, C.mut, 12);
      // gamma graph
      const gx = 420, gy = 50, gw = 310, gh = 280;
      ctx.strokeStyle = C.grid; ctx.strokeRect(gx, gy, gw, gh);
      txt(ctx, 'γ = 1/√(1 − v²/c²)', gx + 8, gy - 10, C.fg, 14);
      ctx.strokeStyle = C.mut; ctx.beginPath(); ctx.moveTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      ctx.strokeStyle = C.acc; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 300; i++) { const bb = i / 300 * 0.999, gg = 1 / Math.sqrt(1 - bb * bb), y = clamp((gg - 1) / 9, 0, 1); i ? ctx.lineTo(gx + bb * gw, gy + gh - y * gh) : ctx.moveTo(gx, gy + gh); }
      ctx.stroke();
      const my = clamp((g - 1) / 9, 0, 1);
      circle(ctx, gx + b * gw, gy + gh - my * gh, 6, C.red);
      txt(ctx, 'v/c →', gx + gw, gy + gh + 16, C.mut, 12, 'right'); txt(ctx, 'γ (axis to 10)', gx - 4, gy + 10, C.mut, 12, 'right');
      txt(ctx, `γ = ${g.toFixed(3)}`, gx + 12, gy + 34, C.red, 15);
    },
    readout(v) {
      const b = v.b / 100, g = 1 / Math.sqrt(1 - b * b);
      return R('γ', sci(g, 4)) + R('Dilated time Δt = γt₀', sci(g * v.t0) + ' s') + R('Contracted length L = L₀/γ', sci(v.L0 / g) + ' m') + R('KE = (γ−1)mc²', sci(g - 1) + ' × mc²') + R('v', sci(b * 3e8) + ' m/s');
    }
  });
}

/* ---------------- 8. PHOTOELECTRIC ---------------- */
function photo(el) {
  const h = 6.63e-34, e = 1.60e-19;
  return mk(el, {
    controls: [
      { id: 'm', type: 'select', label: 'Metal (work function φ)', options: [{ v: 2.1, l: 'Caesium φ = 2.1 eV' }, { v: 2.3, l: 'Sodium φ = 2.3 eV' }, { v: 4.3, l: 'Zinc φ = 4.3 eV' }, { v: 4.7, l: 'Copper φ = 4.7 eV' }] },
      { id: 'f', label: 'Light frequency f', min: 2, max: 15, step: 0.1, val: 8, unit: '×10¹⁴ Hz' },
      { id: 'I', label: 'Intensity (photons per second)', min: 1, max: 10, step: 1, val: 5 },
    ],
    init(v, st) { st.ph = []; st.el = []; st.acc = 0; },
    frame(ctx, w, hh, v, t, dt, st) {
      const E = h * v.f * 1e14 / e, KE = Math.max(0, E - v.m), plateX = 120;
      const col = v.f > 7.9 ? (v.f > 10 ? C.vio : '#6c8cff') : v.f > 6.3 ? C.grn : v.f > 5 ? C.acc : C.red;
      ctx.fillStyle = '#6b7388'; ctx.fillRect(plateX - 30, 90, 30, 200);
      txt(ctx, 'metal', plateX - 15, 310, C.mut, 12, 'center');
      st.acc += dt * v.I * 1.5;
      while (st.acc > 1) { st.acc--; st.ph.push({ x: 380, y: 110 + Math.random() * 160 }); }
      st.ph.forEach(p => { p.x -= 220 * dt; });
      st.ph = st.ph.filter(p => {
        if (p.x <= plateX) { if (KE > 0) st.el.push({ x: plateX, y: p.y, s: 50 + Math.sqrt(KE) * 90 }); return false; }
        return true;
      });
      st.ph.forEach(p => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i < 28; i++) { const xx = p.x + i, yy = p.y + Math.sin(i * 0.6) * 4; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); });
      st.el.forEach(p => { p.x += p.s * dt; }); st.el = st.el.filter(p => p.x < 400);
      st.el.forEach(p => { circle(ctx, p.x, p.y, 4, '#4a8fe0'); });
      txt(ctx, KE > 0 ? 'Electrons ejected ✔' : 'No electrons: hf < φ ✘', 250, 40, KE > 0 ? C.grn : C.red, 15, 'center');
      txt(ctx, 'photons →', 360, 80, col, 12, 'right');
      // graph
      const gx = 470, gy = 50, gw = 260, gh = 260;
      ctx.strokeStyle = C.grid; ctx.strokeRect(gx, gy, gw, gh);
      txt(ctx, 'KEmax vs f', gx, gy - 10, C.fg, 14);
      const X = f => gx + (f / 16) * gw, Y = k => gy + gh - (k / 5) * gh;
      ctx.strokeStyle = C.mut; ctx.beginPath(); ctx.moveTo(gx, Y(0)); ctx.lineTo(gx + gw, Y(0)); ctx.stroke();
      const f0 = v.m * e / h / 1e14;
      ctx.strokeStyle = C.acc; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(f0), Y(0)); ctx.lineTo(X(16), Y(Math.min(5, h * 16e14 / e - v.m))); ctx.stroke();
      ctx.setLineDash([4, 4]); ctx.strokeStyle = C.mut; ctx.beginPath(); ctx.moveTo(X(f0), Y(0)); ctx.lineTo(X(0), Y(-v.m)); ctx.stroke(); ctx.setLineDash([]);
      circle(ctx, X(v.f), Y(clamp(KE, 0, 5)), 6, C.red);
      txt(ctx, 'f₀', X(f0), Y(0) + 15, C.acc, 12, 'center'); txt(ctx, 'f (×10¹⁴ Hz)', gx + gw, gy + gh + 18, C.mut, 12, 'right'); txt(ctx, 'KE (eV)', gx - 4, gy + 10, C.mut, 12, 'right');
      txt(ctx, 'slope = h · y-intercept = −φ', gx + 6, gy + 20, C.mut, 12);
    },
    readout(v) {
      const E = h * v.f * 1e14 / e, KE = Math.max(0, E - v.m);
      return R('Photon energy hf', sci(E) + ' eV') + R('φ', v.m + ' eV') + R('KE<sub>max</sub>', sci(KE) + ' eV = ' + sci(KE * e) + ' J') + R('Stopping voltage', sci(KE) + ' V') + R('Threshold f₀', sci(v.m * e / h) + ' Hz') + R('Photocurrent', KE > 0 ? '∝ intensity' : 'zero');
    }
  });
}

/* ---------------- 9. RADIOACTIVE DECAY ---------------- */
function decay(el) {
  const N0 = 400;
  return mk(el, {
    controls: [
      { id: 'T', label: 'Half-life (simulation seconds)', min: 1, max: 8, step: 0.5, val: 3, unit: 's' },
      { type: 'button', label: 'Restart', onClick: (v, st) => { st.reset = true; } },
    ],
    onChange(v, st) { st.reset = true; },
    init(v, st) { st.reset = true; },
    frame(ctx, w, h, v, t, dt, st) {
      if (st.reset) { st.a = Array(N0).fill(1); st.flash = Array(N0).fill(0); st.time = 0; st.hist = [[0, N0]]; st.reset = false; st.hold = 0; }
      const T = v.T;
      if (st.time < 5.5 * T) {
        st.time += dt; const p = 1 - Math.pow(0.5, dt / T);
        for (let i = 0; i < N0; i++) if (st.a[i] && Math.random() < p) { st.a[i] = 0; st.flash[i] = 0.4; }
        const n = st.a.reduce((s, x) => s + x, 0); st.hist.push([st.time, n]); st.n = n;
      } else { st.hold += dt; if (st.hold > 3) st.reset = true; }
      const s = 17;
      for (let i = 0; i < N0; i++) {
        const x = 24 + (i % 20) * s, y = 30 + Math.floor(i / 20) * s; st.flash[i] = Math.max(0, st.flash[i] - dt);
        circle(ctx, x, y, 6, st.a[i] ? C.cy : st.flash[i] > 0 ? C.red : '#252d46');
      }
      txt(ctx, 'blue = undecayed nuclei', 24, 368, C.cy, 12);
      const gx = 400, gy = 40, gw = 330, gh = 290, tmax = 5 * T;
      ctx.strokeStyle = C.grid; ctx.strokeRect(gx, gy, gw, gh);
      for (let k = 1; k <= 5; k++) { const y = gy + gh - gh * Math.pow(0.5, k); ctx.strokeStyle = C.grid; ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx + gw, y); ctx.stroke(); const x = gx + k / 5 * gw; ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x, gy + gh); ctx.stroke(); txt(ctx, k + 'T½', x, gy + gh + 16, C.mut, 11, 'center'); }
      ctx.setLineDash([5, 4]); ctx.strokeStyle = C.acc; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i <= 100; i++) { const tt = i / 100 * tmax, y = N0 * Math.pow(0.5, tt / T); const px = gx + i / 100 * gw, py = gy + gh - y / N0 * gh; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = C.cy; ctx.lineWidth = 2; ctx.beginPath();
      st.hist.forEach((q, i) => { const px = gx + q[0] / tmax * gw, py = gy + gh - q[1] / N0 * gh; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke();
      txt(ctx, 'N vs time: random (blue) vs theory (dashed)', gx, gy - 10, C.fg, 13);
    },
    readout(v, st) {
      const n = st.n === undefined ? N0 : st.n, T = v.T, th = N0 * Math.pow(0.5, (st.time || 0) / T), lam = Math.LN2 / T;
      return R('Time', ((st.time || 0) / T).toFixed(2) + ' half-lives') + R('Remaining N', n + ' / ' + N0) + R('Theory N₀/2^(t/T½)', th.toFixed(0)) + R('λ = ln2/T½', sci(lam) + ' s⁻¹') + R('Activity A = λN', sci(lam * n) + ' Bq');
    }
  });
}

/* ---------------- 10. CONSERVATION CHECKER (Standard Model) ---------------- */
function conserve(el) {
  const P = {
    n: { s: 'n', Q: 0, B: 1, L: 0 }, p: { s: 'p', Q: 1, B: 1, L: 0 },
    e: { s: 'e⁻', Q: -1, B: 0, L: 1 }, ep: { s: 'e⁺', Q: 1, B: 0, L: -1 },
    nu: { s: 'νₑ', Q: 0, B: 0, L: 1 }, nub: { s: 'ν̄ₑ', Q: 0, B: 0, L: -1 },
    g: { s: 'γ', Q: 0, B: 0, L: 0 }, pip: { s: 'π⁺', Q: 1, B: 0, L: 0 },
  };
  const RX = [
    [['n'], ['p', 'e', 'nub']],
    [['e', 'ep'], ['g', 'g']],
    [['p', 'e'], ['n', 'nu']],
    [['p', 'nub'], ['n', 'ep']],
    [['p', 'p'], ['p', 'n', 'pip']],
    [['n'], ['p', 'e']],
    [['p'], ['ep', 'g']],
    [['e'], ['nu', 'g']],
    [['n', 'nu'], ['p', 'e']],
    [['n', 'n'], ['p', 'p']],
  ];
  const name = r => r[0].map(k => P[k].s).join(' + ') + '  →  ' + r[1].map(k => P[k].s).join(' + ');
  const tot = (arr, q) => arr.reduce((a, k) => a + P[k][q], 0);
  const fmt = x => (x > 0 ? '+' : '') + x;
  return mk(el, {
    h: 330,
    controls: [{ id: 'r', type: 'select', label: 'Choose a reaction', options: RX.map((r, i) => ({ v: i, l: name(r) })) }],
    frame(ctx, w, h, v) {
      const r = RX[v.r];
      txt(ctx, name(r), w / 2, 40, C.fg, 22, 'center');
      const rows = [['Charge Q', 'Q'], ['Baryon number B', 'B'], ['Lepton number L', 'L']];
      txt(ctx, 'Before', 330, 82, C.mut, 14, 'center'); txt(ctx, 'After', 470, 82, C.mut, 14, 'center');
      let all = true;
      rows.forEach((row, i) => {
        const y = 125 + i * 55, a = tot(r[0], row[1]), b = tot(r[1], row[1]), ok = a === b; all = all && ok;
        ctx.fillStyle = ok ? 'rgba(123,216,143,.12)' : 'rgba(255,107,107,.15)'; ctx.fillRect(60, y - 28, 640, 44);
        txt(ctx, row[0], 80, y, C.fg, 16);
        txt(ctx, fmt(a), 330, y, C.cy, 20, 'center'); txt(ctx, fmt(b), 470, y, C.cy, 20, 'center');
        txt(ctx, ok ? '✔ conserved' : '✘ NOT conserved', 640, y, ok ? C.grn : C.red, 15, 'center');
      });
      ctx.fillStyle = all ? 'rgba(123,216,143,.2)' : 'rgba(255,107,107,.22)'; ctx.fillRect(60, 270, 640, 42);
      txt(ctx, all ? '✔ ALLOWED — all three quantities are conserved' : '✘ FORBIDDEN — a conservation law is broken', w / 2, 298, all ? C.grn : C.red, 18, 'center');
    },
    readout(v) {
      const r = RX[v.r];
      const side = a => a.map(k => `${P[k].s} (Q=${fmt(P[k].Q)}, B=${fmt(P[k].B)}, L=${fmt(P[k].L)})`).join(', ');
      return R('Before', side(r[0])) + R('After', side(r[1]));
    }
  });
}

/* ---------------- 11. EM WAVE ---------------- */
function emwave(el) {
  const bands = [[1e-11, 'Gamma rays', C.vio], [1e-8, 'X-rays', C.vio], [3.8e-7, 'Ultraviolet', C.vio], [7.5e-7, 'Visible light', C.grn], [1e-3, 'Infrared', C.red], [0.3, 'Microwaves', C.acc], [Infinity, 'Radio waves', C.cy]];
  const band = lam => bands.find(b => lam < b[0]);
  return mk(el, {
    controls: [
      { id: 'lg', label: 'Wavelength λ (log₁₀ of metres)', min: -12, max: 4, step: 0.1, val: -6.3, unit: '' },
      { id: 'A', label: 'Amplitude (field strength)', min: 20, max: 90, step: 1, val: 60 },
    ],
    frame(ctx, w, h, v, t) {
      const lam = Math.pow(10, v.lg), b = band(lam), col = b[2];
      const x0 = 50, x1 = 720, cy = 190, L = 210, k = 2 * Math.PI / L, om = 2.2;
      ctx.strokeStyle = C.mut; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x1, cy); ctx.stroke();
      arrow(ctx, x1 - 40, cy, x1, cy, C.mut, 2); txt(ctx, 'direction of travel (speed c)', x1, cy + 22, C.mut, 12, 'right');
      const sk = 0.55;
      for (let x = x0; x <= x1; x += 10) {
        const s = Math.sin(k * (x - x0) - om * t), eY = -s * v.A, bz = s * v.A;
        ctx.strokeStyle = 'rgba(90,209,230,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, cy + eY); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,107,107,.55)'; ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x - bz * sk, cy + bz * sk); ctx.stroke();
      }
      ctx.lineWidth = 3; ctx.strokeStyle = C.cy; ctx.beginPath();
      for (let x = x0; x <= x1; x += 3) { const y = cy - Math.sin(k * (x - x0) - om * t) * v.A; x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
      ctx.strokeStyle = C.red; ctx.beginPath();
      for (let x = x0; x <= x1; x += 3) { const z = Math.sin(k * (x - x0) - om * t) * v.A; const px = x - z * sk, py = cy + z * sk; x === x0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
      txt(ctx, 'Electric field E (vertical)', 20, 30, C.cy, 14); txt(ctx, 'Magnetic field B (into/out of page)', 20, 52, C.red, 14);
      txt(ctx, 'E ⟂ B ⟂ direction of travel · in phase · no medium needed', 20, 330, C.mut, 13);
      ctx.fillStyle = col; ctx.fillRect(540, 18, 180, 34); txt(ctx, b[1], 630, 41, '#0c111d', 16, 'center');
    },
    readout(v) {
      const lam = Math.pow(10, v.lg), f = 3e8 / lam, b = band(lam);
      return R('λ', sci(lam) + ' m') + R('f = c/λ', sci(f) + ' Hz') + R('Region', b[1]) + R('Speed in vacuum', '3.00×10<sup>8</sup> m/s (all bands)');
    }
  });
}

export const SIMS = { projectile, circular, orbit, efield, magnetic, induction, relativity, photo, decay, conserve, emwave };

