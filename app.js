/**
 * aaj. Main Application Controller (3D Sculptural Art Direction)
 * Premium AI Kitchen Companion for Indian Households.
 * Tablet-first dinner selection in under 60 seconds with 3D centerpiece composition.
 */

import { getRecommendations, replaceDish } from './adapter/recommendationEngineAdapter.js';
import { getStoredPantry } from './data/pantryStaples.js';
import { renderMoodSelector } from './components/MoodSelector.js';
import { renderFeaturedDishStage } from './components/FeaturedDishStage.js';
import { renderDishPreviewModal } from './components/DishPreviewModal.js';
import { renderGroceriesDrawer } from './components/GroceriesDrawer.js';
import { renderCorrectionModal } from './components/CorrectionModal.js';
import { haptics } from './components/AudioHaptics.js';
import { openCookingJourney, getResumable } from './components/CookingJourney.js';
import { renderFirstOpenKitchenCheck, shouldShowDailyKitchenCheck } from './components/FirstOpenKitchenCheck.js';
import { renderShoppingHandoffModal } from './components/ShoppingHandoffModal.js';
import { renderRecipeExplorer } from './components/RecipeExplorer.js';
import { renderTonightPreferences } from './components/TonightPreferences.js';
import { getKitchenPreferences } from './data/kitchenPreferences.js';
import { getRecentMealIds, rememberRecentMeals } from './data/mealHistory.js';

class AajApp {
  constructor(rootElement) {
    this.root = rootElement;
    this.state = {
      activeMood: 'quick',
      recommendedDishes: [],
      featuredDishId: null,
      excludedIds: [],
      pantry: getStoredPantry(),
      isMuted: false,
      isLoading: false,
      recentlyShownIds: getRecentMealIds()
    };

    this.activeModal = null;
    this.activeDrawer = null;
    this.pantryDirty = false;
    this.recommendationRequest = 0;
  }

  async init() {
    this.renderSkeleton();
    await this.loadRecommendations(false);
    this.setupKeyboardShortcuts();

    // P1: Show daily kitchen check overlay once per calendar day
    if (shouldShowDailyKitchenCheck()) {
      const checkEl = renderFirstOpenKitchenCheck({
        onComplete: (updatedPantry) => {
          this.state.pantry = updatedPantry;
          this.state.excludedIds = [];
          this.loadRecommendations(true, true);
        },
        onSkip: () => {
          // User skipped — homepage shows as normal
        }
      });
      document.body.appendChild(checkEl);
    }
  }

  renderSkeleton() {
    this.root.innerHTML = `
      <div class="kitchen-ambient-bg" aria-hidden="true"></div>
      <div class="kitchen-grain-overlay" aria-hidden="true"></div>

      <div class="aaj-app-viewport">
        <!-- Brand & Top Bar -->
        <header class="aaj-top-navbar">
          <div class="brand-lockup">
            <h1 class="brand-wordmark">aaj<span class="brand-period">.</span></h1>
            <span class="brand-indic-script">आज क्या बनेगा?</span>
            <span class="brand-tagline-pill">The AI Kitchen Companion</span>
          </div>

          <div class="top-nav-actions">
            <button type="button" id="btnExploreMeals" class="aaj-explore-topbtn" aria-label="Find a meal or browse all 30 recipes">⌕ Find a meal</button>
            <button type="button" id="btnTonightPrefs" class="aaj-explore-topbtn aaj-prefs-topbtn" aria-label="Set tonight's cooking time, diet and number of people">⚙ Tonight</button>
            <!-- Kitchen Memory Entry Point -->
            <button type="button" id="btnGroceriesEntry" class="btn-groceries-entry" aria-label="Open Kitchen Memory — update what's in your pantry">
              <span aria-hidden="true">🧺</span>
              <span>My kitchen</span>
              <span id="groceryCountBadge" class="grocery-entry-badge">
                ${this.state.pantry.filter(p => p.inStock).length} items
              </span>
            </button>

            <!-- Tactile Sound Toggle -->
            <button type="button" id="btnSoundToggle" class="btn-sound-toggle" aria-label="Toggle kitchen sounds" title="Toggle tactile clicks">
              🔊
            </button>
          </div>
        </header>

        <!-- Mood Options Bar (Visually Secondary, Accessible) -->
        <section id="moodSelectorMount"></section>

        <!-- Main 3D Centerpiece Stage Mount -->
        <main id="featuredStageMount" class="featured-main-mount"></main>

        <!-- Footer Bar with Truthfulness Disclaimers -->
        <footer class="aaj-footer-bar">
          <div class="footer-truthfulness-badge">
            <span>ℹ️</span>
              <span>Pantry ideas use <strong>remembered groceries on this device</strong>. Confirm essentials before cooking.</span>
          </div>
          <div class="footer-adapter-indicator">
            <span class="adapter-dot" title="Local Demo Data Adapter Active"></span>
            <span>Demo Data Adapter (AI Studio Schema v2)</span>
          </div>
        </footer>
      </div>

      <!-- Toast container -->
      <div id="aajToast" class="aaj-toast" aria-live="polite"></div>
    `;

    // Attach Top Bar handlers
    this.root.querySelector('#btnExploreMeals')?.addEventListener('click', () => this.openRecipeExplorer());
    this.root.querySelector('#btnTonightPrefs')?.addEventListener('click', () => this.openTonightPreferences());
    const groceriesBtn = this.root.querySelector('#btnGroceriesEntry');
    groceriesBtn.addEventListener('click', () => {
      haptics.tap();
      this.openGroceriesDrawer();
    });

    const soundBtn = this.root.querySelector('#btnSoundToggle');
    soundBtn.addEventListener('click', () => {
      const isMuted = haptics.toggleMute();
      this.state.isMuted = isMuted;
      soundBtn.textContent = isMuted ? '🔇' : '🔊';
      soundBtn.setAttribute('aria-label', isMuted ? 'Kitchen sound muted' : 'Kitchen sound on');
    });

    this.renderMoodMount();
    this.refreshResumePill();
  }

