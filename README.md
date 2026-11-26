# aaj. — AI Kitchen Companion

**Current product-quality release (26 November 2026)**

The app includes 30 pantry-aware Indian recipes, phone/tablet cooking guides, My Masala Box, time/diet/household preferences, and a manual Instamart shopping handoff. Pantry "confirmed today" status expires when the day changes. It still uses a deterministic local recommendation engine, **not live Gemini**. See [QUALITY_RELEASE_NOTES.md](QUALITY_RELEASE_NOTES.md) and [USER_TESTING_CARD.md](USER_TESTING_CARD.md) for limitations and validation.

---

# aaj. — Kitchen Companion

**Build status (26 November 2026):** 30 catalogued Indian meals, local pantry-aware recipe ranking, four moods, a "Show me 3 more" action, Kitchen Memory, ingredient checking, animated cooking steps, timers, and an Instamart **external shopping handoff**. The recipe engine is deterministic demo logic, **not live Gemini**. Swiggy cart/checkout is **not connected**.

**Run locally:** Serve this folder with an HTTP server. For example, if Python is installed, run `py -m http.server 5500` (Windows) from inside the folder and open `http://localhost:5500/`. Do not double-click an HTML file (`file://` blocks JavaScript module imports).

**Deploy:** The root `index.html` is the entry point for static hosting. On Vercel, import this folder/repository, choose "Other" (static), use no framework build command, and set output to the root directory. Check all assets and routes after publishing.

**Security:** Never commit `.env` files, credentials, or temporary browser profiles. The clean handoff archive intentionally excludes `.chrome_temp`, `.edge_temp`, browser history, cache, crash dumps and DOM captures.

**Visual note:** Four original recipes have photographic-style 3D assets. Other dishes use lightweight SVG illustrations; the expansion does not yet have bespoke 3D renders for every recipe.

**Quality note:** The expanded recipes have structured step descriptions and quantity annotations but have **not** been independently kitchen-tested or professionally reviewed. The deterministic matching checks ingredient IDs and availability, not food safety or medical dietary requirements. Test recipes with real cooks before making stronger claims.

---

# aaj. — Premium AI Kitchen Companion for Indian Households

> *"Aaj kya banega?"* (What shall we make today?)
> A sculptural, animated 3D kitchen companion for landscape iPad / tablets.
> Select a feasible dinner in under 60 seconds.

---

## 🍳 Visual & 3D Art Direction

Inspired by modern 3D mobile art direction, `aaj.` has been redesigned from conventional recipe cards into a living, tactile 3D kitchen:
- **One Enormous Featured Meal Centerpiece**: The active recommendation rests on a sculptural dual-tier plinth with continuous gentle floating hover (`foodArtHover`) and breathing contact shadow.
- **Oversized Floating Kitchen Objects**: A giant 3D wooden slotted cooking spoon breaks out of the frame into the foreground on the right, accompanied by floating 3D plump red tomatoes, chillies, ginger root, and coriander leaves.
- **Cinematic Pastel Lighting**: Warm buttery cream (`#FAF5EB`), peach (`#F8B182`), apricot (`#FF9E64`), lavender rim lighting (`#B39DDB`), tomato coral (`#FF5A5F`), and deep herb green (`#16423C`).
- **Tactile Alternative Previews**: The other two recommended meals appear as smaller, rounded preview cards that smoothly promote into the 3D centerpiece upon tapping.
- **Unmistakable Primary Action**: A prominent, tactile tomato-coral **"Let's cook" →** button that triggers an immersive culinary preparation sheet with cookware checklist and 4-step overview.
- **Subtle Correction Flow**: One-tap *"Not feeling this? Swap"* action allowing instantaneous dish substitution without technical clutter.
- **Device-Local Grocery Memory**: Remembered pantry staples drawer with explicit disclaimers: *"Based on remembered groceries on this iPad; never assumed as confirmed inventory."*

---

