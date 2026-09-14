let starPageInited = false;

  function initStarPage(){
    // Arrived from an ending: clear progress so "Back to Game" goes to the homepage
    if (localStorage.getItem('came_from_ending') === 'true') {
      localStorage.removeItem('came_from_ending');
      localStorage.removeItem('currentGamePage');
    }

    let unlockCount = 0;
    ACHIEVEMENTS.forEach(ach => { if(localStorage.getItem(ach.key)==='true') unlockCount++; });
    updateStarLang(gameLang, unlockCount);

    // Clear and re-bind card clicks (avoids stacking listeners on every page visit)
    ACHIEVEMENTS.forEach(ach => {
      const isUnlocked = localStorage.getItem(ach.key)==='true';
      const cardEl = document.getElementById(ach.cardId);
      if(cardEl){
        const fresh = cardEl.cloneNode(true);
        cardEl.parentNode.replaceChild(fresh, cardEl);
        if(isUnlocked){
          fresh.classList.remove('locked');
          fresh.addEventListener('click', ()=>openModal(ach));
        }
      }
    });

    // Bind fixed UI events only on first initialization
    if (!starPageInited) {
      const modal = document.getElementById('resultModal');
      document.getElementById('modalCloseBtn').onclick = closeModal;
      modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });
      document.getElementById('modalReplayBtn').onclick = () => navTo('index');
      document.getElementById('modalShareBtn').onclick = handleShare;
      window.addEventListener('languageChanged', e => {
        starLang = e.detail.lang;
        let cnt = 0; ACHIEVEMENTS.forEach(a=>{if(localStorage.getItem(a.key)==='true')cnt++;});
        updateStarLang(starLang, cnt);
        if(starActiveAch && document.getElementById('resultModal').style.display==='flex') renderModal(starActiveAch, starLang);
        resetBtns();
      });
      starPageInited = true;
    }

    // Only auto-open the modal right after finishing an ending
    const lastEnding = localStorage.getItem('last_ending');
    if (lastEnding) {
      localStorage.removeItem('last_ending');
      const ach = ACHIEVEMENTS.find(a => a.key === lastEnding);
      if (ach && localStorage.getItem(ach.key) === 'true') {
        setTimeout(() => openModal(ach), 150);
      }
    }
  }

  function updateStarLang(lang, unlockCount){
    starLang = lang;
    const titleEl = document.querySelector('.wall-title');
    if(titleEl) titleEl.innerText = lang==='zh' ? `結局收集牆 (${unlockCount}/20)` : `Endings Wall (${unlockCount}/20)`;
    ACHIEVEMENTS.forEach(ach => {
      const isUnlocked = localStorage.getItem(ach.key)==='true';
      const cardEl = document.getElementById(ach.cardId);
      const textEl = document.getElementById(ach.textId);
      if(cardEl && textEl){
        if(isUnlocked) textEl.innerText = ach.name[lang];
        else textEl.innerText = lang==='zh' ? '？？？' : '???';
      }
    });
    document.querySelectorAll('#page-star [data-zh]').forEach(el => {
      el.innerHTML = lang==='zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
    });
  }

  function renderModal(achData, lang){
    const imgPath = `public/results/${achData.cardId.replace('card_','').replace('_','-')}.PNG`;
    const s = achData.styles;
    const root = document.documentElement;
    root.style.setProperty('--current-theme', s.theme);
    root.style.setProperty('--current-bg', s.bg);
    root.style.setProperty('--current-light-theme', s.lightBg);
    root.style.setProperty('--current-text', s.text);
    document.getElementById('modalRoleName').innerText = achData.role[lang];
    document.getElementById('modalEndingName').innerText = achData.name[lang];
    document.getElementById('modalMainImgBox').innerHTML = `<img src="${imgPath}" alt="${achData.name[lang]}">`;
    const tagsEl = document.getElementById('modalTagsContainer');
    tagsEl.innerHTML = '';
    achData.tags[lang].forEach(tag => { const d=document.createElement('div');d.className='tag-item';d.innerText=tag;tagsEl.appendChild(d); });
    document.getElementById('modalDescription').innerText = achData.desc[lang];
    document.getElementById('modalHintBox').innerText = achData.hint[lang];
    const body = document.getElementById('modalCorrespondingBody');
    body.innerHTML = '';
    if(!achData.correspondingIds||achData.correspondingIds.length===0){
      body.innerHTML = `<div style="font-size:12px;color:#999;padding:10px;">${lang==='zh'?'無特殊相應結局':'No specific corresponding endings.'}</div>`;
    } else {
      achData.correspondingIds.forEach(targetKey => {
        const target = ACHIEVEMENTS.find(a=>a.key===targetKey);
        if(target){
          const isUnlocked = localStorage.getItem(target.key)==='true';
          const tImgPath = `public/results/${target.cardId.replace('card_','').replace('_','-')}.PNG`;
          const itemDiv = document.createElement('div'); itemDiv.className='sub-ending-item';
          const imgBox = document.createElement('div'); imgBox.className='sub-ending-img-box';
          if(!isUnlocked) imgBox.classList.add('sub-locked');
          imgBox.innerHTML = `<img src="${tImgPath}" alt="sub">`;
          const nameSpan = document.createElement('span'); nameSpan.className='sub-ending-name';
          nameSpan.innerText = isUnlocked ? target.name[lang] : (lang==='zh'?'？？？':'???');
          itemDiv.appendChild(imgBox); itemDiv.appendChild(nameSpan); body.appendChild(itemDiv);
        }
      });
    }
  }

  function openModal(achData){
    starActiveAch = achData;
    renderModal(achData, starLang);
    document.getElementById('resultModal').style.display = 'flex';
  }

  function closeModal(){
    document.getElementById('resultModal').style.display = 'none';
    closeShareSheet();
    starActiveAch = null;
    resetBtns();
  }