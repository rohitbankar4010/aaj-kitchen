/**
 * aaj. CorrectionModal Component
 * Subtle "Not Available" / Correction dialog.
 * Enables quick feedback (e.g. "Missing Paneer", "Takes too long", "Not in the mood")
 * and triggers immediate engine swap to update recommendations.
 */

import { haptics } from './AudioHaptics.js';

export function renderCorrectionModal({ dish, onConfirmSwap, onCancel }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'correction-backdrop is-opening';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-label', `Change recommendation for ${dish.name}`);

  backdrop.innerHTML = `
    <div class="correction-card">
      <div class="correction-header">
        <span class="correction-badge">Quick Preference</span>
        <h3 class="correction-title">Change "${dish.name}"?</h3>
        <p class="correction-sub">Tell aaj. why, and we'll swap it with another feasible dinner right away:</p>
      </div>

      <div class="correction-options-grid">
        <button type="button" class="btn-reason-option" data-reason="missing_ingredient">
          <span class="reason-icon">🚫</span>
          <div class="reason-text-group">
            <strong>Missing an ingredient</strong>
            <span>Don't have everything needed</span>
          </div>
        </button>

        <button type="button" class="btn-reason-option" data-reason="too_long">
          <span class="reason-icon">⏱</span>
          <div class="reason-text-group">
            <strong>Need something even faster</strong>
            <span>Less prep or hands-on time</span>
          </div>
        </button>

        <button type="button" class="btn-reason-option" data-reason="not_in_mood">
          <span class="reason-icon">🍲</span>
          <div class="reason-text-group">
            <strong>Not craving this tonight</strong>
            <span>Prefer a different flavour or grain</span>
          </div>
        </button>
      </div>

      <div class="correction-actions">
        <button type="button" class="btn-correction-cancel">Keep this</button>
        <button type="button" class="btn-correction-swap">Swap Dish Now →</button>
      </div>
    </div>
  `;

  let selectedReason = 'missing_ingredient';
  const reasonBtns = backdrop.querySelectorAll('.btn-reason-option');
  reasonBtns[0].classList.add('is-selected');

  reasonBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      haptics.pop();
      reasonBtns.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedReason = btn.getAttribute('data-reason');
    });
  });

  const cancelBtn = backdrop.querySelector('.btn-correction-cancel');
  const swapBtn = backdrop.querySelector('.btn-correction-swap');

  const closeDialog = () => {
    backdrop.classList.remove('is-opening');
    backdrop.classList.add('is-closing');
    setTimeout(() => {
      backdrop.remove();
      onCancel();
    }, 200);
  };

  cancelBtn.addEventListener('click', closeDialog);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeDialog();
  });

  swapBtn.addEventListener('click', () => {
    haptics.swapShuffle();
    backdrop.classList.remove('is-opening');
    backdrop.classList.add('is-closing');
    setTimeout(() => {
      backdrop.remove();
      onConfirmSwap(dish, selectedReason);
    }, 200);
  });

  return backdrop;
}
