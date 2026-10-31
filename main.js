import './style.css';
import { TOPICS, UNITS } from './content.js';
import { custom } from './custom.js';
import { SIMS } from './sims.js';
import EX from './exams.json';

/* ---------- data prep ---------- */
TOPICS.forEach(t => {
  t.quiz.forEach((q, i) => { q.id = `${t.id}-${i}`; q.topic = t.id; });
  custom.filter(c => c.topic === t.id).forEach((c, i) => t.quiz.push({ ...c, id: `${t.id}-c${i}`, mine: true }));
});
const byId = id => TOPICS.find(t => t.id === id);
const allQ = () => TOPICS.flatMap(t => t.quiz);


/* ---------- image loader (exam images are bundled as per-year JSON) ---------- */
const IMGLOAD = import.meta.glob('./ex-*.json');
const imgCache = {};
async function getImg(p) {
  const y = p.split('/')[1];
  if (!imgCache[y]) imgCache[y] = IMGLOAD[`./ex-${y}.json`]().then(m => m.default);
  return (await imgCache[y])[p];
}
new MutationObserver(() => {
  document.querySelectorAll('img[data-p]:not([src])').forEach(im => { im.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='; getImg(im.dataset.p).then(u => { im.src = u; }); });
}).observe(document.body, { childList: true, subtree: true });

/* ---------- progress (localStorage, safe) ---------- */
const KEY = 'qcaa-physics-progress-v1';
let prog = {};
try { prog = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { prog = {}; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(prog)); } catch (e) { /* ignore */ } };
const exOf = id => EX.filter(e => e.t === id);
const topicPct = t => { const all = [...t.quiz, ...exOf(t.id)]; return Math.round(100 * all.filter(q => prog[q.id] === 1).length / all.length); };
const BASE = '';
const SIMKEY = { projectile: 'projectile', circular: 'circular', gravity: 'orbit', electric: 'efield', magnetic: 'magnetic', induction: 'induction', relativity: 'relativity', quantum: 'photo', standard: 'conserve' };
const PAPER = { mc: 'Paper 1 · Multiple choice', p1: 'Paper 1 · Short response', p2: 'Paper 2 · Extended response' };

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const app = $('#app');
let stopSim = null;

function parseNum(s) {
  s = String(s).trim().replace(/\s/g, '').replace(/[×x*]10\^?/i, 'e').replace('−', '-').replace(/,/g, '');
  const n = Number(s);
  return isNaN(n) ? null : n;
}

/* ---------- shell ---------- */
function shell(inner, active) {
  app.innerHTML = `<header class="top"><a class="brand" href="#/">QCAA <span>Physics</span> Hub</a>
    <nav><a href="#/" class="${active === 'home' ? 'on' : ''}">Topics</a><a href="#/exams" class="${active === 'exams' ? 'on' : ''}">Past papers</a><a href="#/exam-mode" class="${active === 'emode' ? 'on' : ''}">Exam mode</a><a href="#/practice" class="${active === 'practice' ? 'on' : ''}">Mixed practice</a><a href="#/formulas" class="${active === 'formulas' ? 'on' : ''}">Formulas</a></nav></header>
    <main>${inner}</main><footer>Units 3 & 4 · built for external exam revision · progress is saved in this browser · <a href="#" id="reset-all">Reset all progress</a></footer>`;
  const ra = document.getElementById('reset-all');
  if (ra) ra.onclick = e => { e.preventDefault(); if (confirm('Reset ALL progress (quick checks, past papers, exam mode)? This cannot be undone.')) { prog = {}; save(); route(); } };
  window.scrollTo(0, 0);
}

/* ---------- home ---------- */
function home() {
  const everyQ = [...allQ(), ...EX], total = everyQ.length, done = everyQ.filter(q => prog[q.id] === 1).length;
  let h = `<section class="hero"><h1>Learn it. Play with it. Test it.</h1><p>Every topic has a short lesson, an interactive simulation you can break, quick checks, and <b>real QCAA exam questions (2020–2025)</b> with the official marking guides. You've got <b>${done}</b> of <b>${total}</b> questions.</p><p><a class="btn" style="display:inline-block;padding:9px 16px;border-radius:8px;background:var(--acc);color:#1a1200;font-weight:700" href="#/exams">Open past papers →</a></p></section>`;
  [3, 4].forEach(u => {
    h += `<div class="unit-h"><h2 style="margin:0">${UNITS[u].name}</h2><small>${UNITS[u].title}</small></div><div class="grid">`;
    TOPICS.filter(t => t.unit === u).forEach(t => {
      const p = topicPct(t);
      h += `<a class="tcard" href="#/t/${t.id}"><div class="ic">${t.icon}</div><h3>${t.title}</h3><p>${t.blurb}</p><div class="bar"><i style="width:${p}%"></i></div><div class="small">${p}% mastered · ${t.quiz.length} quick + ${exOf(t.id).length} exam questions</div></a>`;
    });
    h += '</div>';
  });
  shell(h, 'home');
}

/* ---------- topic ---------- */
function topicPage(id, tab = 'learn') {
  const t = byId(id); if (!t) return home();
  const idx = TOPICS.indexOf(t), prev = TOPICS[idx - 1], next = TOPICS[idx + 1];
  shell(`<a href="#/" class="mut">← All topics</a><h1>${t.icon} ${t.title}</h1><p class="mut">${UNITS[t.unit].name} · ${t.blurb}</p>
    <div class="tabs"><button data-t="learn">1 · Learn</button><button data-t="sim">2 · Simulate</button><button data-t="practice">3 · Practice</button></div><div id="pane"></div>
    <div style="display:flex;justify-content:space-between;margin-top:40px">${prev ? `<a href="#/t/${prev.id}">← ${prev.title}</a>` : '<span></span>'}${next ? `<a href="#/t/${next.id}">${next.title} →</a>` : ''}</div>`);
  const pane = $('#pane');
  const show = which => {
    if (stopSim) { stopSim(); stopSim = null; }
    document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === which));
    if (which === 'learn') {
      pane.innerHTML = `<div class="box key"><b class="t">By the end you can</b><ul>${t.objectives.map(o => `<li>${o}</li>`).join('')}</ul></div>` +
        t.sections.map(s => `<h2>${s.h}</h2>${s.body}`).join('') +
        `<h2>Formula summary</h2><table class="fs">${t.formulas.map(f => `<tr><td><b>${f[0]}</b></td><td>${f[1]}</td></tr>`).join('')}</table>
         <p><button class="btn" id="go-sim">Next: try the simulation →</button></p>`;
      $('#go-sim').onclick = () => show('sim');
    } else if (which === 'sim') {
      pane.innerHTML = `<h2>Interactive simulation</h2><div id="sim"></div>${t.id === 'induction' ? '<h2>EM wave simulation</h2><div id="sim2"></div>' : ''}<div class="box tip"><b class="t">Things to try</b><ul class="explore">${t.explore.map(e => `<li>${e}</li>`).join('')}</ul></div><p><button class="btn" id="go-pr">Next: practice questions →</button></p>`;
      const s1 = SIMS[SIMKEY[t.id]]($('#sim')), s2 = t.id === 'induction' ? SIMS.emwave($('#sim2')) : null;
      stopSim = () => { s1(); s2 && s2(); };
      $('#go-pr').onclick = () => show('practice');
    } else {
      pane.innerHTML = `<h2>Quick checks</h2><p class="mut">Numerical answers: use the units shown. Scientific notation like <code>4.22e7</code> or <code>4.22x10^7</code> works.</p><div id="qs"></div>
        <h2>Real QCAA exam questions (${exOf(t.id).length})</h2><p class="mut">Questions from the 2020–2025 external assessments, tagged to this topic. Multiple choice is checked against the official answers; for written questions, attempt on paper first, then open the official marking guide and score yourself.</p><div id="exq"></div>`;
      renderQuiz($('#qs'), t.quiz, () => { });
      examList($('#exq'), { topic: t.id }, true);
    }
    window.scrollTo({ top: $('.tabs').offsetTop - 60 });
  };
  document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => show(b.dataset.t));
  show(tab);
}

