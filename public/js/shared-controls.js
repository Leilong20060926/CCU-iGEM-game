/* ══════════════════════════════════════════
     SHARED CONTROLS
  ══════════════════════════════════════════ */
  let isMusicOn = true;
  let gameLang  = localStorage.getItem('gameLanguage') || 'en';

  function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const alignIcon = document.getElementById('alignIcon');
    const closeIcon = document.getElementById('closeIcon');
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    if (alignIcon) alignIcon.style.display = 'block';
    if (closeIcon) closeIcon.style.display = 'none';
  }

  function applyLang(lang) {
    gameLang = lang;
    localStorage.setItem('gameLanguage', lang);
    const langText = document.getElementById('langText');
    if (langText) langText.innerText = lang === 'zh' ? 'EN' : 'ZH';
    document.querySelectorAll('[data-zh]').forEach(el => {
      el.innerHTML = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
    });
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    updateCharBtnLang(lang);
  }

  /* This used to be bound to document's DOMContentLoaded event.
     Now that page fragments are injected via fetch, by the time
     they're actually in place and all JS has loaded, index.html's
     loader calls initApp() explicitly instead (DOMContentLoaded has
     already fired by then, so listening for it here would never
     trigger). */
  function initApp() {
    // Init pages hidden
    document.querySelectorAll('.page').forEach(p => { if (!p.classList.contains('active')) p.style.display = 'none'; });

    // ── Dark mode ──
    const darkModeBtn  = document.getElementById('darkModeBtn');
    const darkModeIcon = document.getElementById('darkModeIcon');
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    function applyDarkMode(dark) {
      isDarkMode = dark;
      document.body.classList.toggle('dark-mode', dark);
      darkModeIcon.src = dark ? 'public/menu/sun.svg' : 'public/menu/moon.svg';
      localStorage.setItem('darkMode', dark);
    }

    darkModeBtn.addEventListener('click', () => applyDarkMode(!isDarkMode));
    // Restore state on page load
    applyDarkMode(isDarkMode);

    const musicBtn = document.getElementById('musicBtn');
    const langBtn  = document.getElementById('langBtn');
    const alignBtn = document.getElementById('alignBtn');
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebarOverlay');
    const alignIcon= document.getElementById('alignIcon');

    // Background music
    const bgm = new Audio('public/video/music.mp3');
    bgm.loop = true;
    bgm.volume = 0.5;

    // Try to autoplay; if it fails, wait for the first user interaction
    bgm.play().catch(() => {
      const startBgm = () => {
        if (isMusicOn) bgm.play().catch(()=>{});
        document.removeEventListener('click', startBgm);
        document.removeEventListener('touchstart', startBgm);
      };
      document.addEventListener('click', startBgm);
      document.addEventListener('touchstart', startBgm);
    });

    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent triggering the document click handler
      isMusicOn = !isMusicOn;
      const icon = document.getElementById('musicIcon');
      icon.src = isMusicOn ? 'public/menu/music.svg' : 'public/menu/music-slash.svg';
      if (isMusicOn) { bgm.play().catch(()=>{}); }
      else { bgm.pause(); }
    });

    alignBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
      let closeIcon = document.getElementById('closeIcon');
      if (sidebar.classList.contains('open')) {
        alignIcon.style.display = 'none';
        if (!closeIcon) {
          closeIcon = document.createElement('img');
          closeIcon.id = 'closeIcon'; closeIcon.src = 'public/menu/cross.svg';
          closeIcon.alt = 'Close'; closeIcon.style.width = '24px'; closeIcon.style.height = '24px';
          alignBtn.appendChild(closeIcon);
        } else { closeIcon.style.display = 'inline'; }
      } else {
        alignIcon.style.display = 'block';
        const ci = document.getElementById('closeIcon');
        if (ci) ci.style.display = 'none';
      }
    });

    overlay.addEventListener('click', closeSidebar);

    langBtn.addEventListener('click', () => {
      if (globalTypewriterTimer1) { clearTimeout(globalTypewriterTimer1); globalTypewriterTimer1 = null; }
      if (globalTypewriterTimer2) { clearTimeout(globalTypewriterTimer2); globalTypewriterTimer2 = null; }
      if (globalTypewriterTimer3) { clearTimeout(globalTypewriterTimer3); globalTypewriterTimer3 = null; }
      applyLang(gameLang === 'zh' ? 'en' : 'zh');
    });

    applyLang(gameLang);
    initIndexPage();
  }
  window.initApp = initApp;