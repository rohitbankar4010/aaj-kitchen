/**
 * aaj. Cooking Step Animated Visual Scenes (3D-feel lightweight vector & CSS motion)
 * Matches the warm, pastel, sculptural 3D aesthetic of the aaj. living kitchen:
 * - Buttery cream, peach, apricot, lavender, tomato coral, deep herb green
 * - Layered depth, soft contact shadows, ambient lighting glows
 * - Lightweight SVG + CSS keyframe animations (zero heavy 3D engine overhead)
 */

export const SCENE_TYPES = {
  TEMPER: 'temper',
  BOIL: 'boil',
  WHISK: 'whisk',
  SIMMER: 'simmer',
  KNEAD_ROLL: 'knead_roll',
  ROAST: 'roast',
  PLATE: 'plate'
};

/**
 * Detects the most appropriate cooking action scene based on step text and position.
 */
export function detectSceneType(stepText = '', stepIndex = 0, totalSteps = 4) {
  const text = stepText.toLowerCase();

  // Whisking / Beating curd, yogurt, dal (even if on final step)
  if (/whisk|curd|dahi|yogurt|raita/i.test(text)) {
    return SCENE_TYPES.WHISK;
  }

  // Tawa roasting / flame roasting / puffing
  if (/tawa|roast|puff|freckles|phulka|kulcha|papad/i.test(text)) {
    return SCENE_TYPES.ROAST;
  }

  // Rolling / Kneading / Dough
  if (/knead|roll\b|dough|flour|delicate thin|chakla|belan|fenugreek leaves/i.test(text)) {
    return SCENE_TYPES.KNEAD_ROLL;
  }

  // Tempering / Sauté / Sizzle / Crackle / Splutter (checked before cooker so cooker tadka matches temper!)
  if (/temper|crackle|splutter|saut|saute|jeera|heat ghee|sear|caramelize|aromatics|mustard seeds|fry/i.test(text)) {
    return SCENE_TYPES.TEMPER;
  }

  // Boiling / Whistles / Pressure Cooker / Blanch
  if (/pressure-cook|cooker|whistle|boil|blanch|bubble|tea bag/i.test(text)) {
    return SCENE_TYPES.BOIL;
  }

  // Simmer / Dum / Covered cooking / Gravy / Bhuna
  if (/simmer|dum|tightly covered|bhuna|lid|sauce|gravy|fold in|tomatoes|glazes/i.test(text)) {
    return SCENE_TYPES.SIMMER;
  }

  // Final Plating / Serving / Garnishing
  if (stepIndex === totalSteps - 1 || /serve|plate|garnish|lemon|table|pair with/i.test(text)) {
    return SCENE_TYPES.PLATE;
  }

  // Rinsing / Prepping
  if (/rinse|drain|wash/i.test(text)) {
    return SCENE_TYPES.WHISK;
  }

  // Fallbacks
  if (stepIndex === 0) return SCENE_TYPES.KNEAD_ROLL;
  return SCENE_TYPES.TEMPER;
}

/**
 * Formats a raw step paragraph into scannable editorial content:
 * - Short punchy title
 * - Clean primary instruction
 * - 2-3 key action highlight chips
 * - Heat & Utensil cues
 * - Chef tip
 */