  renderMoodMount() {
    const mount = this.root.querySelector('#moodSelectorMount');
    if (!mount) return;

    mount.innerHTML = '';
    const selectorEl = renderMoodSelector({
      activeMood: this.state.activeMood,
      onMoodChange: (newMood) => {
        this.state.activeMood = newMood;
        this.renderMoodMount();
        this.state.excludedIds = [];
        this.loadRecommendations(true, true);
      }
    });
    mount.appendChild(selectorEl);
  }

  async loadRecommendations(animate = false, forcePromoteTop = false) {
    const request = ++this.recommendationRequest;
    const res = await getRecommendations({
      mood: this.state.activeMood,
      excludeIds: this.state.excludedIds,
      customPantry: this.state.pantry,
      limit: 3,
      recentIds: this.state.recentlyShownIds,
      preferences: getKitchenPreferences()
    });
    if (request !== this.recommendationRequest) return; // older results must never overwrite newer choices

    this.state.recommendedDishes = res.recommendations;
    // A small session-level memory stops mood switching from endlessly showing the same 3.
    // It influences order only and never makes an unavailable dish appear ready.
    this.state.recentlyShownIds = rememberRecentMeals(
      this.state.recommendedDishes.map(d => d.id)
    );
    const currentStillExists = this.state.recommendedDishes.some(d => d.id === this.state.featuredDishId);
    if (forcePromoteTop || !currentStillExists) {
      this.state.featuredDishId = this.state.recommendedDishes[0]?.id || null;
    }

    this.renderFeaturedStage(animate);
  }

  /** Browse the next three distinct recipe ideas without repeating the active set. */
  async showMoreMeals() {
    const currentIds = this.state.recommendedDishes.map(d => d.id);
    const exclusions = new Set([...this.state.excludedIds, ...currentIds]);
    // When the catalogue is exhausted, start another rotation instead of showing an empty screen.
    const { DISH_CATALOG } = await import('./data/dishCatalog.js');
    if (DISH_CATALOG.every(d => exclusions.has(d.id))) exclusions.clear();
    this.state.excludedIds = [...exclusions];
    this.state.featuredDishId = null;
    await this.loadRecommendations(true, true);
    if (!this.state.recommendedDishes.length) {
      this.state.excludedIds = [];
      await this.loadRecommendations(true, true);
    }
  }

