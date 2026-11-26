/**
 * aaj. Floating Background Elements & Parallax
 * Playful culinary botanicals: elaichi, curry leaf, star anise, red chilli & dhaniya.
 * Lightweight, GPU-accelerated, zero-dependency SVG particles with reduced motion detection.
 */

export function renderFloatingElements(container) {
  if (!container) return;

  const floatingSpiceSvgs = [
    // 1. Green Cardamom (Elaichi)
    `
    <div class="floating-spice-item spice-cardamom" data-depth="0.15" style="top: 14%; left: 6%;">
      <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
        <ellipse cx="30" cy="30" rx="14" ry="24" transform="rotate(35 30 30)" fill="#7CB342" stroke="#558B2F" stroke-width="1.5"/>
        <path d="M22 18 Q30 30 38 42" stroke="#9CCC65" stroke-width="2" stroke-linecap="round"/>
        <path d="M18 24 Q30 30 42 36" stroke="#558B2F" stroke-width="1.2" opacity="0.6"/>
        <circle cx="30" cy="10" r="3" fill="#33691E"/>
      </svg>
    </div>
    `,

    // 2. Curry Leaf (Kadi Patta)
    `
    <div class="floating-spice-item spice-curry-leaf" data-depth="0.25" style="top: 22%; right: 8%;">
      <svg width="56" height="56" viewBox="0 0 70 70" fill="none">
        <path d="M15 55 C20 30 45 15 60 12 C55 35 35 55 15 55 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="1.5"/>
        <path d="M18 52 Q38 32 58 14" stroke="#81C784" stroke-width="1.8"/>
        <!-- Side veins -->
        <path d="M28 42 Q32 38 38 42" stroke="#81C784" stroke-width="1"/>
        <path d="M38 32 Q44 28 50 32" stroke="#81C784" stroke-width="1"/>
      </svg>
    </div>
    `,

    // 3. Star Anise (Chakra Phool)
    `
    <div class="floating-spice-item spice-star-anise" data-depth="0.18" style="top: 68%; left: 4%;">
      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
        <g transform="translate(30, 30) scale(1.1)">
          <!-- 8-pointed star petals -->
          <path d="M0 -18 L5 -6 L18 -6 L8 3 L12 16 L0 8 L-12 16 L-8 3 L-18 -6 L-5 -6 Z" fill="#4E342E" stroke="#3E2723" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="4" fill="#8D6E63"/>
          <circle cx="0" cy="-10" r="2" fill="#D7CCC8"/>
          <circle cx="10" cy="0" r="2" fill="#D7CCC8"/>
          <circle cx="0" cy="10" r="2" fill="#D7CCC8"/>
          <circle cx="-10" cy="0" r="2" fill="#D7CCC8"/>
        </g>
      </svg>
    </div>
    `,

    // 4. Dried Kashmiri Red Chilli
    `
    <div class="floating-spice-item spice-chilli" data-depth="0.3" style="top: 75%; right: 7%;">
      <svg width="58" height="58" viewBox="0 0 70 70" fill="none">
        <!-- Curved Chilli Pod -->
        <path d="M15 50 Q30 60 55 45 Q45 25 20 30 Q10 40 15 50 Z" fill="#D32F2F" stroke="#B71C1C" stroke-width="1.5"/>
        <!-- Stem -->
        <path d="M55 45 Q62 48 64 54" stroke="#2E7D32" stroke-width="3" stroke-linecap="round"/>
        <circle cx="55" cy="46" r="3" fill="#388E3C"/>
        <!-- Gloss highlight -->
        <path d="M22 36 Q35 42 45 35" stroke="#FF8A80" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      </svg>
    </div>
    `,

    // 5. Coriander Leaves Sprig
    `
    <div class="floating-spice-item spice-dhaniya" data-depth="0.2" style="top: 88%; left: 45%;">
      <svg width="44" height="44" viewBox="0 0 50 50" fill="none">
        <path d="M12 40 Q25 25 38 12" stroke="#388E3C" stroke-width="2" stroke-linecap="round"/>
        <path d="M38 12 C42 6 48 8 46 14 C50 12 52 18 47 20 Z" fill="#4CAF50"/>
        <path d="M25 25 C28 20 33 22 31 27 C35 26 36 30 32 32 Z" fill="#388E3C"/>
      </svg>
    </div>
    `
  ];

  container.innerHTML = floatingSpiceSvgs.join('\n');

  // Parallax on mouse / tablet touch move
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    const handleMove = (xRatio, yRatio) => {
      const items = container.querySelectorAll('.floating-spice-item');
      items.forEach(el => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0.2;
        const moveX = (xRatio - 0.5) * 45 * depth;
        const moveY = (yRatio - 0.5) * 45 * depth;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    window.addEventListener('mousemove', (e) => {
      handleMove(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX / window.innerWidth, e.touches[0].clientY / window.innerHeight);
      }
    }, { passive: true });
  }
}