export function formatScannableStep(stepText = '', stepIndex = 0, totalSteps = 4, dish = {}) {
  const sceneType = detectSceneType(stepText, stepIndex, totalSteps);
  const text = stepText.toLowerCase();

  // Derive phase name
  const phases = ['Prep & Dough', 'The Tadka', 'Simmer & Flavor', 'Crisp & Serve'];
  const phase = phases[stepIndex] || `Phase ${stepIndex + 1}`;

  let title = '';
  let heatLevel = 'Medium Flame';
  let utensil = 'Heavy Kadhai';
  const actionPoints = [];

  if (sceneType === SCENE_TYPES.KNEAD_ROLL) {
    if (text.includes('roll')) {
      title = 'Roll & Shape Thin Flatbreads';
      actionPoints.push('Dust rolling board lightly with atta');
      actionPoints.push('Roll with gentle, even strokes');
      actionPoints.push('Keep edges thin for uniform puffing');
    } else {
      title = text.includes('fenugreek') ? 'Rub Fenugreek & Curd into Flour' : 'Knead Soft, Pliable Dough';
      actionPoints.push('Combine flour with ghee / curd drizzle');
      actionPoints.push('Add warm water gradually as needed');
      actionPoints.push('Rest dough for tender texture');
    }
    heatLevel = 'No Flame (Prep)';
    utensil = 'Wooden Rolling Board (Chakla)';
  } else if (sceneType === SCENE_TYPES.BOIL) {
    if (text.includes('whistle') || text.includes('cooker')) {
      title = 'Pressure-Cook for 3 Whistles';
      actionPoints.push('Lock cooker lid and seal securely');
      actionPoints.push('Cook on medium-high until 3 whistles');
      actionPoints.push('Allow pressure to drop naturally');
    } else if (text.includes('blanch')) {
      title = 'Blanch Spinach & Plunge in Ice Water';
      actionPoints.push('Blanch leaves for exactly 60 seconds');
      actionPoints.push('Ice-bath immediately to lock jewel-green color');
      actionPoints.push('Blend smoothly with green chillies');
    } else {
      title = 'Boil with Whole Aromatic Spices';
      actionPoints.push('Boil until melt-in-mouth tender');
      actionPoints.push('Infuse broth with whole cardamom & cinnamon');
      actionPoints.push('Reserve savory cooking broth');
    }
    heatLevel = 'Medium-High Flame';
    utensil = 'Pressure Cooker / Saucepan';
  } else if (sceneType === SCENE_TYPES.WHISK) {
    if (text.includes('rinse') || text.includes('drain')) {
      title = 'Rinse & Drain Rice and Lentils';
      actionPoints.push('Rinse 2–3 times under cool water until clear');
      actionPoints.push('Drain water thoroughly in colander');
      actionPoints.push('Rest grains 5 minutes before cooking');
    } else if (text.includes('raita')) {
      title = 'Toss Chilled Onion Raita';
      actionPoints.push('Toss diced red onions into chilled dahi');
      actionPoints.push('Season with roasted jeera & black salt');
      actionPoints.push('Rest 5 minutes for flavors to marry');
    } else {
      title = 'Whisk Creamy Curd & Spices';
      actionPoints.push('Whisk smoothly in one fluid direction');
      actionPoints.push('Fold in roasted jeera powder & black salt');
      actionPoints.push('Garnish with fresh green herbs');
    }
    heatLevel = 'Chilled / No Flame';
    utensil = 'Earthen Whisking Bowl / Colander';
  } else if (sceneType === SCENE_TYPES.SIMMER) {
    if (text.includes('dum')) {
      title = 'Cover Pot for Fragrant Dum Simmer';
      actionPoints.push('Seal pot tightly with lid to trap vapor');
      actionPoints.push('Lower flame to minimum for slow infusion');
      actionPoints.push('Rest 5 minutes before opening');
    } else if (text.includes('paneer') || text.includes('fold')) {
      title = 'Simmer Masala & Fold Malai Paneer';
      actionPoints.push('Cook tomatoes until oil glazes edges');
      actionPoints.push('Fold paneer gently off the direct flame');
      actionPoints.push('Keep paneer silky without overcooking');
    } else if (text.includes('bhuna')) {
      title = 'Slow Bhuna Masala until Mahogany';
      actionPoints.push('Sauté paste patiently in mustard oil');
      actionPoints.push('Watch for rich deep golden color');
      actionPoints.push('Pour in warm spiced tomato reduction');
    } else {
      title = 'Simmer Spiced Masala Gravy';
      actionPoints.push('Add warm water or purée');
      actionPoints.push('Simmer gently until gravy thickens');
      actionPoints.push('Check for oil separation along pan edges');
    }
    heatLevel = 'Low-Medium Flame';
    utensil = 'Deep Kadhai with Lid';
  } else if (sceneType === SCENE_TYPES.ROAST) {
    if (text.includes('papad')) {
      title = 'Flame-Roast Spiced Papad';
      actionPoints.push('Roast over open burner flame with tongs');
      actionPoints.push('Turn every 3 seconds for even blister');
      actionPoints.push('Serve instantly while crackling crisp');
    } else if (text.includes('phulka') || text.includes('puff')) {
      title = 'Puff Phulkas on Open Flame';
      actionPoints.push('Roast first side lightly on hot tawa');
      actionPoints.push('Transfer to direct flame to balloon');
      actionPoints.push('Brush immediately with pure Desi Ghee');
    } else {
      title = 'Roast Crisp on Hot Iron Tawa';
      actionPoints.push('Heat cast-iron tawa until smoking hot');
      actionPoints.push('Flip when golden bubbles rise');
      actionPoints.push('Press edges lightly with spatula for crispness');
    }
    heatLevel = 'Medium-High Flame';
    utensil = 'Cast Iron Tawa';
  } else if (sceneType === SCENE_TYPES.PLATE) {
    title = 'Garnish & Plate Steaming Hot';
    heatLevel = 'Ready to Serve';
    utensil = 'Serving Bowls & Dinner Thali';
    actionPoints.push('Ladle steaming hot into warm bowls');
    actionPoints.push('Crown with fresh coriander & lime wedge');
    actionPoints.push('Serve immediately with crispy breads');
  } else {
    // TEMPER / SAUTÉ
    if (text.includes('sear') || text.includes('mushrooms')) {
      title = 'Flash-Sear on High Heat';
      actionPoints.push('Sear on high heat without crowding');
      actionPoints.push('Caramelize golden without releasing juices');
      actionPoints.push('Reserve savory pan fond for gravy');
    } else if (text.includes('tadka') || text.includes('crackle') || text.includes('splutter')) {
      title = 'Sizzle Crackling Ghee Tadka';
      actionPoints.push('Heat pure ghee in pan or cooker');
      actionPoints.push('Splutter cumin, ginger & aromatics');
      actionPoints.push('Wait for seeds to pop golden');
    } else {
      title = 'Sauté Aromatics in Fragrant Ghee';
      actionPoints.push('Splutter cumin in hot desi ghee');
      actionPoints.push('Sauté onions until translucent golden');
      actionPoints.push('Stir constantly so ginger-garlic browns evenly');
    }
    heatLevel = 'Medium Flame';
    utensil = 'Tadka Pan / Brass Kadhai';
  }

  // Contextual chef tip
  let chefTip = null;
  if (stepIndex === totalSteps - 1 || stepIndex === 1) {
    chefTip = dish.chefTip || 'Taste for salt and warmth before final plating.';
  }

  return {
    sceneType,
    phase,
    title,
    instruction: stepText,
    heatLevel,
    utensil,
    actionPoints,
    chefTip
  };
}

/**
 * CSS styles & keyframe animations for the 3D-feel visual scenes.
 */
