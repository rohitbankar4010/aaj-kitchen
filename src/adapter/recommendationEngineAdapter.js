/**
 * ============================================================================
 * aaj. RECOMMENDATION ENGINE ADAPTER (DETERMINISTIC LOCAL ENGINE)
 * ============================================================================
 *
 * STATUS: DETERMINISTIC RECIPE-MATCHING ENGINE (DEMO DATA ADAPTER)
 *
 * NOTE ON HONESTY:
 * This adapter uses deterministic ingredient-matching and mood-scoring rules
 * over the local dish catalog and device kitchen memory. It is NOT calling
 * the live Gemini API yet; it preserves the exact structured output schema
 * expected when the live backend is connected.
 * ============================================================================
 */

import { DISH_CATALOG } from '../data/dishCatalog.js';
import { getStoredPantry, INITIAL_PANTRY_STAPLES } from '../data/pantryStaples.js';

export const ADAPTER_CONFIG = {
  mode: 'DEMO_ADAPTER',
  engineVersion: 'deterministic-kitchen-matcher-v3',
  isDemoData: true,
  engineNotice: 'Running on local deterministic recipe-matching engine (no live Gemini API connected yet).'
};

export const AVAILABILITY_STATUS = {
  ALL_IN_PANTRY: 'all_in_pantry',         // 0 missing required, 0 missing optional
  MISSING_OPTIONAL: 'missing_optional',   // 0 missing required, 1+ optional missing
  MISSING_ONE: 'missing_one',             // 1 required missing -> requires shopping
  MISSING_MULTIPLE: 'missing_multiple'    // 2+ required missing -> requires shopping
};

/**
 * Keywords to match a pantry ID against grounded recipe step ingredient strings
 * (e.g. "250g Fresh Malai Paneer (crumbled)") so shopping lists include real quantities.
 */
const INGREDIENT_MATCH_TOKENS = {
  poha: ['poha', 'flattened rice'],
  rajma: ['rajma', 'kidney bean'],
  masoor_dal: ['masoor', 'red lentil'],
  besan: ['besan', 'gram flour'],
  makki_atta: ['makki atta', 'maize flour'],
  pav: ['pav bread', 'pav'],
  bhindi: ['bhindi', 'okra'],
  baingan: ['baingan', 'aubergine', 'brinjal'],
  cauliflower: ['cauliflower', 'gobi'],
  capsicum: ['capsicum', 'bell pepper', 'shimla mirch'],
  lemon: ['lemon', 'lime'],
  eggs: ['eggs', 'egg'],
  butter: ['butter'],
  tamarind: ['tamarind', 'imli'],
  boondi: ['boondi'],
  papad: ['papad'],
  pickle: ['pickle', 'achaar'],
  peanuts: ['peanut'],
  atta: ['atta', 'wheat flour'],
  basmati_rice: ['basmati', 'rice'],
  toor_dal: ['toor dal', 'arhar'],
  moong_dal: ['moong dal', 'yellow moong'],
  chana_dal: ['chana', 'chickpea'],
  onions: ['onion'],
  tomatoes: ['tomato'],
  ginger_garlic: ['ginger', 'garlic'],
  green_chilli: ['green chill', 'hari mirch'],
  fresh_coriander: ['coriander', 'dhaniya leaves'],
  potatoes: ['potato', 'aloo'],
  spinach: ['palak', 'spinach'],
  peas: ['peas', 'matar'],
  mushrooms: ['mushroom'],
  paneer: ['paneer'],
  dahi: ['dahi', 'curd', 'yogurt'],
  milk: ['milk'],
  turmeric: ['haldi', 'turmeric'],
  cumin: ['jeera', 'cumin'],
  red_chilli_powder: ['lal mirch', 'chilli powder'],
  dhaniya_powder: ['dhaniya powder', 'coriander powder'],
  garam_masala: ['garam masala', 'kitchen king'],
  kasuri_methi: ['kasuri methi', 'fenugreek'],
  mustard_seeds: ['mustard seed', 'rai'],
  curry_leaves: ['curry leaves', 'kadi patta'],
  ghee: ['ghee'],
  mustard_oil: ['mustard oil']
};

/**
 * Looks up a grounded quantity/label for an ingredient ID from the dish's actual detailedSteps.
 */
export function getGroundedIngredientDetail(dish, ingredientId, pantryById) {
  const staple = pantryById[ingredientId] || INITIAL_PANTRY_STAPLES.find(p => p.id === ingredientId);
  const baseName = staple ? staple.name : ingredientId.replace(/_/g, ' ');
  const tokens = INGREDIENT_MATCH_TOKENS[ingredientId] || [ingredientId.replace(/_/g, ' ')];

  const stepIngredients = (dish.detailedSteps || []).flatMap(s => s.ingredientsUsed || []);
  const matchedString = stepIngredients.find(str => {
    const lower = str.toLowerCase();
    return tokens.some(tok => lower.includes(tok));
  });

  return {
    id: ingredientId,
    name: baseName,
    hindiName: staple?.hindiName || '',
    icon: staple?.icon || '🛒',
    quantityText: matchedString || baseName,
    hasGroundedQuantity: Boolean(matchedString)
  };
}

