/* ══════════════════════════════════════════
     STATS HUD UPDATE FUNCTIONS
  ══════════════════════════════════════════ */

  function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
  function pct(v, max) { return clamp(Math.round(v / max * 100), 0, 100) + '%'; }

  // ── char1 HUD (health 0-15, breeding rate 0-100, offspring growth 0-100) ──
  function updateHud1() {
    const hud = document.getElementById('char1Hud');
    if (!hud) return;
    const health    = parseInt(localStorage.getItem('health'))    || 15;
    const breeding  = parseInt(localStorage.getItem('breeding'))  || 0;
    const generation= parseInt(localStorage.getItem('generation'))|| 0;
    const isZh = typeof gameLang !== 'undefined' && gameLang === 'zh';

    document.getElementById('hud1LabelHealth').textContent   = isZh ? '健康值' : 'Health';
    document.getElementById('hud1LabelBreeding').textContent = isZh ? '繁殖率' : 'Breeding';
    document.getElementById('hud1LabelGen').textContent      = isZh ? '子代成長值' : 'Growth';

    document.getElementById('hud1ValHealth').textContent   = health;
    document.getElementById('hud1ValBreeding').textContent = breeding;
    document.getElementById('hud1ValGen').textContent      = generation;

    document.getElementById('hud1BarHealth').style.width   = pct(health, 15);
    document.getElementById('hud1BarBreeding').style.width = pct(breeding, 100);
    document.getElementById('hud1BarGen').style.width      = pct(generation, 100);
    hud.classList.add('visible');
  }

  function hideHud1() {
    const hud = document.getElementById('char1Hud');
    if (hud) hud.classList.remove('visible');
  }

  // ── char2 HUD (quality 0-150, pest resistance 0-100, growth 0-100, pesticide use 0-100+) ──
  function updateHud2() {
    const hud = document.getElementById('char2Hud');
    if (!hud) return;
    const isZh = typeof gameLang !== 'undefined' && gameLang === 'zh';
    document.getElementById('hud2LabelQuality').textContent = isZh ? '品質' : 'Quality';
    document.getElementById('hud2LabelResist').textContent  = isZh ? '抗蟲率' : 'Pest Resist';
    document.getElementById('hud2LabelGrowth').textContent  = isZh ? '生長值' : 'Growth';
    document.getElementById('hud2LabelPest').textContent    = isZh ? '農藥用量' : 'Pesticide';

    document.getElementById('hud2ValQuality').textContent = char2Stats.quality;
    document.getElementById('hud2ValResist').textContent  = char2Stats.pestResist;
    document.getElementById('hud2ValGrowth').textContent  = char2Stats.growth;
    document.getElementById('hud2ValPest').textContent    = char2Stats.pesticideUsed;

    document.getElementById('hud2BarQuality').style.width = pct(char2Stats.quality, 150);
    document.getElementById('hud2BarResist').style.width  = pct(char2Stats.pestResist, 100);
    document.getElementById('hud2BarGrowth').style.width  = pct(char2Stats.growth, 100);
    document.getElementById('hud2BarPest').style.width    = pct(char2Stats.pesticideUsed, 90);
    hud.classList.add('visible');
  }

  function hideHud2() {
    const hud = document.getElementById('char2Hud');
    if (hud) hud.classList.remove('visible');
  }

  // ── char3 HUD (money, health, stress, reputation — ranges vary, shown as a percentage of a 200 cap) ──
  function updateHud3() {
    const hud = document.getElementById('char3Hud');
    if (!hud) return;
    const isZh = typeof gameLang !== 'undefined' && gameLang === 'zh';
    document.getElementById('hud3LabelMoney').textContent  = isZh ? '金錢' : 'Money';
    document.getElementById('hud3LabelHp').textContent     = isZh ? '健康' : 'Health';
    document.getElementById('hud3LabelStress').textContent = isZh ? '壓力' : 'Stress';
    document.getElementById('hud3LabelRep').textContent    = isZh ? '聲譽' : 'Reputation';

    document.getElementById('hud3ValMoney').textContent  = char3Stats.money;
    document.getElementById('hud3ValHp').textContent     = char3Stats.health;
    document.getElementById('hud3ValStress').textContent = char3Stats.stress;
    document.getElementById('hud3ValRep').textContent    = char3Stats.reputation;

    document.getElementById('hud3BarMoney').style.width  = pct(char3Stats.money, 300);
    document.getElementById('hud3BarHp').style.width     = pct(char3Stats.health, 100);
    document.getElementById('hud3BarStress').style.width = pct(char3Stats.stress, 100);
    document.getElementById('hud3BarRep').style.width    = pct(char3Stats.reputation + 100, 200);
    hud.classList.add('visible');
  }

  function hideHud3() {
    const hud = document.getElementById('char3Hud');
    if (hud) hud.classList.remove('visible');
  }

  function navTo(page, extra) {
    document.querySelectorAll('.page').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    const el = document.getElementById('page-' + page);
    if (el) { el.classList.add('active'); el.style.display = 'flex'; }
    currentPage = page;
    closeSidebar();
    // Page-specific init
    if (page === 'star') initStarPage();
    if (page === 'egg')  initEggPage();
    if (page === 'ending-anim') initEndingAnim(extra);
    if (page === 'char1') { resetChar1(); char1GoToScene('1-1'); }
    if (page === 'char2') initChar2();
    if (page === 'char3') initChar3();
    // Hide the HUD when entering the character page; show it once the choice box appears
    ['char1Hud','char2Hud','char3Hud'].forEach(id => {
      const h = document.getElementById(id); if(h) h.classList.remove('visible');
    });
    // currentGamePage is written by each character's own saveProgress / char1GoToScene; navTo doesn't overwrite it
  }