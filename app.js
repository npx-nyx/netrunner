'use strict';

// ── Text corpus ───────────────────────────────────────────────

// Easy: randomised word pool — generates fresh text every run
const WORDS_EASY = [
  // high-frequency English — dark side of the dictionary
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his',
  'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'did',
  'its', 'let', 'put', 'say', 'she', 'too', 'use', 'run', 'hot', 'cut',
  'that', 'this', 'with', 'have', 'from', 'they', 'will', 'what', 'when',
  'been', 'much', 'some', 'time', 'long', 'down', 'into', 'over', 'just',
  'know', 'take', 'than', 'them', 'then', 'well', 'also', 'back', 'last',
  'make', 'only', 'come', 'here', 'like', 'look', 'more', 'name', 'next',
  'need', 'feel', 'find', 'hand', 'keep', 'left', 'live', 'move', 'show',
  'turn', 'walk', 'work', 'year', 'away', 'call', 'came', 'each', 'give',
  'hold', 'kind', 'lead', 'line', 'link', 'lose', 'lost', 'mean', 'mind',
  'open', 'part', 'past', 'plan', 'real', 'rest', 'road', 'room', 'same',
  'save', 'side', 'stay', 'stop', 'tell', 'true', 'wait', 'want', 'word',
  'zero', 'zone', 'even', 'once', 'while', 'these', 'those', 'there',
  'think', 'still', 'small', 'large', 'place', 'right', 'after', 'again',
  'never', 'light', 'world', 'night', 'point', 'first', 'three', 'often',
  'start', 'clean', 'close', 'clear', 'break', 'bring', 'build', 'check',
  'count', 'drive', 'enter', 'focus', 'force', 'front', 'going', 'ready',
  'reach', 'solid', 'sound', 'space', 'speed', 'stand', 'touch', 'track',
  'trust', 'watch', 'write', 'young', 'begin', 'other', 'could', 'every',
  // gritty and dark
  'dead', 'kill', 'fear', 'pain', 'dark', 'cold', 'void', 'fall', 'fail',
  'hate', 'rage', 'grim', 'risk', 'trap', 'prey', 'hunt', 'scar', 'dirt',
  'dust', 'rust', 'ruin', 'ash', 'fog', 'rot', 'slag', 'guts', 'rats',
  'debt', 'doom', 'dusk', 'burn', 'lies', 'fade', 'leak', 'harm', 'flaw',
  'haul', 'drag', 'drop', 'flee', 'fall', 'ache', 'bite', 'bleed', 'bury',
  // cyberpunk core
  'jack', 'chip', 'wire', 'data', 'code', 'deck', 'core', 'hack', 'scan',
  'node', 'byte', 'sync', 'grid', 'port', 'corp', 'edge', 'neon', 'ghost',
  'steel', 'black', 'chrome', 'cyber', 'rogue', 'spike', 'flash', 'shell',
  'pulse', 'surge', 'trace', 'drift', 'city', 'street', 'alley', 'block',
  'crew', 'deal', 'cash', 'lock', 'rig', 'blade', 'bolt', 'rush', 'link',
  'loop', 'ping', 'load', 'feed', 'mark', 'slot', 'rack', 'hard', 'soft',
  'fast', 'deep', 'high', 'wide', 'flat', 'junk', 'slum', 'smog', 'gang',
  'skin', 'meat', 'wire', 'gun', 'net', 'ice', 'burn', 'fix', 'scam',
];

