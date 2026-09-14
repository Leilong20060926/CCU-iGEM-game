/* ══════════════════════════════════════════
     CHARACTER 3 (Farmer) LOGIC
  ══════════════════════════════════════════ */
  let globalTypewriterTimer3 = null;
  let isTyping3 = false;
  let char3CurrentScene=null, char3CurrentTexts=[], char3CurrentPart=0, char3CurrentChoiceKey=null, char3FinalEnding=null;

  const char3Arrow=()=>document.getElementById('nextArrow3');
  const char3CharNameEl=()=>document.getElementById('charName3');
  const char3GameImageEl=()=>document.getElementById('gameImage3');
  const char3ChoicesBox=()=>document.getElementById('choicesContainer3');
  const char3ChoicesTitle=()=>document.getElementById('choicesTitle3');
  const char3ChoicesList=()=>document.getElementById('choicesList3');
  const char3StoryTextBox=()=>document.getElementById('storyTextBox3');
  const char3StoryTextEl=()=>document.getElementById('storyText3');
  const char3SceneWrapper=()=>document.getElementById('sceneWrapper3');
  const char3OverlayBtn=()=>document.getElementById('sceneOverlayBtn3');

  const char3Stats={money:50,health:50,stress:0,reputation:0,
    add(k,v){this[k]=(this[k]||0)+v;updateHud3();},
    isHealthy(){return this.health>0&&this.stress<100;},
    rollBadEnding(){const r=Math.random();if(r<0.2)return'bad2';if(r<0.6)return'bad3';return'bad4';},
    harvestEnding(){if(this.reputation<-50)return'bad2';if(this.reputation>100)return'good1';return'good2';}
  };

  function char3RunTypewriter(text,arrowEl,onComplete){
    const el=char3StoryTextEl();
    if(!el)return;
    if(!text){if(arrowEl)arrowEl.classList.add('show');if(onComplete)onComplete();return;}
    if(globalTypewriterTimer3){clearTimeout(globalTypewriterTimer3);globalTypewriterTimer3=null;}
    el.textContent='';let i=0;isTyping3=true;
    if(arrowEl)arrowEl.classList.remove('show');
    function type(){
      if(i<text.length){el.textContent+=text[i++];globalTypewriterTimer3=setTimeout(type,40);}
      else{globalTypewriterTimer3=null;isTyping3=false;if(arrowEl)arrowEl.classList.add('show');if(onComplete)onComplete();}
    }
    type();
  }

  function char3FinishTypewriter(text,arrowEl){
    if(globalTypewriterTimer3){clearTimeout(globalTypewriterTimer3);globalTypewriterTimer3=null;}
    const el=char3StoryTextEl();if(el)el.textContent=text;isTyping3=false;if(arrowEl)arrowEl.classList.add('show');
  }

  function char3SaveProgress(sk,ck){const base=window.location.href.split('#')[0];const hash=ck?sk+'|'+ck:sk;localStorage.setItem('currentGamePage',base+'#char3|'+hash);}
  function char3SaveStats(){localStorage.setItem('farmer_game_stats',JSON.stringify({money:char3Stats.money,health:char3Stats.health,stress:char3Stats.stress,reputation:char3Stats.reputation,finalEnding:char3FinalEnding}));}
  function char3LoadStats(){try{const raw=localStorage.getItem('farmer_game_stats');return raw?JSON.parse(raw):null;}catch(e){return null;}}

  function char3FinishEnding(ending){
    hideHud3();
    char3FinalEnding=ending;
    localStorage.setItem('last_ending','farmer_'+ending);
    localStorage.setItem('farmer_'+ending,'true');
    localStorage.setItem('came_from_ending','true');
    char3SaveStats();
    if (!localStorage.getItem('first_ending_seen')) {
      localStorage.setItem('first_ending_seen', 'true');
      navTo('ending-anim');
    } else {
      navTo('star');
    }
  }

  function afterChoice3(pk){return afterChoicePeriodLock3(pk,pk);}
  function afterChoicePeriodLock3(cur,next){
    char3SaveStats();
    if(char3Stats.money<=0)return'bad1';
    if(!char3Stats.isHealthy())return char3Stats.rollBadEnding();
    if(char3Stats.money>=300)return's_harvest_start';
    char3GoChoice(next);return null;
  }
  function afterChoicePeriodLockOrShortcut3(cur,next){
    char3SaveStats();
    if(char3Stats.money<=0)return'bad1';
    if(!char3Stats.isHealthy())return char3Stats.rollBadEnding();
    if(char3Stats.money>=300)return's_harvest_start';
    if(!localStorage.getItem('farmer_good3')&&Math.random()<0.5){localStorage.setItem('farmer_good3','true');return'g3_1';}
    char3GoChoice(next);return null;
  }

  const SCENES3={
    's1':{image:'3-1.PNG',charName:null,texts:{zh:['清晨五點，天還沒完全亮，你踩進濕冷的田裡，鞋底沾滿泥水。'],en:['It is 5 AM, the sky has not yet fully brightened. You step into the cold, damp field, your shoes caked in mud.']},next:()=>'s2'},
    's2':{image:'3-2.PNG',charName:null,texts:{zh:['空中傳來細微的振翅聲。'],en:['A faint sound of flapping wings comes from the air.']},next:()=>'c1'},
    'c1':{image:'3-2.PNG',charName:{zh:'農民',en:'Farmer'},texts:{zh:['唉，又是瘤野螟......'],en:['Sigh, rice leaffolders again...']},next:()=>'nibble'},
    'nibble':{image:'3-2.PNG',charName:null,texts:{zh:['你伸手撥開稻葉，發現部分稻米葉面上殘留著被啃食過的痕跡。'],en:['You reach out to part the rice leaves, only to find traces of nibbling on the surface of some of the leaves.']},next:()=>'c2'},
    'c2':{image:'3-2.PNG',charName:{zh:'農民',en:'Farmer'},texts:{zh:['瘤野螟，你完蛋了！'],en:['Rice leaffolder, you are done for!']},next:()=>'goal'},
    'goal':{image:'3-2.PNG',charName:null,texts:{zh:['為了避免讓瘤野螟大量繁殖，破壞整片稻田，你內心只有一個目標：斬殺瘤野螟，成功收成，賺到滿滿的錢。','接下來，輪到你，接下這片田。'],en:['To prevent the rice leaffolders from multiplying and destroying the entire paddy, your goal is singular: eradicate them, secure a successful harvest, and make a fortune.','Now, it is your turn to take over this field.']},next:()=>{char3GoChoice('period1');return null;}},
    'p1_stable':{image:'3-2.PNG',charName:null,texts:{zh:['你按照了你的老方法來種植，想說至少還能控制。'],en:['You follow your usual farming method, hoping at least to maintain control.']},next:()=>afterChoice3('period1')},
    'p1_pesticide':{image:'3-2.PNG',charName:null,texts:{zh:['你知道這不是長久之計，但現在沒有時間猶豫，先活下來再說吧！'],en:["You know this isn't a long-term solution, but there is no time to hesitate. Survive first."]},next:()=>afterChoicePeriodLockOrShortcut3('period1','period2')},
    'p1_limonene':{image:'3-2.PNG',charName:null,texts:{zh:['你聽說這種方法比較安全，想著先試試看吧！好像還滿不錯的！'],en:["You've heard this method is safer, so you decide to give it a try. It actually seems pretty good."]},next:()=>afterChoicePeriodLockOrShortcut3('period1','period3')},
    'p1_borrow':{image:'3-3.PNG',charName:null,texts:{zh:['沒錢了，你決定先借錢投資，晚一點再考慮稻米。'],en:['You have no money left, so you decide to borrow money and invest first, and deal with the rice later.']},next:()=>afterChoice3('period1')},
    'p1_rest':{image:'3-4.PNG',charName:null,texts:{zh:['你決定休息，給水稻們自己造化，反正船到橋頭自然直。'],en:['You decide to rest and let the rice plants take their own course. After all, things will work out when the time comes.']},next:()=>afterChoice3('period1')},
    'p2_stable':{image:'3-2.PNG',charName:null,texts:{zh:['用穩定的方式種植，穩穩的種出新的稻米。'],en:['You return to a steady farming method, producing new rice calmly and consistently.']},next:()=>afterChoice3('period2')},
    'p2_pesticide':{image:'3-2.PNG',charName:null,texts:{zh:['這次使出絕命毒殺技，使出農藥絕殺！'],en:['This time you unleash an "ultimate pesticide strike," fully committing to chemical control.']},next:()=>afterChoice3('period2')},
    'p2_borrow':{image:'3-3.PNG',charName:null,texts:{zh:['沒錢了，你決定先借錢投資，晚一點再考慮稻米。'],en:['You have no money left, so you decide to borrow money and invest first, and deal with the rice later.']},next:()=>afterChoice3('period2')},
    'p2_rest':{image:'3-4.PNG',charName:null,texts:{zh:['你決定休息，給水稻們自己造化，反正船到橋頭自然直。'],en:['You decide to rest and let the rice plants take their own course. After all, things will work out when the time comes.']},next:()=>afterChoice3('period2')},
    'p3_stable':{image:'3-2.PNG',charName:null,texts:{zh:['用穩定的方式種植，穩穩的種出新的稻米。'],en:['You return to a steady farming method, producing new rice calmly and consistently.']},next:()=>afterChoice3('period3')},
    'p3_limonene':{image:'3-2.PNG',charName:null,texts:{zh:['走在水稻時尚前端的你，決定試試這新款的檸檬烯！'],en:["Staying at the forefront of rice farming trends, you decide to try this new limonene-based approach."]},next:()=>afterChoice3('period3')},
    'p3_borrow':{image:'3-3.PNG',charName:null,texts:{zh:['沒錢了，你決定先借錢投資，晚一點再考慮稻米。'],en:['You have no money left, so you decide to borrow money and invest first, and deal with the rice later.']},next:()=>afterChoice3('period3')},
    'p3_rest':{image:'3-4.PNG',charName:null,texts:{zh:['你決定休息，給水稻們自己造化，反正船到橋頭自然直。'],en:['You decide to rest and let the rice plants take their own course. After all, things will work out when the time comes.']},next:()=>afterChoice3('period3')},
    's_harvest_start':{image:'2-4.PNG',charName:null,texts:{zh:['收割開始了，機器進入田間，一排一排稻穗被整齊割下。','你先前的努力即將揭曉。'],en:["The harvest begins. Machines enter the field, and rows of rice stalks are neatly cut down one by one.","Everything you've done so far is about to be revealed."]},next:()=>{if(char3Stats.reputation<-50)return'harvest_bad2_1';if(char3Stats.reputation>100)return'good1_1';return'good2';}},
    'harvest_bad2_1':{image:'2-5.PNG',charName:null,texts:{zh:['市場早已對你的稻米失去信任。','即使完成收成，仍無法順利進入販售流程。','部分稻米被退回，部分滯留倉庫。','田地仍在運作，但產出不再被認可。'],en:['The market has already lost trust in your rice.','Even after the harvest is completed, it still cannot smoothly enter the sales process.','Some of the rice is returned, while some remains stuck in storage warehouses.','The fields continue to operate, but the produce is no longer recognized.']},next:()=>'harvest_bad2_c'},
    'harvest_bad2_c':{image:'2-5-cf.png',charName:{zh:'農民',en:'Farmer'},texts:{zh:['怎麼會這樣......'],en:['How did it come to this...']},next:()=>'harvest_bad2_2'},
    'harvest_bad2_2':{image:'2-5.PNG',charName:null,texts:{zh:['過去的選擇累積成結果，影響的不只是這一季的收成。'],en:["Past choices have accumulated into consequences, affecting not just this season's harvest."]},next:()=>{char3FinishEnding('bad2');return null;}},
    'g3_1':{image:'3-5.PNG',imageen:'3-5-2.PNG',charName:null,texts:{zh:['你在整理收成資料時，手機裡冒出了一則通知。'],en:['While you are organizing the harvest data, a notification suddenly pops up on your phone.']},next:()=>'g3_2'},
    'g3_2':{image:'3-6.PNG',imageen:'3-6-2.PNG',charName:null,buttonScene:true,texts:{zh:[],en:[]},next:()=>'g3_3'},
    'g3_3':{image:'3-7.png',charName:null,texts:{zh:['隔天，你與IGEM 10團隊聊了許多稻田的種種與研究的內容。'],en:['The next day, you spend a long time talking with iGEM Team 10 about rice fields and their research.']},next:()=>'g3_4'},
    'g3_4':{image:'3-7-c.png',charName:{zh:'農民',en:'Farmer'},texts:{zh:['這些秧苗給你們，一起來捕捉瘤野螟吧！'],en:["Here are the seedlings for you. Let's capture the rice leafrollers together!"]},next:()=>'g3_5'},
    'g3_5':{image:'3-7.png',charName:null,texts:{zh:['稻米被裝進了紙箱中，瘤野螟的幼蟲與成蟲則被裝進了昆蟲箱。'],en:['The rice plants are carefully packed into cardboard boxes, while the larvae and adult rice leafrollers are placed into insect containers for study.']},next:()=>'g3_6'},
    'g3_6':{image:'3-7-c.png',charName:{zh:'農民',en:'Farmer'},texts:{zh:['再見！我相信你們可以的！'],en:['Goodbye! I believe you can do it!']},next:()=>'g3_7'},
    'g3_7':{image:'3-7.png',charName:null,texts:{zh:['你在田埂上和他們道別並加以鼓勵。','風吹過稻浪，田裡恢復安靜，','但你知道，有些答案，正在遠方被慢慢拼出來。'],en:['You say farewell on the edge of the field, offering them encouragement.','The wind passes through the waves of rice plants, and the field falls quiet once again.','But you know—some answers are still being slowly pieced together somewhere far away.']},next:()=>{char3FinishEnding('good3');return null;}},
    'bad1':{image:'3-4.PNG',charName:null,texts:{zh:['帳戶裡的數字終於歸零。','借不到錢、賣不出稻米，這片田你再也撐不下去了。','你只能黯然放棄這次的耕種。'],en:['The number in your account finally hits zero.','Unable to borrow more or sell any rice, you cannot keep this field going any longer.','You have no choice but to give up this harvest.']},next:()=>{char3FinishEnding('bad1');return null;}},
    'bad2':{image:'2-5.PNG',charName:null,texts:{zh:['你持續借錢擴張並大量使用農藥。','田區開始被外部檢查介入。','用藥紀錄與異常數據被放大檢視。','最終，收成被封存，無法販售，信任中斷，一切停止。'],en:['You keep borrowing money to grow bigger and use a large amount of pesticides.','Outside inspectors start to step into your fields.','Your spray records and strange data are put under a big magnifying glass.','In the end, your harvest is sealed away and cannot be sold. Trust is broken, and everything stops.']},next:()=>{char3FinishEnding('bad2');return null;}},
    'good2':{image:'2-7.PNG',charName:null,texts:{zh:['收成與販售過程順利完成。','未出現重大問題，也未有特別突出的成果。','整體維持基本穩定。','田地持續運作，資源得以延續至下一季。','本季以平穩的狀態結束。'],en:['The harvest and sales process are completed smoothly.','No major problems occur, but there are also no particularly outstanding results.','Overall, things remain basically stable.','The field continues to operate, and resources are carried over to the next season.','This season ends in a steady, uneventful state.']},next:()=>{char3FinishEnding('good2');return null;}},
    'good1_1':{image:'2-9.PNG',charName:null,texts:{zh:['整體種植過程穩定，品質與管理受到肯定。','產品順利通過市場檢驗，並獲得良好評價。','收成後的產品不僅成功完成販售，也逐漸累積了市場信任，為下一季的合作與機會奠定基礎。'],en:['The overall cultivation process remained stable, and both quality and management were well recognized.','The product successfully passed market inspections and received positive evaluations.','After harvest, the rice was not only successfully sold but also gradually built market trust, laying the foundation for future cooperation and opportunities.']},next:()=>'good1_c'},
    'good1_c':{image:'2-9-cf.png',charName:{zh:'農民',en:'Farmer'},texts:{zh:['好欸，成功達成目標了！'],en:['Yes, I did it—I reached my goal!']},next:()=>'good1_2'},
    'good1_2':{image:'2-9.PNG',charName:null,texts:{zh:['最終，本季的表現被視為一次成功的種植案例。'],en:['In the end, this season was regarded as a successful farming case study.']},next:()=>{char3FinishEnding('good1');return null;}},
    'bad3':{image:'2-5.PNG',charName:null,texts:{zh:['你持續借錢擴張並大量使用農藥。','你的身體開始無法負荷長期壓力與化學暴露。'],en:['You keep borrowing money to grow bigger and use a large amount of pesticides.','Your body begins to break down from the long-term stress and the chemicals.']},next:()=>'bad3_c'},
    'bad3_c':{image:'2-5-cf.png',charName:{zh:'農民',en:'Farmer'},texts:{zh:['咳咳咳......'],en:['Cough, cough, cough...']},next:()=>'bad3_2'},
    'bad3_2':{image:'2-5.PNG',charName:null,texts:{zh:['田還在，但你已經無法長時間停留。'],en:['The field is still there, but you can no longer stay in it for long.']},next:()=>{char3FinishEnding('bad3');return null;}},
    'bad4':{image:'2-6.PNG',charName:null,texts:{zh:['你持續借錢擴張並大量使用農藥。','螟蟲逐漸適應並擴散，田間失去控制。','生態崩壞，產量與品質同步下滑。'],en:['You keep borrowing money to grow bigger and use a large amount of pesticides.','The bugs slowly get used to the chemicals and spread, and the field goes out of control.','The nature around you breaks down, and both your harvest amount and its quality drop at the same time.']},next:()=>{char3FinishEnding('bad4');return null;}}
  };

  const CHOICES3={
    period1:{title:{zh:'請選擇你的種植方式：',en:'Choose your cultivation method:'},options:[
      {zh:'穩定種植',en:'Stable Cultivation',action(){char3Stats.add('money',20);char3Stats.add('health',5);char3Stats.add('stress',-5);char3Stats.add('reputation',5);char3RunScene('p1_stable');}},
      {zh:'使用農藥',en:'Use Pesticides',action(){char3Stats.add('money',60);char3Stats.add('health',-25);char3Stats.add('stress',20);char3Stats.add('reputation',-10);char3RunScene('p1_pesticide');}},
      {zh:'使用檸檬烯',en:'Use Limonene',action(){char3Stats.add('money',20);char3Stats.add('health',5);char3Stats.add('stress',5);char3Stats.add('reputation',15);char3RunScene('p1_limonene');}},
      {zh:'借錢投資',en:'Borrow Money for Investment',action(){char3Stats.add('money',100);char3Stats.add('stress',60);char3RunScene('p1_borrow');}},
      {zh:'休息',en:'Rest',action(){char3Stats.add('health',20);char3Stats.add('stress',-20);char3Stats.add('money',-20);char3RunScene('p1_rest');}}
    ]},
    period2:{title:{zh:'請選擇你的種植方式：',en:'Choose your cultivation method:'},options:[
      {zh:'穩定種植',en:'Stable Cultivation',action(){char3Stats.add('money',20);char3Stats.add('health',5);char3Stats.add('stress',-5);char3Stats.add('reputation',5);char3RunScene('p2_stable');}},
      {zh:'使用農藥',en:'Use Pesticides',action(){char3Stats.add('money',60);char3Stats.add('health',-25);char3Stats.add('stress',20);char3Stats.add('reputation',-10);char3RunScene('p2_pesticide');}},
      {zh:'借錢投資',en:'Borrow Money for Investment',action(){char3Stats.add('money',100);char3Stats.add('stress',60);char3RunScene('p2_borrow');}},
      {zh:'休息',en:'Rest',action(){char3Stats.add('health',20);char3Stats.add('stress',-20);char3Stats.add('money',-20);char3RunScene('p2_rest');}}
    ]},
    period3:{title:{zh:'請選擇你的種植方式：',en:'Choose your cultivation method:'},options:[
      {zh:'穩定種植',en:'Stable Cultivation',action(){char3Stats.add('money',20);char3Stats.add('health',5);char3Stats.add('stress',-5);char3Stats.add('reputation',5);char3RunScene('p3_stable');}},
      {zh:'使用檸檬烯',en:'Use Limonene',action(){char3Stats.add('money',20);char3Stats.add('health',5);char3Stats.add('stress',5);char3Stats.add('reputation',15);char3RunScene('p3_limonene');}},
      {zh:'借錢投資',en:'Borrow Money for Investment',action(){char3Stats.add('money',100);char3Stats.add('stress',60);char3RunScene('p3_borrow');}},
      {zh:'休息',en:'Rest',action(){char3Stats.add('health',20);char3Stats.add('stress',-20);char3Stats.add('money',-20);char3RunScene('p3_rest');}}
    ]}
  };

  function char3RunScene(key){
    const scene=SCENES3[key];if(!scene)return;
    char3CurrentScene=key;char3CurrentPart=0;
    char3CurrentTexts=scene.texts[gameLang]||scene.texts['zh'];
    char3GameImageEl().src='public/pictures/'+(gameLang==='en'&&scene.imageen?scene.imageen:scene.image);
    if(scene.charName){char3CharNameEl().classList.remove('hidden');char3CharNameEl().innerText=gameLang==='en'?scene.charName.en:scene.charName.zh;char3SceneWrapper().classList.add('scene-dialogue');}
    else{char3CharNameEl().classList.add('hidden');char3SceneWrapper().classList.remove('scene-dialogue');}
    char3ChoicesBox().classList.remove('show');
    char3StoryTextBox().classList.remove('blur');
    char3GameImageEl().style.filter='';
    const hud3r=document.getElementById('char3Hud'); if(hud3r) hud3r.classList.remove('choices-blur');
    char3CurrentChoiceKey=null;
    char3SaveProgress(key,null);
    if(scene.buttonScene){
      char3StoryTextBox().style.display='none';
      const btn=char3OverlayBtn();
      btn.classList.remove('hidden');
      btn.style.backgroundImage=`url('public/buttoms/${gameLang==='en'?'3-6-2_buttom.png':'3-6_buttom.PNG'}')`;
      btn.onclick=()=>{btn.classList.add('hidden');char3StoryTextBox().style.display='';const nk=scene.next();if(nk)char3RunScene(nk);};
      return;
    }
    char3OverlayBtn().classList.add('hidden');char3StoryTextBox().style.display='';
    char3ShowNextLine();
  }

  function char3ShowNextLine(){
    if(char3CurrentPart<char3CurrentTexts.length){
      const text=char3CurrentTexts[char3CurrentPart++];
      char3RunTypewriter(text,char3Arrow(),null);
    } else {
      const scene=SCENES3[char3CurrentScene];
      const nk=scene.next();if(nk)char3RunScene(nk);
    }
  }

  function char3RenderChoiceBox(key){
    const data=CHOICES3[key];if(!data)return;
    char3ChoicesBox().classList.add('show');
    char3StoryTextBox().classList.add('blur');
    char3GameImageEl().style.filter='blur(8px)';
    char3Arrow().classList.remove('show');
    const hud3 = document.getElementById('char3Hud'); if(hud3) hud3.classList.add('choices-blur');
    char3ChoicesTitle().innerText=data.title[gameLang]||data.title['zh'];
    char3ChoicesList().innerHTML='';
    data.options.forEach(opt=>{
      const li=document.createElement('li'),btn=document.createElement('button');
      btn.className='choice-button';btn.innerText=gameLang==='en'?opt.en:opt.zh;
      btn.addEventListener('click',()=>{
        const hud3=document.getElementById('char3Hud'); if(hud3) hud3.classList.remove('choices-blur');
        char3ChoicesBox().classList.remove('show');
        opt.action();
      });li.appendChild(btn);char3ChoicesList().appendChild(li);
    });
  }

  function char3ShowMoneyTip(key){
    const overlay = document.getElementById('char3MoneyTip');
    const tipContent = document.getElementById('char3MoneyTipContent');
    const tipTitle = document.getElementById('char3MoneyTipTitle');
    const arrow = document.getElementById('char3MoneyTipArrow');
    const lang = gameLang || 'en';
    tipTitle.textContent = lang === 'zh' ? '遊戲提示' : 'Game Tips';
    tipContent.innerHTML = lang === 'zh'
      ? '當<strong>金錢</strong>到達 100% 時即可進入下一階段！'
      : 'When <strong>Money</strong> reaches 100%, you can advance to the next stage!';
    overlay.classList.add('show');
    function closeTip() {
      overlay.classList.remove('show');
      char3RenderChoiceBox(key);
    }
    arrow.onclick = closeTip;
    overlay.onclick = e => { if (e.target === overlay) closeTip(); };
  }

  function char3GoChoice(key){
    const data=CHOICES3[key];if(!data)return;
    char3CurrentChoiceKey=key;
    char3SaveProgress(char3CurrentScene,key);
    // Force-close the tip on every call, to avoid overlapping visuals if it wasn't closed before navigating away and back
    const moneyTipOverlay = document.getElementById('char3MoneyTip');
    if (moneyTipOverlay) moneyTipOverlay.classList.remove('show');
    updateHud3();
    // First entry: key is period1 and all four stats are still at their initial values
    const isFirstVisit = key === 'period1'
      && char3Stats.money      === 50
      && char3Stats.health     === 50
      && char3Stats.stress     === 0
      && char3Stats.reputation === 0;
    if (isFirstVisit) {
      char3ChoicesBox().classList.remove('show');
      char3StoryTextBox().classList.add('blur');
      char3GameImageEl().style.filter='blur(8px)';
      char3Arrow().classList.remove('show');
      char3ShowMoneyTip(key); // the tip function controls the choices box's visibility
      return;
    }
    char3RenderChoiceBox(key);
  }

  function initChar3(){
    char3Stats.money=50;char3Stats.health=50;char3Stats.stress=0;char3Stats.reputation=0;
    char3FinalEnding=null;char3CurrentChoiceKey=null;
    char3SaveStats(); // Save the initial state immediately, so resumeGame reads the correct initial values if the player leaves and returns mid-game
    char3RunScene('s1');
    const stb=char3StoryTextBox();
    stb.onclick=()=>{if(char3ChoicesBox().classList.contains('show'))return;char3ShowNextLine();};
  }

  window.addEventListener('languageChanged',e=>{
    if(currentPage==='char3'){
      if(char3CurrentChoiceKey)char3GoChoice(char3CurrentChoiceKey);
      else if(char3CurrentScene)char3RunScene(char3CurrentScene);
    }
  });