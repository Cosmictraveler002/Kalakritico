const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('file:///c:/Kalakritico/index.html');

  await page.evaluate(() => {
    // Inject custom styling for ultra-bold massive title with tight letter spacing
    const style = document.createElement('style');
    style.innerHTML = `
      .hero-display-title-container {
        width: 100% !important;
        max-width: 100vw !important;
        padding: 0 1vw !important;
        margin-top: 10px !important;
      }
      .hero-display-wireframe-frame {
        width: 98vw !important;
        max-width: 98vw !important;
        aspect-ratio: 780 / 235 !important;
        padding: 0 !important;
      }
      .title-letters-track {
        gap: 0px !important;
        justify-content: center !important;
      }
      .letter-svg .char-glyph {
        font-weight: 900 !important;
        font-size: 205px !important;
      }
      #letterBox-a1 {
        margin-left: -1.2vw !important;
      }
      #letterBox-l {
        margin-left: -0.6vw !important;
      }
      #letterBox-a2 {
        margin-left: -0.6vw !important;
      }
      #letterBox-kri {
        margin-left: -0.8vw !important;
      }
      #letterBox-ti {
        margin-left: -0.8vw !important;
      }
    `;
    document.head.appendChild(style);

    const letters = [
      { id: 'letterBox-K', ratio: 148, vb: '40 20 148 245', x: 114 },
      { id: 'letterBox-a1', ratio: 119, vb: '31 20 119 245', x: 90.5 },
      { id: 'letterBox-l', ratio: 59, vb: '22 20 59 245', x: 51.5 },
      { id: 'letterBox-a2', ratio: 119, vb: '30 20 119 245', x: 89.5 },
      { id: 'letterBox-kri', ratio: 174, vb: '54 20 174 245', x: 141 },
      { id: 'letterBox-ti', ratio: 192, vb: '74 20 192 245', x: 170 },
    ];

    letters.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) {
        el.style.setProperty('--char-ratio', l.ratio);
        const svg = el.querySelector('svg');
        if (svg) svg.setAttribute('viewBox', l.vb);
        const txt = el.querySelector('text');
        if (txt) txt.setAttribute('x', l.x);
      }
    });
  });

  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(__dirname, 'test_title_tight_2.png') });
  console.log('Saved test_title_tight_2.png');
  await browser.close();
})();