export const SCENE_CSS = `
/* 3D Visual Stage Container */
.scene-3d-stage {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  background: radial-gradient(circle at 50% 35%, var(--color-cream-surface) 0%, var(--color-peach-light) 65%, var(--color-lavender-subtle) 100%);
  box-shadow: var(--shadow-plinth);
  padding: 24px;
  margin: 0 auto;
  overflow: visible;
  transition: all 0.4s var(--ease-spring);
}

.scene-svg-wrapper {
  width: 100%;
  max-width: 320px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 18px 24px rgba(45, 26, 18, 0.16));
  animation: sceneFloat 6s ease-in-out infinite;
}

.scene-svg-graphic {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.scene-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  background: var(--color-cream-card);
  border: 1px solid var(--color-border-warm);
  box-shadow: 0 4px 12px rgba(45, 26, 18, 0.08);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-tomato-deep);
  letter-spacing: 0.01em;
  animation: pillPulse 3s ease-in-out infinite;
}

/* Animations */
@keyframes sceneFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(0.4deg); }
}

@keyframes pillPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* 1. Sizzle & Tadka Animations */
@keyframes sparkPop {
  0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
  50% { opacity: 1; transform: translate(var(--dx, 6px), var(--dy, -16px)) scale(1.2); }
  100% { transform: translate(var(--dx, 12px), var(--dy, -28px)) scale(0); opacity: 0; }
}

@keyframes seedBounce {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  35% { transform: translate(2px, -6px) rotate(14deg); }
  65% { transform: translate(-3px, -4px) rotate(-10deg); }
}

@keyframes gheeShimmer {
  0%, 100% { opacity: 0.85; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

/* 2. Pressure Cooker / Boil Animations */
@keyframes steamJet {
  0% { transform: scaleY(0.4) translateY(6px); opacity: 0.3; }
  50% { transform: scaleY(1.15) translateY(-4px); opacity: 0.9; }
  100% { transform: scaleY(0.6) translateY(2px); opacity: 0.4; }
}

@keyframes bubbleDrift {
  0% { transform: translateY(0) scale(0.6); opacity: 0; }
  40% { opacity: 0.9; }
  100% { transform: translateY(-38px) scale(1.2); opacity: 0; }
}

@keyframes cookerChug {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-0.8px, -1.2px); }
  75% { transform: translate(0.8px, 0.4px); }
}

/* 3. Whisk Animations */
@keyframes whiskOrbit {
  0% { transform: rotate(18deg) translate(0, 0); }
  25% { transform: rotate(12deg) translate(8px, -4px); }
  50% { transform: rotate(20deg) translate(0, 6px); }
  75% { transform: rotate(24deg) translate(-8px, 0px); }
  100% { transform: rotate(18deg) translate(0, 0); }
}

@keyframes curdSwirl {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 4. Simmer / Dum Animations */
@keyframes lidBreathe {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(-1.5deg); }
}

@keyframes dumVapor {
  0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
  40% { opacity: 0.7; }
  100% { transform: translate(var(--vx, 8px), -32px) scale(1.3); opacity: 0; }
}

@keyframes flameFlicker {
  0%, 100% { transform: scaleY(1); opacity: 0.85; }
  50% { transform: scaleY(1.18); opacity: 1; }
}

/* 5. Knead & Roll Animations */
@keyframes belanGlide {
  0%, 100% { transform: translate(-14px, -6px) rotate(-12deg); }
  50% { transform: translate(14px, 8px) rotate(-6deg); }
}

@keyframes doughStretch {
  0%, 100% { transform: scale(1, 1); }
  50% { transform: scale(1.05, 0.96); }
}

/* 6. Tawa Roast Animations */
@keyframes rotiPuff {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04, 1.06); }
}

@keyframes heatShimmer {
  0% { opacity: 0; transform: translateY(0); }
  50% { opacity: 0.6; }
  100% { opacity: 0; transform: translateY(-24px); }
}

/* 7. Plate & Garnish Animations */
@keyframes garnishDrift {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(6deg); }
}

@keyframes starTwinkle {
  0%, 100% { transform: scale(0.6) rotate(0deg); opacity: 0.3; }
  50% { transform: scale(1.25) rotate(45deg); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .scene-svg-wrapper,
  .scene-status-pill,
  .scene-svg-graphic * {
    animation: none !important;
    transition: none !important;
  }
}
`;

/**
 * 1. TEMPER / SAUTÉ SCENE
 */
