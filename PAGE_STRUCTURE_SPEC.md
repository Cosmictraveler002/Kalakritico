# DZINRSTUDIO.COM - PAGE STRUCTURE & ARCHITECTURAL SPECIFICATION

## 1. Executive Summary

This document provides a comprehensive structural specification of **[dzinrstudio.com](https://dzinrstudio.com/)**.
In strict adherence to requirements:
- **Exact DOM structure, container hierarchy, and CSS layout models** have been extracted and replicated.
- **Heights and widths** across responsive breakpoints (Mobile `<768px`, Tablet `768px-1023px`, Desktop `≥1024px`, XL `≥1280px`) are preserved.
- **Background is kept pure white (`#ffffff`)** throughout with crisp wireframe styling.
- **Zero copyrighted assets, photos, logos, or proprietary copy** are copied. All elements are converted into architectural wireframe containers, skeleton lines, and dimensional placeholders.
- **Multi-Instance / Multi-Server Ready**: The generated structure is self-contained and modular, capable of running statelessly across load-balanced multi-server clusters.

---

## 2. Tech Stack & Layout Model

| Aspect | Original Implementation | Wireframe Blueprint Implementation |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Vercel Edge Server) | Semantic HTML5 + Vanilla CSS3 + Modern ES6 JS |
| **Typography** | Helvetica Neue + local fallbacks | Google Fonts: `Inter` (UI/Display) + `IBM Plex Mono` (Dimensions/Badges) |
| **Styling** | Tailwind CSS v4 + PostCSS | Pure Modular CSS with exact responsive utilities & tokens |
| **Background Color** | Theme variable `--background: oklch(100% 0 0)` | Pure White `#ffffff` (`var(--background)`) |
| **Layout Mode** | Fluid viewport container (`100vw`, `w-screen`, `overflow-x: clip`) | Fluid viewport container (`100vw`, `overflow-x: clip`) |
| **Vertical Rhythm** | `space-y-[60px] lg:space-y-[260px]` | `gap: 60px; @media (min-width: 1024px) { gap: 200px; }` |
| **Horizontal Gutters**| `px-4 lg:px-8` (16px Mobile / 32px Desktop) | `padding: 0 16px; @media (min-width: 1024px) { padding: 0 32px; }` |

---

## 3. Complete Section-by-Section Structural Breakdown

### 3.1. Top Navigation (`nav.site-nav`)
- **Container**: `<nav class="site-nav">`
- **Dimensions**:
  - `width: 100%`
  - `height: 56px`
  - `padding: 16px` (Mobile) / `padding: 16px 32px` (Desktop)
  - `position: sticky; top: 0; z-index: 900`
- **Children**:
  1. `.nav-logo-box`: `width: 80px; height: 16px; border: 1px solid #d4d4d8` (Logo placeholder).
  2. `.nav-menu-toggle`: Pill button `border-radius: 9999px; padding: 6px 12px; border: 1px solid #e4e4e7` containing 2 hamburger bars (`width: 16px; height: 1.5px`) and text label.

### 3.2. Fullscreen Navigation Overlay (`div.menu-overlay`)
- **Container**: `<div class="menu-overlay">`
- **Dimensions**: `position: fixed; inset: 0; width: 100vw; height: 100svh; z-index: 9999`
- **Children**:
  1. `.menu-overlay-bar`: Top bar with Logo placeholder (`80px × 16px`) and circular Close button (`36px × 36px`).
  2. `.menu-links-container`: Vertical list with 7 navigation items:
     - 01 Home, 02 About, 03 Services, 04 Work, 05 Contact, 06 Career, 07 Design News
     - Font size: `28px` (Mobile) / `42px` (Desktop)
  3. `.menu-footer`: Flex row containing Showreel action button and Social media links.

### 3.3. Floating Action Bar (`div.floating-widgets-bar`)
- **Container**: `<div class="floating-widgets-bar">`
- **Dimensions**: `position: fixed; bottom: 16px; right: 16px; z-index: 9999; display: flex; gap: 8px;`
- **Children**:
  1. `.audio-equalizer-btn`: Pill button (`height: 40px; border-radius: 9999px`) with 5 animated equalizer bars (`width: 2px`).
  2. `.theme-toggle-btn`: Circular button (`width: 40px; height: 40px; border-radius: 50%`).

