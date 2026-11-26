/** Reliable bundled artwork: real 3D files where available, otherwise exported
 *  recipe-specific SVG artwork as PNG (with inline SVG as final offline fallback).
 *  No external image hosts, so previews are reliable on GitHub/Vercel.
 */
import { getDishSvg } from './dishIllustrations.js';
import { getExpandedDishSvg } from './expandedDishArt.js';

const available3d = new Set(['paneer_bhurji_3d.jpg','khichdi_3d.jpg','thepla_3d.jpg']);
const bespokeTypes = new Set(['paneer_bhurji','khichdi','thepla','dal_tadka','matar_mushroom','palak_paneer','chole','chettinad_pulao','dum_aloo']);

export function getDishVisualMarkup(dish, { isHero = false } = {}) {
  const imgClass = isHero ? 'hero-dish-img-3d' : 'preview-dish-img-3d';
  const fallbackSvg = bespokeTypes.has(dish.illustrationType)
    ? getDishSvg(dish.illustrationType)
    : getExpandedDishSvg(dish);
  const has3d = available3d.has((dish.image3d || '').split('/').pop());
  const safeName = (dish.name || 'Indian dish').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  const cleanId = String(dish.id || '').replace(/[^a-z0-9-]/g,'');
  // The second image is a local illustration file. All 30 ship in /assets/food-art.
  const art = `<img src="./assets/food-art/${cleanId}.png" alt="Illustration of ${safeName}" class="${imgClass} aaj-generated-illustration" loading="eager" ${has3d ? 'style="display:none"' : ''} onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"/>
    <div class="dish-fallback-svg" style="display:none;width:100%;height:100%">${fallbackSvg}</div>`;
  return `<div class="dish-3d-visual-wrapper ${isHero ? 'is-hero-wrapper' : 'is-preview-wrapper'}">
    ${has3d ? `<img src="${dish.image3d}" alt="${safeName}" class="${imgClass}" loading="eager" onerror="this.style.display='none';this.nextElementSibling.style.display='block';"/>` : ''}
    ${art}
  </div>`;
}