## 🗂️ Project Architecture & Files

All project files are located in:
`your extracted aaj-kitchen project folder`

```
aaj-kitchen/
├── index.html                           # Modular tablet entry point
├── standalone.html                      # Standalone zero-dependency runner
├── package.json                         # Project metadata
├── README.md                            # Documentation
├── assets/
│   └── 3d/                              # 3D sculptural food & prop artwork
│       ├── paneer_bhurji_3d.jpg         # Whimsical 3D clay Paneer Bhurji & Paratha
│       ├── khichdi_3d.jpg               # Whimsical 3D clay Moong Dal Khichdi & Ghee
│       ├── thepla_3d.jpg                # Whimsical 3D clay Gujarati Methi Thepla & Dahi
│       ├── dal_tadka_3d.jpg             # Dimensional wooden bowl Dal Tadka
│       ├── floating_spoon_3d.jpg        # Oversized 3D wooden slotted cooking spoon
│       └── floating_props_3d.jpg        # Floating 3D tomato, chillies, ginger props
└── src/
    ├── app.js                           # State controller & keyboard bindings
    ├── adapter/
    │   └── recommendationEngineAdapter.js # Google AI Studio Schema v2 Demo Adapter
    ├── components/
    │   ├── FeaturedDishStage.js         # The 3D sculptural centerpiece showcase
    │   ├── MealPreviewCards.js          # Selectable alternative dinner preview cards
    │   ├── MoodSelector.js              # Quick, Comfort, Healthy, Surprise Me tabs
    │   ├── DishPreviewModal.js          # Tablet cooking sheet with cookware check
    │   ├── GroceriesDrawer.js           # "Remember groceries" drawer
    │   ├── CorrectionModal.js           # "Not available" one-tap dish swap dialog
    │   └── AudioHaptics.js              # Synthetic Web Audio API feedback
    ├── data/
    │   ├── dishCatalog.js               # Indian dinner repertoire with 3D bindings
    │   ├── dishVisuals.js               # 3D image loader with dimensional fallbacks
    │   ├── dishIllustrations.js         # Dimensional vector art fallbacks
    │   └── pantryStaples.js             # 26 Indian staples & localStorage memory
    └── css/
        ├── tokens.css                   # 3D lighting tokens, shadows, colors
        └── style.css                    # Landscape tablet layout, hover physics, parallax
```

---

## 🔍 Visual Asset & Demo Data Status

### 3D Visual Assets:
- **Paneer Bhurji & Parathas**: Full original 3D whimsical clay render (`paneer_bhurji_3d.jpg`).
- **Moong Dal Khichdi**: Full original 3D whimsical clay render (`khichdi_3d.jpg`).
- **Gujarati Methi Thepla**: Full original 3D whimsical clay render (`thepla_3d.jpg`).
- **Dal Tadka with Roti**: Full dimensional wooden bowl render (`dal_tadka_3d.jpg`).
- **Oversized Wooden Slotted Spoon**: Full original 3D beechwood render (`floating_spoon_3d.jpg`).
- **Floating Kitchen Produce Props**: Full original 3D tomato, chillies, ginger render (`floating_props_3d.jpg`).
- **Other Regional Dishes (e.g. Matar Mushroom, Dum Aloo)**: Render with bespoke dimensional vector food artwork fallback.

### What is Still Using Demo Data:
- **Recommendation Engine**: Preserved behind `recommendationEngineAdapter.js` using AI Studio's structured schema rules (`ALL_IN_PANTRY`, `MISSING_OPTIONAL`, `MISSING_ONE`). Ready for live backend hookup.
- **Pantry Inventory**: Stored in `localStorage` under `aaj_remembered_groceries_v1`. Always clearly labelled as *"remembered on this device"*.
- **Cooking Mode**: Hitting "Let's cook" displays the celebratory launch toast and step-by-step preview; guided cooking mode is implemented in `src/components/CookingJourney.js`.