// Medium: large sentence pool — picks 3–6 per run and joins them
const SENTENCES_MEDIUM = [
  // witty
  'The corpo smiled like he\'d already won, which meant you hadn\'t read the fine print yet.',
  'Night City doesn\'t break you — it repossesses your dignity in quarterly instalments.',
  'He died doing what he loved: absolutely nothing useful or heroic whatsoever.',
  'The difference between a fixer and a common thug is the quality of the suit and the size of the retainer.',
  'Three operatives went into the building; two came out; the third became a line item under "acceptable losses".',
  'She had a smile that could sell you your own kidneys and make you grateful for the bulk discount.',
  'Gonks buy luxury chrome they can\'t operate; veterans buy plain steel that won\'t kill them.',
  'The plan went sideways somewhere between "what could go wrong" and "oh — that could go wrong".',
  'Corporate espionage is just theft with a better dress code and a more expensive lawyer on retainer.',
  'He trusted the fixer completely, which is the Night City equivalent of leaving your door open with a welcome mat.',
  'The NCPD arrived fourteen minutes after the shooting and spent the next hour writing six bodies up as industrial accidents.',
  'Every corp tower downtown is a monument to something that used to be somebody\'s home.',
  // dark
  'The sky above the city was the colour of a dead monitor left on all night.',
  'Night City chews people up and spits them into the Badlands with nothing but a scar and a lesson.',
  'She\'d been double-crossed so many times she started building it into her quote as a line-item fee.',
  'The clinic patched her up by dawn and sent her back out before the anaesthetic wore off.',
  'Out in the Badlands the air tastes like rust, the water tastes like regret, and the silence is the worst part.',
  'Flatlined runners get scraped off the asphalt; the smart ones get to choose how they flatline.',
  'He had enough cyberware that his death would technically be classified as a firmware failure.',
  'Every job in this city has an exit plan — the question is whether it\'s yours or theirs.',
  'Ripperdocs don\'t ask questions because the answers are always worse than the wounds.',
  'The corps don\'t kill you outright — that would be inefficient. They just make living not worth the overhead.',
  'She kept a tally of people who\'d underestimated her. The list was long; most entries were past tense.',
  'Night City is proof that you can build paradise on top of a landfill if you light it the right colour.',
  // slightly vulgar / raw
  'Running data for Militech is like playing Russian roulette — except all six chambers are loaded and the gun is also on fire.',
  'A good ripperdoc asks no questions, charges double for it, and makes very deliberate eye contact with the floor.',
  'Arasaka has a form for everything, including a sympathy card for people their own security team shot.',
  'The street doc was elbow-deep in someone else when he told her the implant would be ready Tuesday.',
  'The job pays well, which in Night City means someone forgot to mention the part that will probably kill you.',
  'Bootleg braindances go for twenty eddies in Kabuki — the content is free but therapy costs extra.',
  'She charged three times the going rate and was still booked six weeks out; competence is rarer than chrome.',
  'Trust no one who hasn\'t bled beside you — everyone else is just managing their exposure to your eventual death.',
  'The fixer cut the call before she could ask about the exit plan, which was itself an answer.',
  'Silence in Night City means someone is about to move, someone is already dead, or someone is charging you both.',
  // atmospheric
  'The neon bleeds down the wet street like a wound that refuses to close.',
  'Chrome and flesh blur together when the implants go deep enough and the mirror gets far enough away.',
  'Rogue access points cluster under the overpass like rats waiting out the rain.',
  'Memory leaks are fatal in meat and machines alike — you just don\'t notice until the heap is full.',
  'The netrunner\'s hands danced across the keys while her eyes saw nothing in this timezone at all.',
  'You can buy a new identity in Japantown for the right price, the right face, and a willingness to forget the old one.',
  'He rerouted through seven proxy nodes and still got traced in under ninety seconds — sloppy or expected, take your pick.',
  'The Badlands don\'t care who you were in the city. They only care how much water you brought.',
  'Every locked door has a code; every code has a price; every price has someone behind it who will collect.',
  'She had more mods than skin left and wore every one of them like the receipts of a war she survived.',
  'The corpo lawyers showed up twenty minutes after the explosion — before the fire trucks, right on schedule.',
  'Bandwidth is precious out here, and every wasted cycle is a decision someone else gets to make for you.',
  'Two gangs, one block, enough firepower to redecorate the neighbourhood, and not a single witness brave enough to blink.',
  'The fixers set the meet at a club loud enough that nobody would hear the conversation or the shot that ended it.',
];