/**
 * Evaluates dish feasibility strictly against current kitchen state.
 * - `unavailable` essentials ALWAYS block ready status (`requiresShopping: true`).
 * - `remembered` and `recent` essentials allow meal ideas, but are NOT marked as confirmed today.
 * - Only `confirmed` essentials count as verified today.
 */
export function evaluateDishAvailability(dish, pantryList) {
  const pantryById = Object.fromEntries(pantryList.map(item => [item.id, item]));

  const getState = (id) => {
    const item = pantryById[id];
    if (!item) return 'unavailable';
    if (item.kitchenState) return item.kitchenState;
    return item.inStock ? 'remembered' : 'unavailable';
  };

  const unavailableRequired = [];
  const unverifiedRequired = [];
  const confirmedRequired = [];

  for (const id of dish.requiredIngredients) {
    const st = getState(id);
    if (st === 'unavailable') {
      unavailableRequired.push(id);
    } else if (st === 'confirmed') {
      confirmedRequired.push(id);
    } else {
      // 'remembered' or 'recent' -> available as memory/idea, not verified today
      unverifiedRequired.push(id);
    }
  }

  const missingOptional = dish.optionalIngredients.filter(id => getState(id) === 'unavailable');

  const missingDetails = unavailableRequired.map(id =>
    getGroundedIngredientDetail(dish, id, pantryById)
  );
  const missingOptionalDetails = missingOptional.map(id =>
    getGroundedIngredientDetail(dish, id, pantryById)
  );

  const totalRequired = dish.requiredIngredients.length;
  const availableRequiredCount = totalRequired - unavailableRequired.length;
  const feasibilityPercentage = totalRequired > 0
    ? Math.round((availableRequiredCount / totalRequired) * 100)
    : 100;

  const isFullyConfirmed = unavailableRequired.length === 0 && unverifiedRequired.length === 0;
  const requiresShopping = unavailableRequired.length > 0;

  let status = AVAILABILITY_STATUS.ALL_IN_PANTRY;
  let label = 'Likely in kitchen*';
  let badgeTone = 'success';
  let missingItemsDetail = [];

  if (unavailableRequired.length === 0 && missingOptional.length === 0) {
    status = AVAILABILITY_STATUS.ALL_IN_PANTRY;
    label = isFullyConfirmed ? 'Confirmed ready today ✓' : 'Likely in kitchen*';
    badgeTone = 'success';
  } else if (unavailableRequired.length === 0 && missingOptional.length > 0) {
    status = AVAILABILITY_STATUS.MISSING_OPTIONAL;
    label = isFullyConfirmed
      ? `Confirmed · Optional: ${missingOptionalDetails[0].name}`
      : `Missing optional: ${missingOptionalDetails[0].name}`;
    badgeTone = 'info';
    missingItemsDetail = missingOptional;
  } else if (unavailableRequired.length === 1) {
    status = AVAILABILITY_STATUS.MISSING_ONE;
    label = `Needs ${missingDetails[0].name}`;
    badgeTone = 'warning';
    missingItemsDetail = unavailableRequired;
  } else {
    status = AVAILABILITY_STATUS.MISSING_MULTIPLE;
    label = `Needs ${unavailableRequired.length} ingredients`;
    badgeTone = 'subtle';
    missingItemsDetail = unavailableRequired;
  }

  // Honest recommendation reason
  let reason = '';
  if (requiresShopping) {
    const names = missingDetails.slice(0, 2).map(m => m.name);
    const extra = missingDetails.length > 2 ? ` +${missingDetails.length - 2} more` : '';
    reason = `Near match — missing ${names.join(', ')}${extra} (requires shopping)`;
  } else if (isFullyConfirmed) {
    reason = `All ${totalRequired} essentials confirmed today · Ready in ${dish.totalTimeMinutes}m`;
  } else if (unverifiedRequired.length > 0 && unverifiedRequired.length < totalRequired) {
    reason = `${confirmedRequired.length} confirmed + ${unverifiedRequired.length} remembered/recent · ${dish.totalTimeMinutes}m`;
  } else {
    reason = `Matches remembered kitchen staples · Confirm essentials before cooking`;
  }

  return {
    status,
    label,
    badgeTone,
    reason,
    requiresShopping,
    isFullyConfirmed,
    missingItemsDetail,
    missingDetails,
    missingOptionalDetails,
    unavailableRequiredCount: unavailableRequired.length,
    unverifiedRequiredCount: unverifiedRequired.length,
    confirmedRequiredCount: confirmedRequired.length,
    feasibilityPercentage,
    disclaimer: isFullyConfirmed
      ? 'All essentials confirmed today'
      : 'Includes remembered or unverified groceries'
  };
}

