/**
 * aaj. Instamart Shopping Handoff Modal (P2)
 *
 * Builds an editable grocery list from the selected recipe's actual missing essentials,
 * grounded in recipe step quantities where available.
 *
 * Honesty & Integration Status:
 * - Does NOT pretend items were automatically added to an Instamart cart.
 * - Provides "Copy shopping list" and "Shop on Instamart" (opens official Swiggy Instamart).
 */

import { haptics } from './AudioHaptics.js';

const INSTAMART_URL = 'https://www.swiggy.com/instamart';

const SHOP_CSS = `
.sh-overlay {
  position: fixed; inset: 0; z-index: 340;
  background: rgba(24, 18, 12, 0.54);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
  font-family: var(--font-sans); color: var(--color-text-primary);
  animation: pmFadeIn .22s ease-out;
}
.sh-card {
  background: #FEFCF7;
  border-radius: 26px;
  box-shadow: 0 32px 80px rgba(20,14,6,.24);
  width: 100%; max-width: 540px; max-height: 90vh;
  display: flex; flex-direction: column; overflow: hidden;
  border: 1px solid rgba(220,195,155,.35);
  animation: pmSheetUp .28s cubic-bezier(.34,1.56,.64,1);
}
.sh-header {
  padding: 20px 24px 14px;
  display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;
  border-bottom: 1px solid rgba(45,26,18,.07);
}
.sh-pill {
  display: inline-flex; align-items: center; gap: 6px;
  background: #FFF3E0; color: #B45309;
  font-size: .74rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase;
  padding: 4px 11px; border-radius: 20px; margin-bottom: 8px;
}
.sh-title {
  font-family: var(--font-display); font-size: 1.5rem; font-weight: 800;
  margin: 0 0 4px; letter-spacing: -.02em;
}
.sh-sub {
  font-size: .88rem; color: var(--color-text-secondary); margin: 0;
}
.sh-close {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1.5px solid rgba(45,26,18,.14); background: #FFF;
  font-size: 1rem; color: var(--color-text-secondary); cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sh-close:hover { background: #FFF5F5; color: var(--color-tomato-coral); }

.sh-body {
  flex: 1; overflow-y: auto; padding: 18px 24px;
  display: flex; flex-direction: column; gap: 12px;
}
.sh-list {
  display: flex; flex-direction: column; gap: 8px;
}
.sh-item-row {
  display: flex; align-items: center; gap: 10px;
  background: #FFF; border: 1.5px solid rgba(220,195,155,.45);
  border-radius: 14px; padding: 8px 12px;
}
.sh-item-icon { font-size: 1.25rem; flex-shrink: 0; }
.sh-item-input {
  flex: 1; border: none; background: transparent;
  font-family: var(--font-sans); font-size: .92rem; font-weight: 600;
  color: var(--color-text-primary); outline: none; padding: 4px 0;
}
.sh-item-input:focus { border-bottom: 1.5px solid var(--color-tomato-coral); }
.sh-item-remove {
  width: 28px; height: 28px; border-radius: 50%;
  border: none; background: rgba(45,26,18,.06);
  color: var(--color-text-secondary); font-size: .8rem; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.sh-item-remove:hover { background: rgba(220,50,50,.12); color: #C53030; }

.sh-add-row {
  display: flex; gap: 8px; margin-top: 4px;
}
.sh-add-input {
  flex: 1; padding: 9px 14px; border-radius: 50px;
  border: 1.5px dashed rgba(220,195,155,.65); background: #FFF;
  font-family: var(--font-sans); font-size: .86rem; outline: none;
}
.sh-add-input:focus { border-style: solid; border-color: var(--color-herb-leaf); }
.sh-add-btn {
  padding: 9px 16px; border-radius: 50px; border: none;
  background: var(--color-herb-light); color: var(--color-herb-deep);
  font-weight: 700; font-size: .85rem; cursor: pointer;
}
.sh-add-btn:hover { background: #D1E7DD; }

.sh-honesty-note {
  display: flex; align-items: flex-start; gap: 9px;
  padding: 11px 14px; border-radius: 12px;
  background: rgba(255, 243, 224, 0.7); border: 1px solid rgba(217, 119, 6, 0.25);
  font-size: .8rem; color: #78350F; line-height: 1.45;
}

.sh-footer {
  padding: 14px 24px 20px;
  border-top: 1px solid rgba(45,26,18,.07);
  display: flex; flex-wrap: wrap; gap: 10px;
}
.sh-btn-copy {
  flex: 1; min-height: 48px; padding: 0 18px; border-radius: 50px;
  border: 1.5px solid rgba(45,26,18,.18); background: #FFF;
  color: var(--color-text-primary); font: 700 .92rem var(--font-sans);
  cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  transition: all .16s;
}
.sh-btn-copy:hover { border-color: var(--color-herb-leaf); background: #F4FEF6; }
.sh-btn-instamart {
  flex: 1.3; min-height: 48px; padding: 0 22px; border-radius: 50px; border: none;
  background: linear-gradient(135deg, #FC8019, #E85D04);
  color: #FFF; font: 700 .95rem var(--font-sans);
  cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: 0 6px 20px rgba(252, 128, 25, 0.32);
  transition: transform .16s, filter .16s;
  text-decoration: none;
}
.sh-btn-instamart:hover { filter: brightness(1.06); transform: translateY(-1px); }
`;