/* ---------- quiz engine ---------- */
function renderQuiz(root, qs, onDone) {
  root.innerHTML = '';
  qs.forEach((q, i) => {
    const el = document.createElement('div'); el.className = 'q';
    el.innerHTML = `<div class="qn">Question ${i + 1}${q.mine ? ' · yours' : ''} · ${q.type === 'num' ? 'numerical' : 'multiple choice'}</div><p>${q.q}</p>${q.img ? `<img src="${q.img}" alt="diagram">` : ''}<div class="ans"></div><div class="sol"></div>`;
    const ans = $('.ans', el), sol = $('.sol', el);
    const reveal = ok => {
      el.classList.remove('ok', 'bad'); el.classList.add(ok ? 'ok' : 'bad');
      sol.classList.add('show');
      sol.innerHTML = `<div class="v" style="color:var(${ok ? '--grn' : '--red'})">${ok ? '✔ Correct' : '✘ Not quite'}</div>${q.explain}`;
      prog[q.id] = ok ? 1 : 0; save(); onDone();
    };
    if (q.type === 'mc') {
      q.options.forEach((o, j) => {
        const b = document.createElement('button'); b.className = 'opt'; b.innerHTML = `<b>${'ABCD'[j]}.</b> ${o}`;
        b.onclick = () => {
          ans.querySelectorAll('.opt').forEach((x, k) => { x.disabled = true; if (k === q.answer) x.classList.add('right'); });
          if (j !== q.answer) b.classList.add('wrong');
          reveal(j === q.answer);
        };
        ans.append(b);
      });
    } else {
      ans.innerHTML = `<div class="numin"><input type="text" inputmode="decimal" placeholder="your answer"><span>${q.unit || ''}</span><button class="btn">Check</button><button class="btn ghost">Show solution</button></div>`;
      const inp = $('input', ans), [chk, show] = ans.querySelectorAll('button');
      const check = () => {
        const n = parseNum(inp.value);
        if (n === null) { inp.style.borderColor = 'var(--red)'; return; }
        inp.style.borderColor = '';
        const ok = Math.abs(n - q.answer) <= Math.abs(q.answer) * (q.tol || 0.02);
        reveal(ok);
        if (!ok) sol.innerHTML += `<p class="mut">You entered ${inp.value}. Check units, rounding, and each step against the solution above.</p>`;
      };
      chk.onclick = check; inp.onkeydown = e => { if (e.key === 'Enter') check(); };
      show.onclick = () => { sol.classList.add('show'); sol.innerHTML = `<div class="v">Worked solution</div>${q.explain}`; };
    }
    root.append(el);
  });
}


