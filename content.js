// Lesson content aligned to the 2025 QCAA Physics syllabus (Units 3 & 4, external assessment).
// Each topic: sections (HTML), formulas, explore prompts, quiz.
// Question types: mc (options + answer index) | num (answer number, tol fraction, unit)

const svg = (inner, vb = '0 0 520 260') => `<svg class="diag" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,sans-serif" font-size="13">${inner}</svg>`;
const defs = `<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ffb454"/></marker><marker id="ac" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5ad1e6"/></marker><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ff6b6b"/></marker><marker id="ag" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7bd88f"/></marker></defs>`;

const D_PROJ = svg(`${defs}
<line x1="30" y1="220" x2="500" y2="220" stroke="#8a93ab"/>
<path d="M50 220 Q 200 -30 450 220" fill="none" stroke="#8a93ab" stroke-dasharray="5 5"/>
<circle cx="50" cy="220" r="6" fill="#ffb454"/>
<line x1="50" y1="220" x2="120" y2="150" stroke="#e6e9f2" stroke-width="2" marker-end="url(#ah)"/>
<line x1="50" y1="220" x2="125" y2="220" stroke="#5ad1e6" stroke-width="2" marker-end="url(#ac)"/>
<line x1="50" y1="220" x2="50" y2="145" stroke="#7bd88f" stroke-width="2"/>
<text x="130" y="145" fill="#e6e9f2">u</text><text x="130" y="238" fill="#5ad1e6">uₓ = u cosθ</text><text x="8" y="180" fill="#7bd88f">u_y = u sinθ</text>
<path d="M85 220 A 35 35 0 0 0 78 195" fill="none" stroke="#e6e9f2"/><text x="92" y="212" fill="#e6e9f2" font-size="11">θ</text>
<circle cx="250" cy="52" r="5" fill="#ffb454"/>
<text x="262" y="48" fill="#b69cff">top: v_y = 0, a = g ↓</text>
<line x1="250" y1="62" x2="250" y2="100" stroke="#ff6b6b" stroke-width="2" marker-end="url(#ar)"/>
<text x="400" y="200" fill="#8a93ab">Range R</text>`);

const D_INCLINE = svg(`${defs}
<polygon points="60,230 450,230 450,90" fill="#151b2c" stroke="#8a93ab"/>
<path d="M115 230 A 55 55 0 0 0 108 208" fill="none" stroke="#e6e9f2"/><text x="122" y="224" fill="#e6e9f2" font-size="12">θ</text>
<g transform="translate(250,160) rotate(-20.5)">
 <rect x="-28" y="-44" width="56" height="44" fill="#2b3556" stroke="#e6e9f2"/>
 <line x1="0" y1="-22" x2="0" y2="-100" stroke="#7bd88f" stroke-width="2.5" marker-end="url(#ag)"/>
 <text x="8" y="-96" fill="#7bd88f">N (normal)</text>
 <line x1="0" y1="-22" x2="78" y2="-22" stroke="#ff6b6b" stroke-width="2.5" marker-end="url(#ar)"/>
 <text x="40" y="-28" fill="#ff6b6b" font-size="12">friction f</text>
 <line x1="0" y1="-22" x2="-70" y2="-22" stroke="#b69cff" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#ac)"/>
 <text x="-100" y="-28" fill="#b69cff" font-size="12">mg sinθ</text>
</g>
<line x1="243" y1="141" x2="243" y2="225" stroke="#ffb454" stroke-width="2.5" marker-end="url(#ah)"/>
<text x="250" y="212" fill="#ffb454">mg (weight)</text>
<text x="20" y="22" fill="#e6e9f2">Resolve weight: parallel = mg sinθ (down slope), perpendicular = mg cosθ (balances N)</text>`, '0 0 520 250');

const D_CIRC = svg(`${defs}
<circle cx="200" cy="130" r="90" fill="none" stroke="#8a93ab" stroke-dasharray="4 4"/>
<circle cx="290" cy="130" r="9" fill="#ffb454"/>
<line x1="290" y1="130" x2="290" y2="60" stroke="#5ad1e6" stroke-width="2.5" marker-end="url(#ac)"/>
<line x1="290" y1="130" x2="225" y2="130" stroke="#ff6b6b" stroke-width="2.5" marker-end="url(#ar)"/>
<circle cx="200" cy="130" r="3" fill="#e6e9f2"/>
<text x="300" y="80" fill="#5ad1e6">v (tangent)</text><text x="205" y="120" fill="#ff6b6b" font-size="12">a, F_net</text>
<text x="330" y="150" fill="#e6e9f2">r</text>
<text x="340" y="190" fill="#e6e9f2">Net force always points</text><text x="340" y="208" fill="#e6e9f2">to the centre, ⟂ to v</text>`, '0 0 520 260');

const D_KEPLER = svg(`${defs}
<ellipse cx="260" cy="125" rx="200" ry="90" fill="none" stroke="#8a93ab"/>
<circle cx="160" cy="125" r="13" fill="#ffb454"/><text x="160" y="150" fill="#ffb454" text-anchor="middle" font-size="12">Sun (focus)</text>
<circle cx="260" cy="125" r="2" fill="#8a93ab"/><text x="260" y="118" fill="#8a93ab" font-size="11" text-anchor="middle">other focus</text>
<path d="M160 125 L430 100 L440 140 Z" fill="rgba(90,209,230,.22)" stroke="#5ad1e6"/>
<path d="M160 125 L120 62 L205 38 Z" fill="rgba(90,209,230,.22)" stroke="#5ad1e6"/>
<circle cx="435" cy="122" r="6" fill="#4a8fe0"/>
<text x="260" y="238" fill="#e6e9f2" text-anchor="middle">Equal areas swept in equal times → planet moves fastest when closest to the Sun</text>`, '0 0 520 250');

const D_TRANSFORMER = svg(`
<rect x="170" y="40" width="180" height="170" fill="none" stroke="#8a93ab" stroke-width="14"/>
<g stroke="#ffb454" stroke-width="3" fill="none"><path d="M158 70 h-34 M158 90 h-34 M158 110 h-34 M158 130 h-34 M158 150 h-34 M158 170 h-34"/></g>
<g stroke="#5ad1e6" stroke-width="3" fill="none"><path d="M362 100 h34 M362 125 h34 M362 150 h34"/></g>
<text x="40" y="125" fill="#ffb454">Primary</text><text x="40" y="143" fill="#ffb454">N_p turns</text><text x="40" y="161" fill="#ffb454">V_p (AC)</text>
<text x="410" y="125" fill="#5ad1e6">Secondary</text><text x="410" y="143" fill="#5ad1e6">N_s turns</text><text x="410" y="161" fill="#5ad1e6">V_s</text>
<text x="260" y="130" fill="#e6e9f2" text-anchor="middle">laminated iron core</text><text x="260" y="148" fill="#8a93ab" text-anchor="middle" font-size="11">changing flux links both coils</text>
<text x="260" y="248" fill="#e6e9f2" text-anchor="middle">V_p / V_s = N_p / N_s &nbsp; and &nbsp; I_p V_p = I_s V_s (ideal)</text>`);

const D_LEVELS = svg(`${defs}
<g stroke="#8a93ab" stroke-width="2"><line x1="80" y1="30" x2="300" y2="30"/><line x1="80" y1="60" x2="300" y2="60"/><line x1="80" y1="95" x2="300" y2="95"/><line x1="80" y1="160" x2="300" y2="160"/><line x1="80" y1="235" x2="300" y2="235"/></g>
<g fill="#e6e9f2"><text x="310" y="34">n = ∞   0 eV</text><text x="310" y="64">n = 4   −0.85 eV</text><text x="310" y="99">n = 3   −1.51 eV</text><text x="310" y="164">n = 2   −3.40 eV</text><text x="310" y="239">n = 1   −13.6 eV (ground state)</text></g>
<line x1="150" y1="95" x2="150" y2="160" stroke="#ff6b6b" stroke-width="2.5" marker-end="url(#ar)"/>
<text x="90" y="132" fill="#ff6b6b" font-size="12">656 nm</text>
<line x1="200" y1="60" x2="200" y2="160" stroke="#5ad1e6" stroke-width="2.5" marker-end="url(#ac)"/>
<text x="206" y="120" fill="#5ad1e6" font-size="12">486 nm</text>
<line x1="250" y1="160" x2="250" y2="235" stroke="#b69cff" stroke-width="2.5" marker-end="url(#ac)"/>
<text x="150" y="205" fill="#b69cff" font-size="12">Lyman (UV): 10.2 eV →</text>
<text x="20" y="256" fill="#8a93ab" font-size="11">Emission: electron drops → photon with E = E_i − E_f = hf. Arrow direction shows a drop.</text>`, '0 0 520 266');

const D_HAND = svg(`${defs}
<rect x="40" y="30" width="440" height="190" fill="none" stroke="#262f4a"/>
<g fill="#8a93ab" font-size="22" text-anchor="middle"><text x="100" y="70">×</text><text x="190" y="70">×</text><text x="280" y="70">×</text><text x="370" y="70">×</text><text x="450" y="70">×</text><text x="100" y="190">×</text><text x="190" y="190">×</text><text x="280" y="190">×</text><text x="370" y="190">×</text><text x="450" y="190">×</text><text x="100" y="130">×</text><text x="190" y="130">×</text></g>
<circle cx="260" cy="130" r="9" fill="#e0584a"/><text x="260" y="134" fill="#fff" text-anchor="middle">+</text>
<line x1="272" y1="130" x2="340" y2="130" stroke="#5ad1e6" stroke-width="2.5" marker-end="url(#ac)"/>
<text x="350" y="135" fill="#5ad1e6">v →</text>
<line x1="260" y1="120" x2="260" y2="75" stroke="#ff6b6b" stroke-width="2.5" marker-end="url(#ar)"/>
<text x="270" y="90" fill="#ff6b6b">F (up)</text>
<text x="260" y="248" fill="#e6e9f2" text-anchor="middle">B into page (×), +ve charge moving right → force UP. Flip for −ve charge.</text>`);

