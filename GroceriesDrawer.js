/**
 * aaj. Pantry Memory Hub — v4 (Visual Cards + Surgical DOM Updates)
 *
 * Architecture:
 *  - ONE full render on open.
 *  - Every subsequent tap uses DIRECT DOM surgery — no innerHTML swaps, no re-render.
 *  - Only the tapped card and the summary counter update.
 *  - Scroll position is completely preserved on every interaction.
 *
 * Layout:
 *  1. Hero header — "What's in your kitchen today?" + live counter
 *  2. Visual Ingredient Grid — 10 featured ingredients as large illustrated cards
 *  3. Remembered Staples — compact chip rows grouped by category
 *  4. Full list toggle (collapsed by default)
 *  5. Sticky footer — "Find meals from my kitchen"
 */

import { getStoredPantry, saveStoredPantry, INITIAL_PANTRY_STAPLES } from '../data/pantryStaples.js';
import { DISH_CATALOG } from '../data/dishCatalog.js';
import { evaluateDishAvailability } from '../adapter/recommendationEngineAdapter.js';
import { haptics } from './AudioHaptics.js';

// ─── Inline SVG food illustrations ───────────────────────────────────────────
// Hand-crafted layered SVGs that give a warm 3D-ish feel within CSS
export const FOOD_ART = {
  onions: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="58" rx="22" ry="8" fill="rgba(140,60,20,0.12)"/>
    <ellipse cx="40" cy="50" rx="21" ry="20" fill="#C0392B"/>
    <ellipse cx="40" cy="50" rx="21" ry="20" fill="url(#og)"/>
    <ellipse cx="40" cy="42" rx="17" ry="16" fill="#E74C3C" opacity=".7"/>
    <ellipse cx="33" cy="38" rx="6" ry="9" fill="rgba(255,255,255,0.18)" transform="rotate(-18,33,38)"/>
    <path d="M32 20 Q36 8 40 14 Q44 8 48 20" stroke="#5D8A3C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M36 22 Q38 12 40 16 Q42 12 44 22" stroke="#4A7A30" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <defs><radialGradient id="og" cx="35%" cy="30%"><stop offset="0%" stop-color="#F1948A"/><stop offset="100%" stop-color="#96281B"/></radialGradient></defs>
  </svg>`,

  tomatoes: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="60" rx="22" ry="7" fill="rgba(140,30,10,0.12)"/>
    <circle cx="40" cy="50" r="22" fill="url(#tg)"/>
    <ellipse cx="33" cy="36" rx="7" ry="10" fill="rgba(255,255,255,0.2)" transform="rotate(-15,33,36)"/>
    <path d="M36 24 Q38 14 40 18 M40 18 Q42 14 44 24" stroke="#2E7D32" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <path d="M38 20 Q35 10 32 14" stroke="#388E3C" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    <path d="M42 20 Q45 10 48 14" stroke="#388E3C" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    <defs><radialGradient id="tg" cx="38%" cy="30%"><stop offset="0%" stop-color="#FF6B6B"/><stop offset="55%" stop-color="#E53935"/><stop offset="100%" stop-color="#B71C1C"/></radialGradient></defs>
  </svg>`,

  paneer: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="62" rx="24" ry="8" fill="rgba(140,110,60,0.14)"/>
    <rect x="12" y="30" width="56" height="34" rx="6" fill="url(#pg)"/>
    <rect x="12" y="30" width="56" height="12" rx="6" fill="url(#pt)"/>
    <rect x="16" y="34" width="12" ry="2" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
    <circle cx="38" cy="50" r="3" fill="rgba(255,255,255,0.15)"/>
    <circle cx="52" cy="45" r="2" fill="rgba(255,255,255,0.12)"/>
    <circle cx="27" cy="52" r="2.5" fill="rgba(255,255,255,0.1)"/>
    <defs>
      <linearGradient id="pg" x1="12" y1="30" x2="68" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#FFF8E1"/><stop offset="1" stop-color="#FFE082"/></linearGradient>
      <linearGradient id="pt" x1="12" y1="30" x2="68" y2="42" gradientUnits="userSpaceOnUse"><stop stop-color="#FFFFFF" stop-opacity=".9"/><stop offset="1" stop-color="#FFF9C4" stop-opacity=".6"/></linearGradient>
    </defs>
  </svg>`,

  dahi: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="65" rx="20" ry="6" fill="rgba(100,80,40,0.12)"/>
    <path d="M18 36 Q18 68 40 68 Q62 68 62 36" fill="url(#dg)"/>
    <ellipse cx="40" cy="36" rx="22" ry="8" fill="#E8F5E9"/>
    <ellipse cx="40" cy="36" rx="22" ry="8" fill="url(#dt)" opacity=".9"/>
    <ellipse cx="34" cy="34" rx="8" ry="3" fill="rgba(255,255,255,0.5)" transform="rotate(-8,34,34)"/>
    <path d="M32 44 Q40 40 48 44" stroke="rgba(255,200,100,0.6)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <defs>
      <linearGradient id="dg" x1="18" y1="36" x2="62" y2="68" gradientUnits="userSpaceOnUse"><stop stop-color="#FAFAFA"/><stop offset="1" stop-color="#F3E5F5"/></linearGradient>
      <radialGradient id="dt" cx="50%" cy="50%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E0E0E0"/></radialGradient>
    </defs>
  </svg>`,

  coriander: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="66" rx="14" ry="5" fill="rgba(50,120,50,0.15)"/>
    <path d="M40 62 L40 32" stroke="#388E3C" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M40 48 Q28 38 24 26 Q32 30 40 42" fill="#43A047" opacity=".9"/>
    <path d="M40 42 Q52 32 56 20 Q48 26 40 38" fill="#2E7D32" opacity=".85"/>
    <path d="M40 54 Q30 48 26 38 Q34 40 40 50" fill="#66BB6A" opacity=".8"/>
    <path d="M40 50 Q50 44 54 34 Q46 38 40 46" fill="#4CAF50" opacity=".75"/>
    <circle cx="40" cy="32" r="3.5" fill="#A5D6A7"/>
    <circle cx="26" cy="26" r="2.5" fill="#C8E6C9"/>
    <circle cx="56" cy="20" r="2.5" fill="#C8E6C9"/>
  </svg>`,

  potatoes: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="62" rx="22" ry="7" fill="rgba(120,90,30,0.14)"/>
    <ellipse cx="40" cy="50" rx="24" ry="18" fill="url(#potg)"/>
    <ellipse cx="31" cy="38" rx="9" ry="12" fill="rgba(255,255,255,0.14)" transform="rotate(-20,31,38)"/>
    <circle cx="52" cy="48" r="2.5" fill="rgba(100,70,20,0.3)"/>
    <circle cx="34" cy="58" r="2" fill="rgba(100,70,20,0.25)"/>
    <circle cx="45" cy="56" r="1.5" fill="rgba(100,70,20,0.2)"/>
    <defs><radialGradient id="potg" cx="38%" cy="35%"><stop offset="0%" stop-color="#F9E4B7"/><stop offset="60%" stop-color="#D4A017"/><stop offset="100%" stop-color="#9A7D0A"/></radialGradient></defs>
  </svg>`,

  rice: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="64" rx="22" ry="7" fill="rgba(100,80,40,0.12)"/>
    <path d="M16 44 Q16 68 40 68 Q64 68 64 44" fill="url(#rg)"/>
    <ellipse cx="40" cy="44" rx="24" ry="9" fill="#FAFAFA"/>
    <ellipse cx="40" cy="44" rx="24" ry="9" fill="url(#rt)" opacity=".8"/>
    ${Array.from({length:14}, (_,i) => {
      const x = 24 + (i%7)*6, y = 40 + Math.floor(i/7)*6;
      return `<ellipse cx="${x}" cy="${y}" rx="2.5" ry="1.2" fill="white" opacity=".9" transform="rotate(${i*25},${x},${y})"/>`;
    }).join('')}
    <defs>
      <linearGradient id="rg" x1="16" y1="44" x2="64" y2="68" gradientUnits="userSpaceOnUse"><stop stop-color="#FFF9F0"/><stop offset="1" stop-color="#F5E6CC"/></linearGradient>
      <radialGradient id="rt" cx="40%" cy="30%"><stop offset="0%" stop-color="white"/><stop offset="100%" stop-color="#E8D8B0"/></radialGradient>
    </defs>
  </svg>`,

  atta: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="64" rx="20" ry="7" fill="rgba(120,90,40,0.14)"/>
    <rect x="18" y="28" width="44" height="38" rx="8" fill="url(#ag)"/>
    <rect x="18" y="28" width="44" height="14" rx="8" fill="rgba(255,255,255,0.3)"/>
    <text x="40" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="rgba(120,80,20,0.6)" font-family="serif">आटा</text>
    <ellipse cx="31" cy="34" rx="8" ry="4" fill="rgba(255,255,255,0.25)" transform="rotate(-10,31,34)"/>
    <defs><linearGradient id="ag" x1="18" y1="28" x2="62" y2="66" gradientUnits="userSpaceOnUse"><stop stop-color="#FDEBD0"/><stop offset="1" stop-color="#D4A017" stop-opacity=".6"/></linearGradient></defs>
  </svg>`,

  milk: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="66" rx="16" ry="5" fill="rgba(80,80,80,0.1)"/>
    <path d="M28 28 L26 64 Q26 70 40 70 Q54 70 54 64 L52 28Z" fill="url(#mg)"/>
    <rect x="27" y="22" width="26" height="10" rx="4" fill="#E3F2FD"/>
    <rect x="27" y="22" width="26" height="10" rx="4" fill="url(#mt)" opacity=".7"/>
    <ellipse cx="40" cy="40" rx="11" ry="4" fill="rgba(255,255,255,0.4)"/>
    <defs>
      <linearGradient id="mg" x1="28" y1="28" x2="54" y2="70" gradientUnits="userSpaceOnUse"><stop stop-color="#FAFAFA"/><stop offset="1" stop-color="#E0E0E0"/></linearGradient>
      <radialGradient id="mt"><stop offset="0%" stop-color="white" stop-opacity=".9"/><stop offset="100%" stop-color="#BBDEFB" stop-opacity=".4"/></radialGradient>
    </defs>
  </svg>`,

  chillies: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="65" rx="16" ry="5" fill="rgba(140,20,20,0.12)"/>
    <path d="M44 20 Q52 14 54 18 Q52 22 46 24" fill="#2E7D32"/>
    <path d="M32 60 Q20 48 24 32 Q28 20 38 20 Q50 20 50 36 Q50 52 42 62 Q38 66 32 60Z" fill="url(#cg)"/>
    <ellipse cx="34" cy="34" rx="5" ry="10" fill="rgba(255,255,255,0.18)" transform="rotate(-20,34,34)"/>
    <path d="M36 56 Q28 48 28 36" stroke="rgba(180,0,0,0.3)" stroke-width="1" fill="none"/>
    <defs><linearGradient id="cg" x1="20" y1="20" x2="52" y2="68" gradientUnits="userSpaceOnUse"><stop stop-color="#FF5252"/><stop offset="40%" stop-color="#D32F2F"/><stop offset="100%" stop-color="#7F0000"/></linearGradient></defs>
  </svg>`,
};

