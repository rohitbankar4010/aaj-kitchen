/** aaj. P0 sanity tests for product trust + preferences. Run: node tests/final_quality.mjs */
import assert from 'node:assert/strict';
import { DISH_CATALOG } from '../src/data/dishCatalog.js';
import { INITIAL_PANTRY_STAPLES, PANTRY_STORAGE_KEY, PANTRY_CONFIRM_DATE_KEY, getStoredPantry, saveStoredPantry, expireOldPantryConfirmations, localKitchenDay } from '../src/data/pantryStaples.js';
import { getKitchenPreferences, saveKitchenPreferences, dishMatchesDiet, recipeServingsRange } from '../src/data/kitchenPreferences.js';
import { evaluateDishAvailability, getRecommendations } from '../src/adapter/recommendationEngineAdapter.js';
import { rememberRecentMeals, getRecentMealIds, RECENT_MEAL_KEY } from '../src/data/mealHistory.js';
const store = new Map();
globalThis.localStorage = {
  getItem: key => store.has(key) ? store.get(key) : null,
  setItem: (key,value) => store.set(key, String(value)),
  removeItem: key => store.delete(key)
};
let checks=0;
const ok=(value,message)=>{assert.ok(value,message);checks++};
const dish=(id)=>{const match=DISH_CATALOG.find(d=>d.id===id);assert.ok(match,id);return match};

// Migration: no old confirmation can masquerade as current stock.
const base=INITIAL_PANTRY_STAPLES.map(p=>({ ...p, kitchenState:p.inStock?'remembered':'unavailable' }));
const paneer=base.find(p=>p.id==='paneer');paneer.kitchenState='confirmed';
store.set(PANTRY_STORAGE_KEY,JSON.stringify(base));
const migrated=getStoredPantry();
ok(migrated.find(p=>p.id==='paneer').kitchenState==='remembered','legacy confirmed must expire');
ok(migrated.find(p=>p.id==='salt').kitchenState==='unavailable','new spice default must not auto-confirm');
ok(migrated.find(p=>p.id==='tomatoes').kitchenState==='remembered','existing remembered selection survives migration');
const yesterday='2026-11-25',today='2026-11-26';
ok(expireOldPantryConfirmations([{id:'paneer',kitchenState:'confirmed',inStock:true}],yesterday,today)[0].kitchenState==='remembered','rollover demotes');
ok(expireOldPantryConfirmations([{id:'paneer',kitchenState:'confirmed',inStock:true}],today,today)[0].kitchenState==='confirmed','same-day remains confirmed');
saveStoredPantry(migrated.map(p=>p.id==='paneer'?{...p,kitchenState:'confirmed',inStock:true}:p));
ok(store.get(PANTRY_CONFIRM_DATE_KEY)===localKitchenDay(),'new confirmation saves local calendar date');
ok(getStoredPantry().find(p=>p.id==='paneer').kitchenState==='confirmed','today confirmation persists');

// Catalogue quality and no more fake shopping for sides.
ok(DISH_CATALOG.length===30,'catalogue is 30 dishes');
const ids=new Set(INITIAL_PANTRY_STAPLES.map(p=>p.id));
for(const d of DISH_CATALOG){
 ok(d.requiredIngredients.every(id=>ids.has(id)),`${d.id} has a known required ingredient`);
 ok(d.optionalIngredients.every(id=>ids.has(id)),`${d.id} has a known optional ingredient`);
 ok(d.detailedSteps?.length>=4,`${d.id} has cooking instructions`);
 ok(d.totalTimeMinutes>0 && d.totalTimeMinutes >= d.prepTimeMinutes,`${d.id} time is plausible`);
}
ok(!dish('moong-dal-khichdi-ghee').requiredIngredients.includes('dahi'),'khichdi does not need optional dahi');
ok(!dish('quick-veg-pulao').requiredIngredients.includes('dahi'),'veg pulao does not need optional dahi');
ok(!dish('lemon-rice-south').requiredIngredients.includes('dahi'),'lemon rice does not need optional dahi');
ok(!dish('kanda-batata-poha').requiredIngredients.includes('dahi'),'poha does not need optional dahi');
ok(dish('quick-veg-pulao').totalTimeMinutes >=30,'pulao soaking time must count');
ok(dish('kashmiri-dum-aloo').requiredIngredients.includes('saunf') && dish('kashmiri-dum-aloo').requiredIngredients.includes('saunth'),'signature Kashmiri spices are checked');
ok(dish('chettinad-veg-pulao').requiredIngredients.includes('star_anise'),'signature Chettinad spices are checked');
ok(dish('rajma-chawal').advancePreparation?.includes('overnight'),'rajma advance prep shown');
ok(dish('dahi-vada-chaat').advancePreparation?.includes('2 hours'),'dahi vada soak shown');

// Pantry availability vs remembered.
const rajma=dish('rajma-chawal');
const allConfirmed=INITIAL_PANTRY_STAPLES.map(x=>({...x,inStock:true,kitchenState:'confirmed'}));
const evalRajma=evaluateDishAvailability(rajma,allConfirmed);
ok(evalRajma.needsAdvancePrepCheck && !evalRajma.isFullyConfirmed,'dry beans can never be labelled definitely ready based only on stock');
const withoutPaneer=INITIAL_PANTRY_STAPLES.map(x=>({...x,kitchenState:x.id==='paneer'?'unavailable':'confirmed',inStock:x.id!=='paneer'}));
const evalPaneer=evaluateDishAvailability(dish('paneer-bhurji-paratha'),withoutPaneer);
ok(evalPaneer.requiresShopping && evalPaneer.unavailableRequiredCount===1,'missing paneer must block ready status');

// Preferences are real matching constraints; no unsupported non-veg or allergy claims.
saveKitchenPreferences({diet:'vegetarian',maxTimeMinutes:15,people:2});
ok(getKitchenPreferences().maxTimeMinutes===15,'time saved');
ok(dishMatchesDiet(dish('anda-bhurji-pav'),getKitchenPreferences())===false,'vegetarian excludes eggs');
let rec=await getRecommendations({mood:'quick',customPantry:allConfirmed,limit:30});
ok(rec.recommendations.every(d=>d.totalTimeMinutes<=15),'15m cap is strict');
ok(rec.recommendations.every(d=>!d.requiredIngredients.includes('eggs')),'veg excludes eggs');
saveKitchenPreferences({diet:'eggs_ok',maxTimeMinutes:15,people:2});
rec=await getRecommendations({mood:'quick',customPantry:allConfirmed,limit:30});
ok(rec.recommendations.some(d=>d.id==='anda-bhurji-pav'),'eggs allowed when selected');
ok(recipeServingsRange(dish('rajma-chawal')).min===3 && recipeServingsRange(dish('rajma-chawal')).max===4,'serve count parsed correctly');
const none=await getRecommendations({mood:'surprise_me',customPantry:allConfirmed,limit:30,preferences:{diet:'vegetarian',maxTimeMinutes:15,people:2}});
ok(none.recommendations.length===0,'impossible time constraints return no invented dish');
rememberRecentMeals(['khichdi','paneer'], 1000000000);
ok(getRecentMealIds(1000000000).includes('paneer'),'recent meals are remembered on this device');
ok(!getRecentMealIds(1000000000 + 8 * 24 * 60 * 60 * 1000).includes('paneer'),'recent meals expire after a week');
console.log(`PASS: ${checks} detailed quality checks (daily freshness, optional sides, signature masalas, advance prep, vegetarian/egg + time filters).`);
