/* ══════════════════════════════════════════
     EGG PAGE
  ══════════════════════════════════════════ */
  const EGG_TOTAL = 20; // total number of endings

  function allEndingsUnlocked() {
    const keys = ['end_good1','end_good2','end_bad1','end_bad2','end_special1','end_bad4',
      'rice_bad1','rice_bad2','rice_bad3','rice_good1','rice_good2','rice_good3','rice_good4',
      'farmer_bad1','farmer_bad2','farmer_bad3','farmer_bad4','farmer_good1','farmer_good2','farmer_good3'];
    return keys.every(k => localStorage.getItem(k) === 'true');
  }

  function initEggPage() {
    const isZh = gameLang === 'zh';
    const unlocked = allEndingsUnlocked();

    document.getElementById('eggLocked').style.display   = unlocked ? 'none'  : 'flex'; // fixed overlay
    document.getElementById('eggUnlocked').style.display = unlocked ? 'block' : 'none';

    // Update language text
    document.querySelectorAll('#eggBox [data-zh]').forEach(el => {
      el.innerHTML = isZh ? el.getAttribute('data-zh') : el.getAttribute('data-en');
    });

    if (!unlocked) return;

    // Bind wallpaper downloads (cloneNode avoids re-binding listeners)
    document.querySelectorAll('.egg-wallpaper-card').forEach(card => {
      const fresh = card.cloneNode(true);
      card.parentNode.replaceChild(fresh, card);
      fresh.addEventListener('click', () => {
        const src  = fresh.dataset.src;
        const name = fresh.dataset.name;
        const a = document.createElement('a');
        a.href = src; a.download = name; a.click();
      });
    });
  }

  window.addEventListener('languageChanged', () => {
    if (currentPage === 'egg') initEggPage();
  });