// Hard: rich cyberpunk noir — dark wit, punctuation, numbers, some profanity
const PASSAGES_HARD = [
  'Night City is a monument to corporate greed dressed in neon and chrome. Arasaka, Militech, Kang Tao — they don\'t govern this place; they own it outright, deed and all. The NCPD are just their private security with a public pension plan and slightly worse aim. You want real power here? Build your rep, watch your six, and never take a job without a clean exit — because the corps don\'t offer severance.',
  'The netrunner jacked in at 02:14 and the ICE hit her like a freight hauler running cold. Three layers — adaptive, military-grade, the kind that costs more than her whole rig. Her deck burned through the first with a standard Siphon. The second took a custom exploit she\'d been sitting on since January. The third layer was something she\'d never seen before, and the fact that it existed at all was the scariest thing in the room.',
  'Trauma Team International guarantees extraction in sixty seconds — provided your premium is current, your location pings clean, and the engagement doesn\'t qualify as a "corporate security operation," which, conveniently, covers about 80% of the situations where you\'d actually need them. Read the exclusions. They\'re longer than the brochure and significantly more honest about what your life is worth.',
  'She found the shard in a dead fixer\'s coat pocket: encrypted, 64-bit ghost key, NeoCrypto standard. Three days, one migraine, and a very expensive decryption rig later, she was in. Inside: coordinates, a passcode, and a full recording of a Militech board meeting that had officially never happened. Her quiet freelance life quietly died right there on the table beside the rig.',
  'Cyberware started as medicine and became identity inside a single generation. By 2077 chrome arms outnumber flesh ones in Night City\'s combat zones, ripperdocs are thriving, and nobody is writing philosophy papers about the soul anymore — partly because nobody has the time, and partly because the answer keeps coming back worse than expected. The street kids didn\'t wait for the academic consensus. They just kept upgrading.',
  '"Never let them take your individuality. Fight it, scream it, burn it into their memory." Johnny Silverhand said that right before he wired a building full of people to make the point. Fifty years on, Arasaka rebuilt the tower — taller, harder, and apparently very unbothered by the symbolism. The lesson isn\'t that revolution fails. It\'s that the people funding the counter-revolution have better accountants.',
  'The Badlands stretch east of the city like the punchline to a joke Night City told about itself. Flat, cracked, irradiated in patches the government stopped marking on maps fifteen years ago. The Aldecaldos know every trail, every cache, every place the NCPD doesn\'t bother to patrol because the patrol budget doesn\'t stretch past the tolls. You want safe passage east? Bring respect first. Eddies second. Questions never.',
  'Braindance lets you live inside someone else\'s skull — their senses, their heartbeat, their exact flavour of panic. The legal market sells nostalgia. The grey market sells anything it can film. The black market doesn\'t bother with categories. NCPD estimates 40% of BDs in Kabuki contain illegally sourced recordings, which means 40% of the people who bought one experienced something real without asking whether the original owner consented to the rerun.',
  'The dark web of Night City doesn\'t run on money — it runs on favours nobody ever intends to repay. A broker in Heywood owes a fixer in Westbrook who owes a netrunner in Pacifica who owes nobody at all, which makes her the most dangerous person in the chain. Debt is a leash. Information is a blade. Anonymity is full-body armour. Knowing which one you need before the other party draws is what separates the veterans from the cautionary tales.',
  'Night City\'s nightlife is spectacular if you don\'t mind the occasional firefight, the pervasive smell of burning chrome, and the ambient hum of surveillance drones triangulating your exact emotional state. The clubs keep the music loud enough that the screaming blends in. The bars keep the drinks cheap enough that nobody asks too many questions. The ripperdocs stay open late enough that you can be back on the floor by midnight. It\'s a full ecosystem.',
  'They said the Blackwall was put there to protect humanity from rogue AIs. Nobody asks what the AIs did to earn that kind of containment, because the answer is classified above the level of anyone still breathing. What leaks through the wall — fragments, echoes, corrupted data — is enough to flatline a mid-tier netrunner on contact. The top-tier ones treat it like a challenge. Former top-tier ones are a very short list.',
  'Running a job for Militech is statistically similar to playing Russian roulette — except you\'re using their gun, their ammunition, their rules about what counts as pulling the trigger, and a contract that indemnifies them against every outcome including the one where you don\'t come back. The pay is good. It has to be. They\'ve clearly done the math on what it costs to get someone to agree to those terms.',
];

// ── Boot sequence ─────────────────────────────────────────────
const BOOT_LINES = [
  'INITIALIZING NEURAL INTERFACE',
  'HANDSHAKE: NIGHT CITY NET',
  'LOADING CORPUS: 7,432 ENTRIES',
  'CALIBRATING SYNAPSE RESPONSE',
  'ICE BARRIER: OFFLINE',
  'SECURE CHANNEL: ESTABLISHED',
  'JACK IN, CHOOM.',
];

