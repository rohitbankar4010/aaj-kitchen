/**
 * aaj. DishPreviewModal Component
 * Immersive iPad sheet/modal that smoothly opens when a dish is selected.
 * Provides cooking time breakdown, utensils check, ingredient inventory status,
 * and a tactile "Let's Cook Tonight" launcher.
 */

import { getDishSvg } from '../data/dishIllustrations.js';
import { haptics } from './AudioHaptics.js';

export function renderDishPreviewModal({ dish, onClose, onLaunchCook }) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop is-opening';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'preview-dish-title');

  const avail = dish.availability || {};
  const illustrationHtml = getDishSvg(dish.illustrationType || 'paneer_bhurji');

  overlay.innerHTML = `
    <div class="modal-card-sheet">
      <!-- Sheet Drag Handle (iPad gesture cue) -->
      <div class="modal-drag-handle" aria-hidden="true"></div>

      <!-- Close Button -->
      <button type="button" class="modal-btn-close" aria-label="Close preview">
        <span aria-hidden="true">✕</span>
      </button>

      <div class="modal-scroll-content">
        <!-- Visual & Headline Header -->
        <div class="modal-hero-split">
          <div class="modal-visual-frame" aria-hidden="true">
            ${illustrationHtml}
          </div>

          <div class="modal-header-info">
            <div class="modal-tag-row">
              <span class="modal-indic-kicker">${dish.hindiName || ''}</span>
              <span class="modal-badge-time">⏱ ${dish.totalTimeMinutes} mins total</span>
              <span class="modal-badge-avail ${avail.badgeTone === 'warning' ? 'tone-warning' : 'tone-success'}">
                ${avail.label || 'All in your pantry*'}
              </span>
            </div>

            <h2 id="preview-dish-title" class="modal-dish-title">${dish.name}</h2>
            <p class="modal-dish-tagline">${dish.tagline}</p>

            <!-- Timing and Servings Grid -->
            <div class="modal-metrics-grid">
              <div class="metric-box">
                <span class="metric-label">Prep Time</span>
                <span class="metric-val">${dish.prepTimeMinutes} mins</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">Cook Time</span>
                <span class="metric-val">${dish.cookTimeMinutes} mins</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">Servings</span>
                <span class="metric-val">${dish.servings || '2–3 people'}</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">Spice Level</span>
                <span class="metric-val">${dish.spiceLevel || 'Medium'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Editorial Story & Chef Tip -->
        <div class="modal-editorial-quote">
          <p class="editorial-text">"${dish.story}"</p>
          <div class="chef-tip-pill">
            <span class="chef-tip-label">Chef Pro-Tip:</span>
            <span class="chef-tip-text">${dish.chefTip}</span>
          </div>
        </div>

        <!-- Utensils Needed -->
        <div class="modal-section">
          <h4 class="modal-section-title">Cookware on Standby</h4>
          <div class="utensil-chips">
            ${(dish.utensils || ['Kadhai', 'Tawa']).map(u => `
              <span class="utensil-chip">🍳 ${u}</span>
            `).join('')}
          </div>
        </div>

        <!-- Cooking Flow Overview -->
        <div class="modal-section">
          <h4 class="modal-section-title">Cooking Flow (${(dish.detailedSteps || dish.quickSteps || []).length} Guided Steps)</h4>
          <ol class="prep-steps-list">
            ${(dish.detailedSteps || dish.quickSteps || []).map((step, i) => {
              const isObj = typeof step === 'object';
              const title = isObj ? step.title : `Step ${i + 1}`;
              const desc = isObj ? step.instruction : step;
              const flameTag = isObj && step.flame ? `<span style="font-size:0.75rem; background:rgba(217,83,79,0.12); color:var(--color-tomato); padding:2px 8px; border-radius:12px; font-weight:600; margin-left:6px;">🔥 ${step.flame}</span>` : '';
              return `
              <li class="prep-step-item">
                <span class="step-num">${i + 1}</span>
                <div style="flex:1;">
                  <div style="display:flex; align-items:center; margin-bottom:2px;">
                    <strong style="font-size:0.95rem; font-weight:700; color:var(--color-text-primary);">${title}</strong>
                    ${flameTag}
                  </div>
                  <span class="step-text" style="font-size:0.88rem; color:var(--color-text-secondary); line-height:1.45;">${desc}</span>
                </div>
              </li>
            `;
            }).join('')}
          </ol>
        </div>

        <!-- Pantry Feasibility Disclaimer Footnote -->
        <div class="modal-disclaimer-box">
          <span class="disclaimer-icon">ℹ</span>
          <span class="disclaimer-text">
            *Availability estimate is based on <strong>remembered groceries</strong> on this device. Confirmed fresh ingredients are verified during step-by-step cooking.
          </span>
        </div>
      </div>

      <!-- Bottom Sticky Action Bar -->
      <div class="modal-sticky-action-bar">
        <button type="button" class="btn-primary-launch-cook">
          <span class="launch-icon">🔥</span>
          <span class="launch-text">Let's Cook Tonight</span>
          <span class="launch-arrow">→</span>
        </button>
      </div>
    </div>
  `;

  // Attach event handlers
  const closeBtn = overlay.querySelector('.modal-btn-close');
  const launchBtn = overlay.querySelector('.btn-primary-launch-cook');

  const handleClose = () => {
    overlay.classList.remove('is-opening');
    overlay.classList.add('is-closing');
    setTimeout(() => {
      overlay.remove();
      onClose();
    }, 220);
  };

  closeBtn.addEventListener('click', handleClose);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      handleClose();
    }
  });

  launchBtn.addEventListener('click', () => {
    haptics.cookChime();
    launchBtn.classList.add('btn-anim-pulse');
    setTimeout(() => {
      onLaunchCook(dish);
    }, 300);
  });

  // Keyboard escape
  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', keyHandler);
      handleClose();
    }
  };
  document.addEventListener('keydown', keyHandler);

  return overlay;
}
