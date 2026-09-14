/* ══════════════════════════════════════════
     ENDING ANIMATION PAGE (from a.html)
  ══════════════════════════════════════════ */
  const ENDING_ANIM_SCENES = [
    {
      id: '1-7',
      frames: ['public/pictures/1-7-1.PNG','public/pictures/1-7-2.PNG','public/pictures/1-7-3.PNG','public/pictures/1-7-4.PNG','public/pictures/1-7-5.PNG'],
      interval: 250, next: 'a1',
      zh: ['你剛剛所經歷的選擇，並不只是遊戲，而是正在世界各地發生的現實。'],
      en: ['The choices you just experienced are not just a game, but a reality happening all over the world.']
    },
    {
      id: 'a1',
      frames: ['public/animation/a1-1.PNG','public/animation/a1-2.PNG','public/animation/a1-3.PNG','public/animation/a1-4.PNG','public/animation/a1-5.PNG','public/animation/a1-6.PNG','public/animation/a1-7.PNG','public/animation/a1-8.PNG','public/animation/a1-9.PNG'],
      interval: 250, next: 'a2',
      zh: ['你知道嗎？全球超過一半的人口，都以稻米作為主要糧食來源。','而亞洲，更是世界上最大的稻米消費與生產地區。','然而，在保護稻米產量的背後，卻隱藏著一個越來越嚴重的問題——'],
      en: ['Do you know that more than half of the global population relies on rice as a staple food source.','Asia, in particular, is the largest region for both rice consumption and production in the world.','However, behind the effort to protect rice yields, there lies a growing and increasingly serious problem—']
    },
    {
      id: 'a2',
      frames: ['public/animation/a2-1.PNG','public/animation/a2-2.PNG','public/animation/a2-3.PNG','public/animation/a2-4.PNG','public/animation/a2-5.PNG','public/animation/a2-6.PNG','public/animation/a2-7.PNG','public/animation/a2-8.PNG','public/animation/a2-9.PNG','public/animation/a2-10.PNG'],
      interval: 250, next: 'a3',
      zh: ['農藥。','研究指出，長期生活在農藥頻繁噴灑區域附近的人，或長時間接觸農藥的人，罹患癌症的風險會明顯提高。','不僅如此，農藥還會導致蜂后數量減少85%，殺死蜜蜂等重要的授粉昆蟲，危害樹蛙等瀕危物種，甚至破壞土壤肥力，使土地失去原本的生命力。','聯合國糧農組織警告說，如果這樣的情況持續下去，未來我們面對的，將不只是環境問題，更可能是糧食短缺與生態崩潰。'],
      en: ['Pesticides.','Studies have shown that people who live near areas with frequent pesticide spraying, or those who are regularly exposed to pesticides over long periods, face a significantly higher risk of developing cancer.','In addition, pesticides have been found to reduce queen bee populations by up to 85%, kill essential pollinators such as bees, threaten endangered species like tree frogs, and even degrade soil fertility, stripping the land of its natural vitality.','The Food and Agriculture Organization of the United Nations has warned that if this situation continues, what we may face in the future is not only an environmental crisis, but also potential food shortages and ecological collapse.']
    },
    {
      id: 'a3',
      frames: ['public/animation/a3-1.PNG','public/animation/a3-2.PNG','public/animation/a3-3.PNG','public/animation/a3-4.PNG','public/animation/a3-5.PNG','public/animation/a3-6.PNG','public/animation/a3-7.PNG','public/animation/a3-8.PNG'],
      interval: 250, next: 'a4',
      zh: ['透過對農民的採訪和實地調查，我們也了解到另一個殘酷的現實。','因為氣候變遷加劇，病蟲害問題越來越嚴重，許多農民為了保護收成，只能噴灑更多農藥。這形成了一個惡性循環：','農藥使用越多，環境破壞越嚴重。'],
      en: ['Through interviews with farmers and on-site field investigations, we also came to understand another harsh reality.','Due to the worsening impacts of climate change, pest and disease problems are becoming increasingly severe. Many farmers, in order to protect their harvests, are forced to use more pesticides. This creates a vicious cycle:','The more pesticides are used, the more severe the environmental damage becomes.']
    },
    {
      id: 'a4',
      frames: ['public/animation/a4-1.PNG','public/animation/a4-2.PNG','public/animation/a4-3.PNG','public/animation/a4-4.PNG','public/animation/a4-5.PNG'],
      interval: 250, next: 'a5',
      zh: ['因此，我們開始思考：','有沒有一種方式，能夠保護作物，同時也保護人體健康與環境？','在研究過程中，我們發現了大自然早已提供答案。','當水稻受到害蟲攻擊時，植物本身其實會自然釋放一種物質——檸檬烯。','檸檬烯就像植物發出的警訊，能夠幫助驅趕害蟲，其中包括水稻最具破壞性的害蟲之一——瘤野螟。','於是，我們希望透過合成生物學生產檸檬烯。','相比傳統農藥，檸檬烯是一種來自自然的生物型防治方式。','它不只能降低對人體健康的危害，也有機會減少對蜜蜂、土壤與生態系的傷害，讓農業朝向更永續的方向發展。'],
      en: ['Therefore, we began to ask ourselves:','Is there a way to protect crops while also safeguarding human health and the environment?','During our research, we discovered that nature had already provided the answer.','When rice plants are attacked by pests, they naturally release a substance called limonene.','Limonene acts like a warning signal from the plant, helping to repel insects—including one of the most destructive rice pests, the rice leafroller.','Based on this, we aim to produce limonene through synthetic biology.','Compared to traditional pesticides, limonene is a bio-based pest control method derived from nature.','It not only reduces risks to human health, but also has the potential to lessen harm to bees, soil, and ecosystems—helping agriculture move toward a more sustainable future.']
    },
    {
      id: 'a5',
      frames: ['public/animation/a5-1.PNG','public/animation/a5-2.PNG','public/animation/a5-3.PNG','public/animation/a5-4.PNG','public/animation/a5-5.PNG','public/animation/a5-6.PNG','public/animation/a5-7.PNG','public/animation/a5-8.PNG','public/animation/a5-9.PNG'],
      interval: 250, next: 'a6',
      zh: ['但真正的改變，需要農民、政府與你的共同合作。','農民需要更安全、永續的防治方式；政府需要推動友善農業與相關支持政策；','而你的每一次選擇，也正在決定未來農業的方向。'],
      en: ['But real change requires collaboration among farmers, the government, and you.','Farmers need safer and more sustainable methods of pest control. The government needs to promote eco-friendly agriculture and supportive policies.','And every choice you make is also shaping the future direction of agriculture.']
    },
    {
      id: 'a6',
      frames: ['public/animation/a5-1.PNG','public/animation/a5-2.PNG','public/animation/a5-3.PNG','public/animation/a5-4.PNG','public/animation/a5-5.PNG','public/animation/a5-6.PNG','public/animation/a5-7.PNG','public/animation/a5-8.PNG','public/animation/a5-9.PNG'],
      interval: 250, next: 'a7',
      zh: ['我們希望透過《NoFold》，讓你重新思考農藥、糧食、我們與環境之間的關係。','當更多人願意支持友善環境的農產品，改變才有可能真正發生。'],
      en: ['We hope that through NoFold, you can rethink the relationship between pesticides, food, and the environment we share.','Only when more people are willing to support environmentally friendly agricultural products can real change truly begin.']
    },
    {
      id: 'a7',
      frames: ['public/animation/a7-1.PNG','public/animation/a7-2.PNG','public/animation/a7-3.PNG'],
      interval: 200, next: null,
      zh: ['也許有一天，當風吹過稻田時，','人們聞到的，不再是刺鼻的農藥味，而是土地與稻田最自然的氣息。'],
      en: ['Perhaps one day, when the wind passes through the rice fields,','people will no longer smell the sharp scent of pesticides, but instead, the most natural fragrance of the land and the rice fields themselves.']
    }
  ];

  let endingAnimSceneId = '1-7';
  let endingAnimPart    = 0;
  let endingAnimTyping  = false;
  let endingAnimTypeTimer = null;
  let endingAnimTimer   = null;

  let endingAnimFromMenu = false;

  function initEndingAnim(fromMenu) {
    endingAnimFromMenu = !!fromMenu;
    endingAnimSceneId = '1-7';
    endingAnimPart = 0;
    endingAnimTyping = false;
    if (endingAnimTypeTimer) { clearTimeout(endingAnimTypeTimer); endingAnimTypeTimer = null; }
    if (endingAnimTimer)     { clearInterval(endingAnimTimer);   endingAnimTimer = null; }
    endingPlayer.stop();

    const textBox = document.getElementById('endingAnimTextBox');
    textBox.onclick = endingAnimHandleClick;
    const arrow = document.getElementById('endingAnimArrow');
    if (arrow) arrow.onclick = e => { e.stopPropagation(); endingAnimHandleClick(); };

    endingAnimGoToScene('1-7');
  }

  function endingAnimGoToScene(id) {
    const scene = ENDING_ANIM_SCENES.find(s => s.id === id);
    if (!scene) return;
    endingAnimSceneId = id;
    endingAnimPart = 0;
    if (endingAnimTimer) { clearInterval(endingAnimTimer); endingAnimTimer = null; }
    endingPlayer.switchScene(id);  // switch to the frame group for this scene
    endingPlayer.start(scene.interval || 250);
    endingAnimShowPart();
  }

  function endingAnimShowPart() {
    const scene = ENDING_ANIM_SCENES.find(s => s.id === endingAnimSceneId);
    if (!scene) return;
    const lines = scene[gameLang] || scene['zh'];
    const text  = lines[endingAnimPart];
    const textEl  = document.getElementById('endingAnimText');
    const arrowEl = document.getElementById('endingAnimArrow');
    if (!textEl) return;

    if (endingAnimTypeTimer) { clearTimeout(endingAnimTypeTimer); endingAnimTypeTimer = null; }
    textEl.textContent = '';
    if (arrowEl) arrowEl.classList.remove('show');
    endingAnimTyping = true;
    let i = 0;
    function tick() {
      if (i < text.length) {
        textEl.textContent += text[i++];
        endingAnimTypeTimer = setTimeout(tick, 40);
      } else {
        endingAnimTypeTimer = null;
        endingAnimTyping = false;
        if (arrowEl) arrowEl.classList.add('show');
      }
    }
    tick();
  }

  function endingAnimHandleClick() {
    const scene = ENDING_ANIM_SCENES.find(s => s.id === endingAnimSceneId);
    if (!scene) return;
    const lines = scene[gameLang] || scene['zh'];
    const textEl  = document.getElementById('endingAnimText');
    const arrowEl = document.getElementById('endingAnimArrow');

    // Still typing → finish immediately
    if (endingAnimTyping) {
      if (endingAnimTypeTimer) { clearTimeout(endingAnimTypeTimer); endingAnimTypeTimer = null; }
      if (textEl) textEl.textContent = lines[endingAnimPart];
      endingAnimTyping = false;
      if (arrowEl) arrowEl.classList.add('show');
      return;
    }

    // There's a next line
    if (endingAnimPart < lines.length - 1) {
      endingAnimPart++;
      endingAnimShowPart();
      return;
    }

    // Last line finished → show the tip either way
    if (scene.next) {
      endingAnimGoToScene(scene.next);
    } else {
      if (endingAnimTimer) { clearInterval(endingAnimTimer); endingAnimTimer = null; }
      endingPlayer.stop();
      showEndingAnimTip(endingAnimFromMenu);
    }
  }

  function showEndingAnimTip(fromMenu) {
    const tip = document.getElementById('endingAnimTip');
    const content = document.getElementById('endingAnimTipContent');
    content.innerHTML = gameLang === 'zh' ? content.getAttribute('data-zh') : content.getAttribute('data-en');
    const oldBtn = document.getElementById('endingAnimTipBtn');
    const newBtn = document.createElement('button');
    newBtn.id = 'endingAnimTipBtn';
    newBtn.setAttribute('data-zh', '我知道了');
    newBtn.setAttribute('data-en', 'Got it!');
    newBtn.textContent = gameLang === 'zh' ? '我知道了' : 'Got it!';
    newBtn.style.cssText = 'background:#E8C060;border:1px solid #B8860B;border-radius:12px;padding:10px 28px;font-size:1rem;font-weight:700;cursor:pointer;margin:0 auto;display:block;transition:background 0.2s;';
    newBtn.addEventListener('mouseenter', () => { newBtn.style.background = '#D4A843'; });
    newBtn.addEventListener('mouseleave', () => { newBtn.style.background = '#E8C060'; });
    newBtn.addEventListener('click', () => {
      tip.classList.remove('show');
      if (fromMenu) {
        endingAnimGoToScene('1-7'); // came from the menu → replay from the start
      } else {
        navTo('star'); // came from an ending → jump to the ending collection page
      }
    });
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);
    tip.classList.add('show');
  }

  // Replay the current line when the language changes
  window.addEventListener('languageChanged', e => {
    if (currentPage === 'ending-anim') {
      endingAnimPart = 0;
      endingAnimShowPart();
      // If the tip is currently shown, update its language too
      const tip = document.getElementById('endingAnimTip');
      if (tip && tip.classList.contains('show')) {
        const content = document.getElementById('endingAnimTipContent');
        const btn = document.getElementById('endingAnimTipBtn');
        if (content) content.innerHTML = e.detail.lang === 'zh' ? content.getAttribute('data-zh') : content.getAttribute('data-en');
        if (btn) btn.textContent = e.detail.lang === 'zh' ? btn.getAttribute('data-zh') : btn.getAttribute('data-en');
      }
    }
    const docVideoTitle = document.getElementById('docVideoTitle');
    if (docVideoTitle) {
      docVideoTitle.innerHTML = e.detail.lang === 'zh' ? 'CCU-Taiwan iGEM10<br>稻米研究紀錄' : 'CCU-Taiwan iGEM10<br>Rice Research Record';
    }
  });

  
  const ACHIEVEMENTS = [
    {key:'end_good1',cardId:'card_1_g1',textId:'name_1_g1',styles:{theme:'#7A8C3A',bg:'#F5F2E8',lightBg:'#E8DFA8',text:'#4A5520'},name:{zh:'吃稻飽',en:'All-You-Can-Eat Rice'},role:{zh:'瘤野螟',en:'Leaffolder'},tags:{zh:['#生存率100','#稻田裡的最後贏家','#精準鑽營的生還者'],en:['#100%SurvivalRate','#TheUltimateWinner','#MasterOfSurvival']},desc:{zh:'別人的吝嗇，就是你最大的底氣。\n在微弱的毒霧中優雅穿行，\n你的字典裡沒有「螟天再吃」的道理，\n只要沒死，整片稻田都是你的自助餐。',en:"Others' stinginess is your greatest strength.\nElegantly gliding through the faint toxic mist,\nThe concept of \"leaving it for tomorrow\" simply doesn't exist in your vocabulary.\nAs long as you are alive, the entire rice field is your buffet."},correspondingIds:['rice_bad1','farmer_bad1'],hint:{zh:'螟天再吃？不存在的！',en:'No tomorrow, eat it now!'}},
    {key:'end_good2',cardId:'card_1_g2',textId:'name_1_g2',styles:{theme:'#7A8C3A',bg:'#F5F2E8',lightBg:'#E8DFA8',text:'#4A5520'},name:{zh:'螟王適應體α',en:'The Stem Borer King Alpha'},role:{zh:'瘤野螟',en:'Leaffolder'},tags:{zh:['#生化防禦戰神','#農藥是我的調味料','#地表最強螟二代'],en:['#BiochemicalGod','#PesticideIsSeasoning','#StrongestGen2']},desc:{zh:'你經歷過農民的多次斬殺。\n每一次被農藥噴灑，都沒有讓你消失，\n那些殺不死你的，終將讓你成為農田的主人。你就是地表最強螟二代！',en:"Every time you were sprayed with pesticides, it failed to wipe you out.\nWhat didn't kill you has ultimately made you the master of the rice fields.\nYou are the strongest second-generation Stem Borer on Earth!"},correspondingIds:['rice_bad3','farmer_bad4'],hint:{zh:'那些殺不死我的，使我更強！',en:"What doesn't kill me makes me stronger."}},
    {key:'end_bad1',cardId:'card_1_b1',textId:'name_1_b1',styles:{theme:'#B8860B',bg:'#FDF5DC',lightBg:'#F0DC8C',text:'#7A5800'},name:{zh:'螟中註定白費功夫',en:'Fated to Be in Vain'},role:{zh:'瘤野螟',en:'Leaffolder'},tags:{zh:['#產卵即終點','#被終結的傳承','#農田裡的沈默輓歌'],en:['#EggLayingIsEnd','#TerminatedLegacy','#SilentElegy']},desc:{zh:'你以為找到了溫柔的家鄉，其實是踏進了毒氣室。\n你產下的卵，成了這片土地最後的祭品。\n而你成為了農藥洗禮下的遺珠。',en:"You thought you had found a gentle homeland, but you actually stepped right into a gas chamber. The eggs you laid became the final sacrifice for this land, and you became the tragic remnant left behind after the baptism of pesticides."},correspondingIds:['rice_bad2','rice_good1','farmer_bad2','farmer_bad3'],hint:{zh:'提示：別一直跑去充滿刺鼻味道的地方啦！下輩子過好一點！',en:'Hint: Stop running off to places filled with pungent smells! Have a better life!'}},
    {key:'end_bad2',cardId:'card_1_b2',textId:'name_1_b2',styles:{theme:'#B8860B',bg:'#FDF5DC',lightBg:'#F0DC8C',text:'#7A5800'},name:{zh:'鞭數十驅之別院',en:'Driven to Another Place'},role:{zh:'瘤野螟',en:'Leaffolder'},tags:{zh:['#檸檬氣氣PTSD','#被迫搬家的流浪螟','#友善耕作的受害者'],en:['#LimonenePTSD','#HomelessMoth','#EcoFarmingVictim']},desc:{zh:"這不是致死的毒藥，卻是讓你靈魂顫抖的『逐客令』。\n你看著遠方的柔嫩的葉片，好想過去產卵，可是被一股薄荷味的檸檬烯阻擋著......\n「檸檬烯，我恨你！」",en:"This isn't a lethal poison, but it is an \"eviction notice\" that makes your very soul tremble.\nYou gaze at the tender leaves in the distance, longing to go over and lay your eggs, but you are blocked by a minty-scented wall of limonene... \"Limonene, I hate you!\""},correspondingIds:['rice_good2','rice_good3','farmer_good1','farmer_good2'],hint:{zh:'提示：農民時常會在高氮稻作噴更多農藥或使用檸檬烯！',en:'Hint: Farmers often use limonene on high-nitrogen crops!'}},
    {key:'end_special1',cardId:'card_1_b3',textId:'name_1_b3',styles:{theme:'#D4A843',bg:'#FEF9EC',lightBg:'#F5E4A0',text:'#8A6000'},name:{zh:'絕地求生',en:'PUBG Survival'},role:{zh:'瘤野螟',en:'Leaffolder'},tags:{zh:['#被記錄的一生','#無法逃離','#失去自由'],en:['#ALifeRecorded','#NoEscape','#LossOfFreedom']},desc:{zh:'你活了下來，但代價是失去了自由。\n你很不幸地被一群學生抓去研究，\n你成了螢光燈下的數據，被人類冷靜地觀測。\n你思考過人生，卻沒思考過螟生，下輩子別當瘤野螟了，當個人類吧！',en:"You survived, but the price was your freedom.\nUnfortunately, you were captured by a group of students for research.\nYou have become data under the fluorescent lights, calmly observed by humans."},correspondingIds:['rice_good4','farmer_good3'],hint:{zh:'下輩子，當個人類做研究吧！',en:'Be a human student in the next life!'}},
    {key:'end_bad4',cardId:'card_1_b4',textId:'name_1_b4',styles:{theme:'#B8860B',bg:'#FDF5DC',lightBg:'#F0DC8C',text:'#7A5800'},name:{zh:'瘤在世上',en:'Left Behind in the World'},role:{zh:'瘤野螟',en:'Leaffolder'},tags:{zh:['#無聲告別','#落幕的生命之舞','#孤獨的軀殼'],en:['#ASilentFarewell','#CurtainFalls','#TheLonelyShell']},desc:{zh:'你在僅有的生命期中，只留下了自己的軀殼在這個世界上。\n風吹過來，農民仍在辛勤工作，稻田還是那片田。\n但你，已經不在了。\n一隻瘤野螟的一生，就這樣結束了。短暫，平靜，悄無聲息。',en:"Within your brief lifespan, you left nothing but your empty shell behind in this world.\nThe wind blows, the farmers continue their hard work, and the rice fields remain just as they were."},correspondingIds:[],hint:{zh:'提示：可以多選擇有風險的選項，為你的孩子們冒一次險吧！',en:'Hint: Try choosing options with more risk!'}},
    {key:'rice_bad1',cardId:'card_2_b1',textId:'name_2_b1',styles:{theme:'#7EC8D8',bg:'#EDF8FA',lightBg:'#C4EBF2',text:'#2A6A78'},name:{zh:'坑坑洞洞',en:'Potholes and Hollows'},role:{zh:'水稻',en:'Rice'},tags:{zh:['#枯心苗的憂鬱','#被掏空的身軀','#全場唯一的受害者'],en:['#SadnessOfSeedling','#TheEmptyBody','#TheOnlyVictim']},desc:{zh:'你是這場博弈中唯一沈默的籌碼：\n被吝嗇的農民拋棄，成為瘤野螟口中的盛宴。\n雖然外表完整，但你的內部早已被掏空，\n你沒有被收割，也沒有被記住，\n就跟路邊的石頭一樣。',en:"You are the only silent pawn in this game: Thrown away by a cheap farmer, becoming a grand feast in the mouths of the rice leaf folders. Though you look whole on the outside, your inside is already completely empty. You are not harvested, and you are not remembered."},correspondingIds:['end_good1','farmer_bad1'],hint:{zh:'提示：你需要多選一些抗蟲率增加的選項！',en:"Hint: You need to pick more choices that increase your bug resistance!"}},
    {key:'rice_bad2',cardId:'card_2_b2',textId:'name_2_b2',styles:{theme:'#7EC8D8',bg:'#EDF8FA',lightBg:'#C4EBF2',text:'#2A6A78'},name:{zh:'收稻的代價',en:'The Price Received'},role:{zh:'水稻',en:'Rice'},tags:{zh:['#不被允許的存在','#被留下的不是幸運','#沉默的退場'],en:['#AnExistenceNotAllowed','#BeingLeftBehindIsNotLuck','#AQuietExit']},desc:{zh:'你被順利收割，卻在最後一刻被判定不合格。\n農藥殘留成為無法忽視的標記。\n你被分離、被封存，停留在倉庫深處。\n你沒有壞掉，只是失去了被選擇的資格。',en:"You are harvested safely, but you fail the test at the very last moment.\nThe leftover pesticide becomes a mark that no one can ignore.\nYou are separated, sealed away, and left deep inside a dark warehouse."},correspondingIds:['end_bad1','farmer_bad2'],hint:{zh:'提示：你攝入的農藥量太多了，請吃健康一點。',en:'Hint: You took in too much pesticide!'}},
    {key:'rice_bad3',cardId:'card_2_b3',textId:'name_2_b3',styles:{theme:'#7EC8D8',bg:'#EDF8FA',lightBg:'#C4EBF2',text:'#2A6A78'},name:{zh:'農藥無效的夏天',en:'The Summer the Pesticides Failed'},role:{zh:'水稻',en:'Rice'},tags:{zh:['#抗藥性失控','#無聲消失','#來不及成熟'],en:['#OutofControl','#FadingAwaySilently','#NoTimeToRipen']},desc:{zh:'防治失效的那一年，你沒有撐過去。\n瘤野螟在田間擴散，你的結構被一點一點破壞。\n沒有收成，也沒有後續。\n你消失在了那個沒有結果的夏天。',en:"In the year the protection failed, you did not make it through.\nThe rice leaf folders spread across the field, Breaking your body down bit by bit.\nNo harvest, and no follow-up.\nYou disappeared into that fruitless summer."},correspondingIds:['end_good2','farmer_bad4'],hint:{zh:'提示：害蟲的抗藥性太高了，單靠傳統農藥不夠力。',en:'Hint: The pests developed too much resistance!'}},
    {key:'rice_good1',cardId:'card_2_g1',textId:'name_2_g1',styles:{theme:'#7A8C3A',bg:'#F0F5E4',lightBg:'#D8E8A8',text:'#3A4E18'},name:{zh:'逃過一劫',en:'Escaping by a Hair'},role:{zh:'水稻',en:'Rice'},tags:{zh:['#擦邊通過','#風險未解','#暫時安全'],en:['#BarelyPassing','#DangersNotSolved','#SafeForNow']},desc:{zh:'你順利通過檢驗，被帶入市場。\n過程中存在風險，但未被發現。\n你被包裝、被運送、被販售。表面一切正常。\n這是一場沒有被揭露的倖存。',en:"You pass the test safely and are taken to the market.\nThere were dangers along the way, but no one found them.\nEverything looks completely normal on the outside."},correspondingIds:['end_bad1','farmer_bad3'],hint:{zh:'幸運也是實力的一種！',en:'Luck is also a form of strength!'}},
    {key:'rice_good2',cardId:'card_2_g2',textId:'name_2_g2',styles:{theme:'#7A8C3A',bg:'#F0F5E4',lightBg:'#D8E8A8',text:'#3A4E18'},name:{zh:'稻米界模範生',en:'The Model Student of the Rice World'},role:{zh:'水稻',en:'Rice'},tags:{zh:['#品質頂標','#被認可的存在','#穩定與控制'],en:['#TopQuality','#ALifeApproved','#SteadyAndInControl']},desc:{zh:'從生長到收成，你維持最佳狀態。\n結構完整，品質穩定。\n你被選為標準，被作為參考。\n你的存在，成為「理想狀態」的代表。',en:"From growing to harvest, you stay in your very best shape.\nYour body is whole, and your quality is steady.\nYour life becomes the face of the \"perfect state\"."},correspondingIds:['end_bad2','farmer_good1'],hint:{zh:'實至名歸的最高榮譽！',en:'Well-deserved top honors!'}},
    {key:'rice_good3',cardId:'card_2_g3',textId:'name_2_g3',styles:{theme:'#7A8C3A',bg:'#F0F5E4',lightBg:'#D8E8A8',text:'#3A4E18'},name:{zh:'終於等稻你',en:'Finally Met You'},role:{zh:'水稻',en:'Rice'},tags:{zh:['#剛剛好','#被選中的普通','#平穩結束'],en:['#JustRight','#TheChosenOrdinary','#AQuietEnding']},desc:{zh:'你沒有特別突出，卻完整走過整個過程。\n在眾多稻米之中，你被選中。\n不是最耀眼，但剛好被需要。\n你被帶走，完成你的角色。',en:"You are not super special, But you made it all the way through.\nNot the brightest star, but just what someone needs right now."},correspondingIds:['end_bad2','farmer_good2'],hint:{zh:'平凡之中最見真章。',en:'True beauty lies in simplicity.'}},
    {key:'rice_good4',cardId:'card_2_g4',textId:'name_2_g4',styles:{theme:'#7A8C3A',bg:'#F0F5E4',lightBg:'#D8E8A8',text:'#3A4E18'},name:{zh:'搬家之旅',en:'The Moving Journey'},role:{zh:'水稻',en:'Rice'},tags:{zh:['#流動的命運','#離開原點','#好好吃的你'],en:['#MovingDestiny','#LeavingTheStart','#YouTasteSoGood']},desc:{zh:'你離開原本的田地，被運送到不同的地方。\n你的旅程沒有在田間結束，你將作為研究目標，\n為人類與大自然帶來更多的希望！',en:"You leave your old rice field, And you are moved to a different place.\nYou will be studied as a target, Bringing more hope to humans!"},correspondingIds:['end_special1','farmer_good3'],hint:{zh:'科研前線，也有你的貢獻。',en:'Contributing to the frontlines of science!'}},
    {key:'farmer_bad1',cardId:'card_3_b1',textId:'name_3_b1',styles:{theme:'#C4732A',bg:'#FDF0E4',lightBg:'#F0D0A8',text:'#7A3A10'},name:{zh:'躺平的一生',en:'A Life of Lying Flat'},role:{zh:'農民',en:'Farmer'},tags:{zh:['#懶惰的代價','#破產倒數','#被遺忘的田壟'],en:['#ThePriceOfLazy','#CountDownToBroke','#TheForgottenFields']},desc:{zh:'你以為休息是為了走更長的路，沒想到休息太久，連路都找不到了。\n資金逐漸耗盡，田地荒廢。\n外界不再關注，你也失去重新開始的機會。',en:"You think resting is for walking a longer road later, But you do not know that resting for too long makes you lose the road completely."},correspondingIds:['end_good1','rice_bad1'],hint:{zh:'提示：別再懶了，請動起來。',en:'Hint: Do not be lazy anymore! Please get moving.'}},
    {key:'farmer_bad2',cardId:'card_3_b2',textId:'name_3_b2',styles:{theme:'#C4732A',bg:'#FDF0E4',lightBg:'#F0D0A8',text:'#7A3A10'},name:{zh:'被檢舉達人盯上',en:'Targeted by a Serial Reporter'},role:{zh:'農民',en:'Farmer'},tags:{zh:['#高風險操作','#市場淘汰','#聲譽崩壞'],en:['#HighRiskMove','#ThrownOutByMarket','#BrokenGoodName']},desc:{zh:'你因為一直借錢或噴農藥，防治逐漸失效。\n農藥使用痕跡被放大檢視。市場檢測介入，流程被迫中止。\n產品遭到封存，無法流通。信任一旦破裂，難以回復。',en:"Because you keep borrowing money or spraying pesticides, your protection slowly fails.\nThe marks left by the pesticides are put under a big magnifying glass."},correspondingIds:['end_bad1','rice_bad2'],hint:{zh:'提示：你噴的農藥或借的錢太多了，請低調一點，別再噴那麼多農藥！',en:"Hint: You've sprayed too much pesticide or borrowed too much money.Stop spraying so many chemicals!"}},
    {key:'farmer_bad3',cardId:'card_3_b3',textId:'name_3_b3',styles:{theme:'#C4732A',bg:'#FDF0E4',lightBg:'#F0D0A8',text:'#7A3A10'},name:{zh:'醫院是你第二個家',en:'The Hospital is Your Second Home'},role:{zh:'農民',en:'Farmer'},tags:{zh:['#健康透支','#高壓反噬','#失去控制'],en:['#OverusedHealth','#HitBackByHighStress','#LosingControl']},desc:{zh:'你因為一直借錢或噴農藥，防治逐漸失效。\n長期暴露在農藥與壓力之下，身體開始出現明顯負擔。\n即使田地仍在運作，人已無法承受。生產與生活同時失衡。',en:"Prolonged exposure to pesticides and stress began to place a noticeable strain on the body.\nEven though the field is still working, you can no longer take it.\nYour work and your life both lose their balance at the same time."},correspondingIds:['end_bad1','rice_good1'],hint:{zh:'提示：你噴的農藥或借的錢太多了，請考慮一下自己的身心靈健康。',en:"Hint: You've sprayed too much pesticide or borrowed too much money. Please think about your own health."}},
    {key:'farmer_bad4',cardId:'card_3_b4',textId:'name_3_b4',styles:{theme:'#C4732A',bg:'#FDF0E4',lightBg:'#F0D0A8',text:'#7A3A10'},name:{zh:'螟螟很努力',en:'You Work Very Hard'},role:{zh:'農民',en:'Farmer'},tags:{zh:['#抗藥性爆發','#全面失守','#連鎖崩壞'],en:['#DrugResistanceExplosion','#CompletelyLost','#ChainReactionBreakdown']},desc:{zh:'你因為一直借錢或噴農藥，防治逐漸失效。\n瘤野螟族群擴散，田間生態失去平衡。\n產量下降，品質不穩，整體系統進入不可逆的惡化狀態。',en:"The rice leafroller family spreads, and the nature in the field loses its balance.\nThe harvest drops, the quality becomes unsteady, and the whole system enters a bad state that cannot be fixed."},correspondingIds:['end_good2','rice_bad3'],hint:{zh:'提示：你噴的農藥或借的錢太多了，請考慮一下自己的身心靈健康。',en:"Hint: You are spraying too many pesticides or borrowing too much money; please consider your physical, mental, and spiritual well-being."}},
    {key:'farmer_good1',cardId:'card_3_g1',textId:'name_3_g1',styles:{theme:'#B8860B',bg:'#FDF5DC',lightBg:'#F0DC8C',text:'#5A4000'},name:{zh:'一夜暴富',en:'Becoming Rich Overnight'},role:{zh:'農民',en:'Farmer'},tags:{zh:['#名利雙收','#綠色奇蹟','#稻浪淘金'],en:['#FameAndFortune','#GreenMiracle','#HarvestingGold']},desc:{zh:'你堅持友善農法建立的頂級聲譽，使各大契作商紛紛捧著現金爭相包田。\n鋪天蓋地的訂單與超高溢價，讓你在收成期實現了真正的一夜暴富。\n這是你守護土地、兼顧生態與品質換來的最高財富回報！',en:"Your eco-friendly farming reputation pays off big this season! Top buyers are lining up with cash to secure your entire harvest.\nFlooded with premium orders, you've struck it rich overnight. This is the ultimate reward for guarding the land and mastering sustainable quality!"},correspondingIds:['end_bad2','rice_good2'],hint:{zh:'溫柔對待土地，土地用一夜暴富回應你。',en:'Treat the land with kindness, and it will answer with a fortune.'}},
    {key:'farmer_good2',cardId:'card_3_g2',textId:'name_3_g2',styles:{theme:'#B8860B',bg:'#FDF5DC',lightBg:'#F0DC8C',text:'#5A4000'},name:{zh:'不為五斗米折腰',en:'Not Bowing for Five Pecks of Rice'},role:{zh:'農民',en:'Farmer'},tags:{zh:['#穩定成長','#品質優先','#長期價值'],en:['#SteadyGrowth','#QualityFirst','#LongTermValue']},desc:{zh:'選擇較穩定且可持續的方式經營。\n產量或許不高，但品質穩定。\n市場信任逐步建立。\n整體發展趨於長期平衡。',en:"You choose a more steady and lasting way to run your farm.\nThe harvest amount might not be very high, but the quality is steady.\nMarket trust is built up step by step.\nThe overall growth moves toward a long-term balance."},correspondingIds:['end_bad2','rice_good3'],hint:{zh:'永續經營才是真王道！',en:'Sustainability is the true way to go!'}},
    {key:'farmer_good3',cardId:'card_3_g3',textId:'name_3_g3',styles:{theme:'#B8860B',bg:'#FDF5DC',lightBg:'#F0DC8C',text:'#5A4000'},name:{zh:'學術交流',en:'Academic Exchange'},role:{zh:'農民',en:'Farmer'},tags:{zh:['#知識轉化','#經驗累積','#影響擴散'],en:['#KnowledgeSharing','#GatheredExperience','#SpreadingInfluence']},desc:{zh:'種植經驗被記錄與分析。\n你的方法成為案例，被帶入更大範圍的討論與改良。\n田地不只是生產單位，也成為知識的一部分。',en:"Your farming experience is recorded and analyzed.\nYour methods become a case study for improvement.\nThe field is no longer just a place for growing food, but also becomes a piece of knowledge."},correspondingIds:['end_special1','rice_good4'],hint:{zh:'恭喜成為永續農業模範推手！',en:'Congrats on becoming a model for farming!'}}
  ];

  let starLang = 'en';
  let starActiveAch = null;