export function renderTemperScene() {
  return `
    <div class="scene-3d-stage">
      <div class="scene-svg-wrapper">
        <svg class="scene-svg-graphic" viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="panPlinthGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FF9E64" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#FFEDE0" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="gheeGlow" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FFF176"/>
              <stop offset="60%" stop-color="#F6D860"/>
              <stop offset="100%" stop-color="#FF9E64"/>
            </radialGradient>
            <linearGradient id="panMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4A4543"/>
              <stop offset="45%" stop-color="#2D2725"/>
              <stop offset="100%" stop-color="#1A1817"/>
            </linearGradient>
            <linearGradient id="brassHandle" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FFB300"/>
              <stop offset="60%" stop-color="#D97706"/>
              <stop offset="100%" stop-color="#92400E"/>
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          <!-- Ambient Glow & Contact Shadow -->
          <ellipse cx="160" cy="205" rx="110" ry="24" fill="#2D1A12" opacity="0.18" />
          <ellipse cx="160" cy="185" rx="95" ry="30" fill="url(#panPlinthGlow)" />

          <!-- Tadka Pan Handle -->
          <path d="M 235 155 L 295 130 C 305 125 310 135 300 142 L 245 170 Z" fill="url(#brassHandle)" />
          <ellipse cx="300" cy="135" rx="4" ry="4" fill="#B45309" />

          <!-- Outer Pan Body (3D Kadhai Curve) -->
          <ellipse cx="160" cy="165" rx="92" ry="50" fill="url(#panMetal)" />
          <path d="M 68 165 C 68 205 252 205 252 165 Z" fill="#1C1917" opacity="0.6" />

          <!-- Golden Sizzling Ghee Surface -->
          <ellipse cx="160" cy="162" rx="78" ry="38" fill="url(#gheeGlow)" style="animation: gheeShimmer 2.5s ease-in-out infinite;" />

          <!-- Sizzling Oil Ripples -->
          <ellipse cx="160" cy="162" rx="55" ry="24" fill="none" stroke="#FFF9C4" stroke-width="2.5" opacity="0.75" />
          <ellipse cx="155" cy="160" rx="35" ry="15" fill="none" stroke="#FFE082" stroke-width="2" opacity="0.6" />

          <!-- Popping Cumin & Mustard Seeds -->
          <g class="spices-group">
            <ellipse cx="135" cy="155" rx="5" ry="2" fill="#78350F" transform="rotate(-25 135 155)" style="animation: seedBounce 0.9s ease-in-out infinite;" />
            <ellipse cx="170" cy="150" rx="6" ry="2.2" fill="#92400E" transform="rotate(35 170 150)" style="animation: seedBounce 1.1s ease-in-out 0.2s infinite;" />
            <ellipse cx="185" cy="165" rx="5" ry="2" fill="#78350F" transform="rotate(-15 185 165)" style="animation: seedBounce 0.8s ease-in-out 0.4s infinite;" />
            <circle cx="120" cy="168" r="2.5" fill="#1F2937" style="animation: seedBounce 0.7s ease-in-out 0.1s infinite;" />
            <circle cx="150" cy="172" r="2.8" fill="#1F2937" style="animation: seedBounce 0.95s ease-in-out 0.35s infinite;" />
            <circle cx="195" cy="155" r="2.5" fill="#1F2937" style="animation: seedBounce 0.85s ease-in-out 0.5s infinite;" />
          </g>

          <!-- Fresh Green Chilli Spluttering -->
          <path d="M 140 162 Q 155 152 172 165 Q 160 172 140 162 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5" />
          <path d="M 172 165 Q 178 166 182 162" stroke="#15803D" stroke-width="1.5" fill="none" />

          <!-- Sizzle Sparks & Heat Particles -->
          <path d="M 125 138 L 128 132 L 131 138 L 137 141 L 131 144 L 128 150 L 125 144 L 119 141 Z" fill="#FF5A5F" filter="url(#softGlow)" style="--dx: -12px; --dy: -25px; animation: sparkPop 1.6s ease-out infinite;" />
          <path d="M 190 130 L 192 125 L 194 130 L 199 132 L 194 134 L 192 139 L 190 134 L 185 132 Z" fill="#F6D860" filter="url(#softGlow)" style="--dx: 14px; --dy: -30px; animation: sparkPop 1.9s ease-out 0.4s infinite;" />
          <path d="M 160 120 L 161.5 116 L 163 120 L 167 121.5 L 163 123 L 161.5 127 L 160 123 L 156 121.5 Z" fill="#FF9E64" filter="url(#softGlow)" style="--dx: 4px; --dy: -28px; animation: sparkPop 1.4s ease-out 0.8s infinite;" />

          <!-- Aromatic Steam Curlicues -->
          <path d="M 145 135 Q 140 115 150 95 Q 160 75 148 60" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.45" style="--vx: -6px; animation: dumVapor 3.2s ease-out infinite;" />
          <path d="M 175 130 Q 185 110 175 90 Q 165 70 178 52" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.45" style="--vx: 8px; animation: dumVapor 3s ease-out 1.2s infinite;" />
        </svg>
      </div>
      <div class="scene-status-pill">
        <span>✨</span>
        <span>Sizzling Tadka · Spluttering Aromatics</span>
      </div>
    </div>
  `;
}

/**
 * 2. BOIL / PRESSURE COOKER SCENE
 */
