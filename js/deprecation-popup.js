/**
 * Mediawegwijs - Verhuismelding
 * Geforceerde pop-up die bezoekers doorverwijst naar https://mwwvakdocent.nl.
 * Volledig zelfstandig: injecteert eigen CSS en is niet afhankelijk van
 * externe stylesheets, Tailwind of andere CDN-bestanden.
 */
(function () {
  'use strict';

  var NEW_SITE_URL = 'https://mwwvakdocent.nl';
  var BYPASS_KEY = 'mww-deprecation-bypass';
  var BYPASS_CODE = '1115';
  var OVERLAY_ID = 'deprecationOverlay';
  var STYLE_ID = 'deprecationStyles';

  function hasBypass() {
    try {
      return window.sessionStorage.getItem(BYPASS_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  if (hasBypass()) return;

  var O = '#' + OVERLAY_ID;
  var CSS = [
    'html.mww-deprecation-lock, html.mww-deprecation-lock body { overflow: hidden !important; }',
    O + ' {',
    '  position: fixed !important; inset: 0 !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;',
    '  width: 100vw !important; height: 100vh !important; height: 100dvh !important;',
    '  margin: 0 !important; padding: 16px !important; box-sizing: border-box !important;',
    '  z-index: 2147483647 !important;',
    '  display: flex !important; align-items: center !important; justify-content: center !important;',
    '  background: rgba(15, 23, 42, 0.55) !important;',
    '  -webkit-backdrop-filter: blur(10px) !important; backdrop-filter: blur(10px) !important;',
    '  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif !important;',
    '  -webkit-user-select: text !important; user-select: text !important;',
    '  overflow-y: auto !important;',
    '}',
    O + ' *, ' + O + ' *::before, ' + O + ' *::after { box-sizing: border-box !important; }',
    O + ' .mwwdp-card {',
    '  position: relative !important; width: 100% !important; max-width: 440px !important; margin: auto !important;',
    '  background: #ffffff !important; color: #1e293b !important;',
    '  border-radius: 24px !important; padding: 32px 28px 24px !important;',
    '  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.25) !important;',
    '  text-align: center !important;',
    '}',
    O + ' .mwwdp-title {',
    '  margin: 0 0 12px !important; padding: 0 !important; font-size: 24px !important; line-height: 1.25 !important;',
    '  font-weight: 800 !important; color: #0f172a !important;',
    '}',
    O + ' .mwwdp-text {',
    '  margin: 0 0 24px !important; padding: 0 !important; font-size: 16px !important; line-height: 1.5 !important;',
    '  font-weight: 400 !important; color: #475569 !important;',
    '}',
    O + ' .mwwdp-text strong { font-weight: 700 !important; color: #0f172a !important; }',
    O + ' .mwwdp-primary {',
    '  display: block !important; width: 100% !important; margin: 0 !important; padding: 16px 20px !important;',
    '  background: #4f46e5 !important; color: #ffffff !important; border: 0 !important; border-radius: 16px !important;',
    '  font-size: 18px !important; font-weight: 700 !important; line-height: 1.2 !important;',
    '  text-decoration: none !important; text-align: center !important; cursor: pointer !important;',
    '  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4) !important;',
    '}',
    O + ' .mwwdp-primary:hover { background: #4338ca !important; }',
    O + ' .mwwdp-primary:focus-visible, ' + O + ' .mwwdp-link:focus-visible, ' +
      O + ' .mwwdp-confirm:focus-visible, ' + O + ' .mwwdp-input:focus-visible {',
    '  outline: 3px solid #a5b4fc !important; outline-offset: 2px !important;',
    '}',
    O + ' .mwwdp-link {',
    '  display: inline-block !important; margin: 16px 0 0 !important; padding: 4px !important;',
    '  background: none !important; border: 0 !important; color: #64748b !important;',
    '  font-family: inherit !important; font-size: 13px !important; font-weight: 500 !important;',
    '  text-decoration: underline !important; cursor: pointer !important;',
    '}',
    O + ' .mwwdp-link:hover { color: #334155 !important; }',
    O + ' .mwwdp-admin {',
    '  display: block !important; margin: 16px 0 0 !important; padding: 16px 0 0 !important;',
    '  border-top: 1px solid #e2e8f0 !important; text-align: left !important;',
    '}',
    O + ' .mwwdp-admin[hidden] { display: none !important; }',
    O + ' .mwwdp-label {',
    '  display: block !important; margin: 0 0 6px !important; font-size: 13px !important;',
    '  font-weight: 600 !important; color: #334155 !important;',
    '}',
    O + ' .mwwdp-row { display: flex !important; gap: 8px !important; }',
    O + ' .mwwdp-input {',
    '  flex: 1 1 auto !important; min-width: 0 !important; margin: 0 !important; padding: 10px 12px !important;',
    '  background: #f8fafc !important; color: #0f172a !important; border: 2px solid #cbd5e1 !important; border-radius: 12px !important;',
    '  font-family: inherit !important; font-size: 16px !important; outline: none;',
    '  -webkit-user-select: text !important; user-select: text !important;',
    '}',
    O + ' .mwwdp-input:focus { border-color: #4f46e5 !important; background: #ffffff !important; }',
    O + ' .mwwdp-confirm {',
    '  flex: 0 0 auto !important; margin: 0 !important; padding: 10px 16px !important;',
    '  background: #0f172a !important; color: #ffffff !important; border: 0 !important; border-radius: 12px !important;',
    '  font-family: inherit !important; font-size: 15px !important; font-weight: 700 !important; cursor: pointer !important;',
    '}',
    O + ' .mwwdp-error {',
    '  margin: 8px 0 0 !important; padding: 0 !important; font-size: 13px !important;',
    '  font-weight: 600 !important; color: #e11d48 !important;',
    '}',
    O + ' .mwwdp-error:empty { display: none !important; }'
  ].join('\n');

  var overlay = null;
  var observer = null;
  var inertedElements = [];
  var dismissed = false;

  function injectStyles() {
    var style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = CSS;
    }
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    // Altijd (opnieuw) als laatste in <head> zetten zodat latere stylesheets niets overschrijven.
    head.appendChild(style);
  }

  function lockPage() {
    document.documentElement.classList.add('mww-deprecation-lock');
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    if (document.body) document.body.style.setProperty('overflow', 'hidden', 'important');
  }

  function unlockPage() {
    document.documentElement.classList.remove('mww-deprecation-lock');
    document.documentElement.style.removeProperty('overflow');
    if (document.body) document.body.style.removeProperty('overflow');
  }

  function blockElement(el) {
    if (!el || el === overlay || el.nodeType !== 1) return;
    var tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK' || tag === 'TEMPLATE') return;
    for (var i = 0; i < inertedElements.length; i++) {
      if (inertedElements[i].el === el) return;
    }
    inertedElements.push({
      el: el,
      hadInert: el.hasAttribute('inert'),
      ariaHidden: el.getAttribute('aria-hidden')
    });
    el.setAttribute('inert', '');
    el.setAttribute('aria-hidden', 'true');
  }

  function blockBackground() {
    if (!document.body) return;
    Array.prototype.forEach.call(document.body.children, blockElement);
  }

  function unblockBackground() {
    inertedElements.forEach(function (entry) {
      if (!entry.hadInert) entry.el.removeAttribute('inert');
      if (entry.ariaHidden === null) entry.el.removeAttribute('aria-hidden');
      else entry.el.setAttribute('aria-hidden', entry.ariaHidden);
    });
    inertedElements = [];
  }

  function getFocusable() {
    if (!overlay) return [];
    var nodes = overlay.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
    return Array.prototype.filter.call(nodes, function (n) {
      return !n.closest('[hidden]');
    });
  }

  function focusPrimary() {
    var primary = overlay && overlay.querySelector('#deprecationPrimary');
    if (primary) primary.focus();
  }

  function onKeyDown(e) {
    if (!overlay) return;
    var key = e.key;
    if (key === 'Escape' || key === 'Esc') {
      e.preventDefault();
    } else if (key === 'Tab') {
      var focusable = getFocusable();
      var active = document.activeElement;
      if (!focusable.length) {
        e.preventDefault();
      } else if (!overlay.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? focusable[focusable.length - 1] : focusable[0]).focus();
      } else if (e.shiftKey && active === focusable[0]) {
        e.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!e.shiftKey && active === focusable[focusable.length - 1]) {
        e.preventDefault();
        focusable[0].focus();
      }
    } else if (!overlay.contains(e.target)) {
      e.preventDefault();
    }
    // Voorkom dat sneltoetsen van de site zelf worden uitgevoerd.
    e.stopImmediatePropagation();
  }

  function onFocusIn(e) {
    if (overlay && !overlay.contains(e.target)) focusPrimary();
  }

  function build() {
    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.innerHTML =
      '<div class="mwwdp-card" role="dialog" aria-modal="true" aria-labelledby="deprecationTitle" aria-describedby="deprecationText">' +
        '<h2 class="mwwdp-title" id="deprecationTitle">Deze website is verhuisd</h2>' +
        '<p class="mwwdp-text" id="deprecationText">Deze website wordt niet meer onderhouden. Ga naar onze nieuwe website: <strong>mwwvakdocent.nl</strong></p>' +
        '<a class="mwwdp-primary" id="deprecationPrimary" href="' + NEW_SITE_URL + '">Ga naar mwwvakdocent.nl</a>' +
        '<button type="button" class="mwwdp-link" id="deprecationClose" aria-expanded="false" aria-controls="deprecationAdmin">Sluiten / oude website gebruiken</button>' +
        '<form class="mwwdp-admin" id="deprecationAdmin" hidden novalidate>' +
          '<label class="mwwdp-label" for="deprecationCode">Beheerderscode</label>' +
          '<div class="mwwdp-row">' +
            '<input class="mwwdp-input" id="deprecationCode" type="password" inputmode="numeric" autocomplete="off" />' +
            '<button type="submit" class="mwwdp-confirm">Bevestigen</button>' +
          '</div>' +
          '<p class="mwwdp-error" id="deprecationError" role="alert"></p>' +
        '</form>' +
      '</div>';

    var closeLink = overlay.querySelector('#deprecationClose');
    var adminForm = overlay.querySelector('#deprecationAdmin');
    var codeInput = overlay.querySelector('#deprecationCode');
    var errorEl = overlay.querySelector('#deprecationError');

    closeLink.addEventListener('click', function () {
      adminForm.hidden = false;
      closeLink.setAttribute('aria-expanded', 'true');
      codeInput.focus();
    });

    adminForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (codeInput.value === BYPASS_CODE) {
        try { window.sessionStorage.setItem(BYPASS_KEY, '1'); } catch (err) { /* sessionStorage niet beschikbaar */ }
        close();
      } else {
        errorEl.textContent = 'Onjuiste code. Probeer het opnieuw.';
        codeInput.value = '';
        codeInput.focus();
      }
    });

    // Klikken op de achtergrond sluit de pop-up bewust NIET.
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    return overlay;
  }

  function open() {
    if (dismissed || (overlay && overlay.parentNode)) return;
    injectStyles();
    lockPage();
    build();
    document.body.appendChild(overlay);
    blockBackground();

    if (window.MutationObserver) {
      observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          Array.prototype.forEach.call(m.addedNodes, blockElement);
        });
      });
      observer.observe(document.body, { childList: true });
    }

    window.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('focusin', onFocusIn, true);
    focusPrimary();
  }

  function close() {
    dismissed = true;
    window.removeEventListener('keydown', onKeyDown, true);
    document.removeEventListener('focusin', onFocusIn, true);
    if (observer) { observer.disconnect(); observer = null; }
    unblockBackground();
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
    unlockPage();
  }

  injectStyles();
  lockPage();

  if (document.body) open();

  document.addEventListener('DOMContentLoaded', function () {
    if (dismissed) return;
    if (!overlay) {
      open();
      return;
    }
    injectStyles();
    lockPage();
    blockBackground();
    if (!overlay.contains(document.activeElement)) focusPrimary();
  });
})();
