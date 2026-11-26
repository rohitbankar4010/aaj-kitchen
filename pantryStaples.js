/**
 * Pantry Staples Data
 * Indian household staple ingredients with local-device memory status.
 *
 * NOTE ON ACCURACY:
 * These are strictly "remembered groceries" stored on this device.
 * They are NEVER presented to the user as confirmed real-time inventory.
 */

export const INITIAL_PANTRY_STAPLES = [
  // Grains & Flours
  { id: 'atta', name: 'Chakki Atta (Wheat Flour)', hindiName: 'गेहूं का आटा', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🌾', inStock: true },
  { id: 'basmati_rice', name: 'Basmati Rice', hindiName: 'बासमती चावल', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🍚', inStock: true },
  { id: 'toor_dal', name: 'Arhar / Toor Dal', hindiName: 'अरहर दाल', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🥣', inStock: true },
  { id: 'moong_dal', name: 'Yellow Moong Dal', hindiName: 'मूंग दाल', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🥣', inStock: true },
  { id: 'chana_dal', name: 'Kabuli Chana (Chickpeas)', hindiName: 'सफेद चना', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🧆', inStock: true },

  // Fresh Vegetables & Aromatics
  { id: 'onions', name: 'Red Onions', hindiName: 'प्याज़', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🧅', inStock: true },
  { id: 'tomatoes', name: 'Country Tomatoes', hindiName: 'टमाटर', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🍅', inStock: true },
  { id: 'ginger_garlic', name: 'Ginger & Garlic Paste', hindiName: 'अदरक लहसुन', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🫚', inStock: true },
  { id: 'green_chilli', name: 'Hari Mirch (Green Chillies)', hindiName: 'हरी मिर्च', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🌶️', inStock: true },
  { id: 'fresh_coriander', name: 'Hara Dhaniya (Fresh Coriander)', hindiName: 'हरा धनिया', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🌿', inStock: false }, // missing by default
  { id: 'potatoes', name: 'Potatoes (Aloo)', hindiName: 'आलू', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🥔', inStock: true },
  { id: 'spinach', name: 'Fresh Palak (Spinach)', hindiName: 'पालक', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🥬', inStock: true },
  { id: 'peas', name: 'Green Matar (Peas)', hindiName: 'हरी मटर', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🟢', inStock: true },
  { id: 'mushrooms', name: 'Button Mushrooms', hindiName: 'मशरूम', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🍄', inStock: true },

  // Dairy & Proteins
  { id: 'paneer', name: 'Malai Paneer', hindiName: 'मलाई पनीर', category: 'dairy', categoryLabel: 'Dairy & Proteins', icon: '🧀', inStock: true },
  { id: 'dahi', name: 'Fresh Dahi (Curd / Yogurt)', hindiName: 'दही', category: 'dairy', categoryLabel: 'Dairy & Proteins', icon: '🥛', inStock: true },
  { id: 'milk', name: 'Full Cream Milk', hindiName: 'दूध', category: 'dairy', categoryLabel: 'Dairy & Proteins', icon: '🥛', inStock: true },

  // Spices & Condiments
  { id: 'turmeric', name: 'Haldi (Turmeric)', hindiName: 'हल्दी', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🟡', inStock: true },
  { id: 'cumin', name: 'Jeera (Cumin Seeds)', hindiName: 'जीरा', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🟤', inStock: true },
  { id: 'red_chilli_powder', name: 'Kashmiri Lal Mirch', hindiName: 'लाल मिर्च पाउडर', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🌶️', inStock: true },
  { id: 'dhaniya_powder', name: 'Dhaniya Powder', hindiName: 'धनिया पाउडर', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🌱', inStock: true },
  { id: 'garam_masala', name: 'Kitchen King / Garam Masala', hindiName: 'गरम मसाला', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '✨', inStock: true },
  { id: 'kasuri_methi', name: 'Kasuri Methi (Fenugreek)', hindiName: 'कसूरी मेथी', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🍃', inStock: false }, // missing by default
  { id: 'mustard_seeds', name: 'Rai (Mustard Seeds)', hindiName: 'राई', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '⚫', inStock: true },
  { id: 'curry_leaves', name: 'Kadi Patta (Curry Leaves)', hindiName: 'कढ़ी पत्ता', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🌿', inStock: true },

  // Additional recipe essentials — unavailable by default until user remembers or confirms them
  { id: 'poha', name: 'Thick Poha (Flattened Rice)', hindiName: 'पोहे', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🍚', inStock: false },
  { id: 'rajma', name: 'Rajma (Kidney Beans)', hindiName: 'राजमा', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🫘', inStock: false },
  { id: 'masoor_dal', name: 'Red Masoor Dal', hindiName: 'मसूर दाल', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🥣', inStock: false },
  { id: 'besan', name: 'Besan (Gram Flour)', hindiName: 'बेसन', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🌾', inStock: false },
  { id: 'makki_atta', name: 'Makki Atta (Maize Flour)', hindiName: 'मक्के का आटा', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🌽', inStock: false },
  { id: 'pav', name: 'Pav Bread', hindiName: 'पाव', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🍞', inStock: false },
  { id: 'bhindi', name: 'Fresh Bhindi (Okra)', hindiName: 'भिंडी', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🥬', inStock: false },
  { id: 'baingan', name: 'Baingan (Brinjal)', hindiName: 'बैंगन', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🍆', inStock: false },
  { id: 'cauliflower', name: 'Gobi (Cauliflower)', hindiName: 'फूलगोभी', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🥦', inStock: false },
  { id: 'capsicum', name: 'Shimla Mirch (Capsicum)', hindiName: 'शिमला मिर्च', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🫑', inStock: false },
  { id: 'lemon', name: 'Fresh Lemon', hindiName: 'नींबू', category: 'fresh', categoryLabel: 'Fresh Vegetables', icon: '🍋', inStock: false },
  { id: 'eggs', name: 'Eggs', hindiName: 'अंडे', category: 'dairy', categoryLabel: 'Dairy & Proteins', icon: '🥚', inStock: false },
  { id: 'butter', name: 'Butter', hindiName: 'मक्खन', category: 'dairy', categoryLabel: 'Dairy & Proteins', icon: '🧈', inStock: false },
  { id: 'tamarind', name: 'Tamarind (Imli)', hindiName: 'इमली', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🫘', inStock: false },
  { id: 'boondi', name: 'Boondi', hindiName: 'बूंदी', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🟡', inStock: false },
  { id: 'papad', name: 'Papad', hindiName: 'पापड़', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🫓', inStock: false },
  { id: 'pickle', name: 'Indian Pickle (Achaar)', hindiName: 'अचार', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🫙', inStock: false },
  { id: 'peanuts', name: 'Raw Peanuts', hindiName: 'मूंगफली', category: 'grains', categoryLabel: 'Grains & Flours', icon: '🥜', inStock: false },

  // Additional common masalas: never assume these are in the kitchen.
  { id: 'salt', name: 'Salt (Namak)', hindiName: 'नमक', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🧂', inStock: false },
  { id: 'hing', name: 'Hing (Asafoetida)', hindiName: 'हींग', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🟡', inStock: false },
  { id: 'ajwain', name: 'Ajwain (Carom Seeds)', hindiName: 'अजवाइन', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🌰', inStock: false },
  { id: 'amchur', name: 'Amchur (Dry Mango Powder)', hindiName: 'अमचूर', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🥭', inStock: false },
  { id: 'saunf', name: 'Saunf (Fennel Seeds)', hindiName: 'सौंफ', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🌿', inStock: false },
  { id: 'saunth', name: 'Saunth (Dry Ginger Powder)', hindiName: 'सोंठ', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🫚', inStock: false },

  { id: 'star_anise', name: 'Star Anise (Chakra Phool)', hindiName: 'चक्र फूल', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '⭐', inStock: false },
  { id: 'black_pepper', name: 'Black Pepper (Kali Mirch)', hindiName: 'काली मिर्च', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '⚫', inStock: false },
  { id: 'cardamom', name: 'Cardamom (Elaichi)', hindiName: 'इलायची', category: 'spices', categoryLabel: 'Spices & Masalas', icon: '🫛', inStock: false },

  // Cooking Mediums
  { id: 'ghee', name: 'Desi Cow Ghee', hindiName: 'देसी घी', category: 'oils', categoryLabel: 'Oils & Ghee', icon: '🧈', inStock: true },
  { id: 'mustard_oil', name: 'Kachi Ghani Mustard Oil', hindiName: 'सरसों का तेल', category: 'oils', categoryLabel: 'Oils & Ghee', icon: '🫒', inStock: true }
];

export const PANTRY_STORAGE_KEY = 'aaj_remembered_groceries_v1';
// A confirmation is valid only on the local calendar day when it was made.
// Older versions did not store confirmation dates: treat those as remembered,
// never as automatically verified stock.
export const PANTRY_CONFIRM_DATE_KEY = 'aaj_pantry_confirmation_day_v1';
export const localKitchenDay = (now = new Date()) =>
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

export function expireOldPantryConfirmations(pantry, lastConfirmedDay, today = localKitchenDay()) {
  if (lastConfirmedDay === today) return pantry;
  return pantry.map(item => item.kitchenState === 'confirmed'
    ? { ...item, kitchenState: 'remembered', inStock: true }
    : item);
}


export function getStoredPantry() {
  try {
    const raw = localStorage.getItem(PANTRY_STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      // Merge with INITIAL_PANTRY_STAPLES to ensure icons, metadata, and kitchenState are up to date
      const byId = Object.fromEntries(stored.map(item => [item.id, item]));
      const loaded = INITIAL_PANTRY_STAPLES.map(initial => {
        const saved = byId[initial.id];
        const inStock = saved ? Boolean(saved.inStock) : initial.inStock;
        const kitchenState = saved?.kitchenState || (inStock ? 'remembered' : 'unavailable');
        return { ...initial, inStock: kitchenState !== 'unavailable', kitchenState };
      });
      // Do not erase the pantry or the user's selections: only expire an old
      // 'confirmed today' claim back into a remembered (unverified) item.
      return expireOldPantryConfirmations(
        loaded, localStorage.getItem(PANTRY_CONFIRM_DATE_KEY)
      );
    }
  } catch (e) {
    console.warn('Could not read remembered groceries from localStorage:', e);
  }
  return INITIAL_PANTRY_STAPLES.map(item => ({
    ...item,
    kitchenState: item.inStock ? 'remembered' : 'unavailable'
  }));
}

export function saveStoredPantry(pantryList) {
  try {
    const normalized = pantryList.map(item => {
      const kitchenState = item.kitchenState || (item.inStock ? 'remembered' : 'unavailable');
      return {
        ...item,
        kitchenState,
        inStock: kitchenState !== 'unavailable'
      };
    });
    localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(normalized));
    if (normalized.some(item => item.kitchenState === 'confirmed')) {
      localStorage.setItem(PANTRY_CONFIRM_DATE_KEY, localKitchenDay());
    }
  } catch (e) {
    console.warn('Could not save remembered groceries to localStorage:', e);
  }
}
