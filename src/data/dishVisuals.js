/** Artwork provider: use shipped 3D assets, existing bespoke SVGs or distinct fallback illustrations. */
import { getDishSvg } from './dishIllustrations.js';
import { getExpandedDishSvg } from './expandedDishArt.js';

const available3d = new Set(['paneer_bhurji_3d.jpg','khichdi_3d.jpg','thepla_3d.jpg','dal_tadka_3d.jpg']);
const bespokeTypes = new Set(['paneer_bhurji','khichdi','thepla','dal_tadka','matar_mushroom','palak_paneer','chole','chettinad_pulao','dum_aloo']);

export function getDishVisualMarkup(dish, { isHero = false } = {}) {
  const imgClass = isHero ? 'hero-dish-img-3d' : 'preview-dish-img-3d';
  const fallbackSvg = bespokeTypes.has(dish.illustrationType)
    ? getDishSvg(dish.illustrationType)
    : getExpandedDishSvg(dish);
  const hasShippedArtwork = available3d.has((dish.image3d || '').split('/').pop());
  const fallback = `<div class="dish-fallback-svg" style="${hasShippedArtwork ? 'display:none; ' : ''}width:100%; height:100%;">${fallbackSvg}</div>`;
  return `<div class="dish-3d-visual-wrapper ${isHero ? 'is-hero-wrapper' : 'is-preview-wrapper'}">
    ${hasShippedArtwork ? `<img src="${dish.image3d}" alt="${dish.name}" class="${imgClass}" loading="eager" onerror="this.style.display='none';this.nextElementSibling.style.display='block';"/>` : ''}
    ${fallback}
  </div>`;
}
