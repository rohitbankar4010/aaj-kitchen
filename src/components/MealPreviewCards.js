/**
 * aaj. MealPreviewCards Component
 * Displays the other 2 recommended meals as smaller, selectable, tactile preview cards.
 * Clicking either card smoothly promotes it to the featured 3D centerpiece.
 */

import { getDishVisualMarkup } from '../data/dishVisuals.js';
import { haptics } from './AudioHaptics.js';

export function renderMealPreviewCards({
  dishes,
  activeDishId,
  onSelectDish,
  onShowMore
}) {
  const container = document.createElement('div');
  container.className = 'preview-cards-section';
  container.setAttribute('aria-label', 'Alternative dinner choices');

  // Show the other dishes that are not currently active
  const alternatives = dishes.filter(d => d.id !== activeDishId);
  const anyReady = alternatives.some(d => !d.availability?.requiresShopping);

  const heading = document.createElement('div');
  heading.className = 'preview-cards-header';
  heading.innerHTML = `
    <span class="preview-header-label">${anyReady ? 'Also from your kitchen' : 'Near-matches (require shopping)'}</span>
    <span class="preview-header-hint">Tap to swap to main stage</span>
  `;
  container.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'preview-cards-list';

  alternatives.forEach((dish, idx) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'preview-dish-card';
    card.setAttribute('aria-label', `Select ${dish.name}, takes ${dish.totalTimeMinutes} minutes`);
    card.setAttribute('data-dish-id', dish.id);

    const avail = dish.availability || {};
    let availTone = 'tone-success';
    let availIcon = '✓';
    if (avail.badgeTone === 'warning' || avail.badgeTone === 'subtle' || avail.requiresShopping) {
      availTone = 'tone-warning';
      availIcon = '🛒';
    } else if (avail.badgeTone === 'info') {
      availTone = 'tone-info';
      availIcon = '✦';
    }

    card.innerHTML = `
      <div class="preview-dish-thumb-frame" aria-hidden="true">
        ${getDishVisualMarkup(dish, { isHero: false })}
      </div>
      <div class="preview-dish-info">
        <div class="preview-dish-meta-row">
          <span class="preview-time-tag">⏱ ${dish.totalTimeMinutes}m</span>
          <span class="preview-avail-pill ${availTone}">${avail.label || 'In pantry*'}</span>
        </div>
        <h4 class="preview-dish-title">${dish.name}</h4>
        <span class="preview-dish-indic">${dish.hindiName || ''}</span>
      </div>
      <div class="preview-select-arrow" aria-hidden="true">↑</div>
    `;

    card.addEventListener('click', () => {
      haptics.pop();
      onSelectDish(dish);
    });

    list.appendChild(card);
  });

  container.appendChild(list);
  if (onShowMore) {
    const more = document.createElement('button');
    more.type = 'button';
    more.className = 'preview-show-more';
    more.textContent = '↻ Show me 3 more dinner ideas';
    more.setAttribute('aria-label', 'Show three different meal recommendations');
    more.addEventListener('click', () => { haptics.tap(); onShowMore(); });
    container.appendChild(more);
  }
  return container;
}