### 3.4. Section 1: Hero Block (`section.hero-block`)
- **Container**: `<section class="hero-block">`
- **Spacing**: `gap: 80px` (Mobile) / `gap: 160px` (Desktop)
- **Children**:
  1. **Hero Header Bar (`header.hero-header-bar`)**:
     - Desktop only (`hidden lg:flex; width: 100%; justify-content: space-between`).
     - Left: Logo placeholder (`80px × 16px`) + Studio descriptor columns.
     - Right: Links column (`Work`, `About`, `Services`), Socials column (`Instagram`, `LinkedIn`), and `cta-button` (`Let's Talk →`).
  2. **Display Title Frame (`div.hero-display-title-container`)**:
     - Container: `width: 100%; max-width: 1306px; margin-top: 40px (lg: 80px); display: flex; flex-direction: column; align-items: center; gap: 16px;`
     - Title Card Frame: `<div class="hero-display-wireframe-frame title-card-frame" id="titleCardFrame">` with `aspect-ratio: 1306 / 305; width: 100%;`
     - Individual Letter Boxes: `.title-letters-track` containing 6 independent character boxes:
       1. `#letterBox-K`: char `K`, viewBox `0 0 227 305`, ratio `227fr`
       2. `#letterBox-a1`: char `a`, viewBox `227 0 181 305`, ratio `181fr`
       3. `#letterBox-l`: char `l`, viewBox `408 0 103 305`, ratio `103fr`
       4. `#letterBox-a2`: char `a`, viewBox `511 0 178 305`, ratio `178fr`
       5. `#letterBox-kri`: char `कृ`, viewBox `689 0 243 305`, ratio `243fr`
       6. `#letterBox-ti`: char `ति`, viewBox `932 0 374 305`, ratio `374fr`
     - Letter Motion Architecture: Each box contains `.letter-inner` motion wrapper, standalone scalable `<svg class="letter-svg">`, dimension badge, and individual animation hooks (`.anim-wave`, `.anim-flip`, `.anim-pop`, `.anim-float`, `.anim-disperse`, `.anim-draw`).
     - Animation Controller: Toolbar with preset triggers (`Wave`, `3D Flip`, `Pop`, `Float`, `Disperse`, `Draw`, `Reset`) and `window.TitleCard` JavaScript API for granular per-character manipulation.
  3. **Hero Subtitle Bar (`div.hero-subtitle-bar`)**:
     - `width: 100%; display: flex; justify-content: space-between; align-items: flex-end;`
     - Left: 2 descriptor columns with skeleton line bars.
     - Right: Circular scroll down indicator arrow (`32px × 32px`).
  4. **Showreel Container (`section.showreel-section`)**:
     - Container: `width: 100%; padding: 0 16px (lg: 32px);`
     - Wrapper: `width: 100%; height: 50vh (Mobile) / 90vh (Desktop); border-radius: 12px (lg: 16px);`
     - Floating badge: Pill button `top: 20px; left: 20px; border-radius: 9999px;` displaying `▶ [ Media Box: Showreel Video ]`.

### 3.5. Section 2: Work / Projects Showcase
- **Desktop Layout (`section.showcase-section-desktop`)**:
  - `display: none; @media (min-width: 1024px) { display: block; }`
  - Track: `width: 400%; height: 90vh; display: flex; flex-wrap: nowrap; gap: 24px; padding: 0 32px;`
  - 5 Project Cards:
    - `width: 100vw; max-width: 1280px; height: 100%; flex-shrink: 0; border-radius: 16px;`
    - Media Canvas: `height: calc(100% - 70px); width: 100%;`
    - Metadata Bottom Bar: `height: 70px; width: 100%; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;`
  - 1 Projects End Panel:
    - `width: 100vw; max-width: 1280px; height: 100%; padding: 40px; display: flex; flex-direction: column; justify-content: space-between;`
    - Top: Heading `Projects` (`text-9xl`) + Archive button.
    - Bottom: Narrative statement block (`text-3xl lg:text-6xl`).
- **Mobile Layout (`section.showcase-section-mobile`)**:
  - `display: flex; flex-direction: column; gap: 24px; @media (min-width: 1024px) { display: none; }`
  - 3 Stacked Cards: `width: 100%; height: 480px; border-radius: 12px;`

### 3.6. Section 3: Services & Philosophy (`section.services-section`)
- **Container**: `<section class="services-section">`
- **Padding**: `0 16px` (Mobile) / `0 32px` (Desktop)
- **Children**:
  1. **Header Row**:
     - Title: `Services We provide` (`font-size: clamp(36px, 7vw, 96px); line-height: 0.95;`)
     - CTA Link: `Learn More →`
     - Desktop Summary Column: `[04] Summary:` list (Branding, UI/UX Design, Development, Packaging).
  2. **4 Services Cards Grid (`div.services-cards-grid`)**:
     - Grid columns: 1 column (Mobile) → 2 columns (`≥768px`) → 4 columns (`≥1280px`)
     - Card Dimensions: `height: 400px; border-radius: 24px; padding: 24px;`
     - Each card contains:
       - `.service-icon-box`: `64px × 64px; border-radius: 12px;`
       - `.service-body-box`: Title (`24px`) + 2 skeleton description lines.

