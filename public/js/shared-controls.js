let isMusicOn = true;

function getPathPrefix() {
  const pathname = window.location.pathname;
  const pagesIndex = pathname.indexOf('/pages');
  const afterPages = pathname.substring(pagesIndex + 6);
  const slashCount = (afterPages.match(/\//g) || []).length;
  
  let prefix = '';
  for (let i = 0; i < slashCount; i++) {
    prefix += '../';
  }
  return prefix + 'public/menu/';
}

(function() {
  const path = window.location.pathname;
  if (!path.includes('menu/') && !path.includes('index.html') && path !== '/') {
    localStorage.setItem('currentGamePage', window.location.href);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const musicBtn = document.getElementById('musicBtn');
  const langBtn = document.getElementById('langBtn');
  const langText = document.getElementById('langText');
  const alignBtn = document.getElementById('alignBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const alignIcon = document.getElementById('alignIcon');
  const backBtn = document.getElementById('backToGameBtn');

  if (alignIcon) {
    alignIcon.style.display = 'block';
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', function() {
      isMusicOn = !isMusicOn;
      const icon = document.getElementById('musicIcon');
      const prefix = getPathPrefix();
      if (icon) {
        icon.src = isMusicOn ? prefix + 'music.svg' : prefix + 'music-slash.svg';
      }
    });
  }

  if (alignBtn && sidebar && sidebarOverlay) {
    alignBtn.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('show');
      let closeIcon = document.getElementById('closeIcon');
      
      if (sidebar.classList.contains('open')) {
        if (alignIcon) alignIcon.style.display = 'none';
        if (!closeIcon) {
          closeIcon = document.createElement('img');
          closeIcon.id = 'closeIcon';
          closeIcon.src = getPathPrefix() + 'cross.svg';
          closeIcon.alt = 'Close menu';
          closeIcon.style.width = '24px';
          closeIcon.style.height = '24px';
          alignBtn.appendChild(closeIcon);
        } else {
          closeIcon.style.display = 'inline';
        }
      } else {
        if (alignIcon) alignIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
      }
    });

    sidebarOverlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('show');
      if (alignIcon) alignIcon.style.display = 'block';
      const closeIcon = document.getElementById('closeIcon');
      if (closeIcon) closeIcon.style.display = 'none';
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', (event) => {
      const lastSavedPage = localStorage.getItem('currentGamePage');
      if (lastSavedPage) {
        event.preventDefault();
        window.location.href = lastSavedPage;
      }
    });
  }

  function applyLanguage(lang) {
    localStorage.setItem('gameLanguage', lang);

    if (langText) {
      langText.innerText = (lang === 'zh') ? 'EN' : 'ZH';
    }

    document.querySelectorAll('[data-zh]').forEach(el => {
      el.innerText = el.getAttribute(`data-${lang}`);
    });

    const langEvent = new CustomEvent('languageChanged', { detail: { lang: lang } });
    window.dispatchEvent(langEvent);
  }

  const savedLang = localStorage.getItem('gameLanguage') || 'zh';
  applyLanguage(savedLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {


      const currentLang = localStorage.getItem('gameLanguage') || 'zh';
      const nextLang = (currentLang === 'zh') ? 'en' : 'zh';
      applyLanguage(nextLang);
    });
  }
});