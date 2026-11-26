/**
 * aaj. Unified Guided Cooking Journey Experience
 * Merges detailed recipe guidance with matching 3D-feel animated kitchen scenes.
 *
 * Left Column:
 * - Current step number & culinary phase
 * - Short punchy step headline
 * - 1-2 line clear cooking instruction
 * - Interactive step ingredients checklist (tap to check off as added)
 * - Small supporting bullets / sensory cues / chef tips
 * - Integrated working countdown timer
 *
 * Right Column:
 * - Matching animated visual scene corresponding to that exact step (temper, boil, whisk, simmer, roll, roast, plate)
 * - Real-time status badge
 * - "Up Next" preview teaser
 *
 * Navigation:
 * - Synchronized directional transitions updating both sides in lockstep
 * - Touch-optimized tablet buttons & full keyboard navigation (← / →, Space for timer, Esc to pause)
 */

import { DISH_CATALOG } from '../data/dishCatalog.js';
import { getStoredPantry } from '../data/pantryStaples.js';
import { loadSession, saveSession, clearSession, logCookingEvent } from '../data/cookingSession.js';
import { haptics } from './AudioHaptics.js';
import { getGroundedIngredientDetail } from '../adapter/recommendationEngineAdapter.js';
import { renderShoppingHandoffModal } from './ShoppingHandoffModal.js';
import {
  SCENE_CSS,
  renderStepScene,
  formatScannableStep
} from './CookingScenes.js';

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

// Conservative, explicitly user-confirmed suggestions. No automatic or invented stock.
// Suggestions that would substantially change a dish are intentionally omitted.
export const COOKING_SUBSTITUTES = Object.freeze({
  onions: { name: 'finely chopped shallots', note: 'Use a similar amount; the flavour will be a little milder.' },
  tomatoes: { name: 'canned chopped tomatoes', note: 'Use a similar volume and reduce the sauce until thick.' },
  ginger_garlic: { name: 'freshly minced ginger and garlic', note: 'Use fresh ginger and garlic instead of prepared paste.' },
  green_chilli: { name: 'a small pinch of red chilli powder', note: 'Add a little at a time; the heat may differ.' },
  peas: { name: 'finely chopped green beans', note: 'Cook until tender; timing may vary.' },
  paneer: { name: 'firm tofu', note: 'Crumble or cube it; the taste and texture will be different.' },
  basmati_rice: { name: 'another variety of white rice', note: 'Follow that rice variety’s water and cooking directions.' },
  atta: { name: 'another plain whole-wheat atta', note: 'Add water gradually; dough consistency can vary.' },
  dahi: { name: 'plain unsweetened yogurt', note: 'Use unflavoured yogurt; check consistency before mixing.' },
  ghee: { name: 'neutral cooking oil', note: 'Use a little oil instead; the aroma will differ.' },
  mustard_oil: { name: 'neutral cooking oil', note: 'Use the oil suited to the cooking temperature.' },
  cumin: { name: 'ground cumin', note: 'Use less than whole seeds and add later to avoid scorching.' }
});

const safeText = (value) => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));


/**
 * Builds rich, structured steps from the dish's detailedSteps,
 * falling back gracefully to quickSteps if needed.
 */
export function buildSteps(dish) {
  if (dish.detailedSteps && dish.detailedSteps.length > 0) {
    return dish.detailedSteps.map((s, index) => ({
      index,
      stepNumber: s.stepNumber || index + 1,
      title: s.title,
      instruction: s.instruction,
      tips: s.tips || [],
      flame: s.flame || 'Medium Flame',
      utensil: s.utensil || 'Heavy Kadhai',
      sceneType: s.sceneType || 'temper',
      timerSec: s.timerSec || null,
      ingredientsUsed: s.ingredientsUsed || []
    }));
  }

  // Fallback to formatted quickSteps
  return (dish.quickSteps || []).map((text, index) => {
    const formatted = formatScannableStep(text, index, dish.quickSteps.length, dish);
    const m = text.match(/(\d+)(?:\s*[–-]\s*(\d+))?\s*min/i);
    return {
      index,
      stepNumber: index + 1,
      title: formatted.title,
      instruction: formatted.instruction,
      tips: formatted.actionPoints || [],
      flame: formatted.heatLevel,
      utensil: formatted.utensil,
      sceneType: formatted.sceneType,
      timerSec: m ? parseInt(m[2] || m[1], 10) * 60 : null,
      ingredientsUsed: []
    };
  });
}

/** Required ingredients worth a quick check: missing from memory, or perishable. */
export function uncertainEssentials(dish, pantry = getStoredPantry()) {
  const byId = Object.fromEntries(pantry.map((p) => [p.id, p]));
  return dish.requiredIngredients
    .map((id) => byId[id] || { id, name: id.replace(/_/g, ' '), hindiName: '', category: 'fresh', inStock: false })
    .filter((p) => !p.inStock || ['fresh', 'dairy'].includes(p.category));
}

export function getResumable() {
  const s = loadSession();
  const dish = s && DISH_CATALOG.find((d) => d.id === s.dishId);
  return dish && s.stepIndex < buildSteps(dish).length ? { dish, session: s } : null;
}

