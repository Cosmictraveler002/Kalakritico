/**
 * Kalaकृति - Interactive Architecture & Title Card Character Animation Controller
 * Provides full programmatic and interactive control over individual title card letter boxes.
 */

class TitleCardController {
  constructor() {
    this.track = document.getElementById('titleLettersTrack');
    this.letters = Array.from(document.querySelectorAll('.title-letter-box'));
    this.inners = Array.from(document.querySelectorAll('.title-letter-box .letter-inner'));
    this.paths = Array.from(document.querySelectorAll('.title-letter-box .svg-anim-path'));
    this.toolbar = document.getElementById('titleAnimToolbar');
    this.buttons = Array.from(document.querySelectorAll('.anim-pill-btn'));
    this.activePreset = null;

    if (!this.track || this.letters.length === 0) return;

    this.initLetterInteractions();
    this.initToolbar();
    this.initKeyboardShortcuts();
    this.exposeGlobalAPI();
  }

  /**
   * Click on any individual letter box to trigger its own unique animation
   */
  initLetterInteractions() {
    this.letters.forEach((box, idx) => {
      box.addEventListener('click', (e) => {
        // Prevent click if toolbar button clicked
        if (e.target.closest('.anim-pill-btn')) return;

        // Clear active presets when interacting individually so nothing conflicts
        if (this.activePreset) {
          this.reset();
        }

        const inner = box.querySelector('.letter-inner');
        if (!inner) return;

        // Cycle through individual micro-animations on click
        const animations = [
          // 1: 3D Flip & Bounce
          [
            { transform: 'perspective(600px) rotateY(0deg) translateY(0) scale(1)', opacity: 1 },
            { transform: 'perspective(600px) rotateY(180deg) translateY(-24px) scale(1.15)', opacity: 0.75, offset: 0.5 },
            { transform: 'perspective(600px) rotateY(360deg) translateY(0) scale(1)', opacity: 1 }
          ],
          // 2: Spring Jump
          [
            { transform: 'translateY(0) scale(1, 1)' },
            { transform: 'translateY(6px) scale(1.15, 0.85)', offset: 0.2 },
            { transform: 'translateY(-28px) scale(0.9, 1.15)', offset: 0.5 },
            { transform: 'translateY(3px) scale(1.05, 0.95)', offset: 0.75 },
            { transform: 'translateY(0) scale(1, 1)' }
          ],
          // 3: Tilt Wiggle
          [
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-14deg) scale(1.1)', offset: 0.25 },
            { transform: 'rotate(12deg) scale(1.1)', offset: 0.5 },
            { transform: 'rotate(-6deg) scale(1.04)', offset: 0.75 },
            { transform: 'rotate(0deg) scale(1)' }
          ]
        ];

        const animIndex = (box._clickCount = (box._clickCount || 0) + 1) % animations.length;
        const anim = inner.animate(animations[animIndex], {
          duration: 650,
          easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
        anim.onfinish = () => {
          inner.style.transform = '';
        };
      });

      // Accessibility: allow space/enter key to activate individual letter
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          box.click();
        }
      });
    });
  }

  /**
   * Toolbar preset triggers with toggle support
   */
  initToolbar() {
    if (!this.toolbar) return;

    this.buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const anim = btn.dataset.anim;
        if (anim === 'reset') {
          this.reset();
        } else if (this.activePreset === anim) {
          // Toggle off if already active
          this.reset();
        } else {
          this.playPreset(anim);
        }
      });
    });
  }

  /**
   * Play an animation preset across all letter boxes
   * @param {string} presetName - 'wave' | 'flip' | 'pop' | 'float' | 'disperse' | 'draw'
   */
  playPreset(presetName) {
    if (this.activePreset === presetName) {
      this.reset();
      return;
    }

    this.reset();

    // Update active button state
    this.buttons.forEach((b) => {
      b.classList.toggle('active', b.dataset.anim === presetName);
    });

    this.activePreset = presetName;
    const animClass = `anim-${presetName}`;

    // Apply animation class to each letter box
    this.letters.forEach((box) => {
      void box.offsetWidth;
      box.classList.add(animClass);
    });

    // Auto-return/clear for presets so they never stay stuck:
    // disperse returns after 1800ms, wave/flip/pop/draw return after 1400ms, float is toggleable
    if (presetName !== 'float') {
      const maxDuration = presetName === 'disperse' ? 1800 : 1400; // ms
      clearTimeout(this._presetTimer);
      this._presetTimer = setTimeout(() => {
        this.reset();
      }, maxDuration);
    }
  }

  /**
   * Reset all letters to their clean resting state
   */
  reset() {
    clearTimeout(this._presetTimer);
    const presetClasses = ['anim-wave', 'anim-flip', 'anim-pop', 'anim-float', 'anim-disperse', 'anim-draw'];

    this.letters.forEach((box) => {
      presetClasses.forEach((cls) => box.classList.remove(cls));
      const inner = box.querySelector('.letter-inner');
      if (inner) {
        inner.style.transform = '';
        inner.style.opacity = '';
        inner.style.filter = '';
        // Cancel any active Web Animations API animations
        if (inner.getAnimations) {
          inner.getAnimations().forEach((anim) => anim.cancel());
        }
      }
      const glyph = box.querySelector('.char-glyph') || box.querySelector('.svg-anim-path');
      if (glyph) {
        glyph.style.strokeDashoffset = '';
        glyph.style.fill = '';
        glyph.style.stroke = '';
      }
    });

    this.buttons.forEach((b) => b.classList.remove('active'));
    this.activePreset = null;
  }

  /**
   * Keyboard shortcuts: keys 1-6 to animate letter 1-6, 'w' for wave, 'f' for flip, 'r' for reset
   */
  initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger if user is focused on an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 6) {
        const box = this.letters[num - 1];
        if (box) box.click();
      } else if (e.key === 'w' || e.key === 'W') {
        this.playPreset('wave');
      } else if (e.key === 'f' || e.key === 'F') {
        this.playPreset('flip');
      } else if (e.key === 'p' || e.key === 'P') {
        this.playPreset('pop');
      } else if (e.key === 'Escape' || e.key === 'r' || e.key === 'R') {
        this.reset();
      }
    });
  }

  /**
   * Expose rich global API on window.TitleCard so the user can easily manipulate
   * each character's animation on its own via JavaScript, GSAP, or custom scripts.
   */
  exposeGlobalAPI() {
    window.TitleCard = {
      // Direct access to DOM elements
      letters: this.letters,
      inners: this.inners,
      paths: this.paths,

      /**
       * Get a letter box element by 0-indexed number or character string
       * @param {number|string} charOrIndex - 0-5 or 'K', 'a1', 'l', 'a2', 'कृ', 'ति'
       */
      get: (charOrIndex) => {
        if (typeof charOrIndex === 'number') {
          return this.letters[charOrIndex] || null;
        }
        return this.letters.find((l) => l.dataset.char === charOrIndex) || null;
      },

      /**
       * Get inner motion wrapper for a letter
       */
      getInner: (charOrIndex) => {
        const box = window.TitleCard.get(charOrIndex);
        return box ? box.querySelector('.letter-inner') : null;
      },

      /**
       * Animate an individual character with custom Web Animations API keyframes
       * @example window.TitleCard.animate(0, [{ transform: 'translateY(0)' }, { transform: 'translateY(-40px)' }], { duration: 500 })
       */
      animate: (charOrIndex, keyframes, options = {}) => {
        const inner = window.TitleCard.getInner(charOrIndex);
        if (!inner) return null;
        const defaultOptions = { duration: 600, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' };
        const anim = inner.animate(keyframes, { ...defaultOptions, ...options });
        if (!options.fill || options.fill !== 'forwards') {
          anim.onfinish = () => {
            inner.style.transform = '';
          };
        }
        return anim;
      },

      /**
       * Set inline CSS transform on a specific letter
       * @example window.TitleCard.setTransform(0, 'translateY(-20px) rotate(10deg)')
       */
      setTransform: (charOrIndex, transformStr) => {
        const inner = window.TitleCard.getInner(charOrIndex);
        if (inner) inner.style.transform = transformStr;
      },

      /**
       * Stagger a custom animation across all 6 characters
       */
      stagger: (keyframes, options = {}, delayBetween = 80) => {
        return this.inners.map((inner, idx) => {
          const opts = { ...options, delay: (options.delay || 0) + idx * delayBetween };
          return inner.animate(keyframes, opts);
        });
      },

      /**
       * Play a preset
       */
      playPreset: (presetName) => this.playPreset(presetName),

      /**
       * Reset all letters
       */
      reset: () => this.reset()
    };
  }
}

