import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'assets', 'projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const projects = [
  {
    id: 'purevessel',
    url: 'https://purevessel.vercel.app/',
    name: 'Pure Vessel',
    defaultCategory: 'HEALTH & LIFESTYLE',
    defaultService: 'BRAND & PACKAGING',
    year: '2025'
  },
  {
    id: 'stylesco',
    url: 'https://stylesco.netlify.app/',
    name: 'Style & Co',
    defaultCategory: 'FASHION & APPAREL',
    defaultService: 'E-COMMERCE & IDENTITY',
    year: '2025'
  },
  {
    id: 'inkcard',
    url: 'https://inkcard.netlify.app/',
    name: 'Ink Card',
    defaultCategory: 'DIGITAL CRAFT',
    defaultService: 'WEB EXPERIENCE',
    year: '2024'
  },
  {
    id: 'meetmecafe',
    url: 'https://meetmecafe.vercel.app/',
    name: 'Meet Me Cafe',
    defaultCategory: 'HOSPITALITY & F&B',
    defaultService: 'BRANDING & INTERACTION',
    year: '2025'
  },
  {
    id: 'tottoro',
    url: 'https://tottoro.netlify.app/',
    name: 'Tottoro',
    defaultCategory: 'CREATIVE DIRECTION',
    defaultService: '3D & INTERACTIVE',
    year: '2025'
  }
];

async function capture() {
  console.log('Launching browser to capture project hero screenshots...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const metadataResults = [];

  for (const proj of projects) {
    console.log(`\nNavigating to ${proj.name} (${proj.url})...`);
    const page = await context.newPage();
    
    try {
      await page.goto(proj.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      
      // Special handling for tottoro or general loading screens
      if (proj.id === 'tottoro') {
        console.log('Tottoro detected: waiting for loading screen to clear...');
        // Wait up to 15s for any loader element to disappear, or wait for content to settle
        await page.waitForTimeout(8000); // Tottoro initial load buffer
        // Check if there are common loader selectors
        await page.waitForFunction(() => {
          const loader = document.querySelector('.loader, .loading, #loader, [class*="load"]');
          if (loader) {
            const style = window.getComputedStyle(loader);
            if (style.display === 'none' || style.opacity === '0' || style.visibility === 'hidden') return true;
          }
          return document.readyState === 'complete';
        }, { timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(3000); // extra settle time for animations
      } else {
        await page.waitForTimeout(4000); // allow fonts, WebGL, animations to settle
      }

      // Extract site title / h1 / meta info
      const info = await page.evaluate(() => {
        const title = document.title;
        const h1 = document.querySelector('h1')?.innerText?.trim() || '';
        const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
        return { title, h1, metaDesc };
      });

      console.log(`Extracted metadata for ${proj.id}:`, info);

      // Save screenshot
      const outPath = path.join(outDir, `${proj.id}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved screenshot to ${outPath}`);

      metadataResults.push({
        ...proj,
        pageTitle: info.title,
        heading: info.h1,
        imagePath: `assets/projects/${proj.id}.png`
      });
    } catch (err) {
      console.error(`Error capturing ${proj.url}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  fs.writeFileSync(path.join(outDir, 'metadata.json'), JSON.stringify(metadataResults, null, 2));
  console.log('\nAll captures finished and metadata saved!');
}

capture().catch(console.error);