function runBoot() {
  const screen = document.getElementById('boot-screen');
  const log    = document.getElementById('boot-log');
  const bar    = document.getElementById('boot-bar');
  if (!screen) { initApp(); return; }

  let i = 0;
  const total   = BOOT_LINES.length;
  const delays  = [280, 320, 260, 340, 220, 280, 0];

  function next() {
    if (i >= total) {
      setTimeout(() => {
        screen.classList.add('boot-done');
        setTimeout(() => { screen.remove(); initApp(); }, 520);
      }, 550);
      return;
    }

    const line  = document.createElement('div');
    line.className = 'boot-line';

    const label = document.createElement('span');
    label.textContent = '> ' + BOOT_LINES[i];

    const ok = document.createElement('span');
    ok.className = 'boot-ok';
    ok.textContent = i < total - 1 ? '[OK]' : '';

    line.appendChild(label);
    line.appendChild(ok);
    log.appendChild(line);

    bar.style.width = (((i + 1) / total) * 100) + '%';

    setTimeout(next, delays[i] ?? 280);
    i++;
  }

  setTimeout(next, 300);
}

// ── Audio ─────────────────────────────────────────────────────
let audioCtx = null;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playClick() {
  if (!state.sound) return;
  try {
    const ctx  = getAudio();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(1100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
  } catch (_) {}
}

function playError() {
  if (!state.sound) return;
  try {
    const ctx  = getAudio();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.14);
  } catch (_) {}
}

function playFinish() {
  if (!state.sound) return;
  try {
    const ctx   = getAudio();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.11;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t);
      osc.stop(t + 0.35);
    });
  } catch (_) {}
}

// ── State ─────────────────────────────────────────────────────
const state = {
  difficulty:      'medium',
  timeLimit:       60,
  text:            '',
  started:         false,
  finished:        false,
  timerInterval:   null,
  timeLeft:        60,
  totalTyped:      0,
  errorKeystrokes: 0,
  wpmHistory:      [],
  combo:           0,
  maxCombo:        0,
  customText:      localStorage.getItem('ts_custom') || '',
  savedName:       localStorage.getItem('ts_name')   || '',
  sound:           localStorage.getItem('ts_sound') !== 'off',
};

// ── DOM refs ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const textDisplay     = $('text-display');
const inputArea       = $('input-area');
const wpmLive         = $('wpm-live');
const wpmTrend        = $('wpm-trend');
const accLive         = $('acc-live');
const timerLive       = $('timer-live');
const ringFill        = $('ring-fill');
const restartBtn      = $('restart-btn');
const resultsOverlay  = $('results-overlay');
const playerNameInput = $('player-name');
const customTextInput = $('custom-text-input');
const customCharCount = $('custom-char-count');
const customStatus    = $('custom-status');
const lbEntries       = $('lb-entries');
const lbEmpty         = $('lb-empty');
const diffGroup       = $('diff-group');
const timeGroup       = $('time-group');
const filterGroup     = $('filter-group');
const themeGroup      = $('theme-group');
const typingCard      = $('typing-card');
const comboStrip      = $('combo-strip');
const comboVal        = $('combo-val');
const soundBtn        = $('sound-btn');

// ── Utility ───────────────────────────────────────────────────
const RING_CIRCUMFERENCE = 263.9; // 2π × 42

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function randomItem(arr)   { return arr[Math.floor(Math.random() * arr.length)]; }
function elapsedMinutes()  { return (state.timeLimit - state.timeLeft) / 60; }