const D_FIELDS = svg(`${defs}
<g stroke="#5ad1e6" fill="none" stroke-width="1.6"><circle cx="80" cy="70" r="14"/><circle cx="80" cy="70" r="30"/><circle cx="80" cy="70" r="46"/></g>
<circle cx="80" cy="70" r="4" fill="#e6e9f2"/>
<text x="80" y="140" fill="#e6e9f2" text-anchor="middle" font-size="12">Straight wire (current</text><text x="80" y="156" fill="#e6e9f2" text-anchor="middle" font-size="12">out of page): circles,</text><text x="80" y="172" fill="#e6e9f2" text-anchor="middle" font-size="12">anticlockwise (grip rule)</text>
<g stroke="#5ad1e6" fill="none" stroke-width="1.6"><path d="M190 60 H290 M190 80 H290"/><path d="M190 45 Q340 25 340 70 Q340 115 190 95"/></g>
<rect x="190" y="52" width="100" height="36" fill="#1b2338" stroke="#8a93ab"/>
<g stroke="#ffb454" stroke-width="2" fill="none"><path d="M200 52 v36 M215 52 v36 M230 52 v36 M245 52 v36 M260 52 v36 M275 52 v36"/></g>
<text x="240" y="140" fill="#e6e9f2" text-anchor="middle" font-size="12">Solenoid: uniform field</text><text x="240" y="156" fill="#e6e9f2" text-anchor="middle" font-size="12">inside, like a bar magnet</text>
<rect x="380" y="52" width="50" height="36" fill="#c0392b" stroke="#fff"/><rect x="430" y="52" width="50" height="36" fill="#2c6fbb" stroke="#fff"/>
<text x="405" y="75" fill="#fff" text-anchor="middle" font-size="16">N</text><text x="455" y="75" fill="#fff" text-anchor="middle" font-size="16">S</text>
<g stroke="#5ad1e6" fill="none" stroke-width="1.6"><path d="M405 52 C405 0 455 0 455 52" marker-end="url(#ac)"/><path d="M395 52 C380 -20 475 -20 465 52" marker-end="url(#ac)"/></g>
<text x="430" y="140" fill="#e6e9f2" text-anchor="middle" font-size="12">Bar magnet: lines leave N,</text><text x="430" y="156" fill="#e6e9f2" text-anchor="middle" font-size="12">enter S (never cross)</text>`, '0 0 520 190');

const cell = (x, y, w, h, fill, stroke, big, small) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}"/><text x="${x + w / 2}" y="${y + 19}" fill="#fff" font-size="16" text-anchor="middle">${big}</text><text x="${x + w / 2}" y="${y + 35}" fill="${stroke}" font-size="11" text-anchor="middle">${small}</text>`;
const D_SM = svg(`
<text x="30" y="40" fill="#8a93ab" font-size="12">QUARKS</text>
${[['u', '+⅔', 'up'], ['c', '+⅔', 'charm'], ['t', '+⅔', 'top']].map((q, i) => cell(95 + i * 70, 22, 62, 42, '#2b2f55', '#b69cff', q[0], q[2] + ' · ' + q[1])).join('')}
${[['d', '−⅓', 'down'], ['s', '−⅓', 'strange'], ['b', '−⅓', 'bottom']].map((q, i) => cell(95 + i * 70, 70, 62, 42, '#2b2f55', '#b69cff', q[0], q[2] + ' · ' + q[1])).join('')}
<text x="30" y="150" fill="#8a93ab" font-size="12">LEPTONS</text>
${[['e⁻', '−1', 'electron'], ['μ⁻', '−1', 'muon'], ['τ⁻', '−1', 'tau']].map((q, i) => cell(95 + i * 70, 132, 62, 42, '#1f3a3a', '#5ad1e6', q[0], q[2] + ' · ' + q[1])).join('')}
${[['νₑ', '0', 'e-neutrino'], ['ν_μ', '0', 'μ-neutrino'], ['ν_τ', '0', 'τ-neutrino']].map((q, i) => cell(95 + i * 70, 180, 62, 42, '#1f3a3a', '#5ad1e6', q[0], q[2] + ' · ' + q[1])).join('')}
<text x="340" y="40" fill="#8a93ab" font-size="12">GAUGE BOSONS (force carriers)</text>
${[['γ', 'photon · EM'], ['g', 'gluon · strong'], ['W±', 'W · weak'], ['Z⁰', 'Z · weak']].map((q, i) => cell(340 + (i % 2) * 85, 50 + Math.floor(i / 2) * 55, 78, 46, '#40301c', '#ffb454', q[0], q[1])).join('')}
<text x="340" y="190" fill="#8a93ab" font-size="11">Every particle also has an antiparticle</text><text x="340" y="206" fill="#8a93ab" font-size="11">(same mass, opposite charge, B and L).</text>`, '0 0 520 240');

const D_FEYN = svg(`${defs}
<g fill="none" stroke-width="2.5">
 <line x1="50" y1="150" x2="200" y2="150" stroke="#b69cff" marker-end="url(#ac)"/>
 <line x1="200" y1="150" x2="360" y2="150" stroke="#b69cff" marker-end="url(#ac)"/>
 <line x1="50" y1="190" x2="360" y2="190" stroke="#8a93ab" marker-end="url(#ac)"/>
 <line x1="50" y1="220" x2="360" y2="220" stroke="#8a93ab" marker-end="url(#ac)"/>
 <path d="M200 150 q8 -10 16 -6 t16 -12 t16 -12 t16 -12 t12 -8" stroke="#ffb454"/>
 <line x1="280" y1="82" x2="400" y2="40" stroke="#5ad1e6" marker-end="url(#ac)"/>
 <line x1="400" y1="124" x2="280" y2="82" stroke="#ff6b6b" marker-end="url(#ar)"/>
</g>
<g font-size="13"><text x="20" y="154" fill="#b69cff">d</text><text x="370" y="154" fill="#b69cff">u</text>
<text x="20" y="194" fill="#8a93ab">d</text><text x="370" y="194" fill="#8a93ab">d</text><text x="20" y="224" fill="#8a93ab">u</text><text x="370" y="224" fill="#8a93ab">u</text>
<text x="215" y="112" fill="#ffb454">W⁻</text><text x="408" y="44" fill="#5ad1e6">e⁻</text><text x="408" y="130" fill="#ff6b6b">ν̄ₑ</text>
<text x="20" y="20" fill="#e6e9f2">Neutron (udd) → proton (uud) + e⁻ + ν̄ₑ</text>
<text x="20" y="250" fill="#8a93ab" font-size="11">Time → . Arrow pointing backwards in time = antiparticle (ν̄ₑ). Spectator quarks shown grey.</text></g>`, '0 0 520 260');

export const UNITS = {
  3: { name: 'Unit 3', title: 'Gravity and Electromagnetism' },
  4: { name: 'Unit 4', title: 'Revolutions in Modern Physics' },
};