const UNIFIED_JOURNEY_CSS = `
${SCENE_CSS}

/* Fullscreen Cooking Overlay */
.cook-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: var(--color-cream-bg);
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  animation: cookOverlayIn 0.35s var(--ease-smooth);
}

.cook-sheet {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 22px 36px calc(24px + env(safe-area-inset-bottom, 0px));
  gap: 20px;
  min-height: 100vh;
}

/* Top Navigation Bar */
.cook-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border-subtle);
}

.cook-top-title-lockup {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.cook-top h2 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cook-top-kicker {
  font-family: var(--font-indic);
  font-size: 1.05rem;
  color: var(--color-herb-leaf);
  opacity: 0.9;
}

.cook-btn {
  min-height: var(--tap-target-min);
  padding: 0 24px;
  border-radius: var(--radius-pill);
  border: 2px solid var(--color-border-medium);
  background: var(--color-cream-card);
  font: 700 1.05rem var(--font-sans);
  color: inherit;
  cursor: pointer;
  box-shadow: var(--shadow-card-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform var(--duration-fast) var(--ease-spring), background var(--duration-fast), border-color var(--duration-fast);
}

.cook-btn:active {
  transform: scale(0.96);
}

.cook-btn:disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.cook-btn.is-primary {
  background: linear-gradient(135deg, var(--color-tomato-coral), var(--color-tomato-deep));
  border-color: transparent;
  color: #fff;
  box-shadow: var(--shadow-active-btn);
  min-height: var(--tap-target-lg);
  font-size: 1.25rem;
  padding: 0 38px;
  letter-spacing: -0.01em;
}

.cook-btn.is-primary:hover {
  filter: brightness(1.05);
}

.cook-btn:focus-visible,
.cook-chip:focus-visible,
.cook-step-title:focus-visible {
  outline: 4px solid var(--color-lavender-deep);
  outline-offset: 3px;
}

/* Glowing Progress Bar */
.cook-progress {
  height: 14px;
  border-radius: var(--radius-pill);
  background: var(--color-cream-muted);
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.cook-progress > i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--color-butter-yellow), var(--color-apricot), var(--color-tomato-coral));
  border-radius: inherit;
  transition: width 0.5s var(--ease-spring);
  box-shadow: 0 0 12px rgba(255, 90, 95, 0.45);
}

/* Main 2-Column Unified Stage */
.cook-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 36px;
  align-items: center;
  min-height: 0;
}

/* Left Step Information Card */
.cook-card {
  background: var(--color-cream-card);
  border-radius: var(--radius-xl);
  padding: 36px 42px;
  box-shadow: var(--shadow-plinth);
  display: flex;
  flex-direction: column;
  gap: 18px;
  border: 1px solid var(--color-border-subtle);
  position: relative;
}

.cook-card.slide-in-next {
  animation: cookStepInNext 0.4s var(--ease-spring);
}

.cook-card.slide-in-prev {
  animation: cookStepInPrev 0.4s var(--ease-spring);
}

/* Step Header Metadata Bar */
.cook-step-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.cook-step-badge {
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-tomato-deep);
  background: var(--color-tomato-light);
  padding: 4px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
}

.cook-cue-pill {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-cream-surface);
  border: 1px solid var(--color-border-medium);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
}

/* Expressive Step Headline */
.cook-step-title {
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 2.5vw, 2.25rem);
  line-height: 1.25;
  margin: 0;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

/* Scannable 1-2 Line Instruction Box */
.cook-instruction-text {
  font-size: 1.18rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  margin: 0;
  background: var(--color-cream-surface);
  border-left: 4px solid var(--color-tomato-coral);
  padding: 14px 18px;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

/* Interactive Step Ingredients Checklist */
.cook-step-ingredients {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cook-ingredients-heading {
  font-size: 0.84rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-tertiary);
}

.cook-ingredients-chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cook-ing-chip {
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-warm);
  background: var(--color-cream-surface);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-primary);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all var(--duration-fast);
}

.cook-ing-chip.is-checked {
  background: var(--color-herb-light);
  border-color: var(--color-herb-leaf);
  color: var(--color-herb-deep);
  text-decoration: line-through;
  opacity: 0.85;
}

/* Action Bullets & Tips */
.cook-action-chips {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cook-action-chip {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 1.02rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  line-height: 1.45;
}

.cook-chip-bullet {
  color: var(--color-tomato-coral);
  font-size: 0.95rem;
  flex-shrink: 0;
}

/* Chef Pro-Tip Box */
.cook-chef-tip-strip {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: radial-gradient(circle at 10% 10%, #FFFDF9, #FFF3E0);
  border: 1px solid var(--color-border-warm);
  border-radius: var(--radius-md);
  padding: 12px 18px;
  font-size: 0.96rem;
  color: var(--color-text-secondary);
  line-height: 1.45;
}

.cook-chef-tip-icon {
  font-size: 1.25rem;
  line-height: 1;
}

/* Interactive Countdown Timer */
.cook-timer {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  background: var(--color-peach-light);
  border: 2px solid var(--color-border-warm);
  border-radius: var(--radius-lg);
  padding: 12px 20px;
  transition: background 0.3s, border-color 0.3s;
}

.cook-timer-time {
  font: 800 2.6rem var(--font-sans);
  font-variant-numeric: tabular-nums;
  min-width: 4.6ch;
  color: var(--color-text-primary);
  letter-spacing: -0.03em;
}

.cook-timer.is-done {
  background: var(--color-herb-light);
  border-color: var(--color-herb-leaf);
  color: var(--color-herb-deep);
}

.cook-timer.is-running .cook-timer-time {
  color: var(--color-tomato-deep);
  animation: timerPulse 1s ease-in-out infinite alternate;
}

/* Right Column: Visual Stage & Up-Next Preview */
.cook-visual-stage-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
}

.cook-visual-stage-wrapper.slide-in-next {
  animation: cookVisualInNext 0.4s var(--ease-spring);
}

.cook-visual-stage-wrapper.slide-in-prev {
  animation: cookVisualInPrev 0.4s var(--ease-spring);
}

.cook-up-next-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  background: var(--color-cream-card);
  border: 1px solid var(--color-border-subtle);
  box-shadow: 0 2px 8px rgba(45, 26, 18, 0.05);
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  max-width: 400px;
  text-align: center;
}

.cook-up-next-label {
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-tomato-deep);
}

/* Bottom Navigation Bar */
.cook-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-top: 10px;
}

.cook-keyboard-hint {
  font-size: 0.92rem;
  color: var(--color-text-tertiary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Ingredient Check Screen Specifics */
.cook-chips {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.cook-chip {
  min-height: var(--tap-target-lg);
  border-radius: var(--radius-md);
  border: 2px solid var(--color-border-medium);
  background: var(--color-cream-surface);
  padding: 12px 18px;
  font: 700 1.08rem var(--font-sans);
  text-align: left;
  cursor: pointer;
  display: flex;
  gap: 14px;
  align-items: center;
  transition: transform var(--duration-fast) var(--ease-spring), background var(--duration-fast);
}

.cook-chip:active {
  transform: scale(0.97);
}

.cook-chip[aria-pressed="true"] {
  background: var(--color-herb-light);
  border-color: var(--color-herb-leaf);
  color: var(--color-herb-deep);
}

.cook-chip[aria-pressed="false"] {
  background: var(--color-tomato-light);
  border-color: var(--color-tomato-coral);
  color: var(--color-tomato-dark);
}

.cook-note {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  line-height: 1.5;
}

.cook-warn {
  color: var(--color-tomato-dark);
  font-weight: 700;
  font-size: 1.05rem;
}

.cook-live {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}


/* Honest missing-essential recovery inside the cooking journey */
.cook-recovery { display:flex; flex-direction:column; gap:12px; margin-top:4px; }
.cook-recovery-title { color:#793d18; font-weight:800; margin:0; font-size:1rem; }
.cook-recovery-list { display:grid; gap:10px; }
.cook-recovery-row { background:#fff9ed; border:1px solid #efd3aa; border-radius:16px; padding:12px 14px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; }
.cook-recovery-info { flex:1 1 200px; min-width:0; }
.cook-recovery-info strong { display:block; font-size:.98rem; color:#5b3722; }
.cook-recovery-info span { display:block; color:#77675b; font-size:.84rem; margin-top:3px; }
.cook-recovery-actions { display:flex; flex-wrap:wrap; align-items:center; gap:9px; }
.cook-sub-btn { background:#fff; border:1.5px solid #d8bfa7; border-radius:22px; padding:9px 14px; color:#173f37; cursor:pointer; font:700 .88rem var(--font-sans); }
.cook-sub-btn:hover { border-color:#176c56; background:#f1fbf5; }
.cook-sub-note { background:#e9f4ef; color:#13483e; padding:10px 14px; border-radius:12px; line-height:1.5; font-size:.9rem; }
.cook-recovery-footer { display:flex; flex-wrap:wrap; gap:12px; align-items:center; }
.cook-recovery-footer > button { flex:1 1 180px; }
.cook-shop-btn { background:#fff5e6; border-color:#ea9230; color:#89420b; }
.cook-shop-btn:hover { background:#ffe9cc; }
.cook-sub-banner { background:#e9f4ef; border:1px solid #b2d8c9; color:#164c41; padding:12px 16px; border-radius:15px; font-size:.92rem; line-height:1.45; }
.cook-missing-help { font-size:.88rem; color:#795c49; line-height:1.4; }
@media(max-width:600px){.cook-recovery-row{align-items:stretch}.cook-recovery-footer{flex-direction:column}.cook-recovery-footer > button{width:100%}}

/* Synchronized Keyframe Transitions */
@keyframes cookOverlayIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes cookStepInNext {
  from { opacity: 0; transform: translateX(28px) scale(0.98); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes cookStepInPrev {
  from { opacity: 0; transform: translateX(-28px) scale(0.98); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes cookVisualInNext {
  from { opacity: 0; transform: translateX(18px) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes cookVisualInPrev {
  from { opacity: 0; transform: translateX(-18px) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes timerPulse {
  from { transform: scale(1); }
  to { transform: scale(1.03); }
}

/* Responsive / Tablet Adjustments */
@media (max-width: 980px) {
  .cook-body {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .cook-card {
    padding: 28px 24px;
  }
  .cook-keyboard-hint {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cook-overlay,
  .cook-card,
  .cook-visual-stage-wrapper,
  .cook-progress > i,
  .cook-btn {
    animation: none !important;
    transition: none !important;
  }
}


/* Pocket cooking mode: visual instruction followed by short text and a reachable Next button. */
@media (max-width: 700px) {
  .cook-overlay { overscroll-behavior-y:contain; }
  .cook-sheet { width:100%; min-width:0; min-height:100dvh; padding:calc(12px + env(safe-area-inset-top,0px)) 14px calc(14px + env(safe-area-inset-bottom,0px)); gap:12px; }
  .cook-top { gap:10px; align-items:center; padding-bottom:9px; }
  .cook-top-title-lockup { display:block; min-width:0; }
  .cook-top h2 { white-space:normal; overflow:visible; text-overflow:clip; font-size:1.05rem; line-height:1.25; }
  .cook-top-kicker { display:none; }
  .cook-top .cook-btn { padding:0 12px; flex-shrink:0; min-height:42px; font-size:.76rem; }
  .cook-progress { height:8px; }
  .cook-body { display:flex; flex-direction:column; align-items:stretch; gap:12px; flex:0 0 auto; }
  .cook-visual-stage-wrapper { order:-1; gap:7px; width:100%; align-self:center; }
  .scene-3d-stage { width:min(100%,300px); max-width:300px; aspect-ratio:1.6; padding:10px; border-radius:22px; overflow:hidden; }
  .scene-svg-wrapper { max-width:230px; width:100%; height:150px; filter:drop-shadow(0 8px 9px rgba(45,26,18,.1)); }
  .scene-status-pill { margin-top:3px; padding:5px 10px; font-size:.7rem; text-align:center; }
  .cook-up-next-banner { display:none; }
  .cook-card { width:100%; padding:18px 16px; gap:11px; border-radius:22px; }
  .cook-step-meta-row { gap:6px; }
  .cook-step-badge, .cook-cue-pill { font-size:.72rem; padding:4px 9px; }
  .cook-step-title { font-size:clamp(1.34rem,5.8vw,1.65rem); line-height:1.2; }
  .cook-instruction-text { font-size:.98rem; line-height:1.48; padding:10px 12px; }
  .cook-action-chip { font-size:.9rem; line-height:1.36; }
  .cook-chef-tip-strip { padding:10px 12px; font-size:.83rem; }
  .cook-timer { padding:9px 13px; gap:8px; }
  .cook-timer-time { font-size:1.8rem; }
  .cook-chips { grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
  .cook-chip { min-width:0; min-height:50px; padding:10px; gap:7px; font-size:.83rem; overflow-wrap:anywhere; }
  .cook-note, .cook-warn { font-size:.87rem; }
  .cook-recovery-row { padding:10px; }
  .cook-recovery-actions { width:100%; }
  .cook-sub-btn { min-height:42px; }
  .cook-nav { position:sticky; bottom:0; z-index:4; display:flex; align-items:stretch; gap:8px; margin:0 -14px calc(-14px - env(safe-area-inset-bottom,0px)); padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px)); border-top:1px solid var(--color-border-subtle); background:rgba(250,245,235,.96); backdrop-filter:blur(9px); }
  .cook-nav .cook-btn { flex:1 1 0; min-width:0; min-height:48px; padding:8px 10px; font-size:.86rem; line-height:1.2; white-space:normal; }
  .cook-nav .cook-btn.is-primary { flex:1.6 1 0; padding:8px 10px; font-size:.92rem; }
  .cook-keyboard-hint { display:none; }
}
@media (max-width: 360px) {
  .cook-chips { grid-template-columns:1fr; }
  .scene-3d-stage { max-width:270px; }
  .cook-step-title { font-size:1.3rem; }
}
`;