/**
 * Deterministic recipe-matching and ranking engine.
 * Strict tiering:
 *   Tier 1: 0 missing required ingredients (eligible to cook without shopping)
 *   Tier 2: 1+ missing required ingredients (near-matches marked as requiring shopping)
 */
export async function getRecommendations({
  mood = 'quick',
  excludeIds = [],
  customPantry = null,
  limit = 3,
  recentIds = []
} = {}) {
  await new Promise(resolve => setTimeout(resolve, 60));

  const pantry = customPantry || getStoredPantry();
  const excludedSet = new Set(excludeIds);
  const allCandidates = DISH_CATALOG.filter(dish => !excludedSet.has(dish.id));
  // Keep the mood promise, even near the end of a browsing rotation.
  // Showing fewer than three relevant choices beats inventing a Quick meal
  // from a 40-minute recipe. showMoreMeals resets the rotation when empty.
  const candidates = allCandidates.filter(dish => dish.moods.includes(mood)
    && (mood !== 'quick' || dish.totalTimeMinutes <= 25));
  const recentSet = new Set(recentIds);

  const moodLabels = {
    quick: 'Quick',
    comfort: 'Comfort',
    healthy: 'Healthy',
    surprise_me: 'Surprise Me'
  };

  const evaluatedDishes = candidates.map(dish => {
    const availability = evaluateDishAvailability(dish, pantry);
    const matchesMood = dish.moods.includes(mood);

    // Enrich reason with mood context when eligible
    if (!availability.requiresShopping && matchesMood) {
      availability.reason = `Fits your ${moodLabels[mood] || mood} mood · ${availability.reason}`;
    }

    return {
      ...dish,
      matchesMood,
      availability
    };
  });

  // Deterministic ranking:
  // 1. Eligible (0 missing essentials) ALWAYS beats near-matches (requiresShopping)
  // 2. Within near-matches, fewest missing essentials ALWAYS wins
  // 3. Within eligible, mood match -> confirmed today -> fewer missing optionals -> faster cook time
  evaluatedDishes.sort((a, b) => {
    const reqA = a.availability.unavailableRequiredCount;
    const reqB = b.availability.unavailableRequiredCount;

    const tierA = reqA === 0 ? 0 : 1;
    const tierB = reqB === 0 ? 0 : 1;
    if (tierA !== tierB) return tierA - tierB;

    if (tierA === 1) {
      // Near-matches: fewer missing essentials first, then higher feasibility %, then mood match
      if (reqA !== reqB) return reqA - reqB;
      if (b.availability.feasibilityPercentage !== a.availability.feasibilityPercentage) {
        return b.availability.feasibilityPercentage - a.availability.feasibilityPercentage;
      }
      if (a.matchesMood !== b.matchesMood) return a.matchesMood ? -1 : 1;
      if (recentSet.has(a.id) !== recentSet.has(b.id)) return recentSet.has(a.id) ? 1 : -1;
      return a.totalTimeMinutes - b.totalTimeMinutes;
    }

    // Eligible tier: mood match -> fully confirmed -> no missing optional -> speed
    if (a.matchesMood !== b.matchesMood) return a.matchesMood ? -1 : 1;
    if (recentSet.has(a.id) !== recentSet.has(b.id)) return recentSet.has(a.id) ? 1 : -1;
    if (a.availability.isFullyConfirmed !== b.availability.isFullyConfirmed) {
      return a.availability.isFullyConfirmed ? -1 : 1;
    }
    const optA = a.availability.missingOptionalDetails.length;
    const optB = b.availability.missingOptionalDetails.length;
    if (optA !== optB) return optA - optB;

    if (mood === 'quick') {
      return a.totalTimeMinutes - b.totalTimeMinutes;
    }
    return a.totalTimeMinutes - b.totalTimeMinutes;
  });

  const selected = evaluatedDishes.slice(0, limit);
  const hasCompleteMatch = selected.some(d => !d.availability.requiresShopping);

  return {
    meta: {
      adapterMode: ADAPTER_CONFIG.mode,
      isDemoData: ADAPTER_CONFIG.isDemoData,
      notice: ADAPTER_CONFIG.engineNotice,
      generatedAt: new Date().toISOString(),
      activeMood: mood,
      hasCompleteMatch,
      totalCandidatesEvaluated: evaluatedDishes.length
    },
    recommendations: selected
  };
}

/**
 * Handles the "Not available" correction action.
 * Finds a fresh, feasible replacement dish that satisfies the active mood.
 */
export async function replaceDish({
  dishToReplaceId,
  mood,
  currentRecommendedIds = [],
  reason = 'missing_ingredient',
  customPantry = null
}) {
  const excludeIds = [...currentRecommendedIds, dishToReplaceId];
  const response = await getRecommendations({
    mood,
    excludeIds,
    customPantry,
    limit: 1
  });

  const replacement = response.recommendations[0] || null;

  return {
    replacedId: dishToReplaceId,
    replacement,
    reason,
    timestamp: new Date().toISOString()
  };
}
