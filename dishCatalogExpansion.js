/**
 * aaj. Dish Catalog — Expansion Pack (Dishes 10–30)
 * 21 additional authentic Indian home-cooked meals.
 * All ingredient IDs match INITIAL_PANTRY_STAPLES in pantryStaples.js.
 * Every recipe has 5 detailed steps with sceneType, timerSec, and ingredientsUsed.
 */

export const DISH_CATALOG_EXPANSION = [

  // 10. ALOO PARATHA WITH PICKLE & DAHI
  {
    id: 'aloo-paratha-dahi',
    name: 'Punjabi Aloo Paratha (Dahi Optional)',
    hindiName: 'पंजाबी आलू परांठा दही अचार',
    tagline: 'Golden, ghee-roasted stuffed flatbreads with spiced mashed potato filling, chilled curd and tangy pickle',
    moods: ['quick', 'comfort'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    spiceLevel: 'Medium',
    servings: '2 people',
    utensils: ['Tawa', 'Rolling Pin', 'Mixing Bowl'],
    requiredIngredients: ['atta', 'potatoes', 'onions', 'green_chilli', 'ginger_garlic', 'ghee', 'cumin', 'dhaniya_powder'],
    optionalIngredients: ['fresh_coriander', 'garam_masala', 'pickle', 'dahi', 'amchur'],
    story: 'The definitive Punjabi breakfast-for-dinner. Crisp, buttery, generously stuffed — eaten guilt-free with chilled dahi.',
    chefTip: 'Keep the filling dry by squeezing out any moisture from grated potatoes before stuffing — this prevents soggy parathas.',
    accentColor: 'var(--color-butter-yellow)',
    badgeText: '⚡ 25 Min Comfort',
    illustrationType: 'aloo_paratha',
    image3d: './assets/3d/aloo_paratha_3d.jpg',
    quickSteps: [
      'Boil and mash potatoes with spices, green chilli, and coriander into a dry filling.',
      'Knead soft atta dough; roll a disc, place filling in centre, seal and re-roll gently.',
      'Roast on hot tawa with generous ghee until both sides are golden-freckled.',
      'Serve hot with chilled dahi and your favourite tangy pickle.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Boil & Spice the Potato Filling',
        instruction: 'Boil 3 medium potatoes until completely tender; peel and mash smooth. Mix in 1 tsp cumin, 1 tsp dhaniya powder, 1 minced green chilli, 1 tsp grated ginger, 1/2 tsp amchur, salt to taste, and 2 tbsp fresh coriander.',
        tips: ['Keep the filling completely dry — excess moisture splits parathas during rolling', 'Taste and adjust salt before stuffing'],
        flame: 'Prep (No Flame)',
        utensil: 'Mixing Bowl',
        sceneType: 'knead_roll',
        timerSec: 120,
        ingredientsUsed: ['3 Medium Potatoes (boiled, mashed)', '1 tsp Jeera', '1 tsp Dhaniya Powder', '1 Green Chilli (minced)', '2 tbsp Fresh Coriander', '1/2 tsp Amchur', 'Salt to taste']
      },
      {
        stepNumber: 2,
        title: 'Knead Soft Atta Dough',
        instruction: 'Combine 2 cups Chakki Atta with 1/2 tsp salt and 1 tsp Desi Ghee. Gradually add 3/4 cup warm water, kneading into a soft, pliable dough. Cover with a damp cloth and rest for 5 minutes.',
        tips: ['A rested dough rolls without tearing or shrinking back', 'The ghee in the dough creates naturally flaky layers'],
        flame: 'Prep (No Flame)',
        utensil: 'Mixing Bowl & Rolling Board',
        sceneType: 'knead_roll',
        timerSec: 180,
        ingredientsUsed: ['2 cups Chakki Atta', '1 tsp Desi Ghee', '3/4 cup Warm Water', '1/2 tsp Salt']
      },
      {
        stepNumber: 3,
        title: 'Stuff, Seal & Roll Carefully',
        instruction: 'Divide dough into balls. Roll one into a 4-inch disc, place 2 tbsp filling in the centre. Gather the edges, pinch to seal completely. Dust with dry flour and gently roll into a 7-inch paratha, pressing evenly.',
        tips: ['Roll from center outward with light, even pressure', 'If filling pokes through, patch with a dab of dry flour'],
        flame: 'Prep (No Flame)',
        utensil: 'Chakla & Belan',
        sceneType: 'knead_roll',
        timerSec: 180,
        ingredientsUsed: ['Stuffed Dough Balls', 'Dry Atta for dusting']
      },
      {
        stepNumber: 4,
        title: 'Roast Golden on Hot Tawa with Ghee',
        instruction: 'Heat your cast iron tawa until very hot. Place a paratha on tawa; flip after 20 seconds. Drizzle 1 tsp Desi Ghee on top and press with spatula. Flip again, add more ghee, and press until both sides have beautiful golden-brown freckles.',
        tips: ['A hot tawa creates the signature crisp, blistered crust instantly', 'Press edges firmly with spatula so corners cook through'],
        flame: 'Medium-High Flame',
        utensil: 'Cast Iron Tawa & Flat Spatula',
        sceneType: 'roast',
        timerSec: 180,
        ingredientsUsed: ['1.5 tsp Desi Ghee per paratha']
      },
      {
        stepNumber: 5,
        title: 'Plate with Dahi & Pickle',
        instruction: 'Stack hot parathas in a casserole to keep them soft. Serve with 1 cup chilled fresh dahi lightly whisked with a pinch of salt and your favourite tangy mango or lime pickle on the side.',
        tips: ['Resting parathas stacked lets steam keep them pliable and soft', 'A sliver of white butter melting over the hot paratha is non-negotiable'],
        flame: 'Ready to Serve',
        utensil: 'Dinner Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['1 cup Fresh Dahi (chilled)', 'Mango / Lime Pickle', 'White Butter (optional)']
      }
    ]
  },

  // 11. RAJMA CHAWAL
  {
    id: 'rajma-chawal',
    advancePreparation: 'Soak dry rajma overnight before cooking; beans must be thoroughly cooked.',
    name: 'Delhi-Style Rajma Chawal',
    hindiName: 'राजमा चावल',
    tagline: 'Dark kidney beans slow-simmered in a thick, spiced tomato-onion gravy with steaming white basmati rice',
    moods: ['comfort', 'healthy'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    totalTimeMinutes: 40,
    spiceLevel: 'Medium',
    servings: '3–4 people',
    utensils: ['Pressure Cooker', 'Kadhai', 'Saucepan'],
    requiredIngredients: ['basmati_rice', 'onions', 'tomatoes', 'ginger_garlic', 'ghee', 'cumin', 'turmeric', 'red_chilli_powder', 'dhaniya_powder', 'garam_masala', 'rajma'],
    optionalIngredients: ['fresh_coriander', 'kasuri_methi'],
    story: 'The ultimate Delhi Monday comfort food. Slow-simmered until the gravy turns thick as velvet and the beans melt in your mouth.',
    chefTip: 'Mash 3-4 cooked rajma beans against the pot wall to naturally thicken the gravy without any cornstarch.',
    accentColor: 'var(--color-tomato-dark)',
    badgeText: '🍲 Ultimate Comfort',
    illustrationType: 'rajma',
    image3d: './assets/3d/rajma_3d.jpg',
    quickSteps: [
      'Pressure-cook soaked kidney beans with salt and haldi for 5 whistles until butter-soft.',
      'Bhuna finely minced onions in ghee for 6 minutes until deep mahogany brown.',
      'Add tomato purée with ground spices; cook until oil separates and masala is fragrant.',
      'Fold in beans with their broth; simmer 10 minutes until thick and velvety. Serve with fluffy jeera rice.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Pressure-Cook Kidney Beans Until Soft',
        instruction: 'Place 1.5 cups soaked rajma (kidney beans) in pressure cooker with 3.5 cups water, 1/2 tsp haldi, and 1 tsp salt. Cook on high for 5 whistles, then allow steam to release naturally for 10 minutes.',
        tips: ['Beans should crush completely between fingers — cook longer if not', 'Never skip soaking overnight — it reduces cook time and aids digestion'],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 720,
        ingredientsUsed: ['1.5 cups Rajma (soaked overnight)', '3.5 cups Water', '1/2 tsp Haldi', '1 tsp Salt']
      },
      {
        stepNumber: 2,
        title: 'Slow Bhuna Onions to Deep Mahogany',
        instruction: 'Heat 2 tbsp Desi Ghee in a heavy kadhai. Add 1 tsp cumin seeds, then 2 finely minced large onions and 1 tbsp ginger-garlic paste. Sauté patiently on medium heat for 7 minutes until deep golden-brown.',
        tips: ['Deep brown onions are the foundation — do not rush this step', 'Add a splash of water if onions start sticking'],
        flame: 'Medium Flame',
        utensil: 'Heavy Kadhai',
        sceneType: 'temper',
        timerSec: 420,
        ingredientsUsed: ['2 tbsp Desi Ghee', '1 tsp Jeera', '2 Large Onions (minced)', '1 tbsp Ginger-Garlic Paste']
      },
      {
        stepNumber: 3,
        title: 'Simmer Spiced Tomato Masala',
        instruction: 'Add 3 pureed country tomatoes with 1 tsp dhaniya powder, 1 tsp red chilli powder, 1/2 tsp garam masala, and 1/2 tsp cumin powder. Cook on medium heat for 6 minutes until oil separates and masala is fragrant and thick.',
        tips: ['Oil separating on the edges signals that the masala is properly cooked', 'Rub kasuri methi between your palms and add now for restaurant depth'],
        flame: 'Medium Flame',
        utensil: 'Heavy Kadhai',
        sceneType: 'simmer',
        timerSec: 360,
        ingredientsUsed: ['3 Country Tomatoes (pureed)', '1 tsp Dhaniya Powder', '1 tsp Red Chilli Powder', '1/2 tsp Garam Masala', '1 tsp Kasuri Methi']
      },
      {
        stepNumber: 4,
        title: 'Fold Beans & Simmer to Velvety Gravy',
        instruction: 'Pour the cooked rajma beans along with their cooking broth into the masala. Mash 3-4 beans against the pot wall to thicken. Simmer uncovered on medium-low for 10 minutes, stirring occasionally, until gravy is thick and coats a spoon.',
        tips: ['Add boiling water if gravy becomes too thick', 'Finish with 1/2 tsp garam masala and a knob of butter for richness'],
        flame: 'Medium-Low Simmer',
        utensil: 'Kadhai (uncovered)',
        sceneType: 'simmer',
        timerSec: 600,
        ingredientsUsed: ['Cooked Rajma with Broth', '1 tsp Butter (optional finish)']
      },
      {
        stepNumber: 5,
        title: 'Cook Fluffy Basmati & Serve Hot',
        instruction: 'Cook 1.5 cups soaked basmati rice with 2.5 cups water, 1 tsp ghee, and salt until perfectly fluffy. Fluff with fork, plate alongside generous ladle of rajma. Garnish with fresh coriander, raw onion rings, and lime wedges.',
        tips: ['A drizzle of raw ghee over the final plate elevates it completely', 'Serve extra gravy in a small bowl for scooping'],
        flame: 'Low Simmer',
        utensil: 'Saucepan & Serving Bowls',
        sceneType: 'plate',
        timerSec: 120,
        ingredientsUsed: ['1.5 cups Basmati Rice (cooked)', 'Fresh Coriander', 'Raw Onion Rings', 'Lime Wedge', '1 tsp Desi Ghee']
      }
    ]
  },

  // 12. BHINDI MASALA
  {
    id: 'bhindi-masala-roti',
    name: 'Kurkuri Bhindi Masala with Rotis',
    hindiName: 'कुरकुरी भिंडी मसाला और रोटी',
    tagline: 'Crisp-fried okra tossed with caramelized onions, amchur and warm masala in a dry stir-fry',
    moods: ['quick', 'healthy'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    spiceLevel: 'Mild-Medium',
    servings: '2 people',
    utensils: ['Broad Kadhai', 'Tawa'],
    requiredIngredients: ['atta', 'onions', 'tomatoes', 'mustard_oil', 'turmeric', 'red_chilli_powder', 'dhaniya_powder', 'cumin', 'bhindi'],
    optionalIngredients: ['fresh_coriander', 'garam_masala'],
    story: 'The secret is high heat and no water — this keeps the okra crisp and never slimy. A satisfying dry masala that pairs perfectly with fresh rotis.',
    chefTip: 'Completely dry your okra after washing — any moisture creates sliminess. High heat and no stirring for the first 2 minutes creates the kurkuri crunch.',
    accentColor: 'var(--color-herb-medium)',
    badgeText: '⚡ Crisp & Quick',
    illustrationType: 'bhindi',
    image3d: './assets/3d/bhindi_3d.jpg',
    quickSteps: [
      'Completely dry washed okra; slice into 1.5-inch pieces.',
      'Flash-fry in hot mustard oil on high heat for 4 minutes without stirring; set aside.',
      'Sauté onions and spices; fold in crisp okra and toss on high for 2 minutes.',
      'Serve with fresh hot rotis from the tawa.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Dry & Slice Bhindi into Pieces',
        instruction: 'Wash 300g fresh bhindi (okra) and spread on a kitchen towel. Pat bone-dry — moisture is the enemy of crisp bhindi. Slice off the crown and tip, then cut into 1.5-inch diagonal pieces.',
        tips: ['Even 1 drop of water creates the dreaded slimy texture', 'Air-dry for 10 minutes if washed ahead of time'],
        flame: 'Prep (No Flame)',
        utensil: 'Chopping Board & Knife',
        sceneType: 'knead_roll',
        timerSec: 120,
        ingredientsUsed: ['300g Fresh Bhindi (okra)', 'Kitchen Towel for drying']
      },
      {
        stepNumber: 2,
        title: 'Flash-Fry Bhindi Crisp on High Heat',
        instruction: 'Heat 2 tbsp mustard oil in your broad kadhai until smoking. Add dried bhindi pieces in a single layer. Cook on HIGH flame without stirring for 2 minutes, then toss gently. Season with salt and 1/2 tsp haldi; fry 2 more minutes until golden-crisp. Remove.',
        tips: ['High heat and no water = crispy, never slimy okra', 'Resist stirring for the first 2 minutes to let them sear'],
        flame: 'High Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'temper',
        timerSec: 240,
        ingredientsUsed: ['2 tbsp Kachi Ghani Mustard Oil', '300g Dried Bhindi', '1/2 tsp Haldi', '1/2 tsp Salt']
      },
      {
        stepNumber: 3,
        title: 'Sauté Spiced Onion Base',
        instruction: 'In the same kadhai, add 1 tsp oil. Sauté 1 sliced onion with 1 tsp cumin seeds until golden. Add 1 chopped tomato, 1 tsp dhaniya powder, 1/2 tsp red chilli powder, and 1/2 tsp amchur. Cook 2 minutes until tomato softens.',
        tips: ['Amchur (dry mango powder) is key to the tangy bhindi masala flavour', 'Keep heat high so the masala bhunos rather than stews'],
        flame: 'Medium-High Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'simmer',
        timerSec: 180,
        ingredientsUsed: ['1 Onion (sliced)', '1 tsp Jeera', '1 Tomato (chopped)', '1 tsp Dhaniya Powder', '1/2 tsp Red Chilli Powder', '1/2 tsp Amchur']
      },
      {
        stepNumber: 4,
        title: 'Toss Bhindi in Masala & Finish',
        instruction: 'Return the crisp bhindi to the masala. Toss together on high heat for 2 minutes to coat each piece evenly. Adjust salt, finish with 1/4 tsp garam masala and a handful of fresh coriander. Remove from flame while still vibrant.',
        tips: ['Two minutes maximum — longer cooking makes them limp again', 'Sprinkle fresh coriander only after removing from heat'],
        flame: 'High Flame (2 min)',
        utensil: 'Broad Kadhai',
        sceneType: 'temper',
        timerSec: 120,
        ingredientsUsed: ['Crisp Fried Bhindi', '1/4 tsp Garam Masala', 'Fresh Coriander']
      },
      {
        stepNumber: 5,
        title: 'Make Fresh Rotis & Serve',
        instruction: 'Roll soft atta dough balls into thin rotis and roast on hot tawa, flipping until charred spots appear. Brush with ghee. Serve hot alongside kurkuri bhindi masala with sliced cucumber and lemon wedges.',
        tips: ['The dry masala fills the roti roll perfectly for a hand-eating experience', 'Serve immediately while bhindi is still crisp'],
        flame: 'Medium-High Flame',
        utensil: 'Iron Tawa',
        sceneType: 'plate',
        timerSec: 180,
        ingredientsUsed: ['Atta Rotis', '1 tsp Desi Ghee', 'Cucumber Slices', 'Lemon Wedge']
      }
    ]
  },

  // 13. VEG PULAO
  {
    id: 'quick-veg-pulao',
    name: 'One-Pot Vegetable Pulao',
    hindiName: 'सब्ज़ी पुलाव',
    tagline: 'Fragrant basmati rice with peas and warming spices, cooked in one simple, satisfying pot',
    moods: ['healthy', 'comfort'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    totalTimeMinutes: 30,
    spiceLevel: 'Mild',
    servings: '2–3 people',
    utensils: ['Saucepan with Lid', 'Whisking Bowl'],
    requiredIngredients: ['basmati_rice', 'peas', 'onions', 'ginger_garlic', 'ghee', 'cumin'],
    optionalIngredients: ['fresh_coriander', 'potatoes', 'dahi'],
    story: 'The weeknight hero that requires zero planning. One pot, minimal prep, maximum aroma. Perfect for when you want something wholesome without effort.',
    chefTip: 'The 1:1.75 rice to water ratio is the key to individual, fluffy grains in a pulao — never more, never less.',
    accentColor: 'var(--color-herb-deep)',
    badgeText: '⚡ One Pot Wonder',
    illustrationType: 'veg_pulao',
    image3d: './assets/3d/veg_pulao_3d.jpg',
    quickSteps: [
      'Soak basmati rice 15 minutes; drain.',
      'Crackle whole spices in ghee; sauté onions until golden, add ginger-garlic.',
      'Add drained rice, vegetables, hot water and salt; bring to boil then dum on lowest flame for 12 minutes.',
      'Fluff and serve with chilled raita.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Soak & Drain Basmati Rice',
        instruction: 'Measure 1.5 cups Basmati rice into a bowl. Rinse gently 2-3 times until water runs clear. Soak in cold water for 15 minutes, then drain completely through a strainer.',
        tips: ['Soaking elongates grains and prevents them from breaking during cooking', 'Drain completely — excess water alters the water ratio'],
        flame: 'Prep (No Flame)',
        utensil: 'Strainer & Bowl',
        sceneType: 'whisk',
        timerSec: 120,
        ingredientsUsed: ['1.5 cups Basmati Rice']
      },
      {
        stepNumber: 2,
        title: 'Crackle Whole Spices in Ghee',
        instruction: 'Heat 1.5 tbsp Desi Ghee in a saucepan with a tight-fitting lid. Add 1 tsp cumin seeds, 2 cloves, 1 bay leaf, and 1 small cardamom pod. Let them crackle for 20 seconds until fragrant, then add 1 sliced onion.',
        tips: ['The whole spices release their essential oils into the ghee, perfuming every grain of rice', 'Bay leaf is key for the classic pulao aroma'],
        flame: 'Medium Flame',
        utensil: 'Saucepan with Lid',
        sceneType: 'temper',
        timerSec: 120,
        ingredientsUsed: ['1.5 tbsp Desi Ghee', '1 tsp Jeera', '2 Cloves', '1 Bay Leaf', '1 Cardamom', '1 Onion (sliced)']
      },
      {
        stepNumber: 3,
        title: 'Sauté Onions & Add Vegetables',
        instruction: 'Cook onion until golden, about 3 minutes. Add 1 tsp ginger-garlic paste and stir 30 seconds. Fold in 1 cup fresh green peas, 1/2 cup diced potatoes (optional), and 1 chopped tomato. Season with 1/2 tsp salt and 1/4 tsp turmeric.',
        tips: ['Sauté the vegetables briefly to seal in their texture before adding water', 'Fresh green peas add natural sweetness to the pulao'],
        flame: 'Medium Flame',
        utensil: 'Saucepan',
        sceneType: 'simmer',
        timerSec: 180,
        ingredientsUsed: ['1 tsp Ginger-Garlic Paste', '1 cup Green Peas', '1 Tomato (chopped)', '1/4 tsp Haldi', '1/2 tsp Salt']
      },
      {
        stepNumber: 4,
        title: 'Dum Cook Rice on Lowest Flame',
        instruction: 'Gently fold in the drained basmati rice. Pour 2.5 cups hot water (1:1.75 ratio). Bring to a rolling boil on high heat, stir once, then cover tightly and reduce to the absolute lowest flame. Cook undisturbed for 12 minutes.',
        tips: ['Do NOT lift the lid during dum cooking — steam cooks each grain perfectly', 'Place a tawa under the saucepan for more even, gentle heat'],
        flame: 'High then Lowest Flame Dum',
        utensil: 'Saucepan (Sealed Lid)',
        sceneType: 'simmer',
        timerSec: 720,
        ingredientsUsed: ['Drained Basmati Rice', '2.5 cups Hot Water']
      },
      {
        stepNumber: 5,
        title: 'Fluff & Serve with Raita',
        instruction: 'Remove from flame and let stand undisturbed 3 minutes. Gently fluff with a fork from the edges inward. Serve on a thali with chilled dahi whisked with cumin powder and chopped cucumber as a quick raita.',
        tips: ['Resting allows steam to redistribute and finish cooking the top grains', 'Each grain should be separate, long, and glistening'],
        flame: 'Ready to Serve',
        utensil: 'Serving Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['1 cup Dahi (whisked with cumin)', 'Fresh Coriander for garnish']
      }
    ]
  },

  // 14. MASOOR DAL TADKA
  {
    id: 'masoor-dal-tadka',
    name: 'Red Masoor Dal Tadka',
    hindiName: 'मसूर दाल तड़का',
    tagline: 'Creamy red lentils simmered with garlic and tomato, finished with a sizzling cumin-chilli tadka',
    moods: ['quick', 'healthy'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 18,
    totalTimeMinutes: 23,
    spiceLevel: 'Mild-Medium',
    servings: '2–3 people',
    utensils: ['Pressure Cooker', 'Small Tadka Pan', 'Ladle'],
    requiredIngredients: ['tomatoes', 'onions', 'ginger_garlic', 'ghee', 'cumin', 'turmeric', 'red_chilli_powder', 'basmati_rice', 'masoor_dal'],
    optionalIngredients: ['fresh_coriander', 'mustard_seeds'],
    story: 'Red masoor dal cooks in minutes and needs no soaking. Quick, protein-rich, deeply comforting — the dal every busy cook should know.',
    chefTip: 'Red masoor dal breaks down beautifully without soaking. Cook directly for 2 whistles and it becomes silky smooth instantly.',
    accentColor: 'var(--color-tomato-coral)',
    badgeText: '⚡ No Soak Needed',
    illustrationType: 'masoor_dal',
    image3d: './assets/3d/dal_tadka_3d.jpg',
    quickSteps: [
      'Rinse red masoor dal; pressure-cook with tomato, haldi, and salt for 2 whistles.',
      'Cook basmati rice separately in a saucepan.',
      'Prepare a fiery tadka of ghee, cumin, dried red chilli and garlic.',
      'Pour crackling tadka over dal and serve immediately with rice.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Pressure-Cook Red Masoor Dal',
        instruction: 'Rinse 1 cup red masoor dal until clear. Place in pressure cooker with 2.5 cups water, 1 chopped tomato, 1/2 tsp haldi, and 1 tsp salt. Cook on medium-high for 2 whistles; allow steam to release naturally.',
        tips: ['Red masoor needs no soaking — it cooks fast and breaks down silky smooth', '2 whistles only — overcooking makes it too thin'],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 360,
        ingredientsUsed: ['1 cup Red Masoor Dal', '2.5 cups Water', '1 Tomato (chopped)', '1/2 tsp Haldi', '1 tsp Salt']
      },
      {
        stepNumber: 2,
        title: 'Sauté Onion-Garlic Masala',
        instruction: 'While dal cooks, heat 1 tbsp ghee in a small pan. Sauté 1 finely chopped onion with 1 tsp ginger-garlic paste until golden. Add 1/2 tsp red chilli powder and cook 1 minute. Stir this masala into the cooked, whisked dal.',
        tips: ['Stirring a base masala into the dal adds body beyond the basic lentil flavor', 'Whisk dal vigorously after opening cooker for a smooth texture'],
        flame: 'Medium Flame',
        utensil: 'Small Pan',
        sceneType: 'temper',
        timerSec: 240,
        ingredientsUsed: ['1 tbsp Desi Ghee', '1 Onion (chopped)', '1 tsp Ginger-Garlic Paste', '1/2 tsp Red Chilli Powder']
      },
      {
        stepNumber: 3,
        title: 'Cook Simple Basmati Rice',
        instruction: 'Wash and cook 1 cup basmati rice in 1.75 cups water with 1/2 tsp ghee and salt. Bring to boil, cover on lowest flame for 10 minutes, then rest 3 minutes off flame.',
        tips: ['The 1:1.75 water ratio guarantees separate, fluffy grains every time', 'Never stir rice during cooking'],
        flame: 'Low Simmer',
        utensil: 'Saucepan with Tight Lid',
        sceneType: 'simmer',
        timerSec: 600,
        ingredientsUsed: ['1 cup Basmati Rice', '1.75 cups Water', '1/2 tsp Desi Ghee']
      },
      {
        stepNumber: 4,
        title: 'Make Sizzling Ghee Tadka',
        instruction: 'Heat 1.5 tbsp Desi Ghee in a small brass tadka pan until smoking hot. Add 1 tsp cumin seeds, 2 whole dried red chillies, and 3 sliced garlic cloves. Fry until garlic turns golden-crisp. Pour instantly over the warm dal with a satisfying hiss!',
        tips: ['The hiss of hot ghee on dal is the sound of perfection', 'Add a pinch of hing (asafoetida) right before pouring for depth'],
        flame: 'High Sizzle Flame',
        utensil: 'Brass Tadka Pan',
        sceneType: 'temper',
        timerSec: 90,
        ingredientsUsed: ['1.5 tbsp Desi Ghee', '1 tsp Jeera', '2 Whole Dried Red Chillies', '3 Garlic Cloves (sliced)']
      },
      {
        stepNumber: 5,
        title: 'Garnish & Serve Hot',
        instruction: 'Garnish dal with fresh coriander leaves and a squeeze of lemon. Fluff basmati rice with a fork and serve on a thali with a generous bowl of the red masoor tadka dal. Pure satisfaction in under 25 minutes.',
        tips: ['A squeeze of lemon over the dal right before eating brightens everything', 'Serve with a small bowl of raw sliced onions on the side'],
        flame: 'Ready to Serve',
        utensil: 'Dinner Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Coriander', 'Lemon Wedge', 'Raw Onion Slices']
      }
    ]
  },

  // 15. BAINGAN BHARTA
  {
    id: 'baingan-bharta-roti',
    name: 'Smoky Baingan Bharta with Rotis',
    hindiName: 'धुआंदार बैंगन भर्ता और रोटी',
    tagline: 'Charred whole aubergine roasted directly over flame, mashed with sautéed onions, tomatoes and cumin',
    moods: ['comfort', 'healthy', 'surprise_me'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    spiceLevel: 'Medium',
    servings: '2–3 people',
    utensils: ['Direct Flame Roasting', 'Kadhai', 'Tawa'],
    requiredIngredients: ['atta', 'onions', 'tomatoes', 'ginger_garlic', 'green_chilli', 'mustard_oil', 'cumin', 'turmeric', 'dhaniya_powder', 'baingan'],
    optionalIngredients: ['fresh_coriander', 'dahi'],
    story: 'No kitchen appliance can replicate the magic of a whole aubergine charred directly over an open flame. That campfire smokiness is irreplaceable.',
    chefTip: 'Char the aubergine until completely black and collapsed on all sides — the deeper the char, the more intense the smoky flavour.',
    accentColor: 'var(--color-lavender-deep)',
    badgeText: '🔥 Open Flame Magic',
    illustrationType: 'baingan_bharta',
    image3d: './assets/3d/baingan_bharta_3d.jpg',
    quickSteps: [
      'Char whole aubergine directly over open gas flame, turning until completely blackened.',
      'Peel under cold water; mash flesh with a fork, retaining smoky strands.',
      'Sauté onions, ginger, green chilli and tomatoes in mustard oil; fold in mashed aubergine.',
      'Cook 5 minutes, season, and serve with fresh rotis.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Char Aubergine Directly Over Open Flame',
        instruction: 'Rub 1 large aubergine (brinjal) with mustard oil. Place directly on the gas burner over medium-high flame. Roast, turning with tongs every 2 minutes, until skin is completely charred black and flesh collapses — about 10 minutes total.',
        tips: ['The aubergine must collapse fully — this means the flesh inside is completely cooked', 'Open a window — the charring creates beautiful smokiness but also some smoke'],
        flame: 'Direct Open Flame',
        utensil: 'Kitchen Tongs',
        sceneType: 'roast',
        timerSec: 600,
        ingredientsUsed: ['1 Large Aubergine / Brinjal', '1 tsp Mustard Oil for rubbing']
      },
      {
        stepNumber: 2,
        title: 'Peel & Mash the Smoky Flesh',
        instruction: 'Allow the charred aubergine to cool slightly. Hold under cold running water to easily peel off the blackened skin completely. Mash the smoky flesh roughly with a fork, retaining some texture and the natural smoky strands.',
        tips: ['Rough mashing preserves the authentic bharta texture — not too smooth', 'Squeeze out any excess bitter water from the flesh'],
        flame: 'Prep (No Flame)',
        utensil: 'Fork & Bowl',
        sceneType: 'knead_roll',
        timerSec: 120,
        ingredientsUsed: ['Charred Aubergine (peeled)']
      },
      {
        stepNumber: 3,
        title: 'Sauté Onion, Ginger & Tomato Base',
        instruction: 'Heat 1.5 tbsp mustard oil in kadhai. Add 1 tsp cumin seeds, then 1 large finely chopped onion, 1 tbsp ginger-garlic paste, and 2 slit green chillies. Sauté 4 minutes until golden. Add 2 chopped tomatoes with 1/2 tsp haldi and 1 tsp dhaniya powder; cook 3 minutes.',
        tips: ['Mustard oil is essential for authentic Punjabi bharta — do not substitute', 'Cook tomatoes until all liquid evaporates and masala is thick'],
        flame: 'Medium Flame',
        utensil: 'Kadhai',
        sceneType: 'temper',
        timerSec: 300,
        ingredientsUsed: ['1.5 tbsp Mustard Oil', '1 tsp Jeera', '1 Large Onion', '1 tbsp Ginger-Garlic Paste', '2 Green Chillies', '2 Tomatoes', '1/2 tsp Haldi']
      },
      {
        stepNumber: 4,
        title: 'Fold in Mashed Aubergine & Season',
        instruction: 'Add the mashed smoky aubergine to the masala. Fold together thoroughly and cook on medium heat for 5 minutes, stirring frequently. Season with salt, 1/4 tsp garam masala. The bharta should be semi-dry, not watery.',
        tips: ['Stir frequently at this stage — the bharta can catch on the base', 'Taste and adjust — bharta loves generous seasoning'],
        flame: 'Medium Flame',
        utensil: 'Kadhai',
        sceneType: 'simmer',
        timerSec: 300,
        ingredientsUsed: ['Mashed Smoky Aubergine', '1/4 tsp Garam Masala', 'Salt to taste']
      },
      {
        stepNumber: 5,
        title: 'Finish with Coriander & Serve',
        instruction: 'Switch off flame. Stir in a generous handful of fresh coriander leaves. Roast soft rotis on a hot tawa with a touch of ghee until charred spots appear. Serve the smoky bharta alongside fresh rotis and raw onion rings.',
        tips: ['Add fresh coriander off the flame to preserve its bright, herby freshness', 'The raw onion contrast with the smoky bharta is iconic'],
        flame: 'Ready to Serve',
        utensil: 'Iron Tawa & Serving Thali',
        sceneType: 'plate',
        timerSec: 180,
        ingredientsUsed: ['Fresh Coriander Leaves', 'Atta Rotis (roasted)', 'Raw Onion Rings']
      }
    ]
  },

  // 16. POHA
  {
    id: 'kanda-batata-poha',
    name: 'Maharashtrian Kanda Batata Poha',
    hindiName: 'कांदा बटाटा पोहा',
    tagline: 'Fluffy flattened rice with golden mustard, curry leaves, potato and onion — a quick wholesome breakfast-dinner',
    moods: ['quick', 'healthy'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeMinutes: 15,
    spiceLevel: 'Mild',
    servings: '2 people',
    utensils: ['Broad Kadhai', 'Strainer'],
    requiredIngredients: ['onions', 'potatoes', 'mustard_seeds', 'curry_leaves', 'turmeric', 'green_chilli', 'mustard_oil', 'poha'],
    optionalIngredients: ['fresh_coriander', 'peas', 'dahi'],
    story: 'The fastest real meal that is not just toast. Poha is humble, but when done right with crisp potato, golden mustard and curry leaves — it is something special.',
    chefTip: 'Rinse the poha under running water for just 30 seconds — it needs to soften but must not become mushy. Squeeze gently to test: it should break with light pressure.',
    accentColor: 'var(--color-butter-yellow)',
    badgeText: '⚡ Ready in 15 Min',
    illustrationType: 'poha',
    image3d: './assets/3d/poha_3d.jpg',
    quickSteps: [
      'Rinse thick poha in a strainer under water for 30 seconds; drain and set aside.',
      'Heat oil; splutter mustard seeds and curry leaves; fry potato dice until golden.',
      'Add onion, chilli and turmeric; cook 2 minutes; fold in softened poha and toss gently.',
      'Season, garnish with coriander and serve with dahi.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Rinse Poha Gently — Do Not Soak',
        instruction: 'Place 2 cups thick poha in a strainer. Run cold water over it for 30 seconds while tossing gently with your fingers. The poha should soften and separate — not turn mushy. Drain completely and set aside.',
        tips: ['30 seconds is enough — longer makes it paste-like and unworkable', 'Press a flake gently: it should break softly without being wet'],
        flame: 'Prep (No Flame)',
        utensil: 'Strainer',
        sceneType: 'whisk',
        timerSec: 60,
        ingredientsUsed: ['2 cups Thick Poha (flattened rice)']
      },
      {
        stepNumber: 2,
        title: 'Fry Potato Dice Until Golden',
        instruction: 'Heat 1.5 tbsp mustard oil in a broad kadhai. Add 1 tsp mustard seeds and wait for them to pop. Add 1 sprig fresh curry leaves and 1 cup small-diced potato. Fry on medium heat 4–5 minutes until potato edges turn golden-crisp.',
        tips: ['Small potato dice fry faster and have more surface area for crispness', 'Let the mustard seeds pop completely before adding curry leaves'],
        flame: 'Medium Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'temper',
        timerSec: 300,
        ingredientsUsed: ['1.5 tbsp Mustard Oil', '1 tsp Mustard Seeds (Rai)', '12 Curry Leaves', '1 cup Diced Potato']
      },
      {
        stepNumber: 3,
        title: 'Sauté Onion & Season with Haldi',
        instruction: 'Add 1 medium finely sliced onion and 2 slit green chillies. Sauté 2 minutes until onion turns translucent. Add 1/2 tsp turmeric, 1 tsp sugar, and 1 tsp salt. Stir well and cook 1 minute.',
        tips: ['The pinch of sugar is the Maharashtrian secret for the balanced, slightly sweet poha', 'Onions should stay crisp-tender, not fully soft'],
        flame: 'Medium Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'simmer',
        timerSec: 120,
        ingredientsUsed: ['1 Onion (sliced)', '2 Green Chillies (slit)', '1/2 tsp Haldi', '1 tsp Sugar', '1 tsp Salt']
      },
      {
        stepNumber: 4,
        title: 'Fold in Poha & Toss Gently',
        instruction: 'Add the rinsed, drained poha to the kadhai. Using two spatulas, fold gently from underneath — do not press or stir vigorously or the flakes will break. Add 1 tbsp lemon juice and toss on low flame for 2 minutes until well combined and heated through.',
        tips: ['Gentle folding is key — poha flakes are delicate and break easily', 'Cook on low heat only — high heat makes poha stick and clump'],
        flame: 'Low Flame',
        utensil: 'Broad Kadhai (Two Spatulas)',
        sceneType: 'simmer',
        timerSec: 120,
        ingredientsUsed: ['Softened Poha', '1 tbsp Fresh Lemon Juice']
      },
      {
        stepNumber: 5,
        title: 'Garnish & Serve Hot',
        instruction: 'Switch off flame. Top with a generous handful of fresh coriander, a squeeze of lime, and optionally grated fresh coconut. Serve hot in deep bowls with chilled dahi and a cup of masala chai.',
        tips: ['Poha must be served immediately — it hardens as it cools', 'Fresh coconut garnish is traditionally Maharashtrian'],
        flame: 'Ready to Serve',
        utensil: 'Serving Bowls',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Coriander', 'Fresh Lime Juice', '1 cup Dahi (chilled)']
      }
    ]
  },

  // 17. KADHI PAKODA
  {
    id: 'kadhi-pakoda-rice',
    name: 'Punjabi Kadhi Pakoda with Rice',
    hindiName: 'कढ़ी पकोड़ा और चावल',
    tagline: 'Tangy yogurt and gram flour curry with crisp besan fritters, finished with a smoky red chilli tadka',
    moods: ['comfort', 'surprise_me'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    totalTimeMinutes: 45,
    spiceLevel: 'Medium-Tangy',
    servings: '3–4 people',
    utensils: ['Deep Kadhai', 'Saucepan', 'Whisking Bowl'],
    requiredIngredients: ['dahi', 'basmati_rice', 'onions', 'green_chilli', 'ginger_garlic', 'mustard_oil', 'cumin', 'turmeric', 'mustard_seeds', 'curry_leaves', 'besan'],
    optionalIngredients: ['fresh_coriander'],
    story: 'The slowest recipe that is worth every minute. Tangy kadhi simmered for 20 minutes deepens into a silky, golden elixir that makes you forget everything.',
    chefTip: 'Simmer kadhi for at least 20 minutes on low heat with continuous gentle stirring — this cooks out the raw besan taste and develops the signature tangy depth.',
    accentColor: 'var(--color-butter-yellow)',
    badgeText: '🍲 Weekend Comfort',
    illustrationType: 'kadhi',
    image3d: './assets/3d/kadhi_3d.jpg',
    quickSteps: [
      'Whisk dahi with besan, haldi, and water into a smooth batter.',
      'Make small besan-onion pakodas in hot oil; drain.',
      'Simmer yogurt curry with tempering for 20 minutes until thickened.',
      'Add pakodas and serve over fluffy rice with a ghee-chilli tadka.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Whisk Smooth Kadhi Base',
        instruction: 'In a large bowl, whisk 2 cups chilled sour dahi vigorously with 3 tbsp besan (gram flour), 1/2 tsp haldi, 1 tsp red chilli powder, and 1/2 tsp salt until completely lump-free. Add 2 cups water and whisk again until silky smooth.',
        tips: ['Lumps of besan will not cook out during simmering — whisk very thoroughly', 'Sour dahi (1-2 day old) makes the best tangy kadhi — fresh dahi is too mild'],
        flame: 'Prep (No Flame)',
        utensil: 'Large Whisking Bowl',
        sceneType: 'whisk',
        timerSec: 120,
        ingredientsUsed: ['2 cups Sour Dahi', '3 tbsp Besan (Gram Flour)', '1/2 tsp Haldi', '1 tsp Red Chilli Powder', '2 cups Water']
      },
      {
        stepNumber: 2,
        title: 'Fry Besan-Onion Pakodas',
        instruction: 'Mix 1 cup besan with 1 sliced onion, 1 green chilli, 1/4 tsp cumin seeds, salt and enough water to make a thick batter. Heat oil for deep-frying; drop small spoonfuls and fry in batches until golden-crisp. Drain on kitchen paper.',
        tips: ['Fry on medium heat for crisp pakodas that hold up in the curry', 'Do not overcrowd — fry in small batches for even crispness'],
        flame: 'Medium Flame (Deep Fry)',
        utensil: 'Deep Kadhai',
        sceneType: 'temper',
        timerSec: 360,
        ingredientsUsed: ['1 cup Besan', '1 Onion (sliced)', '1 Green Chilli', '1/4 tsp Jeera', 'Oil for frying']
      },
      {
        stepNumber: 3,
        title: 'Temper & Simmer Kadhi 20 Minutes',
        instruction: 'Heat 1.5 tbsp mustard oil in a saucepan. Crackle 1 tsp mustard seeds, 1 tsp cumin, 10 curry leaves, and 1/2 tsp hing. Pour in the whisked kadhi mix. Bring to a gentle boil stirring constantly, then simmer on low heat for 20 minutes, stirring every 2–3 minutes.',
        tips: ['20 minutes of simmering transforms the raw besan into velvety, tangy silk', 'Constant stirring prevents the kadhi from sticking and burning at the base'],
        flame: 'Medium then Low Simmer',
        utensil: 'Saucepan',
        sceneType: 'simmer',
        timerSec: 1200,
        ingredientsUsed: ['1.5 tbsp Mustard Oil', '1 tsp Mustard Seeds', '1 tsp Jeera', '10 Curry Leaves', '1/2 tsp Hing', 'Whisked Kadhi Mix']
      },
      {
        stepNumber: 4,
        title: 'Add Pakodas & Cook Rice',
        instruction: 'Gently slide the fried besan pakodas into the simmering kadhi. Let them absorb flavors for 5 minutes on low heat. Simultaneously, cook 1.5 cups basmati rice in a separate saucepan with 2.5 cups water until fluffy.',
        tips: ['The pakodas soften slightly in the curry — perfectly contrasting the tangy kadhi', 'Do not stir too vigorously or the pakodas will break apart'],
        flame: 'Low Simmer',
        utensil: 'Saucepan & Rice Pan',
        sceneType: 'simmer',
        timerSec: 300,
        ingredientsUsed: ['Fried Besan Pakodas', '1.5 cups Basmati Rice (cooking in parallel)']
      },
      {
        stepNumber: 5,
        title: 'Finishing Tadka & Plate Hot',
        instruction: 'Heat 1 tbsp ghee in a small pan; add 1 tsp cumin and 2 whole dried red chillies until they crackle. Pour over the kadhi. Serve steaming hot over fluffy basmati rice, garnished with fresh coriander.',
        tips: ['The finishing ghee-chilli tadka adds the final layer of smoky depth', 'Serve immediately — kadhi thickens considerably as it cools'],
        flame: 'High Sizzle then Serve',
        utensil: 'Tadka Pan & Serving Bowls',
        sceneType: 'plate',
        timerSec: 90,
        ingredientsUsed: ['1 tbsp Desi Ghee', '1 tsp Jeera', '2 Whole Dried Red Chillies', 'Fresh Coriander']
      }
    ]
  },

  // 18. PANEER BUTTER MASALA
  {
    id: 'paneer-butter-masala',
    name: 'Restaurant-Style Paneer Butter Masala',
    hindiName: 'पनीर बटर मसाला',
    tagline: 'Velvety cashew-tomato gravy with golden paneer cubes, dried fenugreek and aromatic garam masala',
    moods: ['comfort', 'surprise_me'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    totalTimeMinutes: 35,
    spiceLevel: 'Mild-Rich',
    servings: '3 people',
    utensils: ['Blender', 'Kadhai', 'Tawa'],
    requiredIngredients: ['paneer', 'tomatoes', 'onions', 'ginger_garlic', 'ghee', 'dahi', 'red_chilli_powder', 'dhaniya_powder', 'garam_masala', 'atta', 'butter'],
    optionalIngredients: ['fresh_coriander', 'kasuri_methi'],
    story: 'The gateway dish that made Indian food famous globally. The secret is the slow-cooked onion-tomato-cashew paste that becomes its luxurious base.',
    chefTip: 'Cook the tomato-onion paste until it is completely dry and the butter separates — this caramelization is what gives it the rich restaurant colour.',
    accentColor: 'var(--color-tomato-coral)',
    badgeText: '🧈 Restaurant Quality',
    illustrationType: 'paneer_butter_masala',
    image3d: './assets/3d/paneer_bhurji_3d.jpg',
    quickSteps: [
      'Blend cooked tomatoes, cashews and onions into a smooth base paste.',
      'Cook paste in butter until oil separates; add cream and spices.',
      'Pan-sear paneer cubes; fold into rich gravy and simmer 5 minutes.',
      'Finish with kasuri methi and serve with hot rotis or naan.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Make Smooth Tomato-Cashew Base',
        instruction: 'Boil 4 large tomatoes and 1 roughly chopped onion in 1 cup water for 10 minutes. Cool and blend with 8 soaked cashews and 1 tbsp ginger-garlic paste into a completely smooth, thick paste. Pass through a strainer for restaurant texture.',
        tips: ['Straining removes all tomato seeds and skin for a silky smooth gravy', 'Soaked cashews add natural creaminess without feeling heavy'],
        flame: 'Medium Flame (Boiling)',
        utensil: 'Saucepan & Blender',
        sceneType: 'boil',
        timerSec: 600,
        ingredientsUsed: ['4 Large Tomatoes', '1 Onion', '8 Cashew Nuts (soaked)', '1 tbsp Ginger-Garlic Paste', '1 cup Water']
      },
      {
        stepNumber: 2,
        title: 'Cook Paste Until Butter Separates',
        instruction: 'Heat 2 tbsp butter + 1 tsp oil in a kadhai. Pour in the strained paste. Add 1 tsp red chilli powder, 1 tsp dhaniya powder, 1/2 tsp cumin powder, and 1 tsp salt. Cook on medium heat for 8 minutes, stirring, until butter begins to separate from the edges.',
        tips: ['The butter separating on the edges signals the masala is fully cooked', 'Cook out all the raw tomato smell before proceeding'],
        flame: 'Medium Flame',
        utensil: 'Kadhai',
        sceneType: 'simmer',
        timerSec: 480,
        ingredientsUsed: ['2 tbsp Butter', '1 tsp Mustard Oil', 'Strained Tomato Paste', '1 tsp Red Chilli Powder', '1 tsp Dhaniya Powder']
      },
      {
        stepNumber: 3,
        title: 'Add Cream & Adjust Consistency',
        instruction: 'Add 1/2 cup warm water or stock to the cooked masala and stir. Then swirl in 2 tbsp fresh dahi or cream. Add 1/2 tsp garam masala and 1 tsp sugar (balances tomato acidity). Simmer gently for 3 minutes until gravy is smooth and glossy.',
        tips: ['The sugar balances the natural acidity of tomatoes in the base', 'Fresh dahi makes it lighter; cream makes it richer — your choice'],
        flame: 'Low-Medium Flame',
        utensil: 'Kadhai',
        sceneType: 'simmer',
        timerSec: 180,
        ingredientsUsed: ['2 tbsp Fresh Dahi / Cream', '1/2 cup Warm Water', '1/2 tsp Garam Masala', '1 tsp Sugar']
      },
      {
        stepNumber: 4,
        title: 'Sear Paneer & Fold into Gravy',
        instruction: 'Cut 250g paneer into cubes. Heat 1 tsp butter in a pan and sear paneer cubes 1–2 minutes per side until lightly golden. Fold seared paneer gently into the simmering gravy. Cook together on low for 4 minutes to absorb the flavors.',
        tips: ['Searing creates a golden crust that holds the paneer intact in the gravy', 'Avoid overcooking paneer — it becomes rubbery and loses its soft bite'],
        flame: 'Medium then Low Flame',
        utensil: 'Non-Stick Pan & Kadhai',
        sceneType: 'simmer',
        timerSec: 240,
        ingredientsUsed: ['250g Malai Paneer (cubed)', '1 tsp Butter (for searing)']
      },
      {
        stepNumber: 5,
        title: 'Finish with Kasuri Methi & Serve',
        instruction: 'Crush 1 tsp kasuri methi between your palms and add to the gravy. Stir once and switch off flame. Serve in a warm bowl, garnish with a swirl of cream and fresh coriander. Pair with hot buttered naan or fluffy rotis from the tawa.',
        tips: ['Kasuri methi between the palms releases its essential oils — do this off heat', 'The cream garnish drizzle replicates the restaurant plating style'],
        flame: 'Ready to Serve',
        utensil: 'Serving Bowl',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['1 tsp Kasuri Methi', '1 tbsp Cream (garnish)', 'Fresh Coriander', 'Naan or Roti']
      }
    ]
  },

  // 19. SAAG PANEER
  {
    id: 'saag-paneer-makki',
    name: 'Punjabi Saag with Makki Roti',
    hindiName: 'पंजाबी साग और मक्की रोटी',
    tagline: 'Slow-cooked mustard greens and spinach simmered with ginger and green chilli, with corn flatbreads and white butter',
    moods: ['comfort', 'healthy', 'surprise_me'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 35,
    totalTimeMinutes: 45,
    spiceLevel: 'Mild-Medium',
    servings: '3 people',
    utensils: ['Pressure Cooker', 'Kadhai', 'Tawa'],
    requiredIngredients: ['spinach', 'onions', 'tomatoes', 'ginger_garlic', 'green_chilli', 'ghee', 'cumin', 'makki_atta'],
    optionalIngredients: ['fresh_coriander', 'dahi'],
    story: 'Winter in Punjab on a plate. The slow-cooked greens develop a sweetness and depth that cannot be hurried — made with the simplest ingredients but maximum love.',
    chefTip: 'Cook the greens until they are completely melded — 25 minutes is not too long. The colour will deepen and the bitterness will mellow completely.',
    accentColor: 'var(--color-herb-deep)',
    badgeText: '🌿 Winter Warmth',
    illustrationType: 'saag',
    image3d: './assets/3d/palak_paneer_3d.jpg',
    quickSteps: [
      'Pressure cook spinach (and mustard greens if available) with ginger and green chilli for 2 whistles.',
      'Roughly mash cooked greens with a wooden mathani (churner).',
      'Bhuna onion-tomato-garlic masala; fold in greens; simmer 15 minutes.',
      'Serve with makki/atta rotis and a dollop of white butter.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Pressure Cook the Greens',
        instruction: 'Chop 400g fresh spinach (and 200g mustard leaves/bathua if available). Place in pressure cooker with 2 slit green chillies, 1 tbsp ginger, 1/2 cup water, and 1/2 tsp salt. Cook on high for 2 whistles. Allow steam to release naturally.',
        tips: ['Palak (spinach) alone is a quick shortcut if sarson saag is unavailable', 'The greens should be completely soft and mushy after pressure cooking'],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 360,
        ingredientsUsed: ['400g Fresh Spinach / Palak', '2 Green Chillies (slit)', '1 tbsp Fresh Ginger', '1/2 cup Water']
      },
      {
        stepNumber: 2,
        title: 'Roughly Mash Cooked Greens',
        instruction: 'Open the cooker. Using a wooden mathani or potato masher, roughly mash the cooked greens directly in the cooker into a coarse, rustic consistency. Do not blend smooth — the rustic texture is traditional and essential.',
        tips: ['Rough mashing over blending is authentic Punjabi saag — keep the texture', 'The greens will look dark and reduced — this is perfect'],
        flame: 'Prep (No Flame)',
        utensil: 'Wooden Mathani / Masher',
        sceneType: 'knead_roll',
        timerSec: 60,
        ingredientsUsed: ['Pressure Cooked Greens']
      },
      {
        stepNumber: 3,
        title: 'Bhuna Onion-Garlic-Tomato Masala',
        instruction: 'Heat 2 tbsp Desi Ghee in a heavy kadhai. Add 1 tsp cumin seeds, then 1 large finely chopped onion and 1 tbsp ginger-garlic paste. Sauté 5 minutes until deep golden. Add 1 chopped tomato; cook 3 minutes until integrated.',
        tips: ['The masala must be very well cooked before the greens go in — do not rush', 'Deep brown colour at this stage creates the final dark, sweet savour'],
        flame: 'Medium Flame',
        utensil: 'Heavy Kadhai',
        sceneType: 'temper',
        timerSec: 480,
        ingredientsUsed: ['2 tbsp Desi Ghee', '1 tsp Jeera', '1 Large Onion', '1 tbsp Ginger-Garlic Paste', '1 Tomato']
      },
      {
        stepNumber: 4,
        title: 'Fold Greens & Simmer Slowly',
        instruction: 'Add the mashed greens to the masala. Stir to combine thoroughly. Simmer on medium-low heat for 15 minutes, stirring every 3 minutes. Add 1 tbsp maize flour (makki atta) or atta to thicken if needed. Season with salt.',
        tips: ['Patient simmering is what makes saag deep, sweet and complex — not a 5 minute job', 'Add a splash of water if it starts sticking'],
        flame: 'Medium-Low Simmer',
        utensil: 'Heavy Kadhai',
        sceneType: 'simmer',
        timerSec: 900,
        ingredientsUsed: ['Mashed Cooked Greens', '1 tbsp Makki Atta (thickener)', 'Salt to taste']
      },
      {
        stepNumber: 5,
        title: 'Serve with Rotis & White Butter',
        instruction: 'Roast thick atta rotis on tawa with ghee. Serve steaming hot saag in shallow bowls with a generous knob of white butter (makhan) melting on top. Garnish with fresh ginger juliennes. This is Punjabi soul food.',
        tips: ['White butter (not salted) melting on hot saag is non-negotiable', 'Thin jaggery on the side balances the savoury greens'],
        flame: 'Ready to Serve',
        utensil: 'Iron Tawa & Serving Bowls',
        sceneType: 'plate',
        timerSec: 180,
        ingredientsUsed: ['Atta Rotis (thick)', 'White Butter / Makhan', 'Fresh Ginger Juliennes']
      }
    ]
  },

  // 20. LEMON RICE (SOUTH INDIAN)
  {
    id: 'lemon-rice-south',
    name: 'South Indian Lemon Rice with Papad',
    hindiName: 'लेमन राइस और पापड़',
    tagline: 'Fluffy rice tossed with turmeric, fresh lemon, crunchy peanuts and a classic mustard-curry leaf tadka',
    moods: ['quick', 'healthy', 'surprise_me'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    totalTimeMinutes: 20,
    spiceLevel: 'Mild-Tangy',
    servings: '2 people',
    utensils: ['Saucepan', 'Kadhai', 'Tongs'],
    requiredIngredients: ['basmati_rice', 'mustard_seeds', 'curry_leaves', 'turmeric', 'green_chilli', 'mustard_oil', 'lemon'],
    optionalIngredients: ['fresh_coriander', 'papad', 'peanuts', 'dahi'],
    story: 'The South Indian answer to leftover rice. When made fresh, the warm turmeric-stained grains glistening with lemon juice are a revelation.',
    chefTip: 'Use day-old rice for the best texture — fresh rice can become sticky when tossed. Add lemon juice only after removing from heat to preserve its bright freshness.',
    accentColor: 'var(--color-butter-yellow)',
    badgeText: '⚡ South Indian Special',
    illustrationType: 'lemon_rice',
    image3d: './assets/3d/veg_pulao_3d.jpg',
    quickSteps: [
      'Cook fluffy basmati rice and cool to room temperature.',
      'Make a hot tadka of mustard seeds, curry leaves, peanuts, dried red chilli in oil.',
      'Pour tadka over rice with turmeric; fold gently.',
      'Add fresh lemon juice, season, and serve with papad.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Cook & Cool Basmati Rice',
        instruction: 'Wash and cook 1.5 cups Basmati rice with 2.5 cups water and 1/2 tsp salt until fluffy. Spread cooked rice on a plate to cool and separate the grains. This prevents clumping when you toss with the tadka.',
        tips: ['Spread rice on a wide plate for quick cooling — clumped hot rice makes soggy lemon rice', 'Each grain should be separate and firm before tossing'],
        flame: 'Medium then Low Flame',
        utensil: 'Saucepan & Wide Plate',
        sceneType: 'simmer',
        timerSec: 600,
        ingredientsUsed: ['1.5 cups Basmati Rice', '2.5 cups Water', '1/2 tsp Salt']
      },
      {
        stepNumber: 2,
        title: 'Make Hot Tadka with Mustard & Peanuts',
        instruction: 'Heat 2 tbsp mustard oil in a kadhai until smoking. Add 1 tsp mustard seeds — wait for them to fully pop. Add 10 fresh curry leaves, 2 dried red chillies, 2 slit green chillies, and 2 tbsp raw peanuts. Fry until peanuts turn golden.',
        tips: ['Peanuts add essential crunch that makes lemon rice texturally interesting', 'Fully popped mustard seeds lose their bitterness and turn nutty'],
        flame: 'Medium-High Flame',
        utensil: 'Kadhai',
        sceneType: 'temper',
        timerSec: 120,
        ingredientsUsed: ['2 tbsp Mustard Oil', '1 tsp Mustard Seeds', '10 Curry Leaves', '2 Dried Red Chillies', '2 Green Chillies', '2 tbsp Raw Peanuts']
      },
      {
        stepNumber: 3,
        title: 'Add Turmeric & Fold in Rice',
        instruction: 'Add 1/2 tsp haldi to the tadka and stir for 10 seconds. Remove pan from flame. Add the cooled rice to the pan. Using two spatulas, gently fold the rice from underneath to coat each grain with the golden turmeric tadka.',
        tips: ['Always remove from flame before adding rice — high heat makes it sticky', 'Fold gently: the goal is coating every grain without breaking them'],
        flame: 'Off Flame (Residual Heat)',
        utensil: 'Kadhai',
        sceneType: 'simmer',
        timerSec: 60,
        ingredientsUsed: ['1/2 tsp Haldi', 'Cooled Basmati Rice']
      },
      {
        stepNumber: 4,
        title: 'Add Fresh Lemon & Season',
        instruction: 'Squeeze juice of 1.5 fresh lemons over the rice (approximately 3 tbsp). Add 1 tsp salt and toss gently once more. Taste and add more lemon if desired — the rice should taste bright and tangy without being overwhelming.',
        tips: ['Add lemon only off the flame — heat turns it bitter', 'Start with 2 tbsp lemon juice and adjust to your taste preference'],
        flame: 'Off Flame',
        utensil: 'Kadhai (Off Flame)',
        sceneType: 'whisk',
        timerSec: 60,
        ingredientsUsed: ['Juice of 1.5 Lemons (~3 tbsp)', '1 tsp Salt']
      },
      {
        stepNumber: 5,
        title: 'Flame-Roast Papad & Serve',
        instruction: 'Flame-roast 2 spiced papads directly over the gas burner using tongs, turning every few seconds until crisp and speckled. Plate lemon rice garnished with fresh coriander and serve hot with crisp papad and cold dahi.',
        tips: ['Papad roasted over flame has a smoky note that pairs perfectly with lemon rice', 'Serve immediately while rice is still warm and fragrant'],
        flame: 'Direct Flame (Papad) + Serve',
        utensil: 'Tongs & Serving Plate',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['2 Spiced Papads', 'Fresh Coriander', '1 cup Dahi']
      }
    ]
  },

  // 21. ALOO GOBI
  {
    id: 'aloo-gobi-roti',
    name: 'Dhaba-Style Aloo Gobi Masala',
    hindiName: 'ढाबा आलू गोभी मसाला',
    tagline: 'Crisp golden potato and cauliflower florets bhunoed with cumin, ajwain and warm spices in a dry masala',
    moods: ['comfort', 'healthy'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    spiceLevel: 'Medium',
    servings: '2–3 people',
    utensils: ['Broad Kadhai with Lid', 'Tawa'],
    requiredIngredients: ['potatoes', 'atta', 'onions', 'tomatoes', 'ginger_garlic', 'mustard_oil', 'cumin', 'turmeric', 'dhaniya_powder', 'red_chilli_powder', 'cauliflower'],
    optionalIngredients: ['fresh_coriander', 'garam_masala'],
    story: 'The classic Indian vegetable combination that hits differently when bhunoed on high heat. Semi-dry, slightly caramelized, and deeply savory.',
    chefTip: 'Cook on medium-high with the lid on briefly then off — this steams the vegetables through while keeping them from going mushy.',
    accentColor: 'var(--color-peach-deep)',
    badgeText: '⚡ Classic Bhuno',
    illustrationType: 'aloo_gobi',
    image3d: './assets/3d/aloo_paratha_3d.jpg',
    quickSteps: [
      'Cut potatoes into cubes and cauliflower into florets.',
      'Bhuno onion-tomato masala in mustard oil with whole cumin.',
      'Add potato and cauliflower; cook covered 10 minutes then uncovered 5 minutes.',
      'Finish with garam masala and fresh coriander; serve with hot rotis.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Prep Vegetables into Even Pieces',
        instruction: 'Peel and cut 2 medium potatoes into 1-inch cubes. Break 300g cauliflower into small even florets. Wash the florets in salted water for 5 minutes; drain. Even pieces ensure everything cooks at the same rate.',
        tips: ['Equal size pieces are critical for uniform cooking', 'Salted water soak removes any insects hiding in cauliflower florets'],
        flame: 'Prep (No Flame)',
        utensil: 'Chopping Board',
        sceneType: 'knead_roll',
        timerSec: 120,
        ingredientsUsed: ['2 Medium Potatoes (cubed)', '300g Cauliflower Florets']
      },
      {
        stepNumber: 2,
        title: 'Bhuno Spiced Masala Base',
        instruction: 'Heat 2 tbsp mustard oil in a broad kadhai. Add 1 tsp cumin seeds, 1/4 tsp ajwain seeds, and 1 dried red chilli. Add 1 large finely chopped onion and sauté 4 minutes until golden. Add 1 tbsp ginger-garlic paste, 2 chopped tomatoes, 1/2 tsp haldi, 1 tsp dhaniya powder, and 1/2 tsp red chilli powder. Bhuno 3 minutes.',
        tips: ['Ajwain seeds add a warm, herbal note that is signature to aloo gobi', 'Cook the masala until all the tomato water evaporates'],
        flame: 'Medium-High Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'temper',
        timerSec: 360,
        ingredientsUsed: ['2 tbsp Mustard Oil', '1 tsp Jeera', '1/4 tsp Ajwain', '1 Onion', '1 tbsp Ginger-Garlic Paste', '2 Tomatoes', '1/2 tsp Haldi']
      },
      {
        stepNumber: 3,
        title: 'Add Vegetables & Cook Covered',
        instruction: 'Add potato cubes first and toss in the masala. Cook 3 minutes, stirring. Then add cauliflower florets and 2 tbsp water. Season with 1 tsp salt. Cover tightly with a lid and cook on medium-low for 10 minutes.',
        tips: ['The lid traps steam that cooks the vegetables through evenly without burning', 'Check and stir once halfway — if it looks dry add 1 tbsp water'],
        flame: 'Medium-Low Flame (Covered)',
        utensil: 'Kadhai with Lid',
        sceneType: 'simmer',
        timerSec: 600,
        ingredientsUsed: ['Potato Cubes', 'Cauliflower Florets', '2 tbsp Water', '1 tsp Salt']
      },
      {
        stepNumber: 4,
        title: 'Uncover & Bhuno on High to Finish',
        instruction: 'Remove lid and increase heat to medium-high. Toss everything together and cook uncovered for 5 minutes, stirring gently. The vegetables should develop golden edges and become semi-dry. Sprinkle 1/2 tsp garam masala.',
        tips: ['This uncovered phase creates the signature dhaba char on the vegetables', 'Do not stir too vigorously — keep the florets intact'],
        flame: 'Medium-High Flame (Uncovered)',
        utensil: 'Broad Kadhai',
        sceneType: 'temper',
        timerSec: 300,
        ingredientsUsed: ['1/2 tsp Garam Masala']
      },
      {
        stepNumber: 5,
        title: 'Garnish & Serve with Rotis',
        instruction: 'Switch off flame. Add a generous handful of chopped fresh coriander and toss once. Roast thin rotis on hot tawa with ghee. Serve aloo gobi masala alongside fresh rotis with sliced raw onions and lime wedges.',
        tips: ['A squeeze of lime over aloo gobi right before eating adds the final brightness', 'Dhaba style means generous coriander and no holding back on the spice'],
        flame: 'Ready to Serve',
        utensil: 'Iron Tawa & Serving Thali',
        sceneType: 'plate',
        timerSec: 180,
        ingredientsUsed: ['Fresh Coriander', 'Atta Rotis', 'Raw Onions', 'Lime Wedges']
      }
    ]
  },

  // 22. CHANA MASALA
  {
    id: 'chana-masala-bhature',
    advancePreparation: 'Soak dry chickpeas overnight before cooking.',
    name: 'Street-Style Chana Masala',
    hindiName: 'चाट वाला छोले मसाला',
    tagline: 'Dark, tangy, spiced chickpeas cooked with dried mango powder, roasted coriander and ginger juliennes',
    moods: ['comfort', 'surprise_me'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    totalTimeMinutes: 35,
    spiceLevel: 'Tangy & Zesty',
    servings: '3–4 people',
    utensils: ['Pressure Cooker', 'Iron Kadhai', 'Tawa'],
    requiredIngredients: ['chana_dal', 'onions', 'tomatoes', 'ginger_garlic', 'green_chilli', 'mustard_oil', 'cumin', 'dhaniya_powder', 'garam_masala', 'atta'],
    optionalIngredients: ['fresh_coriander'],
    story: 'The street food version of chole — tangier, darker, bolder than the restaurant style. The secret is a whole spice masala and amchur added at the end.',
    chefTip: 'Cook the final chana masala on high heat for the last 5 minutes — the high heat bhunos the spices directly onto the chickpeas for a deep, complex flavour.',
    accentColor: 'var(--color-tomato-dark)',
    badgeText: '🌶️ Street Food Bold',
    illustrationType: 'chana_masala',
    image3d: './assets/3d/chole_3d.jpg',
    quickSteps: [
      'Pressure-cook soaked kabuli chana for 4 whistles.',
      'Bhuno onion-ginger-tomato masala in iron kadhai with whole spices.',
      'Add cooked chana with broth; simmer to thicken.',
      'Finish with amchur, chaat masala and ginger juliennes.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Pressure-Cook Soaked Kabuli Chana',
        instruction: 'Drain 1.5 cups overnight-soaked kabuli chana. Place in pressure cooker with 3 cups water, 1 black cardamom, 1 bay leaf, 1/2 tsp haldi, and 1 tsp salt. Cook on medium-high for 4 whistles. Let steam release; beans should be very tender.',
        tips: ['Test: a bean should mash completely with zero resistance', 'Save every drop of the dark cooking broth — it is the base of the gravy'],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 720,
        ingredientsUsed: ['1.5 cups Kabuli Chana (soaked)', '3 cups Water', '1 Black Cardamom', '1 Bay Leaf', '1/2 tsp Haldi']
      },
      {
        stepNumber: 2,
        title: 'Bhuno Onion-Ginger Masala in Iron',
        instruction: 'Heat 2 tbsp mustard oil to smoking in an iron kadhai. Add 1 tsp cumin seeds, 1 large finely chopped onion, 1.5 tbsp ginger-garlic paste, and 2 green chillies. Sauté on medium heat 6 minutes until deep mahogany brown.',
        tips: ['Cooking in iron gives an authentic dark base colour to the masala', 'Patient browning — this step cannot be rushed'],
        flame: 'Medium Flame',
        utensil: 'Iron Kadhai',
        sceneType: 'temper',
        timerSec: 360,
        ingredientsUsed: ['2 tbsp Mustard Oil', '1 tsp Jeera', '1 Large Onion (minced)', '1.5 tbsp Ginger-Garlic Paste', '2 Green Chillies']
      },
      {
        stepNumber: 3,
        title: 'Add Tomatoes & Cook Spiced Masala',
        instruction: 'Add 2 pureed tomatoes, 1.5 tsp dhaniya powder, 1 tsp red chilli powder, 1/2 tsp cumin powder, and 1/2 tsp garam masala. Cook on medium heat for 5 minutes until oil separates at the edges. The masala should be thick and aromatic.',
        tips: ['Oil separation confirms the masala is properly cooked through', 'Deglaze with 2 tbsp of chana broth if sticking'],
        flame: 'Medium Flame',
        utensil: 'Iron Kadhai',
        sceneType: 'simmer',
        timerSec: 300,
        ingredientsUsed: ['2 Tomatoes (pureed)', '1.5 tsp Dhaniya Powder', '1 tsp Red Chilli Powder', '1/2 tsp Garam Masala']
      },
      {
        stepNumber: 4,
        title: 'Add Chana & Simmer to Thick Gravy',
        instruction: 'Add cooked chana along with 1 cup of their cooking broth. Mash 3 tablespoons of chana against the pot to thicken. Simmer on medium-low for 10 minutes. Add 1 tsp amchur (dry mango powder) and 1/2 tsp chaat masala. Adjust salt.',
        tips: ['Amchur at the end (not beginning) preserves its sharp tangy punch', 'The mashed chickpeas naturally thicken the gravy to street-food consistency'],
        flame: 'Medium-Low Simmer',
        utensil: 'Iron Kadhai',
        sceneType: 'simmer',
        timerSec: 600,
        ingredientsUsed: ['Cooked Kabuli Chana', '1 cup Chana Broth', '1 tsp Amchur', '1/2 tsp Chaat Masala']
      },
      {
        stepNumber: 5,
        title: 'Garnish & Plate Street Style',
        instruction: 'Top with fresh ginger juliennes, chopped coriander, sliced green chillies, and a squeeze of lime. Serve in a deep bowl with fresh atta bhature, puri or kulcha from the tawa. Sprinkle extra chaat masala on top.',
        tips: ['Fresh ginger on top is non-negotiable for street-style chana masala', 'Serve with thin raw onion rings and green chutney'],
        flame: 'Ready to Serve',
        utensil: 'Street Food Bowl',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Ginger Juliennes', 'Fresh Coriander', 'Green Chillies', 'Lime Juice', 'Kulcha / Bhatura']
      }
    ]
  },

  // 23. TAWA PANEER
  {
    id: 'tawa-paneer-capsicum',
    name: 'Tawa Paneer with Capsicum & Rotis',
    hindiName: 'तवा पनीर और कैप्सिकम',
    tagline: 'Sizzling paneer and capsicum stir-fried with onions in a dry, smoky spiced masala on a hot iron tawa',
    moods: ['quick', 'comfort'],
    prepTimeMinutes: 8,
    cookTimeMinutes: 12,
    totalTimeMinutes: 20,
    spiceLevel: 'Medium-Spicy',
    servings: '2 people',
    utensils: ['Iron Tawa or Broad Kadhai', 'Rolling Pin'],
    requiredIngredients: ['paneer', 'onions', 'tomatoes', 'ginger_garlic', 'green_chilli', 'ghee', 'cumin', 'dhaniya_powder', 'garam_masala', 'atta', 'capsicum'],
    optionalIngredients: ['fresh_coriander', 'kasuri_methi'],
    story: 'Faster and bolder than a full curry. The iron tawa creates a smoky dry masala that coats every piece of paneer — ready in 20 minutes.',
    chefTip: 'Keep the flame high throughout — this is a bhuno dish, not a simmer. The dry masala should caramelize slightly onto the paneer for the signature tawa flavour.',
    accentColor: 'var(--color-tomato-coral)',
    badgeText: '⚡ Sizzle & Serve',
    illustrationType: 'tawa_paneer',
    image3d: './assets/3d/paneer_bhurji_3d.jpg',
    quickSteps: [
      'Cut paneer and capsicum into cubes; lightly sear paneer on tawa.',
      'Bhuno onion, ginger, tomato masala with dry spices.',
      'Add paneer and capsicum; toss together on high heat 3 minutes.',
      'Finish with kasuri methi and serve with fresh rotis.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Prep & Sear Paneer Cubes',
        instruction: 'Cut 200g paneer into 1-inch cubes. Heat 1 tsp ghee on a broad iron tawa or kadhai on high flame. Sear paneer cubes for 1 minute per side until they develop golden blistered edges. Remove and set aside.',
        tips: ['High flame searing creates a golden crust that holds paneer intact during tossing', 'Do not sear longer — paneer becomes rubbery quickly'],
        flame: 'High Flame',
        utensil: 'Iron Tawa / Broad Kadhai',
        sceneType: 'temper',
        timerSec: 120,
        ingredientsUsed: ['200g Malai Paneer (cubed)', '1 tsp Desi Ghee']
      },
      {
        stepNumber: 2,
        title: 'Bhuno Onion & Tomato Masala',
        instruction: 'On the same hot tawa, heat 1 tbsp ghee. Sauté 1 large sliced onion with 1 tsp cumin seeds, 1 tbsp ginger-garlic paste, and 2 slit green chillies for 3 minutes. Add 1 chopped tomato, 1 tsp dhaniya powder, 1/2 tsp red chilli powder. Bhuno 2 minutes on high.',
        tips: ['High heat bhuno creates the characteristic smoky tawa flavour', 'Keep tossing constantly — the masala bhunos fast on high heat'],
        flame: 'High Flame',
        utensil: 'Iron Tawa',
        sceneType: 'temper',
        timerSec: 300,
        ingredientsUsed: ['1 tbsp Desi Ghee', '1 Large Onion (sliced)', '1 tsp Jeera', '1 tbsp Ginger-Garlic Paste', '1 Tomato', '1 tsp Dhaniya Powder']
      },
      {
        stepNumber: 3,
        title: 'Add Capsicum & Toss on High',
        instruction: 'Add 1 large capsicum (cut into cubes) to the masala. Toss together on high heat for 2 minutes — the capsicum should still have a slight crunch. Season with 1/2 tsp garam masala and 1 tsp salt.',
        tips: ['Capsicum should retain bite — overcooked capsicum turns limp and loses its sweetness', 'High heat tossing creates the signature smoky tawa char'],
        flame: 'High Flame',
        utensil: 'Iron Tawa',
        sceneType: 'temper',
        timerSec: 120,
        ingredientsUsed: ['1 Large Capsicum (cubed)', '1/2 tsp Garam Masala', '1 tsp Salt']
      },
      {
        stepNumber: 4,
        title: 'Fold in Paneer & Final Bhuno',
        instruction: 'Return the seared paneer cubes to the tawa. Toss everything together on high heat for 2 minutes to coat paneer with the spiced masala. Crush 1 tsp kasuri methi between palms and sprinkle over. The dish should be semi-dry.',
        tips: ['The masala should stick to and coat every surface of the paneer', 'Finish with a squeeze of lemon juice for brightness'],
        flame: 'High Flame',
        utensil: 'Iron Tawa',
        sceneType: 'simmer',
        timerSec: 120,
        ingredientsUsed: ['Seared Paneer Cubes', '1 tsp Kasuri Methi (crushed)', 'Lemon Juice']
      },
      {
        stepNumber: 5,
        title: 'Roll Fresh Rotis & Serve Sizzling',
        instruction: 'Roll soft atta rotis and roast on the tawa with ghee until golden spots appear. Serve the sizzling tawa paneer immediately alongside hot rotis, garnished with fresh coriander and lime wedges. Eat straight from the tawa for maximum drama.',
        tips: ['Tawa paneer cools and toughens fast — serve immediately', 'Wrap in rotis for a quick roll — it makes a great street-style meal'],
        flame: 'Ready to Serve',
        utensil: 'Iron Tawa & Thali',
        sceneType: 'plate',
        timerSec: 180,
        ingredientsUsed: ['Atta Rotis (freshly roasted)', 'Fresh Coriander', 'Lime Wedges']
      }
    ]
  },

  // 24. SAMBAR & IDLI (SOUTH INDIAN)
  {
    id: 'sambar-rice-south',
    name: 'South Indian Sambar with Rice',
    hindiName: 'सांभर चावल',
    tagline: 'Tangy tamarind and toor dal stew with vegetables, drumstick and a classic mustard-asafoetida tadka',
    moods: ['healthy', 'comfort', 'surprise_me'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    totalTimeMinutes: 35,
    spiceLevel: 'Mild-Tangy',
    servings: '3 people',
    utensils: ['Pressure Cooker', 'Saucepan', 'Tadka Pan'],
    requiredIngredients: ['toor_dal', 'basmati_rice', 'tomatoes', 'onions', 'mustard_seeds', 'curry_leaves', 'turmeric', 'mustard_oil', 'dhaniya_powder', 'tamarind'],
    optionalIngredients: ['fresh_coriander'],
    story: 'The cornerstone of South Indian home cooking. A properly made sambar with its layers of tamarind, toor dal and fresh vegetable is deeply nourishing.',
    chefTip: 'Boil the tamarind extract separately before adding to the dal — this ensures even distribution of the sour flavour throughout the sambar.',
    accentColor: 'var(--color-tomato-coral)',
    badgeText: '🌿 South Indian Soul',
    illustrationType: 'sambar',
    image3d: './assets/3d/dal_tadka_3d.jpg',
    quickSteps: [
      'Pressure-cook toor dal with haldi and tomatoes until very soft.',
      'Make tamarind water and boil with vegetables and sambar powder.',
      'Combine dal and tamarind base; simmer together 10 minutes.',
      'Pour crackling mustard-curry leaf tadka over sambar; serve with rice.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Pressure-Cook Toor Dal',
        instruction: 'Wash 1 cup toor dal thoroughly. Place in pressure cooker with 2.5 cups water, 1 chopped tomato, 1/2 tsp haldi, and 1 tsp salt. Cook on high for 3 whistles. Open and whisk vigorously with a wire whisk until smooth and creamy.',
        tips: ['Toor dal must be very well cooked — no raw dal taste in the final sambar', 'Whisking creates the characteristic smooth-yet-grainy sambar dal texture'],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 540,
        ingredientsUsed: ['1 cup Toor Dal', '2.5 cups Water', '1 Tomato', '1/2 tsp Haldi', '1 tsp Salt']
      },
      {
        stepNumber: 2,
        title: 'Make Tamarind Base with Vegetables',
        instruction: 'Soak 1 small marble-sized ball of tamarind in 1.5 cups warm water for 5 minutes; squeeze out the pulp. In a saucepan, heat 1 tbsp mustard oil. Sauté 1 chopped onion, 10 curry leaves, and 1 cup mixed vegetables (peas, potato, drumstick pieces). Add tamarind water, 1.5 tsp sambar powder or dhaniya-chilli mix, and 1 tsp salt.',
        tips: ['Real drumstick pieces give sambar its characteristic flavour — use if available', 'Boil the tamarind base for 5 minutes before adding dal'],
        flame: 'Medium Flame',
        utensil: 'Saucepan',
        sceneType: 'simmer',
        timerSec: 360,
        ingredientsUsed: ['Tamarind Water (1.5 cups)', '1 Onion (chopped)', '10 Curry Leaves', '1 cup Mixed Vegetables', '1.5 tsp Dhaniya Powder + Red Chilli (sambar mix)']
      },
      {
        stepNumber: 3,
        title: 'Combine Dal & Tamarind Base',
        instruction: 'Pour the cooked, whisked toor dal into the boiling tamarind-vegetable base. Stir to combine well. Add 1 cup warm water to adjust consistency — sambar should be a medium-thin flowing consistency. Simmer together on medium-low for 10 minutes.',
        tips: ['The combined simmering melds the tangy tamarind with the creamy dal', 'Taste and balance — add more tamarind if not tangy enough'],
        flame: 'Medium-Low Simmer',
        utensil: 'Saucepan',
        sceneType: 'simmer',
        timerSec: 600,
        ingredientsUsed: ['Whisked Cooked Dal', '1 cup Warm Water']
      },
      {
        stepNumber: 4,
        title: 'Make Crackling Mustard Tadka',
        instruction: 'Heat 1.5 tbsp mustard oil in a small tadka pan until smoking. Add 1 tsp mustard seeds, 1/4 tsp hing (asafoetida), 10 curry leaves, and 2 dried red chillies. Wait for the mustard seeds to fully pop and crackle. Pour instantly over the simmering sambar.',
        tips: ['The tadka should sizzle dramatically when poured — this is the signature sambar moment', 'Hing (asafoetida) is essential for authentic South Indian sambar depth'],
        flame: 'High Sizzle Flame',
        utensil: 'Small Tadka Pan',
        sceneType: 'temper',
        timerSec: 60,
        ingredientsUsed: ['1.5 tbsp Mustard Oil', '1 tsp Mustard Seeds', '1/4 tsp Hing', '10 Curry Leaves', '2 Dried Red Chillies']
      },
      {
        stepNumber: 5,
        title: 'Cook Rice & Serve Hot',
        instruction: 'Cook 1.5 cups basmati or sona masuri rice fluffy in parallel. Serve steaming sambar ladled generously over rice in a deep bowl. Garnish with fresh coriander. Pair with crisp papad and coconut chutney if available.',
        tips: ['The sambar to rice ratio should be generous — this is not a side dish, it is the meal', 'A drizzle of raw sesame oil over the final bowl is traditional in South India'],
        flame: 'Ready to Serve',
        utensil: 'Deep Serving Bowls',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['1.5 cups Rice (cooked)', 'Fresh Coriander', 'Papad (optional)']
      }
    ]
  },

  // 25. MIXED VEG CURRY
  {
    id: 'mixed-veg-curry',
    name: 'Mixed Vegetable Curry with Rice',
    hindiName: 'मिक्स सब्ज़ी करी',
    tagline: 'A warming curry of whatever seasonal vegetables you have — potatoes, peas, carrots — in a spiced tomato gravy',
    moods: ['healthy'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    spiceLevel: 'Mild-Medium',
    servings: '3 people',
    utensils: ['Kadhai with Lid', 'Saucepan'],
    requiredIngredients: ['potatoes', 'peas', 'onions', 'tomatoes', 'ginger_garlic', 'mustard_oil', 'cumin', 'turmeric', 'dhaniya_powder', 'garam_masala', 'basmati_rice'],
    optionalIngredients: ['fresh_coriander', 'green_chilli'],
    story: 'The most practical curry in the Indian home kitchen — it uses whatever vegetables are on hand and delivers a complete, balanced meal every time.',
    chefTip: 'Add vegetables in stages based on their cooking time: potatoes first, then carrots, then soft peas and leafy greens last.',
    accentColor: 'var(--color-herb-medium)',
    badgeText: '🥗 Use What You Have',
    illustrationType: 'mixed_veg',
    image3d: './assets/3d/matar_mushroom_3d.jpg',
    quickSteps: [
      'Make a quick onion-tomato masala base with whole spices.',
      'Add potato and carrot first; cook 8 minutes covered.',
      'Add peas and any other soft vegetables; simmer 5 minutes.',
      'Serve with steamed rice and pickle.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Make Quick Onion-Tomato Masala',
        instruction: 'Heat 1.5 tbsp mustard oil in a kadhai. Add 1 tsp cumin seeds. Sauté 1 large diced onion with 1 tbsp ginger-garlic paste for 4 minutes until golden. Add 2 pureed tomatoes, 1/2 tsp haldi, 1 tsp dhaniya powder, 1/2 tsp red chilli powder, and 1 tsp salt. Cook 3 minutes.',
        tips: ['A well-cooked masala base is what elevates mixed veg from plain to memorable', 'Cook until all the tomato water evaporates and masala is thick'],
        flame: 'Medium Flame',
        utensil: 'Kadhai',
        sceneType: 'temper',
        timerSec: 360,
        ingredientsUsed: ['1.5 tbsp Mustard Oil', '1 tsp Jeera', '1 Onion (diced)', '1 tbsp Ginger-Garlic Paste', '2 Tomatoes (pureed)', '1/2 tsp Haldi', '1 tsp Dhaniya Powder']
      },
      {
        stepNumber: 2,
        title: 'Add Potatoes First & Cook Covered',
        instruction: 'Add 2 medium potatoes (cubed) to the masala first. Add 1/2 cup warm water and mix well. Cover kadhai with a lid and cook on medium-low for 8 minutes until potatoes are 80% tender.',
        tips: ['Potatoes take longest — they always go in first', 'The lid traps steam that cooks the dense vegetables through'],
        flame: 'Medium-Low Flame (Covered)',
        utensil: 'Kadhai with Lid',
        sceneType: 'simmer',
        timerSec: 480,
        ingredientsUsed: ['2 Medium Potatoes (cubed)', '1/2 cup Warm Water']
      },
      {
        stepNumber: 3,
        title: 'Add Peas & Remaining Vegetables',
        instruction: 'Remove lid. Add 1 cup green peas and any other soft vegetables like mushrooms, capsicum, or beans. Stir gently, replace lid and cook 5 more minutes until all vegetables are tender but not mushy.',
        tips: ['Peas cook in 5 minutes — they go in last to stay vibrant and sweet', 'The masala should cling to the vegetables — add boiling water only if too dry'],
        flame: 'Medium Flame',
        utensil: 'Kadhai with Lid',
        sceneType: 'simmer',
        timerSec: 300,
        ingredientsUsed: ['1 cup Green Peas', 'Any available vegetables (mushrooms, capsicum, carrots)']
      },
      {
        stepNumber: 4,
        title: 'Finish with Garam Masala',
        instruction: 'Remove lid. Sprinkle 1/2 tsp garam masala over the vegetables. Increase heat briefly and toss gently. Taste and adjust salt. The curry should have a medium consistency — not too dry, not too watery.',
        tips: ['Garam masala added at the end (not beginning) preserves its aromatic punch', 'Adjust water to get the right consistency for your preference'],
        flame: 'Medium Flame',
        utensil: 'Kadhai',
        sceneType: 'simmer',
        timerSec: 60,
        ingredientsUsed: ['1/2 tsp Garam Masala', 'Salt to taste']
      },
      {
        stepNumber: 5,
        title: 'Cook Rice & Serve',
        instruction: 'Cook 1.5 cups basmati rice until fluffy. Serve mixed veg curry alongside steamed rice, garnished with fresh coriander. Pair with a small bowl of dahi and pickle for a complete, balanced meal.',
        tips: ['This curry is even better the next day — the flavors deepen overnight', 'A squeeze of lemon brightens the whole plate'],
        flame: 'Ready to Serve',
        utensil: 'Dinner Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['1.5 cups Basmati Rice (cooked)', 'Fresh Coriander', '1 cup Dahi', 'Pickle']
      }
    ]
  },

  // 26. ANDA BHURJI (EGG)
  {
    id: 'anda-bhurji-pav',
    name: 'Mumbai Anda Bhurji with Pav',
    hindiName: 'मुंबई अंडा भुर्जी और पाव',
    tagline: 'Spicy scrambled eggs with caramelized onions, tomatoes and green chillies — Mumbai street food at home',
    moods: ['quick', 'comfort'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeMinutes: 15,
    spiceLevel: 'Medium-Spicy',
    servings: '2 people',
    utensils: ['Iron Kadhai', 'Tawa'],
    requiredIngredients: ['onions', 'tomatoes', 'ginger_garlic', 'green_chilli', 'mustard_oil', 'cumin', 'turmeric', 'dhaniya_powder', 'eggs', 'pav'],
    optionalIngredients: ['fresh_coriander', 'garam_masala'],
    story: 'The street food that holds Mumbai together at 2am. Spicy scrambled eggs bhunoed in a hot kadhai with crisp onions — a 15-minute wonder.',
    chefTip: 'Beat the eggs lightly with just a fork — do not over-whisk. This creates the texture variation between larger set pieces and silky scrambled bits that makes bhurji special.',
    accentColor: 'var(--color-butter-yellow)',
    badgeText: '⚡ 15 Min Street Food',
    illustrationType: 'anda_bhurji',
    image3d: './assets/3d/paneer_bhurji_3d.jpg',
    quickSteps: [
      'Finely dice onions, tomatoes and green chilli.',
      'Sauté onions until golden in hot kadhai; add ginger, chilli and tomatoes.',
      'Pour lightly beaten eggs over masala; fold constantly on medium heat.',
      'Serve sizzling with buttered pav or fresh bread.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Prep Aromatics & Beat Eggs',
        instruction: 'Finely chop 2 large onions, 2 tomatoes, and 3 green chillies. Lightly beat 4 eggs with a fork — just enough to break the yolks; do not over-whisk. Add salt and 1/4 tsp turmeric to the eggs.',
        tips: ['Finely diced onions cook faster and distribute more evenly', 'Lightly beaten eggs create bhurji texture — over-whisked eggs make an omelette'],
        flame: 'Prep (No Flame)',
        utensil: 'Chopping Board & Bowl',
        sceneType: 'whisk',
        timerSec: 120,
        ingredientsUsed: ['4 Eggs (lightly beaten)', '2 Large Onions (finely diced)', '2 Tomatoes (finely diced)', '3 Green Chillies (finely sliced)', '1/4 tsp Haldi']
      },
      {
        stepNumber: 2,
        title: 'Bhuno Onions Until Golden',
        instruction: 'Heat 1.5 tbsp mustard oil in a heavy iron kadhai until smoking. Add 1 tsp cumin seeds, then the diced onions. Sauté on medium-high heat for 3 minutes until golden. Add 1 tsp ginger-garlic paste and green chillies; sauté 30 seconds.',
        tips: ['Golden, almost caramelized onions are the foundation of bhurji flavour', 'Mustard oil gives authentic Mumbai street bhurji its distinctive taste'],
        flame: 'Medium-High Flame',
        utensil: 'Iron Kadhai',
        sceneType: 'temper',
        timerSec: 180,
        ingredientsUsed: ['1.5 tbsp Mustard Oil', '1 tsp Jeera', '2 Onions', '1 tsp Ginger-Garlic Paste', '3 Green Chillies']
      },
      {
        stepNumber: 3,
        title: 'Add Tomatoes & Cook Down',
        instruction: 'Add the diced tomatoes with 1 tsp dhaniya powder, 1/2 tsp red chilli powder, and 1/4 tsp garam masala. Cook on medium-high for 2 minutes, pressing tomatoes with the spatula until they meld into the masala and liquid evaporates.',
        tips: ['The masala must be quite dry before adding eggs — excess moisture makes watery bhurji', 'Press tomatoes firmly to release their flesh into the masala'],
        flame: 'Medium-High Flame',
        utensil: 'Iron Kadhai',
        sceneType: 'simmer',
        timerSec: 120,
        ingredientsUsed: ['2 Tomatoes', '1 tsp Dhaniya Powder', '1/2 tsp Red Chilli Powder', '1/4 tsp Garam Masala']
      },
      {
        stepNumber: 4,
        title: 'Pour Eggs & Fold Continuously',
        instruction: 'Reduce heat to medium. Pour the lightly beaten eggs evenly over the masala. Using a spatula, fold continuously from the edges inward in circular motions. Keep folding for 2–3 minutes until eggs are just set in large, pillowy, spiced curds.',
        tips: ['Constant folding creates the characteristic large-curd bhurji texture', 'Remove from heat when slightly underdone — residual heat finishes it perfectly'],
        flame: 'Medium Flame',
        utensil: 'Iron Kadhai & Flat Spatula',
        sceneType: 'simmer',
        timerSec: 180,
        ingredientsUsed: ['4 Beaten Eggs with Spices']
      },
      {
        stepNumber: 5,
        title: 'Garnish & Serve with Pav',
        instruction: 'Switch off flame immediately while eggs are still slightly glossy. Sprinkle fresh coriander and a squeeze of lemon juice over the bhurji. Serve sizzling hot with 2 buttered pav (soft rolls) or fresh rotis for the full Mumbai experience.',
        tips: ['Bhurji firms up quickly — serve the moment it comes off flame', 'Butter the pav and briefly toast on the same tawa for the street food touch'],
        flame: 'Ready to Serve',
        utensil: 'Serving Plate',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Coriander', 'Lemon Juice', 'Buttered Pav / Rotis']
      }
    ]
  },

  // 27. JEERA ALOO
  {
    id: 'jeera-aloo-dal',
    name: 'Cumin Potatoes with Dal & Rotis',
    hindiName: 'जीरा आलू और दाल',
    tagline: 'Crispy cumin-spiced potatoes tossed with amchur and fresh coriander — the simplest and most satisfying side',
    moods: ['quick', 'comfort'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 20,
    totalTimeMinutes: 25,
    spiceLevel: 'Mild',
    servings: '2–3 people',
    utensils: ['Broad Kadhai', 'Pressure Cooker', 'Tawa'],
    requiredIngredients: ['potatoes', 'moong_dal', 'atta', 'ghee', 'cumin', 'turmeric', 'dhaniya_powder'],
    optionalIngredients: ['fresh_coriander', 'green_chilli'],
    story: 'The emergency dinner that is never disappointing. Boiled potatoes tossed in crackling cumin and ghee — ready in 25 minutes with dal and rotis.',
    chefTip: 'Boil the potatoes until just tender — not mushy. Cubed potatoes that hold their shape absorb the spices without disintegrating when tossed.',
    accentColor: 'var(--color-butter-yellow)',
    badgeText: '⚡ Emergency Dinner',
    illustrationType: 'jeera_aloo',
    image3d: './assets/3d/aloo_paratha_3d.jpg',
    quickSteps: [
      'Pressure-cook potatoes and cubed potatoes until just tender.',
      'Crackle cumin in ghee; add boiled potato cubes and toss on high.',
      'Season with amchur, dhaniya and fresh coriander.',
      'Make simple moong dal and rotis to serve alongside.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Boil Potatoes Until Just Tender',
        instruction: 'Peel and cube 4 medium potatoes into 1.5-inch pieces. Pressure cook with enough water and 1/2 tsp salt for just 1 whistle — potatoes should be cooked through but still hold their shape firmly when poked.',
        tips: ['1 whistle only — potatoes continue cooking from residual steam after you switch off', 'Firm potatoes crisp up better when tossed in hot ghee'],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 240,
        ingredientsUsed: ['4 Medium Potatoes (cubed)', '1/2 tsp Salt', 'Enough Water to cover']
      },
      {
        stepNumber: 2,
        title: 'Crackle Cumin in Ghee',
        instruction: 'Heat 1.5 tbsp Desi Ghee in a broad kadhai on medium-high until shimmering. Add 1.5 tsp cumin seeds and wait for them to crackle and turn golden-brown — about 20 seconds. Add 1 slit green chilli for a mild kick.',
        tips: ['Golden cumin seeds (not black and burnt) have a nutty, sweet aroma', 'Ghee gives jeera aloo its characteristic rich, comforting flavour'],
        flame: 'Medium-High Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'temper',
        timerSec: 60,
        ingredientsUsed: ['1.5 tbsp Desi Ghee', '1.5 tsp Jeera', '1 Green Chilli (slit)']
      },
      {
        stepNumber: 3,
        title: 'Toss Potatoes on High Heat',
        instruction: 'Add the drained boiled potato cubes to the sizzling cumin ghee. Toss on medium-high heat for 4 minutes, letting the potato edges crisp up slightly. Season with 1/2 tsp haldi, 1 tsp dhaniya powder, 1 tsp amchur, and salt to taste.',
        tips: ['High heat tossing creates a slight golden crust on potato edges', 'Do not stir too frequently — let them sit briefly to develop a crust'],
        flame: 'Medium-High Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'temper',
        timerSec: 240,
        ingredientsUsed: ['Boiled Potato Cubes', '1/2 tsp Haldi', '1 tsp Dhaniya Powder', '1 tsp Amchur', 'Salt to taste']
      },
      {
        stepNumber: 4,
        title: 'Make Quick Moong Dal',
        instruction: 'While potatoes cook, wash 1/2 cup yellow moong dal and pressure cook with 1.5 cups water, 1/4 tsp haldi, and salt for 2 whistles. Whisk smooth, season, and make a quick tadka of cumin and ghee to pour over.',
        tips: ['Moong dal takes only 2 whistles and needs no soaking', 'The simple dal makes this meal nutritionally complete with the potatoes'],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 360,
        ingredientsUsed: ['1/2 cup Yellow Moong Dal', '1.5 cups Water', '1/4 tsp Haldi', '1 tsp Ghee Tadka']
      },
      {
        stepNumber: 5,
        title: 'Garnish & Serve Complete Meal',
        instruction: 'Switch off flame on potatoes. Toss in a generous handful of fresh coriander. Roast soft atta rotis on the tawa with ghee. Serve: a portion of jeera aloo, a bowl of moong dal, fresh rotis, and pickle for a satisfying complete meal.',
        tips: ['Jeera aloo and simple dal is one of the most satisfying everyday Indian meals', 'A squeeze of lime over the aloo before eating is the final touch'],
        flame: 'Ready to Serve',
        utensil: 'Dinner Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Coriander', 'Atta Rotis', 'Lime Wedge', 'Pickle']
      }
    ]
  },

  // 28. DAHI VADA
  {
    id: 'dahi-vada-chaat',
    advancePreparation: 'Soak yellow moong dal for at least 2 hours before preparing the batter.',
    name: 'Soft Dahi Vada Chaat',
    hindiName: 'दही वड़ा चाट',
    tagline: 'Fluffy lentil dumplings soaked in chilled spiced curd with tamarind chutney and roasted cumin',
    moods: ['comfort', 'surprise_me'],
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    totalTimeMinutes: 40,
    spiceLevel: 'Mild with Tangy Kick',
    servings: '3–4 people',
    utensils: ['Kadhai for Frying', 'Whisking Bowl', 'Serving Plate'],
    requiredIngredients: ['moong_dal', 'dahi', 'cumin', 'green_chilli', 'ginger_garlic', 'mustard_oil'],
    optionalIngredients: ['fresh_coriander', 'tamarind'],
    story: 'The festive chaat that works as a weeknight dinner. Pillowy soft vadas dunked in cold spiced curd — cooling, satisfying, and no roti needed.',
    chefTip: 'Soak fried vadas in warm water for 2 minutes before dunking in curd — this removes excess oil and makes them incomparably soft and spongy.',
    accentColor: 'var(--color-butter-yellow)',
    badgeText: '✨ No Roti Needed',
    illustrationType: 'dahi_vada',
    image3d: './assets/3d/khichdi_3d.jpg',
    quickSteps: [
      'Grind soaked moong dal into thick batter; beat with salt and green chilli until fluffy.',
      'Fry small rounds in hot oil until golden; soak briefly in warm water.',
      'Squeeze gently and place in chilled spiced dahi.',
      'Top with tamarind chutney, roasted cumin, and chilli powder.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Grind Dal & Beat Batter Fluffy',
        instruction: 'Soak 1 cup yellow moong dal in water for 2 hours. Drain and grind with 2 green chillies, 1 tsp ginger, and minimal water into a thick, smooth batter. Beat the batter vigorously with a spoon for 3 minutes to incorporate air — this makes light, fluffy vadas.',
        tips: ['Beating air into the batter is the secret to soft, cloud-like vadas', 'The batter should be thick enough that a spoonful holds its shape'],
        flame: 'Prep (No Flame)',
        utensil: 'Grinder & Mixing Bowl',
        sceneType: 'whisk',
        timerSec: 180,
        ingredientsUsed: ['1 cup Yellow Moong Dal (soaked 2 hrs)', '2 Green Chillies', '1 tsp Fresh Ginger', '1 tsp Salt']
      },
      {
        stepNumber: 2,
        title: 'Fry Small Vadas Golden in Batches',
        instruction: 'Heat oil in a deep kadhai to 170°C (medium heat). Drop small rounded spoonfuls of batter gently into the oil. Fry in batches of 4-5, turning occasionally, for 4 minutes until golden all around. Drain on kitchen paper.',
        tips: ['Medium heat is key — high heat browns outside while inside stays raw', 'Wet your spoon before each vada to help it slide off smoothly'],
        flame: 'Medium Flame (Deep Fry)',
        utensil: 'Deep Kadhai',
        sceneType: 'temper',
        timerSec: 360,
        ingredientsUsed: ['Vada Batter', 'Oil for deep frying']
      },
      {
        stepNumber: 3,
        title: 'Soak Vadas in Warm Water',
        instruction: 'While still hot, transfer fried vadas to a bowl of warm salted water. Let them soak for 2 minutes — they will absorb water and swell slightly. Gently press each vada between your palms to squeeze out excess water without breaking them.',
        tips: ['This step removes excess oil and makes the vadas incomparably soft', 'Press very gently — the vadas are fragile when soaked'],
        flame: 'Prep (No Flame)',
        utensil: 'Bowl of Warm Water',
        sceneType: 'whisk',
        timerSec: 120,
        ingredientsUsed: ['Warm Salted Water for soaking', 'Fried Vadas']
      },
      {
        stepNumber: 4,
        title: 'Prepare Chilled Spiced Dahi',
        instruction: 'Whisk 2 cups fresh chilled dahi very smoothly with 2 tsp sugar, 1/2 tsp roasted cumin powder, 1/4 tsp black salt, and 1/4 tsp red chilli powder. The curd should be smooth, slightly sweet, and well-spiced.',
        tips: ['Sweet curd balances the savoury vadas and tangy chutney perfectly', 'Chilled dahi is essential — room temperature curd makes the vadas soggy quickly'],
        flame: 'Chilled / No Flame',
        utensil: 'Whisking Bowl',
        sceneType: 'whisk',
        timerSec: 60,
        ingredientsUsed: ['2 cups Fresh Dahi (chilled)', '2 tsp Sugar', '1/2 tsp Roasted Cumin Powder', '1/4 tsp Black Salt']
      },
      {
        stepNumber: 5,
        title: 'Assemble & Garnish Chaat',
        instruction: 'Place 3-4 water-squeezed vadas in serving plates. Pour generous chilled dahi over them, covering completely. Drizzle with tamarind chutney and green coriander chutney. Sprinkle roasted cumin, red chilli powder, and fresh coriander on top.',
        tips: ['The vadas must be fully covered with dahi to stay soft', 'Assemble just before serving — waiting too long makes vadas soggy'],
        flame: 'Ready to Serve',
        utensil: 'Flat Serving Plate',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Tamarind Chutney', 'Green Coriander Chutney', 'Roasted Cumin Powder', 'Red Chilli Powder', 'Fresh Coriander']
      }
    ]
  },

  // 29. TOMATO RICE
  {
    id: 'tomato-rice-raita',
    name: 'South Indian Tomato Rice (Optional Raita)',
    hindiName: 'टमाटर राइस और बूंदी रायता',
    tagline: 'South Indian style rice cooked with tangy tomatoes, mustard, curry leaves and warming spices',
    moods: ['quick', 'healthy', 'surprise_me'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 20,
    totalTimeMinutes: 25,
    spiceLevel: 'Mild-Tangy',
    servings: '2–3 people',
    utensils: ['Saucepan', 'Whisking Bowl'],
    requiredIngredients: ['basmati_rice', 'tomatoes', 'onions', 'mustard_seeds', 'curry_leaves', 'green_chilli', 'mustard_oil', 'turmeric'],
    optionalIngredients: ['fresh_coriander', 'dahi', 'boondi'],
    story: 'The South Indian answer to leftover tomatoes. Bright red, tangy, warming rice that is infinitely satisfying and requires almost no effort.',
    chefTip: 'Use very ripe, almost overripe tomatoes — the natural sweetness and acidity of ripe tomatoes is what makes tomato rice irresistible.',
    accentColor: 'var(--color-tomato-coral)',
    badgeText: '⚡ One Pan Tangy Rice',
    illustrationType: 'tomato_rice',
    image3d: './assets/3d/veg_pulao_3d.jpg',
    quickSteps: [
      'Crackle mustard seeds and curry leaves in mustard oil; sauté onion and green chilli.',
      'Add pureed tomatoes with haldi and cook until thick.',
      'Add washed rice and hot water; cook on low for 12 minutes.',
      'Serve with chilled boondi raita.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Crackle Mustard & Sauté Aromatics',
        instruction: 'Heat 1.5 tbsp mustard oil in a saucepan with a lid. Add 1 tsp mustard seeds — wait for them to fully pop and crackle. Add 10 curry leaves, 1 large sliced onion, and 2 slit green chillies. Sauté 3 minutes until onion turns golden.',
        tips: ['Fully popped mustard seeds lose their raw bitterness and become nutty and aromatic', 'Curry leaves in mustard oil is the foundation of South Indian rice dishes'],
        flame: 'Medium Flame',
        utensil: 'Saucepan',
        sceneType: 'temper',
        timerSec: 180,
        ingredientsUsed: ['1.5 tbsp Mustard Oil', '1 tsp Mustard Seeds', '10 Curry Leaves', '1 Onion (sliced)', '2 Green Chillies (slit)']
      },
      {
        stepNumber: 2,
        title: 'Add Tomatoes & Cook Thick Masala',
        instruction: 'Add 3 large ripe tomatoes (pureed or finely chopped) with 1/2 tsp haldi, 1 tsp dhaniya powder, 1/2 tsp red chilli powder, and 1 tsp salt. Cook on medium heat for 5 minutes until tomatoes completely break down into a thick, oily masala.',
        tips: ['Cook until all tomato water evaporates and masala is thick and concentrated', 'The colour should be deep red-orange when properly cooked'],
        flame: 'Medium Flame',
        utensil: 'Saucepan',
        sceneType: 'simmer',
        timerSec: 300,
        ingredientsUsed: ['3 Large Ripe Tomatoes (pureed)', '1/2 tsp Haldi', '1 tsp Dhaniya Powder', '1/2 tsp Red Chilli Powder', '1 tsp Salt']
      },
      {
        stepNumber: 3,
        title: 'Add Washed Rice & Water',
        instruction: 'Add 1.5 cups washed and drained Basmati rice to the tomato masala. Stir to coat each grain. Pour 2.5 cups hot water. Bring to a rolling boil, stir once, then cover tightly and reduce to the lowest flame. Cook 12 minutes.',
        tips: ['Hot water is key — adding cold water to hot masala drops temperature and alters cooking', 'Do not lift the lid during the 12 minutes — steam is doing the work'],
        flame: 'High then Lowest Flame Dum',
        utensil: 'Saucepan (Tight Lid)',
        sceneType: 'simmer',
        timerSec: 720,
        ingredientsUsed: ['1.5 cups Basmati Rice (washed)', '2.5 cups Hot Water']
      },
      {
        stepNumber: 4,
        title: 'Make Quick Boondi Raita',
        instruction: 'Whisk 1 cup chilled dahi smooth. Add 2 tbsp boondi (crispy chickpea puffs — store bought), 1/2 tsp roasted cumin powder, a pinch of red chilli powder, 1/4 tsp black salt, and salt to taste. Rest 2 minutes for boondi to soften slightly.',
        tips: ['Boondi raita is the perfect contrast to tangy tomato rice', 'Whisked smooth curd is essential — lumpy curd makes poor raita'],
        flame: 'Chilled / No Flame',
        utensil: 'Whisking Bowl',
        sceneType: 'whisk',
        timerSec: 60,
        ingredientsUsed: ['1 cup Dahi (chilled)', '2 tbsp Boondi', '1/2 tsp Roasted Jeera Powder', '1/4 tsp Black Salt']
      },
      {
        stepNumber: 5,
        title: 'Fluff Rice & Serve Hot',
        instruction: 'Remove lid and gently fluff the tangy tomato rice with a fork. Each grain should be separate and deeply stained red. Serve in wide shallow bowls alongside the chilled boondi raita and a papad for the crunch contrast.',
        tips: ['The bright red-orange of tomato rice should be vibrant, not muddy', 'The cold raita against the hot tangy rice is the whole point'],
        flame: 'Ready to Serve',
        utensil: 'Wide Serving Bowl',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Chilled Boondi Raita', 'Papad (roasted)', 'Fresh Coriander']
      }
    ]
  },

  // 30. SHAHI TUKDA (DESSERT-DINNER)
  {
    id: 'matar-paneer-rice',
    name: 'Matar Paneer with Basmati Rice',
    hindiName: 'मटर पनीर और चावल',
    tagline: 'Sweet green peas and paneer cubes in a rich, lightly spiced tomato-onion gravy with steamed basmati rice',
    moods: ['comfort', 'healthy'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    spiceLevel: 'Mild-Medium',
    servings: '3 people',
    utensils: ['Kadhai', 'Saucepan', 'Blender'],
    requiredIngredients: ['paneer', 'peas', 'tomatoes', 'onions', 'ginger_garlic', 'ghee', 'cumin', 'turmeric', 'dhaniya_powder', 'garam_masala', 'basmati_rice'],
    optionalIngredients: ['fresh_coriander', 'kasuri_methi'],
    story: 'The sweet marriage of soft paneer and bright green peas in a silky gravy — lighter than paneer butter masala but just as satisfying.',
    chefTip: 'Add the peas in the last 5 minutes of cooking — this keeps them bright green, sweet, and slightly firm rather than grey and mushy.',
    accentColor: 'var(--color-herb-medium)',
    badgeText: '🍃 Lightly Spiced Classic',
    illustrationType: 'matar_paneer',
    image3d: './assets/3d/matar_mushroom_3d.jpg',
    quickSteps: [
      'Make a smooth onion-tomato masala base in kadhai.',
      'Add spices; simmer gravy until thick and oily at edges.',
      'Fold in seared paneer cubes and green peas; cook 5 minutes.',
      'Serve with fluffy basmati rice and fresh coriander.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Make Smooth Onion-Tomato Masala',
        instruction: 'Heat 1.5 tbsp ghee in a kadhai. Add 1 tsp cumin seeds, then 1 large finely chopped onion with 1 tbsp ginger-garlic paste. Sauté 5 minutes until deep golden. Add 2 pureed tomatoes and cook 4 minutes until thick and ghee separates at edges.',
        tips: ['The golden onion base is what gives matar paneer its depth and colour', 'Cook until all tomato water evaporates and masala is concentrated'],
        flame: 'Medium Flame',
        utensil: 'Kadhai',
        sceneType: 'temper',
        timerSec: 540,
        ingredientsUsed: ['1.5 tbsp Desi Ghee', '1 tsp Jeera', '1 Large Onion (minced)', '1 tbsp Ginger-Garlic Paste', '2 Tomatoes (pureed)']
      },
      {
        stepNumber: 2,
        title: 'Add Spices & Build the Gravy',
        instruction: 'Add 1 tsp dhaniya powder, 1/2 tsp haldi, 1/2 tsp red chilli powder, and 1 tsp salt to the cooked masala. Stir well and cook 1 minute. Pour in 1 cup warm water and bring to a gentle simmer. Cook 3 minutes until gravy is smooth and aromatic.',
        tips: ['Adding spices to the dry masala before water intensifies their flavour in the oil', 'Adjust water quantity to get the gravy consistency you prefer'],
        flame: 'Medium Flame',
        utensil: 'Kadhai',
        sceneType: 'simmer',
        timerSec: 240,
        ingredientsUsed: ['1 tsp Dhaniya Powder', '1/2 tsp Haldi', '1/2 tsp Red Chilli Powder', '1 cup Warm Water', '1 tsp Salt']
      },
      {
        stepNumber: 3,
        title: 'Sear Paneer Cubes',
        instruction: 'Cut 200g paneer into cubes. Heat 1 tsp ghee in a separate pan on medium-high. Sear paneer cubes 1 minute per side until lightly golden. Transfer to the simmering gravy in the kadhai.',
        tips: ['Seared paneer holds its shape and has a nicer texture than raw paneer in gravy', 'You can skip searing if pressed for time — fold raw paneer directly into the simmering gravy'],
        flame: 'Medium-High Flame',
        utensil: 'Non-Stick Pan',
        sceneType: 'temper',
        timerSec: 120,
        ingredientsUsed: ['200g Malai Paneer (cubed)', '1 tsp Desi Ghee (for searing)']
      },
      {
        stepNumber: 4,
        title: 'Add Peas & Simmer Together',
        instruction: 'Add 1 cup fresh green peas to the gravy with the paneer. Stir gently to combine. Add 1/2 tsp garam masala and 1 tsp crushed kasuri methi. Simmer together on medium-low for 5 minutes until peas are just tender and bright green.',
        tips: ['5 minutes maximum — overcooked peas lose their bright green colour and sweetness', 'Fresh peas are sweeter than frozen — use if available'],
        flame: 'Medium-Low Simmer',
        utensil: 'Kadhai',
        sceneType: 'simmer',
        timerSec: 300,
        ingredientsUsed: ['1 cup Fresh Green Peas', '1/2 tsp Garam Masala', '1 tsp Kasuri Methi (crushed)']
      },
      {
        stepNumber: 5,
        title: 'Cook Rice & Serve Hot',
        instruction: 'Cook 1.5 cups basmati rice until fluffy. Garnish the matar paneer with fresh coriander. Serve alongside steamed basmati rice on a thali with sliced cucumber, lime wedge and pickle. A complete, balanced meal.',
        tips: ['The delicate, slightly sweet gravy pairs beautifully with plain basmati rice', 'Serve with a small bowl of dahi on the side for cooling contrast'],
        flame: 'Ready to Serve',
        utensil: 'Dinner Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['1.5 cups Basmati Rice (fluffy)', 'Fresh Coriander', 'Lime Wedge', '1 cup Dahi']
      }
    ]
  }

];