export function openCookingJourney({ dish, resume = false, onExit = () => {}, onComplete = () => {} }) {
  if (!document.getElementById('aaj-cooking-styles')) {
    const st = document.createElement('style');
    st.id = 'aaj-cooking-styles';
    st.textContent = UNIFIED_JOURNEY_CSS;
    document.head.appendChild(st);
  }

  const steps = buildSteps(dish);
  const uncertain = uncertainEssentials(dish);
  const have = Object.fromEntries(uncertain.map((p) => [p.id, p.inStock]));
  let session = resume ? loadSession() : null;
  const substitutions = session?.substitutions ? { ...session.substitutions } : {};
  const missingNow = () => uncertain.filter(p => !have[p.id] && !substitutions[p.id]);
  let advancePrepConfirmed = Boolean(session?.advancePrepConfirmed);
  let phase = session ? 'cook' : (uncertain.length || dish.advancePreparation) ? 'confirm' : 'ready';
  if (!steps.length) phase = 'empty';

  // Navigation direction tracking for synchronized animations
  let navDirection = 'next';
  // Checked ingredients per step tracking
  const checkedIngredients = {};

  const overlay = document.createElement('div');
  overlay.className = 'cook-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `Cooking ${dish.name}`);

  const sheet = document.createElement('div');
  sheet.className = 'cook-sheet';

  const live = document.createElement('div');
  live.className = 'cook-live';
  live.setAttribute('aria-live', 'assertive');

  overlay.append(sheet, live);

  const save = () => session && saveSession(session);

  const top = () => `
    <div class="cook-top">
      <div class="cook-top-title-lockup">
        <h2>${dish.name}</h2>
        ${dish.hindiName ? `<span class="cook-top-kicker">${dish.hindiName}</span>` : ''}
      </div>
      <button type="button" class="cook-btn" data-act="exit" aria-label="Pause and exit to kitchen">
        <span>⏸</span>
        <span>Pause & Exit</span>
      </button>
    </div>
  `;

  function timerHtml() {
    const st = steps[session.stepIndex];
    if (!st.timerSec) return '';
    const t = session.timers[st.index];
    const left = t && !t.done ? Math.max(0, Math.ceil((t.endsAt - Date.now()) / 1000)) : 0;
    const cls = !t ? '' : t.done ? 'is-done' : 'is-running';
    const time = t?.done ? "Time's up! 🎉" : fmt(t ? left : st.timerSec);

    return `
      <div class="cook-timer ${cls}" role="timer" aria-label="Step timer">
        <span class="cook-timer-time">${time}</span>
        ${
          !t
            ? `<button type="button" class="cook-btn" data-act="timer-start">▶ Start timer (${Math.round(st.timerSec / 60)}m)</button>`
            : `<button type="button" class="cook-btn" data-act="timer-reset">↺ Reset</button>`
        }
      </div>
    `;
  }

  function draw(focusSel = '.cook-step-title') {
    if (phase === 'empty') {
      sheet.innerHTML = `
        ${top()}
        <div class="cook-card">
          <p class="cook-note">This dish has no recipe steps registered yet.</p>
        </div>
      `;
    } else if (phase === 'confirm') {
      const missing = missingNow();
      const lacking = missing.length;
      const substituted = Object.entries(substitutions).filter(([id]) => !have[id]);
      sheet.innerHTML = `
        ${top()}
        <div class="cook-body">
          <div class="cook-card">
            <div class="cook-step-meta-row">
              <span class="cook-step-badge">Pantry Check</span>
              <span class="cook-cue-pill">Before Lighting Stove</span>
            </div>
            <h3 class="cook-step-title" tabindex="-1">Quick check: do you have these today?</h3>
            <p class="cook-note">Tap any fresh or perishable item you are out of. Your remembered staples on this iPad won't be modified.</p>
            <div class="cook-chips">
              ${uncertain
                .map(
                  (p) => `
                <button type="button" class="cook-chip" data-act="toggle" data-id="${p.id}" aria-pressed="${have[p.id]}">
                  <span aria-hidden="true" style="font-size: 1.25rem;">${have[p.id] ? '✓' : '✕'}</span>
                  <span>${p.name}</span>
                </button>
              `
                )
                .join('')}
            </div>
            ${dish.advancePreparation ? `<div class="cook-sub-note" style="margin:14px 0;padding:13px 16px;background:#fff4e7;border:1px solid #eed4ae;border-radius:14px">
                <strong>⏳ Prepare ahead:</strong> ${safeText(dish.advancePreparation)}
                <button type="button" class="cook-btn" data-act="prep-confirm" aria-pressed="${advancePrepConfirmed}" style="display:block;margin-top:10px;min-height:44px;font-size:.9rem">
                  ${advancePrepConfirmed ? '✓ I have completed this preparation' : '□ I have completed this preparation'}
                </button>
              </div>` : ''}
            ${substituted.length ? `
              <div class="cook-sub-note" aria-live="polite">
                ✓ Using ${substituted.map(([id, option]) => `<strong>${safeText(option.name)}</strong> instead of ${safeText(uncertain.find(p => p.id === id)?.name || id)} <button type="button" class="cook-sub-btn" data-act="undo-substitute" data-id="${safeText(id)}">Undo</button>`).join('<br>')}
                <div class="cook-missing-help">The original recipe text may still name the original ingredient. Apply the substitution notes while cooking.</div>
              </div>
            ` : ''}
            ${lacking ? `
              <section class="cook-recovery" aria-label="Resolve missing ingredients">
                <p class="cook-recovery-title" role="status">⚠️ Missing ${lacking} essential ingredient${lacking === 1 ? '' : 's'}. Let's sort that out before cooking.</p>
                <div class="cook-recovery-list">
                  ${missing.map(p => {
                    const suggestion = COOKING_SUBSTITUTES[p.id];
                    return `<div class="cook-recovery-row">
                      <div class="cook-recovery-info"><strong>${safeText(p.name)}</strong>
                        <span>${suggestion ? `Possible alternative: ${safeText(suggestion.name)}. ${safeText(suggestion.note)}` : 'No reliable substitution available for this recipe.'}</span>
                      </div>
                      <div class="cook-recovery-actions">
                        ${suggestion ? `<button type="button" class="cook-sub-btn" data-act="use-substitute" data-id="${safeText(p.id)}" aria-label="I have ${safeText(suggestion.name)}; use it instead of ${safeText(p.name)}">✓ I have ${safeText(suggestion.name)}</button>` : ''}
                      </div>
                    </div>`;
                  }).join('')}
                </div>
                <div class="cook-recovery-footer">
                  <button type="button" class="cook-btn cook-shop-btn" data-act="shop-missing">🛒 Get missing ingredients</button>
                  <button type="button" class="cook-btn" data-act="exit">↩ Choose another meal</button>
                </div>
                <div class="cook-missing-help">Shopping won't mark items as available. After purchasing, tap their ingredient tiles to confirm you have them. Suggested substitutions are optional and must be available in your kitchen.</div>
              </section>
            ` : `<p class="cook-sub-note" role="status">✓ Everything needed is accounted for. Ready to start!</p>`}
            ${!lacking ? `<div class="cook-nav">
              <button type="button" class="cook-btn" data-act="exit">← Return to Meals</button>
              <button type="button" class="cook-btn is-primary" data-act="start" ${dish.advancePreparation && !advancePrepConfirmed ? 'disabled' : ''}>${dish.advancePreparation && !advancePrepConfirmed ? 'Confirm preparation first' : 'Start cooking →'}</button>
            </div>` : ''}
          </div>
          <div class="cook-visual-stage-wrapper">
            ${renderStepScene('knead_roll', dish)}
          </div>
        </div>
      `;
    } else if (phase === 'ready') {
      sheet.innerHTML = `
        ${top()}
        <div class="cook-body">
          <div class="cook-card">
            <div class="cook-step-meta-row">
              <span class="cook-step-badge">Ready</span>
              <span class="cook-cue-pill">${steps.length} Steps · ~${dish.totalTimeMinutes} Mins</span>
            </div>
            <h3 class="cook-step-title" tabindex="-1">All essentials ready. Let's cook!</h3>
            <p class="cook-note">We will guide you step-by-step with clear scannable instructions, action timers, and matching visual scenes.</p>
            <button type="button" class="cook-btn is-primary" data-act="start" style="align-self: flex-start; margin-top: 10px;">
              Start Cooking Now →
            </button>
          </div>
          <div class="cook-visual-stage-wrapper">
            ${renderStepScene('temper', dish)}
          </div>
        </div>
      `;
    } else if (phase === 'done') {
      sheet.innerHTML = `
        ${top()}
        <div class="cook-body">
          <div class="cook-card">
            <div class="cook-step-meta-row">
              <span class="cook-step-badge" style="background: var(--color-herb-light); color: var(--color-herb-deep);">Complete 🎉</span>
              <span class="cook-cue-pill">Dinner is Served</span>
            </div>
            <h3 class="cook-step-title" tabindex="-1">खाना तैयार है! Enjoy ${dish.name}.</h3>
            <p class="cook-note">Garnish hot with freshly chopped coriander and lime wedges. Delicious homemade dinner cooked in under ${dish.totalTimeMinutes} minutes.</p>
            ${dish.chefTip ? `
              <div class="cook-chef-tip-strip">
                <span class="cook-chef-tip-icon">✨</span>
                <div><strong>Plating Note:</strong> ${dish.chefTip}</div>
              </div>
            ` : ''}
            <div class="cook-nav" style="margin-top: 12px;">
              <button type="button" class="cook-btn is-primary" data-act="home">
                Back to aaj. Kitchen 🏡
              </button>
            </div>
          </div>
          <div class="cook-visual-stage-wrapper">
            ${renderStepScene('plate', dish)}
          </div>
        </div>
      `;
    } else {
      // PHASE === 'cook': UNIFIED SYNCHRONIZED STEP-BY-STEP VIEW
      const i = session.stepIndex;
      const last = i === steps.length - 1;
      const step = steps[i];
      const nextStep = !last ? steps[i + 1] : null;
      const prevStep = i > 0 ? steps[i - 1] : null;
      const slideClass = navDirection === 'prev' ? 'slide-in-prev' : 'slide-in-next';

      // Ingredients used in this step
      const stepIngredients = step.ingredientsUsed || [];

      sheet.innerHTML = `
        ${top()}

        <!-- Glowing Progress Bar -->
        <div class="cook-progress" role="progressbar" aria-valuemin="1" aria-valuemax="${steps.length}" aria-valuenow="${i + 1}" aria-label="Cooking progress">
          <i style="width: ${((i + 1) / steps.length) * 100}%;"></i>
        </div>

        <!-- Unified 2-Column Responsive Body -->
        <div class="cook-body">
          <!-- Left Column: Detailed, Practical Cooking Guidance -->
          <div class="cook-card ${slideClass}">
            <!-- Header Meta Strip -->
            <div class="cook-step-meta-row">
              <span class="cook-step-badge">Step ${i + 1} of ${steps.length}</span>
              <span class="cook-cue-pill">🔥 ${step.flame}</span>
              <span class="cook-cue-pill">🍳 ${step.utensil}</span>
            </div>

            ${Object.keys(session.substitutions || {}).length ? `<div class="cook-sub-banner" role="note">Ingredient swaps for this meal: ${Object.entries(session.substitutions).map(([id, option]) => `<strong>${safeText(option.name)}</strong> instead of ${safeText(uncertain.find(p => p.id === id)?.name || id)} (${safeText(option.note)})`).join('; ')}. Apply these adjustments when the instructions mention the original ingredient.</div>` : ''}
            <!-- Punchy Short Step Title -->
            <h3 class="cook-step-title" tabindex="-1">${step.title}</h3>

            <!-- Clear 1-2 Line Culinary Direction -->
            <p class="cook-instruction-text">${step.instruction}</p>

            <!-- Interactive Step Ingredients Checklist (if available) -->
            ${
              stepIngredients.length
                ? `
              <div class="cook-step-ingredients">
                <span class="cook-ingredients-heading">Ingredients for this step:</span>
                <div class="cook-ingredients-chips-row">
                  ${stepIngredients
                    .map((ing, idx) => {
                      const key = `${i}-${idx}`;
                      const isDone = !!checkedIngredients[key];
                      return `
                        <button type="button" class="cook-ing-chip ${isDone ? 'is-checked' : ''}" data-act="check-ing" data-key="${key}" title="Click when added">
                          <span>${isDone ? '✓' : '＋'}</span>
                          <span>${ing}</span>
                        </button>
                      `;
                    })
                    .join('')}
                </div>
              </div>
            `
                : ''
            }

            <!-- Small Supporting Action Bullets / Sensory Cues -->
            ${
              step.tips && step.tips.length
                ? `
              <div class="cook-action-chips">
                ${step.tips
                  .map(
                    (tip) => `
                  <div class="cook-action-chip">
                    <span class="cook-chip-bullet">✦</span>
                    <span>${tip}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>
            `
                : ''
            }

            <!-- Contextual Chef Pro-Tip -->
            ${
              (i === 1 || last) && dish.chefTip
                ? `
              <div class="cook-chef-tip-strip">
                <span class="cook-chef-tip-icon">💡</span>
                <div>
                  <strong>Chef Pro-Tip:</strong> ${dish.chefTip}
                </div>
              </div>
            `
                : ''
            }

            <!-- Working Countdown Timer (if timed step) -->
            <div id="cookTimerWrap">${timerHtml()}</div>
          </div>

          <!-- Right Column: Matching Animated Kitchen Scene & Up-Next Preview -->
          <div class="cook-visual-stage-wrapper ${slideClass}">
            <!-- Matching 3D-Feel Animated Scene for this Exact Step -->
            ${renderStepScene(step.sceneType, dish)}

            <!-- Up-Next Teaser -->
            ${
              nextStep
                ? `
              <div class="cook-up-next-banner">
                <span class="cook-up-next-label">Up Next:</span>
                <span>${nextStep.title} →</span>
              </div>
            `
                : `
              <div class="cook-up-next-banner" style="color: var(--color-herb-deep);">
                <span class="cook-up-next-label" style="color: var(--color-herb-leaf);">Final Step:</span>
                <span>Get plates and bowls ready!</span>
              </div>
            `
            }
          </div>
        </div>

        <!-- Bottom Touch-Optimized Navigation Bar -->
        <div class="cook-nav">
          <button type="button" class="cook-btn" data-act="prev" ${i === 0 ? 'disabled' : ''} aria-label="Previous step">
            ${prevStep ? `← Step ${i}: ${prevStep.title.slice(0, 22)}...` : '← Previous'}
          </button>

          <span class="cook-keyboard-hint">
            <span>⌨️</span>
            <span>Use ← / → keys to navigate steps · Space for timer</span>
          </span>

          <button type="button" class="cook-btn is-primary" data-act="next" aria-label="${last ? 'Finish cooking dinner' : 'Proceed to next step'}">
            ${last ? 'Finish cooking ✓' : `Next: ${nextStep ? nextStep.title.slice(0, 24) : 'Step ' + (i + 2)} →`}
          </button>
        </div>
      `;
    }

    sheet.querySelector(focusSel)?.focus({ preventScroll: true });
  }

  function start() {
    if (missingNow().length || (dish.advancePreparation && !advancePrepConfirmed)) {
      phase = 'confirm'; draw(); return;
    }
    session = {
      sessionId: `cook-${Date.now()}`,
      dishId: dish.id,
      stepIndex: 0,
      timers: {},
      startedAt: new Date().toISOString(),
      substitutions: { ...substitutions },
      advancePrepConfirmed,
      missingEssentials: missingNow().map((p) => p.id)
    };
    logCookingEvent('cooking_started', session, dish);
    save();
    phase = 'cook';
    navDirection = 'next';
    draw();
  }

  function go(d) {
    const n = session.stepIndex + d;
    if (n < 0) return;
    if (n >= steps.length) {
      logCookingEvent('cooking_completed', session, dish);
      clearSession();
      session = null;
      phase = 'done';
      haptics.cookChime();
      onComplete(dish);
      return draw();
    }
    navDirection = d > 0 ? 'next' : 'prev';
    session.stepIndex = n;
    save();
    haptics.pop();
    draw();
  }

  function close() {
    clearInterval(tick);
    document.removeEventListener('keydown', onKey, true);
    overlay.remove();
    onExit(dish);
  }

  const tick = setInterval(() => {
    if (phase !== 'cook' || !session) return;
    let changed = false;
    for (const [idx, t] of Object.entries(session.timers)) {
      if (!t.done && Date.now() >= t.endsAt) {
        t.done = true;
        changed = true;
        haptics.cookChime();
        live.textContent = `Timer finished for step ${+idx + 1}.`;
      }
    }
    if (changed) {
      save();
      const w = overlay.querySelector('#cookTimerWrap');
      if (w) w.innerHTML = timerHtml();
    }
    const el = overlay.querySelector('.cook-timer.is-running .cook-timer-time');
    const t = session.timers[session.stepIndex];
    if (el && t && !t.done) {
      el.textContent = fmt(Math.ceil((t.endsAt - Date.now()) / 1000));
    }
  }, 250);

  overlay.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const a = b.dataset.act;

    if (a === 'exit' || a === 'home') {
      haptics.tap();
      close();
    } else if (a === 'prep-confirm') {
      advancePrepConfirmed = !advancePrepConfirmed;
      haptics.tap();
      draw('[data-act="prep-confirm"]');
    } else if (a === 'toggle') {
      haptics.tap();
      have[b.dataset.id] = !have[b.dataset.id];
      if (have[b.dataset.id]) delete substitutions[b.dataset.id];
      draw(`[data-id="${b.dataset.id}"]`);
    } else if (a === 'use-substitute') {
      const id = b.dataset.id;
      if (!have[id] && COOKING_SUBSTITUTES[id]) {
        substitutions[id] = { ...COOKING_SUBSTITUTES[id] };
        live.textContent = `Using ${substitutions[id].name} instead of ${id.replace(/_/g, ' ')}.`;
        draw();
      }
    } else if (a === 'undo-substitute') {
      delete substitutions[b.dataset.id];
      draw();
    } else if (a === 'shop-missing') {
      const missing = missingNow();
      if (!missing.length) return;
      const pantryById = Object.fromEntries(getStoredPantry().map(item => [item.id, item]));
      const shoppingDish = {
        ...dish,
        availability: {
          ...dish.availability,
          missingDetails: missing.map(p => getGroundedIngredientDetail(dish, p.id, pantryById))
        }
      };
      const modal = renderShoppingHandoffModal({ dish: shoppingDish, onClose: () => {} });
      document.body.appendChild(modal);
    } else if (a === 'check-ing') {
      haptics.pop();
      const key = b.dataset.key;
      checkedIngredients[key] = !checkedIngredients[key];
      b.classList.toggle('is-checked', !!checkedIngredients[key]);
      const iconSpan = b.querySelector('span:first-child');
      if (iconSpan) iconSpan.textContent = checkedIngredients[key] ? '✓' : '＋';
    } else if (a === 'start') {
      haptics.tap();
      start();
    } else if (a === 'next') {
      haptics.pop();
      go(1);
    } else if (a === 'prev') {
      haptics.pop();
      go(-1);
    } else if (a === 'timer-start') {
      haptics.tap();
      const st = steps[session.stepIndex];
      session.timers[st.index] = {
        durationSec: st.timerSec,
        endsAt: Date.now() + st.timerSec * 1000,
        done: false
      };
      save();
      overlay.querySelector('#cookTimerWrap').innerHTML = timerHtml();
      overlay.querySelector('[data-act=timer-reset]')?.focus();
    } else if (a === 'timer-reset') {
      haptics.tap();
      delete session.timers[session.stepIndex];
      save();
      overlay.querySelector('#cookTimerWrap').innerHTML = timerHtml();
      overlay.querySelector('[data-act=timer-start]')?.focus();
    }
  });

  function onKey(e) {
    // The shopping modal has its own keyboard handling. Do not close the underlying cooking journey.
    if (document.querySelector('.sh-overlay')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      return close();
    }
    if (phase === 'cook' && (e.key === 'ArrowRight' || e.key === 'Enter')) {
      if (e.key === 'Enter' && e.target.tagName === 'BUTTON') return;
      e.preventDefault();
      go(1);
    } else if (phase === 'cook' && e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (phase === 'cook' && e.key === ' ') {
      if (e.target.tagName !== 'BUTTON') {
        const timerBtn = overlay.querySelector('#cookTimerWrap [data-act]');
        if (timerBtn) {
          e.preventDefault();
          timerBtn.click();
        }
      }
    } else if (e.key === 'Tab') {
      const f = [...overlay.querySelectorAll('button:not([disabled]), .cook-step-title')];
      if (!f.length) return;
      const first = f[0],
        lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  document.addEventListener('keydown', onKey, true);
  draw();
  return overlay;
}
