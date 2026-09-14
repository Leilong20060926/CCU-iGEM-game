/* ══════════════════════════════════════════
     INDEX PAGE
  ══════════════════════════════════════════ */
  function initIndexPage() {
    const startBtn = document.getElementById('startBtn');
    const gameTipOverlay  = document.getElementById('gameTipOverlay');
    const gameTipOverlay2 = document.getElementById('gameTipOverlay2');
    const tipArrow1 = document.getElementById('tipArrow1');
    const tipArrow2 = document.getElementById('tipArrow2');
    const homepageScene = document.getElementById('homepageScene');
    const characterScene= document.getElementById('characterScene');
    const characterImage= document.getElementById('characterImage');
    const characterButtonsContainer = document.getElementById('characterButtonsContainer');

    const localTextData = {
      tip1: { zh: '歡迎遊玩《NoFold》！<br><br>這是一款以瘤野螟、稻米與農民三種不同視角出發，體驗稻米生產過程的劇情式遊戲。<br><br>遊戲中包含多種結局，試著解鎖所有結局，看看不同選擇將會帶來怎樣的結果吧！', en: 'Welcome to NoFold!<br><br>This is a story-driven game that explores rice cultivation from three distinct perspectives: the Cnaphalocrocis medinalis, the rice plant, and the farmer.<br><br>Multiple endings await. Try to unlock them all and see where your choices lead!' },
      tip2: { zh: '即將踏入稻田，<br>請選擇一位角色展開全新的冒險吧！', en: 'About to step into the paddy field...<br>Please choose a character to start your new adventure!' }
    };

    function updateIndexLang(lang) {
      const t1 = document.getElementById('tipContent1');
      const t2 = document.getElementById('tipContent2');
      if (t1) t1.innerHTML = localTextData.tip1[lang] || localTextData.tip1['zh'];
      if (t2) t2.innerHTML = localTextData.tip2[lang] || localTextData.tip2['zh'];
    }
    updateIndexLang(gameLang);
    window.addEventListener('languageChanged', e => updateIndexLang(e.detail.lang));
    window.addEventListener('languageChanged', () => {
      if (typeof currentPage !== 'undefined') {
        if (currentPage === 'char1') updateHud1();
        if (currentPage === 'char2') updateHud2();
        if (currentPage === 'char3') updateHud3();
      }
    });
    window.addEventListener('languageChanged', e => {
      const lang = e.detail.lang;
      const tipContent = document.getElementById('char1BreedingTipContent');
      const tipTitle = document.getElementById('char1BreedingTipTitle');
      if (tipContent) tipContent.innerHTML = lang === 'zh'
        ? '當<strong>繁殖率</strong>到達 100% 時即可進入下一階段！'
        : 'When the <strong>Breeding Rate</strong> reaches 100%, you can advance to the next stage!';
      if (tipTitle) tipTitle.textContent = lang === 'zh' ? '遊戲提示' : 'Game Tips';

      // Offspring growth rate tip
      const offTipContent = document.getElementById('char1OffspringTipContent');
      const offTipTitle = document.getElementById('char1OffspringTipTitle');
      if (offTipContent) offTipContent.innerHTML = lang === 'zh'
        ? '當<strong>子代成長率</strong>到達 100% 時即可進入下一階段！'
        : 'When the <strong>Offspring Growth Rate</strong> reaches 100%, you can advance to the next stage!';
      if (offTipTitle) offTipTitle.textContent = lang === 'zh' ? '遊戲提示' : 'Game Tips';

      // Rice: growth value tip
      const growthTipContent = document.getElementById('char2GrowthTipContent');
      const growthTipTitle = document.getElementById('char2GrowthTipTitle');
      if (growthTipContent) growthTipContent.innerHTML = lang === 'zh'
        ? '當<strong>生長值</strong>到達 100% 時即可進入下一階段！'
        : 'When the <strong>Growth Value</strong> reaches 100%, you can advance to the next stage!';
      if (growthTipTitle) growthTipTitle.textContent = lang === 'zh' ? '遊戲提示' : 'Game Tips';

      // Farmer: money tip
      const moneyTipContent = document.getElementById('char3MoneyTipContent');
      const moneyTipTitle = document.getElementById('char3MoneyTipTitle');
      if (moneyTipContent) moneyTipContent.innerHTML = lang === 'zh'
        ? '當<strong>金錢</strong>到達 100% 時即可進入下一階段！'
        : 'When <strong>Money</strong> reaches 100%, you can advance to the next stage!';
      if (moneyTipTitle) moneyTipTitle.textContent = lang === 'zh' ? '遊戲提示' : 'Game Tips';
    });

    startBtn.addEventListener('click', e => {
      e.preventDefault();
      homepageScene.style.display = 'none';
      characterScene.style.display = 'block';
      characterImage.classList.add('blurred');
      gameTipOverlay.classList.add('show');
    });

    function tip1ToTip2() {
      gameTipOverlay.classList.remove('show');
      gameTipOverlay2.classList.add('show');
    }
    tipArrow1.addEventListener('click', tip1ToTip2);
    gameTipOverlay.addEventListener('click', e => { if (e.target === gameTipOverlay) tip1ToTip2(); });

    function tip2Done() {
      gameTipOverlay2.classList.remove('show');
      characterImage.classList.remove('blurred');
      characterButtonsContainer.classList.add('show');
    }
    tipArrow2.addEventListener('click', tip2Done);
    gameTipOverlay2.addEventListener('click', e => { if (e.target === gameTipOverlay2) tip2Done(); });


  }