  renderFeaturedStage(animate = false) {
    const mount = this.root.querySelector('#featuredStageMount');
    if (!mount) return;

    const featuredDish = this.state.recommendedDishes.find(d => d.id === this.state.featuredDishId) 
      || this.state.recommendedDishes[0];

    if (!featuredDish) {
      const p = getKitchenPreferences();
      mount.innerHTML = `<section class="aaj-no-matches" style="max-width:720px;margin:30px auto;padding:30px;border-radius:26px;background:#fffaf2;text-align:center;box-shadow:0 8px 30px rgba(40,20,10,.08)">
        <h2 style="font:700 2rem var(--font-display);margin:0 0 12px">No meals match those choices yet.</h2>
        <p style="line-height:1.5">${p.maxTimeMinutes ? `We don't have a suitable ${p.maxTimeMinutes}-minute ${p.diet==='vegetarian'?'vegetarian':''} recipe in this mood.` : 'Try another mood or cooking preference.'} You can also browse every recipe.</p>
        <button id="aajChangePrefs" class="aaj-explore-topbtn" type="button" style="margin:8px">Change time or diet</button>
        <button id="aajBrowseEmpty" class="aaj-explore-topbtn" type="button" style="margin:8px">Browse all recipes</button>
      </section>`;
      mount.querySelector('#aajChangePrefs')?.addEventListener('click',()=>this.openTonightPreferences());
      mount.querySelector('#aajBrowseEmpty')?.addEventListener('click',()=>this.openRecipeExplorer());
      return;
    }

    if (animate) {
      mount.style.opacity = '0.5';
      mount.style.transform = 'translateY(8px)';
      mount.style.transition = 'all 0.2s ease-out';
    }

    mount.innerHTML = '';
    const stageEl = renderFeaturedDishStage({
      dishes: this.state.recommendedDishes,
      featuredDish,
      onCookNow: (dish) => {
        this.openDishPreview(dish);
      },
      onRequestSwap: (dishToSwap, stageElement) => {
        this.openCorrectionModal(dishToSwap, stageElement);
      },
      onSelectAlternative: (selectedDish) => {
        // Smoothly promote alternative to hero
        this.state.featuredDishId = selectedDish.id;
        this.renderFeaturedStage(true);
      },
      onShopMissing: (dish) => {
        this.openShoppingHandoff(dish);
      },
      onShowMore: () => this.showMoreMeals(),
      onBrowseAll: () => this.openRecipeExplorer()
    });

    mount.appendChild(stageEl);

    if (animate) {
      setTimeout(() => {
        mount.style.opacity = '1';
        mount.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  /** Light constraints, independent of the pantry: food choice, time, servings. */
  openTonightPreferences() {
    if (this.activeModal || this.activeDrawer) return;
    const modal = renderTonightPreferences({
      onClose: () => { if (this.activeModal === modal) this.activeModal = null; },
      onSaved: () => {
        this.state.excludedIds = [];
        this.state.recentlyShownIds = [];
        this.loadRecommendations(true, true);
        this.showToast("Tonight's preferences updated");
      }
    });
    document.body.appendChild(modal);
    this.activeModal = modal;
  }

  /** Direct search/browse experience: choose from all 30 dishes in a few taps. */
  openRecipeExplorer() {
    if (this.activeModal) return;
    const explorer = renderRecipeExplorer({
      pantry: this.state.pantry,
      initialMood: 'all',
      preferences: getKitchenPreferences(),
      onClose: () => { if (this.activeModal === explorer) this.activeModal = null; },
      onSelectDish: (dish) => {
        // Keep the chosen catalogue meal featured even when it wasn't in the top 3.
        this.state.recommendedDishes = [
          dish,
          ...this.state.recommendedDishes.filter(d => d.id !== dish.id).slice(0, 2)
        ];
        this.state.featuredDishId = dish.id;
        this.renderFeaturedStage(true);
      }
    });
    document.body.appendChild(explorer);
    this.activeModal = explorer;
  }

  openDishPreview(dish) {
    if (this.activeModal) {
      this.activeModal.remove();
    }

    const modal = renderDishPreviewModal({
      dish,
      onClose: () => {
        this.activeModal = null;
      },
      onLaunchCook: (confirmedDish) => {
        if (this.activeModal) {
          this.activeModal.remove();
          this.activeModal = null;
        }
        this.startCooking(confirmedDish, false);
      }
    });

    document.body.appendChild(modal);
    this.activeModal = modal;
  }

  /** P2: Opens the Instamart shopping handoff modal for a near-match dish */
  openShoppingHandoff(dish) {
    if (this.activeModal) {
      this.activeModal.remove();
      this.activeModal = null;
    }
    const modal = renderShoppingHandoffModal({
      dish,
      onClose: () => {
        this.activeModal = null;
      }
    });
    document.body.appendChild(modal);
    this.activeModal = modal;
  }

  openGroceriesDrawer() {
    if (this.activeDrawer) {
      this.activeDrawer.remove();
    }

    const drawer = renderGroceriesDrawer({
      onClose: () => {
        this.activeDrawer = null;
        if (this.pantryDirty) {
          this.pantryDirty = false;
          this.state.excludedIds = [];
          this.loadRecommendations(false, true);
        }
      },
      onPantryUpdated: (newPantry) => {
        this.state.pantry = newPantry;
        const badge = this.root.querySelector('#groceryCountBadge');
        if (badge) {
          const inStock = newPantry.filter(p => p.inStock).length;
          badge.textContent = `${inStock} items`;
        }
        // Don't refresh the large homepage scene behind the pantry after every tap.
        // Recalculate once when the customer finishes editing.
        this.pantryDirty = true;
      },
      onFindMeals: (newPantry) => {
        this.state.pantry = newPantry;
        this.pantryDirty = false;
        this.state.excludedIds = [];
        this.loadRecommendations(true, true);
      }
    });

    document.body.appendChild(drawer);
    this.activeDrawer = drawer;
  }

  openCorrectionModal(dish, stageElement) {
    const modal = renderCorrectionModal({
      dish,
      onConfirmSwap: async (dishToSwap, reason) => {
        this.state.excludedIds.push(dishToSwap.id);
        const swapResult = await replaceDish({
          dishToReplaceId: dishToSwap.id,
          mood: this.state.activeMood,
          currentRecommendedIds: this.state.recommendedDishes.map(d => d.id),
          customPantry: this.state.pantry,
          preferences: getKitchenPreferences(),
          reason
        });

        if (swapResult.replacement) {
          this.state.recommendedDishes = this.state.recommendedDishes.map(d => {
            if (d.id === dishToSwap.id) {
              return swapResult.replacement;
            }
            return d;
          });
          this.state.featuredDishId = swapResult.replacement.id;
          this.renderFeaturedStage(true);
          this.showToast(`Swapped with "${swapResult.replacement.name}"`);
        } else {
          this.state.excludedIds = [];
          this.loadRecommendations(true);
        }
      },
      onCancel: () => {}
    });

    document.body.appendChild(modal);
  }

  /** Launches the step-by-step cooking journey for the selected (or saved) dish. */
  startCooking(dish, resume = false) {
    if (this.activeModal) this.activeModal.remove();
    const overlay = openCookingJourney({
      dish,
      resume,
      onExit: () => {
        this.activeModal = null;
        this.refreshResumePill();
      },
      onComplete: () => this.refreshResumePill()
    });
    document.body.appendChild(overlay);
    this.activeModal = overlay; // also blocks global shortcuts while cooking
  }

  /** Shows a small "Resume" button in the top bar only when a cooking session is saved. */
  refreshResumePill() {
    const actions = this.root.querySelector('.top-nav-actions');
    if (!actions) return;
    actions.querySelector('#btnResumeCooking')?.remove();
    const saved = getResumable();
    if (!saved) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'btnResumeCooking';
    btn.className = 'btn-groceries-entry';
    btn.setAttribute('aria-label', `Resume cooking ${saved.dish.name}, step ${saved.session.stepIndex + 1}`);
    btn.innerHTML = `<span aria-hidden="true">🔥</span><span>Resume cooking</span>`;
    btn.addEventListener('click', () => { haptics.tap(); this.startCooking(saved.dish, true); });
    actions.prepend(btn);
  }

  showToast(message) {
    const toast = this.root.querySelector('#aajToast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('is-visible');

    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3600);
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      // 1, 2, 3: Select corresponding meal from the 3 recommendations
      if (['1', '2', '3'].includes(e.key) && !this.activeModal && !this.activeDrawer) {
        const index = parseInt(e.key, 10) - 1;
        const dish = this.state.recommendedDishes[index];
        if (dish) {
          haptics.pop();
          this.state.featuredDishId = dish.id;
          this.renderFeaturedStage(true);
        }
      }

      // Enter/Space on body triggers "Let's Cook" for active dish
      if (e.key === 'Enter' && !this.activeModal && !this.activeDrawer) {
        const featuredDish = this.state.recommendedDishes.find(d => d.id === this.state.featuredDishId);
        if (featuredDish) {
          haptics.cookChime();
          this.openDishPreview(featuredDish);
        }
      }

      // Quick mood shortcuts: Q, C, H, S
      const key = e.key.toLowerCase();
      const moodMap = { q: 'quick', c: 'comfort', h: 'healthy', s: 'surprise_me' };
      if (moodMap[key] && !this.activeModal && !this.activeDrawer) {
        if (this.state.activeMood !== moodMap[key]) {
          haptics.pop();
          this.state.activeMood = moodMap[key];
          this.renderMoodMount();
          this.state.excludedIds = [];
          this.loadRecommendations(true, true);
        }
      }

      // 'g' opens groceries drawer
      if (key === 'g' && !this.activeModal && !this.activeDrawer) {
        haptics.tap();
        this.openGroceriesDrawer();
      }
    });
  }
}

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const appMount = document.getElementById('aaj-root');
  if (appMount) {
    const app = new AajApp(appMount);
    app.init();
    window.__aajApp = app;
  }
});