export function renderBoilScene() {
  return `
    <div class="scene-3d-stage">
      <div class="scene-svg-wrapper">
        <svg class="scene-svg-graphic" viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cookerMetal" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="40%" stop-color="#ECEFF1"/>
              <stop offset="85%" stop-color="#B0BEC5"/>
              <stop offset="100%" stop-color="#78909C"/>
            </radialGradient>
            <linearGradient id="handleBlack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#374151"/>
              <stop offset="100%" stop-color="#111827"/>
            </linearGradient>
            <linearGradient id="brassWhistle" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FCD34D"/>
              <stop offset="50%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#B45309"/>
            </linearGradient>
          </defs>

          <!-- Contact Shadow -->
          <ellipse cx="160" cy="220" rx="90" ry="18" fill="#2D1A12" opacity="0.16" />

          <!-- Pressure Cooker Main Body Group -->
          <g style="animation: cookerChug 0.25s ease-in-out infinite;">
            <!-- Left Side Handle -->
            <rect x="52" y="142" width="32" height="14" rx="6" fill="url(#handleBlack)" />

            <!-- Main Pot Body (Chubby 3D Form) -->
            <rect x="75" y="115" width="170" height="95" rx="36" fill="url(#cookerMetal)" />
            <path d="M 75 170 C 75 215 245 215 245 170 Z" fill="#90A4AE" opacity="0.35" />

            <!-- Highlight Sheen Line -->
            <path d="M 105 130 C 105 180 115 195 115 195" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" opacity="0.7" fill="none" />

            <!-- Cooker Lid Band & Arch -->
            <rect x="70" y="102" width="180" height="20" rx="10" fill="url(#cookerMetal)" stroke="#78909C" stroke-width="1.5" />
            
            <!-- Long Bakelite Handle Extending Right -->
            <path d="M 235 106 L 305 106 C 312 106 312 118 305 118 L 235 118 Z" fill="url(#handleBlack)" />
            <circle cx="295" cy="112" r="3.5" fill="#9CA3AF" />

            <!-- Cooker Dome & Vent Tube -->
            <path d="M 125 102 C 125 78 195 78 195 102 Z" fill="url(#cookerMetal)" />
            <rect x="154" y="68" width="12" height="16" rx="2" fill="#78909C" />

            <!-- Whistle Weight (Prestige / Hawkins Style) -->
            <rect x="149" y="52" width="22" height="18" rx="4" fill="url(#brassWhistle)" />
            <rect x="156" y="46" width="8" height="6" rx="2" fill="#78350F" />
          </g>

          <!-- Steam Jet Spray From Whistle -->
          <g style="animation: steamJet 1.2s ease-in-out infinite;">
            <path d="M 160 48 Q 150 20 138 0 Q 160 12 182 0 Q 170 20 160 48 Z" fill="#FFFFFF" opacity="0.75" />
            <ellipse cx="140" cy="18" rx="12" ry="9" fill="#FFFFFF" opacity="0.6" />
            <ellipse cx="180" cy="14" rx="14" ry="10" fill="#FFFFFF" opacity="0.6" />
            <ellipse cx="160" cy="8" rx="16" ry="11" fill="#FFFFFF" opacity="0.8" />
          </g>

          <!-- Floating Steam Puffs -->
          <circle cx="120" cy="40" r="10" fill="#FFFFFF" opacity="0.4" style="animation: bubbleDrift 2.4s ease-out infinite;" />
          <circle cx="200" cy="35" r="12" fill="#FFFFFF" opacity="0.4" style="animation: bubbleDrift 2.6s ease-out 0.6s infinite;" />
          <circle cx="150" cy="25" r="8" fill="#FFFFFF" opacity="0.5" style="animation: bubbleDrift 2s ease-out 1.1s infinite;" />
        </svg>
      </div>
      <div class="scene-status-pill">
        <span>💨</span>
        <span>Pressure-Cooking · Steaming Whistles</span>
      </div>
    </div>
  `;
}

/**
 * 3. WHISK / CURD & DAL SCENE
 */
export function renderWhiskScene() {
  return `
    <div class="scene-3d-stage">
      <div class="scene-svg-wrapper">
        <svg class="scene-svg-graphic" viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="clayBowlGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FFAB91"/>
              <stop offset="55%" stop-color="#E64A19"/>
              <stop offset="100%" stop-color="#BF360C"/>
            </radialGradient>
            <radialGradient id="curdSurface" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="70%" stop-color="#FFFDF9"/>
              <stop offset="100%" stop-color="#F2E9D8"/>
            </radialGradient>
            <linearGradient id="whiskHandle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#D97706"/>
              <stop offset="100%" stop-color="#78350F"/>
            </linearGradient>
          </defs>

          <!-- Contact Shadow -->
          <ellipse cx="160" cy="215" rx="85" ry="20" fill="#2D1A12" opacity="0.16" />

          <!-- Earthen Terracotta Matka Bowl -->
          <ellipse cx="160" cy="165" rx="88" ry="46" fill="url(#clayBowlGrad)" />
          <path d="M 72 165 C 72 215 248 215 248 165 Z" fill="#870000" opacity="0.5" />
          
          <!-- Glazed Ceramic Inner Curd Pool -->
          <ellipse cx="160" cy="160" rx="74" ry="36" fill="url(#curdSurface)" />

          <!-- Swirling Vortex Ripple Rings -->
          <g transform="translate(160, 160)" style="animation: curdSwirl 4.5s linear infinite;">
            <path d="M -40 -10 A 42 20 0 0 1 40 10 A 42 20 0 0 1 -40 -10 Z" fill="none" stroke="#F6D860" stroke-width="2.2" opacity="0.75" />
            <path d="M -25 -5 A 26 12 0 0 1 25 5 A 26 12 0 0 1 -25 -5 Z" fill="none" stroke="#FF9E64" stroke-width="1.8" opacity="0.6" />
            <!-- Roasted Cumin & Coriander Flecks Swirling -->
            <circle cx="-18" cy="-8" r="1.8" fill="#78350F" />
            <circle cx="20" cy="6" r="2.2" fill="#78350F" />
            <circle cx="-8" cy="12" r="1.5" fill="#15803D" />
            <circle cx="12" cy="-10" r="2" fill="#15803D" />
            <circle cx="0" cy="2" r="2.2" fill="#D97706" />
          </g>

          <!-- Balloon Wire Whisk Stirring in Orbit -->
          <g style="transform-origin: 160px 150px; animation: whiskOrbit 2.2s ease-in-out infinite;">
            <!-- Whisk Wooden Grip -->
            <rect x="185" y="45" width="16" height="58" rx="8" fill="url(#whiskHandle)" transform="rotate(22 185 45)" />
            <circle cx="198" cy="46" r="4.5" fill="#FCD34D" />

            <!-- Steel Shaft -->
            <rect x="175" y="100" width="8" height="28" rx="3" fill="#9CA3AF" transform="rotate(22 175 100)" />

            <!-- Wire Loops of the Whisk -->
            <ellipse cx="160" cy="148" rx="20" ry="32" fill="none" stroke="#9CA3AF" stroke-width="3" transform="rotate(22 160 148)" />
            <ellipse cx="160" cy="148" rx="13" ry="34" fill="none" stroke="#D1D5DB" stroke-width="2.5" transform="rotate(10 160 148)" />
            <ellipse cx="160" cy="148" rx="26" ry="30" fill="none" stroke="#6B7280" stroke-width="2" transform="rotate(34 160 148)" />
          </g>

          <!-- Little Droplet Splashes -->
          <circle cx="130" cy="142" r="3" fill="#FFFDF9" style="animation: sparkPop 1.8s ease-out infinite;" />
          <circle cx="192" cy="145" r="2.5" fill="#FFFDF9" style="animation: sparkPop 2s ease-out 0.6s infinite;" />
        </svg>
      </div>
      <div class="scene-status-pill">
        <span>🌀</span>
        <span>Whisking Smooth · Creamy Texture</span>
      </div>
    </div>
  `;
}

