const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('file:///c:/Kalakritico/index.html');

  // Test updating the viewBoxes and ratios
  await page.evaluate(() => {
    const letters = [
      { id: 'letterBox-K', ratio: 148, vb: '40 22 148 245', x: 114 },
      { id: 'letterBox-a1', ratio: 119, vb: '31 22 119 245', x: 90.5 },
      { id: 'letterBox-l', ratio: 59, vb: '22 22 59 245', x: 51.5 },
      { id: 'letterBox-a2', ratio: 119, vb: '30 22 119 245', x: 89.5 },
      { id: 'letterBox-kri', ratio: 174, vb: '54 22 174 245', x: 141 },
      { id: 'letterBox-ti', ratio: 192, vb: '74 22 192 245', x: 170 },
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

    const frame = document.getElementById('titleCardFrame');
    if (frame) {
      frame.style.maxWidth = '96vw';
      frame.style.width = '96vw';
      frame.style.aspectRatio = '811 / 245';
      frame.style.height = 'auto';
    }

    const container = document.querySelector('.hero-display-title-container');
    if (container) {
      container.style.marginTop = '20px';
      container.style.padding = '0 2vw';
    }
  });

  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(__dirname, 'test_title_tight.png') });
  console.log('Saved test_title_tight.png');
  await browser.close();
})();
