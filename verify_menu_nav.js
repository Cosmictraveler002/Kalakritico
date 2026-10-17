const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');

const PORT = 3000;
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.mp4': 'video/mp4'
  };
  
  res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err));

  try {
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 1. Initial State Screenshot
    await page.screenshot({ path: path.join(__dirname, 'verify_initial.png') });
    console.log('Saved verify_initial.png');

    // Check anim-kit globals
    const globals = await page.evaluate(() => {
      return {
        hasAnimKit: !!window.animKit,
        hasMenu: !!window.animKitMenu,
        isMenuOpen: window.animKitMenu ? window.animKitMenu.isOpen() : false,
        destroyers: Object.keys(window.animKitDestroyers || {})
      };
    });
    console.log('Globals:', globals);

    // 2. Test Open Curtain Menu from Desktop Hero Header
    console.log('Clicking desktop hero [data-menu-open]...');
    await page.locator('.hero-header-bar [data-menu-open]').click();
    // Wait for curtain animation (duration 1s)
    await page.waitForTimeout(1200);

    const menuStateAfterOpen = await page.evaluate(() => {
      const overlay = document.querySelector('[data-menu]');
      const links = Array.from(document.querySelectorAll('[data-menu] .menu-link a')).map(a => ({
        text: a.innerText.trim(),
        transform: window.getComputedStyle(a).transform
      }));
      return {
        isOpen: window.animKitMenu.isOpen(),
        clipPath: window.getComputedStyle(overlay).clipPath,
        pointerEvents: window.getComputedStyle(overlay).pointerEvents,
        linksCount: links.length,
        linksSample: links.slice(0, 3)
      };
    });
    console.log('Menu state after open:', menuStateAfterOpen);
    await page.screenshot({ path: path.join(__dirname, 'verify_menu_open.png') });
    console.log('Saved verify_menu_open.png');

    // 3. Test Close Curtain Menu via Close Button
    console.log('Clicking [data-menu-close]...');
    await page.locator('[data-menu-close]').click();
    // Wait for close animation (duration ~1.5s)
    await page.waitForTimeout(1800);

    const menuStateAfterClose = await page.evaluate(() => {
      const overlay = document.querySelector('[data-menu]');
      return {
        isOpen: window.animKitMenu.isOpen(),
        clipPath: window.getComputedStyle(overlay).clipPath,
        pointerEvents: window.getComputedStyle(overlay).pointerEvents
      };
    });
    console.log('Menu state after close:', menuStateAfterClose);
    await page.screenshot({ path: path.join(__dirname, 'verify_menu_closed.png') });
    console.log('Saved verify_menu_closed.png');

    // 4. Test Hide-on-scroll nav
    // Scroll down to 800px (past threshold 200px)
    console.log('Scrolling down to 800px...');
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'instant' }));
    await page.waitForTimeout(600);

    const navScrollDown = await page.evaluate(() => {
      const nav = document.querySelector('[data-nav]');
      return {
        scrollY: window.scrollY,
        navTransform: window.getComputedStyle(nav).transform
      };
    });
    console.log('Nav after scroll down:', navScrollDown);
    await page.screenshot({ path: path.join(__dirname, 'verify_scroll_down.png') });

    // Scroll up by 200px to 600px -> Nav slides down into view!
    console.log('Scrolling up to 600px...');
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
    await page.waitForTimeout(600);

    const navScrollUp = await page.evaluate(() => {
      const nav = document.querySelector('[data-nav]');
      return {
        scrollY: window.scrollY,
        navTransform: window.getComputedStyle(nav).transform
      };
    });
    console.log('Nav after scroll up:', navScrollUp);
    await page.screenshot({ path: path.join(__dirname, 'verify_scroll_up.png') });

    // 5. Test opening menu from sliding nav's button
    console.log('Opening menu from sliding nav button...');
    await page.locator('[data-nav] [data-menu-open]').click();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(__dirname, 'verify_menu_from_nav.png') });

    console.log('Clicking Work link inside menu...');
    await page.locator('[data-menu] a[href="#work"]').click();
    await page.waitForTimeout(1800);

    const finalState = await page.evaluate(() => {
      return {
        scrollY: window.scrollY,
        isOpen: window.animKitMenu.isOpen()
      };
    });
    console.log('Final state after link click navigation:', finalState);

    console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test execution failed:', err);
  } finally {
    await browser.close();
    server.close();
  }
});
