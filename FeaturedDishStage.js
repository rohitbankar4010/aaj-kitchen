/**
 * aaj. FeaturedDishStage Component
 * Primary 3D Centerpiece Showcase optimized for Landscape iPad.
 * Features:
 * - One enormous 3D featured meal composition on a sculptural layered plinth
 * - Oversized floating wooden cooking spoon & 3D culinary props
 * - Gentle continuous hover & multi-depth parallax
 * - Unmistakable primary "Let's cook" action
 * - Smaller selectable preview cards for alternative dishes
 */

import { getDishVisualMarkup } from '../data/dishVisuals.js';
import { renderMealPreviewCards } from './MealPreviewCards.js';
import { haptics } from './AudioHaptics.js';

export function renderFeaturedDishStage({
  dishes,
  featuredDish,
  onCookNow,
  onRequestSwap,
  onSelectAlternative,
  onShopMissing,
  onShowMore
}) {
  const stage = document.createElement('section');
  stage.className = 'featured-stage-container';
  stage.setAttribute('aria-label', `Featured Dinner: ${featuredDish.name}`);

  const avail = featuredDish.availability || {};
  let availTone = 'tone-success';
  let availIcon = '✓';
  if (avail.badgeTone === 'warning' || avail.badgeTone === 'subtle' || avail.requiresShopping) {
    availTone = 'tone-warning';
    availIcon = avail.requiresShopping ? '🛒' : '•';
  } else if (avail.badgeTone === 'info') {
    availTone = 'tone-info';
    availIcon = '✦';
  }

  stage.innerHTML = `
    <!-- Left Column: Editorial Information & Actions -->
    <div class="featured-info-column">
      <!-- Expressive Editorial Headline -->
      <div class="editorial-headline-group">
        <div class="hero-decision-badge">
          <span class="pulsing-coral-dot" aria-hidden="true"></span>
          <span>Feasible dinner in &lt; 60 seconds</span>
        </div>
        <h2 class="hero-headline">What's cooking <span class="hero-headline-italic">tonight?</span></h2>
      </div>

      <!-- Active Dish Details -->
      <div class="featured-dish-card-body">
        <div class="featured-dish-tags-row">
          <span class="featured-dish-indic">${featuredDish.hindiName || ''}</span>
          <span class="featured-time-pill">⏱ <strong>~${featuredDish.totalTimeMinutes}m</strong> total (${featuredDish.prepTimeMinutes}m prep)</span>
          <span class="featured-time-pill" title="Recipe quantities are not automatically rescaled">🍽 Serves ${featuredDish.servings || 'as described'}</span>
          <span class="featured-avail-pill ${availTone}" title="${avail.disclaimer || 'Based on remembered groceries'}">
            <span aria-hidden="true">${availIcon}</span>
            <span>${avail.label || 'All in your pantry*'}</span>
          </span>
        </div>

        <h3 class="featured-dish-title">${featuredDish.name}</h3>
        <p class="featured-dish-tagline">${featuredDish.tagline}</p>

        ${avail.reason ? `
          <div class="featured-reason-strip" style="display:flex; align-items:center; gap:8px; font-size:0.86rem; font-weight:600; color:${avail.requiresShopping ? '#B45309' : 'var(--color-herb-deep)'}; background:${avail.requiresShopping ? 'rgba(255, 243, 224, 0.85)' : 'rgba(230, 240, 235, 0.65)'}; padding:7px 12px; border-radius:12px; margin-bottom:10px;">
            <span aria-hidden="true">${avail.requiresShopping ? '🛒' : '✨'}</span>
            <span>${avail.reason}</span>
          </div>
        ` : ''}

        <!-- Chef Micro-Quote -->
        <div class="featured-chef-tip-strip">
          <span class="tip-badge">Chef Note</span>
          <span class="tip-text">${featuredDish.chefTip}</span>
        </div>

        <!-- Primary Action & Subtle Swap -->
        <div class="featured-action-bar">
          <button type="button" class="btn-hero-lets-cook" aria-label="Cook ${featuredDish.name} tonight">
            <span class="cook-btn-icon" aria-hidden="true">🔥</span>
            <span class="cook-btn-label">Let's cook</span>
            <span class="cook-btn-arrow" aria-hidden="true">→</span>
          </button>

          ${avail.requiresShopping ? `
            <button type="button" class="btn-hero-shop-missing" style="display:inline-flex; align-items:center; gap:7px; padding:12px 18px; border-radius:9999px; border:1.5px solid #D97706; background:#FFFBEB; color:#92400E; font-family:var(--font-sans); font-size:0.9rem; font-weight:700; cursor:pointer; min-height:48px; transition:transform 0.16s ease;" aria-label="Get missing ingredients for ${featuredDish.name}">
              <span aria-hidden="true">🛒</span>
              <span>Get missing ingredients</span>
            </button>
          ` : ''}

          <button type="button" class="btn-hero-subtle-swap" aria-label="Not available or missing ingredients for ${featuredDish.name}">
            <span aria-hidden="true">↻</span>
            <span>Not feeling this? Swap</span>
          </button>
        </div>
      </div>

      <!-- Alternative Recommended Meals Previews -->
      <div id="alternativePreviewsMount"></div>
    </div>

    <!-- Right Column: Sculptural 3D Centerpiece Showcase -->
    <div class="featured-visual-stage" id="visual3dStage" aria-hidden="true">
      <!-- Ambient Lighting Glows -->
      <div class="stage-ambient-apricot-glow"></div>
      <div class="stage-ambient-lavender-glow"></div>

      <!-- Oversized Floating 3D Wooden Spoon (Breaks past frame in foreground) -->
      <div class="oversized-prop-layer prop-wooden-spoon" data-depth="0.45">
        <img 
          src="./assets/3d/floating_spoon_3d.jpg" 
          alt="" 
          class="prop-spoon-img"
        />
      </div>

      <!-- Floating 3D Tomato & Chillies & Spices Props -->
      <div class="oversized-prop-layer prop-fresh-produce" data-depth="0.30">
        <img 
          src="./assets/3d/floating_props_3d.jpg" 
          alt="" 
          class="prop-produce-img"
        />
      </div>

      <!-- Sculptural Layered Pedestal / Plinth -->
      <div class="sculptural-plinth-wrapper">
        <div class="sculptural-plinth-tier-2"></div>
        <div class="sculptural-plinth-tier-1">
          <div class="plinth-surface-highlight"></div>
        </div>
        <!-- Soft Contact Shadow Under Food -->
        <div class="food-breathing-contact-shadow"></div>
      </div>

      <!-- Enormous 3D Food Artwork (Floating Centerpiece) -->
      <div class="featured-food-floating" data-depth="0.22" title="Tap to preview recipe details">
        ${getDishVisualMarkup(featuredDish, { isHero: true })}
      </div>
    </div>
  `;

  // Attach event handlers
  const cookBtn = stage.querySelector('.btn-hero-lets-cook');
  const swapBtn = stage.querySelector('.btn-hero-subtle-swap');
  const shopBtn = stage.querySelector('.btn-hero-shop-missing');
  const foodArtwork = stage.querySelector('.featured-food-floating');

  cookBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    haptics.cookChime();
    onCookNow(featuredDish);
  });

  if (shopBtn && onShopMissing) {
    shopBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      haptics.tap();
      onShopMissing(featuredDish);
    });
  }

  swapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    haptics.swapShuffle();
    onRequestSwap(featuredDish, stage);
  });

  foodArtwork.addEventListener('click', () => {
    haptics.tap();
    onCookNow(featuredDish);
  });

  // Mount alternative previews
  const previewsMount = stage.querySelector('#alternativePreviewsMount');
  if (previewsMount) {
    const previewsEl = renderMealPreviewCards({
      dishes,
      activeDishId: featuredDish.id,
      onSelectDish: (selected) => {
        onSelectAlternative(selected);
      },
      onShowMore
    });
    previewsMount.appendChild(previewsEl);
  }

  // Interactive Layered Parallax for iPad / Mouse
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    const visualStage = stage.querySelector('#visual3dStage');
    const handleParallax = (xRatio, yRatio) => {
      const layers = stage.querySelectorAll('.oversized-prop-layer, .featured-food-floating');
      layers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0.2;
        const moveX = (xRatio - 0.5) * 50 * depth;
        const moveY = (yRatio - 0.5) * 40 * depth;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    // Bind to the current stage, never window: window listeners leaked every
    // time a different dish was selected, gradually making navigation jittery.
    visualStage.addEventListener('pointermove', (e) => {
      const rect = visualStage.getBoundingClientRect();
      handleParallax((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
    }, { passive: true });

    visualStage.addEventListener('touchmove', (e) => {
      if (e.touches?.[0]) {
        const rect = visualStage.getBoundingClientRect();
        handleParallax((e.touches[0].clientX - rect.left) / rect.width,
          (e.touches[0].clientY - rect.top) / rect.height);
      }
    }, { passive: true });
  }

  return stage;
}
