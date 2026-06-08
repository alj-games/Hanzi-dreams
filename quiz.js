/* ============================================================================
   HANZI DREAMS — MATCH-UP MINI-GAME  (add-on module)  🌟
   ============================================================================
   A cozy pairs / memory game. Flip cards to match each character with its
   pinyin or its meaning. Earn little stars into a "star jar" that grows over
   time. No timers, no pressure — just matching and sparkles.

   HOW TO ADD IT TO YOUR APP
   -------------------------
   1. Put this file (quiz.js) in the SAME folder as index.html and
      hanzi-database.js.
   2. Open index.html and find this line near the very bottom:

          <script src="hanzi-database.js"></script>

      Add ONE new line right AFTER it:

          <script src="quiz.js"></script>

   That's it! A "🎮 Play Match-Up" button appears at the top of your app.
   This file doesn't change anything else — it adds its own button, screen and
   styles, reads your existing characters, and even borrows your colour theme.
   ============================================================================ */

(function () {
  "use strict";

  // The character data is already loaded by hanzi-database.js (window.hanziDatabase)
  const DB = (window.hanziDatabase || []);
  if (!DB.length) { console.warn("Match-Up: no characters found."); return; }

  /* ---------- tiny persistent helpers ---------- */
  const STAR_KEY = "hanzi_starjar";
  const MUTE_KEY = "hanzi_quiz_muted";
  let starJar = parseInt(localStorage.getItem(STAR_KEY) || "0", 10) || 0;
  let muted = localStorage.getItem(MUTE_KEY) === "1";
  const saveStars = () => localStorage.setItem(STAR_KEY, String(starJar));

  /* ---------- settings (chosen each round) ---------- */
  let matchType = "pinyin";   // 'pinyin' | 'meaning'
  let category  = "All";
  let pairCount = 6;          // 6 = cozy, 8 = challenge

  /* ---------- game state ---------- */
  let cards = [];             // {id, role, display, tone, matched, flipped}
  let flipped = [];           // indices currently face-up & unresolved
  let lock = false;
  let moves = 0;
  let matchesMade = 0;

  /* =========================================================================
     STYLES  (uses your app's CSS variables, with safe fallbacks)
     ========================================================================= */
  const css = `
  #qOverlay {
    display: none; position: fixed; inset: 0; z-index: 80;
    background: var(--bg, linear-gradient(160deg,#ffe3f1,#f4e2ff,#e6e9ff,#dcf2ff));
    overflow-y: auto; -webkit-overflow-scrolling: touch;
    font-family: "Fredoka", sans-serif; color: var(--ink, #5f4f73);
  }
  #qOverlay.open { display: block; }
  #qOverlay::before {
    content: ""; position: fixed; inset: 0; pointer-events: none;
    background-image:
      radial-gradient(2px 2px at 15% 20%, #fff 50%, transparent 51%),
      radial-gradient(2px 2px at 80% 15%, #fff 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 40% 70%, #fff 50%, transparent 51%),
      radial-gradient(2.5px 2.5px at 65% 50%, #fff7fc 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 88% 78%, #fff 50%, transparent 51%);
    opacity: .6; animation: qtwinkle 5s ease-in-out infinite alternate;
  }
  @keyframes qtwinkle { from{opacity:.3} to{opacity:.8} }

  .q-wrap { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; padding: 22px 16px 60px; }

  .q-top { display:flex; align-items:center; justify-content:space-between; margin-bottom: 14px; gap: 10px; }
  .q-title { font-family:"Baloo 2", cursive; font-weight:700; font-size: clamp(1.8rem,7vw,2.6rem);
    background: linear-gradient(100deg, var(--pink,#ffb3d1), var(--lilac,#d6c2ff) 55%, var(--blue,#aed6ff));
    -webkit-background-clip:text; background-clip:text; color:transparent; }
  .q-jar { font-weight:600; background: var(--card-strong, rgba(255,255,255,.92)); padding:8px 16px; border-radius:999px;
    box-shadow: var(--shadow, 0 14px 30px rgba(180,140,200,.2)); white-space:nowrap; }
  .q-jar b { color: var(--tone2,#ff9e57); }

  .q-btn { border:none; cursor:pointer; font-family:"Fredoka",sans-serif; font-weight:500; font-size:1rem;
    color: var(--ink,#5f4f73); padding:11px 20px; border-radius:999px;
    background: var(--card-strong, rgba(255,255,255,.92)); box-shadow: var(--shadow, 0 14px 30px rgba(180,140,200,.2));
    transition: transform .2s ease, box-shadow .2s ease; display:inline-flex; align-items:center; gap:8px; }
  .q-btn:hover { transform: translateY(-2px); }
  .q-btn:active { transform: translateY(0); }
  .q-btn.primary { background: linear-gradient(120deg, var(--pink,#ffb3d1), var(--lilac,#d6c2ff)); color:#fff; }
  .q-btn.round { width:46px; height:46px; padding:0; border-radius:50%; justify-content:center; font-size:1.2rem; }

  .q-panel { background: var(--card, rgba(255,255,255,.74)); border:1px solid var(--stroke, rgba(255,255,255,.75));
    border-radius: var(--radius,26px); box-shadow: var(--shadow,0 14px 30px rgba(180,140,200,.2)); padding:20px; margin-bottom:16px; }
  .q-panel h3 { font-family:"Baloo 2",cursive; font-weight:600; font-size:1.05rem; margin-bottom:12px; }
  .q-chips { display:flex; gap:9px; flex-wrap:wrap; }
  .q-chip { cursor:pointer; user-select:none; font-size:.92rem; font-weight:500; color: var(--ink,#5f4f73);
    padding:8px 15px; border-radius:999px; background: rgba(255,255,255,.7);
    border:1px solid var(--stroke, rgba(255,255,255,.75)); transition: transform .15s ease; }
  .q-chip:hover { transform: translateY(-2px); }
  .q-chip.active { background: linear-gradient(120deg, var(--pink,#ffb3d1), var(--lilac,#d6c2ff)); color:#fff; border-color:transparent; }

  .q-start { text-align:center; margin-top: 10px; }
  .q-start .q-btn { font-size:1.2rem; padding:15px 40px; }

  /* ---- board ---- */
  .q-board { display:grid; gap:12px; margin-top: 6px; }
  .q-board.cols3 { grid-template-columns: repeat(3, 1fr); }
  .q-board.cols4 { grid-template-columns: repeat(4, 1fr); }

  .qcard { perspective: 900px; aspect-ratio: 3/4; cursor:pointer; }
  .qcard-inner { position:relative; width:100%; height:100%; transition: transform .45s cubic-bezier(.4,.2,.2,1); transform-style: preserve-3d; }
  .qcard.flipped .qcard-inner, .qcard.matched .qcard-inner { transform: rotateY(180deg); }
  .qface { position:absolute; inset:0; -webkit-backface-visibility:hidden; backface-visibility:hidden;
    border-radius: var(--radius-sm, 18px); display:flex; align-items:center; justify-content:center; text-align:center;
    box-shadow: var(--shadow, 0 14px 30px rgba(180,140,200,.2)); padding:6px; overflow:hidden; }
  .qback { background: linear-gradient(140deg, var(--pink,#ffb3d1), var(--lilac,#d6c2ff) 60%, var(--blue,#aed6ff)); color:#fff; font-size:1.7rem; }
  .qfront { background: var(--card-strong, rgba(255,255,255,.94)); transform: rotateY(180deg); border:1px solid var(--stroke, rgba(255,255,255,.75)); }
  .qfront .qchar { font-family:"Noto Sans SC", serif; font-size: clamp(1.8rem, 9vw, 3rem); color: var(--ink,#5f4f73); }
  .qfront .qtext { font-weight:500; font-size: clamp(.85rem, 4vw, 1.15rem); line-height:1.2; }
  .qcard.matched { cursor:default; }
  .qcard.matched .qfront { background: linear-gradient(140deg, #ffffff, var(--mint,#bdf0dd)); }
  .qcard.matched .qfront::after { content:"⭐"; position:absolute; top:5px; right:7px; font-size:.9rem; animation: qpop .5s ease; }
  @keyframes qpop { 0%{transform:scale(0)} 70%{transform:scale(1.4)} 100%{transform:scale(1)} }
  .qcard.wrong .qfront { animation: qshake .4s ease; }
  @keyframes qshake { 0%,100%{transform:rotateY(180deg) translateX(0)} 25%{transform:rotateY(180deg) translateX(-5px)} 75%{transform:rotateY(180deg) translateX(5px)} }

  .qt1{color:var(--tone1,#ff6fae)} .qt2{color:var(--tone2,#ff9e57)} .qt3{color:var(--tone3,#4aa8f0)}
  .qt4{color:var(--tone4,#a987ff)} .qt5{color:var(--tone5,#9aa0b5)}

  .q-progress { text-align:center; color: var(--ink-soft,#9d92b4); margin: 14px 0 4px; font-size:.95rem; }
  .q-progress b { color: var(--tone2,#ff9e57); }

  /* ---- win celebration ---- */
  #qWin { display:none; position:fixed; inset:0; z-index:90; align-items:center; justify-content:center;
    background: rgba(120,100,150,.4); backdrop-filter: blur(5px); padding:20px; }
  #qWin.open { display:flex; }
  .q-win-card { position:relative; z-index:2; background: var(--card-strong, rgba(255,255,255,.95)); border-radius: var(--radius,26px);
    box-shadow: var(--shadow-lg, 0 22px 50px rgba(170,130,200,.26)); padding:34px 28px; text-align:center; max-width:380px; width:100%; animation: qpopin .4s ease; }
  @keyframes qpopin { from{transform:scale(.85); opacity:0} to{transform:scale(1); opacity:1} }
  .q-win-card h2 { font-family:"Baloo 2",cursive; font-weight:700; font-size:1.8rem; margin-bottom:6px;
    background: linear-gradient(100deg, var(--pink,#ffb3d1), var(--lilac,#d6c2ff)); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .q-win-stars { font-size:2.6rem; margin:10px 0; }
  .q-win-earned { font-size:1.2rem; font-weight:600; color: var(--ink,#5f4f73); }
  .q-win-earned b { color: var(--tone2,#ff9e57); }
  .q-win-jar { color: var(--ink-soft,#9d92b4); margin-top:6px; }
  .q-win-btns { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:20px; }

  .q-fall { position:fixed; top:-40px; z-index:1; font-size:1.6rem; pointer-events:none; animation: qfall linear forwards; }
  @keyframes qfall { to { transform: translateY(110vh) rotate(360deg); opacity:.2; } }

  @media (max-width:480px){ .q-board { gap:9px; } .q-panel { padding:16px; } }
  `;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* =========================================================================
     DOM  (launch button + overlay)
     ========================================================================= */
  // Launch button — tuck it into the existing toolbar, or float it if not found
  const launchBtn = document.createElement("button");
  launchBtn.className = "btn btn-primary";
  launchBtn.innerHTML = "🎮 Play Match-Up";
  launchBtn.onclick = openMenu;
  const toolbar = document.querySelector(".toolbar");
  if (toolbar) {
    toolbar.appendChild(launchBtn);
  } else {
    launchBtn.style.cssText = "position:fixed;bottom:20px;right:20px;z-index:40;";
    document.body.appendChild(launchBtn);
  }

  const overlay = document.createElement("div");
  overlay.id = "qOverlay";
  overlay.innerHTML = `
    <div class="q-wrap">
      <div class="q-top">
        <div class="q-title">Match-Up ✨</div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button class="q-btn round" id="qMute" title="Sound on/off"></button>
          <button class="q-btn round" id="qClose" title="Close">✕</button>
        </div>
      </div>
      <div class="q-jar" style="display:inline-block; margin-bottom:16px;">⭐ Star jar: <b id="qJarCount">0</b></div>

      <!-- SETUP -->
      <div id="qSetup">
        <div class="q-panel">
          <h3>Match…</h3>
          <div class="q-chips" id="qTypeChips"></div>
        </div>
        <div class="q-panel">
          <h3>Pull characters from…</h3>
          <div class="q-chips" id="qCatChips"></div>
        </div>
        <div class="q-panel">
          <h3>Board size</h3>
          <div class="q-chips" id="qSizeChips"></div>
        </div>
        <div class="q-start">
          <button class="q-btn primary" id="qStartBtn">Start ✨</button>
        </div>
      </div>

      <!-- GAME -->
      <div id="qGame" style="display:none;">
        <div class="q-progress">Matched <b id="qMatched">0</b> / <span id="qTotal">0</span></div>
        <div class="q-board" id="qBoard"></div>
        <div class="q-start"><button class="q-btn" id="qQuit">← Back to setup</button></div>
      </div>
    </div>

    <!-- WIN -->
    <div id="qWin">
      <div class="q-win-card">
        <h2>Beautiful! 🌸</h2>
        <div class="q-win-stars" id="qWinStars">⭐⭐⭐</div>
        <div class="q-win-earned">+<b id="qEarned">0</b> stars</div>
        <div class="q-win-jar">Star jar: <b id="qWinJar">0</b> ⭐</div>
        <div class="q-win-btns">
          <button class="q-btn primary" id="qAgain">Play again</button>
          <button class="q-btn" id="qChange">Change settings</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // grab elements
  const el = (id) => document.getElementById(id);
  const qSetup = el("qSetup"), qGame = el("qGame"), qWin = el("qWin"), qBoard = el("qBoard");

  el("qClose").onclick = closeOverlay;
  el("qQuit").onclick = showSetup;
  el("qStartBtn").onclick = startGame;
  el("qAgain").onclick = () => { qWin.classList.remove("open"); startGame(); };
  el("qChange").onclick = () => { qWin.classList.remove("open"); showSetup(); };
  el("qMute").onclick = toggleMute;
  updateMuteBtn();

  /* =========================================================================
     SOUND  (gentle WebAudio blips — no files needed)
     ========================================================================= */
  let actx = null;
  function beep(freq, dur, type, vol) {
    if (muted) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type || "sine"; o.frequency.value = freq;
      o.connect(g); g.connect(actx.destination);
      const t = actx.currentTime;
      g.gain.setValueAtTime(vol || 0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.15));
      o.start(t); o.stop(t + (dur || 0.15));
    } catch (e) {}
  }
  const sFlip  = () => beep(430, 0.06, "sine", 0.03);
  const sMatch = () => { beep(660, 0.12, "sine", 0.06); setTimeout(() => beep(880, 0.14, "sine", 0.05), 90); };
  const sNo    = () => beep(240, 0.12, "sine", 0.04);
  const sWin   = () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, 0.2, "triangle", 0.05), i * 120));

  function toggleMute() { muted = !muted; localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); updateMuteBtn(); }
  function updateMuteBtn() { el("qMute").textContent = muted ? "🔕" : "🔔"; }

  /* =========================================================================
     SETUP SCREEN
     ========================================================================= */
  function openMenu() {
    refreshJar();
    buildTypeChips();
    buildCatChips();
    buildSizeChips();
    showSetup();
    overlay.classList.add("open");
  }
  function closeOverlay() { overlay.classList.add("closing"); overlay.classList.remove("open"); overlay.classList.remove("closing"); }
  function refreshJar() { el("qJarCount").textContent = starJar; }

  function showSetup() {
    qGame.style.display = "none";
    qSetup.style.display = "block";
  }

  function chip(label, active, onClick) {
    const c = document.createElement("div");
    c.className = "q-chip" + (active ? " active" : "");
    c.textContent = label;
    c.onclick = onClick;
    return c;
  }

  function buildTypeChips() {
    const wrap = el("qTypeChips"); wrap.innerHTML = "";
    [["pinyin", "Character ↔ Pinyin"], ["meaning", "Character ↔ Meaning"]].forEach(([val, lbl]) => {
      wrap.appendChild(chip(lbl, matchType === val, () => { matchType = val; buildTypeChips(); }));
    });
  }
  function buildCatChips() {
    const wrap = el("qCatChips"); wrap.innerHTML = "";
    const cats = ["All", ...Array.from(new Set(DB.map(c => c.category)))];
    cats.forEach(cat => wrap.appendChild(chip(cat, category === cat, () => { category = cat; buildCatChips(); })));
  }
  function buildSizeChips() {
    const wrap = el("qSizeChips"); wrap.innerHTML = "";
    [[6, "Cozy · 6 pairs"], [8, "Challenge · 8 pairs"]].forEach(([val, lbl]) => {
      wrap.appendChild(chip(lbl, pairCount === val, () => { pairCount = val; buildSizeChips(); }));
    });
  }

  /* =========================================================================
     BUILD & PLAY
     ========================================================================= */
  function cleanMeaning(m) {
    const stripped = m.replace(/\(.*?\)/g, "").split(/[;,]/)[0].trim();
    return stripped || m;
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  function startGame() {
    // pool of candidate characters
    let pool = DB.filter(c => category === "All" || c.category === category);

    // ensure the "partner" side is unique so a match is never ambiguous
    const seen = new Set();
    pool = shuffle(pool).filter(c => {
      const key = matchType === "pinyin" ? c.pinyin : cleanMeaning(c.meaning).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key); return true;
    });

    const n = Math.min(pairCount, pool.length);
    if (n < 2) { alert("Not enough characters in this set — try another category."); return; }

    const chosen = pool.slice(0, n);

    // build two cards per character: the character, and its partner (pinyin/meaning)
    cards = [];
    chosen.forEach(c => {
      cards.push({ id: c.char, role: "char", display: c.char, tone: c.tone, matched: false });
      cards.push({
        id: c.char, role: "partner", tone: c.tone, matched: false,
        display: matchType === "pinyin" ? c.pinyin : cleanMeaning(c.meaning)
      });
    });
    cards = shuffle(cards);

    flipped = []; lock = false; moves = 0; matchesMade = 0;

    // render
    qBoard.className = "q-board " + (n <= 6 ? "cols3" : "cols4");
    qBoard.innerHTML = "";
    cards.forEach((card, i) => qBoard.appendChild(renderCard(card, i)));

    el("qTotal").textContent = n;
    el("qMatched").textContent = "0";
    qSetup.style.display = "none";
    qGame.style.display = "block";
    overlay.scrollTop = 0;
  }

  function renderCard(card, i) {
    const wrap = document.createElement("div");
    wrap.className = "qcard";
    wrap.dataset.i = i;
    const inner = card.role === "char"
      ? `<span class="qchar">${escapeHtml(card.display)}</span>`
      : `<span class="qtext ${card.role === "partner" && matchType === "pinyin" ? "qt" + (card.tone || 5) : ""}">${escapeHtml(card.display)}</span>`;
    wrap.innerHTML = `
      <div class="qcard-inner">
        <div class="qface qback">☆</div>
        <div class="qface qfront">${inner}</div>
      </div>`;
    wrap.onclick = () => onFlip(i, wrap);
    return wrap;
  }

  function onFlip(i, wrap) {
    if (lock || cards[i].matched) return;
    if (flipped.includes(i)) return;
    if (flipped.length === 2) return;

    wrap.classList.add("flipped");
    flipped.push(i);
    sFlip();

    if (flipped.length === 2) {
      moves++;
      lock = true;
      const [a, b] = flipped;
      const isMatch = cards[a].id === cards[b].id && cards[a].role !== cards[b].role;
      if (isMatch) {
        setTimeout(() => {
          cards[a].matched = cards[b].matched = true;
          qBoard.children[a].classList.add("matched");
          qBoard.children[b].classList.add("matched");
          matchesMade++;
          el("qMatched").textContent = matchesMade;
          sMatch();
          flipped = []; lock = false;
          if (matchesMade === cards.length / 2) setTimeout(win, 500);
        }, 350);
      } else {
        qBoard.children[a].classList.add("wrong");
        qBoard.children[b].classList.add("wrong");
        sNo();
        setTimeout(() => {
          qBoard.children[a].classList.remove("flipped", "wrong");
          qBoard.children[b].classList.remove("flipped", "wrong");
          flipped = []; lock = false;
        }, 850);
      }
    }
  }

  /* =========================================================================
     WIN + REWARDS
     ========================================================================= */
  function win() {
    const pairs = cards.length / 2;
    const extra = moves - pairs;                       // perfect = 0 extra flips
    let bonus = extra <= 1 ? 3 : extra <= 3 ? 2 : extra <= 6 ? 1 : 0;
    const earned = pairs + bonus;

    starJar += earned;
    saveStars();
    refreshJar();

    el("qWinStars").textContent = "⭐".repeat(Math.max(1, Math.min(5, bonus + 2)));
    el("qEarned").textContent = earned;
    el("qWinJar").textContent = starJar;
    sWin();
    rainStars(22);
    qWin.classList.add("open");
  }

  function rainStars(count) {
    const symbols = ["⭐", "🌟", "✨", "💫"];
    for (let k = 0; k < count; k++) {
      const s = document.createElement("div");
      s.className = "q-fall";
      s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDuration = (1.8 + Math.random() * 1.8) + "s";
      s.style.animationDelay = (Math.random() * 0.5) + "s";
      s.style.fontSize = (1.1 + Math.random() * 1.4) + "rem";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 4200);
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  // Close on Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      if (qWin.classList.contains("open")) qWin.classList.remove("open");
      else closeOverlay();
    }
  });
})();
