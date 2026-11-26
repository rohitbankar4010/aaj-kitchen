/**
 * aaj. First-Open Kitchen Check (P1)
 *
 * Shown once per day (or on first visit) so the user can quickly confirm
 * what is actually in their kitchen today without treating remembered
 * groceries as confirmed stock.
 *
 * - Reuses existing visual SVG ingredient cards (FOOD_ART + FEATURED_INGREDIENTS)
 * - Prepopulates remembered essentials clearly marked as "Remembered" (not confirmed)
 * - One tap confirms or cycles availability without full-modal re-rendering
 * - Includes "Find my dinner" and "Skip for now"
 * - Remembers completion for the current calendar day
 */

import { getStoredPantry, saveStoredPantry } from '../data/pantryStaples.js';
import { FOOD_ART, FEATURED_INGREDIENTS } from './GroceriesDrawer.js';
import { haptics } from './AudioHaptics.js';

const DAILY_CHECK_KEY = 'aaj_kitchen_check_date_v1';

export function getTodayDateString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function shouldShowDailyKitchenCheck() {
  try {
    const lastCheck = localStorage.getItem(DAILY_CHECK_KEY);
    return lastCheck !== getTodayDateString();
  } catch {
    return false;
  }
}

export function markDailyKitchenCheckDone() {
  try {
    localStorage.setItem(DAILY_CHECK_KEY, getTodayDateString());
  } catch (e) {
    console.warn('Could not save daily kitchen check date:', e);
  }
}

