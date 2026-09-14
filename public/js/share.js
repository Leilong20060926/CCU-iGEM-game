/* ══════════════════════════════════════════
     GOOGLE LOGIN OVERLAY (real GIS OAuth)
  ══════════════════════════════════════════ */
  /* ══════════════════════════════════════════
     SHARE SHEET LOGIC
  ══════════════════════════════════════════ */

  // Generate the card image blob
  async function generateCardBlob() {
    const card = document.querySelector('.result-card');
    const scale = 3, w = card.offsetWidth, h = card.offsetHeight;
    const dataUrl = await domtoimage.toPng(card, {
      width: w * scale, height: h * scale,
      style: { transform: `scale(${scale})`, transformOrigin: 'top left', width: w + 'px', height: h + 'px' }
    });
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const roleName   = starActiveAch.role[starLang].replace(/\s+/g, '_');
    const endingName = starActiveAch.name[starLang].replace(/\s+/g, '_');
    return { blob, fileName: `NoFold_${roleName}_${endingName}.PNG` };
  }


  function setBtnLoading(id) {
    const b = document.getElementById(id);
    if(b){ b.disabled=true; b.textContent=starLang==='zh'?'產生中…':'Generating…'; }
    const row = document.querySelector('.buttons-row-only');
    if(row) row.style.visibility='hidden';
  }
  function resetBtns() {
    ['modalShareBtn'].forEach(id => {
      const b = document.getElementById(id);
      if(b){ b.disabled=false; b.textContent=starLang==='zh'?b.getAttribute('data-zh'):b.getAttribute('data-en'); }
    });
    const row = document.querySelector('.buttons-row-only');
    if(row) row.style.visibility='visible';
  }

  async function generateCardBlob() {
    const card = document.querySelector('.result-card');
    const scale=3, w=card.offsetWidth, h=card.offsetHeight;
    const dataUrl = await domtoimage.toPng(card,{width:w*scale,height:h*scale,style:{transform:`scale(${scale})`,transformOrigin:'top left',width:w+'px',height:h+'px'}});
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const roleName  = starActiveAch.role[starLang].replace(/\s+/g,'_');
    const endingName = starActiveAch.name[starLang].replace(/\s+/g,'_');
    return { blob, fileName: `NoFold_${roleName}_${endingName}.PNG` };
  }

  async function handleShare(){
    if(!starActiveAch) return;
    setBtnLoading('modalShareBtn');
    try {
      const {blob, fileName} = await generateCardBlob();
      const file = new File([blob], fileName, {type:'image/png'});
      const shareText = starLang==='zh'
        ? `我在《NoFold》解鎖了結局【${starActiveAch.role.zh} - ${starActiveAch.name.zh}】！`
        : `I unlocked the ending [${starActiveAch.role.en} - ${starActiveAch.name.en}] in NoFold!`;
      if(navigator.share && navigator.canShare && navigator.canShare({files:[file]})){
        await navigator.share({files:[file], title:'NoFold', text: shareText});
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href=url; a.download=fileName; a.click();
        URL.revokeObjectURL(url);
      }
    } catch(e){ if(e.name!=='AbortError'){ console.error(e); } }
    finally { resetBtns(); }
  }