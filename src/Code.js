/**
 * Flame Match Analyzer — Code.gs
 * ---------------------------------------------------------------------------
 * Server-side entry point + the real FLAMES algorithm and deterministic
 * relationship analytics. Nothing in this file uses Math.random() for the
 * core result — every number is derived from the two names, so the same
 * pair of names always produces the same analysis.
 * ---------------------------------------------------------------------------
 */

/**
 * Web app entry point. Renders Index.html.
 */
function doGet() {
  return HtmlService.createHtmlOutput(HtmlService.createTemplateFromFile('Index').evaluate())
    .setTitle('🔥 Flame MaTch dinesh Analyzer ')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Utility used by Index.html if it ever needs to inline another HTML
 * partial. Not required for the current single-file build, kept for
 * extensibility. ggdgs
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* ============================================================================
 * PUBLIC API — called from the client via google.script.run
 * ==========================================================================*/

/**
 * Runs the full analysis for a pair of names and returns a plain object
 * the client can render directly (FLAMES result + dashboard metrics).
 *
 * @param {string} rawName1
 * @param {string} rawName2
 * @return {Object} analysis payload
 */
function getAnalysis(rawName1, rawName2) {
  var name1 = String(rawName1 || '').trim();
  var name2 = String(rawName2 || '').trim();

  if (!name1 || !name2) {
    throw new Error('Both names are required.');
  }

  var flames = computeFlames(name1, name2);
  var seed = hashNames(name1, name2);
  var metrics = computeDashboardMetrics(flames, seed);

  return {
    name1: name1,
    name2: name2,
    remainingCount: flames.remainingCount,
    result: flames.result,          // e.g. "Love"
    resultEmoji: flames.emoji,       // e.g. "❤️"
    resultLabel: flames.label,       // e.g. "Love ❤️"
    eliminationTrail: flames.trail,  // array of {letter, word} eliminated in order
    metrics: metrics
  };
}

/* ============================================================================
 * FLAMES ALGORITHM
 * ==========================================================================*/

var FLAMES_TABLE = [
  { letter: 'F', word: 'Friends',   emoji: '🤝' },
  { letter: 'L', word: 'Love',      emoji: '❤️' },
  { letter: 'A', word: 'Affection', emoji: '🥰' },
  { letter: 'M', word: 'Marriage',  emoji: '💍' },
  { letter: 'E', word: 'Enemy',     emoji: '⚔️' },
  { letter: 'S', word: 'Siblings',  emoji: '👨‍👩‍👧' }
];

/**
 * Classic FLAMES algorithm:
 *  1. Normalize both names (letters only, lowercase).
 *  2. Cancel out common letters one-for-one between the two names.
 *  3. Count the remaining (uncancelled) letters.
 *  4. Use that count to eliminate letters from F-L-A-M-E-S in a circular
 *     counting pattern (Josephus-style) until one remains.
 */
function computeFlames(name1, name2) {
  var a = normalizeToLetters(name1);
  var b = normalizeToLetters(name2);

  // Step 1 & 2 — cancel one occurrence of each shared letter.
  for (var i = 0; i < a.length; i++) {
    var idx = b.indexOf(a[i]);
    if (idx !== -1) {
      a.splice(i, 1);
      b.splice(idx, 1);
      i--; // re-check this position since array shifted
    }
  }

  var remainingCount = a.length + b.length;
  // Edge case: two names that are perfect anagrams of each other cancel
  // out completely. There's no zero-count step in the traditional game,
  // so we fall back to the combined letter length to keep the process
  // fully deterministic (never random).
  if (remainingCount === 0) {
    remainingCount = normalizeToLetters(name1).length + normalizeToLetters(name2).length;
  }

  // Step 3 & 4 — circular elimination.
  var pool = FLAMES_TABLE.slice();
  var trail = [];
  var pointer = 0;

  while (pool.length > 1) {
    pointer = (pointer + remainingCount - 1) % pool.length;
    trail.push({ letter: pool[pointer].letter, word: pool[pointer].word });
    pool.splice(pointer, 1);
    if (pointer >= pool.length) pointer = 0;
  }

  var winner = pool[0];
  return {
    remainingCount: remainingCount,
    result: winner.word,
    emoji: winner.emoji,
    label: winner.word + ' ' + winner.emoji,
    trail: trail
  };
}

function normalizeToLetters(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('');
}

/* ============================================================================
 * DETERMINISTIC DASHBOARD METRICS (seeded, not random)
 * ==========================================================================*/

// Baseline "feel" per FLAMES outcome — keeps the numbers thematically honest
// (e.g. "Enemy" shouldn't roll a 95% compatibility score).
var RESULT_BASELINES = {
  Friends:   { compatibility: 58, passion: 30, friendship: 88, marriage: 25, communication: 62 },
  Love:      { compatibility: 82, passion: 85, friendship: 70, marriage: 68, communication: 74 },
  Affection: { compatibility: 70, passion: 60, friendship: 75, marriage: 50, communication: 68 },
  Marriage:  { compatibility: 88, passion: 72, friendship: 74, marriage: 92, communication: 80 },
  Enemy:     { compatibility: 22, passion: 20, friendship: 15, marriage: 8,  communication: 25 },
  Siblings:  { compatibility: 60, passion: 15, friendship: 82, marriage: 12, communication: 70 }
};

/**
 * Builds a small deterministic PRNG (mulberry32) seeded from the two names.
 * Same names => same sequence => same dashboard every time.
 */
function hashNames(name1, name2) {
  var str = (name1 + '::' + name2).toLowerCase();
  var h = 2166136261; // FNV-ish seed
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  var state = seed;
  return function () {
    state |= 0;
    state = (state + 0x6D2B79F5) | 0;
    var t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function computeDashboardMetrics(flames, seed) {
  var rand = mulberry32(seed);
  var base = RESULT_BASELINES[flames.result];

  // Each metric nudges its baseline by a seeded pseudo-random offset so two
  // different name pairs landing on the same FLAMES result still feel
  // distinct, while remaining perfectly reproducible.
  function nudge(baseline, spread) {
    var offset = Math.round((rand() * 2 - 1) * spread);
    return clamp(baseline + offset, 0, 100);
  }

  var compatibility = nudge(base.compatibility, 10);
  var passion        = nudge(base.passion, 14);
  var friendship      = nudge(base.friendship, 12);
  var marriageChance  = nudge(base.marriage, 12);
  var communication    = nudge(base.communication, 12);
  var overall = Math.round((compatibility + passion + friendship + marriageChance + communication) / 5);

  return {
    compatibility: compatibility,
    passion: passion,
    friendship: friendship,
    marriageChance: marriageChance,
    communication: communication,
    overall: overall
  };
}
