/* ══════════════════════════════════════════
     CHARACTER 1 (Rice Leaffolder Moth) LOGIC
  ══════════════════════════════════════════ */
  let globalTypewriterTimer1 = null;
  let isTyping1 = false;
  let multiPartState1 = { parts: [], index: 0, nextScene: null };
  let animationTimer1 = null;
  let currentScene1   = null;

  const ANIMATION_FRAMES1 = ['public/pictures/1-7-1.PNG','public/pictures/1-7-2.PNG','public/pictures/1-7-3.PNG','public/pictures/1-7-4.PNG','public/pictures/1-7-5.PNG'];

  function resetChar1() {
    if (globalTypewriterTimer1) { clearTimeout(globalTypewriterTimer1); globalTypewriterTimer1 = null; }
    animPlayer1.stop();
    if (animationTimer1) { clearInterval(animationTimer1); animationTimer1 = null; }
    document.querySelectorAll('#page-char1 .scene').forEach(s => s.style.display = 'none');
    currentScene1 = null;
    multiPartState1 = { parts: [], index: 0, nextScene: null };
  }

  const SCENE_DATA1 = {
    '1-1': { zh: '夜幕降臨，你在二期稻田中徘徊。月光灑落在搖曳的稻穗上，微風帶來淡淡的植物氣味。', en: 'As night falls, you wander through the second-phase rice fields. The moonlight falls on the swaying rice ears, and the breeze brings a faint scent of plants.' },
    '1-2': { zh: '你是一隻羽化完成的瘤野螟，你的使命只有一個：找到適合的作物，完成傳宗接代的使命。', en: 'You are a fully emerged leaffolder moth. You have only one mission: find a suitable crop and fulfill your purpose to reproduce.' },
    '1-2-c': { type:'dialogue', zh:{name:'瘤野螟',text:'我在夜空中盤旋，聞到了不同稻田飄來的氣味。'}, en:{name:'Cnaphalocrocis medinalis',text:'I hovered in the night sky, smelling the scents drifting from different rice fields.'} },
    '1-3': { zh: '空氣突然變得刺鼻，濃烈的氣味迅速瀰漫整片稻田。', en: 'Suddenly, the air turns pungent, and a strong scent rapidly spreads across the entire rice field.' },
    '1-3-c1': { type:'dialogue', zh:{name:'瘤野螟',text:'這感覺不太對，我本能地急忙拍動翅膀，試圖遠離農田以避開這氣味。'}, en:{name:'Cnaphalocrocis medinalis',text:'Something feels wrong. Instinctively, I flutter my wings in a hurry, trying to stay away from the field to avoid this smell.'} },
    '1-3-c2': { type:'dialogue', zh:{name:'瘤野螟',text:'熟悉的稻田景色慢慢消失在身後，我只能拖著虛弱的身軀，勉強在陌生的空中前進。'}, en:{name:'Cnaphalocrocis medinalis',text:'The familiar view of the rice fields slowly fades behind me. I can only drag my weak body forward, struggling through the unfamiliar sky.'} },
    '1-4': { zh: '恭喜你找到了柔嫩安全的葉片，你穩穩落下，產下了一部分的卵。', en: 'Congratulations on finding a soft and safe leaf. You land steadily and lay a portion of your eggs.' },
    '1-5': { zh: '你找到了剛好能夠產卵的葉片，成功產了一部分的卵。', en: 'You found a leaf just right for laying eggs and successfully laid a portion of them.' },
    '1-s1': { zh:['當你完成產卵後，正準備離開葉片——','空氣突然變得不對勁。','不是農藥，也不是檸檬烯，是一種陌生、難以辨識的氣味。'], en:['Just as you finish laying your eggs and prepare to leave the leaf—','The air suddenly feels different.','It is not chemical pesticides, nor is it Limonene; it is an unfamiliar, unrecognizable scent.'] },
    '1-s2-1': { zh:'微弱的光在田間閃動，你試圖振翅，想趕快飛走——', en:'Faint lights flicker across the field; you desperately flap your wings, trying to escape quickly—' },
    '1-s2-c': { type:'dialogue', zh:{name:'瘤野螟',text:'啊啊啊啊啊啊啊'}, en:{name:'Cnaphalocrocis medinalis',text:'Aaaaaaargh!'} },
    '1-s2-2': { zh:'你被捕捉了。', en:'You have been captured.' },
    '1-s3': { type:'dialogue', zh:{name:'瘤野螟',text:['我在哪…………？','在不遠處，我感受到了熟悉的存在。']}, en:{name:'Cnaphalocrocis medinalis',text:['Where am I...?','Not too far away, I can sense a familiar presence.']} },
    '1-s4-1': { zh:['被帶來的幾束稻米，靜靜地放置在花盆中。','遠方，人類的聲音變得規律而冷靜。','你停在葉片上，周圍安靜得異常，比起在農田，你發現這裡少了許多同類的身影。'], en:['A few bundles of harvested rice rest quietly inside a flower pot.','In the distance, human voices sound rhythmic, calm, and distant.','As you perch upon a leaf, an unusual silence envelops you; you realize that, unlike in the open fields, there are far fewer of your kind here.'] },
    '1-s4-c': { type:'dialogue', zh:{name:'瘤野螟',text:'好可怕………'}, en:{name:'Cnaphalocrocis medinalis',text:'So terrifying...'} },
    '1-s4-2': { zh:'你還活著，但你知道，未來只會更艱難。', en:'You are still alive, but you know that the future will only grow more difficult.' },
    '1-2p2': { zh:['當你完成產卵後，夜色仍未散去。','你停在稻葉間，卵已經產下，','你的子代，能不能順利成長？'], en:['When you finish laying eggs, the night has not yet faded.','You rest among the rice leaves, the eggs have been laid,','Will your offspring grow up successfully?'] },
    '1-9': { zh:['你降低活動量，守護著卵。','雖然環境安全，但子代成長速度相對緩慢。'], en:['You reduce your activity level and guard the eggs.','Although the environment is safe, the offspring grow relatively slowly.'] },
    '1-10': { zh:['你在葉片間持續活動，成功讓更多子代獲得養分。','雖然累，但你的子代成長速度顯著提升。'], en:['You stay active among the leaves, successfully providing nutrients to more offspring.','Though exhausting, your offspring grow significantly faster.'] },
    '1-11-1': { zh:['農民使用了農藥，刺鼻氣味迅速瀰漫整片田地，葉面開始殘留藥劑。','你與你的子代長期暴露在農藥之中，身體逐漸變得虛弱。','原本遍布稻田的族群開始迅速減少，許多同伴無法撐過下一次噴灑。','曾經熱鬧的稻田，慢慢安靜下來，只剩幾個身影還在掙扎。'], en:['The farmer applied chemical pesticides. The pungent smell quickly filled the entire field, leaving toxic chemical residues on the leaves.','You and your offspring are chronically exposed to pesticides, and your bodies gradually grow weaker.','The population that once filled the rice fields begins to dwindle rapidly, as many companions fail to survive the next spray.','The once bustling rice field slowly falls silent, leaving only a few figures still struggling to survive.'] },
    '1-11-2': { zh:['農民使用了農藥，刺鼻氣味迅速瀰漫整片田地，葉面開始殘留藥劑。','你的子代成功倖存了下來，並在一次次的環境淘汰中逐漸對農藥產生抗性。','即使農田持續噴灑藥劑，你的族群依然能夠適應並繁衍下去。','隨著時間推移，族群數量不斷增加，活動範圍也越來越廣，最終成為稻田中難以被消滅的強大存在。'], en:['The farmer applied chemical pesticides. The pungent smell quickly filled the entire field, leaving toxic chemical residues on the leaves.','Your offspring successfully survive, gradually developing resistance to the pesticides through waves of environmental elimination.','Even if the fields are repeatedly sprayed with chemical agents, your population continues to adapt and thrive.','As time passes, the population expands constantly and their territory spreads wider, ultimately turning into a formidable existence in the rice fields that is nearly impossible to eradicate.'] },
    '1-12-1': { zh:['黎明將至，霧氣仍未散去。','你停在被啃食過的稻葉上，深吸了一口氣——','沒有刺鼻的農藥，也沒有讓你不適的檸檬烯。','那些曾經威脅你的氣味，變得微弱、甚至消失了。'], en:['Dawn is approaching, yet the mist has not faded.','You rest on a chewed rice leaf and take a deep breath—','There are no pungent chemical pesticides, nor any irritating Limonene.','Those scents that once threatened you have weakened, or even vanished.'] },
    '1-12-cs': { zh:['稻田裡，到處都是被啃食過的痕跡。','葉片捲曲、莖部中空。'], en:['Throughout the rice field, signs of heavy feeding are visible everywhere.','Leaves are tightly folded, and the stems are left hollowed.'] },
    '1-12-cd': { type:'dialogue', zh:{name:'瘤野螟',text:'哈哈哈，人類的防禦失效了！'}, en:{name:'Cnaphalocrocis medinalis',text:"Hahaha, humans' defenses have completely failed!"} },
    '1-12-c2': { type:'dialogue', zh:{name:'瘤野螟',text:'人類，我終於勝利啦！'}, en:{name:'Cnaphalocrocis medinalis',text:'Humans, I have finally triumphed!'} },
    '1-12-3': { zh:['你的子代成功孵化，開始大口大口地吃。','牠們不再需要躲藏，也不再需要小心翼翼。'], en:['Your offspring successfully hatch and begin to feed voraciously.','They no longer need to hide, nor do they need to be cautious anymore.'] },
    '1-12-c3': { type:'dialogue', zh:{name:'瘤野螟',text:'孩子們，這是我們的世界了！'}, en:{name:'Cnaphalocrocis medinalis',text:'My children, this world belongs to us now!'} },
    '1-13-1': { zh:['你開始感覺到不對勁。','視線模糊，翅膀越來越沉，再也抬不起來。'], en:['You begin to feel that something is terribly wrong.','Your vision blurs, and your wings grow heavier and heavier, until you can no longer lift them.'] },
    '1-13-c': { type:'dialogue', zh:{name:'瘤野螟',text:'再見了…世界……'}, en:{name:'Cnaphalocrocis medinalis',text:'Goodbye... cruel world...'} },
    '1-13-2': { zh:'田地之中，只剩下一具再也不會振翅的軀殼。', en:'In the middle of the field, nothing remains but a lifeless shell that will never spread its wings again.' }
  };

  function char1GetNextScene(id) {
    const map = {
      '1-1':'1-2','1-2':'1-2-c','1-2-c':'1-2-choose',
      '1-3':'1-3-c1','1-3-c1':'1-3-c2','1-3-c2':'END:end_bad2',
      '1-4':'1-2-choose','1-5':'1-2-choose',
      '1-s1':'1-s2-1','1-s2-1':'1-s2-c','1-s2-c':'1-s2-2','1-s2-2':'1-s3',
      '1-s3':'1-s4-1','1-s4-1':'1-s4-c','1-s4-c':'1-s4-2','1-s4-2':'END:end_special1',
      '1-2p2':'1-2p2-choose','1-9':'1-2p2-choose','1-10':'1-2p2-choose',
      '1-11-1':'END:end_bad1','1-11-2':'END:end_good2',
      '1-12-1':'1-12-cs','1-12-cs':'1-12-cd','1-12-cd':'1-12-c2','1-12-c2':'1-12-3','1-12-3':'1-12-c3','1-12-c3':'END:end_good1',
      '1-13-1':'1-13-c','1-13-c':'1-13-2','1-13-2':'END:end_bad4'
    };
    return map[id] || null;
  }

  function char1DoEnding(key) {
    hideHud1();
    localStorage.setItem(key, 'true');
    localStorage.setItem('last_ending', key);
    localStorage.setItem('came_from_ending', 'true');
    if (!localStorage.getItem('first_ending_seen')) {
      localStorage.setItem('first_ending_seen', 'true');
      navTo('ending-anim');
    } else {
      navTo('star');
    }
  }

  function char1MoveHudToScene(id) {
    const hud = document.getElementById('char1Hud');
    if (!hud) return;
    const wrapper = document.querySelector('#scene-' + id + ' .image-relative-wrapper');
    if (wrapper && !wrapper.contains(hud)) {
      wrapper.insertBefore(hud, wrapper.firstChild);
    }
  }

  function char1GoToScene(id) {
    const hud1r=document.getElementById('char1Hud'); if(hud1r) hud1r.classList.remove('choices-blur');
    if (globalTypewriterTimer1) { clearTimeout(globalTypewriterTimer1); globalTypewriterTimer1 = null; }
    if (animationTimer1) { clearInterval(animationTimer1); animationTimer1 = null; }
    document.querySelectorAll('#page-char1 .scene').forEach(s => s.style.display = 'none');
    const target = document.getElementById('scene-' + id);
    if (!target) { console.warn('Scene not found:', id); return; }
    target.style.display = 'flex';
    currentScene1 = id;
    localStorage.setItem('currentGamePage', 'char1#' + id);
    char1MoveHudToScene(id);
    if (id === '1-2-choose' || id === '1-2p2-choose') { updateHud1(); }
    char1InitScene(id);
  }

  function char1ShowBreedingTip() {
    const overlay = document.getElementById('char1BreedingTip');
    const tipContent = document.getElementById('char1BreedingTipContent');
    const tipTitle = document.getElementById('char1BreedingTipTitle');
    const arrow = document.getElementById('char1BreedingTipArrow');
    const container = document.getElementById('choicesContainer-1-2');
    const lang = gameLang || 'en';
    tipTitle.textContent = lang === 'zh' ? '遊戲提示' : 'Game Tips';
    tipContent.innerHTML = lang === 'zh'
      ? '當<strong>繁殖率</strong>到達 100% 時即可進入下一階段！'
      : 'When the <strong>Breeding Rate</strong> reaches 100%, you can advance to the next stage!';
    // Hide the choice box first
    if (container) container.classList.remove('show');
    overlay.classList.add('show');
    function closeTip() {
      overlay.classList.remove('show');
      if (container) container.classList.add('show');
      const hud1=document.getElementById('char1Hud'); if(hud1) hud1.classList.add('choices-blur');
    }
    arrow.onclick = closeTip;
    overlay.onclick = e => { if (e.target === overlay) closeTip(); };
  }

  function char1ShowOffspringTip() {
    const overlay = document.getElementById('char1OffspringTip');
    const tipContent = document.getElementById('char1OffspringTipContent');
    const tipTitle = document.getElementById('char1OffspringTipTitle');
    const arrow = document.getElementById('char1OffspringTipArrow');
    const container = document.getElementById('choicesContainer-1-2p2');
    const lang = gameLang || 'en';
    tipTitle.textContent = lang === 'zh' ? '遊戲提示' : 'Game Tips';
    tipContent.innerHTML = lang === 'zh'
      ? '當<strong>子代成長率</strong>到達 100% 時即可進入下一階段！'
      : 'When the <strong>Offspring Growth Rate</strong> reaches 100%, you can advance to the next stage!';
    if (container) container.classList.remove('show');
    overlay.classList.add('show');
    function closeTip() {
      overlay.classList.remove('show');
      if (container) container.classList.add('show');
      const hud1=document.getElementById('char1Hud'); if(hud1) hud1.classList.add('choices-blur');
    }
    arrow.onclick = closeTip;
    overlay.onclick = e => { if (e.target === overlay) closeTip(); };
  }

  function char1InitScene(id) {
    if (id === '1-2-c') {
      localStorage.setItem('health','15'); localStorage.setItem('breeding','0'); localStorage.setItem('generation','0');
    }
    if (id === '1-2-choose') {
      char1BindChoices_1_2(); char1ApplyLang(gameLang);
      // Only show the tip on first entry (breeding===0 and generation===0)
      const isFirstVisit = (parseInt(localStorage.getItem('breeding'))||0) === 0
                        && (parseInt(localStorage.getItem('generation'))||0) === 0;
      const container = document.getElementById('choicesContainer-1-2');
      const overlay = document.getElementById('char1BreedingTip');
      // Force-reset the view state on every entry, to avoid overlapping visuals if the tip wasn't closed before navigating away and back
      if (container) container.classList.remove('show');
      if (overlay) overlay.classList.remove('show');
      if (isFirstVisit) {
        char1ShowBreedingTip(); // the tip function controls the container's visibility
      } else {
        if (container) container.classList.add('show'); // not the first time, show directly
      }
      return;
    }
    if (id === '1-2p2-choose') {
      char1BindChoices_1_2p2(); char1ApplyLang(gameLang);
      // Only show the tip on first entry (generation===0)
      const isFirstVisit = (parseInt(localStorage.getItem('generation'))||0) === 0;
      const container = document.getElementById('choicesContainer-1-2p2');
      const overlay = document.getElementById('char1OffspringTip');
      // Force-reset the view state on every entry, to avoid overlapping visuals if the tip wasn't closed before navigating away and back
      if (container) container.classList.remove('show');
      if (overlay) overlay.classList.remove('show');
      if (isFirstVisit) {
        char1ShowOffspringTip(); // the tip function controls the container's visibility
      } else {
        if (container) container.classList.add('show'); // not the first time, show directly
      }
      return;
    }
    if (id === '1-s3') char1StartAnimation();
    const data = SCENE_DATA1[id];
    if (!data) { char1ApplyLang(gameLang); return; }
    char1RenderScene(id, gameLang);
    char1ApplyLang(gameLang);
  }

  function char1ApplyLang(lang) {
    document.querySelectorAll('#page-char1 [data-zh]').forEach(el => {
      el.textContent = lang === 'en' ? (el.getAttribute('data-en') || el.textContent) : (el.getAttribute('data-zh') || el.textContent);
    });
  }

  function char1StartAnimation() {
    animPlayer1.start(250);
  }

  function char1RunTypewriter(el, text, arrowEl, showOnDone) {
    if (!el) return;
    el.textContent = '';
    if (globalTypewriterTimer1) { clearTimeout(globalTypewriterTimer1); globalTypewriterTimer1 = null; }
    let i = 0; isTyping1 = true;
    function type() {
      if (i < text.length) { el.textContent += text[i++]; globalTypewriterTimer1 = setTimeout(type, 40); }
      else { globalTypewriterTimer1 = null; isTyping1 = false; if (showOnDone && arrowEl) arrowEl.classList.add('show'); }
    }
    type();
  }

  function char1WaitArrow(arrowEl) {
    if (!arrowEl) return;
    const check = setInterval(() => { if (!isTyping1) { arrowEl.classList.add('show'); clearInterval(check); } }, 100);
  }

  function char1RenderScene(id, lang) {
    const data = SCENE_DATA1[id];
    if (!data) return;
    const sceneEl = document.getElementById('scene-' + id);
    if (!sceneEl) return;

    const isDialogue = data.type === 'dialogue';
    let texts;
    if (isDialogue) { const d = data[lang] || data['zh']; texts = Array.isArray(d.text) ? d.text : [d.text]; }
    else { const raw = data[lang] || data['zh']; texts = Array.isArray(raw) ? raw : [raw]; }

    const isMulti = texts.length > 1;
    const fresh = isMulti ? char1BindMultiArrow(sceneEl, id) : char1BindSimpleArrow(sceneEl, id);
    const textEl  = fresh.querySelector('[id^="storyText-"]');
    const arrowEl = fresh.querySelector('.story-text-arrow');
    if (arrowEl) arrowEl.classList.remove('show');

    if (isMulti) {
      multiPartState1 = { parts: texts, index: 0, nextScene: char1GetNextScene(id) };
      char1RunTypewriter(textEl, texts[0], arrowEl, false);
      multiPartState1.index = 1;
      char1WaitArrow(arrowEl);
    } else {
      multiPartState1 = { parts: [], index: 0, nextScene: null };
      char1RunTypewriter(textEl, texts[0], arrowEl, true);
    }
  }

  function char1BindMultiArrow(sceneEl, id) {
    const box = sceneEl.querySelector('.story-text-box');
    if (!box) return box;
    const fresh = box.cloneNode(true); box.parentNode.replaceChild(fresh, box);
    const freshArrow = fresh.querySelector('.story-text-arrow');
    const freshText  = fresh.querySelector('[id^="storyText-"]');
    fresh.addEventListener('click', e => { e.stopPropagation(); char1HandleMulti(freshText, freshArrow, id); });
    if (freshArrow) freshArrow.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); char1HandleMulti(freshText, freshArrow, id); });
    return fresh;
  }

  function char1HandleMulti(textEl, arrowEl, id) {
    if (multiPartState1.index < multiPartState1.parts.length) {
      if (arrowEl) arrowEl.classList.remove('show');
      const text = multiPartState1.parts[multiPartState1.index++];
      char1RunTypewriter(textEl, text, arrowEl, false);
      char1WaitArrow(arrowEl);
    } else {
      const next = multiPartState1.nextScene || char1GetNextScene(id);
      if (next) { if (next.startsWith('END:')) char1DoEnding(next.replace('END:','')); else char1GoToScene(next); }
    }
  }

  function char1BindSimpleArrow(sceneEl, id) {
    const box = sceneEl.querySelector('.story-text-box');
    if (!box) return box;
    const fresh = box.cloneNode(true); box.parentNode.replaceChild(fresh, box);
    fresh.addEventListener('click', e => { e.stopPropagation(); char1HandleSimple(id, fresh); });
    const a = fresh.querySelector('.story-text-arrow');
    if (a) a.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); char1HandleSimple(id, fresh); });
    return fresh;
  }

  function char1HandleSimple(id, boxEl) {
    const ending = boxEl.getAttribute('data-ending') || (boxEl.querySelector('[data-ending]') && boxEl.querySelector('[data-ending]').getAttribute('data-ending'));
    if (ending) { char1DoEnding(ending); return; }
    const next = char1GetNextScene(id);
    if (next) { if (next.startsWith('END:')) char1DoEnding(next.replace('END:','')); else char1GoToScene(next); }
  }

  function char1BindChoices_1_2() {
    const container = document.getElementById('choicesContainer-1-2');
    if (!container) return;
    container.querySelectorAll('.choice-button').forEach(btn => {
      const fresh = btn.cloneNode(true); btn.parentNode.replaceChild(fresh, btn);
      fresh.addEventListener('click', function() {
        let health = parseInt(localStorage.getItem('health')) || 15;
        let breeding = parseInt(localStorage.getItem('breeding')) || 0;
        const choice = this.getAttribute('data-choice');
        let next = '';
        let playedSpecial = localStorage.getItem('end_special') === 'true';
        if (choice === 'high-nitrogen') {
          if (Math.random() < 0.5) { char1GoToScene('1-3'); return; }
          else { health -= 2; breeding += 50; next = '1-4'; }
        } else if (choice === 'normal-rice') { health -= 1; breeding += 15; next = '1-5'; }
        if (health <= 0) { localStorage.setItem('health',health); localStorage.setItem('breeding',breeding); char1GoToScene('1-13-1'); return; }
        if (breeding >= 100) {
          localStorage.setItem('health',health); localStorage.setItem('breeding',breeding);
          const alreadyPlayedSpecial = localStorage.getItem('end_special') === 'true';
          if (!alreadyPlayedSpecial && Math.random() < 0.5) { localStorage.setItem('end_special','true'); char1GoToScene('1-s1'); }
          else char1GoToScene('1-2p2');
          return;
        }
        localStorage.setItem('health',health); localStorage.setItem('breeding',breeding);
        char1GoToScene(next);
      });
    });
  }

  function char1BindChoices_1_2p2() {
    const container = document.getElementById('choicesContainer-1-2p2');
    if (!container) return;
    container.querySelectorAll('.choice-button').forEach(btn => {
      const fresh = btn.cloneNode(true); btn.parentNode.replaceChild(fresh, btn);
      fresh.addEventListener('click', function() {
        let health = parseInt(localStorage.getItem('health')) || 15;
        let breeding = parseInt(localStorage.getItem('breeding')) || 0;
        let generation = parseInt(localStorage.getItem('generation')) || 0;
        const choice = this.getAttribute('data-choice');
        let next = '';
        if (choice === 'latent') { health -= 1; generation += 10; next = '1-9'; }
        else if (choice === 'observe') {
          if (Math.random() < 0.5) { next = Math.random() < 0.5 ? '1-11-1' : '1-11-2'; }
          else { health -= 2; generation += 40; next = '1-10'; }
        }
        const isPest = (next === '1-11-1' || next === '1-11-2');
        if (!isPest && health <= 0) next = '1-13-1';
        else if (!isPest && generation >= 100) next = '1-12-1';
        localStorage.setItem('health',health); localStorage.setItem('breeding',breeding); localStorage.setItem('generation',generation);
        char1GoToScene(next);
      });
    });
  }

  window.addEventListener('languageChanged', e => {
    if (currentPage === 'char1') { char1ApplyLang(e.detail.lang); if (currentScene1 && SCENE_DATA1[currentScene1]) char1RenderScene(currentScene1, e.detail.lang); }
  });