// ─── Featured ingredients shown as large visual cards ────────────────────────
export const FEATURED_INGREDIENTS = [
  { id: 'onions',         artKey: 'onions',    name: 'Onions',     hindi: 'प्याज़',    color: '#FFF0F0' },
  { id: 'tomatoes',       artKey: 'tomatoes',  name: 'Tomatoes',   hindi: 'टमाटर',   color: '#FFF5F0' },
  { id: 'paneer',         artKey: 'paneer',    name: 'Paneer',     hindi: 'पनीर',    color: '#FFFDE7' },
  { id: 'dahi',           artKey: 'dahi',      name: 'Dahi',       hindi: 'दही',     color: '#F0FFF4' },
  { id: 'fresh_coriander',artKey: 'coriander', name: 'Coriander',  hindi: 'धनिया',   color: '#F0FFF4' },
  { id: 'potatoes',       artKey: 'potatoes',  name: 'Aloo',       hindi: 'आलू',     color: '#FFFDE7' },
  { id: 'basmati_rice',   artKey: 'rice',      name: 'Rice',       hindi: 'चावल',    color: '#FFF8E1' },
  { id: 'atta',           artKey: 'atta',      name: 'Atta',       hindi: 'आटा',     color: '#FFF3E0' },
  { id: 'milk',           artKey: 'milk',      name: 'Milk',       hindi: 'दूध',     color: '#F3F8FF' },
  { id: 'green_chilli',   artKey: 'chillies',  name: 'Chillies',   hindi: 'मिर्च',   color: '#F1FFF0' },
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
/* ── Overlay ── */
.pm-overlay {
  position:fixed; inset:0; z-index:300;
  background:rgba(20,16,10,.54);
  backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
  display:flex; align-items:center; justify-content:center; padding:20px;
  font-family:var(--font-sans); color:var(--color-text-primary);
  animation:pmFadeIn .25s ease-out;
}
/* ── Sheet ── */
.pm-sheet {
  background:#FEFCF7;
  border-radius:28px;
  box-shadow:0 36px 90px rgba(20,14,6,.24), 0 1px 0 rgba(255,255,255,.9) inset;
  width:100%; max-width:720px; max-height:92vh;
  display:flex; flex-direction:column; overflow:hidden;
  border:1px solid rgba(220,195,155,.3);
  animation:pmSheetUp .32s cubic-bezier(.34,1.56,.64,1);
}
/* ── Topbar ── */
.pm-topbar {
  display:flex; align-items:center; justify-content:space-between;
  padding:18px 26px 12px; flex-shrink:0;
  background:#FEFCF7;
  border-bottom:1px solid rgba(45,26,18,.06);
}
.pm-brand-pill {
  display:inline-flex; align-items:center; gap:7px;
  background:var(--color-butter-yellow); color:var(--color-herb-deep);
  font-size:.74rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase;
  padding:4px 13px; border-radius:20px;
}
.pm-close {
  width:40px; height:40px; border-radius:50%;
  border:1.5px solid rgba(45,26,18,.14); background:rgba(255,255,255,.8);
  font-size:1rem; color:var(--color-text-secondary); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:transform .2s ease,background .2s; flex-shrink:0;
}
.pm-close:hover { background:#FFF; transform:scale(1.1) rotate(90deg); }

/* ── Scrollable body ── */
.pm-body {
  flex:1; overflow-y:auto; overflow-x:hidden;
  padding:0 26px 24px;
  scrollbar-width:thin; scrollbar-color:rgba(180,150,110,.25) transparent;
}
.pm-body::-webkit-scrollbar { width:5px; }
.pm-body::-webkit-scrollbar-thumb { background:rgba(180,150,110,.25); border-radius:4px; }

/* ── Headline ── */
.pm-headline { font-family:var(--font-display); font-size:1.75rem; font-weight:800;
  color:var(--color-text-primary); letter-spacing:-.03em; margin:20px 0 5px; line-height:1.1; }
.pm-subline { font-size:.95rem; color:var(--color-text-secondary); font-weight:500;
  margin:0 0 18px; line-height:1.45; }

/* ── Live counter summary ── */
.pm-counter-strip {
  display:flex; align-items:center; gap:14px; flex-wrap:wrap;
  padding:12px 16px; background:rgba(255,255,255,.8);
  border:1.5px solid rgba(220,195,155,.35); border-radius:16px; margin-bottom:22px;
  box-shadow:0 2px 10px rgba(45,26,18,.05);
}
.pm-counter-stat { display:flex; align-items:baseline; gap:5px; }
.pm-counter-num {
  font-family:var(--font-display); font-size:1.6rem; font-weight:800;
  color:var(--color-text-primary); letter-spacing:-.04em; line-height:1;
  transition:color .3s;
}
.pm-counter-label { font-size:.8rem; font-weight:600; color:var(--color-text-secondary); }
.pm-counter-divider { width:1px; height:28px; background:rgba(45,26,18,.1); flex-shrink:0; }
.pm-counter-ideas { display:flex; flex-direction:column; gap:3px; }
.pm-counter-ideas-num {
  font-family:var(--font-display); font-size:1.6rem; font-weight:800;
  color:var(--color-herb-leaf); letter-spacing:-.04em; line-height:1;
  transition:color .3s;
}
.pm-counter-ideas-label { font-size:.8rem; font-weight:600; color:var(--color-text-secondary); }
.pm-counter-dishes { display:flex; flex-wrap:wrap; gap:5px; margin-left:auto; }
.pm-mini-dish-pill {
  background:rgba(56,116,86,.1); border:1px solid rgba(56,116,86,.2);
  color:var(--color-herb-deep); font-size:.75rem; font-weight:700;
  padding:3px 9px; border-radius:20px; display:inline-flex; align-items:center; gap:4px;
}

/* ── Section label ── */
.pm-section-title {
  font-size:.78rem; font-weight:800; letter-spacing:.07em; text-transform:uppercase;
  color:var(--color-text-tertiary); margin:0 0 13px;
  display:flex; align-items:center; gap:10px;
}
.pm-section-title::after { content:''; flex:1; height:1px; background:rgba(45,26,18,.08); }

/* ── Visual ingredient grid ── */
.pm-visual-grid {
  display:grid;
  grid-template-columns:repeat(5, 1fr);
  gap:10px; margin-bottom:28px;
}
@media (max-width:560px) { .pm-visual-grid { grid-template-columns:repeat(4,1fr); gap:8px; } }
@media (max-width:420px) { .pm-visual-grid { grid-template-columns:repeat(3,1fr); gap:7px; } }

/* ── Visual ingredient card ── */
.pm-ing-card {
  position:relative; border-radius:20px; padding:14px 8px 12px;
  display:flex; flex-direction:column; align-items:center; gap:6px;
  cursor:pointer; border:2px solid transparent;
  background:#FFF;
  box-shadow:0 2px 10px rgba(45,26,18,.07);
  transition:
    transform .22s cubic-bezier(.34,1.56,.64,1),
    box-shadow .22s ease,
    border-color .2s ease,
    background .2s ease;
  user-select:none; -webkit-tap-highlight-color:transparent;
}
.pm-ing-card:hover { transform:translateY(-4px); box-shadow:0 10px 28px rgba(45,26,18,.13); }
.pm-ing-card:active { transform:scale(.95); }

/* IN-STOCK state */
.pm-ing-card.in-stock {
  border-color:var(--color-herb-leaf);
  background:linear-gradient(160deg,#F4FEF6 0%,#E8F7ED 100%);
  box-shadow:0 4px 20px rgba(56,116,86,.2);
}
/* OUT state (not in kitchen) */
.pm-ing-card.out-stock {
  border-color:rgba(45,26,18,.12);
  opacity:.72;
}
.pm-ing-card.out-stock:hover { opacity:1; border-color:rgba(220,100,100,.4); }

/* SVG art frame */
.pm-ing-art {
  width:60px; height:60px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1);
}
.pm-ing-card.in-stock .pm-ing-art { transform:scale(1.08); }
.pm-ing-art svg { width:100%; height:100%; }

.pm-ing-name {
  font-size:.8rem; font-weight:800; color:var(--color-text-primary);
  text-align:center; line-height:1.2;
}
.pm-ing-hindi {
  font-family:var(--font-indic); font-size:.75rem; color:var(--color-herb-leaf);
  opacity:.8; text-align:center; line-height:1;
}

/* Tick badge */
.pm-ing-tick {
  position:absolute; top:7px; right:7px;
  width:20px; height:20px; border-radius:50%;
  background:var(--color-herb-leaf); color:#FFF;
  font-size:.65rem; font-weight:800;
  display:flex; align-items:center; justify-content:center;
  opacity:0; transform:scale(.3) rotate(-45deg);
  transition:opacity .22s, transform .28s cubic-bezier(.34,1.56,.64,1);
  pointer-events:none;
  box-shadow:0 2px 8px rgba(56,116,86,.4);
}
.pm-ing-card.in-stock .pm-ing-tick { opacity:1; transform:scale(1) rotate(0deg); }

/* Glow ring animation on tap */
@keyframes pmRingPulse {
  0%   { box-shadow:0 0 0 0 rgba(56,116,86,.5), 0 4px 20px rgba(56,116,86,.2); }
  60%  { box-shadow:0 0 0 10px rgba(56,116,86,0), 0 4px 20px rgba(56,116,86,.2); }
  100% { box-shadow:0 0 0 0 rgba(56,116,86,0), 0 4px 20px rgba(56,116,86,.2); }
}
.pm-ing-card.ring-pulse { animation:pmRingPulse .5s ease-out; }

/* Art bounce on tap */
@keyframes pmArtBounce {
  0%  { transform:scale(1.08); }
  35% { transform:scale(1.28) rotate(-6deg); }
  65% { transform:scale(1.0) rotate(3deg); }
  100%{ transform:scale(1.08); }
}
.pm-ing-card.in-stock.art-bounce .pm-ing-art { animation:pmArtBounce .4s cubic-bezier(.34,1.56,.64,1); }

/* My masala box: glanceable spice tiles with verified/remembered/out states. */
.pm-masala-box{padding:16px 17px;margin:16px 0 22px;border-radius:20px;background:linear-gradient(125deg,#fff9eb,#fff7f0);border:1px solid #eddfbe}
.pm-masala-title-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.pm-masala-box .pm-section-title{margin:0 0 4px}.pm-masala-sub{font-size:.78rem;line-height:1.3;color:var(--color-text-secondary);margin:0}.pm-masala-hint{font-size:.7rem;font-weight:800;color:#b57437;white-space:nowrap}
.pm-masala-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin-top:13px}
.pm-spice-tile{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;min-height:91px;padding:11px 7px;border-radius:15px;background:#fffaf3;border:1.5px dashed #decda9;cursor:pointer;transition:transform .12s,background .12s,border-color .12s}
.pm-spice-tile:active{transform:scale(.97)}.pm-spice-tile[data-state=confirmed]{border-style:solid;border-color:#3d8060;background:#ecf7ed}.pm-spice-tile[data-state=unavailable]{background:#f5f1ed;border-color:#ddd5cc;opacity:.72}
.pm-spice-emoji{font-size:1.35rem;line-height:1.3}.pm-spice-name{font-size:.72rem;font-weight:800;text-align:center;overflow-wrap:anywhere}.pm-spice-status{font-size:.65rem;color:#9b7534;font-weight:700}.pm-spice-tile[data-state=confirmed] .pm-spice-status{color:#1c754d}.pm-spice-tile[data-state=unavailable] .pm-spice-status{color:#a25f54}
.pm-spice-tile:focus-visible{outline:3px solid #9b7dc3;outline-offset:2px}
@media(max-width:560px){.pm-masala-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}.pm-masala-box{padding:12px}.pm-spice-tile{min-height:82px;padding:8px 3px}.pm-spice-name{font-size:.67rem}.pm-masala-hint{display:none}}
@media(max-width:345px){.pm-masala-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}

/* ── Compact staple chips ── */
.pm-staples-section { margin-bottom:24px; }
.pm-staple-group { margin-bottom:14px; }
.pm-staple-group-label {
  font-size:.74rem; font-weight:800; letter-spacing:.06em; text-transform:uppercase;
  color:var(--color-text-tertiary); margin:0 0 8px; display:flex; align-items:center; gap:7px;
}
.pm-staple-dot { width:7px; height:7px; border-radius:50%; display:inline-block; flex-shrink:0; }
.pm-staple-dot.green  { background:var(--color-herb-leaf); }
.pm-staple-dot.amber  { background:#E8A838; }
.pm-staple-dot.muted  { background:rgba(45,26,18,.22); }

.pm-chip-row { display:flex; flex-wrap:wrap; gap:7px; }
.pm-chip {
  display:inline-flex; align-items:center; gap:7px;
  padding:7px 13px 7px 9px; border-radius:50px;
  background:#FFF; border:1.5px solid rgba(220,195,155,.45);
  font-size:.86rem; font-weight:600; color:var(--color-text-primary);
  cursor:pointer;
  transition:transform .18s cubic-bezier(.34,1.56,.64,1), border-color .18s, background .18s, box-shadow .18s, opacity .2s;
  box-shadow:0 1px 5px rgba(45,26,18,.05);
}
.pm-chip:hover { transform:translateY(-2px); box-shadow:0 5px 14px rgba(45,26,18,.09); }
.pm-chip.chip-in { border-color:var(--color-herb-leaf); background:#F3FDF5; }
.pm-chip.chip-out { opacity:.62; }
.pm-chip.chip-out:hover { opacity:1; border-color:rgba(220,80,80,.4); }
.pm-chip-icon { font-size:1.05rem; }
.pm-chip-dot {
  width:15px; height:15px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:.6rem; font-weight:800;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1);
}
.pm-chip-dot.in { background:var(--color-herb-leaf); color:#FFF; }
.pm-chip-dot.out { background:rgba(45,26,18,.08); color:rgba(45,26,18,.4); border:1px dashed rgba(45,26,18,.2); }
.pm-chip.chip-in .pm-chip-dot { transform:scale(1.1); }

/* Chip bounce */
@keyframes pmChipBounce {
  0%  { transform:scale(1); }
  40% { transform:scale(1.14) translateY(-3px); }
  70% { transform:scale(.97) translateY(1px); }
  100%{ transform:scale(1); }
}
.pm-chip.chip-bounce { animation:pmChipBounce .35s cubic-bezier(.34,1.56,.64,1); }

/* ── Full list & search toggle ── */
.pm-browse-toggle-row {
  display:flex; align-items:center; justify-content:space-between; gap:12px;
  padding:12px 0; border-top:1px solid rgba(45,26,18,.07); margin-bottom:0;
}
.pm-search-inline {
  flex:1; max-width:260px; padding:7px 14px; border-radius:50px;
  background:#FFF; border:1.5px solid rgba(220,195,155,.45);
  font-size:.84rem; font-weight:500; color:var(--color-text-primary);
  font-family:var(--font-sans); outline:none; transition:border-color .18s, box-shadow .18s;
}
.pm-search-inline:focus { border-color:var(--color-tomato-coral); box-shadow:0 0 0 3px rgba(255,90,95,.12); }
.pm-search-inline::placeholder { color:var(--color-text-tertiary); }
.pm-browse-toggle-btn {
  display:flex; align-items:center; gap:8px;
  background:none; border:none; cursor:pointer;
  font-size:.88rem; font-weight:700; color:var(--color-text-secondary); padding:0;
  transition:color .15s;
}
.pm-browse-toggle-btn:hover { color:var(--color-text-primary); }
.pm-browse-chevron { font-size:.72rem; transition:transform .22s ease; }
.pm-browse-chevron.open { transform:rotate(180deg); }

.pm-browse-panel {
  overflow:hidden; max-height:0; opacity:0; margin-top:0;
  transition:max-height .3s ease, opacity .25s ease, margin-top .25s ease;
}
.pm-browse-panel.open { max-height:380px; opacity:1; margin-top:14px; }

.pm-cat-tabs {
  display:flex; gap:7px; overflow-x:auto; margin-bottom:12px; scrollbar-width:none; padding-bottom:2px;
}
.pm-cat-tabs::-webkit-scrollbar { display:none; }
.pm-cat-tab {
  padding:6px 14px; border-radius:50px; border:1.5px solid transparent;
  background:transparent; font-size:.83rem; font-weight:700; color:var(--color-text-secondary);
  cursor:pointer; white-space:nowrap; transition:all .15s;
}
.pm-cat-tab:hover { background:rgba(45,26,18,.05); color:var(--color-text-primary); }
.pm-cat-tab.active {
  background:#FFF; border-color:var(--color-tomato-coral); color:var(--color-tomato-coral);
  box-shadow:0 2px 10px rgba(255,90,95,.12);
}
.pm-browse-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:7px;
  max-height:280px; overflow-y:auto; scrollbar-width:thin;
  scrollbar-color:rgba(180,150,110,.2) transparent;
}
.pm-browse-grid::-webkit-scrollbar { width:4px; }
.pm-browse-grid::-webkit-scrollbar-thumb { background:rgba(180,150,110,.2); border-radius:4px; }
.pm-browse-item {
  display:flex; align-items:center; gap:8px; padding:9px 11px; border-radius:13px;
  background:#FFF; border:1.5px solid rgba(220,195,155,.35);
  cursor:pointer; font-size:.83rem; font-weight:600; color:var(--color-text-primary);
  transition:all .16s; box-shadow:0 1px 4px rgba(45,26,18,.03);
}
.pm-browse-item:hover { transform:translateY(-2px); box-shadow:0 5px 14px rgba(45,26,18,.08); }
.pm-browse-item.in-stock { border-color:var(--color-herb-leaf); background:#F3FDF5; }
.pm-browse-item.out-stock { opacity:.65; }
.pm-browse-item.out-stock:hover { opacity:1; }
.pm-browse-item-icon { font-size:1.2rem; flex-shrink:0; }
.pm-browse-item-check { margin-left:auto; color:var(--color-herb-leaf); font-size:.85rem; flex-shrink:0; }

/* ── Disclaimer ── */
.pm-disclaimer {
  display:flex; align-items:flex-start; gap:9px;
  padding:11px 15px; background:rgba(45,26,18,.04);
  border-radius:13px; margin-top:20px;
  font-size:.8rem; color:var(--color-text-secondary); line-height:1.45;
}

/* ── Footer CTA ── */
.pm-footer {
  flex-shrink:0; padding:14px 26px 20px;
  background:linear-gradient(to top,#FEFCF7 72%,transparent);
  border-top:1px solid rgba(45,26,18,.07);
}
.pm-footer-row { display:flex; gap:11px; align-items:center; }
.pm-cta {
  flex:1; min-height:52px; padding:0 26px; border-radius:50px; border:none;
  background:linear-gradient(135deg,#E84B4B,#C53030);
  color:#FFF; font:700 1rem var(--font-sans);
  cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:9px;
  box-shadow:0 6px 24px rgba(220,50,50,.3);
  transition:transform .2s cubic-bezier(.34,1.56,.64,1), filter .2s;
}
.pm-cta:hover { filter:brightness(1.08); transform:scale(1.02); }
.pm-cta:active { transform:scale(.97); }
.pm-done-btn {
  min-height:52px; padding:0 20px; border-radius:50px;
  border:1.5px solid rgba(45,26,18,.15); background:rgba(255,255,255,.9);
  color:var(--color-text-secondary); font:600 .88rem var(--font-sans);
  cursor:pointer; transition:all .18s;
}
.pm-done-btn:hover { border-color:rgba(45,26,18,.3); color:var(--color-text-primary); background:#FFF; }

/* ── Animations ── */
@keyframes pmFadeIn  { from{opacity:0} to{opacity:1} }
@keyframes pmSheetUp { from{opacity:0;transform:scale(.95) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }

/* ── Counter update flash ── */
@keyframes pmNumFlash {
  0%  { color:var(--color-herb-leaf); transform:scale(1.2); }
  60% { color:var(--color-herb-leaf); transform:scale(1.08); }
  100%{ color:inherit; transform:scale(1); }
}
.pm-flash { animation:pmNumFlash .4s ease-out; }

/* ── Mobile bottom sheet ── */
@media (max-width:560px) {
  .pm-overlay { align-items:flex-end; padding:0; }
  .pm-sheet { border-radius:24px 24px 0 0; max-height:95vh; }
  .pm-topbar,.pm-body,.pm-footer { padding-left:18px; padding-right:18px; }
}

/* Comfortable full-screen Kitchen Memory on phones — no clipped CTA or nested page scroll. */
@media (max-width:560px) {
  .pm-overlay { align-items:stretch; padding:0; }
  .pm-sheet { height:100dvh; max-height:100dvh; width:100%; border:0; border-radius:0; animation:none; }
  .pm-topbar { padding:12px 15px 10px; }
  .pm-body { min-height:0; padding:0 15px 15px; overscroll-behavior:contain; }
  .pm-headline { font-size:1.55rem; margin-top:13px; }
  .pm-subline { font-size:.86rem; margin-bottom:12px; }
  .pm-counter-strip { gap:9px; padding:10px; margin-bottom:14px; }
  .pm-visual-grid { grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; }
  .pm-ing-card { min-width:0; padding:10px 5px; border-radius:16px; }
  .pm-ing-art { width:48px; height:48px; }
  .pm-footer { padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px)); }
  .pm-footer-row { flex-direction:column; align-items:stretch; gap:7px; }
  .pm-cta, .pm-done-btn { width:100%; min-height:48px; font-size:.9rem; }
}
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeFeasibility(pantry) {
  const feasible = DISH_CATALOG.filter(dish => {
    const r = evaluateDishAvailability(dish, pantry);
    return r.status === 'all_in_pantry' || r.status === 'missing_optional';
  });
  return { count: feasible.length, dishes: feasible, inStockCount: pantry.filter(p => p.inStock).length };
}

// The masala dabba is a quick visual check, not another inventory spreadsheet.
const MASALA_BOX_IDS = ['salt','turmeric','cumin','red_chilli_powder','dhaniya_powder','garam_masala','hing','ajwain'];

// Groups for compact staples — avoid duplicating top visual cards or masala dabba.
function groupStaples(pantry) {
  const featuredIds = new Set([...FEATURED_INGREDIENTS.map(f => f.id), ...MASALA_BOX_IDS]);
  const remaining = pantry.filter(p => !featuredIds.has(p.id));

  const catOrder = ['grains', 'fresh', 'dairy', 'spices', 'oils'];
  const catMeta = {
    grains: { label: 'Grains & Dal', dot: 'green' },
    fresh:  { label: 'Fresh Vegetables', dot: 'green' },
    dairy:  { label: 'Dairy & Protein', dot: 'green' },
    spices: { label: 'Spices & Masalas', dot: 'amber' },
    oils:   { label: 'Oils & Ghee', dot: 'muted' },
  };

  return catOrder.map(cat => ({
    cat, ...catMeta[cat],
    items: remaining.filter(p => p.category === cat),
  })).filter(g => g.items.length > 0);
}

// ─── Component ───────────────────────────────────────────────────────────────

export function renderGroceriesDrawer({ onClose, onPantryUpdated, onFindMeals }) {
  // Inject styles once per page
  if (!document.getElementById('aaj-pm-v4-styles')) {
    const s = document.createElement('style');
    s.id = 'aaj-pm-v4-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ── Reactive state ─────────────────────────────────────────────────────────
  let pantry = getStoredPantry();
  let browseOpen = false;
  let browseCategory = 'all';
  let searchQuery = '';

  // ── Close handler ──────────────────────────────────────────────────────────
  const handleClose = () => {
    overlay.style.animation = 'pmFadeIn .18s ease-out reverse';
    setTimeout(() => { overlay.remove(); onClose(); }, 160);
  };

  // ── Surgical DOM updaters (no re-render) ───────────────────────────────────

  /** Update the top counter strip with new feasibility data — no scroll disturbance */
  function updateCounter() {
    const { count, dishes, inStockCount } = computeFeasibility(pantry);
    const numEl = overlay.querySelector('[data-pm-counter="in"]');
    const ideasEl = overlay.querySelector('[data-pm-counter="ideas"]');
    const dishesEl = overlay.querySelector('[data-pm-counter="dishes"]');
    if (numEl) {
      numEl.textContent = inStockCount;
      numEl.classList.remove('pm-flash');
      void numEl.offsetWidth; // reflow to restart animation
      numEl.classList.add('pm-flash');
    }
    if (ideasEl) {
      ideasEl.textContent = count;
      ideasEl.classList.remove('pm-flash');
      void ideasEl.offsetWidth;
      ideasEl.classList.add('pm-flash');
    }
    if (dishesEl) {
      dishesEl.innerHTML = dishes.slice(0, 3).map(d =>
        `<span class="pm-mini-dish-pill">✦ ${d.name.split(' with ')[0]}</span>`
      ).join('') + (dishes.length > 3 ? `<span class="pm-mini-dish-pill" style="opacity:.55">+${dishes.length-3}</span>` : '');
    }
  }

  /** Update a single visual card — no scroll disturbance */
  function updateVisualCard(id, inStock) {
    const card = overlay.querySelector(`.pm-ing-card[data-id="${id}"]`);
    if (!card) return;
    const wasInStock = card.classList.contains('in-stock');

    card.classList.toggle('in-stock', inStock);
    card.classList.toggle('out-stock', !inStock);
    card.style.background = inStock ? '' : (card.dataset.offBg || '');
    card.setAttribute('aria-pressed', String(inStock));

    if (inStock && !wasInStock) {
      // Trigger glow ring + art bounce
      card.classList.remove('ring-pulse', 'art-bounce');
      void card.offsetWidth;
      card.classList.add('ring-pulse', 'art-bounce');
      setTimeout(() => { card.classList.remove('ring-pulse', 'art-bounce'); }, 500);
    }
  }

  /** Update a compact chip — no scroll disturbance */
  function updateChip(id, inStock) {
    const chip = overlay.querySelector(`.pm-chip[data-id="${id}"]`);
    if (!chip) return;
    chip.classList.toggle('chip-in', inStock);
    chip.classList.toggle('chip-out', !inStock);
    chip.setAttribute('aria-pressed', String(inStock));
    const dot = chip.querySelector('.pm-chip-dot');
    if (dot) { dot.className = `pm-chip-dot ${inStock ? 'in' : 'out'}`; dot.textContent = inStock ? '✓' : '+'; }
    // Bounce
    chip.classList.remove('chip-bounce');
    void chip.offsetWidth;
    chip.classList.add('chip-bounce');
    setTimeout(() => chip.classList.remove('chip-bounce'), 400);
  }

  /** Update a browse grid item — no scroll disturbance */
  function updateBrowseItem(id, inStock) {
    const item = overlay.querySelector(`.pm-browse-item[data-id="${id}"]`);
    if (!item) return;
    item.classList.toggle('in-stock', inStock);
    item.classList.toggle('out-stock', !inStock);
    const check = item.querySelector('.pm-browse-item-check');
    if (check) check.style.display = inStock ? '' : 'none';
  }

  /** Master toggle — updates data, persists, then surgically patches the DOM */
  function toggleIngredient(id) {
    const idx = pantry.findIndex(p => p.id === id);
    if (idx === -1) return;
    const newInStock = !pantry[idx].inStock;
    const newKitchenState = newInStock ? 'recent' : 'unavailable';
    pantry = pantry.map(p => p.id === id ? { ...p, inStock: newInStock, kitchenState: newKitchenState } : p);
    saveStoredPantry(pantry);
    onPantryUpdated(pantry);

    // Patch DOM surgically
    updateVisualCard(id, newInStock);
    updateChip(id, newInStock);
    updateBrowseItem(id, newInStock);
    updateCounter();
  }

  /** Masala dabba cycles remembered → confirmed today → unavailable → confirmed.
   * Only the tapped tile and counters change; no screen refresh. */
  function toggleMasala(id) {
    const item = pantry.find(p => p.id === id);
    if (!item) return;
    const old = item.kitchenState || (item.inStock ? 'remembered' : 'unavailable');
    const next = old === 'confirmed' ? 'unavailable' : 'confirmed';
    pantry = pantry.map(p => p.id === id ? {
      ...p, kitchenState: next, inStock: next !== 'unavailable'
    } : p);
    saveStoredPantry(pantry);
    const tile = overlay.querySelector(`.pm-spice-tile[data-id="${id}"]`);
    if (tile) {
      tile.dataset.state = next;
      tile.setAttribute('aria-label', `${item.name}: ${next === 'confirmed' ? 'confirmed today' : 'out of stock'}`);
      const badge = tile.querySelector('.pm-spice-status');
      if (badge) badge.textContent = next === 'confirmed' ? '✓ Today' : '✕ Out';
    }
    // Browse list also tracks the change if it is open.
    updateBrowseItem(id, next !== 'unavailable');
    updateCounter();
    onPantryUpdated(pantry);
  }

  // ── Render browse panel ────────────────────────────────────────────────────
  function renderBrowsePanel() {
    const cats = [
      { key:'all',    label:'All' },
      { key:'grains', label:'🌾 Grains' },
      { key:'fresh',  label:'🍅 Fresh' },
      { key:'dairy',  label:'🧀 Dairy' },
      { key:'spices', label:'🌶️ Spices' },
      { key:'oils',   label:'🧈 Oils' },
    ];
    let items = browseCategory === 'all' ? pantry : pantry.filter(p => p.category === browseCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = pantry.filter(p =>
        p.name.toLowerCase().includes(q) || (p.hindiName && p.hindiName.toLowerCase().includes(q))
      );
    }
    return `
      ${!searchQuery ? `
        <div class="pm-cat-tabs" role="tablist">
          ${cats.map(c => `
            <button type="button" class="pm-cat-tab ${browseCategory === c.key ? 'active' : ''}"
              data-act="browse-cat" data-cat="${c.key}">${c.label}</button>
          `).join('')}
        </div>
      ` : ''}
      <div class="pm-browse-grid">
        ${items.length ? items.map(item => `
          <button type="button" class="pm-browse-item ${item.inStock ? 'in-stock' : 'out-stock'}"
            data-act="toggle" data-id="${item.id}">
            <span class="pm-browse-item-icon">${item.icon || '🥣'}</span>
            <span>${item.name}</span>
            <span class="pm-browse-item-check" style="display:${item.inStock ? '' : 'none'}">✓</span>
          </button>
        `).join('') : `<div style="grid-column:1/-1;text-align:center;padding:16px;color:var(--color-text-tertiary);font-size:.88rem;">No matching ingredients found</div>`}
      </div>
    `;
  }

  // ── Full initial render (once) ─────────────────────────────────────────────
  function buildHTML() {
    const { count, dishes, inStockCount } = computeFeasibility(pantry);
    const topDishes = dishes.slice(0, 3);
    const groups = groupStaples(pantry);

    return `
      <div class="pm-sheet">

        <!-- Topbar -->
        <div class="pm-topbar">
          <span class="pm-brand-pill">🧺 Kitchen Memory</span>
          <button type="button" class="pm-close" data-act="close" aria-label="Close">✕</button>
        </div>

        <!-- Scrollable body -->
        <div class="pm-body">

          <h2 class="pm-headline">What's in your kitchen today?</h2>
          <p class="pm-subline">Tap to update — we'll find the best dinner for you.</p>

          <!-- Live counter strip -->
          <div class="pm-counter-strip">
            <div class="pm-counter-stat">
              <span class="pm-counter-num" data-pm-counter="in">${inStockCount}</span>
              <span class="pm-counter-label">ingredients<br>in kitchen</span>
            </div>
            <div class="pm-counter-divider"></div>
            <div class="pm-counter-ideas">
              <span class="pm-counter-ideas-num" data-pm-counter="ideas">${count}</span>
              <span class="pm-counter-ideas-label">possible<br>meal ideas</span>
            </div>
            <div class="pm-counter-dishes" data-pm-counter="dishes">
              ${topDishes.map(d => `<span class="pm-mini-dish-pill">✦ ${d.name.split(' with ')[0]}</span>`).join('')}
              ${dishes.length > 3 ? `<span class="pm-mini-dish-pill" style="opacity:.55">+${dishes.length-3}</span>` : ''}
            </div>
          </div>

          <!-- Visual ingredient grid -->
          <div class="pm-section-title">Main ingredients</div>
          <div class="pm-visual-grid">
            ${FEATURED_INGREDIENTS.map(fi => {
              const item = pantry.find(p => p.id === fi.id);
              const inStock = item ? item.inStock : false;
              return `
                <button type="button"
                  class="pm-ing-card ${inStock ? 'in-stock' : 'out-stock'}"
                  data-act="toggle" data-id="${fi.id}"
                  data-off-bg="${fi.color}"
                  aria-pressed="${inStock}"
                  style="background:${inStock ? '' : fi.color};"
                >
                  <span class="pm-ing-tick" aria-hidden="true">✓</span>
                  <div class="pm-ing-art" aria-hidden="true">${FOOD_ART[fi.artKey] || fi.artKey}</div>
                  <span class="pm-ing-name">${fi.name}</span>
                  <span class="pm-ing-hindi">${fi.hindi}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Fast, honest masala check: no lengthy spice inventory. -->
          <section class="pm-masala-box" aria-label="My masala box">
            <div class="pm-masala-title-row"><div>
              <div class="pm-section-title">🌶️ My masala box</div>
              <p class="pm-masala-sub">Tap to confirm a spice today; tap again if you're out.</p>
            </div><span class="pm-masala-hint">3 states · one tap</span></div>
            <div class="pm-masala-grid">
              ${MASALA_BOX_IDS.map(id => {
                const p = pantry.find(item => item.id === id);
                if (!p) return '';
                const state = p.kitchenState || (p.inStock ? 'remembered' : 'unavailable');
                const label = state === 'confirmed' ? '✓ Today' : state === 'unavailable' ? '✕ Out' : 'Remembered';
                return `<button type="button" class="pm-spice-tile" data-act="toggle-spice" data-id="${id}"
                  data-state="${state}" aria-label="${p.name}: ${label}">
                  <span class="pm-spice-emoji" aria-hidden="true">${p.icon || '🌶️'}</span>
                  <span class="pm-spice-name">${p.name.replace(/\s*\([^)]*\)/g,'')}</span>
                  <span class="pm-spice-status">${label}</span>
                </button>`;
              }).join('')}
            </div>
            <p class="pm-masala-sub" style="margin:9px 0 0">Other masalas are in <strong>Browse all staples → Spices</strong>.</p>
          </section>

          <!-- Compact remembered staples -->
          <div class="pm-staples-section">
            <div class="pm-section-title">Remembered staples</div>
            ${groups.map(g => `
              <div class="pm-staple-group">
                <div class="pm-staple-group-label">
                  <span class="pm-staple-dot ${g.dot}"></span>${g.label}
                </div>
                <div class="pm-chip-row">
                  ${g.items.map(item => `
                    <button type="button"
                      class="pm-chip ${item.inStock ? 'chip-in' : 'chip-out'}"
                      data-act="toggle" data-id="${item.id}"
                      aria-pressed="${item.inStock}"
                    >
                      <span class="pm-chip-icon" aria-hidden="true">${item.icon || '🥣'}</span>
                      <span>${item.name}</span>
                      <span class="pm-chip-dot ${item.inStock ? 'in' : 'out'}">${item.inStock ? '✓' : '+'}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Full list & search toggle -->
          <div class="pm-browse-toggle-row">
            <button type="button" class="pm-browse-toggle-btn" data-act="toggle-browse">
              <span>📋</span>
              <span>Browse all ${pantry.length} staples</span>
              <span class="pm-browse-chevron ${browseOpen ? 'open' : ''}" id="pmChevron" aria-hidden="true">▾</span>
            </button>
            <input
              type="search"
              class="pm-search-inline"
              id="pmSearchInline"
              placeholder="🔍 Search more…"
              autocomplete="off"
              spellcheck="false"
            />
          </div>
          <div class="pm-browse-panel ${browseOpen ? 'open' : ''}" id="pmBrowsePanel">
            ${renderBrowsePanel()}
          </div>

          <!-- Disclaimer -->
          <div class="pm-disclaimer">
            <span>ℹ️</span>
            <span><strong>Remembered on this device.</strong> Perishable freshness is confirmed when you start cooking — not assumed in advance.</span>
          </div>

        </div><!-- /pm-body -->

        <!-- Sticky footer -->
        <div class="pm-footer">
          <div class="pm-footer-row">
            <button type="button" class="pm-cta" data-act="find-meals">
              <span>🍽️</span><span>Find meals from my kitchen</span><span>→</span>
            </button>
            <button type="button" class="pm-done-btn" data-act="close">Done</button>
          </div>
        </div>

      </div>
    `;
  }

  // ── Overlay element ────────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'pm-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Kitchen Memory — update your pantry');
  overlay.innerHTML = buildHTML();

  // Wire live search input (updates only the browse panel surgically)
  const searchInput = overlay.querySelector('#pmSearchInline');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (searchQuery && !browseOpen) {
        browseOpen = true;
      }
      const panel = overlay.querySelector('#pmBrowsePanel');
      const chevron = overlay.querySelector('#pmChevron');
      if (panel) {
        panel.innerHTML = renderBrowsePanel();
        panel.classList.toggle('open', browseOpen);
      }
      if (chevron) chevron.classList.toggle('open', browseOpen);
    });
  }

  // ── Event delegation ───────────────────────────────────────────────────────
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { handleClose(); return; }

    const target = e.target.closest('[data-act]');
    if (!target) return;
    const act = target.dataset.act;

    switch (act) {

      case 'toggle': {
        haptics.pop && haptics.pop();
        toggleIngredient(target.dataset.id);
        break;
      }
      case 'toggle-spice': {
        haptics.pop && haptics.pop();
        toggleMasala(target.dataset.id);
        break;
      }

      case 'close': {
        haptics.tap && haptics.tap();
        handleClose();
        break;
      }

      case 'find-meals': {
        haptics.cookChime && haptics.cookChime();
        if (onFindMeals) onFindMeals(pantry);
        handleClose();
        break;
      }

      case 'toggle-browse': {
        haptics.tap && haptics.tap();
        browseOpen = !browseOpen;
        const panel = overlay.querySelector('#pmBrowsePanel');
        const chevron = overlay.querySelector('#pmChevron');
        if (panel) panel.classList.toggle('open', browseOpen);
        if (chevron) chevron.classList.toggle('open', browseOpen);
        break;
      }

      case 'browse-cat': {
        haptics.tap && haptics.tap();
        browseCategory = target.dataset.cat;
        const panel = overlay.querySelector('#pmBrowsePanel');
        if (panel) panel.innerHTML = renderBrowsePanel();
        // Re-open state
        if (panel) panel.classList.add('open');
        break;
      }
    }
  });

  // Keyboard escape
  const keyHandler = (e) => {
    if (e.key === 'Escape') { document.removeEventListener('keydown', keyHandler); handleClose(); }
  };
  document.addEventListener('keydown', keyHandler);

  return overlay;
}