/**
 * 4. SIMMER / DUM COOKING SCENE
 */
export function renderSimmerScene() {
  return `
    <div class="scene-3d-stage">
      <div class="scene-svg-wrapper">
        <svg class="scene-svg-graphic" viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="brassHandi" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FDE047"/>
              <stop offset="45%" stop-color="#F59E0B"/>
              <stop offset="85%" stop-color="#D97706"/>
              <stop offset="100%" stop-color="#78350F"/>
            </radialGradient>
            <radialGradient id="simmerFlame" cx="50%" cy="80%" r="50%">
              <stop offset="0%" stop-color="#60A5FA"/>
              <stop offset="50%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#EF4444" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- Low Blue/Amber Simmer Flame -->
          <ellipse cx="160" cy="210" rx="45" ry="14" fill="url(#simmerFlame)" style="animation: flameFlicker 1.8s ease-in-out infinite;" />
          
          <!-- Handi Base Shadow -->
          <ellipse cx="160" cy="216" rx="82" ry="16" fill="#2D1A12" opacity="0.18" />

          <!-- Traditional Royal Handi Body -->
          <path d="M 100 135 C 70 175 90 205 160 205 C 230 205 250 175 220 135 Z" fill="url(#brassHandi)" />
          
          <!-- Flared Neck Collar -->
          <ellipse cx="160" cy="135" rx="60" ry="16" fill="url(#brassHandi)" stroke="#92400E" stroke-width="2" />
          <ellipse cx="160" cy="133" rx="52" ry="12" fill="#78350F" />

          <!-- Breathing Dum Domed Lid with Knob -->
          <g style="animation: lidBreathe 2.8s ease-in-out infinite;">
            <path d="M 106 132 C 106 95 214 95 214 132 Z" fill="url(#brassHandi)" stroke="#92400E" stroke-width="1.5" />
            <!-- Lid Decorative Rings -->
            <ellipse cx="160" cy="130" rx="54" ry="12" fill="none" stroke="#FDE047" stroke-width="2" opacity="0.75" />
            <!-- Brass Finial Knob -->
            <rect x="156" y="85" width="8" height="14" rx="3" fill="#B45309" />
            <circle cx="160" cy="85" r="7" fill="#FDE047" stroke="#78350F" stroke-width="1.5" />
          </g>

          <!-- Rich Curling Translucent Dum Steam Waves -->
          <path d="M 108 128 Q 95 105 105 82 Q 115 58 100 38" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.5" style="--vx: -12px; animation: dumVapor 3.6s ease-out infinite;" />
          <path d="M 212 128 Q 225 102 215 78 Q 205 54 220 32" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.5" style="--vx: 14px; animation: dumVapor 3.4s ease-out 1s infinite;" />
          <path d="M 160 85 Q 150 60 162 40 Q 170 20 158 5" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.6" style="--vx: 0px; animation: dumVapor 3s ease-out 1.8s infinite;" />

          <!-- Aromatic Star Anise Floating -->
          <g transform="translate(70, 85) scale(0.65)" style="animation: sceneFloat 5s ease-in-out infinite;">
            <path d="M 20 5 L 23 15 L 33 18 L 24 23 L 26 33 L 18 26 L 10 31 L 13 21 L 5 16 L 15 14 Z" fill="#78350F" opacity="0.85" />
          </g>
        </svg>
      </div>
      <div class="scene-status-pill">
        <span>🍲</span>
        <span>Slow Dum Simmer · Trapping Aromatics</span>
      </div>
    </div>
  `;
}

/**
 * 5. KNEAD & ROLL SCENE
 */
