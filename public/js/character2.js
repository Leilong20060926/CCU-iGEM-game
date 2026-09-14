/* ══════════════════════════════════════════
     CHARACTER 2 (Rice Plant) LOGIC
  ══════════════════════════════════════════ */
  let globalTypewriterTimer2 = null;
  let isTyping2 = false;
  let char2CurrentScene = null, char2CurrentTexts = [], char2CurrentPart = 0, char2CurrentChoiceKey = null, char2SpecialReturnChoice = null, char2FinalEnding = null;

  const char2Arrow = () => document.getElementById('nextArrow2');
  const char2CharNameEl = () => document.getElementById('charName2');
  const char2GameImageEl = () => document.getElementById('gameImage2');
  const char2ChoicesBox = () => document.getElementById('choicesContainer2');
  const char2ChoicesTitle = () => document.getElementById('choicesTitle2');
  const char2ChoicesList = () => document.getElementById('choicesList2');
  const char2StoryTextBox = () => document.getElementById('storyTextBox2');
  const char2StoryTextEl = () => document.getElementById('storyText2');
  const char2SceneWrapper = () => document.getElementById('sceneWrapper2');

  const char2Stats = { quality:0, pestResist:50, growth:0, pesticideUsed:0,
    add(k,v){ this[k]=(this[k]||0)+v; updateHud2(); },
    getEnding(){ if(this.pestResist<=0)return'bad1'; if(this.pesticideUsed>=60){const r=Math.random();if(r<0.5)return'bad2';if(r<0.75)return'bad3';return'good1';}if(this.quality>=150)return'good2';return'good3'; }
  };

  function char2RunTypewriter(text, arrowEl, onComplete) {
    const el = char2StoryTextEl();
    if (!el) return;
    if (!text) { if(arrowEl)arrowEl.classList.add('show'); if(onComplete)onComplete(); return; }
    if(globalTypewriterTimer2){clearTimeout(globalTypewriterTimer2);globalTypewriterTimer2=null;}
    el.textContent=''; let i=0; isTyping2=true;
    if(arrowEl)arrowEl.classList.remove('show');
    function type(){
      if(i<text.length){el.textContent+=text[i++];globalTypewriterTimer2=setTimeout(type,40);}
      else{globalTypewriterTimer2=null;isTyping2=false;if(arrowEl)arrowEl.classList.add('show');if(onComplete)onComplete();}
    }
    type();
  }

  function char2FinishTypewriter(text, arrowEl) {
    if(globalTypewriterTimer2){clearTimeout(globalTypewriterTimer2);globalTypewriterTimer2=null;}
    const el = char2StoryTextEl();
    if(el)el.textContent=text; isTyping2=false; if(arrowEl)arrowEl.classList.add('show');
  }

  const ANIM_FRAMES2 = ['public/pictures/1-7-1.PNG','public/pictures/1-7-2.PNG','public/pictures/1-7-3.PNG','public/pictures/1-7-4.PNG','public/pictures/1-7-5.PNG'];
  let animTimer2 = null;
  function char2StartSpecialAnim(){ animPlayer2.start(250); }
  function char2StopSpecialAnim(){ animPlayer2.stop(); if(animTimer2){clearInterval(animTimer2);animTimer2=null;} }

  function char2SaveProgress(sk,ck){ const base=window.location.href.split('#')[0]; const hash=ck?sk+'|'+ck:sk; localStorage.setItem('currentGamePage',base+'#char2|'+hash); }
  function char2SaveStats(){ localStorage.setItem('rice_game_stats',JSON.stringify({quality:char2Stats.quality,pestResist:char2Stats.pestResist,growth:char2Stats.growth,pesticideUsed:char2Stats.pesticideUsed,finalEnding:char2FinalEnding})); }
  function char2LoadStats(){ try{const r=localStorage.getItem('rice_game_stats');return r?JSON.parse(r):null;}catch(e){return null;} }
  function char3LoadStats(){ try{const r=localStorage.getItem('farmer_game_stats');return r?JSON.parse(r):null;}catch(e){return null;} }

  function char2BeginSalePeriod(){ char2FinalEnding=char2Stats.getEnding(); char2RunScene('s_sale1'); }
  function char2TriggerBad1(){ char2FinalEnding='bad1'; char2RunScene('s_bad1'); }
  function char2FinishEnding(){
    hideHud2();
    localStorage.setItem('last_ending','rice_'+char2FinalEnding);
    localStorage.setItem('rice_'+char2FinalEnding,'true');
    localStorage.setItem('came_from_ending','true');
    if (!localStorage.getItem('first_ending_seen')) {
      localStorage.setItem('first_ending_seen', 'true');
      navTo('ending-anim');
    } else {
      navTo('star');
    }
  }

  function char2TryTriggerSpecial(afterScene, returnChoice){
    const unlocked = localStorage.getItem('rice_good4')==='true';
    if(!unlocked && Math.random()<0.5){ char2SpecialReturnChoice=returnChoice; char2RunScene('sp1'); }
    else char2RunScene(afterScene);
  }

  const SCENES2 = {
    's1':{image:'2-10.PNG',charName:null,texts:{zh:['清晨的陽光灑落在稻田之上。露水沿著葉尖緩緩滑落，微風吹過，整片稻田泛起層層綠浪。'],en:['The morning sun casts its golden light across the paddy field. Dewdrops gently slide down the tips of the leaves, and as a soft breeze blows, ripples of green waves cascade through the rice.']},next:()=>'s2'},
    's2':{image:'2-1.PNG',charName:null,texts:{zh:['你是一株剛進入生長期的水稻，你的使命只有一個：成長並結出健康的稻穗，獲得標章或被農民賣出。','但你能感覺到環境並不單純。','風中，帶著不同的訊號：化學氣味、昆蟲活動、還有人類的干預。','你無法移動，只能選擇「如何成長」。'],en:['You are a rice plant that has just entered its growth phase. You have but one purpose: to mature and bear healthy grains, earning certification or being sold by the farmer.','Yet, you can sense that the environment is far from simple.','Carried on the wind are distinct signals: chemical odors, insect movements, and human interventions.','Stationary and rooted, your only choice is "how to grow".']},next:()=>{char2GoChoice('choose1');return null;}},
    'story_stable1':{image:'2-2.PNG',charName:null,texts:{zh:['你選擇順應自然，慢慢吸收養分。','沒有額外干預，但你能感覺到周圍的威脅正在增加。'],en:["You choose to follow nature's course, slowly absorbing nutrients.",'Without external intervention, you can feel the surrounding threats beginning to increase.']},next:()=>{char2GoChoice('choose1');return null;}},
    'story_pest1':{image:'2-2.PNG',charName:null,texts:{zh:['刺鼻的氣味覆蓋葉面。','你感受到外來物質進入體內，昆蟲的氣息逐漸減少。'],en:['A pungent odor covers the surface of your leaves.','You feel foreign substances entering your body as the presence of insects gradually fades away.']},next:()=>{char2GoChoice('choose2');return null;}},
    'story_lim1_narr':{image:'2-2.PNG',charName:null,texts:{zh:['空氣中出現清新的氣味。','你感受到某種天然的保護，同時維持著自身的品質。'],en:['A fresh, crisp scent fills the air.','You feel a sense of natural protection washing over you while maintaining your overall quality.']},next:()=>'story_lim1_dia'},
    'story_lim1_dia':{image:'2-2.PNG',charName:{zh:'稻米',en:'Rice'},texts:{zh:['好特別，是什麼味道？！居然讓那些蟲都遠離我了'],en:["How unique, what is this smell?! It's actually keeping all those bugs away from me!"]},next:()=>{char2GoChoice('choose3');return null;}},
    'story_stable2':{image:'2-2.PNG',charName:null,texts:{zh:['你選擇順應自然，慢慢吸收養分。','沒有額外干預，但你能感覺到周圍的威脅正在增加。'],en:["You choose to follow nature's course, slowly absorbing nutrients.",'Without external intervention, you can feel the surrounding threats beginning to increase.']},next:()=>{char2GoChoice('choose2');return null;}},
    'story_oldpest_dia':{image:'2-2.PNG',charName:{zh:'稻米',en:'Rice'},texts:{zh:['又有東西撒在我身上了……'],en:['Something is being sprayed on me again...']},next:()=>'story_oldpest_narr'},
    'story_oldpest_narr':{image:'2-2.PNG',charName:null,texts:{zh:['熟悉的氣味再次出現。','你感受到外來物質進入體內，昆蟲的氣息逐漸減少。'],en:['A familiar odor covers you once again.','You feel foreign substances entering your body as the presence of insects gradually fades away.']},next:()=>{char2GoChoice('choose2');return null;}},
    'story_newpest':{image:'2-2.PNG',charName:null,texts:{zh:['熟悉的氣味再次出現。','但這一次，效果似乎不如以往。'],en:['A familiar odor covers you once again.',"However, this time, the effects don't seem to be as potent as they used to be."]},next:()=>{char2GoChoice('choose2');return null;}},
    'story_stable3':{image:'2-2.PNG',charName:null,texts:{zh:['你選擇順應自然，慢慢吸收養分。','沒有額外干預，但你能感覺到周圍的威脅正在增加。'],en:["You choose to follow nature's course, slowly absorbing nutrients.",'Without external intervention, you can feel the surrounding threats beginning to increase.']},next:()=>{char2GoChoice('choose3');return null;}},
    'story_lim2_narr':{image:'2-2.PNG',charName:null,texts:{zh:['氣味持續存在。'],en:['The scent continues to linger in the air.']},next:()=>'story_lim2_dia'},
    'story_lim2_dia':{image:'2-2.PNG',charName:{zh:'稻米',en:'Rice'},texts:{zh:['現在的感覺真棒！'],en:['This feels absolutely amazing right now!']},next:()=>{char2GoChoice('choose3');return null;}},
    's_sale1':{image:'2-4.PNG',charName:null,texts:{zh:['夕陽逐漸染紅整片稻田。','經過漫長的生長後，田間即將迎來人類的評價。','人們再次踏入田間，'],en:['The setting sun gradually dyes the entire rice field crimson.','After a long period of growth, the field is about to face human evaluation.','People step into the field once again.']},next:()=>'s_sale1_dia'},
    's_sale1_dia':{image:'2-4-c.png',charName:{zh:'稻米',en:'Rice'},texts:{zh:['嗯……我會面臨什麼結局呢？'],en:["Hmm... what kind of ending awaits me?"]},next:()=>{const map={bad2:'s5_1',bad3:'s6_1',good1:'s8_1',good2:'s9_1',good3:'s7_1'};return map[char2FinalEnding]||'s7_1';}},
    's_bad1':{image:'2-6.PNG',charName:null,texts:{zh:['你的抗蟲率徹底歸零。','螟蟲開始大規模侵入你的體內結構，不斷啃食莖部與葉片，留下無法修復的傷痕。','原本穩定的生長逐漸被破壞、被中斷，脆弱的身體也開始失去支撐。','你試著撐起逐漸枯黃的葉片，試著維持最後的生命力。','但那些損傷，早已無法恢復。','最終，你的生長提前停止。'],en:['Your power to fight bugs is completely gone.','The bugs start to move deep inside your body in big groups. They keep eating your stems and leaves, leaving hurts that can never be fixed.','Your steady growth is broken and stopped. Your weak body begins to lose its strength to stand.','You try hard to hold up your turning-yellow leaves, trying to keep your last bit of life.','But the damage is already too bad to fix.','In the end, you stop growing too soon.']},next:()=>{char2FinishEnding();return null;}},
    's5_1':{image:'2-5.PNG',charName:null,texts:{zh:['檢測人員進入田間，開始抽查。','「無法販售。」','原本等待運出的稻米，被一袋袋堆放進昏暗的倉庫。','嘆息聲遍布整個農田......'],en:['Inspectors enter the field and begin conducting random checks.','\"These cannot be sold.\"','The rice that was originally waiting to be shipped is stacked bag by bag in a dim warehouse.','Sighs echoed across the entire farmland...']},next:()=>'s5_dia'},
    's5_dia':{image:'2-5-c.png',charName:{zh:'稻米',en:'Rice'},texts:{zh:['怎麼大家都在嘆息…'],en:['Why is everyone sighing...?']},next:()=>'s5_2'},
    's5_2':{image:'2-5.PNG',charName:null,texts:{zh:['人類無力地望著堆積如山的稻米。','而你只能靜靜留在原地，等待著不知道是否還會到來的未來。'],en:['The farmers stare helplessly at the mountain of unsellable rice.','As for you, all you can do is remain where you are, quietly waiting for a future that may never come.']},next:()=>{char2FinishEnding();return null;}},
    's6_1':{image:'2-6.PNG',charName:null,texts:{zh:['螟蟲因為對農藥產生抗藥性而存活，甚至開始擴散。'],en:['The rice leafrollers survive after developing resistance to pesticides and begin spreading across the fields.']},next:()=>'s6_dia'},
    's6_dia':{image:'2-6-c.png',charName:{zh:'稻米',en:'Rice'},texts:{zh:['我的身上都是農藥…','好多蟲都咬我…'],en:["I'm covered in pesticide residues...",'So many insects are feeding on me...']},next:()=>'s6_2'},
    's6_2':{image:'2-6.PNG',charName:null,texts:{zh:['你的身體同時承受到農藥殘留與蟲害破壞。','原本飽滿的你，失去光澤，','市場拒絕了你，田間也早已來不及補救。','最後，你被留倉庫角落，等待著被世界遺忘。'],en:['Your body suffers from both pesticide contamination and insect damage.','Once plump and healthy, you gradually lose your shine.','The market rejects you, and by the time the damage is noticed, it is already too late for the farmers to save the harvest.','In the end, you are left in a dark corner of the warehouse, waiting to be forgotten by the world.']},next:()=>{char2FinishEnding();return null;}},
    's8_1':{image:'2-8.PNG',charName:null,texts:{zh:['沒有任何異常被通報。','外觀正常的你，順利通過檢測，進入了市場。'],en:['No anomalies were reported.','Appearing completely normal on the outside, you smoothly pass inspection and enter the market.']},next:()=>'s8_dia'},
    's8_dia':{image:'2-8-c.png',charName:{zh:'稻米',en:'Rice'},texts:{zh:['咦？我竟然通過檢測了嗎？'],en:['Huh? I actually passed the inspection?']},next:()=>'s8_2'},
    's8_2':{image:'2-8.PNG',charName:null,texts:{zh:['人們照常搬運、販售、購買，沒有人察覺那些隱藏在表面之下的問題。','這是一場沒有被發現的風險。'],en:['People carry, sell, and buy just as they always do. No one notices the issues hidden beneath the surface.','This is a risk that went entirely undetected.']},next:()=>{char2FinishEnding();return null;}},
    's9_1':{image:'2-9.PNG',charName:null,texts:{zh:['你在整個生長過程中始終維持著最佳狀態。','飽滿的稻穗隨風搖曳，葉片健康而完整，在陽光下泛著成熟的光澤。'],en:['You stayed in your best shape during the whole growing time.','Your heavy rice ears swing in the wind. Your leaves are healthy and whole, shining under the bright sun.']},next:()=>'s9_dia'},
    's9_dia':{image:'2-9-c.png',charName:{zh:'稻米',en:'Rice'},texts:{zh:['大家快看我快看我！'],en:['Everyone, Look at me!']},next:()=>'s9_2'},
    's9_2':{image:'2-9.PNG',charName:null,texts:{zh:['收成時，人們讚賞的聲音與欣慰的目光，落在你與整片稻田之上。','你的存在，被人們認可。','而你，也成為了這片田間最理想的典範。'],en:['During harvest time, people look at you and the whole field with happy smiles and praise you.','People accept and love who you are.','And you become the most perfect example for this field.']},next:()=>{char2FinishEnding();return null;}},
    's7_1':{image:'2-7.PNG',charName:null,texts:{zh:['沒有遭遇極端的風險，也沒有留下特別耀眼的成果。','你順利被收割、包裝，最後送往市場販售。','沒有人特別記住你，卻也沒有任何人將你淘汰。','這或許不是最亮眼的一年，但至少一切都平穩地落下了帷幕。'],en:['You did not face any big dangers, but you also did not make anything amazing.','You are harvested, packed, and sent to the market to be sold without any trouble.','No one remembers you in a special way, but no one throws you away either.','This may not be the brightest year, but at least everything ends in a quiet, peaceful way.']},next:()=>{char2FinishEnding();return null;}},
    'sp1':{image:'2-3.PNG',charName:null,texts:{zh:['突然，你感受到異常的震動。','你的部分組織，被人類帶離田間。'],en:['Suddenly, you feel an unusual vibration.','A part of your tissue is taken away from the field by humans.']},next:()=>'sp2'},
    'sp2':{image:'1-7-1.PNG',animated:true,charName:{zh:'稻米',en:'Rice'},texts:{zh:['這….這是哪？','怎麼沒有熟悉的泥土，也沒有原本的氣味？'],en:['Where... where am I?','Why is there no familiar soil, and no original home?']},next:()=>'sp3'},
    'sp3':{image:'1-8.PNG',charName:null,texts:{zh:['你被移植到另一個環境。'],en:['You have been transplanted into a completely different environment.']},next:()=>'sp3_dia'},
    'sp3_dia':{image:'1-8.PNG',charName:{zh:'稻米',en:'Rice'},texts:{zh:['發生了什麼事…..？'],en:['What just happened...?']},next:()=>'sp4'},
    'sp4':{image:'1-8.PNG',charName:null,texts:{zh:['你的成長，已經不再屬於自然。'],en:['Your growth no longer belongs to nature.']},next:()=>{char2FinalEnding='good4';char2FinishEnding();return null;}}
  };

  const CHOICES2 = {
    choose1:{title:{zh:'請選擇你的生長方式：',en:'Choose your growth strategy:'},options:[
      {zh:'穩定生長',en:'Stable Growth',action(){char2Stats.add('quality',20);char2Stats.add('pestResist',-20);char2Stats.add('growth',20);if(char2Stats.pestResist<=0){char2TriggerBad1();return;}char2RunScene('story_stable1');}},
      {zh:'使用農藥',en:'Apply Pesticides',action(){char2Stats.add('pestResist',20);char2Stats.add('pesticideUsed',30);char2Stats.add('growth',20);char2TryTriggerSpecial('story_pest1','choose2');}},
      {zh:'使用檸檬烯',en:'Synthesize Limonene',action(){char2Stats.add('quality',20);char2Stats.add('pestResist',10);char2Stats.add('growth',10);char2TryTriggerSpecial('story_lim1_narr','choose3');}}
    ]},
    choose2:{title:{zh:'請選擇你的生長方式：',en:'Choose your growth strategy:'},options:[
      {zh:'穩定生長',en:'Stable Growth',action(){char2Stats.add('quality',20);char2Stats.add('pestResist',-20);char2Stats.add('growth',20);if(char2Stats.pestResist<=0){char2TriggerBad1();return;}char2RunScene('story_stable2');}},
      {zh:'使用十年前的農藥',en:'Apply Pesticides from Ten Years Ago',action(){char2Stats.add('pestResist',20);char2Stats.add('pesticideUsed',30);char2Stats.add('growth',20);char2RunScene('story_oldpest_dia');}},
      {zh:'使用近期的農藥',en:'Apply Modern-Day Pesticides',action(){char2Stats.add('pesticideUsed',30);char2Stats.add('growth',10);char2RunScene('story_newpest');}}
    ]},
    choose3:{title:{zh:'請選擇你的生長方式：',en:'Choose your growth strategy:'},options:[
      {zh:'穩定生長',en:'Stable Growth',action(){char2Stats.add('quality',20);char2Stats.add('pestResist',-20);char2Stats.add('growth',20);if(char2Stats.pestResist<=0){char2TriggerBad1();return;}char2RunScene('story_stable3');}},
      {zh:'使用檸檬烯',en:'Apply Limonene',action(){char2Stats.add('quality',20);char2Stats.add('pestResist',10);char2Stats.add('growth',10);char2RunScene('story_lim2_narr');}}
    ]}
  };

  function char2RunScene(key){
    const scene=SCENES2[key]; if(!scene)return;
    char2CurrentScene=key; char2CurrentPart=0;
    char2CurrentTexts=scene.texts[gameLang]||scene.texts['zh'];
    char2StopSpecialAnim();
    if(scene.animated){ document.getElementById('animFrameContainer2')?.style.setProperty('display','block'); char2GameImageEl().style.display='none'; animPlayer2.start(250); }
    else { const ac2=document.getElementById('animFrameContainer2'); if(ac2)ac2.style.display='none'; char2GameImageEl().style.display=''; char2GameImageEl().src='public/pictures/'+scene.image; }
    if(scene.charName){char2CharNameEl().classList.remove('hidden');char2CharNameEl().innerText=gameLang==='en'?scene.charName.en:scene.charName.zh;char2SceneWrapper().classList.add('scene-dialogue');}
    else{char2CharNameEl().classList.add('hidden');char2SceneWrapper().classList.remove('scene-dialogue');}
    char2ChoicesBox().classList.remove('show');
    char2StoryTextBox().classList.remove('blur');
    char2GameImageEl().style.filter='';
    const hud2r=document.getElementById('char2Hud'); if(hud2r) hud2r.classList.remove('choices-blur');
    char2CurrentChoiceKey=null;
    char2SaveProgress(key,null);
    char2ShowNextLine();
  }

  function char2ShowNextLine(){
    if(char2CurrentPart<char2CurrentTexts.length){
      const text=char2CurrentTexts[char2CurrentPart++];
      char2RunTypewriter(text,char2Arrow(),null);
    } else {
      const scene=SCENES2[char2CurrentScene];
      const nextKey=scene.next();
      if(nextKey)char2RunScene(nextKey);
      else if(char2SpecialReturnChoice){const c=char2SpecialReturnChoice;char2SpecialReturnChoice=null;char2GoChoice(c);}
    }
  }

  function char2RenderChoiceBox(key){
    const data=CHOICES2[key]; if(!data)return;
    char2ChoicesBox().classList.add('show');
    char2StoryTextBox().classList.add('blur');
    char2GameImageEl().style.filter='blur(8px)';
    char2Arrow().classList.remove('show');
    const hud2 = document.getElementById('char2Hud'); if(hud2) hud2.classList.add('choices-blur');
    char2ChoicesTitle().innerText=data.title[gameLang]||data.title['zh'];
    char2ChoicesList().innerHTML='';
    data.options.forEach(opt=>{
      const li=document.createElement('li'),btn=document.createElement('button');
      btn.className='choice-button'; btn.innerText=gameLang==='en'?opt.en:opt.zh;
      btn.addEventListener('click',()=>{
        const hud2=document.getElementById('char2Hud'); if(hud2) hud2.classList.remove('choices-blur');
        char2ChoicesBox().classList.remove('show');
        opt.action();
      }); li.appendChild(btn); char2ChoicesList().appendChild(li);
    });
  }

  function char2ShowGrowthTip(key){
    const overlay = document.getElementById('char2GrowthTip');
    const tipContent = document.getElementById('char2GrowthTipContent');
    const tipTitle = document.getElementById('char2GrowthTipTitle');
    const arrow = document.getElementById('char2GrowthTipArrow');
    const lang = gameLang || 'en';
    tipTitle.textContent = lang === 'zh' ? '遊戲提示' : 'Game Tips';
    tipContent.innerHTML = lang === 'zh'
      ? '當<strong>生長值</strong>到達 100% 時即可進入下一階段！'
      : 'When the <strong>Growth Value</strong> reaches 100%, you can advance to the next stage!';
    overlay.classList.add('show');
    function closeTip() {
      overlay.classList.remove('show');
      char2RenderChoiceBox(key);
    }
    arrow.onclick = closeTip;
    overlay.onclick = e => { if (e.target === overlay) closeTip(); };
  }

  function char2GoChoice(key){
    if(char2Stats.pestResist<=0){char2TriggerBad1();return;}
    if(char2Stats.growth>=100){char2BeginSalePeriod();return;}
    const data=CHOICES2[key]; if(!data)return;
    char2CurrentChoiceKey=key;
    char2SaveProgress(char2CurrentScene,key);
    // Force-close the tip on every call, to avoid overlapping visuals if it wasn't closed before navigating away and back
    const growthTipOverlay = document.getElementById('char2GrowthTip');
    if (growthTipOverlay) growthTipOverlay.classList.remove('show');
    updateHud2();
    // First entry: key is choose1 and all four stats are still at their initial values
    const isFirstVisit = key === 'choose1'
      && char2Stats.growth       === 0
      && char2Stats.quality      === 0
      && char2Stats.pestResist   === 50
      && char2Stats.pesticideUsed=== 0;
    if (isFirstVisit) {
      char2ChoicesBox().classList.remove('show');
      char2StoryTextBox().classList.add('blur');
      char2GameImageEl().style.filter='blur(8px)';
      char2Arrow().classList.remove('show');
      char2ShowGrowthTip(key); // the tip function controls the choices box's visibility
      return;
    }
    char2RenderChoiceBox(key);
  }

  function initChar2(){
    char2Stats.quality=0;char2Stats.pestResist=50;char2Stats.growth=0;char2Stats.pesticideUsed=0;
    char2FinalEnding=null; char2CurrentChoiceKey=null; char2SpecialReturnChoice=null;
    char2SaveStats(); // Save the initial state immediately, so resumeGame reads the correct initial values if the player leaves and returns mid-game
    char2RunScene('s1');
    const stb=char2StoryTextBox();
    stb.onclick=()=>{if(char2ChoicesBox().classList.contains('show'))return;char2ShowNextLine();};
  }

  window.addEventListener('languageChanged',e=>{
    if(currentPage==='char2'){
      const l=e.detail.lang;
      if(char2CurrentChoiceKey)char2GoChoice(char2CurrentChoiceKey);
      else if(char2CurrentScene)char2RunScene(char2CurrentScene);
    }
  });