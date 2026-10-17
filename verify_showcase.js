const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const artifactDir = path.resolve('C:/Users/PC/.gemini/antigravity-ide/brain/cdb582bf-0154-4465-831d-312fe99715c7');
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop Test
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();
  
  const fileUrl = 'file:///' + path.resolve('c:/Kalakritico/index.html').replace(/\\/g, '/');
  console.log('Navigating to', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to #work section
  const workSection = await page.$('#work');
  if (workSection) {
    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  // Screenshot 1: Desktop Showcase - First Card (Pure Vessel)
  await page.screenshot({
    path: path.join(artifactDir, 'showcase_desktop_card1_purevessel.png'),
    fullPage: false
  });
  console.log('Captured showcase_desktop_card1_purevessel.png');

  // Hover over the first arrow button to test hover state
  const firstArrowBtn = await page.$('.project-card-desktop:first-child .project-arrow-btn');
  if (firstArrowBtn) {
    await firstArrowBtn.hover();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(artifactDir, 'showcase_desktop_arrow_hover.png'),
      fullPage: false
    });
    console.log('Captured showcase_desktop_arrow_hover.png');
  }

  // Scroll horizontal track to show card 2 and card 3
  await page.evaluate(() => {
    const track = document.getElementById('horizontalTrack');
    if (track) track.scrollLeft = 1200;
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(artifactDir, 'showcase_desktop_cards_scroll.png'),
    fullPage: false
  });
  console.log('Captured showcase_desktop_cards_scroll.png');

  // Scroll horizontal track to show card 4 and card 5 (Tottoro)
  await page.evaluate(() => {
    const track = document.getElementById('horizontalTrack');
    if (track) track.scrollLeft = 3600;
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(artifactDir, 'showcase_desktop_card5_tottoro.png'),
    fullPage: false
  });
  console.log('Captured showcase_desktop_card5_tottoro.png');

  // 2. Mobile Viewport Test (iPhone 14 / 390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(fileUrl, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileShowcase = await mobilePage.$('.showcase-section-mobile');
  if (mobileShowcase) {
    await mobileShowcase.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(600);
  }

  await mobilePage.screenshot({
    path: path.join(artifactDir, 'showcase_mobile_stack.png'),
    fullPage: false
  });
  console.log('Captured showcase_mobile_stack.png');

  // Verify links and attributes
  const linkReport = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.project-card-desktop'));
    return cards.map(c => {
      const title = c.querySelector('.project-card-title')?.innerText?.trim();
      const year = c.querySelector('.project-year-badge')?.innerText?.trim();
      const cat = c.querySelector('.project-meta-category')?.innerText?.trim();
      const srv = c.querySelector('.project-meta-service')?.innerText?.trim();
      const link = c.querySelector('.project-arrow-btn')?.getAttribute('href');
      const target = c.querySelector('.project-arrow-btn')?.getAttribute('target');
      const imgSrc = c.querySelector('.project-media-img')?.getAttribute('src');
      return { title, year, cat, srv, link, target, imgSrc };
    });
  });

  console.log('Project Cards Link Report:', JSON.stringify(linkReport, null, 2));

  await browser.close();
  console.log('Verification finished successfully!');
})();
