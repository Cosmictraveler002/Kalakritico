import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:\\Users\\PC\\.gemini\\antigravity-ide\\brain\\cdb582bf-0154-4465-831d-312fe99715c7';
const htmlUrl = 'file:///c:/Kalakritico/index.html';

async function main() {
  console.log('Launching Playwright Chromium via Bun...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  console.log('Navigating to', htmlUrl);
  await page.goto(htmlUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000); // Allow fonts to render cleanly

  const heroContainer = page.locator('.hero-display-title-container');

  // 1. Resting state (dimensions OFF) - Verifying authentic Hindi typography
  console.log('1. Resting state (Dimensions OFF)...');
  await page.evaluate(() => document.body.classList.remove('show-dimensions'));
  await page.waitForTimeout(300);
  await heroContainer.screenshot({ path: path.join(outDir, '01_resting_state.png') });

  // 2. Blueprint Dimensions ON
  console.log('2. Blueprint Dimensions ON...');
  await page.evaluate(() => document.body.classList.add('show-dimensions'));
  await page.waitForTimeout(300);
  await heroContainer.screenshot({ path: path.join(outDir, '02_blueprint_dimensions.png') });

  // 3. Hovering Letter Box K
  console.log('3. Hover Letter Box K...');
  await page.hover('#letterBox-K');
  await page.waitForTimeout(300);
  await heroContainer.screenshot({ path: path.join(outDir, '03_hover_letter_k.png') });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(200);

  // 4. Wave preset
  console.log('4. Wave preset...');
  await page.click('button[data-anim="wave"]');
  await page.waitForTimeout(350); // Mid-wave peak
  await heroContainer.screenshot({ path: path.join(outDir, '04_wave_preset.png') });
  await page.waitForTimeout(1400); // Allow wave to complete and self-clear

  // 5. 3D Flip preset
  console.log('5. 3D Flip preset...');
  await page.click('button[data-anim="flip"]');
  await page.waitForTimeout(460); // Mid-flip rotation peak
  await heroContainer.screenshot({ path: path.join(outDir, '05_3d_flip_preset.png') });
  await page.waitForTimeout(1400); // Allow flip to complete and self-clear

  // 6. Disperse preset and test auto-return (not stuck!)
  console.log('6. Disperse preset and auto-return test...');
  await page.click('button[data-anim="disperse"]');
  await page.waitForTimeout(350);
  await heroContainer.screenshot({ path: path.join(outDir, '06_disperse_preset.png') });
  
  // Wait for disperse auto-return timer (1800ms) to ensure it does NOT stay stuck
  console.log('Waiting for disperse auto-return...');
  await page.waitForTimeout(2000);
  await heroContainer.screenshot({ path: path.join(outDir, '06b_disperse_auto_returned.png') });

  // 7. Direct click on individual letter 'कृ'
  console.log('7. Direct click on individual letter "कृ"...');
  await page.click('#letterBox-kri');
  await page.waitForTimeout(280); // Mid-jump peak
  await heroContainer.screenshot({ path: path.join(outDir, '07_click_letter_kri.png') });
  await page.waitForTimeout(700);

  // 8. Direct click on individual letter 'ति'
  console.log('8. Direct click on individual letter "ति"...');
  await page.click('#letterBox-ti');
  await page.waitForTimeout(280); // Mid-jump peak
  await heroContainer.screenshot({ path: path.join(outDir, '08_click_letter_ti.png') });
  await page.waitForTimeout(700);

  // 9. Full hero section capture
  console.log('9. Hero full view...');
  const heroSection = page.locator('#hero');
  await heroSection.screenshot({ path: path.join(outDir, '09_hero_full_view.png') });

  console.log('Captures completed successfully!');
  await browser.close();
}

main().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
