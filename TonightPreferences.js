/** aaj. lightweight, skippable tonight settings; not an allergy-safety feature. */
import { getKitchenPreferences, saveKitchenPreferences } from '../data/kitchenPreferences.js';

const CSS = `
.aaj-prefs-overlay{position:fixed;inset:0;background:rgba(32,23,14,.51);backdrop-filter:blur(8px);display:grid;place-items:center;padding:14px;z-index:350;font-family:var(--font-sans);color:var(--color-text-primary)}
.aaj-prefs-sheet{width:min(100%,510px);background:#fffcf7;border-radius:28px;box-shadow:0 24px 70px rgba(28,22,10,.25);padding:26px;display:flex;flex-direction:column;gap:18px;max-height:min(760px,94dvh);overflow-y:auto}
.aaj-prefs-heading{display:flex;gap:15px;align-items:flex-start;justify-content:space-between}.aaj-prefs-heading h2{font:700 clamp(1.6rem,4vw,2.1rem)/1.15 var(--font-display);margin:5px 0}.aaj-prefs-heading p{font-size:.88rem;line-height:1.45;color:var(--color-text-secondary);margin:0}
.aaj-prefs-close{background:#fff;border:1px solid #dfd7cb;width:42px;height:42px;border-radius:50%;flex-shrink:0;font-size:1.4rem;cursor:pointer}
.aaj-prefs-eyebrow{font-size:.7rem;font-weight:800;letter-spacing:.1em;color:#b13a2f;text-transform:uppercase}
.aaj-prefs-field{margin:0;padding:0;border:0;min-width:0}.aaj-prefs-field legend{font-weight:800;margin-bottom:9px;font-size:.94rem}.aaj-prefs-options{display:flex;flex-wrap:wrap;gap:8px}
.aaj-prefs-option{border:1.5px solid #dfd8c9;border-radius:999px;background:#fff;padding:10px 14px;font:700 .87rem var(--font-sans);min-height:45px;cursor:pointer;color:var(--color-text-primary)}
.aaj-prefs-option[aria-pressed=true]{background:#16423c;color:#fff;border-color:#16423c}
.aaj-prefs-note{font-size:.78rem;line-height:1.55;color:var(--color-text-secondary);background:#fff2e8;border-radius:12px;padding:12px 14px;margin:0}
.aaj-prefs-save{border:0;border-radius:999px;background:linear-gradient(130deg,#ff5a5f,#da3338);color:white;font:800 1.03rem var(--font-sans);min-height:52px;cursor:pointer;box-shadow:0 8px 24px rgba(220,49,60,.22)}
.aaj-prefs-option:focus-visible,.aaj-prefs-close:focus-visible,.aaj-prefs-save:focus-visible{outline:3px solid #8c75bb;outline-offset:3px}
@media(max-width:520px){.aaj-prefs-overlay{padding:0;align-items:end}.aaj-prefs-sheet{width:100%;border-radius:24px 24px 0 0;max-height:94dvh;padding:20px 18px calc(18px + env(safe-area-inset-bottom,0px))}.aaj-prefs-options{gap:6px}.aaj-prefs-option{flex:1;min-width:67px;font-size:.8rem;padding:8px 9px}}
@media(prefers-reduced-motion:reduce){.aaj-prefs-overlay *{animation:none!important;transition:none!important}}
`;

export function renderTonightPreferences({ onSaved = () => {}, onClose = () => {} } = {}) {
  if (!document.querySelector('#aaj-prefs-css')) {
    const st=document.createElement('style');st.id='aaj-prefs-css';st.textContent=CSS;document.head.appendChild(st);
  }
  let selection={...getKitchenPreferences()};
  const overlay=document.createElement('div');
  overlay.className='aaj-prefs-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label',"Tonight's cooking preferences");
  const field=(name,label,options)=>`<fieldset class="aaj-prefs-field"><legend>${label}</legend><div class="aaj-prefs-options">${options.map(o=>`<button type="button" class="aaj-prefs-option" data-field="${name}" data-value="${o.value}" aria-pressed="${String(selection[name]===o.value)}">${o.label}</button>`).join('')}</div></fieldset>`;
  overlay.innerHTML=`<section class="aaj-prefs-sheet">
    <header class="aaj-prefs-heading"><div><span class="aaj-prefs-eyebrow">Tonight, made easier</span><h2>Make dinner fit your evening.</h2><p>Just three choices. We'll use them to narrow down what to cook.</p></div><button type="button" class="aaj-prefs-close" aria-label="Close preferences">×</button></header>
    ${field('diet','What do you eat?',[{value:'vegetarian',label:'🥬 Vegetarian'},{value:'eggs_ok',label:'🥚 Eggs OK'}])}
    ${field('maxTimeMinutes','How long do you have?',[{value:0,label:'Any time'},{value:15,label:'15 min'},{value:25,label:'25 min'},{value:40,label:'40 min'}])}
    ${field('people','Cooking for',[{value:1,label:'1'},{value:2,label:'2'},{value:3,label:'3'},{value:4,label:'4 people'}])}
    <p class="aaj-prefs-note">⏱ Cooking times are estimates. Recipe quantities are not automatically scaled; check servings before cooking. Dietary choice is not an allergy guarantee.</p>
    <button type="button" class="aaj-prefs-save">Find my dinner →</button>
  </section>`;
  let closed=false;
  function close() {if(closed)return;closed=true;document.removeEventListener('keydown',keyHandler);overlay.remove();onClose();}
  function keyHandler(e){if(e.key==='Escape'){e.preventDefault();close();}}
  document.addEventListener('keydown',keyHandler);
  overlay.addEventListener('click',e=>{
    if(e.target===overlay||e.target.closest('.aaj-prefs-close')){close();return;}
    const button=e.target.closest('[data-field]');
    if(button){
      const field=button.dataset.field;
      selection[field]=field==='diet'?button.dataset.value:Number(button.dataset.value);
      overlay.querySelectorAll(`[data-field="${field}"]`).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    }
    if(e.target.closest('.aaj-prefs-save')){
      const saved=saveKitchenPreferences(selection);close();onSaved(saved);
    }
  });
  requestAnimationFrame(()=>overlay.querySelector('.aaj-prefs-close')?.focus({preventScroll:true}));
  return overlay;
}