export function renderKneadRollScene() {
  return `
    <div class="scene-3d-stage">
      <div class="scene-svg-wrapper">
        <svg class="scene-svg-graphic" viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="chaklaWood" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FCD34D"/>
              <stop offset="50%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#92400E"/>
            </radialGradient>
            <radialGradient id="doughGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFFDF9"/>
              <stop offset="60%" stop-color="#F6D860"/>
              <stop offset="100%" stop-color="#ECC94B"/>
            </radialGradient>
            <linearGradient id="belanWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#78350F"/>
              <stop offset="30%" stop-color="#D97706"/>
              <stop offset="70%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#78350F"/>
            </linearGradient>
          </defs>

          <!-- Contact Shadow -->
          <ellipse cx="160" cy="205" rx="95" ry="22" fill="#2D1A12" opacity="0.16" />

          <!-- Wooden Chakla (Rolling Board) Platform -->
          <ellipse cx="160" cy="165" rx="92" ry="42" fill="url(#chaklaWood)" />
          <path d="M 68 165 C 68 190 252 190 252 165 Z" fill="#78350F" />
          <!-- Chakla Feet -->
          <rect x="90" y="180" width="18" height="14" rx="4" fill="#581C87" opacity="0.4" />
          <rect x="212" y="180" width="18" height="14" rx="4" fill="#581C87" opacity="0.4" />

          <!-- Polished Board Rim Inlay -->
          <ellipse cx="160" cy="164" rx="84" ry="36" fill="#FBBF24" opacity="0.4" />

          <!-- Golden Wheat Dough Circle Expanding -->
          <ellipse cx="160" cy="162" rx="55" ry="25" fill="url(#doughGrad)" style="animation: doughStretch 2.4s ease-in-out infinite;" />
          <!-- Layered Triangle / Roti Markings -->
          <path d="M 130 160 Q 160 148 190 160 Q 160 172 130 160 Z" fill="#ECC94B" opacity="0.5" />

          <!-- Gliding Wooden Belan (Rolling Pin) -->
          <g style="animation: belanGlide 2.4s ease-in-out infinite;">
            <!-- Left Slim Handle -->
            <rect x="62" y="138" width="34" height="10" rx="5" fill="#78350F" />
            <!-- Central Rolling Barrel -->
            <rect x="94" y="132" width="132" height="22" rx="10" fill="url(#belanWood)" stroke="#78350F" stroke-width="1.5" />
            <!-- Right Slim Handle -->
            <rect x="224" y="138" width="34" height="10" rx="5" fill="#78350F" />
          </g>

          <!-- Flour Dust Speckles -->
          <circle cx="120" cy="130" r="2" fill="#FFFFFF" opacity="0.7" style="animation: heatShimmer 2s ease-out infinite;" />
          <circle cx="205" cy="125" r="1.8" fill="#FFFFFF" opacity="0.7" style="animation: heatShimmer 2.2s ease-out 0.4s infinite;" />
          <circle cx="160" cy="120" r="2.2" fill="#FFFFFF" opacity="0.6" style="animation: heatShimmer 2.5s ease-out 0.9s infinite;" />
        </svg>
      </div>
      <div class="scene-status-pill">
        <span>🌾</span>
        <span>Rolling Delicate & Thin · Soft Dough</span>
      </div>
    </div>
  `;
}

/**
 * 6. ROAST / TAWA PUFFING SCENE
 */
export function renderRoastScene() {
  return `
    <div class="scene-3d-stage">
      <div class="scene-svg-wrapper">
        <svg class="scene-svg-graphic" viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="tawaIron" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#374151"/>
              <stop offset="60%" stop-color="#1F2937"/>
              <stop offset="100%" stop-color="#111827"/>
            </radialGradient>
            <radialGradient id="puffedBread" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFFDF9"/>
              <stop offset="45%" stop-color="#FCD34D"/>
              <stop offset="90%" stop-color="#D97706"/>
              <stop offset="100%" stop-color="#92400E"/>
            </radialGradient>
            <radialGradient id="tawaFlame" cx="50%" cy="80%" r="55%">
              <stop offset="0%" stop-color="#38BDF8"/>
              <stop offset="40%" stop-color="#FB923C"/>
              <stop offset="100%" stop-color="#EF4444" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- Hot Gas Flame Burner Glow -->
          <ellipse cx="160" cy="195" rx="75" ry="18" fill="url(#tawaFlame)" style="animation: flameFlicker 1.5s ease-in-out infinite;" />

          <!-- Cast Iron Tawa Body -->
          <ellipse cx="160" cy="165" rx="98" ry="40" fill="url(#tawaIron)" stroke="#4B5563" stroke-width="2" />
          <!-- Heavy Steel Handle -->
          <path d="M 255 162 L 310 152 C 316 150 318 160 310 164 L 255 170 Z" fill="#4B5563" />

          <!-- Puffed Paratha / Roti Ballooning Upward -->
          <g style="animation: rotiPuff 2.2s ease-in-out infinite;">
            <ellipse cx="160" cy="158" rx="68" ry="28" fill="url(#puffedBread)" />
            <!-- Golden Toasted Freckles & Blistered Char Marks -->
            <ellipse cx="140" cy="154" rx="6" ry="3" fill="#78350F" opacity="0.75" />
            <ellipse cx="178" cy="150" rx="8" ry="3.5" fill="#92400E" opacity="0.8" />
            <ellipse cx="165" cy="164" rx="5" ry="2.5" fill="#78350F" opacity="0.7" />
            <ellipse cx="125" cy="162" rx="4" ry="2" fill="#B45309" opacity="0.75" />
            <ellipse cx="192" cy="158" rx="6" ry="2.8" fill="#78350F" opacity="0.8" />
          </g>

          <!-- Melted Ghee Glaze Sizzle Lines -->
          <path d="M 132 152 Q 160 145 188 152" stroke="#FEF08A" stroke-width="2.5" fill="none" opacity="0.8" />

          <!-- Heat Shimmer Waves -->
          <path d="M 130 135 Q 120 115 130 95" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.45" style="animation: heatShimmer 2s ease-out infinite;" />
          <path d="M 160 128 Q 170 108 160 88" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.5" style="animation: heatShimmer 2.2s ease-out 0.5s infinite;" />
          <path d="M 190 132 Q 180 112 192 92" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.45" style="animation: heatShimmer 2.4s ease-out 1s infinite;" />
        </svg>
      </div>
      <div class="scene-status-pill">
        <span>🍳</span>
        <span>Roasting on Tawa · Golden Crisp Freckles</span>
      </div>
    </div>
  `;
}