// ── Animated counter ──────────────────────────────────────────
function animateCount(el, to, suffix = '', duration = 700) {
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Rank system ───────────────────────────────────────────────
function getWpmRank(wpm) {
  if (wpm >= 130) return { title: 'BLACKWALL',   color: 'var(--accent-3)' };
  if (wpm >= 100) return { title: 'GHOST',        color: 'var(--accent-2)' };
  if (wpm >= 75)  return { title: 'ICE BREAKER',  color: 'var(--accent)'   };
  if (wpm >= 50)  return { title: 'NETRUNNER',    color: 'var(--accent)'   };
  if (wpm >= 30)  return { title: 'STREET KID',   color: 'var(--text)'     };
  if (wpm >= 15)  return { title: 'ROOKIE',        color: 'var(--text-sub)' };
  return                  { title: 'FLATLINED',    color: 'var(--incorrect)' };
}

// ── Text loading ──────────────────────────────────────────────
function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadText() {
  if (state.difficulty === 'custom') {
    const c = state.customText.trim();
    state.text = (c && c.length >= 30) ? c
      : 'No custom text saved. Go to Settings and paste your text, then select Custom difficulty.';
    return;
  }

  if (state.difficulty === 'easy') {
    // Fresh random word sequence every run — never the same twice
    const count = Math.max(55, Math.ceil(state.timeLimit * 1.1));
    const words = [];
    for (let i = 0; i < count; i++) {
      words.push(WORDS_EASY[Math.floor(Math.random() * WORDS_EASY.length)]);
    }
    state.text = words.join(' ');
    return;
  }

  if (state.difficulty === 'medium') {
    const count = state.timeLimit <= 30 ? 3 : state.timeLimit <= 60 ? 4 : 6;
    state.text = shuffled(SENTENCES_MEDIUM).slice(0, count).join(' ');
    return;
  }

  // hard
  const count = state.timeLimit <= 60 ? 1 : 2;
  state.text = shuffled(PASSAGES_HARD).slice(0, count).join(' ');
}

// ── Render text display ───────────────────────────────────────
function renderTextDisplay() {
  textDisplay.innerHTML = state.text.split('').map((ch, i) => {
    const c = ch === ' ' ? '&nbsp;' : ch;
    return `<span class="char" data-i="${i}">${c}</span>`;
  }).join('');
}

function getSpans() { return textDisplay.querySelectorAll('.char'); }

function updateDisplay(inputVal) {
  const spans = getSpans();
  spans.forEach((span, i) => {
    span.className = 'char';
    if (i < inputVal.length) {
      span.classList.add(inputVal[i] === state.text[i] ? 'correct' : 'incorrect');
    } else if (i === inputVal.length) {
      span.classList.add('active');
    }
  });
  scrollToActive();
}

function scrollToActive() {
  const active = textDisplay.querySelector('.char.active');
  if (!active) return;
  textDisplay.scrollTop = Math.max(0, active.offsetTop - textDisplay.clientHeight / 3);
}

// ── WPM & accuracy ────────────────────────────────────────────
function calcWPM(correctChars) {
  const minutes = elapsedMinutes();
  return minutes <= 0 ? 0 : Math.round(correctChars / 5 / minutes);
}

function countCorrectChars(inputVal) {
  let n = 0;
  for (let i = 0; i < inputVal.length; i++) {
    if (inputVal[i] === state.text[i]) n++;
  }
  return n;
}

function calcAccuracy() {
  if (state.totalTyped === 0) return null;
  return Math.max(0, Math.round(((state.totalTyped - state.errorKeystrokes) / state.totalTyped) * 100));
}

// ── WPM trend indicator ───────────────────────────────────────
let _lastTrendWpm = 0;
let _trendSample  = 0;

function updateTrend(wpm) {
  _trendSample++;
  if (_trendSample % 5 !== 0) return; // sample every 5s
  const diff = wpm - _lastTrendWpm;
  if (diff > 4)       { wpmTrend.textContent = '↑'; wpmTrend.className = 'wpm-trend up'; }
  else if (diff < -4) { wpmTrend.textContent = '↓'; wpmTrend.className = 'wpm-trend down'; }
  else                { wpmTrend.textContent = '→'; wpmTrend.className = 'wpm-trend flat'; }
  _lastTrendWpm = wpm;
}

// ── Live stats update ─────────────────────────────────────────
function refreshStats() {
  const inputVal     = inputArea.value;
  const correctChars = countCorrectChars(inputVal);
  const wpm          = calcWPM(correctChars);
  const acc          = calcAccuracy();

  wpmLive.textContent = state.started ? wpm : 0;
  accLive.textContent = acc !== null ? acc + '%' : '—';

  if (state.started) updateTrend(wpm);
}

// ── Combo ─────────────────────────────────────────────────────
function updateCombo(correct) {
  if (correct) {
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
  } else {
    state.combo = 0;
  }

  if (state.combo >= 5) {
    comboVal.textContent = state.combo;
    comboStrip.classList.add('visible');
    comboStrip.classList.toggle('hot', state.combo >= 15);
    // re-trigger pop animation
    comboVal.style.animation = 'none';
    comboVal.offsetHeight; // reflow
    comboVal.style.animation = '';
  } else {
    comboStrip.classList.remove('visible', 'hot');
  }
}

// ── Glitch ────────────────────────────────────────────────────
function triggerGlitch() {
  typingCard.classList.add('glitch-error');
  typingCard.addEventListener('animationend', () => {
    typingCard.classList.remove('glitch-error');
  }, { once: true });
}

// ── Timer ─────────────────────────────────────────────────────
function updateRing() {
  const ratio  = state.timeLeft / state.timeLimit;
  const offset = RING_CIRCUMFERENCE * (1 - ratio);
  ringFill.style.strokeDashoffset = offset.toFixed(2);

  if (ratio < 0.25) {
    ringFill.style.stroke = 'var(--incorrect)';
    timerLive.classList.add('urgent');
  } else {
    ringFill.style.stroke = 'var(--ring-color)';
    timerLive.classList.remove('urgent');
  }
}

function startTimer() {
  if (state.timerInterval) return;
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    timerLive.textContent = state.timeLeft;
    updateRing();
    if (state.timeLeft <= 0) finishTest();
  }, 1000);
}

