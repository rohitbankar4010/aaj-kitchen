/**
 * Device-local recommendation rotation. The recent history naturally expires,
 * and tracks dish IDs only (no personal information or server calls).
 */
export const RECENT_MEAL_KEY = 'aaj_recently_seen_meals_v1';
const WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
export function getRecentMealIds(now = Date.now()) {
  try {
    const items = JSON.parse(localStorage.getItem(RECENT_MEAL_KEY) || '[]');
    if (!Array.isArray(items)) return [];
    return [...new Set(items.filter(item => item && typeof item.id === 'string'
      && Number.isFinite(item.at) && item.at <= now && now - item.at < WINDOW_MS)
      .map(item => item.id))].slice(-18);
  } catch { return []; }
}
export function rememberRecentMeals(ids, now = Date.now()) {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_MEAL_KEY) || '[]');
    const prior = Array.isArray(raw) ? raw.filter(x => x && typeof x.id === 'string'
      && Number.isFinite(x.at) && now - x.at < WINDOW_MS && x.at <= now) : [];
    const shown = new Set(ids);
    const merged = [...prior.filter(x=>!shown.has(x.id)), ...ids.map(id=>({id,at:now}))].slice(-18);
    localStorage.setItem(RECENT_MEAL_KEY, JSON.stringify(merged));
    return merged.map(x=>x.id);
  } catch { return ids; }
}
