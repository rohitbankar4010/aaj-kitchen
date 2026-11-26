/**
 * aaj. Tonight's constraints. Device-local, not a medical/allergy filter.
 * No guest login or server needed.
 */
export const KITCHEN_PREFERENCES_KEY = 'aaj_tonight_preferences_v1';
export const DEFAULT_KITCHEN_PREFERENCES = Object.freeze({
  diet: 'vegetarian', // or 'eggs_ok'
  maxTimeMinutes: 0, // 0 means no additional time cap
  people: 2
});

export function normalizeKitchenPreferences(value = {}) {
  const diet = value.diet === 'eggs_ok' ? 'eggs_ok' : 'vegetarian';
  const maxTimeMinutes = [0, 15, 25, 40].includes(Number(value.maxTimeMinutes))
    ? Number(value.maxTimeMinutes) : 0;
  const people = [1, 2, 3, 4].includes(Number(value.people)) ? Number(value.people) : 2;
  return { diet, maxTimeMinutes, people };
}

export function getKitchenPreferences() {
  try { return normalizeKitchenPreferences(JSON.parse(localStorage.getItem(KITCHEN_PREFERENCES_KEY) || '{}')); }
  catch { return { ...DEFAULT_KITCHEN_PREFERENCES }; }
}

export function saveKitchenPreferences(value) {
  const normalized = normalizeKitchenPreferences(value);
  try { localStorage.setItem(KITCHEN_PREFERENCES_KEY, JSON.stringify(normalized)); }
  catch (e) { console.warn('Kitchen preferences could not be saved:', e); }
  return normalized;
}

// Only a vegetarian and an eggs-allowed choice are offered until the catalogue
// has fully modelled non-vegetarian dishes. No unsupported dietary safety claims.
export function dishMatchesDiet(dish, preferences) {
  const ids = dish.requiredIngredients || [];
  return preferences.diet === 'eggs_ok' || !ids.includes('eggs');
}

export function recipeServingsRange(dish) {
  const parts = String(dish.servings || '').match(/\d+/g) || [];
  const min = Number(parts[0]) || 2;
  const max = Number(parts[1]) || min;
  return { min, max };
}