/**
 * 7. PLATE / GARNISH SCENE
 */
export function renderPlateScene(dish = {}) {
  const dishName = dish.name || 'Feast';
  const dishImg = dish.image3d || '';

  return `
    <div class="scene-3d-stage">
      <div class="scene-svg-wrapper">
        <svg class="scene-svg-graphic" viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="plateCeramic" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="70%" stop-color="#FAF5EB"/>
              <stop offset="100%" stop-color="#F2E9D8"/>
            </radialGradient>
            <radialGradient id="thaliGold" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FDE047"/>
              <stop offset="60%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#B45309"/>
            </radialGradient>
          </defs>

          <!-- Contact Plinth Shadow -->
          <ellipse cx="160" cy="210" rx="98" ry="24" fill="#2D1A12" opacity="0.18" />

          <!-- Ceramic Thali / Dinner Plate Group (Gently Hovering) -->
          <g style="animation: sceneFloat 5s ease-in-out infinite;">
            <!-- Outer Gold / Scalloped Rim -->
            <ellipse cx="160" cy="160" rx="96" ry="44" fill="url(#thaliGold)" />
            <!-- Inner Pearl White Plate Base -->
            <ellipse cx="160" cy="158" rx="86" ry="38" fill="url(#plateCeramic)" stroke="#ECC94B" stroke-width="2" />

            <!-- Dish Center Artwork / Curated Vector Bowl -->
            <g transform="translate(100, 108)">
              ${dishImg ? `
                <foreignObject x="10" y="5" width="100" height="90">
                  <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
                    <img src="${dishImg}" alt="${dishName}" style="width:90px; height:90px; object-fit:contain; border-radius:50%; box-shadow:0 8px 18px rgba(45,26,18,0.22);" />
                  </div>
                </foreignObject>
              ` : `
                <!-- Steaming Kadhai Vector Bowl -->
                <ellipse cx="60" cy="50" rx="48" ry="24" fill="#FF5A5F" />
                <ellipse cx="60" cy="46" rx="42" ry="18" fill="#F6D860" />
                <circle cx="50" cy="44" r="5" fill="#FFFFFF" opacity="0.8" />
                <circle cx="70" cy="48" r="6" fill="#FFFFFF" opacity="0.8" />
              `}
            </g>

            <!-- Floating Fresh Coriander Sprig & Lemon Wedge -->
            <g style="animation: garnishDrift 3.5s ease-in-out infinite;">
              <!-- Lemon Wedge -->
              <path d="M 215 150 C 235 140 245 160 225 170 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
              <path d="M 220 152 Q 230 152 225 162" stroke="#FFFFFF" stroke-width="1.5" fill="none" />
              
              <!-- Fresh Green Coriander Sprig -->
              <path d="M 95 152 Q 105 145 115 150" stroke="#15803D" stroke-width="2" fill="none" />
              <circle cx="95" cy="150" r="4.5" fill="#22C55E" />
              <circle cx="104" cy="144" r="5" fill="#22C55E" />
              <circle cx="114" cy="148" r="4" fill="#22C55E" />
            </g>
          </g>

          <!-- Twinkling Celebration Stars -->
          <path d="M 75 75 L 78 68 L 81 75 L 88 78 L 81 81 L 78 88 L 75 81 L 68 78 Z" fill="#F59E0B" style="animation: starTwinkle 2.2s ease-in-out infinite;" />
          <path d="M 245 80 L 247 74 L 249 80 L 255 82 L 249 84 L 247 90 L 245 84 L 239 82 Z" fill="#FF5A5F" style="animation: starTwinkle 2.5s ease-in-out 0.6s infinite;" />
          <path d="M 160 45 L 162 40 L 164 45 L 169 47 L 164 49 L 162 54 L 160 49 L 155 47 Z" fill="#7E57C2" style="animation: starTwinkle 2s ease-in-out 1.2s infinite;" />

          <!-- Aromatic Appetizing Steam -->
          <path d="M 150 90 Q 140 68 152 48 Q 162 28 150 10" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.55" style="animation: dumVapor 3.2s ease-out infinite;" />
          <path d="M 170 85 Q 180 62 168 42 Q 158 22 172 6" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.55" style="animation: dumVapor 3s ease-out 1.4s infinite;" />
        </svg>
      </div>
      <div class="scene-status-pill">
        <span>🌿</span>
        <span>Plated with Love · Ready to Feast!</span>
      </div>
    </div>
  `;
}

/**
 * Main dispatcher: renders the animated scene corresponding to the step.
 */
export function renderStepScene(sceneType, dish = {}) {
  switch (sceneType) {
    case SCENE_TYPES.TEMPER:
      return renderTemperScene();
    case SCENE_TYPES.BOIL:
      return renderBoilScene();
    case SCENE_TYPES.WHISK:
      return renderWhiskScene();
    case SCENE_TYPES.SIMMER:
      return renderSimmerScene();
    case SCENE_TYPES.KNEAD_ROLL:
      return renderKneadRollScene();
    case SCENE_TYPES.ROAST:
      return renderRoastScene();
    case SCENE_TYPES.PLATE:
      return renderPlateScene(dish);
    default:
      return renderTemperScene();
  }
}