const CHECK_CSS = `
.fkc-overlay {
  position: fixed; inset: 0; z-index: 320;
  background: rgba(24, 18, 12, 0.52);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
  font-family: var(--font-sans); color: var(--color-text-primary);
  animation: pmFadeIn .25s ease-out;
}
.fkc-card {
  background: #FEFCF7;
  border-radius: 28px;
  box-shadow: 0 36px 90px rgba(20,14,6,.24), 0 1px 0 rgba(255,255,255,.9) inset;
  width: 100%; max-width: 700px; max-height: 92vh;
  display: flex; flex-direction: column; overflow: hidden;
  border: 1px solid rgba(220,195,155,.35);
  animation: pmSheetUp .32s cubic-bezier(.34,1.56,.64,1);
}
.fkc-header {
  padding: 22px 26px 14px;
  display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
  border-bottom: 1px solid rgba(45,26,18,.06);
  background: #FEFCF7;
}
.fkc-pill {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--color-butter-yellow); color: var(--color-herb-deep);
  font-size: .74rem; font-weight: 800; letter-spacing: .07em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 20px; margin-bottom: 10px;
}
.fkc-title {
  font-family: var(--font-display); font-size: 1.75rem; font-weight: 800;
  letter-spacing: -.03em; line-height: 1.1; margin: 0 0 5px;
}
.fkc-sub {
  font-size: .92rem; color: var(--color-text-secondary); margin: 0; line-height: 1.4;
}
.fkc-body {
  flex: 1; overflow-y: auto; padding: 18px 26px 20px;
}
.fkc-legend-bar {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  margin-bottom: 14px;
}
.fkc-legend-pills {
  display: flex; align-items: center; gap: 12px; font-size: .78rem; font-weight: 600; color: var(--color-text-secondary);
}
.fkc-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 4px; }
.fkc-dot.confirmed { background: var(--color-herb-leaf); }
.fkc-dot.remembered { background: #E8A838; }
.fkc-dot.out { background: rgba(45,26,18,.22); }
.fkc-confirm-all-btn {
  background: rgba(56,116,86,.1); border: 1px solid rgba(56,116,86,.25);
  color: var(--color-herb-deep); font-size: .8rem; font-weight: 700;
  padding: 6px 13px; border-radius: 20px; cursor: pointer;
  transition: transform .15s, background .15s;
}
.fkc-confirm-all-btn:hover { background: rgba(56,116,86,.18); transform: translateY(-1px); }

.fkc-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;
}
@media (max-width: 560px) { .fkc-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; } }

.fkc-tile {
  position: relative; border-radius: 20px; padding: 14px 8px 12px;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  cursor: pointer; border: 2px solid transparent; background: #FFF;
  box-shadow: 0 2px 10px rgba(45,26,18,.06);
  transition: transform .2s cubic-bezier(.34,1.56,.64,1), border-color .2s, background .2s, opacity .2s;
  user-select: none;
}
.fkc-tile:hover { transform: translateY(-3px); }
.fkc-tile:active { transform: scale(.96); }
.fkc-tile.state-confirmed {
  border-color: var(--color-herb-leaf);
  background: linear-gradient(160deg,#F4FEF6 0%,#E8F7ED 100%);
}
.fkc-tile.state-remembered {
  border-color: #E8A838;
  border-style: dashed;
  background: linear-gradient(160deg,#FFFDF5 0%,#FFF7E0 100%);
}
.fkc-tile.state-unavailable {
  border-color: rgba(45,26,18,.12);
  opacity: .6;
}
.fkc-tile-badge {
  position: absolute; top: 6px; right: 6px;
  padding: 2px 6px; border-radius: 12px;
  font-size: .62rem; font-weight: 800; letter-spacing: .02em;
}
.state-confirmed .fkc-tile-badge { background: var(--color-herb-leaf); color: #FFF; }
.state-remembered .fkc-tile-badge { background: #F59E0B; color: #FFF; }
.state-unavailable .fkc-tile-badge { background: rgba(45,26,18,.12); color: var(--color-text-secondary); }

.fkc-tile-art { width: 52px; height: 52px; }
.fkc-tile-art svg { width: 100%; height: 100%; }
.fkc-tile-name { font-size: .8rem; font-weight: 800; color: var(--color-text-primary); }
.fkc-tile-hindi { font-family: var(--font-indic); font-size: .72rem; color: var(--color-herb-leaf); opacity: .85; }

.fkc-footer {
  padding: 14px 26px 20px;
  background: #FEFCF7; border-top: 1px solid rgba(45,26,18,.07);
  display: flex; align-items: center; gap: 12px;
}
.fkc-btn-primary {
  flex: 1; min-height: 52px; padding: 0 24px; border-radius: 50px; border: none;
  background: linear-gradient(135deg,#E84B4B,#C53030);
  color: #FFF; font: 700 1rem var(--font-sans); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: 0 6px 24px rgba(220,50,50,.28);
  transition: transform .18s cubic-bezier(.34,1.56,.64,1), filter .18s;
}
.fkc-btn-primary:hover { filter: brightness(1.06); transform: scale(1.02); }
.fkc-btn-skip {
  min-height: 52px; padding: 0 20px; border-radius: 50px;
  border: 1.5px solid rgba(45,26,18,.15); background: #FFF;
  color: var(--color-text-secondary); font: 600 .9rem var(--font-sans); cursor: pointer;
}
.fkc-btn-skip:hover { border-color: rgba(45,26,18,.3); color: var(--color-text-primary); }
`;

