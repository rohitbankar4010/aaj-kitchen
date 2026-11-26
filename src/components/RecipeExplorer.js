/**
 * aaj. Recipe Explorer — searchable 30-dish catalogue with pantry-aware matches.
 * No extra API, and no inventory changes while browsing.
 */
import { DISH_CATALOG } from '../data/dishCatalog.js';
import { evaluateDishAvailability } from '../adapter/recommendationEngineAdapter.js';
import { getDishVisualMarkup } from '../data/dishVisuals.js';

const FAVORITES_KEY = 'aaj_favorite_dishes_v1';
const safe = (s) => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function readFavorites() {
  try { const x = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'); return new Set(Array.isArray(x) ? x : []); }
  catch { return new Set(); }
}
function writeFavorites(ids) {
  try { localStorage.setItem(FAVORITES_KEY, JSON.stringify([...ids])); } catch { /* storage unavailable */ }
}

export function renderRecipeExplorer({ pantry, initialMood = 'all', onSelectDish, onClose }) {
  const favorites = readFavorites();
  let mood = initialMood;
  let mode = 'all';
  let search = '';

  const overlay = document.createElement('div');
  overlay.className = 'aaj-explorer-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Find a meal');
  overlay.innerHTML = `
    <section class="aaj-explorer-sheet">
      <header class="aaj-explorer-heading">
        <div><span class="aaj-explorer-eyebrow">DISCOVER · 30 INDIAN DISHES</span>
          <h2>Find something <em>delicious.</em></h2>
          <p>Search by dish or ingredient. We'll show what your kitchen can make.</p></div>
        <button class="aaj-explorer-close" type="button" aria-label="Close recipe browser">✕</button>
      </header>
      <div class="aaj-explorer-controls">
        <label class="aaj-explorer-search-label"><span aria-hidden="true">⌕</span>
          <input class="aaj-explorer-search" type="search" aria-label="Search recipes or ingredients" placeholder="Try paneer, rice, chilla, 20-minute dinner..." autocomplete="off" />
        </label>
        <div class="aaj-explorer-chips" role="group" aria-label="Recipe mood">
          <button type="button" data-mood="all">All meals</button>
          <button type="button" data-mood="quick">⚡ Quick</button>
          <button type="button" data-mood="comfort">🫕 Comfort</button>
          <button type="button" data-mood="healthy">🥗 Healthy</button>
          <button type="button" data-mood="surprise_me">✨ Discover</button>
        </div>
        <div class="aaj-explorer-mode" role="group" aria-label="Availability">
          <button type="button" data-mode="all">All matches</button>
          <button type="button" data-mode="ready">Likely in my kitchen</button>
          <button type="button" data-mode="favorites">♡ Saved</button>
        </div>
      </div>
      <p class="aaj-explorer-count" aria-live="polite"></p>
      <div class="aaj-explorer-results" aria-label="Recipe choices"></div>
      <div class="aaj-explorer-footnote">✦ Recipes marked “Likely” use remembered groceries — check ingredients before cooking.</div>
    </section>`;

  const input = overlay.querySelector('.aaj-explorer-search');
  const results = overlay.querySelector('.aaj-explorer-results');
  const count = overlay.querySelector('.aaj-explorer-count');
  const lookup = Object.fromEntries(pantry.map(p => [p.id, p.name]));
  const enrich = DISH_CATALOG.map(d => ({
    ...d,
    availability: evaluateDishAvailability(d, pantry),
    searchText: [d.name, d.hindiName, d.tagline, ...(d.requiredIngredients || []).map(id => lookup[id] || id.replace(/_/g,' '))].join(' ').toLowerCase()
  }));

  function render() {
    overlay.querySelectorAll('[data-mood]').forEach(b => {
      const active = b.dataset.mood === mood;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    overlay.querySelectorAll('[data-mode]').forEach(b => {
      const active = b.dataset.mode === mode;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    const words = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const filtered = enrich.filter(d => (mood === 'all' || d.moods.includes(mood))
      && (mode !== 'ready' || !d.availability.requiresShopping)
      && (mode !== 'favorites' || favorites.has(d.id))
      && words.every(word => d.searchText.includes(word) || (word === '20-minute' && d.totalTimeMinutes <= 20)));
    filtered.sort((a,b) => {
      if (mode === 'favorites') return a.name.localeCompare(b.name);
      if (a.availability.requiresShopping !== b.availability.requiresShopping) return a.availability.requiresShopping ? 1 : -1;
      if (a.availability.unavailableRequiredCount !== b.availability.unavailableRequiredCount) return a.availability.unavailableRequiredCount - b.availability.unavailableRequiredCount;
      return a.totalTimeMinutes - b.totalTimeMinutes;
    });
    count.textContent = `${filtered.length} recipe${filtered.length === 1 ? '' : 's'} found${mode === 'ready' ? ' · No known essentials missing' : ''}`;
    results.innerHTML = filtered.length ? filtered.map(d => {
      const avail = d.availability;
      const label = avail.requiresShopping ? `Needs ${avail.unavailableRequiredCount} ingredient${avail.unavailableRequiredCount===1?'':'s'}` : avail.isFullyConfirmed ? 'Confirmed today' : 'Likely in kitchen';
      return `<article class="aaj-explorer-card" data-id="${safe(d.id)}">
        <div class="aaj-explorer-thumb" aria-hidden="true">${getDishVisualMarkup(d)}</div>
        <button class="aaj-explorer-fav ${favorites.has(d.id)?'is-fav':''}" data-favorite="${safe(d.id)}" aria-label="${favorites.has(d.id)?'Remove':'Save'} ${safe(d.name)}" title="Save this dish">${favorites.has(d.id)?'♥':'♡'}</button>
        <div class="aaj-explorer-card-content">
          <span class="aaj-explorer-meta">⏱ ${d.totalTimeMinutes} min · ${d.moods.slice(0,2).map(x=>x==='surprise_me'?'Discover':x).join(' · ')}</span>
          <h3>${safe(d.name)}</h3>
          <p class="aaj-explorer-availability ${avail.requiresShopping?'needs-shopping':''}">${avail.requiresShopping?'🛒':'✓'} ${safe(label)}</p>
          <button type="button" class="aaj-explorer-pick" data-pick="${safe(d.id)}">See this meal →</button>
        </div>
      </article>`;
    }).join('') : `<div class="aaj-explorer-empty"><strong>No dishes match those filters.</strong><span>Try a different ingredient or switch to All meals.</span></div>`;
  }

  function close() { document.removeEventListener('keydown', onEscape); overlay.remove(); onClose?.(); }
  function onEscape(e) { if (e.key === 'Escape') { e.preventDefault(); close(); } }
  document.addEventListener('keydown', onEscape);
  overlay.querySelector('.aaj-explorer-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  input.addEventListener('input', e => { search = e.target.value; render(); });
  overlay.addEventListener('click', e => {
    const moodButton = e.target.closest('[data-mood]');
    if (moodButton) { mood = moodButton.dataset.mood; render(); return; }
    const modeButton = e.target.closest('[data-mode]');
    if (modeButton) { mode = modeButton.dataset.mode; render(); return; }
    const favButton = e.target.closest('[data-favorite]');
    if (favButton) {
      const id = favButton.dataset.favorite;
      if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
      writeFavorites(favorites); render(); return;
    }
    const picked = e.target.closest('[data-pick]');
    if (picked) {
      const dish = enrich.find(d => d.id === picked.dataset.pick);
      if (!dish) return;
      close();
      onSelectDish?.(dish);
    }
  });
  render();
  requestAnimationFrame(() => input.focus({preventScroll:true}));
  return overlay;
}
