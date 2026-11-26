/**
 * aaj. DishCard Component
 * Displays a single curated meal recommendation.
 * Features large bespoke SVG illustration, prep time, availability indicator,
 * prominent "Let's cook" action, and subtle "Not available" swap button.
 */

import { getDishSvg } from '../data/dishIllustrations.js';
import { haptics } from './AudioHaptics.js';

export function renderDishCard({
  dish,
  index,
  isSelected,
  onSelect,
  onCookNow,
  onRequestSwap
}) {
  const card = document.createElement('article');
  card.className = `dish-card ${isSelected ? 'is-selected' : ''}`;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', `${dish.name}, takes ${dish.totalTimeMinutes} minutes`);
  card.setAttribute('data-dish-id', dish.id);
  card.setAttribute('data-card-index', index);

  // Availability badge styling
  const avail = dish.availability || {};
  let availBadgeClass = 'avail-success';
  let availIcon = '✓';
  if (avail.badgeTone === 'warning') {
    availBadgeClass = 'avail-warning';
    availIcon = '•';
  } else if (avail.badgeTone === 'info') {
    availBadgeClass = 'avail-info';
    availIcon = '✦';
  }

  const illustrationHtml = getDishSvg(dish.illustrationType || 'paneer_bhurji');

  card.innerHTML = `
    <!-- Top Meta Strip -->
    <div class="dish-card-meta-bar">
      <!-- Time Badge -->
      <div class="dish-time-badge">
        <span class="time-icon" aria-hidden="true">⏱</span>
        <span class="time-text"><strong>${dish.totalTimeMinutes}m</strong> total</span>
        <span class="time-sub">(${dish.prepTimeMinutes}m prep)</span>
      </div>

      <!-- Availability Indicator (strictly based on remembered groceries) -->
      <div class="dish-avail-pill ${availBadgeClass}" title="${avail.disclaimer || 'Based on remembered groceries'}">
        <span class="avail-icon" aria-hidden="true">${availIcon}</span>
        <span class="avail-text">${avail.label || 'All in your pantry*'}</span>
      </div>
    </div>

    <!-- Hero Illustration Canvas -->
    <div class="dish-card-visual-frame" aria-hidden="true">
      ${illustrationHtml}
      <div class="visual-plate-shadow"></div>
    </div>

    <!-- Editorial Dish Info -->
    <div class="dish-card-body">
      <div class="dish-title-group">
        <span class="dish-indic-title">${dish.hindiName || ''}</span>
        <h3 class="dish-title">${dish.name}</h3>
      </div>
      <p class="dish-tagline">${dish.tagline}</p>
    </div>

    <!-- Action Bar -->
    <div class="dish-card-actions">
      <!-- Prominent "Let's Cook" Button -->
      <button type="button" class="btn-lets-cook" aria-label="Cook ${dish.name} tonight">
        <span class="btn-cook-text">Let's cook</span>
        <span class="btn-cook-arrow" aria-hidden="true">→</span>
      </button>

      <!-- Subtle "Not available" / Missing items correction action -->
      <button type="button" class="btn-subtle-swap" aria-label="Not available or missing ingredients for ${dish.name}">
        <span class="swap-icon" aria-hidden="true">↻</span>
        <span class="swap-text">Not available</span>
      </button>
    </div>
  `;

  // Interaction handlers
  const cookBtn = card.querySelector('.btn-lets-cook');
  const swapBtn = card.querySelector('.btn-subtle-swap');

  // Clicking "Let's cook" directly opens the preview / cook flow
  cookBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    haptics.cookChime();
    onCookNow(dish);
  });

  // Clicking "Not available" triggers the subtle replacement flow
  swapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    haptics.swapShuffle();
    onRequestSwap(dish, card);
  });

  // Card click activates selection preview
  card.addEventListener('click', () => {
    haptics.tap();
    onSelect(dish);
  });

  // Keyboard navigation: Enter or Space selects/opens
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      haptics.tap();
      onSelect(dish);
    }
  });

  return card;
}
