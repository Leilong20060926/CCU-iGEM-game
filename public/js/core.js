/* ══ Animation frame switching (via display, not src — all frames are already preloaded in the DOM) ══ */
  function makeFramePlayer(containerId) {
    let timer = null, idx = 0, dir = 1;
    const frames = () => document.querySelectorAll('#' + containerId + ' > .anim-frame');
    function show(i) {
      frames().forEach((el, j) => { el.style.display = j === i ? 'block' : 'none'; });
    }
    return {
      start(interval) {
        this.stop(); idx = 0; dir = 1; show(0);
        timer = setInterval(() => {
          const fs = frames(); if (!fs.length || fs.length === 1) return;
          idx += dir;
          if (idx >= fs.length - 1) { idx = fs.length - 1; dir = -1; }
          else if (idx <= 0) { idx = 0; dir = 1; }
          show(idx);
        }, interval || 250);
      },
      stop() { if (timer) { clearInterval(timer); timer = null; } idx = 0; dir = 1; },
      reset() { this.stop(); show(0); }
    };
  }

  // endingPlayer: has the concept of scene groups — switching scenes just toggles which group is shown
  const endingPlayer = (() => {
    let timer = null, idx = 0, dir = 1;
    let currentGroup = null;
    function frames() { return currentGroup ? currentGroup.querySelectorAll('.anim-frame') : []; }
    function show(i) { Array.from(frames()).forEach((el,j) => { el.style.display = j===i?'block':'none'; }); }
    return {
      switchScene(sceneId) {
        this.stop();
        const container = document.getElementById('animFrameContainerEnding');
        if (!container) return;
        // Hide all groups, reset all frames
        container.querySelectorAll('.anim-scene-group').forEach(g => {
          g.style.display = 'none';
          g.querySelectorAll('.anim-frame').forEach(f => { f.style.display = 'none'; });
        });
        currentGroup = container.querySelector(`.anim-scene-group[data-scene-id="${sceneId}"]`);
        if (!currentGroup) return;
        currentGroup.style.display = 'block';
        // Show the first frame
        const firstFrame = currentGroup.querySelector('.anim-frame');
        if (firstFrame) firstFrame.style.display = 'block';
      },
      start(interval) {
        this.stop(); idx = 0; dir = 1; show(0);
        timer = setInterval(() => {
          const fs = frames(); if (!fs.length || fs.length === 1) return;
          idx += dir;
          if (idx >= fs.length - 1) { idx = fs.length - 1; dir = -1; }
          else if (idx <= 0) { idx = 0; dir = 1; }
          show(idx);
        }, interval || 250);
      },
      stop() { if (timer) { clearInterval(timer); timer = null; } idx = 0; dir = 1; }
    };
  })();

  const animPlayer1  = makeFramePlayer('animFrameContainer1');
  const animPlayer2  = makeFramePlayer('animFrameContainer2');

  /* ══ PRELOADER ══ */
  const PRELOAD_IMAGES = [
    // pictures
    'public/pictures/homepage.PNG','public/pictures/characters.PNG',
    'public/pictures/1-1.PNG','public/pictures/1-2.PNG','public/pictures/1-2-c.png',
    'public/pictures/1-3.PNG','public/pictures/1-3-c.png','public/pictures/1-4.PNG',
    'public/pictures/1-5.PNG','public/pictures/1-6.PNG','public/pictures/1-6-c.png',
    'public/pictures/1-7-1.PNG','public/pictures/1-7-2.PNG','public/pictures/1-7-3.PNG',
    'public/pictures/1-7-4.PNG','public/pictures/1-7-5.PNG',
    'public/pictures/1-8.PNG','public/pictures/1-8-c.png',
    'public/pictures/1-9.PNG','public/pictures/1-10.PNG','public/pictures/1-11.PNG',
    'public/pictures/1-12.PNG','public/pictures/1-12-c.png','public/pictures/1-12-c2.png',
    'public/pictures/1-13.PNG','public/pictures/1-13-c.png',
    'public/pictures/2-1.PNG','public/pictures/2-2.PNG','public/pictures/2-3.PNG',
    'public/pictures/2-4.PNG','public/pictures/2-4-c.png','public/pictures/2-5.PNG',
    'public/pictures/2-5-c.png','public/pictures/2-5-cf.png',
    'public/pictures/2-6.PNG','public/pictures/2-6-c.png',
    'public/pictures/2-7.PNG','public/pictures/2-8.PNG','public/pictures/2-8-c.png',
    'public/pictures/2-9.PNG','public/pictures/2-9-c.png',
    'public/pictures/2-9-cf.png','public/pictures/2-10.PNG',
    'public/pictures/3-1.PNG','public/pictures/3-2.PNG','public/pictures/3-3.PNG',
    'public/pictures/3-4.PNG','public/pictures/3-5.PNG','public/pictures/3-6.PNG',
    'public/pictures/3-5-2.PNG','public/pictures/3-6-2.PNG',
    'public/pictures/3-7.png','public/pictures/3-7-c.png',
    // buttoms
    'public/buttoms/Homepage_buttom.PNG','public/buttoms/Character1.PNG',
    'public/buttoms/Character2.PNG','public/buttoms/Character3.PNG',
    'public/buttoms/Charater1-2.PNG','public/buttoms/Charater2-2.PNG','public/buttoms/Charater3-2.PNG',
    'public/buttoms/3-6_buttom.PNG','public/buttoms/3-6-2_buttom.png',
    // animation
    'public/animation/a1-1.PNG','public/animation/a1-2.PNG','public/animation/a1-3.PNG',
    'public/animation/a1-4.PNG','public/animation/a1-5.PNG','public/animation/a1-6.PNG',
    'public/animation/a1-7.PNG','public/animation/a1-8.PNG','public/animation/a1-9.PNG',
    'public/animation/a2-1.PNG','public/animation/a2-2.PNG','public/animation/a2-3.PNG',
    'public/animation/a2-4.PNG','public/animation/a2-5.PNG','public/animation/a2-6.PNG',
    'public/animation/a2-7.PNG','public/animation/a2-8.PNG','public/animation/a2-9.PNG',
    'public/animation/a2-10.PNG',
    'public/animation/a3-1.PNG','public/animation/a3-2.PNG','public/animation/a3-3.PNG',
    'public/animation/a3-4.PNG','public/animation/a3-5.PNG','public/animation/a3-6.PNG',
    'public/animation/a3-7.PNG','public/animation/a3-8.PNG',
    'public/animation/a4-1.PNG','public/animation/a4-2.PNG','public/animation/a4-3.PNG',
    'public/animation/a4-4.PNG','public/animation/a4-5.PNG',
    'public/animation/a5-1.PNG','public/animation/a5-2.PNG','public/animation/a5-3.PNG',
    'public/animation/a5-4.PNG','public/animation/a5-5.PNG','public/animation/a5-6.PNG',
    'public/animation/a5-7.PNG','public/animation/a5-8.PNG','public/animation/a5-9.PNG',
    'public/animation/a7-1.PNG','public/animation/a7-2.PNG','public/animation/a7-3.PNG',
    // results
    'public/results/1-g1.PNG','public/results/1-g2.PNG',
    'public/results/1-b1.PNG','public/results/1-b2.PNG','public/results/1-b3.PNG','public/results/1-b4.PNG',
    'public/results/2-b1.PNG','public/results/2-b2.PNG','public/results/2-b3.PNG',
    'public/results/2-g1.PNG','public/results/2-g2.PNG','public/results/2-g3.PNG','public/results/2-g4.PNG',
    'public/results/3-b1.PNG','public/results/3-b2.PNG','public/results/3-b3.PNG','public/results/3-b4.PNG',
    'public/results/3-g1.PNG','public/results/3-g2.PNG','public/results/3-g3.PNG',
    // egg
    'public/wallpapers/phone.png','public/wallpapers/phone2.png','public/wallpapers/computer.png',
  ];

  (function preload() {
    const bar    = document.getElementById('loadingBarFill');
    const text   = document.getElementById('loadingText');
    const screen = document.getElementById('loadingScreen');

    function finish() {
      screen.classList.add('fade-out');
      setTimeout(() => { screen.style.display = 'none'; }, 800);
    }

    // Collect all images that need preloading: PRELOAD_IMAGES + every .anim-frame already in the DOM
    const domFrameSrcs = Array.from(document.querySelectorAll('.anim-frame[src]')).map(el => el.src);
    const allSrcs = [...new Set([...PRELOAD_IMAGES.map(s => new URL(s, location.href).href), ...domFrameSrcs])];
    const total = allSrcs.length;
    let loaded = 0;

    function tick() {
      loaded++;
      const pct = Math.round((loaded / total) * 100);
      if (bar) bar.style.width = pct + '%';
      if (text) text.textContent = `Loading... ${pct}%`;
      if (loaded >= total) {
        setTimeout(finish, 300);
      }
    }

    if (total === 0) { finish(); return; }

    allSrcs.forEach(src => {
      const img = new Image();
      img.onload  = tick;
      img.onerror = tick; // keep going even on a 404, don't get stuck
      img.src = src;
    });
  })();