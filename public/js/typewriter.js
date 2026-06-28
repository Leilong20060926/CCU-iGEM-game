/**
 * 打字機效果模組
 */
class TypewriterEffect {
  constructor(options = {}) {
    this.storyText = options.storyText || document.getElementById('storyText');
    this.arrow = options.arrow || document.querySelector('.story-text-arrow');
    this.typingSpeed = options.typingSpeed || 40;
    this.charIndex = 0;
    this.timer = null; // 👈 新增：用來存放 setTimeout 的 ID
  }

  // 👈 新增：強制停止目前的打字效果
  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * 開始打字機效果
   */
  start(text, onComplete = null) {
    this.stop(); // 👈 關鍵：在開始新打字前，先停止上一次的動作
    
    this.storyText.textContent = '';
    this.charIndex = 0;

    const typeCharacter = () => {
      if (this.charIndex < text.length) {
        const char = text[this.charIndex];
        this.storyText.textContent += char === '\n' ? '\n' : char;
        this.charIndex++;
        this.timer = setTimeout(typeCharacter, this.typingSpeed); // 👈 儲存 Timer ID
      } else {
        if (this.arrow) this.arrow.classList.add('show');
        if (onComplete) onComplete();
      }
    };

    typeCharacter();
  }

  // ... bindMultiPart 方法保持原樣即可 (它內部呼叫的是 start)
}

/**
 * 簡化版本 - 同樣需要加上停止邏輯
 */
let globalTypewriterTimer = null; // 全域變數供函數版使用

function startTypewriter(text, options = {}) {
  const storyText = options.storyText || document.getElementById('storyText');
  const arrow = options.arrow || document.querySelector('.story-text-arrow');
  const typingSpeed = options.typingSpeed || 40;

  // 👈 停止舊的執行
  if (globalTypewriterTimer) clearTimeout(globalTypewriterTimer);

  storyText.textContent = '';
  let charIndex = 0;

  function typeCharacter() {
    if (charIndex < text.length) {
      storyText.textContent += text[charIndex];
      charIndex++;
      globalTypewriterTimer = setTimeout(typeCharacter, typingSpeed);
    } else {
      if (arrow) arrow.classList.add('show');
      if (options.onComplete) options.onComplete();
    }
  }

  typeCharacter();
}