// ── Input handling ────────────────────────────────────────────
function onInput() {
  if (state.finished) return;

  const val = inputArea.value;

  if (val.length > state.text.length) {
    inputArea.value = val.slice(0, state.text.length);
    return;
  }

  if (!state.started && val.length > 0) {
    state.started = true;
    wpmTrend.textContent = '';
    startTimer();
  }

  const prevLen = state._prevLen ?? 0;
  if (val.length > prevLen) {
    for (let k = 0; k < val.length - prevLen; k++) {
      const pos = prevLen + k;
      const isCorrect = pos < state.text.length && val[pos] === state.text[pos];
      state.totalTyped++;

      if (!isCorrect) {
        state.errorKeystrokes++;
        playError();
        triggerGlitch();
        updateCombo(false);
      } else {
        playClick();
        updateCombo(true);
      }
    }
  }

  state._prevLen = val.length;
  updateDisplay(val);
  refreshStats();

  if (val === state.text) finishTest();
}

// ── Finish & results ──────────────────────────────────────────
function finishTest() {
  if (state.finished) return;
  state.finished = true;

  clearInterval(state.timerInterval);
  state.timerInterval = null;
  inputArea.disabled  = true;
  playFinish();

  const inputVal     = inputArea.value;
  const correctChars = countCorrectChars(inputVal);
  const totalErrors  = inputVal.split('').filter((c, i) => c !== state.text[i]).length;
  const wpm          = calcWPM(correctChars);
  const acc          = calcAccuracy() ?? 0;

  state._lastResult = { wpm, acc, correctChars, totalErrors };
  showResults(wpm, acc, correctChars, totalErrors);
}

function showResults(wpm, acc, correctChars, errors) {
  const rank = getWpmRank(wpm);
  const rankEl = $('rank-title');
  rankEl.textContent  = rank.title;
  rankEl.style.color  = rank.color;
  rankEl.style.textShadow = rank.color.includes('accent') ? 'var(--glow-y)' : '';

  playerNameInput.value = state.savedName;
  resultsOverlay.classList.remove('hidden');

  // Animate result numbers after a short delay
  setTimeout(() => {
    animateCount($('res-wpm'),    wpm,          '',  900);
    animateCount($('res-acc'),    acc,          '%', 800);
    animateCount($('res-chars'),  correctChars, '',  700);
    animateCount($('res-errors'), errors,       '',  600);
  }, 80);

  playerNameInput.focus();
}

// ── Reset ─────────────────────────────────────────────────────
function resetTest() {
  clearInterval(state.timerInterval);
  state.timerInterval   = null;
  state.started         = false;
  state.finished        = false;
  state.timeLeft        = state.timeLimit;
  state.totalTyped      = 0;
  state.errorKeystrokes = 0;
  state._prevLen        = 0;
  state.wpmHistory      = [];
  state.combo           = 0;
  _lastTrendWpm         = 0;
  _trendSample          = 0;

  timerLive.textContent = state.timeLimit;
  timerLive.classList.remove('urgent');
  ringFill.style.strokeDashoffset = '0';
  ringFill.style.stroke           = 'var(--ring-color)';

  wpmLive.textContent  = 0;
  accLive.textContent  = '—';
  wpmTrend.textContent = '';
  wpmTrend.className   = 'wpm-trend';

  comboStrip.classList.remove('visible', 'hot');

  inputArea.value    = '';
  inputArea.disabled = false;
  resultsOverlay.classList.add('hidden');

  typingCard.classList.remove('glitch-error');

  loadText();
  renderTextDisplay();
  inputArea.focus();
}

