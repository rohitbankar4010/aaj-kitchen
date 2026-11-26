/**
 * aaj. Bespoke SVG Food Illustrations
 * Handcrafted vector artwork designed specifically for aaj.
 * Rich Indian culinary aesthetics: cast iron, brass katoris, tawa folds, steam trails & fresh herbs.
 */

export function getDishSvg(type) {
  switch (type) {
    case 'paneer_bhurji':
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="kadhaiGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#332D2B"/>
              <stop offset="85%" stop-color="#1A1817"/>
              <stop offset="100%" stop-color="#0E0D0C"/>
            </radialGradient>
            <radialGradient id="paneerGlow" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FFF2A3"/>
              <stop offset="40%" stop-color="#F6D860"/>
              <stop offset="80%" stop-color="#E59B34"/>
              <stop offset="100%" stop-color="#C26A18"/>
            </radialGradient>
            <linearGradient id="parathaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF5D6"/>
              <stop offset="35%" stop-color="#F7E2A9"/>
              <stop offset="70%" stop-color="#DEB868"/>
              <stop offset="100%" stop-color="#B8862F"/>
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          <!-- Ambient Glow Plate -->
          <ellipse cx="200" cy="235" rx="170" ry="60" fill="#FCE8D7" opacity="0.6"/>
          <ellipse cx="200" cy="230" rx="155" ry="50" fill="#F8C5A5" opacity="0.4"/>

          <!-- Cast Iron Kadhai Base -->
          <ellipse cx="170" cy="205" rx="125" ry="55" fill="#1C1917" opacity="0.9"/>
          <ellipse cx="170" cy="195" rx="120" ry="50" fill="url(#kadhaiGrad)"/>
          <!-- Kadhai Handles -->
          <path d="M48 185 C40 175 40 160 52 155 C58 152 64 160 62 170" stroke="#443F3C" stroke-width="6" stroke-linecap="round"/>
          <path d="M292 185 C300 175 300 160 288 155 C282 152 276 160 278 170" stroke="#443F3C" stroke-width="6" stroke-linecap="round"/>

          <!-- Scrambled Paneer Bhurji Rich Texture -->
          <ellipse cx="170" cy="190" rx="105" ry="40" fill="url(#paneerGlow)"/>

          <!-- Crumbled Paneer Morsels -->
          <g fill="#FFFDE0" stroke="#D97706" stroke-width="1.2">
            <circle cx="130" cy="180" r="10"/>
            <circle cx="150" cy="172" r="12"/>
            <circle cx="175" cy="178" r="14"/>
            <circle cx="200" cy="175" r="11"/>
            <circle cx="215" cy="188" r="9"/>
            <circle cx="145" cy="198" r="11"/>
            <circle cx="170" cy="202" r="13"/>
            <circle cx="195" cy="200" r="10"/>
            <circle cx="120" cy="192" r="8"/>
            <circle cx="230" cy="195" r="7"/>
          </g>

          <!-- Diced Tomatoes & Chillies & Coriander -->
          <g>
            <!-- Diced Tomato Red Cubes -->
            <rect x="135" y="185" width="8" height="7" rx="2" fill="#D9383A"/>
            <rect x="165" y="168" width="9" height="8" rx="2" fill="#B91C1C"/>
            <rect x="190" y="182" width="7" height="6" rx="2" fill="#D9383A"/>
            <rect x="155" y="202" width="8" height="7" rx="2" fill="#E63946"/>
            <rect x="210" y="176" width="6" height="5" rx="1.5" fill="#B91C1C"/>

            <!-- Green Chilli Rounds -->
            <ellipse cx="142" cy="172" rx="4" ry="3" fill="#2A5C43" stroke="#A7F3D0" stroke-width="1"/>
            <ellipse cx="182" cy="195" rx="4" ry="3" fill="#2A5C43" stroke="#A7F3D0" stroke-width="1"/>
            <ellipse cx="202" cy="192" rx="3.5" ry="2.5" fill="#2A5C43" stroke="#A7F3D0" stroke-width="1"/>

            <!-- Chopped Fresh Coriander Leaves -->
            <path d="M152 165 C156 160 160 162 158 167 C162 165 164 169 160 172 Z" fill="#2D6A4F"/>
            <path d="M178 174 C182 170 186 172 184 176 C188 175 189 179 185 181 Z" fill="#2D6A4F"/>
            <path d="M135 198 C138 194 142 195 140 200 C144 198 145 203 141 204 Z" fill="#2D6A4F"/>
            <path d="M198 205 C202 201 206 202 204 207 C208 206 209 210 205 212 Z" fill="#2D6A4F"/>
          </g>

          <!-- Flaky Paratha Folded Triangles (Tawa blistered) -->
          <g transform="translate(190, 80) rotate(18)">
            <!-- Paratha Shadow -->
            <polygon points="120,40 180,140 60,135" fill="rgba(28,25,23,0.18)" filter="url(#softGlow)"/>
            <!-- Golden Paratha Layer 1 -->
            <polygon points="115,35 175,135 55,130" fill="url(#parathaGrad)" stroke="#B8862F" stroke-width="1.5"/>
            <!-- Flaky Creases & Blister Spots -->
            <path d="M80 115 Q115 85 145 105" stroke="#8C5819" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
            <path d="M95 125 Q115 105 135 120" stroke="#8C5819" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
            <!-- Brown Char Freckles -->
            <circle cx="105" cy="70" r="3" fill="#6B3A0A" opacity="0.8"/>
            <circle cx="125" cy="85" r="4" fill="#6B3A0A" opacity="0.75"/>
            <circle cx="115" cy="100" r="3.5" fill="#542B05" opacity="0.85"/>
            <circle cx="90" cy="100" r="2.5" fill="#6B3A0A" opacity="0.7"/>
            <circle cx="140" cy="115" r="3" fill="#542B05" opacity="0.8"/>
            <circle cx="80" cy="85" r="2" fill="#6B3A0A" opacity="0.6"/>
            <!-- Ghee Sheen Highlight -->
            <path d="M100 50 Q120 70 110 95" stroke="#FFFBEB" stroke-width="3" stroke-linecap="round" opacity="0.6" filter="url(#softGlow)"/>
          </g>

          <!-- Rising Warm Steam Curls -->
          <path class="steam-trail steam-1" d="M150 145 Q140 110 160 85 Q175 65 165 40" stroke="#FFF7ED" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.6"/>
          <path class="steam-trail steam-2" d="M185 140 Q200 115 185 90 Q175 70 190 45" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
          <path class="steam-trail steam-3" d="M125 155 Q115 130 130 105 Q140 85 130 65" stroke="#FFF7ED" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.4"/>
        </svg>
      `;

    case 'dal_tadka':
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="brassGrad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFEAA7"/>
              <stop offset="45%" stop-color="#DFB15B"/>
              <stop offset="85%" stop-color="#9E6D24"/>
              <stop offset="100%" stop-color="#6E450E"/>
            </radialGradient>
            <radialGradient id="dalLiquid" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#FFEB3B"/>
              <stop offset="35%" stop-color="#FBC02D"/>
              <stop offset="80%" stop-color="#F57F17"/>
              <stop offset="100%" stop-color="#E65100"/>
            </radialGradient>
            <linearGradient id="riceBowl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="60%" stop-color="#F1ECE4"/>
              <stop offset="100%" stop-color="#D7CCC8"/>
            </linearGradient>
          </defs>

          <!-- Platter Shadow -->
          <ellipse cx="200" cy="235" rx="170" ry="55" fill="#FCE8D7" opacity="0.6"/>

          <!-- Fluffy Jeera Rice Portion (Right) -->
          <ellipse cx="260" cy="210" rx="90" ry="42" fill="url(#riceBowl)" stroke="#D7CCC8" stroke-width="1"/>
          <!-- Jeera Rice Grains & Cumin Seeds -->
          <g fill="#FFFDF8" stroke="#D1C4E9" stroke-width="0.5">
            <ellipse cx="230" cy="195" rx="8" ry="3" transform="rotate(25 230 195)"/>
            <ellipse cx="250" cy="190" rx="9" ry="3" transform="rotate(-15 250 190)"/>
            <ellipse cx="275" cy="195" rx="8" ry="3.2" transform="rotate(35 275 195)"/>
            <ellipse cx="240" cy="208" rx="8.5" ry="3" transform="rotate(-30 240 208)"/>
            <ellipse cx="265" cy="210" rx="9" ry="3" transform="rotate(10 265 210)"/>
            <ellipse cx="290" cy="205" rx="8" ry="2.8" transform="rotate(-20 290 205)"/>
            <ellipse cx="225" cy="215" rx="7.5" ry="3" transform="rotate(15 225 215)"/>
            <ellipse cx="255" cy="222" rx="8" ry="3" transform="rotate(-10 255 222)"/>
            <ellipse cx="280" cy="220" rx="7.5" ry="2.9" transform="rotate(40 280 220)"/>
          </g>
          <!-- Toasted Jeera (Cumin) Seeds on Rice -->
          <g fill="#4E342E">
            <ellipse cx="238" cy="192" rx="3.5" ry="1.2" transform="rotate(45 238 192)"/>
            <ellipse cx="262" cy="196" rx="3.5" ry="1.2" transform="rotate(-25 262 196)"/>
            <ellipse cx="248" cy="212" rx="3.5" ry="1.2" transform="rotate(15 248 212)"/>
            <ellipse cx="275" cy="208" rx="3.5" ry="1.2" transform="rotate(-40 275 208)"/>
            <ellipse cx="232" cy="220" rx="3" ry="1.1" transform="rotate(30 232 220)"/>
            <ellipse cx="268" cy="225" rx="3.2" ry="1.2" transform="rotate(-10 268 225)"/>
          </g>

          <!-- Brass Katori Bowl (Left Foreground) -->
          <ellipse cx="140" cy="205" rx="95" ry="50" fill="#6E450E"/>
          <ellipse cx="140" cy="195" rx="90" ry="46" fill="url(#brassGrad)" stroke="#FFEAA7" stroke-width="2"/>

          <!-- Golden Yellow Dal Surface -->
          <ellipse cx="140" cy="190" rx="80" ry="38" fill="url(#dalLiquid)"/>

          <!-- Swirling Red Chilli Ghee Tadka Layer -->
          <path d="M100 185 Q130 165 160 180 Q190 195 160 205 Q130 215 110 195 Z" fill="#D9383A" opacity="0.85"/>
          <path d="M120 180 Q145 170 165 185 Q175 195 150 198 Z" fill="#FFA000" opacity="0.9"/>

          <!-- Whole Dried Kashmiri Chilli floating in Tadka -->
          <path d="M120 188 C135 175 155 178 170 184 C162 188 140 186 120 188 Z" fill="#B91C1C" stroke="#7F1D1D" stroke-width="1"/>
          <circle cx="170" cy="184" r="2" fill="#2E7D32"/> <!-- Green chilli stem -->

          <!-- Crackling Mustard & Cumin Seeds in Tadka -->
          <circle cx="132" cy="182" r="2" fill="#1C1917"/>
          <circle cx="144" cy="176" r="2.2" fill="#1C1917"/>
          <circle cx="158" cy="188" r="2" fill="#1C1917"/>
          <circle cx="148" cy="195" r="1.8" fill="#1C1917"/>
          <ellipse cx="125" cy="195" rx="3" ry="1" fill="#4E342E" transform="rotate(20 125 195)"/>
          <ellipse cx="165" cy="192" rx="3" ry="1" fill="#4E342E" transform="rotate(-30 165 192)"/>

          <!-- Fresh Coriander Leaf Crown -->
          <path d="M135 170 C140 164 146 166 144 172 C149 169 152 174 147 178 Z" fill="#2E7D32"/>

          <!-- Golden Ghee Droplets & Shimmer -->
          <circle cx="108" cy="185" r="3.5" fill="#FFF59D" opacity="0.9"/>
          <circle cx="175" cy="198" r="4" fill="#FFF59D" opacity="0.85"/>

          <!-- Rising Steam -->
          <path class="steam-trail steam-1" d="M130 150 Q115 120 135 95 Q145 75 135 50" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
          <path class="steam-trail steam-2" d="M155 145 Q170 120 155 95 Q145 75 160 50" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
          <path class="steam-trail steam-3" d="M260 170 Q250 140 265 115 Q275 95 260 70" stroke="#FFF7ED" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.4"/>
        </svg>
      `;

    case 'matar_mushroom':
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="terracottaGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#E2725B"/>
              <stop offset="60%" stop-color="#B84A39"/>
              <stop offset="100%" stop-color="#6B241A"/>
            </radialGradient>
            <radialGradient id="curryGravy" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#E65100"/>
              <stop offset="50%" stop-color="#BF360C"/>
              <stop offset="100%" stop-color="#871A04"/>
            </radialGradient>
            <linearGradient id="phulkaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8E7"/>
              <stop offset="50%" stop-color="#F2DEB5"/>
              <stop offset="100%" stop-color="#D7B576"/>
            </linearGradient>
          </defs>

          <!-- Ambient Shadow -->
          <ellipse cx="200" cy="235" rx="170" ry="55" fill="#FCE8D7" opacity="0.6"/>

          <!-- Puffed Phulka Roti on Tawa (Left) -->
          <ellipse cx="110" cy="205" rx="85" ry="48" fill="url(#phulkaGrad)" stroke="#C49B58" stroke-width="1.5"/>
          <!-- Roti Char Freckles -->
          <g fill="#6D4C41">
            <ellipse cx="80" cy="195" rx="5" ry="3" opacity="0.8"/>
            <ellipse cx="120" cy="185" rx="6" ry="4" opacity="0.75"/>
            <ellipse cx="140" cy="205" rx="4" ry="2.5" opacity="0.7"/>
            <ellipse cx="95" cy="215" rx="5" ry="3" opacity="0.85"/>
            <circle cx="115" cy="210" r="3" opacity="0.8"/>
          </g>
          <!-- Roti Puff Highlights -->
          <path d="M70 190 Q110 165 140 185" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>

          <!-- Terracotta Handi Gravy Bowl (Right) -->
          <ellipse cx="240" cy="205" rx="105" ry="55" fill="#6B241A"/>
          <ellipse cx="240" cy="195" rx="100" ry="50" fill="url(#terracottaGrad)" stroke="#FFA07A" stroke-width="2"/>

          <!-- Rich Bhuna Masala Gravy Surface -->
          <ellipse cx="240" cy="190" rx="88" ry="40" fill="url(#curryGravy)"/>

          <!-- Sliced Tender Button Mushrooms -->
          <g>
            <!-- Mushroom 1 -->
            <path d="M195 185 C195 170 220 170 220 185 Z" fill="#EFEBE9" stroke="#8D6E63" stroke-width="1.2"/>
            <rect x="203" y="185" width="8" height="10" rx="3" fill="#D7CCC8" stroke="#8D6E63" stroke-width="1"/>
            <!-- Mushroom 2 -->
            <path d="M245 175 C245 162 270 162 270 175 Z" fill="#EFEBE9" stroke="#8D6E63" stroke-width="1.2"/>
            <rect x="253" y="175" width="8" height="9" rx="3" fill="#D7CCC8" stroke="#8D6E63" stroke-width="1"/>
            <!-- Mushroom 3 -->
            <path d="M225 195 C225 182 250 182 250 195 Z" fill="#EFEBE9" stroke="#8D6E63" stroke-width="1.2"/>
            <rect x="233" y="195" width="8" height="9" rx="3" fill="#D7CCC8" stroke="#8D6E63" stroke-width="1"/>
          </g>

          <!-- Vibrant Sweet Green Peas (Matar) -->
          <g fill="#43A047" stroke="#1B5E20" stroke-width="1">
            <circle cx="185" cy="190" r="7"/>
            <circle cx="210" cy="172" r="6.5"/>
            <circle cx="235" cy="170" r="7"/>
            <circle cx="270" cy="188" r="6.5"/>
            <circle cx="220" cy="208" r="7.5"/>
            <circle cx="255" cy="205" r="7"/>
            <circle cx="280" cy="198" r="6"/>
          </g>
          <!-- Peas Highlight Gleam -->
          <g fill="#A5D6A7">
            <circle cx="183" cy="188" r="2"/>
            <circle cx="233" cy="168" r="2"/>
            <circle cx="218" cy="206" r="2.2"/>
            <circle cx="253" cy="203" r="2"/>
          </g>

          <!-- Fresh Herb Garnishes & Ghee Gloss -->
          <path d="M230 182 C235 176 242 178 240 184 C245 182 247 187 243 190 Z" fill="#2E7D32"/>
          <ellipse cx="205" cy="198" rx="12" ry="5" fill="#FFB74D" opacity="0.6"/>

          <!-- Steam Rising -->
          <path class="steam-trail steam-1" d="M230 150 Q215 125 235 100 Q245 80 235 55" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
          <path class="steam-trail steam-2" d="M260 145 Q275 120 260 95 Q250 75 265 50" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
        </svg>
      `;

    case 'palak_paneer':
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="emeraldPalak" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#2D6A4F"/>
              <stop offset="45%" stop-color="#1B4332"/>
              <stop offset="85%" stop-color="#143628"/>
              <stop offset="100%" stop-color="#081C15"/>
            </radialGradient>
            <linearGradient id="paneerCube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="70%" stop-color="#FFF9C4"/>
              <stop offset="100%" stop-color="#FBC02D"/>
            </linearGradient>
          </defs>

          <!-- Shadow -->
          <ellipse cx="200" cy="235" rx="170" ry="55" fill="#E7F0EB" opacity="0.8"/>

          <!-- Black Stoneware Bowl -->
          <ellipse cx="170" cy="205" rx="115" ry="52" fill="#1C1917"/>
          <ellipse cx="170" cy="195" rx="110" ry="48" fill="#292524" stroke="#44403C" stroke-width="2"/>

          <!-- Velvety Deep Emerald Spinach Purée -->
          <ellipse cx="170" cy="190" rx="98" ry="40" fill="url(#emeraldPalak)"/>

          <!-- Fresh Malai Swirl Ribbon (Cream) -->
          <path d="M125 185 Q150 165 180 178 Q210 190 195 202 Q170 215 150 200" stroke="#FFFDE7" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.9"/>
          <path d="M135 188 Q155 172 175 182" stroke="#FFFDE7" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.75"/>

          <!-- Pan-Seared Paneer Cubes (Golden Crusted) -->
          <g>
            <!-- Cube 1 -->
            <polygon points="135,175 150,165 165,172 150,182" fill="url(#paneerCube)" stroke="#B78103" stroke-width="1"/>
            <polygon points="150,182 165,172 165,186 150,195" fill="#F9A825" stroke="#B78103" stroke-width="1"/>
            <polygon points="135,175 150,182 150,195 135,188" fill="#F57F17" stroke="#B78103" stroke-width="1"/>

            <!-- Cube 2 -->
            <polygon points="180,185 195,175 210,182 195,192" fill="url(#paneerCube)" stroke="#B78103" stroke-width="1"/>
            <polygon points="195,192 210,182 210,196 195,205" fill="#F9A825" stroke="#B78103" stroke-width="1"/>
            <polygon points="180,185 195,192 195,205 180,198" fill="#F57F17" stroke="#B78103" stroke-width="1"/>

            <!-- Cube 3 -->
            <polygon points="160,198 175,190 190,196 175,205" fill="url(#paneerCube)" stroke="#B78103" stroke-width="1"/>
            <polygon points="175,205 190,196 190,208 175,216" fill="#F9A825" stroke="#B78103" stroke-width="1"/>
            <polygon points="160,198 175,205 175,216 160,208" fill="#F57F17" stroke="#B78103" stroke-width="1"/>
          </g>

          <!-- Ginger Matchstick Juliennes -->
          <g stroke="#FFE082" stroke-width="2" stroke-linecap="round">
            <line x1="140" y1="180" x2="152" y2="175"/>
            <line x1="172" y1="172" x2="185" y2="176"/>
            <line x1="185" y1="198" x2="198" y2="192"/>
          </g>

          <!-- Multigrain Warm Roti (Right) -->
          <g transform="translate(260, 160) rotate(15)">
            <ellipse cx="30" cy="30" rx="55" ry="32" fill="#E0D5C1" stroke="#A89B85" stroke-width="1.5"/>
            <!-- Grain Specks (Oats, Flax) -->
            <circle cx="20" cy="25" r="1.5" fill="#5D4037"/>
            <circle cx="35" cy="30" r="1.8" fill="#3E2723"/>
            <circle cx="45" cy="22" r="1.5" fill="#5D4037"/>
            <circle cx="28" cy="38" r="2" fill="#3E2723"/>
            <!-- Char mark -->
            <ellipse cx="25" cy="28" rx="6" ry="2.5" fill="#4E342E" opacity="0.6"/>
          </g>

          <!-- Steam -->
          <path class="steam-trail steam-1" d="M160 145 Q145 120 165 95 Q175 75 160 50" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
          <path class="steam-trail steam-2" d="M190 140 Q205 115 190 90 Q180 70 195 45" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
        </svg>
      `;

    case 'chole':
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="choleGravy" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#4E342E"/>
              <stop offset="50%" stop-color="#3E2723"/>
              <stop offset="100%" stop-color="#1A0C08"/>
            </radialGradient>
            <radialGradient id="bhaturaGlow" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FFFDE7"/>
              <stop offset="45%" stop-color="#FFF9C4"/>
              <stop offset="85%" stop-color="#FFE082"/>
              <stop offset="100%" stop-color="#FFB300"/>
            </radialGradient>
          </defs>

          <!-- Plate Shadow -->
          <ellipse cx="200" cy="235" rx="170" ry="55" fill="#FCE8D7" opacity="0.6"/>

          <!-- Puffy Golden Bhatura (Left) -->
          <ellipse cx="120" cy="190" rx="90" ry="60" fill="url(#bhaturaGlow)" stroke="#FFA000" stroke-width="2"/>
          <!-- Bhatura Golden Blisters -->
          <g fill="#BF360C" opacity="0.75">
            <ellipse cx="100" cy="175" rx="12" ry="7" transform="rotate(-15 100 175)"/>
            <ellipse cx="140" cy="185" rx="15" ry="9" transform="rotate(20 140 185)"/>
            <ellipse cx="90" cy="205" rx="10" ry="6" transform="rotate(10 90 205)"/>
            <ellipse cx="130" cy="210" rx="14" ry="7" transform="rotate(-10 130 210)"/>
            <circle cx="115" cy="165" r="4"/>
          </g>
          <!-- Shiny Oil Glisten -->
          <path d="M70 170 Q110 145 150 160" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.6"/>

          <!-- Dark Amritsari Chole Bowl (Right) -->
          <ellipse cx="255" cy="210" rx="100" ry="50" fill="#1C1917"/>
          <ellipse cx="255" cy="200" rx="95" ry="46" fill="#3E2723" stroke="#8D6E63" stroke-width="2"/>
          <ellipse cx="255" cy="195" rx="85" ry="38" fill="url(#choleGravy)"/>

          <!-- Chickpea Morsels (Chole) -->
          <g fill="#A1887F" stroke="#3E2723" stroke-width="1.2">
            <circle cx="215" cy="185" r="8"/>
            <circle cx="235" cy="178" r="9"/>
            <circle cx="255" cy="182" r="8.5"/>
            <circle cx="278" cy="178" r="8"/>
            <circle cx="225" cy="198" r="8.5"/>
            <circle cx="248" cy="202" r="9"/>
            <circle cx="270" cy="198" r="8.5"/>
            <circle cx="290" cy="190" r="7.5"/>
            <circle cx="240" cy="212" r="8"/>
            <circle cx="265" cy="210" r="8.5"/>
          </g>

          <!-- Pickled Onion & Ginger Slit & Green Chilli -->
          <path d="M228 178 C238 172 250 174 260 180" stroke="#FF1744" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="240" y1="188" x2="258" y2="182" stroke="#FFF59D" stroke-width="2" stroke-linecap="round"/>
          <path d="M260 190 C268 185 278 188 285 195" stroke="#2E7D32" stroke-width="3" stroke-linecap="round"/>

          <!-- Steam -->
          <path class="steam-trail steam-1" d="M250 150 Q235 125 255 100 Q265 80 250 55" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
          <path class="steam-trail steam-2" d="M120 140 Q105 115 125 90 Q135 70 120 45" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
        </svg>
      `;

    case 'khichdi':
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="khichdiGold" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#FFF59D"/>
              <stop offset="40%" stop-color="#FFEE58"/>
              <stop offset="80%" stop-color="#FDD835"/>
              <stop offset="100%" stop-color="#F57F17"/>
            </radialGradient>
            <linearGradient id="papadCrisp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8E1"/>
              <stop offset="50%" stop-color="#FFE082"/>
              <stop offset="100%" stop-color="#FFB74D"/>
            </linearGradient>
          </defs>

          <!-- Shadow -->
          <ellipse cx="200" cy="235" rx="170" ry="55" fill="#FCE8D7" opacity="0.6"/>

          <!-- White Ceramic Bowl -->
          <ellipse cx="170" cy="205" rx="110" ry="52" fill="#D7CCC8"/>
          <ellipse cx="170" cy="195" rx="105" ry="48" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="2"/>

          <!-- Golden Creamy Moong Khichdi Surface -->
          <ellipse cx="170" cy="190" rx="92" ry="40" fill="url(#khichdiGold)"/>

          <!-- Swirling Melting Desi Ghee Dollop -->
          <ellipse cx="170" cy="188" rx="28" ry="14" fill="#FFC107" opacity="0.85"/>
          <ellipse cx="170" cy="186" rx="16" ry="8" fill="#FFF9C4"/>

          <!-- Mustard Seeds & Cumin Tempered on top -->
          <g fill="#212121">
            <circle cx="150" cy="182" r="1.8"/>
            <circle cx="162" cy="178" r="2"/>
            <circle cx="185" cy="180" r="1.8"/>
            <circle cx="195" cy="185" r="2.2"/>
            <circle cx="140" cy="192" r="1.8"/>
            <circle cx="180" cy="198" r="2"/>
          </g>

          <!-- Roasted Spiced Papad Curls (Right) -->
          <g transform="translate(250, 140) rotate(22)">
            <ellipse cx="40" cy="40" rx="55" ry="32" fill="url(#papadCrisp)" stroke="#FFA000" stroke-width="1.2"/>
            <!-- Black Peppercorn Bits on Papad -->
            <circle cx="25" cy="35" r="2.5" fill="#1C1917"/>
            <circle cx="45" cy="30" r="2" fill="#1C1917"/>
            <circle cx="55" cy="42" r="2.5" fill="#1C1917"/>
            <circle cx="35" cy="48" r="2.2" fill="#1C1917"/>
            <!-- Char Blisters -->
            <ellipse cx="30" cy="28" rx="5" ry="2" fill="#4E342E" opacity="0.7"/>
            <ellipse cx="50" cy="45" rx="6" ry="3" fill="#4E342E" opacity="0.6"/>
          </g>

          <!-- Lemon Wedge Accent -->
          <path d="M100 215 C100 200 120 200 120 215 Z" fill="#EEFF41" stroke="#C6FF00" stroke-width="1.5"/>

          <!-- Warm Soothing Steam -->
          <path class="steam-trail steam-1" d="M150 145 Q135 120 155 95 Q165 75 150 50" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
          <path class="steam-trail steam-2" d="M185 140 Q200 115 185 90 Q175 70 190 45" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
        </svg>
      `;

    case 'thepla':
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="theplaGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF9C4"/>
              <stop offset="50%" stop-color="#FFF176"/>
              <stop offset="100%" stop-color="#FBC02D"/>
            </linearGradient>
            <radialGradient id="dahiBowl" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="70%" stop-color="#F5F5F5"/>
              <stop offset="100%" stop-color="#EEEEEE"/>
            </radialGradient>
          </defs>

          <!-- Shadow -->
          <ellipse cx="200" cy="235" rx="170" ry="55" fill="#FCE8D7" opacity="0.6"/>

          <!-- Stack of 3 Methi Theplas -->
          <!-- Thepla 3 (Bottom) -->
          <ellipse cx="140" cy="210" rx="90" ry="46" fill="#F57F17" opacity="0.7"/>
          <!-- Thepla 2 (Middle) -->
          <ellipse cx="140" cy="202" rx="90" ry="46" fill="#FBC02D"/>
          <!-- Thepla 1 (Top Hero) -->
          <ellipse cx="140" cy="192" rx="90" ry="46" fill="url(#theplaGold)" stroke="#F57F17" stroke-width="1.2"/>

          <!-- Fresh Fenugreek (Methi) Specks & Ajwain Seeds -->
          <g fill="#2E7D32">
            <ellipse cx="110" cy="180" rx="4" ry="2" transform="rotate(30 110 180)"/>
            <ellipse cx="130" cy="175" rx="4.5" ry="2.2" transform="rotate(-15 130 175)"/>
            <ellipse cx="160" cy="182" rx="5" ry="2.5" transform="rotate(45 160 182)"/>
            <ellipse cx="120" cy="195" rx="4" ry="2" transform="rotate(-30 120 195)"/>
            <ellipse cx="145" cy="198" rx="4.5" ry="2.2" transform="rotate(10 145 198)"/>
            <ellipse cx="175" cy="195" rx="4" ry="2" transform="rotate(-20 175 195)"/>
            <ellipse cx="135" cy="210" rx="4.2" ry="2" transform="rotate(25 135 210)"/>
            <ellipse cx="160" cy="208" rx="4" ry="1.9" transform="rotate(-10 160 208)"/>
          </g>
          <!-- Golden Freckles from Tawa Roasting -->
          <g fill="#B78103">
            <circle cx="95" cy="185" r="2.5"/>
            <circle cx="150" cy="188" r="3"/>
            <circle cx="170" cy="180" r="2.8"/>
            <circle cx="125" cy="205" r="2.2"/>
            <circle cx="185" cy="202" r="2.5"/>
          </g>

          <!-- Small Katori of Chilled Spiced Dahi (Curd) -->
          <ellipse cx="265" cy="205" rx="70" ry="38" fill="#B0BEC5"/>
          <ellipse cx="265" cy="198" rx="66" ry="35" fill="url(#dahiBowl)" stroke="#CFD8DC" stroke-width="1.5"/>
          <!-- Roasted Cumin Powder Sprinkled on Dahi -->
          <g fill="#6D4C41">
            <circle cx="255" cy="192" r="1.5"/>
            <circle cx="268" cy="190" r="1.8"/>
            <circle cx="275" cy="195" r="1.4"/>
            <circle cx="258" cy="202" r="1.6"/>
            <circle cx="270" cy="205" r="1.5"/>
          </g>
          <!-- Red Chilli Powder Pinch & Dhaniya Leaf -->
          <circle cx="264" cy="196" r="2" fill="#D32F2F"/>
          <path d="M260 194 C263 190 267 191 266 195 Z" fill="#2E7D32"/>

          <!-- Warm Steam -->
          <path class="steam-trail steam-1" d="M130 150 Q115 125 135 100 Q145 80 135 55" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
        </svg>
      `;

    case 'chettinad_pulao':
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="chettinadHandi" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#4E342E"/>
              <stop offset="65%" stop-color="#2D1B16"/>
              <stop offset="100%" stop-color="#140A07"/>
            </radialGradient>
            <radialGradient id="spicedRice" cx="45%" cy="35%" r="55%">
              <stop offset="0%" stop-color="#FFF3E0"/>
              <stop offset="35%" stop-color="#FFE0B2"/>
              <stop offset="75%" stop-color="#FFB74D"/>
              <stop offset="100%" stop-color="#F57C00"/>
            </radialGradient>
          </defs>

          <!-- Shadow -->
          <ellipse cx="200" cy="235" rx="170" ry="55" fill="#FCE8D7" opacity="0.6"/>

          <!-- Brass Handi -->
          <ellipse cx="190" cy="205" rx="125" ry="55" fill="#1C1917"/>
          <ellipse cx="190" cy="195" rx="120" ry="50" fill="url(#chettinadHandi)" stroke="#8D6E63" stroke-width="2"/>

          <!-- Fragrant Spiced Basmati Rice Mound -->
          <ellipse cx="190" cy="188" rx="105" ry="42" fill="url(#spicedRice)"/>

          <!-- Long Basmati Rice Grains -->
          <g fill="#FFFDF8" stroke="#FFE0B2" stroke-width="0.5">
            <ellipse cx="150" cy="175" rx="8" ry="3" transform="rotate(20 150 175)"/>
            <ellipse cx="175" cy="170" rx="9" ry="2.8" transform="rotate(-15 175 170)"/>
            <ellipse cx="205" cy="174" rx="8.5" ry="3" transform="rotate(30 205 174)"/>
            <ellipse cx="230" cy="180" rx="8" ry="2.9" transform="rotate(-25 230 180)"/>
            <ellipse cx="160" cy="190" rx="8" ry="3" transform="rotate(10 160 190)"/>
            <ellipse cx="190" cy="192" rx="9" ry="3.2" transform="rotate(-10 190 192)"/>
            <ellipse cx="220" cy="195" rx="8.5" ry="3" transform="rotate(15 220 195)"/>
          </g>

          <!-- Star Anise (Chakra Phool) Hero -->
          <g transform="translate(190, 172) scale(0.9)">
            <path d="M0 -14 L4 -4 L14 -4 L6 2 L10 12 L0 6 L-10 12 L-6 2 L-14 -4 L-4 -4 Z" fill="#3E2723" stroke="#5D4037" stroke-width="1"/>
            <circle cx="0" cy="0" r="3" fill="#D7CCC8"/>
          </g>

          <!-- Curry Leaves (Kadi Patta) -->
          <path d="M140 185 C148 178 158 182 155 190 C150 186 142 188 140 185 Z" fill="#2E7D32"/>
          <path d="M215 188 C225 180 235 184 230 192 C224 189 218 190 215 188 Z" fill="#2E7D32"/>

          <!-- Fried Cashews -->
          <ellipse cx="168" cy="180" rx="7" ry="4" fill="#FFE082" stroke="#FFB300" stroke-width="1" transform="rotate(35 168 180)"/>
          <ellipse cx="218" cy="182" rx="7" ry="4" fill="#FFE082" stroke="#FFB300" stroke-width="1" transform="rotate(-25 218 182)"/>

          <!-- Whole Black Peppercorns -->
          <circle cx="155" cy="182" r="2.2" fill="#1C1917"/>
          <circle cx="182" cy="188" r="2.4" fill="#1C1917"/>
          <circle cx="205" cy="185" r="2.2" fill="#1C1917"/>

          <!-- Steam -->
          <path class="steam-trail steam-1" d="M170 140 Q155 115 175 90 Q185 70 170 45" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
          <path class="steam-trail steam-2" d="M205 135 Q220 110 205 85 Q195 65 210 40" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
        </svg>
      `;

    case 'dum_aloo':
    default:
      return `
        <svg viewBox="0 0 400 320" class="dish-illustration-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="kashmiriRuby" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stop-color="#E53935"/>
              <stop offset="45%" stop-color="#C62828"/>
              <stop offset="85%" stop-color="#8E0000"/>
              <stop offset="100%" stop-color="#4A0000"/>
            </radialGradient>
            <radialGradient id="babyPotato" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFE082"/>
              <stop offset="60%" stop-color="#FFB300"/>
              <stop offset="100%" stop-color="#E65100"/>
            </radialGradient>
          </defs>

          <!-- Shadow -->
          <ellipse cx="200" cy="235" rx="170" ry="55" fill="#FCE8D7" opacity="0.6"/>

          <!-- Kashmiri Copper Handi -->
          <ellipse cx="180" cy="205" rx="120" ry="54" fill="#3E2723"/>
          <ellipse cx="180" cy="195" rx="115" ry="49" fill="#BF360C" stroke="#FFAB91" stroke-width="2"/>

          <!-- Glossy Crimson Spiced Yogurt Gravy -->
          <ellipse cx="180" cy="190" rx="98" ry="40" fill="url(#kashmiriRuby)"/>

          <!-- Crisp Pricked Baby Potatoes -->
          <g>
            <!-- Potato 1 -->
            <ellipse cx="145" cy="180" rx="18" ry="14" fill="url(#babyPotato)" stroke="#BF360C" stroke-width="1"/>
            <!-- Fork pricks on potato -->
            <circle cx="140" cy="176" r="1" fill="#795548"/>
            <circle cx="148" cy="178" r="1" fill="#795548"/>
            <circle cx="144" cy="184" r="1" fill="#795548"/>

            <!-- Potato 2 -->
            <ellipse cx="185" cy="175" rx="20" ry="15" fill="url(#babyPotato)" stroke="#BF360C" stroke-width="1"/>
            <circle cx="180" cy="172" r="1" fill="#795548"/>
            <circle cx="190" cy="174" r="1" fill="#795548"/>
            <circle cx="184" cy="180" r="1" fill="#795548"/>

            <!-- Potato 3 -->
            <ellipse cx="165" cy="198" rx="19" ry="14" fill="url(#babyPotato)" stroke="#BF360C" stroke-width="1"/>
            <circle cx="160" cy="195" r="1" fill="#795548"/>
            <circle cx="170" cy="196" r="1" fill="#795548"/>

            <!-- Potato 4 -->
            <ellipse cx="208" cy="192" rx="17" ry="13" fill="url(#babyPotato)" stroke="#BF360C" stroke-width="1"/>
            <circle cx="205" cy="190" r="1" fill="#795548"/>
          </g>

          <!-- Green Cardamom Pod Floating -->
          <path d="M125 192 C130 186 136 188 134 195 C129 198 124 196 125 192 Z" fill="#689F38"/>

          <!-- Fennel (Saunf) and Ginger Powder Garnish Dusting -->
          <circle cx="175" cy="188" r="3" fill="#FFF9C4" opacity="0.8"/>
          <circle cx="195" cy="185" r="3.5" fill="#FFF9C4" opacity="0.75"/>

          <!-- Warm Steam -->
          <path class="steam-trail steam-1" d="M165 145 Q150 120 170 95 Q180 75 165 50" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
          <path class="steam-trail steam-2" d="M195 140 Q210 115 195 90 Q185 70 200 45" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
        </svg>
      `;
  }
}