/* ---------- past exam questions ---------- */
function examList(root, filter = {}, fixedTopic = false) {
  const st = { year: filter.year || '', type: filter.type || '', topic: filter.topic || '' };
  root.innerHTML = `<div class="filters"></div><div class="sum"></div><div class="list"></div>`;
  const bar = $('.filters', root), sum = $('.sum', root), list = $('.list', root);
  const sel = (key, label, opts) => `<label>${label}<select data-k="${key}">${opts.map(o => `<option value="${o[0]}" ${st[key] === o[0] ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></label>`;
  bar.innerHTML = sel('year', 'Year', [['', 'All years'], ...[2025, 2024, 2023, 2022, 2021, 2020].map(y => [String(y), y])]) +
    sel('type', 'Type', [['', 'All'], ['mc', 'Multiple choice'], ['p1', 'Paper 1 short response'], ['p2', 'Paper 2 extended response']]) +
    (fixedTopic ? '' : sel('topic', 'Topic', [['', 'All topics'], ...TOPICS.map(t => [t.id, t.title])]));
  bar.onchange = e => { st[e.target.dataset.k] = e.target.value; draw(); };
  function draw() {
    const qs = EX.filter(e => (!st.year || String(e.y) === st.year) && (!st.type || e.p === st.type) && (!st.topic || e.t === st.topic))
      .sort((a, b) => b.y - a.y || ['mc', 'p1', 'p2'].indexOf(a.p) - ['mc', 'p1', 'p2'].indexOf(b.p) || a.q - b.q);
    const done = qs.filter(q => prog[q.id] !== undefined), good = qs.filter(q => prog[q.id] === 1);
    const marks = qs.reduce((s, q) => s + (q.m || 1), 0);
    sum.innerHTML = `<p class="mut">${qs.length} questions · ${marks} marks · <span class="cnt">attempted <b>${done.length}</b> · fully correct <b>${good.length}</b></span> &nbsp; <button class="btn ghost" id="rs-set">Reset these ${qs.length} questions</button></p>`;
    const rs = $('#rs-set', sum); if (rs) rs.onclick = () => { if (confirm(`Clear your answers for these ${qs.length} questions?`)) { qs.forEach(q => delete prog[q.id]); save(); draw(); } };
    list.innerHTML = '';
    if (!qs.length) list.innerHTML = '<p class="mut">No questions match.</p>';
    qs.forEach(q => list.append(examCard(q, () => draw0())));
    function draw0() { const a = qs.filter(x => prog[x.id] !== undefined).length, g = qs.filter(x => prog[x.id] === 1).length; const c = $('.cnt', sum); if (c) c.innerHTML = `attempted <b>${a}</b> · fully correct <b>${g}</b>`; }
  }
  draw();
}

function examCard(q, onChange) {
  const el = document.createElement('div'); el.className = 'q';
  const label = `Question ${q.q}`;
  el.innerHTML = `<div class="qn">${q.y} · ${PAPER[q.p]} · ${label}${q.p !== 'mc' ? ` · ${q.m ? q.m + ' marks' : ''}` : ''}</div><img class="eximg" data-p="${q.img}" alt="${q.y} exam question"><div class="ans"></div><div class="sol"></div>`;
  const ans = $('.ans', el), sol = $('.sol', el);
  const paint = () => { el.classList.remove('ok', 'bad'); if (prog[q.id] === 1) el.classList.add('ok'); else if (prog[q.id] === 0) el.classList.add('bad'); };
  if (q.p === 'mc') {
    const row = document.createElement('div'); row.className = 'abcd';
    'ABCD'.split('').forEach((L, j) => {
      const b = document.createElement('button'); b.className = 'opt letter'; b.textContent = L;
      b.onclick = () => {
        row.querySelectorAll('button').forEach((x, k) => { x.disabled = true; if (k === q.a) x.classList.add('right'); });
        if (j !== q.a) b.classList.add('wrong');
        prog[q.id] = j === q.a ? 1 : 0; save(); paint();
        sol.classList.add('show'); sol.innerHTML = `<div class="v" style="color:var(${j === q.a ? '--grn' : '--red'})">${j === q.a ? '✔ Correct' : '✘ Not quite'} — official answer: <b>${L === 'ABCD'[q.a] ? L : 'ABCD'[q.a]}</b></div>`;
        onChange();
      };
      row.append(b);
    });
    ans.append(row);
    if (prog[q.id] !== undefined) paint();
  } else {
    ans.innerHTML = `<button class="btn ghost rv">Show official marking guide</button>`;
    $('.rv', ans).onclick = e => {
      e.target.remove();
      sol.classList.add('show');
      sol.innerHTML = `<div class="v">Official marking guide &amp; sample response</div>${q.mg ? `<img class="eximg" data-p="${q.mg}" alt="marking guide">` : '<p class="mut">No marking guide found.</p>'}<div class="v" style="margin-top:10px">How did you go?</div><div class="grade"><button class="btn" data-g="1">Full marks</button><button class="btn ghost" data-g="0.5">Part marks</button><button class="btn ghost" data-g="0">Missed it</button></div>`;
      sol.querySelectorAll('.grade button').forEach(b => b.onclick = () => { prog[q.id] = +b.dataset.g === 0.5 ? 0 : +b.dataset.g; save(); paint(); sol.querySelectorAll('.grade button').forEach(x => x.classList.add('ghost')); b.classList.remove('ghost'); onChange(); });
    };
  }
  const again = document.createElement('button'); again.className = 'btn ghost'; again.textContent = '↺ Try again'; again.style.marginTop = '8px';
  again.onclick = () => { delete prog[q.id]; save(); const n = examCard(q, onChange); el.replaceWith(n); onChange(); };
  el.append(again);
  return el;
}

function examsPage(p = {}) {
  shell(`<h1>Past exam papers</h1><p class="mut">All QCAA external assessments 2020–2025: 120 multiple-choice, 40 short-response and 54 extended-response questions with official answers and marking guides. Filter by topic to drill weak spots, or by year to sit a whole paper.</p><div id="ex"></div>`, 'exams');
  examList($('#ex'), p);
}


/* ---------- exam mode (perusal + timed writing) ---------- */
let examTimer = null;
const fmt = sec => { sec = Math.max(0, Math.ceil(sec)); return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`; };
function examMode() {
  const years = [2025, 2024, 2023, 2022, 2021, 2020];
  shell(`<h1>Exam mode</h1><p class="mut">Sit a real QCAA paper under timed conditions. Multiple choice is answered on screen; for written questions, work on paper like the real exam. Nothing is marked until you finish.</p>
    <div class="box"><div class="filters">
      <label>Year<select id="em-y">${years.map(y => `<option>${y}</option>`).join('')}</select></label>
      <label>Paper<select id="em-p"><option value="1">Paper 1 – Multiple choice + short response</option><option value="2">Paper 2 – Extended response</option></select></label>
      <label>Perusal (min)<select id="em-per"><option>0</option><option selected>5</option><option>10</option></select></label>
      <label>Working time (min)<select id="em-w"><option>90</option><option>60</option><option>45</option></select></label>
    </div><p><button class="btn" id="em-go">Start exam →</button></p>
    <p class="mut" style="font-size:13px">Tip: have a calculator and the QCAA formula &amp; data book open, plus plenty of paper. The real exam has 10 minutes perusal — you can pick that above.</p></div>`, 'emode');
  $('#em-go').onclick = () => {
    const y = +$('#em-y').value, paper = $('#em-p').value;
    const qs = EX.filter(e => e.y === y && (paper === '1' ? e.p !== 'p2' : e.p === 'p2')).sort((a, b) => ['mc', 'p1', 'p2'].indexOf(a.p) - ['mc', 'p1', 'p2'].indexOf(b.p) || a.q - b.q);
    runExam({ y, paper, qs, per: +$('#em-per').value * 60, work: +$('#em-w').value * 60 });
  };
}

function runExam(cfg) {
  const picks = {}; let phase = cfg.per > 0 ? 'perusal' : 'writing';
  const total = cfg.qs.reduce((s, q) => s + (q.m || 1), 0);
  let end = Date.now() + (phase === 'perusal' ? cfg.per : cfg.work) * 1000;
  shell(`<div class="timebar" id="tb"><div><b id="tb-phase"></b><span class="mut" id="tb-sub"></span></div><div class="clock" id="tb-clock">00:00</div><div><button class="btn ghost" id="tb-skip"></button> <button class="btn" id="tb-fin" style="display:none">Finish &amp; mark</button></div></div>
    <h1 style="margin-top:14px">${cfg.y} Physics – Paper ${cfg.paper}</h1><p class="mut">${cfg.qs.length} questions · ${total} marks</p><div id="paper"></div>`, 'emode');
  const paper = $('#paper');
  cfg.qs.forEach(q => {
    const el = document.createElement('div'); el.className = 'q';
    el.innerHTML = `<div class="qn">${q.p === 'mc' ? 'Multiple choice' : q.p === 'p1' ? 'Short response' : 'Extended response'} · Question ${q.q}${q.p !== 'mc' && q.m ? ' · ' + q.m + ' marks' : ''}</div><img class="eximg" data-p="${q.img}" alt="question"><div class="ans"></div>`;
    paper.append(el);
    const ans = $('.ans', el);
    if (q.p === 'mc') {
      const row = document.createElement('div'); row.className = 'abcd';
      'ABCD'.split('').forEach((L, j) => { const b = document.createElement('button'); b.className = 'opt letter'; b.textContent = L; b.onclick = () => { if (phase !== 'writing') return; picks[q.id] = j; row.querySelectorAll('button').forEach((x, k) => x.classList.toggle('sel', k === j)); }; row.append(b); });
      ans.append(row);
    }
  });
  const tbClock = $('#tb-clock'), tbPhase = $('#tb-phase'), tbSub = $('#tb-sub'), skip = $('#tb-skip'), fin = $('#tb-fin'), tb = $('#tb');
  const setPhase = () => {
    paper.classList.toggle('locked', phase === 'perusal');
    if (phase === 'perusal') { tbPhase.textContent = 'PERUSAL'; tbSub.textContent = ' — read only, no writing'; skip.textContent = 'Start writing now'; fin.style.display = 'none'; }
    else { tbPhase.textContent = 'WRITING TIME'; tbSub.textContent = ''; skip.style.display = 'none'; fin.style.display = ''; }
  };
  setPhase();
  const startWriting = () => { phase = 'writing'; end = Date.now() + cfg.work * 1000; setPhase(); window.scrollTo(0, 0); beep(); };
  skip.onclick = startWriting;
  const finish = () => { clearInterval(examTimer); examTimer = null; markExam(cfg, picks); };
  fin.onclick = () => { if (confirm('Finish and mark the paper now?')) finish(); };
  clearInterval(examTimer);
  examTimer = setInterval(() => {
    const left = (end - Date.now()) / 1000;
    tbClock.textContent = fmt(left);
    tb.classList.toggle('warn', phase === 'writing' && left <= 600);
    tb.classList.toggle('crit', phase === 'writing' && left <= 300);
    if (left <= 0) { beep(); if (phase === 'perusal') startWriting(); else finish(); }
  }, 250);
}
function beep() { try { const c = new (window.AudioContext || window.webkitAudioContext)(), o = c.createOscillator(); o.frequency.value = 880; o.connect(c.destination); o.start(); setTimeout(() => { o.stop(); c.close(); }, 400); } catch (e) { /* no audio */ } }

function markExam(cfg, picks) {
  const mcs = cfg.qs.filter(q => q.p === 'mc'), wr = cfg.qs.filter(q => q.p !== 'mc');
  const mcScore = mcs.filter(q => picks[q.id] === q.a).length;
  const got = {}; const wTotal = wr.reduce((s, q) => s + (q.m || 1), 0);
  shell(`<h1>${cfg.y} Paper ${cfg.paper} – results</h1><div class="box key" id="score"></div>
    ${mcs.length ? `<h2>Multiple choice: <span id="mcs">${mcScore}</span> / ${mcs.length}</h2><div id="mcr"></div>` : ''}
    ${wr.length ? `<h2>Written questions</h2><p class="mut">Open each marking guide, mark your paper answer honestly and enter the marks you earned.</p><div id="wr"></div>` : ''}
    <p><button class="btn" id="retake">↺ Retake this paper</button> &nbsp; <a class="btn ghost" style="display:inline-block;text-decoration:none" href="#/exam-mode">Sit another paper</a></p>`, 'emode');
  $('#retake').onclick = () => { cfg.qs.forEach(q => delete prog[q.id]); save(); runExam(cfg); };
  const upd = () => { const w = Object.values(got).reduce((s, v) => s + v, 0); $('#score').innerHTML = `<b class="t">Total</b><span style="font-size:1.8rem;font-weight:800">${mcScore + w}</span> / ${mcs.length + wTotal} marks &nbsp; <span class="mut">(${Math.round(100 * (mcScore + w) / (mcs.length + wTotal))}%) — written marks counted so far: ${Object.keys(got).length}/${wr.length} questions</span>`; };
  upd();
  mcs.forEach(q => {
    const ok = picks[q.id] === q.a; prog[q.id] = ok ? 1 : 0;
    const el = document.createElement('div'); el.className = 'q ' + (ok ? 'ok' : 'bad');
    el.innerHTML = `<div class="qn">Question ${q.q} · you: <b>${picks[q.id] === undefined ? '—' : 'ABCD'[picks[q.id]]}</b> · correct: <b>${'ABCD'[q.a]}</b></div><img class="eximg" data-p="${q.img}" alt="">`;
    $('#mcr').append(el);
  });
  wr.forEach(q => {
    const m = q.m || 1, el = document.createElement('div'); el.className = 'q';
    el.innerHTML = `<div class="qn">Question ${q.q} · ${m} marks</div><img class="eximg" data-p="${q.img}" alt=""><button class="btn ghost rv">Show marking guide</button><div class="sol"></div>`;
    $('#wr').append(el);
    $('.rv', el).onclick = e => { e.target.remove(); const sol = $('.sol', el); sol.classList.add('show'); sol.innerHTML = `${q.mg ? `<img class="eximg" data-p="${q.mg}" alt="">` : ''}<label>Marks you earned: <input type="number" min="0" max="${m}" class="mk" style="width:70px;background:var(--card2);color:var(--fg);border:1px solid var(--line);border-radius:6px;padding:5px"> / ${m}</label>`;
      $('.mk', sol).oninput = ev => { const v = Math.max(0, Math.min(m, +ev.target.value || 0)); got[q.id] = v; prog[q.id] = v >= m ? 1 : 0; save(); upd(); }; };
  });
  save();
}

/* ---------- mixed practice ---------- */
function practice() {
  const pool = EX.filter(e => e.p === 'mc').sort(() => Math.random() - 0.5).slice(0, 10);
  shell(`<h1>Mixed practice</h1><p class="mut">Ten random real exam multiple-choice questions from all topics. <a href="#/practice" id="again">Shuffle again</a></p><div id="qs"></div>`, 'practice');
  $('#again').onclick = e => { e.preventDefault(); practice(); };
  pool.forEach(q => $('#qs').append(examCard(q, () => { })));
}

/* ---------- formula sheet ---------- */
function formulas() {
  shell(`<h1>Formula & constants summary</h1><p class="mut">Always check against the official QCAA formula and data sheet — this page is a quick revision aid built from the lessons.</p>` +
    TOPICS.map(t => `<h2>${t.icon} ${t.title}</h2><table class="fs">${t.formulas.map(f => `<tr><td><b>${f[0]}</b></td><td>${f[1]}</td></tr>`).join('')}</table>`).join(''), 'formulas');
}

/* ---------- router ---------- */
function route() {
  if (stopSim) { stopSim(); stopSim = null; }
  if (examTimer) { clearInterval(examTimer); examTimer = null; }
  const h = location.hash.replace(/^#\/?/, '').split('/');
  if (h[0] === 't' && h[1]) topicPage(h[1]);
  else if (h[0] === 'exam-mode') examMode();
  else if (h[0] === 'exams') examsPage();
  else if (h[0] === 'practice') practice();
  else if (h[0] === 'formulas') formulas();
  else home();
}
window.addEventListener('hashchange', route);
route();