// ── Supabase leaderboard ──────────────────────────────────────
// Replace these two values after creating your Supabase project.
// Dashboard → Project Settings → API → Project URL + anon public key
const SUPABASE_URL      = 'https://lruezuigiauintzkaqzl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_k-xmfyVvhdiPnR7JSyVjgQ_fUkLCr6G';

const sbReady = !SUPABASE_URL.includes('YOUR_SUPABASE');
const db = sbReady
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// localStorage fallback (used when Supabase isn't configured yet)
const STORAGE_KEY = 'ts_leaderboard';
function localGet()       { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function localSave(arr)   { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

async function addScore(entry) {
  if (db) {
    await db.from('scores').insert({
      name:       entry.name,
      wpm:        entry.wpm,
      accuracy:   entry.accuracy,
      difficulty: entry.difficulty,
      duration:   entry.duration,
      chars:      entry.chars,
      date:       entry.date,
    });
  } else {
    // offline fallback
    const arr = localGet();
    arr.push(entry);
    arr.sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy);
    localSave(arr.slice(0, 100));
  }
}

async function renderLeaderboard(filter) {
  lbEntries.innerHTML = '';
  lbEmpty.classList.add('hidden');

  // show a subtle loading state
  const loading = document.createElement('div');
  loading.className = 'empty-state';
  loading.textContent = 'Fetching data from the net…';
  lbEntries.appendChild(loading);

  let rows = [];

  if (db) {
    let query = db.from('scores')
      .select('name,wpm,accuracy,difficulty,duration,date')
      .order('wpm', { ascending: false })
      .order('accuracy', { ascending: false })
      .limit(100);
    if (filter !== 'all') query = query.eq('difficulty', filter);
    const { data, error } = await query;
    if (!error && data) rows = data;
  } else {
    const all = localGet();
    rows = filter === 'all' ? all : all.filter(s => s.difficulty === filter);
  }

  lbEntries.innerHTML = '';

  if (rows.length === 0) { lbEmpty.classList.remove('hidden'); return; }

  rows.forEach((s, idx) => {
    const row = document.createElement('div');
    row.className = 'lb-row lb-entry';
    const rank = idx + 1;
    const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
    row.innerHTML = `
      <span class="rank-badge ${rankClass}">${rank}</span>
      <span>${escHtml(s.name || 'Anonymous')}</span>
      <span><strong>${s.wpm}</strong></span>
      <span>${s.accuracy}%</span>
      <span><span class="diff-badge ${s.difficulty}">${s.difficulty}</span></span>
      <span>${s.duration}s</span>
      <span>${s.date}</span>`;
    lbEntries.appendChild(row);
  });
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Navigation ────────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const screen = document.getElementById('screen-' + name);
  if (screen) screen.classList.remove('hidden');

  const btn = document.querySelector(`.nav-btn[data-screen="${name}"]`);
  if (btn) btn.classList.add('active');

  if (name === 'leaderboard') {
    const f = filterGroup.querySelector('.pill.active');
    renderLeaderboard(f ? f.dataset.filter : 'all');
  }
  if (name === 'settings') {
    customTextInput.value          = state.customText;
    customCharCount.textContent    = state.customText.length + ' bytes';
  }
}

// ── Theme ─────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ts_theme', theme);
  themeGroup.querySelectorAll('.pill').forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
}

// ── Pill helper ───────────────────────────────────────────────
function activatePill(group, selector) {
  group.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
  const t = group.querySelector(selector);
  if (t) t.classList.add('active');
}

// ── Sound toggle ──────────────────────────────────────────────
function applySound(on) {
  state.sound = on;
  localStorage.setItem('ts_sound', on ? 'on' : 'off');
  soundBtn.classList.toggle('active', on);
  soundBtn.textContent = on ? 'SFX' : 'SFX';
  soundBtn.title = on ? 'Sound ON — click to mute' : 'Sound OFF — click to enable';
  soundBtn.style.opacity = on ? '1' : '0.45';
}