export function renderShoppingHandoffModal({ dish, onClose }) {
  if (!document.getElementById('aaj-sh-styles')) {
    const s = document.createElement('style');
    s.id = 'aaj-sh-styles';
    s.textContent = SHOP_CSS;
    document.head.appendChild(s);
  }

  const avail = dish.availability || {};
  const initialMissing = avail.missingDetails || [];

  let items = initialMissing.map((m, idx) => ({
    uid: `${m.id}_${idx}`,
    icon: m.icon || '🛒',
    text: m.quantityText || m.name
  }));

  const overlay = document.createElement('div');
  overlay.className = 'sh-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `Shopping list for ${dish.name}`);

  const renderList = () => {
    const listEl = overlay.querySelector('#shList');
    if (!listEl) return;
    if (items.length === 0) {
      listEl.innerHTML = `<div style="text-align:center;padding:18px;color:var(--color-text-tertiary);font-size:.9rem;">All items removed. Add an item below or close.</div>`;
      return;
    }
    listEl.innerHTML = items.map(it => `
      <div class="sh-item-row" data-uid="${it.uid}">
        <span class="sh-item-icon" aria-hidden="true">${it.icon}</span>
        <input type="text" class="sh-item-input" value="${it.text.replace(/"/g, '&quot;')}" data-uid="${it.uid}" aria-label="Edit ingredient" />
        <button type="button" class="sh-item-remove" data-act="remove" data-uid="${it.uid}" aria-label="Remove ${it.text}">✕</button>
      </div>
    `).join('');
  };

  overlay.innerHTML = `
    <div class="sh-card">
      <div class="sh-header">
        <div>
          <span class="sh-pill">🛒 Grocery Handoff</span>
          <h3 class="sh-title">Missing for ${dish.name.split(' with ')[0]}</h3>
          <p class="sh-sub">Edit quantities or remove items you don't need before shopping.</p>
        </div>
        <button type="button" class="sh-close" data-act="close" aria-label="Close">✕</button>
      </div>

      <div class="sh-body">
        <div class="sh-list" id="shList"></div>

        <div class="sh-add-row">
          <input type="text" class="sh-add-input" id="shAddInput" placeholder="+ Add another item (e.g. Fresh Lime)" />
          <button type="button" class="sh-add-btn" data-act="add">Add</button>
        </div>

        <div class="sh-honesty-note">
          <span aria-hidden="true">ℹ️</span>
          <span>
            <strong>Manual Instamart handoff:</strong> aaj. does not have an authorized Swiggy Instamart partner cart API connected, so items are not added to your cart automatically. Copy your list and open Instamart to order.
          </span>
        </div>
      </div>

      <div class="sh-footer">
        <button type="button" class="sh-btn-copy" data-act="copy" id="shCopyBtn">
          <span>📋</span>
          <span>Copy shopping list</span>
        </button>
        <a href="${INSTAMART_URL}" target="_blank" rel="noopener noreferrer" class="sh-btn-instamart" data-act="open-instamart">
          <span>🛍️</span>
          <span>Shop on Instamart</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  `;

  renderList();

  const closeModal = () => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.16s ease-out';
    setTimeout(() => { overlay.remove(); onClose(); }, 160);
  };

  overlay.addEventListener('input', (e) => {
    if (e.target.classList.contains('sh-item-input')) {
      const uid = e.target.dataset.uid;
      items = items.map(it => it.uid === uid ? { ...it, text: e.target.value } : it);
    }
  });

  overlay.addEventListener('click', async (e) => {
    if (e.target === overlay) { closeModal(); return; }
    const target = e.target.closest('[data-act]');
    if (!target) return;
    const act = target.dataset.act;

    if (act === 'close') {
      haptics.tap && haptics.tap();
      closeModal();
    } else if (act === 'remove') {
      haptics.tap && haptics.tap();
      const uid = target.dataset.uid;
      items = items.filter(it => it.uid !== uid);
      renderList();
    } else if (act === 'add') {
      const inp = overlay.querySelector('#shAddInput');
      const val = inp?.value.trim();
      if (val) {
        haptics.pop && haptics.pop();
        items.push({ uid: `custom_${Date.now()}`, icon: '🧺', text: val });
        inp.value = '';
        renderList();
      }
    } else if (act === 'copy') {
      haptics.cookChime && haptics.cookChime();
      const text = `aaj. Shopping List for ${dish.name}:\n` +
        items.map(it => `- ${it.text}`).join('\n');
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for non-HTTPS or restricted clipboard
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      const btn = overlay.querySelector('#shCopyBtn');
      if (btn) {
        btn.innerHTML = '<span>✓</span><span>Copied list!</span>';
        setTimeout(() => {
          btn.innerHTML = '<span>📋</span><span>Copy shopping list</span>';
        }, 2000);
      }
    } else if (act === 'open-instamart') {
      haptics.tap && haptics.tap();
    }
  });

  const keyHandler = (e) => {
    if (e.key === 'Escape') { document.removeEventListener('keydown', keyHandler); closeModal(); }
  };
  document.addEventListener('keydown', keyHandler);

  return overlay;
}
