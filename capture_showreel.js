import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:\\Users\\PC\\.gemini\\antigravity-ide\\brain\\cdb582bf-0154-4465-831d-312fe99715c7';
const htmlUrl = 'file:///c:/Kalakritico/index.html';

async function main() {
  console.log('Launching Playwright Chromium to test Showreel Video, Hero Shrink, and Cursor Follower...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  console.log('Navigating to', htmlUrl);
  await page.goto(htmlUrl, { waitUntil: 'load' });
  await page.waitForTimeout(2000); // Allow anim-kit to load and video to buffer

  // Verify video is loaded and playing
  const videoState = await page.evaluate(() => {
    const v = document.querySelector('.showreel-video');
    return {
      src: v?.currentSrc || v?.src,
      paused: v?.paused,
      readyState: v?.readyState,
      videoWidth: v?.videoWidth,
      videoHeight: v?.videoHeight
    };
  });
  console.log('Video state:', videoState);

  // 1. Showreel Video Playing at resting position
  console.log('1. Capturing Showreel Video in resting position...');
  const showreelSection = page.locator('.showreel-section');
  await showreelSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await showreelSection.screenshot({ path: path.join(outDir, '10_showreel_video_playing.png') });

  // 2. Cursor Follower Tag interaction in the showreel zone
  console.log('2. Moving pointer into showreel zone to test Cursor Follower Tag...');
  const zoneBox = await page.locator('[data-showreel]').boundingBox();
  if (zoneBox) {
    // Move to center of showreel zone
    await page.mouse.move(zoneBox.x + zoneBox.width / 2, zoneBox.y + zoneBox.height / 2);
    await page.waitForTimeout(600); // Wait for spring physics to settle
    await page.screenshot({ path: path.join(outDir, '11_cursor_follower_active.png') });
  }

  // 3. Hero Media Shrink on scroll (Diagonal Left-Aligned)
  console.log('3. Scrolling to trigger Diagonal Left-Aligned Hero Media Shrink...');
  // Mid-scroll diagonal shrink
  await page.evaluate(() => window.scrollTo({ top: 1450, behavior: 'instant' }));
  await page.waitForTimeout(2200); // Allow scrub: 2 to settle
  await page.screenshot({ path: path.join(outDir, '12_hero_media_shrink_scroll.png') });

  // Settled card state at showcase entry
  await page.evaluate(() => window.scrollTo({ top: 1750, behavior: 'instant' }));
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(outDir, '13_diagonal_left_shrink_card.png') });

  // 4. Click video to test toggle
  console.log('4. Clicking showreel zone to test play/pause...');
  if (zoneBox) {
    await page.mouse.click(zoneBox.x + zoneBox.width / 2, zoneBox.y + zoneBox.height / 2);
    await page.waitForTimeout(300);
    const tagText = await page.evaluate(() => document.querySelector('[data-cursor]')?.textContent);
    console.log('Tag text after click:', tagText);
  }

  console.log('All showreel verification captures completed successfully!');
  await browser.close();
}

main().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