export function renderFirstOpenKitchenCheck({ onComplete, onSkip }) {
  if (!document.getElementById('aaj-fkc-styles')) {
    const s = document.createElement('style');
    s.id = 'aaj-fkc-styles';
    s.textContent = CHECK_CSS;
    document.head.appendChild(s);
  }

  let pantry = getStoredPantry();

  const getState = (id) => {
    const item = pantry.find(p => p.id === id);
    if (!item) return 'unavailable';
    if (item.kitchenState === 'confirmed') return 'confirmed';
    if (item.kitchenState === 'unavailable' || !item.inStock) return 'unavailable';
    return 'remembered'; // remembered or recent -> prepopulated, not yet confirmed today
  };

  const badgeLabel = (st) => {
    if (st === 'confirmed') return '✓ Today';
    if (st === 'unavailable') return '✕ Out';
    return 'Remembered';
  };

  // Cycle: remembered -> confirmed -> unavailable -> confirmed
  const nextState = (st) => {
    if (st === 'remembered') return 'confirmed';
    if (st === 'confirmed') return 'unavailable';
    return 'confirmed';
  };

  const overlay = document.createElement('div');
  overlay.className = 'fkc-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', "What's in your kitchen today?");

  overlay.innerHTML = `
    <div class="fkc-card">
      <div class="fkc-header">
        <div>
          <span class="fkc-pill">☀️ Quick Daily Check</span>
          <h2 class="fkc-title">What's in your kitchen today?</h2>
          <p class="fkc-sub">We prepopulated your remembered essentials. Tap once to confirm ✓ or mark out ✕.</p>
        </div>
      </div>

      <div class="fkc-body">
        <div class="fkc-legend-bar">
          <div class="fkc-legend-pills">
            <span><span class="fkc-dot remembered"></span>Remembered (unverified)</span>
            <span><span class="fkc-dot confirmed"></span>Confirmed today</span>
            <span><span class="fkc-dot out"></span>Out of stock</span>
          </div>
          <button type="button" class="fkc-confirm-all-btn" data-act="confirm-all">✓ Confirm all remembered</button>
        </div>

        <div class="fkc-grid">
          ${FEATURED_INGREDIENTS.map(fi => {
            const st = getState(fi.id);
            return `
              <button type="button" class="fkc-tile state-${st}" data-act="cycle" data-id="${fi.id}" aria-label="${fi.name}: ${st}">
                <span class="fkc-tile-badge">${badgeLabel(st)}</span>
                <div class="fkc-tile-art" aria-hidden="true">${FOOD_ART[fi.artKey] || ''}</div>
                <span class="fkc-tile-name">${fi.name}</span>
                <span class="fkc-tile-hindi">${fi.hindi}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="fkc-footer">
        <button type="button" class="fkc-btn-primary" data-act="find-dinner">
          <span>🍽️</span>
          <span>Find my dinner</span>
          <span>→</span>
        </button>
        <button type="button" class="fkc-btn-skip" data-act="skip">Skip for now</button>
      </div>
    </div>
  `;

  function patchTile(id, st) {
    const tile = overlay.querySelector(`.fkc-tile[data-id="${id}"]`);
    if (!tile) return;
    tile.className = `fkc-tile state-${st}`;
    tile.setAttribute('aria-label', `${id}: ${st}`);
    const badge = tile.querySelector('.fkc-tile-badge');
    if (badge) badge.textContent = badgeLabel(st);
  }

  const closeOverlay = (cb) => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.18s ease-out';
    setTimeout(() => {
      overlay.remove();
      cb();
    }, 180);
  };

  overlay.addEventListener('click', (e) => {
    const target = e.target.closest('[data-act]');
    if (!target) return;
    const act = target.dataset.act;

    if (act === 'cycle') {
      haptics.pop && haptics.pop();
      const id = target.dataset.id;
      const st = nextState(getState(id));
      pantry = pantry.map(p => p.id === id
        ? { ...p, kitchenState: st, inStock: st !== 'unavailable' }
        : p
      );
      saveStoredPantry(pantry);
      patchTile(id, st);
    } else if (act === 'confirm-all') {
      haptics.cookChime && haptics.cookChime();
      const featuredIds = new Set(FEATURED_INGREDIENTS.map(f => f.id));
      pantry = pantry.map(p => {
        if (featuredIds.has(p.id) && p.inStock && p.kitchenState !== 'confirmed') {
          return { ...p, kitchenState: 'confirmed', inStock: true };
        }
        return p;
      });
      saveStoredPantry(pantry);
      FEATURED_INGREDIENTS.forEach(fi => patchTile(fi.id, getState(fi.id)));
    } else if (act === 'find-dinner') {
      haptics.cookChime && haptics.cookChime();
      markDailyKitchenCheckDone();
      closeOverlay(() => onComplete(pantry));
    } else if (act === 'skip') {
      haptics.tap && haptics.tap();
      markDailyKitchenCheckDone();
      closeOverlay(() => onSkip());
    }
  });

  return overlay;
}