export const TOPICS = [
/* ===================================================== PROJECTILE & INCLINES ===================================================== */
{
  id: 'projectile', unit: 3, icon: '🎯', title: 'Projectile Motion & Inclined Planes',
  blurb: 'Vectors, independent components, projectiles and forces on slopes.',
  objectives: ['Resolve, add, subtract and recombine vectors', 'Explain why horizontal and vertical motion are independent', 'Solve projectile problems (no drag) with the vertical SUVAT set', 'Draw free-body diagrams on an inclined plane', 'Find the net force on an incline with weight, normal, friction, tension and applied forces'],
  sections: [
    { h: 'Vector analysis', body: `<p>A vector has size and direction. To work with vectors you <b>resolve</b> each into two perpendicular components, <b>add or subtract the components</b>, then <b>recombine</b> into a resultant.</p>
      <div class="eq">vₓ = v cosθ &nbsp;&nbsp; v_y = v sinθ</div><div class="eq">|R| = √(Rₓ² + R_y²) &nbsp;&nbsp; θ = tan⁻¹(R_y / Rₓ)</div>
      <ol><li>Draw the vectors and choose axes (x and y).</li><li>Resolve each into components (watch which angle you are given).</li><li>Add all x-components, then all y-components (subtract for opposite directions).</li><li>Recombine with Pythagoras and tan⁻¹. State the direction clearly (e.g. 53° north of east).</li></ol>
      <p><b>Example:</b> 30 N east + 40 N north → resultant √(30² + 40²) = 50 N at tan⁻¹(40/30) = 53° north of east.</p>` },
    { h: 'Projectile motion: independent components', body: `<p>A projectile moves under gravity only (no drag). Horizontal and vertical motions are <b>independent</b>:</p>
      <ul><li><b>Horizontal:</b> no force → constant velocity: vₓ = uₓ, sₓ = uₓ t.</li><li><b>Vertical:</b> constant acceleration g (9.8 m s⁻² downward).</li></ul>
      <p>The only thing the two share is <b>time</b>. Solve for t in one direction, use it in the other.</p>${D_PROJ}
      <div class="eq">uₓ = u cosθ &nbsp;&nbsp; u_y = u sinθ</div>
      <p>Vertical equations (syllabus form — choose a direction as positive; if up is positive, g = −9.8):</p>
      <div class="eq">v_y = u_y + g t</div> <div class="eq">s_y = u_y t + ½ g t²</div> <div class="eq">v_y² = u_y² + 2 g s_y</div>` },
    { h: 'Level-ground results & data interpretation', body: `<table><tr><th>Quantity</th><th>Formula (level ground)</th></tr><tr><td>Time of flight</td><td>T = 2u sinθ / g</td></tr><tr><td>Maximum height</td><td>H = u² sin²θ / 2g</td></tr><tr><td>Range</td><td>R = u² sin 2θ / g</td></tr></table>
      <p>Maximum range is at <b>45°</b> (level ground); complementary angles give equal range. If the launch is from a height, the best angle is <b>less than 45°</b>. In exam data tasks (horizontal distance vs launch angle) describe the trend: it rises to a maximum and then falls; read the peak angle and compare with theory. Use the data to get time of flight: t = sₓ / uₓ.</p>
      <div class="box tip"><b class="t">Exam method</b><ol><li>Sketch; choose positive direction.</li><li>Resolve u.</li><li>Table of vertical values (u_y, a = g, s_y or v_y).</li><li>Solve for t (quadratic if launched from a height — keep the physical root).</li><li>Use t horizontally. Combine vₓ and v_y with Pythagoras for impact speed.</li></ol></div>` },
    { h: 'Weight, normal force and inclined planes', body: `<p><b>Weight</b> (force due to gravity): F_g = m g, always straight down. <b>Normal force</b> N: the contact force from a surface, always <b>perpendicular</b> to the surface. It is not always equal to mg!</p>${D_INCLINE}
      <p>On a slope at angle θ, resolve the weight <b>parallel</b> and <b>perpendicular</b> to the surface:</p>
      <div class="eq">F_∥ = m g sinθ (down the slope)</div> <div class="eq">F_⊥ = m g cosθ</div>
      <p>No acceleration perpendicular to the slope, so <b>N = mg cosθ</b> (if no other perpendicular forces). Along the slope:</p>
      <div class="eq">F_net = m g sinθ − f − (tension / applied force up slope)</div>
      <ul><li><b>Held by a rope (stationary):</b> F_net = 0 → T = mg sinθ.</li><li><b>Sliding with friction:</b> a = F_net / m.</li><li>Draw every force as an arrow from the object: weight, normal, friction (opposes motion or tendency to move), tension, applied.</li></ul>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>At the top of a projectile path, <b>v_y = 0 but acceleration is still g</b>.</li><li>Using the full speed u in vertical equations — use u_y.</li><li>Mixing sin and cos on an incline: the angle of the slope equals the angle between weight and the perpendicular to the slope, so the <b>parallel component uses sinθ</b>.</li><li>Writing N = mg on a slope.</li><li>Sign mistakes: be consistent about which direction is positive.</li></ul></div>` },
  ],
  formulas: [['Components', 'vₓ = v cosθ,  v_y = v sinθ'], ['Resultant', '|R| = √(Rₓ² + R_y²),  θ = tan⁻¹(R_y/Rₓ)'], ['Vertical (projectile)', 'v_y = u_y + gt;  s_y = u_y t + ½gt²;  v_y² = u_y² + 2g s_y'], ['Horizontal', 'vₓ = uₓ;  sₓ = uₓ t'], ['Weight', 'F_g = mg'], ['On an incline', 'F_∥ = mg sinθ;  F_⊥ = N = mg cosθ'], ['Range (level)', 'R = u² sin2θ / g']],
  explore: ['Set θ = 45°, then try 30° and 60° — compare the ranges.', 'Set launch height to 30 m and find the angle that gives maximum range — is it 45°?', 'Set θ = 0° from a height: the vertical motion is the same as dropping a ball. Why?', 'Change gravity to the Moon (1.6). How do height and time of flight change?'],
  quiz: [
    { type: 'num', q: 'A ball is launched from level ground at <b>20 m s⁻¹ at 30°</b> above the horizontal. Calculate its horizontal range. (g = 9.8 m s⁻²)', answer: 35.3, tol: 0.02, unit: 'm', explain: 'R = u² sin2θ / g = (20² × sin 60°)/9.8 = (400 × 0.866)/9.8 = <b>35.3 m</b>.' },
    { type: 'num', q: 'For the same launch (20 m s⁻¹ at 30°), calculate the <b>maximum height</b> above the ground.', answer: 5.10, tol: 0.02, unit: 'm', explain: 'u_y = 20 sin30° = 10 m s⁻¹. At the top v_y = 0: 0 = 10² − 2(9.8)H → H = 100/19.6 = <b>5.10 m</b>.' },
    { type: 'mc', q: 'At the highest point of a projectile\'s path (no drag), which statement is correct?', options: ['Velocity is zero and acceleration is zero', 'Vertical velocity is zero and acceleration is 9.8 m s⁻² downward', 'Vertical velocity is zero and acceleration is zero', 'Horizontal velocity is zero and acceleration is 9.8 m s⁻² downward'], answer: 1, explain: 'Only the vertical component is momentarily zero. Gravity still acts, so a = g downward. The horizontal velocity is unchanged and non-zero.' },
    { type: 'num', q: 'A ball is thrown <b>horizontally at 12 m s⁻¹</b> from a cliff <b>45 m</b> high. How long does it take to hit the ground? (g = 9.8 m s⁻²)', answer: 3.03, tol: 0.02, unit: 's', explain: 'Vertical: u_y = 0, s = 45 m. s = ½gt² → t = √(2×45/9.8) = <b>3.03 s</b>. (It lands 12 × 3.03 = 36.4 m from the cliff.)' },
    { type: 'num', q: 'A force of 30 N acts east and a force of 40 N acts north on an object. Find the magnitude of the resultant force.', answer: 50, tol: 0.01, unit: 'N', explain: '|R| = √(30² + 40²) = √2500 = <b>50 N</b>, directed tan⁻¹(40/30) = 53° north of east.' },
    { type: 'num', q: 'A 4.0 kg box on a <b>frictionless</b> 30° inclined plane is held in place by a rope parallel to the slope. Determine the magnitude of the tension in the rope. (g = 9.8 m s⁻²)', answer: 19.6, tol: 0.03, unit: 'N', explain: 'Stationary → F_net = 0 along the slope: T = mg sinθ = 4.0 × 9.8 × sin30° = <b>19.6 N</b> (≈ 20 N).' },
    { type: 'num', q: 'A 5.0 kg block slides down a 25° slope. Friction of 8.0 N acts up the slope. Calculate the block\'s <b>acceleration</b> down the slope. (g = 9.8 m s⁻²)', answer: 2.54, tol: 0.03, unit: 'm s⁻²', explain: 'F_∥ = mg sinθ = 5.0 × 9.8 × sin25° = 20.7 N. F_net = 20.7 − 8.0 = 12.7 N. a = F_net/m = 12.7/5.0 = <b>2.54 m s⁻²</b>.' },
    { type: 'mc', q: 'A box rests on a rough slope inclined at θ to the horizontal. The magnitude of the normal force on the box is:', options: ['mg', 'mg sinθ', 'mg cosθ', 'mg tanθ'], answer: 2, explain: 'The normal force balances the component of weight perpendicular to the slope: N = mg cosθ.' },
  ],
},
/* ===================================================== CIRCULAR ===================================================== */
{
  id: 'circular', unit: 3, icon: '🔄', title: 'Circular Motion',
  blurb: 'Why constant speed can still mean acceleration.',
  objectives: ['Describe uniform circular motion, period and average speed', 'Calculate centripetal acceleration and force', 'Identify what provides the centripetal force', 'Understand extension cases: banked curves and vertical circles'],
  sections: [
    { h: 'Uniform circular motion', body: `<p>An object moving in a circle at constant speed has a <b>changing velocity</b> (direction keeps changing), so it <b>accelerates</b>. The acceleration points <b>toward the centre</b>, perpendicular to velocity.</p>${D_CIRC}
      <div class="eq">v = 2πr / T</div> <div class="eq">a_c = v² / r</div> <div class="eq">F_c = F_net = m v² / r</div>
      <p><b>Period T</b> = time for one revolution (s). <b>Average speed</b> = distance/time = circumference/period. Also frequency f = 1/T.</p>` },
    { h: 'Centripetal force is not a new force', body: `<p><b>Centripetal force</b> is just the name for the <b>net force toward the centre</b>. Always say <i>what provides it</i>:</p>
      <table><tr><th>Situation</th><th>Provided by</th></tr><tr><td>Car on a flat road</td><td>Friction between tyres and road</td></tr><tr><td>Ball on a string (horizontal)</td><td>Tension</td></tr><tr><td>Satellite / planet</td><td>Gravity</td></tr><tr><td>Electron in a magnetic field</td><td>Magnetic force</td></tr></table>
      <div class="box warn"><b class="t">Never write "centrifugal force"</b>Nothing pushes an object outward. It travels in a straight line (Newton's 1st law) unless a centripetal force bends its path. Try <i>Release</i> in the simulation.</div>
      <div class="box tip"><b class="t">Tilted string</b>For a ball on a string swung in a horizontal circle, the string is not horizontal: the vertical component of tension balances weight, the horizontal component provides F_c.</div>` },
    { h: 'Extension – less commonly assessed', body: `<p><i>These go beyond the explicit syllabus bullet points but are good for full understanding.</i></p>
      <h3>Banked curves</h3><div class="eq">N cosθ = mg</div><div class="eq">N sinθ = m v² / r</div><div class="eq">tan θ = v² / (r g)</div>
      <h3>Vertical circles</h3><ul><li>Bottom: T − mg = mv²/r. Top: T + mg = mv²/r.</li><li>Minimum speed at the top: v = √(gr).</li></ul>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>Doubling speed makes the force <b>four times</b> bigger (v²).</li><li>Using diameter instead of radius.</li><li>Drawing a "centripetal force" arrow <i>in addition to</i> tension/friction/gravity on a free-body diagram. Draw real forces only.</li><li>Saying "constant speed means no acceleration".</li></ul></div>` },
  ],
  formulas: [['Speed', 'v = 2πr / T'], ['Centripetal acceleration', 'a_c = v² / r'], ['Centripetal force', 'F_c = F_net = mv² / r'], ['Frequency', 'f = 1 / T'], ['Extension: banked curve', 'tanθ = v²/(rg)']],
  explore: ['Double the speed — what happens to the force?', 'Press Release and watch the direction the ball leaves (tangent).', 'Set v = 20 m/s, r = 100 m. Compare a with g — is this a gentle curve?'],
  quiz: [
    { type: 'num', q: 'A 1200 kg car travels around a flat circular bend of radius 50 m at 15 m s⁻¹. Calculate the <b>centripetal acceleration</b>.', answer: 4.5, tol: 0.02, unit: 'm s⁻²', explain: 'a = v²/r = 15²/50 = <b>4.5 m s⁻²</b> toward the centre.' },
    { type: 'num', q: 'For the same car, calculate the <b>friction force</b> needed to keep it on the road.', answer: 5400, tol: 0.02, unit: 'N', explain: 'Friction provides the centripetal force: F = ma = 1200 × 4.5 = <b>5400 N</b>.' },
    { type: 'num', q: 'A ball moves in a horizontal circle of radius 0.50 m at a constant speed of 4.0 m s⁻¹. What is its <b>period</b>?', answer: 0.785, tol: 0.02, unit: 's', explain: 'T = 2πr/v = 2π(0.50)/4.0 = <b>0.785 s</b>.' },
    { type: 'num', q: '(Extension) A road curve of radius <b>100 m</b> is banked so that cars can travel at <b>20 m s⁻¹</b> with no sideways friction. Find the bank angle. (g = 9.8)', answer: 22.2, tol: 0.02, unit: '°', explain: 'tanθ = v²/(rg) = 400/(100×9.8) = 0.408 → θ = tan⁻¹(0.408) = <b>22.2°</b>.' },
    { type: 'mc', q: 'A satellite moves in a circular orbit. Which statement is correct?', options: ['A centripetal force acts in addition to gravity', 'Gravity provides the centripetal force', 'Centrifugal force balances gravity', 'There is no net force because speed is constant'], answer: 1, explain: 'The net force is gravity, directed toward the centre; it <i>is</i> the centripetal force. Constant speed doesn\'t mean zero net force — the direction of velocity changes.' },
    { type: 'mc', q: 'The speed of an object in uniform circular motion is doubled (radius unchanged). The centripetal force required becomes:', options: ['Half', 'The same', 'Double', 'Four times'], answer: 3, explain: 'F = mv²/r ∝ v². Double v → 2² = 4 times the force.' },
  ],
},
/* ===================================================== GRAVITY ===================================================== */
{
  id: 'gravity', unit: 3, icon: '🪐', title: 'Gravitational Fields & Orbits',
  blurb: 'Universal gravitation, field strength and Kepler\'s three laws.',
  objectives: ['Apply the Law of Universal Gravitation', 'Calculate gravitational field strength', 'State Kepler\'s three laws of planetary motion', 'Link gravity and circular motion to Kepler\'s third law', 'Solve orbital period / radius problems'],
  sections: [
    { h: 'Law of Universal Gravitation', body: `<div class="eq">F = G M m / r²</div><p>G = 6.67 × 10⁻¹¹ N m² kg⁻². Every mass attracts every other mass; the forces are an equal and opposite pair. <b>r is the distance between centres</b>, so for a satellite at altitude h, r = R_planet + h. Inverse-square: double r → force ÷ 4.</p>` },
    { h: 'Gravitational field strength', body: `<p>A gravitational field is a region where a mass experiences a force. Field strength is force per unit mass:</p><div class="eq">g = F / m = G M / r²</div>
      <p>Units N kg⁻¹ (= m s⁻²). Points toward the centre of the mass. Near the surface g ≈ 9.8 N kg⁻¹; it falls as 1/r² with distance from the centre.</p>` },
    { h: 'Kepler\'s three laws', body: `${D_KEPLER}<ol><li><b>First law:</b> Planets move in <b>ellipses</b> with the Sun at one focus.</li><li><b>Second law:</b> A line (radius vector) joining a planet to the Sun <b>sweeps out equal areas in equal times</b> — so a planet moves faster when closer to the Sun.</li><li><b>Third law:</b> The square of the orbital period is proportional to the cube of the orbital radius: <span class="eq">T² / r³ = 4π² / GM = constant</span></li></ol>
      <h3>Why? (Law of Universal Gravitation + circular motion)</h3>
      <p>Gravity provides the centripetal force: GMm/r² = m(2πr/T)²/r. Rearranging gives T² = (4π²/GM) r³ — this <i>is</i> the third law. Also v = √(GM/r): the satellite's mass cancels, larger orbits are slower.</p>
      <p>Comparing two bodies orbiting the same mass: T_a² / r_a³ = T_b² / r_b³.</p>
      <div class="box tip"><b class="t">Worked example</b>Earth r = 1.49×10¹¹ m (T = 1 year = 3.15×10⁷ s). Saturn r = 1.43×10¹² m. T_S² = T_E² (r_S/r_E)³ → T_S = 3.1536×10⁷ × (9.597)^1.5 = <b>9.37×10⁸ s</b> (~29.7 years).</div>` },
    { h: 'Weightlessness & geostationary orbit', body: `<ul><li><b>Weightlessness</b>: astronauts on the ISS still feel ~90% of surface gravity. They feel weightless because they and the station are in <b>free fall</b> — no normal (contact) force acts on them.</li><li><b>Geostationary satellite</b>: period 24 h, orbits above the equator in the same direction as Earth's rotation, so it stays above one point. r ≈ 4.22 × 10⁷ m.</li></ul>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>Using altitude instead of r from the centre.</li><li>Saying "there is no gravity in space".</li><li>Forgetting unit conversions (km → m, years/hours → s).</li><li>Using g = 9.8 for a satellite — calculate g = GM/r² at that radius.</li></ul></div>` },
  ],
  formulas: [['Universal gravitation', 'F = GMm / r²'], ['Field strength', 'g = F/m = GM / r²'], ['Orbital speed', 'v = √(GM/r)'], ['Kepler III', 'T² / r³ = 4π² / GM  (constant)'], ['Comparing orbits', 'T_a²/r_a³ = T_b²/r_b³'], ['Constants', 'G = 6.67×10⁻¹¹; M_E = 5.97×10²⁴ kg; R_E = 6.37×10⁶ m']],
  explore: ['Set r to 42.2 (×10⁶ m) with Earth\'s mass — what is the period? (geostationary)', 'Increase the central mass. What happens to speed at fixed radius?', 'Check that T²/r³ equals 4π²/GM in the readout for every setting.'],
  quiz: [
    { type: 'num', q: 'The ISS orbits about 400 km above Earth\'s surface. Calculate the gravitational field strength there. (G = 6.67×10⁻¹¹, M = 5.97×10²⁴ kg, R = 6.37×10⁶ m)', answer: 8.69, tol: 0.02, unit: 'N kg⁻¹', explain: 'r = 6.37×10⁶ + 4.00×10⁵ = 6.77×10⁶ m. g = GM/r² = (6.67×10⁻¹¹ × 5.97×10²⁴)/(6.77×10⁶)² = <b>8.69 N kg⁻¹</b>.' },
    { type: 'num', q: 'Calculate the <b>orbital speed</b> of the ISS at r = 6.77×10⁶ m.', answer: 7670, tol: 0.01, unit: 'm s⁻¹', explain: 'v = √(GM/r) = √(3.982×10¹⁴ / 6.77×10⁶) = √(5.88×10⁷) = <b>7.67×10³ m s⁻¹</b>.' },
    { type: 'num', q: 'Find the orbital radius of a <b>geostationary</b> satellite (T = 24 h = 86 400 s). Give your answer in m (e.g. 4.22e7).', answer: 4.22e7, tol: 0.01, unit: 'm', explain: 'r³ = GMT²/4π² = (3.982×10¹⁴ × 86400²)/(4π²) = 7.53×10²² → r = <b>4.22×10⁷ m</b>.' },
    { type: 'num', q: 'Earth\'s mean orbital radius is 1.49×10¹¹ m; Saturn\'s is 1.43×10¹² m. Calculate Saturn\'s orbital period in seconds (take Earth\'s period as 365 days). Give e.g. 9.37e8.', answer: 9.37e8, tol: 0.01, unit: 's', explain: 'Kepler III: T_S²/r_S³ = T_E²/r_E³. T_E = 365×24×3600 = 3.1536×10⁷ s. T_S = T_E (r_S/r_E)^1.5 = 3.1536×10⁷ × (9.597)^1.5 = <b>9.37×10⁸ s</b>.' },
    { type: 'mc', q: 'Kepler\'s second law states that the radius vector joining a planet to the Sun:', options: ['Is constant in length', 'Sweeps out equal areas in equal times', 'Has a length proportional to the period', 'Always points to the other focus'], answer: 1, explain: 'Equal areas in equal times: a planet moves faster when closer to the Sun (the radius vector is shorter, so it must sweep more angle in the same time).' },
    { type: 'mc', q: 'The distance between two masses is tripled. The gravitational force between them becomes:', options: ['3 times larger', '1/3 as large', '1/9 as large', '9 times larger'], answer: 2, explain: 'F ∝ 1/r². Triple r → F is 1/3² = <b>1/9</b>.' },
    { type: 'mc', q: 'Astronauts on the ISS appear weightless because:', options: ['Gravity is zero at that altitude', 'They are beyond Earth\'s gravitational field', 'They and the station are in free fall, so there is no normal force on them', 'Centrifugal force cancels gravity'], answer: 2, explain: 'Gravity is still ~90% of its surface value. They are in continuous free fall around Earth — no contact force, which is what we feel as weight.' },
    { type: 'mc', q: 'A satellite moves to a higher circular orbit around the same planet. Compared with before, its orbital speed and period are:', options: ['Greater speed, longer period', 'Smaller speed, longer period', 'Smaller speed, shorter period', 'Greater speed, shorter period'], answer: 1, explain: 'v = √(GM/r) decreases as r increases, and T = 2πr/v increases (T ∝ r^1.5).' },
  ],
},
/* ===================================================== ELECTRIC FIELDS ===================================================== */
{
  id: 'electric', unit: 3, icon: '⚡', title: 'Electric Fields & Potential',
  blurb: 'Coulomb\'s law, field strength, electric potential and work.',
  objectives: ['Use Coulomb\'s law', 'Describe electric fields and field strength', 'Define electric potential and electric potential energy', 'Calculate work done moving charges between potentials'],
  sections: [
    { h: 'Charge and Coulomb\'s law', body: `<p>Charge comes in multiples of e = 1.60 × 10⁻¹⁹ C and is conserved. Like charges repel; unlike attract.</p>
      <div class="eq">F = (1/4πε₀) Qq / r² = k Qq / r²</div><p>k = 8.99 × 10⁹ N m² C⁻² (ε₀ = 8.85×10⁻¹² C² N⁻¹ m⁻²). Use magnitudes for the size, then decide direction (attract/repel) from the signs.</p>` },
    { h: 'Electric field', body: `<p>An electric field is a region where a charge feels a force. Electric field strength:</p><div class="eq">E = F / q = k Q / r²</div>
      <p>Units: N C⁻¹. Field lines point <b>away from + and toward −</b>; they never cross; closer lines mean a stronger field. The direction is that of the force on a <b>positive</b> test charge, so a negative charge feels a force opposite to the field. Several charges: <b>vector sum</b>.</p>` },
    { h: 'Electric potential energy and potential', body: `<p>Moving a charge in an electric field changes its <b>electric potential energy</b> U. The electric potential difference between two points:</p>
      <div class="eq">V = ΔU / q &nbsp;⟹&nbsp; ΔU = q ΔV</div>
      <p>This ΔU is the work done on the charge by the field. <b>Sign matters:</b> use the charge's sign (an electron has q = −1.60×10⁻¹⁹ C).</p>
      <div class="box tip"><b class="t">Worked example (2025 style)</b>An electron moves from 2.0 V to 8.0 V. ΔV = +6.0 V. ΔU = qΔV = (−1.60×10⁻¹⁹)(6.0) = <b>−9.6×10⁻¹⁹ J</b>.</div>
      <p>A charge released from rest in a field gains kinetic energy equal to its loss of potential energy: qV = ½mv². 1 eV = 1.60×10⁻¹⁹ J.</p>
      <h3>Extension – uniform field</h3><p>Between parallel plates: E = V/d and F = qE. A charge entering at right angles follows a parabola, like a projectile.</p>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>Field direction is defined for a <b>positive</b> test charge.</li><li>Forgetting to convert μC → C (×10⁻⁶), cm → m.</li><li>Dropping the sign of q when finding ΔU.</li><li>Adding fields as scalars — they are vectors.</li></ul></div>` },
  ],
  formulas: [['Coulomb', 'F = kQq / r² = Qq/(4πε₀r²)'], ['Field strength', 'E = F/q = kq/r²'], ['Potential difference', 'V = ΔU / q'], ['Constants', 'k = 8.99×10⁹; ε₀ = 8.85×10⁻¹²; e = 1.60×10⁻¹⁹ C; mₑ = 9.11×10⁻³¹ kg'], ['Extension', 'E = V/d;  qV = ½mv²']],
  explore: ['Set q₁ = +3 and q₂ = −3 to see a dipole. Which way does the midpoint field point?', 'Make both charges positive. Where does the field become very small?', 'Double the separation. How does the force change?'],
  quiz: [
    { type: 'num', q: 'Two point charges, +3.0 μC and −2.0 μC, are 0.30 m apart. Calculate the magnitude of the force between them. (k = 8.99×10⁹)', answer: 0.599, tol: 0.02, unit: 'N', explain: 'F = kq₁q₂/r² = (8.99×10⁹)(3.0×10⁻⁶)(2.0×10⁻⁶)/(0.30)² = <b>0.599 N</b> (attractive).' },
    { type: 'num', q: 'Calculate the electric field strength 0.50 m from a point charge of +4.0 μC.', answer: 143840, tol: 0.02, unit: 'N C⁻¹', explain: 'E = kQ/r² = (8.99×10⁹)(4.0×10⁻⁶)/(0.50)² = <b>1.44×10⁵ N C⁻¹</b>, directed away from the charge.' },
    { type: 'num', q: 'An electron is moved through a change in electric potential from 2.0 V to 8.0 V. Calculate the work done on the electron (give the sign). (e = 1.60×10⁻¹⁹ C)', answer: -9.6e-19, tol: 0.02, unit: 'J', explain: 'ΔV = 8.0 − 2.0 = 6.0 V. ΔU = qΔV = (−1.60×10⁻¹⁹)(6.0) = <b>−9.6×10⁻¹⁹ J</b>. Negative: electrons lose potential energy moving to higher potential.' },
    { type: 'num', q: '(Extension) An electron is accelerated from rest through <b>500 V</b>. Calculate its final speed. (e = 1.60×10⁻¹⁹ C, m = 9.11×10⁻³¹ kg)', answer: 1.33e7, tol: 0.02, unit: 'm s⁻¹', explain: 'qV = ½mv² → v = √(2qV/m) = √(2×1.60×10⁻¹⁹×500 / 9.11×10⁻³¹) = <b>1.33×10⁷ m s⁻¹</b>.' },
    { type: 'mc', q: 'A negative charge is placed in a uniform electric field pointing to the right. The force on the charge is:', options: ['To the right', 'To the left', 'Zero', 'Perpendicular to the field'], answer: 1, explain: 'Field direction is the direction of force on a <i>positive</i> charge. A negative charge feels the opposite: to the left.' },
  ],
},
/* ===================================================== MAGNETIC FIELDS ===================================================== */
{
  id: 'magnetic', unit: 3, icon: '🧲', title: 'Magnetic Fields',
  blurb: 'Field lines, fields from currents, and forces on charges and wires.',
  objectives: ['Sketch fields around magnets, wires, solenoids and moving charges', 'Calculate B around a wire and inside a solenoid', 'Calculate force on a moving charge and on a current-carrying wire', 'Interpret force and field-strength data'],
  sections: [
    { h: 'Magnetic fields & sketching', body: `<p>A magnetic field B (tesla, T) exists around magnets and <b>moving charges</b> (currents). Field lines leave N and enter S, never cross, and are closer together where the field is stronger.</p>${D_FIELDS}
      <ul><li><b>Straight wire:</b> concentric circles; direction by right-hand grip rule (thumb = conventional current, fingers = B).</li><li><b>Solenoid:</b> uniform field inside, like a bar magnet outside (grip rule: fingers = current round the coil, thumb = N pole).</li><li><b>Moving charge:</b> circles around its path; for a negative charge reverse the direction.</li></ul>` },
    { h: 'Size of the field', body: `<div class="eq">B = μ₀ I / (2π r) &nbsp; (straight wire)</div><div class="eq">B = μ₀ n I &nbsp; (inside a solenoid, n = turns per metre)</div>
      <p>μ₀ = 4π × 10⁻⁷ T m A⁻¹. Field from a wire falls as 1/r (double distance → half the field). A bar magnet's field falls off much faster with distance — in a data task, test B against 1/r², 1/r³ to find the pattern.</p>` },
    { h: 'Force on a moving charge', body: `<div class="eq">F = q v B sin θ</div><p>θ is the angle between v and B. Maximum when perpendicular; zero when parallel. Direction: right-hand rule — fingers along B, thumb along v (positive charge), palm shows F. Reverse for a negative charge.</p>${D_HAND}
      <div class="box key"><b class="t">Key fact</b>F ⟂ v, so the magnetic force does <b>no work</b>: speed and kinetic energy are unchanged, only direction. If v ⟂ B the path is a circle: qvB = mv²/r → r = mv/(qB).</div>` },
    { h: 'Force on a current-carrying wire', body: `<div class="eq">F = B I L sin θ</div><p>Same hand rule with current direction in place of v. Data tasks: F vs I (for fixed B, L) or F vs L gives a straight line through the origin; the gradient is BL (or BI). Two parallel wires with currents in the same direction attract; opposite currents repel.</p>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>Electrons: the force is opposite to what the rule gives for a positive charge.</li><li>"Magnetic force speeds the particle up" — it never does.</li><li>Conventional current points opposite to electron flow.</li><li>Units: mT → T (×10⁻³), cm → m.</li></ul></div>` },
  ],
  formulas: [['Straight wire', 'B = μ₀I / 2πr'], ['Solenoid', 'B = μ₀ n I'], ['Moving charge', 'F = qvB sinθ'], ['Wire', 'F = BIL sinθ'], ['Circular path', 'r = mv/(qB)'], ['Constants', 'μ₀ = 4π×10⁻⁷ T m A⁻¹; e = 1.60×10⁻¹⁹ C; mₑ = 9.11×10⁻³¹ kg']],
  explore: ['Switch between electron and proton — which way does each curve?', 'Flip the field direction and predict what happens before you look.', 'Double the speed. Does the radius change? What about the period?'],
  quiz: [
    { type: 'num', q: 'An electron moves at 3.0×10⁶ m s⁻¹ perpendicular to a 0.020 T magnetic field. Calculate the magnitude of the force on it. (e = 1.60×10⁻¹⁹ C)', answer: 9.6e-15, tol: 0.02, unit: 'N', explain: 'F = qvB = (1.60×10⁻¹⁹)(3.0×10⁶)(0.020) = <b>9.6×10⁻¹⁵ N</b>.' },
    { type: 'num', q: 'Calculate the radius of the electron\'s circular path in the field above (m = 9.11×10⁻³¹ kg). Give e.g. 8.5e-4.', answer: 8.54e-4, tol: 0.02, unit: 'm', explain: 'r = mv/(qB) = (9.11×10⁻³¹ × 3.0×10⁶)/(1.60×10⁻¹⁹ × 0.020) = <b>8.54×10⁻⁴ m</b>.' },
    { type: 'num', q: 'A 0.40 m wire carries 5.0 A at right angles to a 0.15 T field. Calculate the force on the wire.', answer: 0.30, tol: 0.02, unit: 'N', explain: 'F = BIL = 0.15 × 5.0 × 0.40 = <b>0.30 N</b>.' },
    { type: 'num', q: 'Calculate the magnetic field strength 0.050 m from a long straight wire carrying 10 A. (μ₀ = 4π×10⁻⁷) Give e.g. 4.0e-5.', answer: 4.0e-5, tol: 0.02, unit: 'T', explain: 'B = μ₀I/(2πr) = (4π×10⁻⁷ × 10)/(2π × 0.050) = <b>4.0×10⁻⁵ T</b>.' },
    { type: 'num', q: 'A solenoid has 1000 turns per metre and carries 2.0 A. Calculate the field strength inside it. Give e.g. 2.5e-3.', answer: 2.51e-3, tol: 0.02, unit: 'T', explain: 'B = μ₀nI = 4π×10⁻⁷ × 1000 × 2.0 = <b>2.51×10⁻³ T</b>.' },
    { type: 'mc', q: 'Conventional current flows to the right in a wire. The magnetic field is into the page. The force on the wire is directed:', options: ['Up the page', 'Down the page', 'Into the page', 'Out of the page'], answer: 0, explain: 'Right-hand rule: fingers into the page (B), thumb right (I), palm faces up the page. Force is <b>up the page</b>.' },
    { type: 'mc', q: 'Why does a magnetic field not change the kinetic energy of a charged particle moving through it?', options: ['The field is too weak', 'The magnetic force is perpendicular to the velocity, so it does no work', 'The particle is neutral', 'The force is always zero'], answer: 1, explain: 'Work = F·d cosθ. With F ⟂ displacement, W = 0, so speed (and KE) stay constant — only direction changes.' },
  ],
},
/* ===================================================== INDUCTION & EM WAVES ===================================================== */
{
  id: 'induction', unit: 3, icon: '🔌', title: 'Electromagnetic Induction & EM Waves',
  blurb: 'Flux, Faraday, Lenz, transformers, and electromagnetic waves.',
  objectives: ['Define and calculate magnetic flux', 'Apply Faraday\'s and Lenz\'s laws (and link Lenz to conservation of energy)', 'Find emf across a moving conductor', 'Explain how transformers work', 'Describe electromagnetic waves and how oscillating charges produce them'],
  sections: [
    { h: 'Magnetic flux & flux density', body: `<p>Magnetic flux density is the field strength B (T). Magnetic flux through a loop:</p><div class="eq">Φ = B A cos θ = B A⊥</div><p>Φ in weber (Wb = T m²). θ is the angle between B and the <b>normal</b> to the loop (not the surface itself). Flux is maximum when B is perpendicular to the loop face, and zero when B is parallel to the face.</p>` },
    { h: 'Faraday\'s and Lenz\'s laws', body: `<div class="eq">emf = −N ΔΦ / Δt = −N Δ(BA⊥) / Δt</div>
      <p><b>Electromagnetic induction</b>: a changing magnetic flux induces an emf (electromotive force, in volts) in a conductor. <b>Faraday:</b> emf equals the rate of change of flux linkage. You need a <i>changing</i> flux — by changing B, A or θ.</p>
      <p><b>Lenz:</b> the induced current creates a field that <b>opposes the change</b> in flux. This is conservation of energy: if the induced current <i>helped</i> the change, energy would be created for free. Pushing a magnet toward a coil must require work, which becomes the electrical energy.</p>
      <div class="box tip"><b class="t">Lenz recipe</b><ol><li>Which way is the original flux?</li><li>Increasing or decreasing?</li><li>Induced field opposes the change: opposite if increasing, same if decreasing.</li><li>Grip rule gives current direction.</li></ol></div>` },
    { h: 'Emf across a moving conductor', body: `<p>A straight conductor of length L moving at speed v perpendicular to a field B sweeps out area A = Lvt, so ΔΦ/Δt = BLv:</p><div class="eq">emf = B L v</div>
      <p>Charges in the rod feel F = qvB along its length, pushing them to one end and creating the potential difference. Use the right-hand rule on the moving charges for polarity.</p>` },
    { h: 'AC generators & transformers', body: `<p>A coil rotating in a field has Φ = BA cos(ωt), so emf = NBAω sin(ωt): <b>emf is largest when flux is zero</b> (flux changing fastest).</p>${D_TRANSFORMER}
      <div class="eq">V_p / V_s = N_p / N_s</div><div class="eq">I_p V_p = I_s V_s (ideal)</div>
      <p><b>How a transformer works:</b> AC in the primary makes a changing magnetic flux in the iron core. The core links this flux through the secondary. By Faraday's law the changing flux induces an emf in the secondary proportional to its turns. It needs AC (DC gives no changing flux). Step-up: more secondary turns, higher voltage, lower current. Real losses: coil resistance, eddy currents (laminated core), hysteresis, flux leakage. Transmitting at high voltage cuts I²R line loss.</p>` },
    { h: 'Electromagnetic waves', body: `<p>An <b>electromagnetic wave</b> is a self-propagating oscillation of electric and magnetic fields.</p>
      <ul><li><b>Source:</b> accelerating / oscillating charges. An oscillating charge produces a changing electric field, which produces a changing magnetic field, which produces a changing electric field… and the wave travels outward (Maxwell).</li><li><b>Transverse:</b> E and B are perpendicular to each other <b>and</b> to the direction of travel; they oscillate in phase.</li><li>Need <b>no medium</b>. In a vacuum all EM waves travel at c = 3.00 × 10⁸ m s⁻¹.</li><li>The frequency of the wave equals the frequency of the oscillating charge.</li></ul>
      <div class="eq">c = f λ</div>
      <p><b>Spectrum</b> (long λ → short λ, low → high f): radio, microwave, infrared, visible (red → violet), ultraviolet, X-ray, gamma. Visible light is about 400–700 nm.</p>
      <div class="box tip"><b class="t">Try it</b>The EM wave simulation shows E and B at right angles — move the wavelength slider across the whole spectrum.</div>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>"Zero flux means zero emf" — emf depends on the <i>rate of change</i> of flux.</li><li>Using the angle to the coil surface instead of the normal.</li><li>Forgetting N in Faraday's law.</li><li>Lenz's law opposes the <i>change</i> in flux, not the flux itself.</li><li>Saying EM waves are longitudinal or need air.</li></ul></div>` },
  ],
  formulas: [['Flux', 'Φ = BA cosθ'], ['Faraday', 'emf = −NΔΦ/Δt = −NΔ(BA⊥)/Δt'], ['Moving conductor', 'emf = BLv'], ['Transformer', 'V_p/V_s = N_p/N_s;  I_pV_p = I_sV_s'], ['EM wave speed', 'c = fλ = 3.00×10⁸ m s⁻¹']],
  explore: ['Find when the red emf curve is at its maximum — where is the flux at that moment?', 'Double the frequency: what happens to the peak emf?', 'Double the number of turns and area. How many times bigger is the emf?'],
  quiz: [
    { type: 'num', q: 'A 0.020 m² loop sits in a 0.30 T field. The angle between the field and the <i>normal</i> to the loop is 60°. Find the magnetic flux.', answer: 0.0030, tol: 0.02, unit: 'Wb', explain: 'Φ = BA cosθ = 0.30 × 0.020 × cos60° = <b>3.0×10⁻³ Wb</b>.' },
    { type: 'num', q: 'A coil of 200 turns has its flux fall from 4.0×10⁻³ Wb to zero in 0.050 s. Calculate the average induced emf magnitude.', answer: 16, tol: 0.02, unit: 'V', explain: '|emf| = NΔΦ/Δt = 200 × (4.0×10⁻³)/0.050 = <b>16 V</b>.' },
    { type: 'num', q: 'A 0.40 m rod moves at 3.0 m s⁻¹ perpendicular to a 0.50 T field. What emf is induced between its ends?', answer: 0.60, tol: 0.02, unit: 'V', explain: 'emf = BLv = 0.50 × 0.40 × 3.0 = <b>0.60 V</b>.' },
    { type: 'num', q: 'A transformer has 500 primary turns and 50 secondary turns. The primary is connected to 240 V AC. What is the secondary voltage?', answer: 24, tol: 0.02, unit: 'V', explain: 'V_s = V_p × N_s/N_p = 240 × 50/500 = <b>24 V</b> (step-down).' },
    { type: 'num', q: '100 kW is sent along a line of total resistance 5.0 Ω at <b>10 kV</b>. Calculate the power lost in the line.', answer: 500, tol: 0.02, unit: 'W', explain: 'I = P/V = 100 000/10 000 = 10 A. P_loss = I²R = 10² × 5.0 = <b>500 W</b>.' },
    { type: 'num', q: 'A radio station broadcasts at a wavelength of 3.0 m. Calculate the frequency of the waves. (c = 3.00×10⁸ m s⁻¹) Give e.g. 1.0e8.', answer: 1.0e8, tol: 0.02, unit: 'Hz', explain: 'f = c/λ = 3.00×10⁸ / 3.0 = <b>1.0×10⁸ Hz</b> (100 MHz).' },
    { type: 'mc', q: 'According to Lenz\'s law, the induced current in a loop is in a direction such that it:', options: ['Aids the change in flux that caused it', 'Opposes the change in flux that caused it', 'Always creates a field pointing north', 'Maximises the flux through the loop'], answer: 1, explain: 'Lenz\'s law (conservation of energy): the induced current opposes the <i>change</i> in flux. If it aided the change, energy would be created from nothing.' },
    { type: 'mc', q: 'Which statement about an electromagnetic wave in a vacuum is correct?', options: ['The electric and magnetic fields oscillate parallel to the direction of travel', 'The electric and magnetic fields are perpendicular to each other and to the direction of travel', 'The wave needs a medium to travel through', 'Its speed depends on its frequency'], answer: 1, explain: 'EM waves are transverse: E ⟂ B ⟂ direction of travel. No medium is needed and all travel at c in a vacuum.' },
    { type: 'mc', q: 'EM waves are produced by:', options: ['Charges moving at constant velocity', 'Stationary charges', 'Oscillating (accelerating) electric charges', 'Neutral atoms at rest'], answer: 2, explain: 'Oscillating charges create changing electric and magnetic fields that sustain each other and propagate as a wave.' },
  ],
},
/* ===================================================== RELATIVITY ===================================================== */
{
  id: 'relativity', unit: 4, icon: '🚀', title: 'Special Relativity',
  blurb: 'Postulates, simultaneity, time dilation, length contraction and momentum.',
  objectives: ['Define frames of reference and inertial frames', 'State and apply Einstein\'s postulates', 'Explain simultaneity and the consequences of constant c', 'Calculate time dilation, length contraction and relativistic momentum', 'Use ΔE = Δmc² and explain paradoxes conceptually'],
  sections: [
    { h: 'Frames of reference & the problem with classical physics', body: `<p>A <b>frame of reference</b> is the viewpoint from which motion is measured. An <b>inertial frame</b> is one that is not accelerating (rest or constant velocity), where Newton's first law holds. Motion can only be measured <b>relative to an observer</b>: a ball dropped on a train falls straight down for a passenger, but follows a parabola for someone on the platform.</p>
      <p>Classical physics fails for fast particles. <b>Evidence:</b> (1) muons made in the upper atmosphere have a short rest lifetime (2.2 μs) but reach the ground; (2) in particle accelerators the momentum of high-speed particles keeps growing far more than mv predicts.</p>` },
    { h: 'Einstein\'s two postulates', body: `<ol><li>The laws of physics are the same in all <b>inertial frames of reference</b>.</li><li>The speed of light in a vacuum, c = 3.00 × 10⁸ m s⁻¹, is the same for all inertial observers, regardless of the motion of the source or observer.</li></ol>
      <p>Postulate 2 means velocities don't simply add for light. The consequences are time dilation, length contraction and the relativity of simultaneity.</p>` },
    { h: 'Simultaneity', body: `<p>Events simultaneous in one frame are generally <b>not</b> simultaneous in another. <b>Train example:</b> lightning strikes both ends of a moving train. An observer on the platform midway between strikes sees the light arrive together and says they were simultaneous. A passenger moving toward the front flash meets that light first, so for the passenger the front strike happened first. Both are correct in their own frame because c is the same for both.</p>` },
    { h: 'Time dilation', body: `<div class="eq">t = t₀ / √(1 − v²/c²)</div><p><b>Proper time interval t₀</b>: time between two events measured by an observer who sees both events at the <b>same location</b> (one clock). Any observer moving relative to that clock measures a longer <b>relativistic time interval t</b>. Moving clocks run slow.</p>
      <p>The ratio 1/√(1−v²/c²) is often called γ (gamma) ≥ 1:</p><table><tr><th>v / c</th><th>0.10</th><th>0.50</th><th>0.80</th><th>0.90</th><th>0.99</th><th>0.999</th></tr><tr><td>γ</td><td>1.005</td><td>1.155</td><td>1.667</td><td>2.294</td><td>7.089</td><td>22.37</td></tr></table>
      <p><b>Evidence:</b> muon survival at ~0.99c; atomic clocks flown on aircraft run slow by the predicted amount; GPS corrections.</p>` },
    { h: 'Length contraction', body: `<div class="eq">L = L₀ √(1 − v²/c²)</div><p><b>Proper length L₀</b> is measured in the object's own rest frame. An observer for whom it is moving measures a shorter <b>relativistic length L</b>, only along the direction of motion. For muons: Earth's observer says the muon's clock runs slow; the muon says the atmosphere is contracted. Both explain the same observed survival.</p>` },
    { h: 'Relativistic momentum & mass–energy', body: `<div class="eq">p = m₀ v / √(1 − v²/c²)</div><p>m₀ is the <b>rest mass</b>. As v → c the denominator → 0 so p → ∞. Momentum increases without limit, so an infinite force/energy would be needed to reach c — that's why objects with mass cannot reach the speed of light. At low speeds p ≈ m₀v.</p>
      <div class="eq">ΔE = Δm c²</div><p>Mass and energy are equivalent: a change in energy of a system corresponds to a change in mass (e.g. nuclear reactions release energy as mass decreases). The syllabus only requires ΔE = Δmc².</p>` },
    { h: 'Paradoxes (conceptual)', body: `<ul><li><b>Twins paradox:</b> the travelling twin returns younger. The situation is not symmetrical — the traveller accelerates (changes inertial frames) to turn around, the stay-at-home twin does not.</li><li><b>Ladder in the barn:</b> a fast ladder longer than the barn (at rest) is contracted in the barn's frame so it fits; in the ladder's frame the barn is shorter. The resolution is simultaneity: the two doors don't close at the same time in the ladder's frame.</li><li><b>Flashlights on a train:</b> light from a flashlight on a moving train travels at c for <i>both</i> observers (not c + v) — postulate 2.</li></ul>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>Not identifying which interval/length is <b>proper</b> first (proper time: same place; proper length: object at rest).</li><li>Using v in km/h or forgetting to use the fraction of c.</li><li>Applying contraction to dimensions perpendicular to the motion.</li><li>Saying the moving clock is "broken" or that time dilation is an illusion.</li></ul></div>` },
  ],
  formulas: [['Time dilation', 't = t₀ / √(1 − v²/c²)'], ['Length contraction', 'L = L₀ √(1 − v²/c²)'], ['Relativistic momentum', 'p = m₀v / √(1 − v²/c²)'], ['Mass–energy', 'ΔE = Δm c²'], ['Constants', 'c = 3.00×10⁸ m s⁻¹']],
  explore: ['Slide v/c from 0 to 99.9%. At what speed does γ reach 2?', 'Set proper time to 1 s. How long does a moving observer measure at 0.99c?', 'Watch the light path in the clock: why must the moving clock "tick" slower?'],
  quiz: [
    { type: 'num', q: 'A clock on a spaceship measures a proper time of 2.0 s between two events. The ship moves at <b>0.80c</b> past an observer. What time interval does that observer measure?', answer: 3.33, tol: 0.02, unit: 's', explain: 't = t₀/√(1 − 0.80²) = 2.0/0.60 = <b>3.33 s</b>.' },
    { type: 'num', q: 'Muons have a proper lifetime of 2.2 μs. At 0.99c, what lifetime is measured by an observer on Earth? (give in μs)', answer: 15.6, tol: 0.02, unit: 'μs', explain: 'γ = 1/√(1 − 0.99²) = 7.09. t = γt₀ = 7.09 × 2.2 = <b>15.6 μs</b>.' },
    { type: 'num', q: 'A spaceship has a proper length of 100 m. It passes you at <b>0.60c</b>. What length do you measure?', answer: 80, tol: 0.01, unit: 'm', explain: 'L = L₀√(1 − 0.36) = 100 × 0.80 = <b>80 m</b>.' },
    { type: 'num', q: 'An electron (m₀ = 9.11×10⁻³¹ kg) moves at 0.80c. Calculate its relativistic momentum. (c = 3.00×10⁸ m s⁻¹) Give e.g. 3.6e-22.', answer: 3.64e-22, tol: 0.02, unit: 'kg m s⁻¹', explain: 'p = m₀v/√(1 − v²/c²) = (9.11×10⁻³¹ × 2.40×10⁸)/0.60 = <b>3.64×10⁻²² kg m s⁻¹</b>.' },
    { type: 'num', q: 'The mass of a system decreases by <b>1.0 g</b> as energy is released. Calculate the energy released. (c = 3.00×10⁸ m s⁻¹) Give e.g. 9e13.', answer: 9e13, tol: 0.01, unit: 'J', explain: 'ΔE = Δm c² = (1.0×10⁻³)(3.00×10⁸)² = <b>9.0×10¹³ J</b>.' },
    { type: 'mc', q: 'Who measures the <b>proper time</b> between two events?', options: ['Any observer moving relative to the events', 'The observer who sees both events at the same location', 'The observer closest to the light source', 'Only an observer at rest relative to the stars'], answer: 1, explain: 'Proper time is measured by a single clock present at both events. All other observers measure a longer time.' },
    { type: 'mc', q: 'Which statement is one of Einstein\'s postulates?', options: ['Time is the same for all observers', 'The speed of light in a vacuum is the same for all inertial observers', 'Mass is conserved in all reactions', 'Objects can travel faster than light with enough energy'], answer: 1, explain: 'Postulate 2: c is constant in all inertial frames.' },
    { type: 'mc', q: 'Why can an object with mass not be accelerated to the speed of light?', options: ['Its mass becomes zero', 'Its relativistic momentum approaches infinity as v approaches c', 'Time stops for the observer', 'Length contraction makes it vanish'], answer: 1, explain: 'p = m₀v/√(1 − v²/c²) → ∞ as v → c, so an infinite amount of energy/impulse would be needed.' },
    { type: 'mc', q: 'In the twins paradox, why is the travelling twin younger on return?', options: ['The twin on Earth also moves, so the situation is symmetrical', 'The travelling twin changes inertial frames when turning around, breaking the symmetry', 'Gravity slows the Earth twin', 'Light travels slower for the Earth twin'], answer: 1, explain: 'Only the travelling twin accelerates (switches inertial frames), so the two situations are not equivalent.' },
  ],
},
/* ===================================================== QUANTUM ===================================================== */
{
  id: 'quantum', unit: 4, icon: '🌈', title: 'Quantum Theory',
  blurb: 'Black-body radiation, photons, atomic models and wave–particle duality.',
  objectives: ['Explain evidence for light as a wave (double slit) and as a particle (photoelectric)', 'Describe black-body radiation and Planck\'s solution', 'Use E = hf and the photoelectric equation', 'Compare Rutherford and Bohr models', 'Use Bohr\'s model, Rydberg\'s formula and energy-level diagrams'],
  sections: [
    { h: 'Light as a wave', body: `<p>Light is an <b>electromagnetic wave</b>. <b>Double-slit experiment:</b> light through two narrow slits produces a pattern of bright and dark fringes on a screen. Light from the slits overlaps and <b>interferes</b>: constructive (crest meets crest, path difference = nλ) gives bright fringes, destructive (crest meets trough, path difference = (n + ½)λ) gives dark fringes. Only waves can do this, so it is strong evidence for the wave model.</p>` },
    { h: 'Black-body radiation', body: `<p>A <b>black body</b> absorbs all radiation and emits a continuous spectrum that depends only on temperature. Hotter bodies peak at shorter wavelength:</p><div class="eq">λ_max = b / T &nbsp; (b = 2.898 × 10⁻³ m K)</div>
      <p><b>Significance:</b> classical physics predicted ever-increasing intensity at short wavelengths (the "ultraviolet catastrophe") — not observed. Planck solved it by assuming energy is emitted in discrete packets (quanta) E = hf, the first step to quantum theory. Example: the Sun, T ≈ 5800 K, λ_max = 2.898×10⁻³/5800 = 5.0×10⁻⁷ m (green).</p>` },
    { h: 'Photons & the photoelectric effect', body: `<div class="eq">E = h f = h c / λ</div><p>Light also behaves as <b>photons</b>. Shine light on a metal: electrons are ejected only if f is above the <b>threshold frequency f₀</b>.</p>
      <div class="eq">E_k = h f − W</div><div class="eq">W = h f₀</div>
      <p>W = <b>work function</b>, minimum energy to free an electron. Each photon gives all its energy to one electron.</p>
      <table><tr><th>Observation</th><th>Wave model predicted</th></tr><tr><td>No electrons below f₀, however bright</td><td>Bright enough light should always work</td></tr><tr><td>Emission is immediate</td><td>Delay while energy builds up</td></tr><tr><td>E_k(max) depends on f, not intensity</td><td>Brighter → faster electrons</td></tr></table>
      <div class="box key"><b class="t">E_k vs f graph</b>Straight line: <b>gradient = h</b>, <b>x-intercept = f₀</b>, <b>y-intercept = −W</b>. Different metals give parallel lines. Intensity changes the <i>number</i> of electrons per second (photocurrent), not their max energy.</div>
      <div class="box tip"><b class="t">Writing a 5-mark explanation (intensity, frequency, energy)</b><ol><li><b>Photon model:</b> light consists of photons with E = hf; one photon interacts with one electron.</li><li><b>Frequency:</b> if hf &lt; W no electron is ejected; the lower-frequency light is below the threshold frequency.</li><li><b>Intensity:</b> increasing intensity increases the number of photons per second but not the energy of each, so no electrons are ejected below threshold.</li><li><b>Wave contradiction:</b> a wave model predicts energy accumulates with intensity so electrons <i>would</i> eventually be ejected — this doesn't happen.</li><li><b>Energy:</b> above threshold, E_k = hf − W so extra photon energy becomes the electron's kinetic energy.</li></ol></div>` },
    { h: 'Atomic models: Rutherford vs Bohr', body: `<table><tr><th></th><th>Rutherford (1911)</th><th>Bohr (1913)</th></tr><tr><td>Structure</td><td>Small dense positive nucleus, electrons orbit</td><td>Same, but electrons only in certain allowed orbits</td></tr><tr><td>Energy</td><td>Orbiting electrons should radiate and spiral into the nucleus</td><td>Electrons in allowed orbits do <b>not</b> radiate; energy is quantised</td></tr><tr><td>Spectra</td><td>Can't explain line spectra</td><td>Photon emitted/absorbed in jumps between levels</td></tr></table>` },
    { h: 'Bohr model of hydrogen', body: `<p>Bohr: the electron's orbit circumference holds a whole number of de Broglie wavelengths, equivalently angular momentum is quantised:</p>
      <div class="eq">nλ = 2πr</div><div class="eq">m v r = n h / 2π</div>
      <p>A photon is emitted when an electron falls from E_i to E_f: <span class="eq">hf = E_i − E_f</span>. Wavelengths of the hydrogen spectrum:</p>
      <div class="eq">1/λ = R (1/n_f² − 1/n_i²) &nbsp; R = 1.097 × 10⁷ m⁻¹</div>${D_LEVELS}
      <p><b>Example (H-alpha):</b> n = 3 → 2: 1/λ = 1.097×10⁷ (1/4 − 1/9) = 1.524×10⁶ → λ = 656 nm (red). Emission spectra: bright lines on dark; absorption: dark lines on a continuous spectrum, at the same wavelengths.</p>` },
    { h: 'Wave–particle duality', body: `<div class="eq">λ = h / p</div><p>De Broglie: matter has wave properties. <b>Evidence for waves:</b> double-slit interference/diffraction of light, and electron diffraction by crystals. <b>Evidence for particles:</b> the photoelectric effect (photons), and electrons/detectors registering at single points. Duality: light and matter show both behaviours depending on the experiment.</p>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>Saying brighter light gives electrons more energy. It gives <i>more</i> electrons.</li><li>Mixing eV and J: 1 eV = 1.60×10⁻¹⁹ J.</li><li>Using a level's energy instead of the <i>difference</i> between levels.</li><li>Forgetting that λ_max shortens as T rises.</li></ul></div>` },
  ],
  formulas: [['Black body (Wien)', 'λ_max = b / T,  b = 2.898×10⁻³ m K'], ['Photon energy', 'E = hf = hc/λ'], ['Photoelectric', 'E_k = hf − W;  W = hf₀'], ['Bohr', 'nλ = 2πr;  mvr = nh/2π'], ['Rydberg', '1/λ = R(1/n_f² − 1/n_i²), R = 1.097×10⁷ m⁻¹'], ['de Broglie', 'λ = h/p'], ['Constants', 'h = 6.63×10⁻³⁴ J s; 1 eV = 1.60×10⁻¹⁹ J; c = 3.00×10⁸ m s⁻¹']],
  explore: ['Pick Caesium and slowly lower the frequency. When do electrons stop appearing?', 'Increase intensity at a frequency below threshold. Does anything change?', 'Compare Sodium and Zinc on the E_k–f graph. What stays the same?'],
  quiz: [
    { type: 'num', q: 'A star has a surface temperature of 5800 K. Use Wien\'s law (b = 2.898×10⁻³ m K) to find the wavelength at which it emits most strongly. Give e.g. 5.0e-7.', answer: 5.0e-7, tol: 0.02, unit: 'm', explain: 'λ_max = b/T = 2.898×10⁻³ / 5800 = <b>5.0×10⁻⁷ m</b> (500 nm).' },
    { type: 'num', q: 'Calculate the energy of a photon of wavelength <b>500 nm</b>. (h = 6.63×10⁻³⁴, c = 3.00×10⁸) Give in joules.', answer: 3.98e-19, tol: 0.02, unit: 'J', explain: 'E = hc/λ = (6.63×10⁻³⁴ × 3.00×10⁸)/(500×10⁻⁹) = <b>3.98×10⁻¹⁹ J</b> (= 2.49 eV).' },
    { type: 'num', q: 'A photoelectric experiment used light of frequency 8.50×10¹⁴ Hz and the maximum kinetic energy of the photoelectrons was 4.25×10⁻¹⁹ J. Calculate the <b>work function in eV</b>.', answer: 0.87, tol: 0.03, unit: 'eV', explain: 'hf = (6.63×10⁻³⁴)(8.50×10¹⁴) = 5.64×10⁻¹⁹ J. W = hf − E_k = 5.64×10⁻¹⁹ − 4.25×10⁻¹⁹ = 1.39×10⁻¹⁹ J = <b>0.87 eV</b> (0.86 if hf is rounded to 5.63×10⁻¹⁹ J).' },
    { type: 'num', q: 'Light of frequency 7.0×10¹⁴ Hz shines on a metal with work function 2.3 eV. Find the maximum kinetic energy of the ejected electrons <b>in eV</b>.', answer: 0.60, tol: 0.04, unit: 'eV', explain: 'hf = (6.63×10⁻³⁴)(7.0×10¹⁴) = 4.64×10⁻¹⁹ J = 2.90 eV. E_k = hf − W = 2.90 − 2.3 = <b>0.60 eV</b>.' },
    { type: 'num', q: 'Use the Rydberg formula to find the wavelength (in nm) of light emitted when a hydrogen electron falls from n = 3 to n = 2. (R = 1.097×10⁷ m⁻¹)', answer: 656, tol: 0.01, unit: 'nm', explain: '1/λ = 1.097×10⁷ (1/2² − 1/3²) = 1.097×10⁷ × 0.1389 = 1.524×10⁶ m⁻¹ → λ = 6.56×10⁻⁷ m = <b>656 nm</b>.' },
    { type: 'num', q: 'Calculate the de Broglie wavelength of an electron moving at 1.0×10⁶ m s⁻¹. (m = 9.11×10⁻³¹ kg) Give in metres.', answer: 7.28e-10, tol: 0.02, unit: 'm', explain: 'λ = h/mv = 6.63×10⁻³⁴ / (9.11×10⁻³¹ × 1.0×10⁶) = <b>7.28×10⁻¹⁰ m</b>.' },
    { type: 'mc', q: 'In the photoelectric effect, increasing the intensity of light (frequency above threshold) will:', options: ['Increase the maximum KE of the electrons', 'Increase the number of electrons emitted per second', 'Decrease the threshold frequency', 'Increase the work function'], answer: 1, explain: 'Intensity = photons per second. More photons → more electrons per second. Each photon has the same energy, so E_k(max) is unchanged.' },
    { type: 'mc', q: 'On a graph of E_k(max) (y) against frequency (x) for a metal, the gradient is:', options: ['The work function W', 'The threshold frequency', 'Planck\'s constant h', 'The charge of the electron e'], answer: 2, explain: 'E_k = hf − W is y = mx + c with m = h. The x-intercept is f₀ and the y-intercept is −W.' },
    { type: 'mc', q: 'Which observation is evidence that light behaves as a wave?', options: ['Electrons ejected only above a threshold frequency', 'An interference pattern of bright and dark fringes from a double slit', 'A continuous spectrum from a hot object', 'Line spectra from hydrogen'], answer: 1, explain: 'Interference fringes require superposition of waves. The others are explained by the photon/quantum model.' },
    { type: 'mc', q: 'Compared with Rutherford\'s model, Bohr\'s model of the atom:', options: ['Has no nucleus', 'Allows electrons to radiate continuously while orbiting', 'Restricts electrons to certain orbits where they do not radiate', 'Explains the photoelectric effect'], answer: 2, explain: 'Bohr proposed quantised orbits (nλ = 2πr) in which electrons do not radiate; photons are emitted only in jumps between orbits, explaining line spectra.' },
  ],
},
/* ===================================================== STANDARD MODEL ===================================================== */
{
  id: 'standard', unit: 4, icon: '⚛️', title: 'The Standard Model',
  blurb: 'Quarks, leptons, bosons, conservation laws and interaction diagrams.',
  objectives: ['Identify quarks, leptons and gauge bosons', 'Describe baryons, mesons and antiparticles', 'Compare strong, weak and EM forces', 'Apply baryon and lepton number conservation', 'Interpret particle interaction diagrams'],
  sections: [
    { h: 'Elementary particles & antiparticles', body: `<p>The Standard Model describes matter and forces in terms of <b>elementary particles</b> (no known internal structure). Every particle has an <b>antiparticle</b> with the same mass but opposite charge (and opposite B and L): e⁻ ↔ e⁺ (positron), u ↔ ū, νₑ ↔ ν̄ₑ. When a particle meets its antiparticle they <b>annihilate</b> into energy (photons).</p>${D_SM}` },
    { h: 'Quarks, hadrons and leptons', body: `<ul><li><b>Six quarks:</b> up (+⅔), charm (+⅔), top (+⅔), down (−⅓), strange (−⅓), bottom (−⅓).</li><li><b>Six leptons:</b> electron, muon, tau (each charge −1) and their neutrinos νₑ, ν_μ, ν_τ (charge 0).</li></ul>
      <p>Quarks combine into <b>hadrons</b>: <b>baryons</b> (three quarks, e.g. proton uud, neutron udd) and <b>mesons</b> (a quark and an antiquark, e.g. pion π⁺ = u d̄). Leptons are not made of quarks.</p>
      <p>Charge check: proton +⅔ +⅔ −⅓ = +1; neutron +⅔ −⅓ −⅓ = 0; π⁺ (u d̄) = +⅔ + ⅓ = +1.</p>` },
    { h: 'Forces and gauge bosons', body: `<table><tr><th>Force</th><th>Gauge boson</th><th>Felt by</th></tr><tr><td>Strong nuclear</td><td>Gluon (g)</td><td>Quarks only (not leptons)</td></tr><tr><td>Electromagnetic</td><td>Photon (γ)</td><td>Charged particles (quarks, charged leptons)</td></tr><tr><td>Weak nuclear</td><td>W⁺, W⁻ and Z⁰ bosons</td><td>All quarks and leptons, including neutrinos</td></tr></table>
      <p>The four gauge bosons: <b>photon, gluon, W and Z</b>. <b>Quarks</b> feel all three forces; <b>charged leptons</b> feel EM and weak; <b>neutrinos</b> feel only the weak force. Forces act by exchange of gauge bosons.</p>` },
    { h: 'Baryon number and lepton number', body: `<div class="eq">B = (n_q − n_q̄) / 3 &nbsp;&nbsp; L = n_l − n_l̄</div>
      <p>Each quark has B = +⅓, antiquark −⅓. So baryons (qqq): B = +1; antibaryons: −1; mesons (q q̄): B = 0. Each lepton has L = +1, antilepton L = −1; non-leptons L = 0.</p>
      <table><tr><th>Particle</th><th>Q</th><th>B</th><th>L</th></tr><tr><td>p</td><td>+1</td><td>+1</td><td>0</td></tr><tr><td>n</td><td>0</td><td>+1</td><td>0</td></tr><tr><td>e⁻</td><td>−1</td><td>0</td><td>+1</td></tr><tr><td>e⁺</td><td>+1</td><td>0</td><td>−1</td></tr><tr><td>νₑ</td><td>0</td><td>0</td><td>+1</td></tr><tr><td>ν̄ₑ</td><td>0</td><td>0</td><td>−1</td></tr><tr><td>γ</td><td>0</td><td>0</td><td>0</td></tr></table>
      <p>In every interaction the <b>total charge, baryon number and lepton number</b> are conserved (same before and after).</p>
      <div class="box tip"><b class="t">Neutron decay</b>n → p + e⁻ + ν̄ₑ. Charge: 0 → +1 − 1 = 0 ✔. B: +1 → +1 ✔. L: 0 → 0 + (+1) + (−1) = 0 ✔. Without the antineutrino, L would go from 0 to +1 ✘ — which is why the neutrino was predicted.</div>
      <div class="box tip"><b class="t">Annihilation</b>e⁻ + e⁺ → γ + γ: Q −1 + 1 = 0 ✔; B 0 ✔; L +1 − 1 = 0 ✔.</div>` },
    { h: 'Particle interaction diagrams', body: `<p>Time runs left to right. Straight lines are particles, wavy lines are gauge bosons, arrows pointing backwards represent antiparticles. At each vertex the conservation laws hold.</p>${D_FEYN}
      <ul><li><b>e⁻ + e⁻ scattering:</b> two electrons exchange a <b>photon</b> (EM force) and repel.</li><li><b>e⁻ + e⁺ annihilation:</b> electron and positron meet and make a photon (or two), which can later produce a new pair.</li><li><b>Neutron (beta-minus) decay:</b> a down quark becomes an up quark by emitting a <b>W⁻</b> boson, which decays to e⁻ + ν̄ₑ (weak force). Symmetry in these diagrams keeps the conservation laws satisfied.</li></ul>` },
    { h: 'Common mistakes', body: `<div class="box warn"><ul><li>Forgetting that antiparticles carry the <b>opposite</b> B and L.</li><li>Checking only charge — always check Q, B <b>and</b> L.</li><li>Putting leptons in the strong force column.</li><li>Calling the W the carrier of the electromagnetic force.</li></ul></div>` },
  ],
  formulas: [['Baryon number', 'B = (n_q − n_q̄)/3 = (1/3)(n_q − n_q̄)'], ['Lepton number', 'L = n_l − n_l̄'], ['Conservation', 'Q, B and L are conserved in all interactions'], ['Quark charges', 'u, c, t: +⅔;  d, s, b: −⅓'], ['Forces', 'strong: gluon;  EM: photon;  weak: W±, Z⁰']],
  explore: ['Run through all the reactions. Which conservation law breaks in each forbidden one?', 'Check neutron decay with and without the antineutrino.', 'Find a reaction where charge is conserved but a different quantity is not.'],
  quiz: [
    { type: 'mc', q: 'Which quark combination makes a <b>proton</b>?', options: ['u d d', 'u u d', 'u u u', 'd d d'], answer: 1, explain: 'Proton = uud: charge ⅔ + ⅔ − ⅓ = +1. Neutron = udd: ⅔ − ⅓ − ⅓ = 0.' },
    { type: 'num', q: 'A π⁺ meson is made of an up quark and an anti-down quark (u d̄). What is its <b>baryon number</b>?', answer: 0, tol: 0, unit: '', explain: 'B = (n_q − n_q̄)/3 = (1 − 1)/3 = <b>0</b>. Mesons always have B = 0.' },
    { type: 'num', q: 'A meson is made of an up quark and an anti-strange quark (u s̄). What is its charge in units of e? (e.g. 1)', answer: 1, tol: 0.01, unit: 'e', explain: 'u = +⅔; s̄ = +⅓ (strange is −⅓, antiquark opposite). Total = <b>+1</b>.' },
    { type: 'mc', q: 'Is the reaction p + e⁻ → n + νₑ allowed?', options: ['Allowed: Q, B and L are all conserved', 'Forbidden: charge not conserved', 'Forbidden: baryon number not conserved', 'Forbidden: lepton number not conserved'], answer: 0, explain: 'Q: +1 − 1 = 0 → 0 + 0 ✔. B: +1 + 0 → +1 + 0 ✔. L: 0 + 1 → 0 + 1 ✔. All conserved, so it is allowed (electron capture).' },
    { type: 'mc', q: 'The decay n → p + e⁻ (with no neutrino) is forbidden because:', options: ['Charge is not conserved', 'Baryon number is not conserved', 'Lepton number is not conserved', 'The neutron is stable'], answer: 2, explain: 'Q: 0 → +1 − 1 = 0 ✔. B: 1 → 1 ✔. L: 0 → +1 ✘. An antineutrino (L = −1) is needed to balance.' },
    { type: 'mc', q: 'Why is p → e⁺ + γ forbidden?', options: ['Charge is not conserved', 'Baryon number and lepton number are not conserved', 'Photons cannot be produced', 'It violates only lepton number'], answer: 1, explain: 'Q: +1 → +1 ✔. B: +1 → 0 ✘. L: 0 → −1 ✘. Both baryon and lepton number change.' },
    { type: 'mc', q: 'Which gauge boson is exchanged in the beta-minus decay of a neutron?', options: ['Photon', 'Gluon', 'W boson', 'Higgs boson'], answer: 2, explain: 'Beta decay is a weak-force process: a down quark emits a W⁻ and becomes an up quark.' },
    { type: 'mc', q: 'Which statement about the forces experienced by particles is correct?', options: ['Neutrinos feel the strong and weak forces', 'Quarks feel the strong, electromagnetic and weak forces', 'Electrons feel the strong force', 'Gluons carry the weak force'], answer: 1, explain: 'Quarks feel all three. Charged leptons feel EM and weak; neutrinos feel only the weak force. Gluons carry the strong force.' },
  ],
},
];
