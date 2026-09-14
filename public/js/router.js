/* ══════════════════════════════════════════
     ROUTER / NAVIGATION
  ══════════════════════════════════════════ */
  let currentPage = 'index';
  const pages = ['index','char1','char2','char3','ending-anim','star','egg','doc','info'];

  function resumeGame() {
    const saved = localStorage.getItem('currentGamePage');
    if (!saved) { navTo('index'); return; }

    // char1 format: 'char1#sceneId'
    if (saved.startsWith('char1#')) {
      const sceneId = saved.replace('char1#', '');
      navTo('char1');
      setTimeout(() => char1GoToScene(sceneId), 0);
      return;
    }

    // Bare string format (legacy, or overwritten by a menu page) → start that character over
    if (saved === 'char1') { navTo('char1'); return; }
    if (saved === 'char2') { navTo('char2'); return; }
    if (saved === 'char3') { navTo('char3'); return; }

    // char2/char3 format: '...html#char2|sceneKey|choiceKey' or 'char2|sceneKey'
    const hashMatch = saved.match(/#(char[23])\|(.+)$/);
    if (hashMatch) {
      const charId    = hashMatch[1];   // 'char2' or 'char3'
      const parts     = hashMatch[2].split('|');
      const sceneKey  = parts[0];
      const choiceKey = parts[1] || null;

      if (charId === 'char2') {
        navTo('char2');   // initChar2 restores its own save internally
        setTimeout(() => {
          const s = char2LoadStats();
          if (s) {
            char2Stats.quality      = s.quality      || 0;
            char2Stats.pestResist   = (typeof s.pestResist === 'number') ? s.pestResist : 50;
            char2Stats.growth       = s.growth       || 0;
            char2Stats.pesticideUsed= s.pesticideUsed|| 0;
            char2FinalEnding        = s.finalEnding  || null;
          }
          if (choiceKey && CHOICES2[choiceKey]) {
            char2RunScene(sceneKey);
            setTimeout(() => char2GoChoice(choiceKey), 50);
          } else {
            char2RunScene(sceneKey);
          }
        }, 0);
        return;
      }

      if (charId === 'char3') {
        // Switch pages first (without going through initChar3's reset), then restore progress
        document.querySelectorAll('.page').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
        const el = document.getElementById('page-char3');
        if (el) { el.classList.add('active'); el.style.display = 'flex'; }
        currentPage = 'char3';
        closeSidebar();

        const s = char3LoadStats();
        if (s && SCENES3[sceneKey]) {
          char3Stats.money      = (typeof s.money      === 'number') ? s.money      : 50;
          char3Stats.health     = (typeof s.health     === 'number') ? s.health     : 50;
          char3Stats.stress     = (typeof s.stress     === 'number') ? s.stress     : 0;
          char3Stats.reputation = (typeof s.reputation === 'number') ? s.reputation : 0;
          char3FinalEnding      = s.finalEnding || null;
          char3CurrentChoiceKey = null;

          // Bind the text box click (normally done by initChar3)
          const stb = char3StoryTextBox();
          stb.onclick = () => { if (char3ChoicesBox().classList.contains('show')) return; char3ShowNextLine(); };

          if (choiceKey && CHOICES3[choiceKey]) {
            char3RunScene(sceneKey);
            setTimeout(() => char3GoChoice(choiceKey), 50);
          } else {
            char3RunScene(sceneKey);
          }
        } else {
          // Save couldn't be restored, start over
          initChar3();
        }
        return;
      }
    }

    // Any other legacy/unparseable format → go to the homepage
    navTo('index');
  }

  function updateCharBtnLang(lang) {
    const map = { 1: ['Character1.PNG','Charater1-2.PNG'], 2: ['Character2.PNG','Charater2-2.PNG'], 3: ['Character3.PNG','Charater3-2.PNG'] };
    [1,2,3].forEach(i => {
      const btn = document.getElementById('charBtn'+i);
      if (btn) btn.style.backgroundImage = `url('public/buttoms/${lang==='zh' ? map[i][0] : map[i][1]}')`;
    });
  }