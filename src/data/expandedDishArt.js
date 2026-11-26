/**
 * Lightweight, original recipe-category illustration fallback.
 * The original project contains 3D artwork for four dishes only. These
 * illustrated placeholders avoid showing an unrelated Dum Aloo picture for
 * every expanded recipe. They are NOT photographs or 3D renders.
 */
export function getExpandedDishSvg(dish) {
  const id = dish.id || '';
  const name = dish.name || '';
  const k = id + ' ' + name.toLowerCase();
  const colorGroups = [
    ['#F5BA45','#F9DD87','#BD6A27'], ['#D9864B','#F6BB78','#A74B28'],
    ['#83A849','#D3E88B','#3A743E'], ['#BD6A3D','#E0AE6D','#7E392D'],
    ['#DF9A44','#FFE39A','#9A6727'], ['#C66B4D','#F8BE72','#933A36']
  ];
  const seed = [...id].reduce((n, c) => (n * 33 + c.charCodeAt(0)) >>> 0, 7);
  const [main,light,dark] = colorGroups[seed % colorGroups.length];
  const breads = /paratha|roti|makki|chilla|pav|bhature/.test(k);
  const rice = /rice|chawal|pulao|poha/.test(k);
  const lentil = /dal|sambar|kadhi/.test(k);
  const paneer = /paneer/.test(k);
  const greens = /saag|bhindi|palak|mixed.veg/.test(k);
  const chaat = /dahi.vada|chaat/.test(k);
  const dishType = chaat ? 'chaat' : paneer ? 'paneer' : rice ? 'rice' : lentil ? 'dal' : greens ? 'greens' : breads ? 'bread' : 'curry';

  const bowl = `<ellipse cx="200" cy="228" rx="124" ry="43" fill="#7B4E33" opacity=".16"/>
    <ellipse cx="200" cy="193" rx="123" ry="68" fill="url(#outer-${seed})" stroke="#B77E4C" stroke-width="4"/>
    <ellipse cx="200" cy="184" rx="109" ry="54" fill="url(#food-${seed})"/>
    <path d="M90 197 Q200 250 310 197 L295 232 Q200 272 105 232 Z" fill="url(#bowl-${seed})" opacity=".9"/>`;
  const splotches = Array.from({length:17},(_,i)=>{
    const a=(i*137 + seed%63)*Math.PI/180, r=13+(i*29)%77;
    const x=200+Math.cos(a)*r, y=186+Math.sin(a)*r*.46;
    const rad=3+(i*5)%6;
    const fill = i%5===0?'#4C823E': i%4===0?'#CE4F3E': i%3===0?light:'#FBE9A7';
    return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rad}" ry="${(rad*.7).toFixed(1)}" fill="${fill}" opacity=".92"/>`;
  }).join('');
  const breadStack = Array.from({length:3},(_,i)=>{
    const y=185-i*10;
    return `<ellipse cx="200" cy="${y}" rx="108" ry="42" fill="url(#bread-${seed})" stroke="#B46D35" stroke-width="3"/>`+
      Array.from({length:7},(_,j)=>`<ellipse cx="${138+j*20+(i%2)*3}" cy="${y-8+((j*3)%11)}" rx="${4+j%3}" ry="${2+j%2}" fill="#986331" opacity=".46"/>`).join('');
  }).join('');
  const paneerCubes = Array.from({length:12},(_,i)=>{
    const x=123+(i*37)%152, y=165+(i*23)%50;
    return `<rect x="${x}" y="${y}" width="20" height="14" rx="3" fill="#FFF1BC" stroke="#DEA651" stroke-width="1.4" transform="rotate(${(i%5-2)*7} ${x+10} ${y+7})"/>`;
  }).join('');
  const leafSprigs = `<path d="M180 174 Q213 169 236 185" stroke="#3F793E" stroke-width="3" fill="none"/>
      <ellipse cx="189" cy="172" rx="10" ry="5" transform="rotate(-30 189 172)" fill="#448D4C"/>
      <ellipse cx="213" cy="177" rx="11" ry="5" transform="rotate(35 213 177)" fill="#5FA752"/>`;
  let food = bowl+splotches+leafSprigs;
  if (dishType==='bread') food = breadStack+`<ellipse cx="289" cy="212" rx="35" ry="25" fill="#DDA86D"/><ellipse cx="289" cy="208" rx="30" ry="18" fill="#FAF7DF"/>`;
  if (dishType==='paneer') food = bowl+paneerCubes+leafSprigs;
  if (dishType==='rice') food = bowl+Array.from({length:38},(_,i)=>{
    const a=(i*139+seed%20)*Math.PI/180, r=(i*13)%102;
    return `<ellipse cx="${(200+Math.cos(a)*r).toFixed(1)}" cy="${(182+Math.sin(a)*r*.42).toFixed(1)}" rx="5" ry="2.2" transform="rotate(${i*31%150} ${200+Math.cos(a)*r} ${182+Math.sin(a)*r*.42})" fill="#FFF6CE" opacity=".9"/>`;
  }).join('')+leafSprigs;
  if (dishType==='greens') food=bowl+Array.from({length:14},(_,i)=>{
    const x=130+(i*31)%142,y=150+(i*23)%64;
    return `<ellipse cx="${x}" cy="${y}" rx="16" ry="9" transform="rotate(${i*53%180} ${x} ${y})" fill="${i%2?'#4D9644':'#8CBC57'}" opacity=".93"/>`;
  }).join('');
  if (dishType==='chaat') food=bowl+Array.from({length:6},(_,i)=>{
    const x=137+(i%3)*58,y=171+Math.floor(i/3)*29;
    return `<ellipse cx="${x}" cy="${y}" rx="24" ry="15" fill="#FFF9E8" stroke="#F4DAB2" stroke-width="2"/><path d="M${x-14} ${y} Q${x} ${y-12} ${x+15} ${y}" stroke="#7DA348" stroke-width="4" fill="none"/>`;
  }).join('');
  const typeLabel = {bread:'Flatbreads',rice:'Rice bowl',dal:'Dal & stew',paneer:'Paneer curry',greens:'Fresh vegetables',chaat:'Chaat',curry:'Home-style curry'}[dishType];
  return `<svg viewBox="0 0 400 320" class="dish-illustration-svg" role="img" aria-label="Illustrated ${typeLabel}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="outer-${seed}" cx="42%" cy="34%" r="75%"><stop stop-color="#F9DCA7"/><stop offset=".65" stop-color="#CE9252"/><stop offset="1" stop-color="#925A37"/></radialGradient>
      <radialGradient id="food-${seed}" cx="40%" cy="30%" r="80%"><stop stop-color="${light}"/><stop offset=".66" stop-color="${main}"/><stop offset="1" stop-color="${dark}"/></radialGradient>
      <linearGradient id="bowl-${seed}" x2=".4" y2="1"><stop stop-color="#DCB483"/><stop offset="1" stop-color="#AC6C43"/></linearGradient>
      <radialGradient id="bread-${seed}" cx="48%" cy="37%" r="73%"><stop stop-color="#FFE6A6"/><stop offset=".6" stop-color="#E7B968"/><stop offset="1" stop-color="#B47937"/></radialGradient>
    </defs>
    <ellipse cx="200" cy="248" rx="146" ry="43" fill="#DFAE8A" opacity=".22"/>
    ${food}
    <path d="M238 159 C248 146 242 136 246 124" stroke="#FDF8EA" stroke-width="4" fill="none" opacity=".43"/>
    <path d="M257 157 C270 144 263 135 268 123" stroke="#FDF8EA" stroke-width="3" fill="none" opacity=".3"/>
  </svg>`;
}
