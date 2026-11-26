/**
 * aaj. MoodSelector Component
 * Quick mood options: Quick, Comfort, Healthy, Surprise Me.
 * Tactile pills with animated active indicator and haptic sound.
 */

import { haptics } from './AudioHaptics.js';

export const MOODS = [
  {
    id: 'quick',
    label: 'Quick',
    indic: 'जल्दी',
    icon: '⚡',
    timeHint: '< 25 mins',
    toneColor: 'var(--color-tomato-red)'
  },
  {
    id: 'comfort',
    label: 'Comfort',
    indic: 'सुकून',
    icon: '🍲',
    timeHint: 'Warm & Hearty',
    toneColor: 'var(--color-peach-warm)'
  },
  {
    id: 'healthy',
    label: 'Healthy',
    indic: 'पौष्टिक',
    icon: '🥗',
    timeHint: 'Whole Grains & Greens',
    toneColor: 'var(--color-herb-medium)'
  },
  {
    id: 'surprise_me',
    label: 'Surprise Me',
    indic: 'कुछ खास',
    icon: '✨',
    timeHint: "Chef's Whim",
    toneColor: 'var(--color-butter-deep)'
  }
];

export function renderMoodSelector({ activeMood, onMoodChange }) {
  const container = document.createElement('nav');
  container.className = 'mood-selector-container';
  container.setAttribute('aria-label', 'Dinner Mood Selection');
  container.setAttribute('role', 'tablist');

  const pillList = document.createElement('div');
  pillList.className = 'mood-pill-list';

  MOODS.forEach((mood, idx) => {
    const isActive = mood.id === activeMood;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `mood-pill-btn ${isActive ? 'is-active' : ''}`;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    btn.setAttribute('data-mood', mood.id);
    btn.setAttribute('data-index', idx + 1);

    btn.innerHTML = `
      <span class="mood-pill-icon" aria-hidden="true">${mood.icon}</span>
      <div class="mood-pill-text-wrap">
        <span class="mood-pill-label">${mood.label}</span>
        <span class="mood-pill-sub">${mood.timeHint}</span>
      </div>
      <span class="mood-pill-key" aria-hidden="true">${idx + 1}</span>
    `;

    btn.addEventListener('click', () => {
      if (mood.id !== activeMood) {
        haptics.pop();
        onMoodChange(mood.id);
      }
    });

    pillList.appendChild(btn);
  });

  container.appendChild(pillList);
  return container;
}
