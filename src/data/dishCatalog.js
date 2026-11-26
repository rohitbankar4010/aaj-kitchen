import { DISH_CATALOG_EXPANSION } from './dishCatalogExpansion.js';

/**
 * aaj. Dish Catalog (with 3D Asset Bindings & Detailed Culinary Instructions)
 * Curated authentic Indian dinner repertoire tailored for modern households.
 * Features 3D sculptural assets, utensils, availability metadata, and comprehensive step-by-step guidance.
 */

export const DISH_CATALOG = [
  // 1. PANEER BHURJI & PARATHAS
  {
    id: 'paneer-bhurji-paratha',
    name: 'Paneer Bhurji with Crisp Parathas',
    hindiName: 'पनीर भुर्जी और तवा परांठा',
    tagline: 'Silky scrambled malai paneer with sweet caramelized onions, tomatoes & flaky ghee-brushed parathas',
    moods: ['quick', 'comfort'],
    prepTimeMinutes: 8,
    cookTimeMinutes: 12,
    totalTimeMinutes: 20,
    spiceLevel: 'Medium',
    servings: '2–3 people',
    utensils: ['Heavy Kadhai', 'Cast Iron Tawa', 'Rolling Pin & Board'],
    requiredIngredients: ['paneer', 'onions', 'tomatoes', 'green_chilli', 'ginger_garlic', 'atta', 'ghee', 'turmeric', 'cumin', 'garam_masala'],
    optionalIngredients: ['fresh_coriander', 'kasuri_methi'],
    story: 'The ultimate weeknight savior. Crumbled fresh malai paneer melts into tempered cumin and sweet browned onions in under 20 minutes.',
    chefTip: 'Never overcook the paneer—fold it off the flame so it retains its tender, buttery crumb.',
    accentColor: 'var(--color-tomato-coral)',
    badgeText: '⚡ Ready in 20 min',
    illustrationType: 'paneer_bhurji',
    image3d: './assets/3d/paneer_bhurji_3d.jpg',
    quickSteps: [
      'Knead warm wheat flour with a drizzle of ghee into soft dough; roll into layered triangles.',
      'Sauté jeera, chopped onions, ginger-garlic, and green chillies in hot ghee until translucent golden.',
      'Add spiced tomatoes, cook till oil glazes edges, fold in crumbled paneer gently for 2 minutes.',
      'Roast parathas crisp on iron tawa; serve steaming hot with lime wedges.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Knead Soft Dough & Layer Triangles',
        instruction: 'Combine 2 cups Chakki Atta, 1/2 tsp salt, and 1 tsp Desi Ghee in a bowl. Add 3/4 cup warm water gradually to knead a supple dough. Roll into flat rounds, brush with ghee, and fold twice into layered triangle parathas.',
        tips: [
          'Rest dough 5 mins covered under a damp towel for flakier layers',
          'Brush thin ghee film between folds to create crispy steam pockets'
        ],
        flame: 'Prep (No Flame)',
        utensil: 'Wooden Rolling Board & Belan',
        sceneType: 'knead_roll',
        timerSec: 180,
        ingredientsUsed: ['2 cups Chakki Atta', '1 tbsp Desi Ghee', '3/4 cup Warm Water', '1/2 tsp Salt']
      },
      {
        stepNumber: 2,
        title: 'Sauté Aromatics in Fragrant Ghee',
        instruction: 'Heat 1.5 tbsp Desi Ghee in your heavy kadhai over medium flame. Splutter 1 tsp Jeera, then toss in 2 finely diced red onions, 1 tbsp ginger-garlic paste, and 2 sliced green chillies until sweet and translucent golden.',
        tips: [
          'Listen for the gentle rhythmic sizzle of cumin seeds popping',
          'Stir constantly so ginger-garlic browns without sticking to the pan'
        ],
        flame: 'Medium Flame',
        utensil: 'Heavy Bottom Kadhai',
        sceneType: 'temper',
        timerSec: 180,
        ingredientsUsed: ['1.5 tbsp Desi Ghee', '1 tsp Jeera', '2 Red Onions (diced)', '1 tbsp Ginger-Garlic Paste', '2 Green Chillies']
      },
      {
        stepNumber: 3,
        title: 'Simmer Spiced Tomato Reduction',
        instruction: 'Add 2 chopped country tomatoes along with 1/2 tsp Haldi, 1 tsp Dhaniya powder, 1/2 tsp Kashmiri Lal Mirch, and 1 tsp salt. Cook uncovered for 4 minutes until tomatoes soften into a glossy bhuna masala.',
        tips: [
          'Press tomatoes with the back of your ladle to release juices',
          'Watch for a delicate sheen of ghee separating along the rim'
        ],
        flame: 'Medium-Low Flame',
        utensil: 'Heavy Bottom Kadhai',
        sceneType: 'simmer',
        timerSec: 240,
        ingredientsUsed: ['2 Country Tomatoes (chopped)', '1/2 tsp Haldi', '1 tsp Dhaniya Powder', '1/2 tsp Kashmiri Lal Mirch', '1 tsp Salt']
      },
      {
        stepNumber: 4,
        title: 'Fold Fresh Malai Paneer Gently',
        instruction: 'Lower heat or switch off flame. Gently fold 250g crumbled fresh Malai Paneer and 1/2 tsp Garam Masala into the masala. Toss softly for 2 minutes to let the cheese absorb spices while staying silky and tender.',
        tips: [
          'Crucial: Never vigorously sauté paneer—residual heat is plenty',
          'Gently fold in crushed Kasuri Methi between your palms for aroma'
        ],
        flame: 'Low / Residual Heat',
        utensil: 'Heavy Bottom Kadhai',
        sceneType: 'simmer',
        timerSec: 120,
        ingredientsUsed: ['250g Fresh Malai Paneer (crumbled)', '1/2 tsp Garam Masala', '1 tsp Kasuri Methi']
      },
      {
        stepNumber: 5,
        title: 'Roast Crisp Parathas & Plate Hot',
        instruction: 'Heat a heavy cast iron tawa until hot. Roast triangle parathas, flipping when bubbles appear, brushing generously with Desi Ghee, and pressing edges until golden freckles bloom. Serve hot with paneer bhurji and fresh lime wedges!',
        tips: [
          'Press edges with spatula to make layers puff like a balloon',
          'Sprinkle fresh coriander and serve immediately while sizzling'
        ],
        flame: 'Medium-High Flame',
        utensil: 'Cast Iron Tawa & Spatula',
        sceneType: 'plate',
        timerSec: 180,
        ingredientsUsed: ['1 tbsp Desi Ghee (for roasting)', 'Fresh Lime Wedges', 'Fresh Coriander (optional garnish)']
      }
    ]
  },

  // 2. KHICHDI & PAPAD
  {
    id: 'moong-dal-khichdi-ghee',
    name: 'Moong Dal Khichdi with Ghee & Roasted Papad',
    hindiName: 'मूंग दाल खिचड़ी और भुना पापड़',
    tagline: 'Gentle one-pot porridge of short grain rice and split yellow moong, tempered with asafoetida, cumin and golden ghee',
    moods: ['quick', 'healthy', 'comfort'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    totalTimeMinutes: 20,
    spiceLevel: 'Mild & Soothing',
    servings: '2 people',
    utensils: ['Pressure Cooker', 'Tongs for Papad', 'Ladle'],
    requiredIngredients: ['moong_dal', 'basmati_rice', 'ghee', 'cumin', 'turmeric', 'ginger_garlic', 'dahi'],
    optionalIngredients: ['fresh_coriander'],
    story: 'The ayurvedic medicine for the soul. Light, restorative, and ready in 20 minutes without breaking a sweat.',
    chefTip: 'Whisk the khichdi vigorously with a ladle right after opening the cooker to achieve that silky porridge texture.',
    accentColor: 'var(--color-butter-yellow)',
    badgeText: '⚡ 20 Min Reset',
    illustrationType: 'khichdi',
    image3d: './assets/3d/khichdi_3d.jpg',
    quickSteps: [
      'Rinse rice and split moong lentils together; drain.',
      'In pressure cooker, heat ghee; splutter cumin, ginger paste and a pinch of haldi.',
      'Add rice, dal, and water; seal and cook for 3 whistles.',
      'Roast spiced papad over open burner flame; serve with homemade dahi and a spoonful of raw ghee.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Rinse & Drain Rice and Yellow Moong',
        instruction: 'Measure 1/2 cup short-grain or basmati rice and 1/2 cup yellow split Moong Dal into a bowl. Rinse 2–3 times under cool tap water until the runoff is clear, then drain thoroughly.',
        tips: [
          'Gentle washing removes excess surface starch without breaking grains',
          'Soaking for even 5 minutes cuts pressure-cooking time significantly'
        ],
        flame: 'Prep (No Flame)',
        utensil: 'Strainer / Prep Bowl',
        sceneType: 'whisk',
        timerSec: 60,
        ingredientsUsed: ['1/2 cup Basmati / Short Rice', '1/2 cup Yellow Moong Dal']
      },
      {
        stepNumber: 2,
        title: 'Splutter Golden Cumin & Ginger in Ghee',
        instruction: 'Heat 1.5 tbsp pure Desi Ghee in your pressure cooker. Splutter 1 tsp Jeera until aromatic and golden. Stir in 1 tsp freshly grated ginger and 1/2 tsp Haldi, sautéing for 30 seconds.',
        tips: [
          'Desi Ghee blooming the cumin creates the signature comforting aroma',
          'Keep flame medium so the turmeric powder does not scorch'
        ],
        flame: 'Medium Flame',
        utensil: 'Hawkins / Prestige Pressure Cooker',
        sceneType: 'temper',
        timerSec: 60,
        ingredientsUsed: ['1.5 tbsp Desi Ghee', '1 tsp Jeera', '1 tsp Grated Ginger', '1/2 tsp Haldi']
      },
      {
        stepNumber: 3,
        title: 'Pressure Cook on High for 3 Whistles',
        instruction: 'Add the drained rice and dal to the cooker. Pour in 3.5 cups of warm water and 1 tsp rock salt. Lock the cooker lid tightly. Cook on medium-high heat for 3 whistles, then switch off flame and allow steam to subside naturally.',
        tips: [
          '3.5 cups of water guarantees a luscious, soul-soothing porridge consistency',
          'Do not force open the whistle; let the internal pressure settle gently'
        ],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker (Sealed)',
        sceneType: 'boil',
        timerSec: 600,
        ingredientsUsed: ['3.5 cups Warm Water', '1 tsp Rock Salt']
      },
      {
        stepNumber: 4,
        title: 'Whisk Vigorously with Round Ladle',
        instruction: 'Unlock the cooker lid. The grains will be pillowy soft. Take a round ladle and whisk vigorously in a circular motion for 60 seconds to release natural starches into a velvety Ayurvedic texture.',
        tips: [
          'Whisking binds the lentils and rice starches into pure silk',
          'Add 1/4 cup boiling water if you prefer a looser soup consistency'
        ],
        flame: 'Off Flame',
        utensil: 'Deep Ladle',
        sceneType: 'whisk',
        timerSec: 60,
        ingredientsUsed: ['1 extra tbsp Desi Ghee (optional finish)']
      },
      {
        stepNumber: 5,
        title: 'Flame-Roast Papad & Crown with Ghee',
        instruction: 'Using tongs, flame-roast spiced papad directly over low burner heat for 10 seconds per side until crispy and speckled. Ladle steaming khichdi into bowls, crown with a dollop of raw Desi Ghee, and serve with cold dahi!',
        tips: [
          'Turn papad every 3 seconds over the open flame so it blisters evenly',
          'Pair with chilled dahi dusted with roasted jeera powder'
        ],
        flame: 'Low Open Flame',
        utensil: 'Kitchen Tongs & Serving Bowls',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['2 Spiced Papads', '1 bowl Fresh Dahi', '1 tbsp Desi Ghee']
      }
    ]
  },

  // 3. METHI THEPLA WITH SPICED DAHI
  {
    id: 'methi-thepla-dahi',
    name: 'Gujarati Methi Thepla with Spiced Dahi',
    hindiName: 'मेथी थेपला और तड़का दही',
    tagline: 'Fragrant golden flatbreads spiced with fresh fenugreek, ajwain and sesame, paired with chilled roasted-cumin curd',
    moods: ['quick', 'healthy'],
    prepTimeMinutes: 8,
    cookTimeMinutes: 12,
    totalTimeMinutes: 20,
    spiceLevel: 'Mild',
    servings: '2 people',
    utensils: ['Rolling Pin', 'Iron Tawa', 'Whisking Bowl'],
    requiredIngredients: ['atta', 'turmeric', 'red_chilli_powder', 'dhaniya_powder', 'dahi', 'mustard_oil'],
    optionalIngredients: ['fresh_coriander'],
    story: 'Warm, rustic and travel-tested. Thin fenugreek-infused rotis that stay impossibly soft and pair heavenly with chilled dahi.',
    chefTip: 'Knead the dough with a spoonful of fresh dahi to keep the theplas feather-soft for hours.',
    accentColor: 'var(--color-peach-deep)',
    badgeText: '🌿 Light & Travel-Ready',
    illustrationType: 'thepla',
    image3d: './assets/3d/thepla_3d.jpg',
    quickSteps: [
      'Chop fenugreek leaves fine; rub into wheat flour with ajwain, turmeric, and 2 spoons of curd.',
      'Roll into delicate thin circles on your wooden board.',
      'Roast quickly on medium-high tawa with drops of mustard oil until speckled with golden freckles.',
      'Whisk curd with roasted jeera powder, black salt, and a sprig of fresh coriander.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Rub Fenugreek & Curd into Flour',
        instruction: 'In a mixing parat, combine 2 cups Chakki Atta with 1/2 cup finely chopped fenugreek (or 3 tbsp crushed kasuri methi), 1/2 tsp haldi, 1 tsp chilli powder, 1/2 tsp ajwain, and 2 tbsp fresh dahi. Rub together between your palms.',
        tips: [
          'Crushing ajwain between palms releases its warm herbal oils',
          'The lactic acid in curd breaks down gluten for melt-in-mouth softness'
        ],
        flame: 'Prep (No Flame)',
        utensil: 'Mixing Bowl / Parat',
        sceneType: 'knead_roll',
        timerSec: 120,
        ingredientsUsed: ['2 cups Chakki Atta', '3 tbsp Kasuri Methi / Fresh Fenugreek', '2 tbsp Fresh Dahi', '1/2 tsp Haldi', '1/2 tsp Ajwain']
      },
      {
        stepNumber: 2,
        title: 'Roll Paper-Thin Circles on Chakla',
        instruction: 'Add warm water in small increments to knead a soft, non-sticky dough. Divide into 6 golf-ball sized rounds. Dust lightly with dry flour and roll out paper-thin on your wooden board.',
        tips: [
          'Authentic Gujarati theplas are rolled much thinner than regular rotis',
          'Roll from center outward with gentle, uniform pressure'
        ],
        flame: 'Prep (No Flame)',
        utensil: 'Chakla & Belan',
        sceneType: 'knead_roll',
        timerSec: 180,
        ingredientsUsed: ['Dry Atta (for dusting)', 'Warm Water (as needed)']
      },
      {
        stepNumber: 3,
        title: 'Flash-Roast on Hot Tawa with Oil',
        instruction: 'Heat your cast iron tawa until very hot. Place rolled thepla on tawa; flip after 20 seconds as tiny bubbles rise. Drizzle drops of mustard oil or ghee and press gently with a cloth until golden speckles appear.',
        tips: [
          'Roast quickly on medium-high heat so moisture stays trapped inside',
          'Overcooking on low flame will turn the thepla dry and cracker-like'
        ],
        flame: 'Medium-High Flame',
        utensil: 'Cast Iron Tawa',
        sceneType: 'roast',
        timerSec: 120,
        ingredientsUsed: ['2 tbsp Kachi Ghani Mustard Oil / Ghee']
      },
      {
        stepNumber: 4,
        title: 'Whisk Chilled Roasted-Jeera Curd',
        instruction: 'In an earthen bowl, vigorously whisk 1 cup chilled fresh dahi with 1/2 tsp roasted jeera powder, 1/4 tsp black salt, and a pinch of Kashmiri chilli powder until silky smooth.',
        tips: [
          'Freshly roast cumin seeds on a dry pan for 60 seconds before crushing',
          'Black salt provides the quintessential chaat-house savory depth'
        ],
        flame: 'Chilled / No Flame',
        utensil: 'Earthen Whisking Bowl',
        sceneType: 'whisk',
        timerSec: 60,
        ingredientsUsed: ['1 cup Fresh Dahi (chilled)', '1/2 tsp Roasted Jeera Powder', '1/4 tsp Black Salt']
      },
      {
        stepNumber: 5,
        title: 'Stack Warm Theplas & Serve with Dahi',
        instruction: 'Stack the warm, pliable theplas wrapped in a kitchen napkin to keep them steaming soft. Plate alongside the bowl of chilled spiced curd and your favorite spicy green mango pickle.',
        tips: [
          'Stacking theplas while hot allows steam to soften their crust',
          'Garnish with a sprig of fresh coriander'
        ],
        flame: 'Ready to Serve',
        utensil: 'Dinner Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Coriander Sprig', 'Mango / Lemon Pickle']
      }
    ]
  },

  // 4. DAL TADKA & JEERA RICE
  {
    id: 'dal-tadka-jeera-rice',
    name: 'Dhaba Dal Tadka with Jeera Rice',
    hindiName: 'दाल तड़का और जीरा राइस',
    tagline: 'Golden slow-whipped yellow lentils crowned with sizzling ghee, smoked cumin & whole Kashmiri chillies',
    moods: ['quick', 'comfort', 'healthy'],
    prepTimeMinutes: 7,
    cookTimeMinutes: 15,
    totalTimeMinutes: 22,
    spiceLevel: 'Medium',
    servings: '2–3 people',
    utensils: ['Pressure Cooker', 'Brass Tadka Pan', 'Saucepan'],
    requiredIngredients: ['toor_dal', 'moong_dal', 'basmati_rice', 'tomatoes', 'ginger_garlic', 'ghee', 'cumin', 'turmeric', 'red_chilli_powder'],
    optionalIngredients: ['fresh_coriander', 'kasuri_methi'],
    story: 'Pure comfort when you need an uncomplicated, nourishing plate that brings calm to a busy evening.',
    chefTip: 'Pour the boiling ghee tadka into the dal with the lid on for 60 seconds to trap the smoky aromatics.',
    accentColor: 'var(--color-apricot)',
    badgeText: '🍲 Soul Warming',
    illustrationType: 'dal_tadka',
    image3d: './assets/3d/dal_tadka_3d.jpg',
    quickSteps: [
      'Pressure-cook washed toor and moong lentils with haldi, salt and tomato for 3 whistles.',
      'Simmer fragrant basmati rice with toasted cumin seeds and ghee until fluffy.',
      'In a brass tadka pan, heat pure ghee; crackle cumin, garlic slivers and dried red chillies.',
      'Whisk lentils smooth, pour crackling tadka over top with a hiss, and serve immediately.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Pressure-Cook Toor & Moong Lentils',
        instruction: 'Combine 1/2 cup Toor dal and 1/4 cup yellow Moong dal; rinse thoroughly. Place in pressure cooker with 2.5 cups water, 1 chopped tomato, 1/2 tsp Haldi, and 1 tsp salt. Lock lid and cook on high flame for 3 whistles.',
        tips: [
          'Blending toor dal with moong dal creates both rich body and velvety creaminess',
          'Cooking the tomato directly inside tenderizes the skins completely'
        ],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 540,
        ingredientsUsed: ['1/2 cup Toor Dal', '1/4 cup Moong Dal', '1 Country Tomato', '1/2 tsp Haldi', '1 tsp Salt']
      },
      {
        stepNumber: 2,
        title: 'Simmer Cumin-Infused Basmati Rice',
        instruction: 'In a saucepan, heat 1 tsp Desi Ghee and splutter 1 tsp Jeera. Add 1 cup drained Basmati rice and 2 cups boiling water with a pinch of salt. Cover tightly and simmer on low flame for 10 minutes until grains are fluffy.',
        tips: [
          'Toast the raw rice grains in ghee for 60 seconds before adding water',
          'Let rice rest undisturbed off heat for 3 minutes before fluffing with a fork'
        ],
        flame: 'Low Flame Simmer',
        utensil: 'Saucepan with Tight Lid',
        sceneType: 'simmer',
        timerSec: 600,
        ingredientsUsed: ['1 cup Basmati Rice', '1 tsp Jeera', '1 tsp Desi Ghee', '2 cups Water']
      },
      {
        stepNumber: 3,
        title: 'Sizzle Brass Ghee Tadka with Chillies',
        instruction: 'In a brass tadka pan, heat 2 tbsp pure Desi Ghee until smoking hot. Splutter 1 tsp Jeera, 4 thinly sliced garlic cloves, 1 chopped green chilli, and 2 whole dried Kashmiri red chillies. Sizzle until garlic is crisp golden brown.',
        tips: [
          'Brass tadka pans retain blazing heat to blister spices instantly',
          'Add a pinch of hing (asafoetida) and 1/2 tsp red chilli powder at the very end'
        ],
        flame: 'High Sizzle Flame',
        utensil: 'Brass Tadka Pan',
        sceneType: 'temper',
        timerSec: 120,
        ingredientsUsed: ['2 tbsp Pure Desi Ghee', '1 tsp Jeera', '4 Garlic Cloves (sliced)', '2 Whole Dried Chillies']
      },
      {
        stepNumber: 4,
        title: 'Whisk Lentils & Trap the Sizzling Tadka',
        instruction: 'Whisk cooked lentils smooth with a wire whisk. Pour the crackling, sputtering ghee tadka straight into the lentils with an audible hiss, immediately clamping the pot lid shut for 60 seconds to trap smoky aromas!',
        tips: [
          'Dhaba secret: Trapping the boiling ghee vapor infuses deep smoke flavor',
          'Stir through gently after 1 minute so the golden ghee streaks through'
        ],
        flame: 'Off Flame (Lid Clamped)',
        utensil: 'Cooker / Serving Handi',
        sceneType: 'temper',
        timerSec: 60,
        ingredientsUsed: ['Smoky Ghee Tadka']
      },
      {
        stepNumber: 5,
        title: 'Plate Hot with Ghee Streaks & Jeera Rice',
        instruction: 'Fluff cumin rice onto wide shallow plates. Ladle steaming dal tadka generously alongside, garnishing with fresh coriander leaves and a final drizzle of melted ghee.',
        tips: [
          'Serve with lemon wedges and crisp onion rings',
          'Enjoy steaming hot straight from the flame'
        ],
        flame: 'Ready to Feast',
        utensil: 'Dinner Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Coriander Leaves', 'Lime Wedge']
      }
    ]
  },

  // 5. MATAR MUSHROOM MASALA
  {
    id: 'matar-mushroom-phulka',
    name: 'Matar Mushroom Masala with Phulkas',
    hindiName: 'मटर मशरूम और गरमा-गरम फुल्के',
    tagline: 'Plump button mushrooms and sweet tender peas simmered in a luscious roasted onion-tomato bhuna gravy',
    moods: ['quick', 'healthy', 'comfort'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 14,
    totalTimeMinutes: 24,
    spiceLevel: 'Mild-Medium',
    servings: '2 people',
    utensils: ['Broad Kadhai', 'Roti Chimta', 'Tawa'],
    requiredIngredients: ['mushrooms', 'peas', 'onions', 'tomatoes', 'ginger_garlic', 'atta', 'turmeric', 'dhaniya_powder', 'garam_masala', 'mustard_oil'],
    optionalIngredients: ['fresh_coriander', 'kasuri_methi'],
    story: 'Earthy, juicy mushrooms soak up the warm cinnamon and coriander gravy while phulkas puff balloon-like over the flame.',
    chefTip: 'Sear mushrooms on high heat first without salt so they caramelize instead of stewing in their juices.',
    accentColor: 'var(--color-herb-medium)',
    badgeText: '🥗 Balanced & Light',
    illustrationType: 'matar_mushroom',
    image3d: './assets/3d/matar_mushroom_3d.jpg',
    quickSteps: [
      'Flash-sear quartered button mushrooms in a hot pan; set aside with their savory juices.',
      'Bhuna onion-ginger-garlic paste slowly in mustard oil until rich mahogany; add spiced tomato purée.',
      'Tip in sweet green peas and mushrooms; simmer with warm water for 6 minutes.',
      'Puff wholewheat phulkas directly on flame, brush with ghee, and plate.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Flash-Sear Button Mushrooms on High Flame',
        instruction: 'Wipe clean and quarter 200g button mushrooms. Heat 1 tbsp mustard oil in your kadhai until smoking hot. Flash-sear mushrooms on high heat for 3 minutes without adding salt until golden caramelized; set aside.',
        tips: [
          'Sear on high without salt so mushrooms brown instead of stewing in water',
          'Reserve any savory fond juices released in the bowl'
        ],
        flame: 'High Sear Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'temper',
        timerSec: 180,
        ingredientsUsed: ['200g Fresh Button Mushrooms', '1 tbsp Mustard Oil']
      },
      {
        stepNumber: 2,
        title: 'Slow Bhuna Onion-Ginger Paste Mahogany',
        instruction: 'In the same kadhai, add 1 tbsp mustard oil. Sauté finely minced onions and ginger-garlic paste over medium heat for 4 minutes until rich golden mahogany. Stir in tomato purée with haldi, dhaniya, and chilli powder.',
        tips: [
          'Bhuna means browning aromatics patiently until natural sugars caramelize',
          'Cook tomato paste until droplets of mustard oil shimmer on the surface'
        ],
        flame: 'Medium Flame',
        utensil: 'Broad Kadhai',
        sceneType: 'simmer',
        timerSec: 240,
        ingredientsUsed: ['2 Red Onions (minced)', '1 tbsp Ginger-Garlic', '2 Tomatoes (pureed)', '1 tsp Dhaniya Powder', '1/2 tsp Haldi']
      },
      {
        stepNumber: 3,
        title: 'Simmer Sweet Green Peas & Mushrooms',
        instruction: 'Tip in 1 cup sweet green peas and the seared mushrooms with their savory juices. Pour in 1/2 cup warm water and 1 tsp salt. Cover with lid and simmer on medium-low for 6 minutes until peas are tender.',
        tips: [
          'Sweet peas balance the earthy depth of browned mushrooms',
          'Sprinkle 1/2 tsp Garam Masala and crushed Kasuri Methi 1 minute before finishing'
        ],
        flame: 'Medium-Low Simmer',
        utensil: 'Covered Kadhai',
        sceneType: 'simmer',
        timerSec: 360,
        ingredientsUsed: ['1 cup Green Peas', '1/2 cup Warm Water', '1/2 tsp Garam Masala', '1 tsp Kasuri Methi']
      },
      {
        stepNumber: 4,
        title: 'Puff Wholewheat Phulkas on Open Flame',
        instruction: 'Roll wholewheat dough into thin discs. Place on hot tawa for 20 seconds, flip once, then transfer directly onto an open flame using chimta tongs. Watch the phulka puff completely balloon-like in 5 seconds!',
        tips: [
          'Steam pressure inside the disc instantly puffs both layers apart',
          'Brush immediately with golden desi ghee while piping hot'
        ],
        flame: 'Open Burner Flame',
        utensil: 'Tawa & Roti Chimta',
        sceneType: 'roast',
        timerSec: 120,
        ingredientsUsed: ['Wholewheat Dough Balls', 'Desi Ghee (for brushing)']
      },
      {
        stepNumber: 5,
        title: 'Garnish with Kasuri Methi & Serve Hot',
        instruction: 'Ladle the rich, fragrant matar mushroom masala into warm bowls. Garnish with chopped fresh coriander leaves and serve steaming alongside the balloon-puffed phulkas.',
        tips: [
          'The rich tomato-onion gravy clings beautifully to the soft phulkas',
          'Serve with lemon wedges and crisp cucumber slices'
        ],
        flame: 'Ready to Feast',
        utensil: 'Serving Bowls & Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Coriander Leaves', 'Lime Wedges']
      }
    ]
  },

  // 6. PALAK PANEER WITH MULTIGRAIN ROTI
  {
    id: 'palak-paneer-multigrain',
    name: 'Velvety Palak Paneer & Multigrain Rotis',
    hindiName: 'पालक पनीर और मल्टीग्रेन रोटी',
    tagline: 'Blanched deep emerald spinach purée infused with roasted garlic, tender paneer cubes and rustic whole grains',
    moods: ['healthy', 'comfort'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    spiceLevel: 'Mild',
    servings: '2–3 people',
    utensils: ['Saucepan for Blanching', 'Kadhai', 'Tawa'],
    requiredIngredients: ['spinach', 'paneer', 'ginger_garlic', 'green_chilli', 'onions', 'tomatoes', 'atta', 'ghee', 'cumin', 'garam_masala'],
    optionalIngredients: ['kasuri_methi'],
    story: 'Rich in iron and high in dairy protein. Vibrant green, silky smooth, and deeply restorative after a long day.',
    chefTip: 'Ice-bath the spinach leaves immediately after 60-second blanching to preserve the radiant jewel-green color.',
    accentColor: 'var(--color-herb-deep)',
    badgeText: '🌿 High Protein & Fiber',
    illustrationType: 'palak_paneer',
    image3d: './assets/3d/palak_paneer_3d.jpg',
    quickSteps: [
      'Blanch washed spinach leaves for 1 minute; plunge into ice water and blend with green chillies.',
      'Pan-sear paneer cubes in half a teaspoon of ghee until edges turn golden.',
      'Temper cumin and fine minced garlic in ghee, simmer the vibrant green sauce for 4 minutes.',
      'Fold in warm paneer cubes with a whisper of kasuri methi; pair with hot multigrain rotis.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Quick Blanch Spinach & Ice-Bath',
        instruction: 'Drop 250g washed tender spinach leaves into boiling water for exactly 60 seconds. Plunge immediately into a bowl of ice-cold water to halt cooking, then blend with 2 green chillies into an emerald green purée.',
        tips: [
          'Thermal shock preserves chlorophyll for a vibrant jewel-green color',
          'Do not over-blend into baby food—retain a silky rustic texture'
        ],
        flame: 'Boiling Flame',
        utensil: 'Saucepan & Blender',
        sceneType: 'boil',
        timerSec: 120,
        ingredientsUsed: ['250g Fresh Palak (Spinach)', '2 Green Chillies', 'Ice Water Bath']
      },
      {
        stepNumber: 2,
        title: 'Golden-Sear Malai Paneer Cubes in Ghee',
        instruction: 'Cut 200g Malai Paneer into bite-sized cubes. Heat 1 tsp Desi Ghee in your pan and gently sear paneer cubes for 2 minutes until edges develop delicate golden crusts; transfer to a plate.',
        tips: [
          'Searing seals the exterior so cubes hold their shape in the velvety sauce',
          'Soak seared cubes in warm salted water if cooking ahead to keep them extra soft'
        ],
        flame: 'Medium Flame',
        utensil: 'Non-Stick / Cast Iron Pan',
        sceneType: 'temper',
        timerSec: 120,
        ingredientsUsed: ['200g Malai Paneer (cubed)', '1 tsp Desi Ghee']
      },
      {
        stepNumber: 3,
        title: 'Temper Sliced Garlic & Simmer Emerald Gravy',
        instruction: 'In your kadhai, heat 1.5 tbsp Desi Ghee. Splutter 1 tsp Jeera and 5 thinly sliced garlic cloves until fragrant golden. Stir in 1 small grated onion and sauté, then pour in the vibrant green spinach purée with 1/2 tsp salt.',
        tips: [
          'Slow-toasted garlic slivers provide the signature sweet garlic aroma',
          'Simmer uncovered for 4 minutes so the green gravy thickens naturally'
        ],
        flame: 'Medium-Low Flame',
        utensil: 'Deep Kadhai',
        sceneType: 'simmer',
        timerSec: 240,
        ingredientsUsed: ['1.5 tbsp Desi Ghee', '1 tsp Jeera', '5 Garlic Cloves (sliced)', 'Spinach Purée', '1/2 tsp Salt']
      },
      {
        stepNumber: 4,
        title: 'Fold Paneer & Swirl Cream or Butter',
        instruction: 'Fold the seared paneer cubes gently into the bubbling green gravy. Add 1/2 tsp Garam Masala and 1 tbsp fresh dahi or malai. Simmer together for 2 minutes to let the cheese soak up the garlic-spinach flavors.',
        tips: [
          'A spoon of fresh cream or dahi mellows any raw spinach bitterness',
          'Finish with crushed kasuri methi rubbed between your fingers'
        ],
        flame: 'Low Flame Simmer',
        utensil: 'Deep Kadhai',
        sceneType: 'simmer',
        timerSec: 120,
        ingredientsUsed: ['Seared Paneer Cubes', '1/2 tsp Garam Masala', '1 tbsp Malai / Dahi', '1 tsp Kasuri Methi']
      },
      {
        stepNumber: 5,
        title: 'Roast Multigrain Rotis & Serve Hot',
        instruction: 'Roast multigrain flatbreads crisp on your tawa with drops of ghee. Ladle the velvet palak paneer into shallow bowls, crown with a dollop of white butter, and serve steaming hot!',
        tips: [
          'Multigrain grains like ragi, jowar, and wheat provide earthy crunch',
          'Pair with pickled baby onions for an acidic punch'
        ],
        flame: 'Medium-High Flame',
        utensil: 'Cast Iron Tawa & Serving Bowl',
        sceneType: 'plate',
        timerSec: 180,
        ingredientsUsed: ['Multigrain Rotis', 'Dollop of Butter / Ghee']
      }
    ]
  },

  // 7. AMRITSARI CHOLE & BHATURE
  {
    id: 'amritsari-chole-bhature',
    name: 'Amritsari Chole with Crisp Kulchas',
    hindiName: 'अमृतसरी छोले और कुल्चे',
    tagline: 'Dark, tea-infused tangy chickpeas steeped in anardana, roasted cumin, ginger juliennes and warm flatbreads',
    moods: ['comfort', 'surprise_me'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    totalTimeMinutes: 35,
    spiceLevel: 'Zesty & Robust',
    servings: '3–4 people',
    utensils: ['Pressure Cooker', 'Iron Kadhai', 'Tawa'],
    requiredIngredients: ['chana_dal', 'onions', 'tomatoes', 'ginger_garlic', 'green_chilli', 'atta', 'mustard_oil', 'cumin', 'dhaniya_powder', 'garam_masala'],
    optionalIngredients: ['fresh_coriander'],
    story: 'Straight from the bustling lanes of Punjab. The dark iron wok gives these chickpeas their iconic deep color and tangy depth.',
    chefTip: 'A pinch of dried pomegranate seeds (anardana) ground fresh elevates the gravy from good to unforgettable.',
    accentColor: 'var(--color-tomato-deep)',
    badgeText: '🍲 Hearty Comfort',
    illustrationType: 'chole',
    image3d: './assets/3d/chole_3d.jpg',
    quickSteps: [
      'Boil soaked chickpeas with black tea bag, cinnamon and black cardamom till melt-in-mouth tender.',
      'In a cast-iron pan, caramelize finely chopped onions and ginger-garlic in mustard oil.',
      'Add ground spices, simmer chickpeas in their savory dark broth until gravy turns rich and thick.',
      'Garnish with pickled ginger matches, green chillies, and toasted carom-seed kulchas.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Boil Chickpeas with Black Tea & Spices',
        instruction: 'Place soaked kabuli chickpeas in pressure cooker with 3 cups water, 1 black tea bag, 1 black cardamom, and 1 tsp salt. Cook on high for 4 whistles until chickpeas crush effortlessly between your thumb and finger.',
        tips: [
          'The black tea bag imparts that authentic dark Amritsari tint and natural tannins',
          'Discard the tea bag and whole cardamom before proceeding to gravy'
        ],
        flame: 'Medium-High Flame',
        utensil: 'Pressure Cooker',
        sceneType: 'boil',
        timerSec: 600,
        ingredientsUsed: ['1.5 cups Soaked Chickpeas', '1 Black Tea Bag', '1 Black Cardamom', '3 cups Water']
      },
      {
        stepNumber: 2,
        title: 'Caramelize Onions in Cast Iron Kadhai',
        instruction: 'Heat 2 tbsp mustard oil to smoking in your cast iron kadhai. Add 1 tsp cumin and sauté finely diced onions with 1 tbsp ginger-garlic paste for 5 minutes until deep caramel brown.',
        tips: [
          'Cooking in cast iron reacts with spices to produce that rich dark lacquer',
          'Brown the onions patiently without rushing for deep foundational umami'
        ],
        flame: 'Medium Flame',
        utensil: 'Cast Iron Kadhai',
        sceneType: 'temper',
        timerSec: 300,
        ingredientsUsed: ['2 tbsp Mustard Oil', '1 tsp Jeera', '2 Onions (finely diced)', '1 tbsp Ginger-Garlic Paste']
      },
      {
        stepNumber: 3,
        title: 'Simmer Dark Tangy Anardana Gravy',
        instruction: 'Stir in 1 tsp anardana (pomegranate) powder, 1 tsp dhaniya powder, 1/2 tsp garam masala, and 1 cup tomato purée. Pour in the boiled chickpeas with their savory dark cooking broth and simmer on low for 8 minutes.',
        tips: [
          'Mash 2 tablespoons of cooked chickpeas with a ladle to thicken the gravy naturally',
          'Anardana delivers the authentic tangy Amritsari bite'
        ],
        flame: 'Medium-Low Simmer',
        utensil: 'Cast Iron Kadhai',
        sceneType: 'simmer',
        timerSec: 480,
        ingredientsUsed: ['1 tsp Anardana Powder', '1 tsp Dhaniya Powder', '1 cup Tomato Purée', 'Chickpea Cooking Broth']
      },
      {
        stepNumber: 4,
        title: 'Toast Spiced Carom-Seed Kulchas on Tawa',
        instruction: 'Heat iron tawa. Brush kulchas or layered parathas with ghee, sprinkle with crushed ajwain (carom seeds) and fresh coriander, and toast on medium heat until blistering crisp and fragrant.',
        tips: [
          'Ajwain seeds aid easy digestion of hearty chickpea gravy',
          'Press with spatula to get crispy browned blisters'
        ],
        flame: 'Medium Flame',
        utensil: 'Iron Tawa',
        sceneType: 'roast',
        timerSec: 120,
        ingredientsUsed: ['Kulchas / Parathas', '1/2 tsp Ajwain', '1 tbsp Desi Ghee']
      },
      {
        stepNumber: 5,
        title: 'Garnish with Pickled Ginger Juliennes & Plate',
        instruction: 'Ladle dark, glossy chole into brass bowls. Top with pickled ginger matchsticks, slit green chillies, and a squeeze of lime juice. Serve steaming hot with the crisp carom kulchas!',
        tips: [
          'Ginger matchsticks steeped in lemon juice provide sharp, refreshing contrast',
          'Serve with pickled green chillies on the side'
        ],
        flame: 'Ready to Serve',
        utensil: 'Brass Serving Bowls',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Fresh Ginger Juliennes', 'Slit Green Chillies', 'Lime Wedges']
      }
    ]
  },

  // 8. CHETTINAD VEG PULAO
  {
    id: 'chettinad-veg-pulao',
    name: 'Chettinad Spiced Pulao & Onion Raita',
    hindiName: 'चेट्टीनाड वेज पुलाव और प्याज़ रायता',
    tagline: 'Fragrant South Indian one-pot rice layered with stone-ground fennel, star anise, curry leaves and coconut milk',
    moods: ['surprise_me', 'comfort'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    spiceLevel: 'Zesty & Aromatic',
    servings: '3 people',
    utensils: ['Heavy Bottom Handi', 'Whisking Bowl', 'Ladle'],
    requiredIngredients: ['basmati_rice', 'onions', 'tomatoes', 'ginger_garlic', 'curry_leaves', 'mustard_seeds', 'green_chilli', 'dahi', 'ghee'],
    optionalIngredients: ['fresh_coriander'],
    story: 'An exhilarating burst of southern spices. Fennel and black pepper create a captivating aroma that fills the entire home.',
    chefTip: 'Soak basmati rice for exactly 20 minutes beforehand to achieve long, individual grains that never turn mushy.',
    accentColor: 'var(--color-lavender-deep)',
    badgeText: '✨ Chef Repertoire',
    illustrationType: 'chettinad_pulao',
    image3d: './assets/3d/chettinad_pulao_3d.jpg',
    quickSteps: [
      'Crackle mustard seeds, curry leaves, star anise and crushed black peppercorns in ghee.',
      'Sauté sliced shallots and tomatoes until soft and aromatic.',
      'Fold in drained basmati rice, hot vegetable stock, and simmer tightly covered on dum for 12 minutes.',
      'Toss crisp red onions into chilled dahi with crushed green chillies; rest for 5 minutes.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Crackle Star Anise, Fennel & Curry Leaves',
        instruction: 'In your heavy bottom handi, heat 2 tbsp Desi Ghee. Splutter 1 tsp mustard seeds, 1 star anise, 1 tsp crushed fennel seeds, 2 bruised cardamom pods, and a generous sprig of fresh curry leaves until fragrant.',
        tips: [
          'Curry leaves and fennel crackling together create the signature Chettinad aroma',
          'Use whole spices fresh from the spice box for maximum essential oils'
        ],
        flame: 'Medium Flame',
        utensil: 'Heavy Bottom Handi',
        sceneType: 'temper',
        timerSec: 90,
        ingredientsUsed: ['2 tbsp Desi Ghee', '1 tsp Mustard Seeds', '1 Star Anise', '1 tsp Fennel Seeds', '12 Fresh Curry Leaves']
      },
      {
        stepNumber: 2,
        title: 'Sauté Sliced Shallots & Fresh Tomatoes',
        instruction: 'Add 1 cup thinly sliced shallots (or red onions) and 1 tbsp ginger-garlic paste with 2 slit green chillies. Sauté for 3 minutes until translucent, then fold in 1 chopped country tomato and 1/2 tsp crushed black pepper.',
        tips: [
          'Crushed black pepper provides warm Chettinad heat without needing red chilli powder',
          'Sauté tomatoes until soft and completely integrated'
        ],
        flame: 'Medium Flame',
        utensil: 'Heavy Bottom Handi',
        sceneType: 'temper',
        timerSec: 180,
        ingredientsUsed: ['1 cup Sliced Shallots / Onions', '1 tbsp Ginger-Garlic', '2 Green Chillies', '1 Country Tomato', '1/2 tsp Black Pepper']
      },
      {
        stepNumber: 3,
        title: 'Dum Simmer Basmati in Spiced Broth',
        instruction: 'Fold in 1.5 cups drained soaked Basmati rice gently. Pour in 2.75 cups hot water (or coconut milk) and 1 tsp salt. Bring to a rapid rolling boil, then clamp the heavy lid shut and slow dum on lowest flame for 12 minutes.',
        tips: [
          'Gently fold rice grains without breaking their delicate soaked tips',
          'Do not open the lid during dum cooking; steam cooks each grain evenly'
        ],
        flame: 'Low Flame Dum',
        utensil: 'Handi with Sealed Lid',
        sceneType: 'simmer',
        timerSec: 720,
        ingredientsUsed: ['1.5 cups Soaked Basmati Rice', '2.75 cups Hot Water / Stock', '1 tsp Salt']
      },
      {
        stepNumber: 4,
        title: 'Toss Chilled Red Onion Raita',
        instruction: 'While the rice steams, whisk 1 cup chilled fresh dahi with 1/2 cup finely diced red onions, 1 minced green chilli, a pinch of roasted cumin powder, and black salt. Rest in the fridge for 5 minutes.',
        tips: [
          'The cool creamy curd balances the bold black-pepper heat of Chettinad spices',
          'Diced onions release subtle sweetness into the curd while resting'
        ],
        flame: 'Chilled / No Flame',
        utensil: 'Whisking Bowl',
        sceneType: 'whisk',
        timerSec: 120,
        ingredientsUsed: ['1 cup Chilled Dahi', '1/2 cup Diced Red Onions', '1/4 tsp Black Salt', '1/4 tsp Roasted Jeera']
      },
      {
        stepNumber: 5,
        title: 'Fluff Aromatic Grains & Serve with Raita',
        instruction: 'Turn off flame and let handi rest 3 minutes. Remove lid to release an intoxicating cloud of star anise steam. Gently fluff long, separated grains with a flat paddle ladle and serve hot with chilled onion raita!',
        tips: [
          'Fluff grains from the edges inward to prevent breaking',
          'Garnish with fried cashews or fresh coriander if desired'
        ],
        flame: 'Ready to Serve',
        utensil: 'Serving Handi & Thali',
        sceneType: 'plate',
        timerSec: 60,
        ingredientsUsed: ['Steamed Chettinad Pulao', 'Chilled Onion Raita']
      }
    ]
  },

  // 9. DUM ALOO KASHMIRI
  {
    id: 'kashmiri-dum-aloo',
    name: 'Kashmiri Shahi Dum Aloo with Ajwain Paratha',
    hindiName: 'शाही दम आलू और अजवाइन परांठा',
    tagline: 'Golden pricked baby potatoes simmered in a velvety sauce of fennel, dry ginger powder and Kashmiri red chillies',
    moods: ['surprise_me', 'comfort'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 22,
    totalTimeMinutes: 32,
    spiceLevel: 'Warm & Fragrant',
    servings: '3 people',
    utensils: ['Deep Kadhai with Lid', 'Tawa', 'Fork / Skewer'],
    requiredIngredients: ['potatoes', 'dahi', 'mustard_oil', 'turmeric', 'red_chilli_powder', 'cumin', 'atta', 'ghee'],
    optionalIngredients: ['fresh_coriander'],
    story: 'No onions, no garlic—pure Kashmiri finesse where saunf (fennel) and soonth (dry ginger) work culinary magic in a yogurt gravy.',
    chefTip: 'Prick baby potatoes thoroughly with a fork before crisping so the spiced yogurt gravy penetrates straight to the core.',
    accentColor: 'var(--color-tomato-dark)',
    badgeText: '✨ Regional Gem',
    illustrationType: 'dum_aloo',
    image3d: './assets/3d/dum_aloo_3d.jpg',
    quickSteps: [
      'Boil, peel, and prick baby potatoes; shallow-fry in golden mustard oil until crisp.',
      'Whisk yogurt with Kashmiri chilli powder, dry ginger, and ground fennel seed.',
      'Temper whole spices in mustard oil, pour in spiced yogurt mix on low flame while stirring constantly.',
      'Slide potatoes in, seal pot with lid, and slow dum for 12 minutes until gravy clings to the potatoes.'
    ],
    detailedSteps: [
      {
        stepNumber: 1,
        title: 'Boil, Prick & Golden-Crisp Potatoes',
        instruction: 'Parboil 400g baby potatoes until tender; peel and prick deeply with a fork on all sides. Heat 2 tbsp mustard oil in kadhai and shallow-fry potatoes on medium heat for 4 minutes until golden-crisp on all sides; remove.',
        tips: [
          'Pricking creates deep tunnels for the spiced yogurt gravy to seep into',
          'Golden blistered potato skin holds up during the long dum simmer'
        ],
        flame: 'Medium-High Flame',
        utensil: 'Deep Kadhai',
        sceneType: 'temper',
        timerSec: 240,
        ingredientsUsed: ['400g Baby Potatoes (pricked)', '2 tbsp Kachi Ghani Mustard Oil']
      },
      {
        stepNumber: 2,
        title: 'Whisk Kashmiri Chilli & Fennel Yogurt Base',
        instruction: 'In a mixing bowl, vigorously whisk 1.5 cups fresh dahi with 1.5 tbsp vibrant Kashmiri chilli powder, 1 tsp ground soonth (dry ginger powder), 1 tbsp ground saunf (fennel powder), and 1/2 tsp haldi until satin smooth.',
        tips: [
          'Kashmiri chilli powder lends deep crimson color with very gentle warmth',
          'Fennel and dry ginger are the sacred duo of traditional Kashmiri wazwan'
        ],
        flame: 'Prep (No Flame)',
        utensil: 'Whisking Bowl',
        sceneType: 'whisk',
        timerSec: 120,
        ingredientsUsed: ['1.5 cups Fresh Dahi', '1.5 tbsp Kashmiri Lal Mirch', '1 tsp Soonth (Dry Ginger)', '1 tbsp Saunf (Fennel Powder)']
      },
      {
        stepNumber: 3,
        title: 'Temper Whole Spices & Whisk Yogurt into Oil',
        instruction: 'In the remaining hot mustard oil, splutter 1 tsp cumin, 2 cloves, 1 black cardamom, and a pinch of hing. Lower flame to minimum and slowly pour in the whisked spiced yogurt while stirring continuously in one direction.',
        tips: [
          'Continuous stirring on low heat prevents the yogurt from curdling or splitting',
          'Cook until you see a rich red sheen of mustard oil separating'
        ],
        flame: 'Low Flame (Constant Stirring)',
        utensil: 'Deep Kadhai',
        sceneType: 'temper',
        timerSec: 180,
        ingredientsUsed: ['1 tsp Jeera', '2 Cloves', '1 Black Cardamom', 'Spiced Yogurt Gravy']
      },
      {
        stepNumber: 4,
        title: 'Slow Dum Simmer with Sealed Lid',
        instruction: 'Slide the crisp pricked potatoes into the simmering red gravy with 1/2 cup warm water and 1 tsp salt. Seal kadhai tightly with a heavy lid and cook on lowest dum flame for 12 minutes until gravy clings thickly.',
        tips: [
          'Slow steam dum forces the aromatic fennel-chilli essence into the potato core',
          'Gravy will transform into a rich mahogany lacquer clinging to each potato'
        ],
        flame: 'Lowest Dum Flame',
        utensil: 'Kadhai with Sealed Lid',
        sceneType: 'simmer',
        timerSec: 720,
        ingredientsUsed: ['Crispy Baby Potatoes', '1/2 cup Warm Water', '1 tsp Salt']
      },
      {
        stepNumber: 5,
        title: 'Roast Ajwain Parathas & Serve Hot',
        instruction: 'Roast flaky ajwain parathas on hot iron tawa with ghee. Ladle the velvety, crimson Kashmiri Dum Aloo into shallow bowls, spooning the thick aromatic gravy on top. Serve steaming hot!',
        tips: [
          'Carom seeds (ajwain) in the paratha balance the rich yogurt gravy',
          'Serve with lime wedges and sweet pickled onions'
        ],
        flame: 'Ready to Feast',
        utensil: 'Cast Iron Tawa & Serving Bowls',
        sceneType: 'plate',
        timerSec: 120,
        ingredientsUsed: ['Ajwain Parathas', 'Desi Ghee', 'Lime Wedges']
      }
    ]
  }
];

// Expand the active recipe catalogue; these recipes were previously shipped but not loaded.
DISH_CATALOG.push(...DISH_CATALOG_EXPANSION);