### 3.7. Section 4: Explore Collaborations (`section.collaborations-section`)
- **Container**: `<section class="collaborations-section">`
- **Children**:
  1. Title: `Explore Collaborations` (`font-size: clamp(36px, 7vw, 96px)`)
  2. **Floating Sticky Preview Card**:
     - Sticky anchor: `position: sticky; top: 35%; height: 0; z-index: 30;`
     - Card: `width: 140px; height: 140px (Mobile) / 220px × 260px (Desktop); transform: rotate(12deg); box-shadow: 0 20px 40px rgba(0,0,0,0.12);`
  3. **Collaborations Archive List (`div.collaborations-list`)**:
     - 12 wireframe collaborator rows (`padding: 16px 0 (lg: 24px 0); border-bottom: 1px solid #f4f4f5;`)
     - Typography: Centered `font-size: clamp(24px, 4vw, 56px); font-weight: 500;`

### 3.8. Section 5: Client Logo Ticker Marquee (`section.client-ticker-section`)
- **Container**: `<section class="client-ticker-section">`
- **Dimensions**: `width: 100%; height: 64px (Mobile) / 110px (Desktop); overflow: hidden;`
- **Track**: `display: flex; gap: 8px; width: max-content; animation: tickerScroll 25s linear infinite;`
- **Logo Boxes**:
  - Mobile: `width: calc(50vw - 16px); height: 64px;` (2 boxes visible per viewport)
  - Desktop: `width: calc(25vw - 24px); height: 110px;` (4 boxes visible per viewport)

### 3.9. Section 6: Stand Out Pin Section (`section.standout-pin-section`)
- **Container**: `<section class="standout-pin-section">`
- **Dimensions**: `width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden;`
- **Marquee Text**: `font-size: clamp(48px, 16vw, 180px); line-height: 0.9; text-transform: uppercase;`
- **Letter Blocks**: `[ SO ] [ ARE ] [ YOU ] [ READY ] [ TO ] [ STAND ] [ OUT? ]`

### 3.10. Section 7: Footer (`footer.site-footer`)
- **Container**: `<footer class="site-footer">`
- **Dimensions**: `width: 100%; padding: 40px 16px 20px (lg: 100px 32px 30px); gap: 60px (lg: 120px);`
- **Top Row**:
  - Left Column (`max-width: 440px; gap: 32px;`): Headline (`32px - 48px`), CTA Button (`height: 56px; max-width: 240px;`), Contact email box.
  - Right Column (`grid-template-columns: repeat(2, 1fr); gap: 40px (lg: 80px);`):
    - Col 1: Navigation links (`Work`, `About`, `Services`, `Contact`, `Career`)
    - Col 2: Social links (`Instagram`, `LinkedIn`, `X / Twitter`, `Email`)
    - Col 3: Location details (`Mumbai, India, Asia`)
    - Col 4: Legal links (`Terms & Conditions`, `Privacy Policy`)
- **Bottom Row**:
  - Giant Footer Brand Emblem Wireframe: `width: 100%; height: 96px (Mobile) / 144px (Desktop); border-radius: 8px;`

---

## 4. Multi-Server & Multi-Instance Architecture

The user noted: *"it may have multiple instances in multiple server"*. 
This design handles horizontal scaling across multiple servers as follows:

1. **Stateless Static Asset Delivery**:
   - `index.html`, `styles.css`, and `app.js` contain zero server-affinity or stateful session dependencies.
   - Any instance behind an Nginx, HAProxy, AWS ALB, Cloudflare, or Vercel load balancer can serve the response with identical output.

2. **Nginx Multi-Instance Reverse Proxy Configuration**:
   ```nginx
   upstream dzinr_cluster {
       least_conn;
       server 10.0.0.1:3000 max_fails=3 fail_timeout=10s;
       server 10.0.0.2:3000 max_fails=3 fail_timeout=10s;
       server 10.0.0.3:3000 max_fails=3 fail_timeout=10s;
   }

   server {
       listen 80;
       server_name _;

       root /var/www/kalakritico;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
           add_header Cache-Control "public, max-age=3600";
       }
   }
   ```

3. **Docker Multi-Instance Containerization**:
   - A single Docker image can be spun up across any number of container instances:
   ```dockerfile
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

---

## 5. Blueprint / Dimension Mode

An interactive controller is mounted on the top-right:
- Click the **"Dimensions: ON / OFF"** pill button (or press `D`).
- In **ON** mode, every container displays a live pill tag showing its structural CSS dimensions (e.g. `100vw × 100svh`, `max-w: 1280px`, `h: 400px`, `w: 80px | h: 16px`, etc.).
- In **OFF** mode, it renders as a pure minimalist structural wireframe on clean white background.