/**
 * Site navigation, dimensions toggle, and equalizer controller
 */
function initSiteControls() {
  // 1. Dimension Controller Toggle
  const dimToggle = document.getElementById('dimToggle');
  if (dimToggle) {
    dimToggle.addEventListener('click', () => {
      const isShowing = document.body.classList.toggle('show-dimensions');
      dimToggle.classList.toggle('active', isShowing);
      const label = dimToggle.querySelector('.dim-label');
      if (label) {
        label.textContent = isShowing ? 'Dimensions: ON' : 'Dimensions: OFF';
      }
    });
  }

  // 2. Smooth Scroll to Section for non-menu [data-scroll-to] links
  document.querySelectorAll('body > :not(.menu-overlay) [data-scroll-to], main [data-scroll-to], footer [data-scroll-to]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-scroll-to');
      if (!targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (window.animKitMenu && window.animKitMenu.isOpen()) {
          window.animKitMenu.close();
        }
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 3. Equalizer Toggle
  const audioBtn = document.getElementById('audioBtn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const bars = audioBtn.querySelectorAll('.eq-bar');
      const isPaused = bars[0] && bars[0].style.animationPlayState === 'paused';
      bars.forEach((b) => {
        b.style.animationPlayState = isPaused ? 'running' : 'paused';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TitleCardController();
  initSiteControls();
});