// ── Event listeners ───────────────────────────────────────────
inputArea.addEventListener('input', onInput);

inputArea.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    inputArea.value = '';
    state._prevLen  = 0;
    state.combo     = 0;
    comboStrip.classList.remove('visible', 'hot');
    updateDisplay('');
    refreshStats();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    if (!resultsOverlay.classList.contains('hidden')) resultsOverlay.classList.add('hidden');
    resetTest();
  }
  // quick sound toggle
  if (e.key.toLowerCase() === 's' && !inputArea.matches(':focus') && !playerNameInput.matches(':focus')) {
    applySound(!state.sound);
  }
});

restartBtn.addEventListener('click', resetTest);
soundBtn.addEventListener('click', () => applySound(!state.sound));

diffGroup.addEventListener('click', e => {
  const btn = e.target.closest('.pill');
  if (!btn) return;
  activatePill(diffGroup, `[data-diff="${btn.dataset.diff}"]`);
  state.difficulty = btn.dataset.diff;
  resetTest();
});

timeGroup.addEventListener('click', e => {
  const btn = e.target.closest('.pill');
  if (!btn) return;
  activatePill(timeGroup, `[data-time="${btn.dataset.time}"]`);
  state.timeLimit = parseInt(btn.dataset.time, 10);
  resetTest();
});

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.screen));
});

$('retry-btn').addEventListener('click', () => {
  resultsOverlay.classList.add('hidden');
  resetTest();
});

$('board-btn').addEventListener('click', () => {
  resultsOverlay.classList.add('hidden');
  showScreen('leaderboard');
});

$('save-btn').addEventListener('click', async () => {
  const btn  = $('save-btn');
  const name = playerNameInput.value.trim() || 'Anonymous';
  state.savedName = name;
  localStorage.setItem('ts_name', name);

  const r = state._lastResult;
  if (!r) return;

  btn.textContent = '…';
  btn.disabled    = true;

  await addScore({
    name, wpm: r.wpm, accuracy: r.acc, difficulty: state.difficulty,
    duration: state.timeLimit, date: new Date().toLocaleDateString('en-CA'), chars: r.correctChars,
  });

  btn.textContent = '✓ Uploaded';
});

filterGroup.addEventListener('click', e => {
  const btn = e.target.closest('.pill');
  if (!btn) return;
  activatePill(filterGroup, `[data-filter="${btn.dataset.filter}"]`);
  renderLeaderboard(btn.dataset.filter);
});

$('clear-board-btn').addEventListener('click', async () => {
  if (!confirm('Wipe all leaderboard data? This cannot be undone.')) return;
  if (db) {
    await db.from('scores').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  } else {
    localSave([]);
  }
  const f = filterGroup.querySelector('.pill.active');
  renderLeaderboard(f ? f.dataset.filter : 'all');
});

themeGroup.addEventListener('click', e => {
  const btn = e.target.closest('.pill');
  if (btn) applyTheme(btn.dataset.theme);
});

customTextInput.addEventListener('input', () => {
  customCharCount.textContent = customTextInput.value.length + ' bytes';
  customStatus.textContent    = '';
});

$('save-custom-btn').addEventListener('click', () => {
  const val = customTextInput.value.trim();
  if (val.length < 30) {
    customStatus.style.color   = 'var(--incorrect)';
    customStatus.textContent   = '× Payload too short — minimum 30 characters.';
    return;
  }
  state.customText = val;
  localStorage.setItem('ts_custom', val);
  customStatus.style.color = 'var(--correct)';
  customStatus.textContent = '✓ Payload uploaded.';
});

// ── Init ──────────────────────────────────────────────────────
function initApp() {
  const savedTheme = localStorage.getItem('ts_theme') || 'dark';
  applyTheme(savedTheme);
  applySound(state.sound);

  state.customText = localStorage.getItem('ts_custom') || '';

  ringFill.style.strokeDasharray  = RING_CIRCUMFERENCE;
  ringFill.style.strokeDashoffset = '0';

  // Default: medium diff / 60s
  activatePill(diffGroup, '[data-diff="medium"]');
  state.difficulty = 'medium';
  timerLive.textContent = state.timeLimit;

  loadText();
  renderTextDisplay();
  inputArea.focus();
}

runBoot();
