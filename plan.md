# PURE VESSEL — Interactive 3D Product Story

## 0. Project Definition

**Product:** Pure Vessel  
**Concept:** A fictional premium insulated bottle presented like a precision-engineered luxury machine.

The website is not a conventional product page with a 3D model placed in the hero.

The 3D bottle is the protagonist.

The user scrolls through a controlled visual sequence in which:

1. The bottle is discovered in darkness.
2. Its silhouette and construction are revealed.
3. The cap is inspected like an engineered component.
4. The body is deconstructed to expose its thermal construction.
5. The entire product transitions into a bold red final composition.
6. The experience resolves into an order CTA.

The intended feeling is:

> **Precision. Obsession. Durability. Luxury.**

The visual language should feel closer to a high-end automotive/product film than an ordinary ecommerce page.

---

# 1. Product Concept

## Pure Vessel

### Product category

Premium insulated everyday bottle.

### Fictional product proposition

Pure Vessel is designed around one idea:

> **A vessel should protect what you put inside it.**

It combines a rigid outer shell, multi-layer thermal construction, vacuum insulation, a precision-sealed cap and a minimalist industrial design.

### Fictional specifications

These are creative specifications for the concept website, not claims about a real product.

- Double-wall stainless-steel construction
- Vacuum-insulated thermal core
- Multi-layer thermal barrier
- Impact-resistant cap assembly
- Food-safe stainless-steel interior
- Leak-resistant threaded seal
- Sweat-resistant exterior
- 750 ml capacity
- Designed for hot and cold beverages
- Minimal industrial silhouette
- Modular cap gasket
- Powder-coated outer finish

### Product personality

Pure Vessel should feel:

- engineered rather than decorative
- premium rather than flashy
- severe rather than playful
- tactile rather than futuristic
- confident rather than sales-heavy

Avoid generic "smart bottle" language.

Do not make it sound like a Bluetooth gadget.

The fantasy is that somebody obsessed over every physical detail.

---

# 2. Brand Copy / Product Script

## Hero

**PURE VESSEL**

### Primary line

> BUILT TO HOLD MORE THAN WATER.

### Supporting line

> Precision-engineered insulation.  
> Relentless thermal control.  
> Nothing unnecessary.

---

## Reveal

> **PURE FORM.**

> **PURE FUNCTION.**

> One vessel.  
> Built around what matters.

---

## Cap section

### Heading

> THE CAP ISN'T AN AFTERTHOUGHT.

Supporting copy:

> Engineered as a structural component, not an accessory.

Specification labels:

- IMPACT-RESISTANT OUTER SHELL
- PRECISION THREAD
- DOUBLE-SEAL GASKET
- LOCKED CLOSURE

### Feature statement

> BUILT TO TAKE THE DAILY ABUSE.

Supporting copy:

> Drops. Impacts. Commutes.  
> The cap is designed to stay closed when the world doesn't.

If demonstrating a fictional impact test, label it clearly as a product concept or simulated test rather than presenting it as a verified real-world performance claim.

---

# 3. Body / Thermal Section

### Heading

> THE BOTTLE IS A SYSTEM.

Supporting copy:

> The outside is only the beginning.

The bottle separates into layers.

### Layer 01

**OUTER SHELL**

> Rigid stainless-steel exterior designed for everyday impact and handling.

### Layer 02

**THERMAL BARRIER**

> A dedicated insulating layer limits unwanted heat transfer.

### Layer 03

**VACUUM CORE**

> The central vacuum layer slows conductive and convective heat transfer.

### Layer 04

**INNER VESSEL**

> Food-safe stainless steel keeps the beverage isolated from the outer shell.

### Main statement

> MULTI-LAYER THERMAL CONTROL.

Supporting copy:

> Four layers.  
> One job: keep the inside separate from the outside.

---

# 4. Material / Texture Moment

After the technical exploded view, reconstruct the bottle.

The camera moves extremely close to the surface.

Show:

- powder-coat texture
- machined metal edge
- gasket
- brushed metal
- tiny surface imperfections
- condensation or controlled highlights

Text:

> **FEEL THE ENGINEERING.**

Then:

> Every surface has a purpose.

This section should be almost macro-photography in 3D.

---

# 5. Final Transformation

The bottle returns to its complete form.

It begins rotating around its longitudinal axis.

The rotation gradually increases.

The camera moves from a frontal three-quarter view to a side profile.

At the same time:

```text
BLACK
  ↓
deep charcoal
  ↓
dark red
  ↓
PURE RED
```

The environment changes from the restrained engineering aesthetic to the brand's final statement.

The bottle becomes horizontal.

The lighting becomes harder.

The product is now treated like an icon rather than an engineering object.

---

# 6. Final CTA

### Main text

> JOIN THE PURE VESSEL CULT.

### Supporting text

> Carry less.  
> Keep more.  
> Make it yours.

### Button

> ORDER PURE VESSEL

Optional secondary text:

> 750 ML · ENGINEERED FOR EVERYDAY USE

The CTA should not appear until the bottle has completed its final rotation.

---

# 7. Experience Timeline

Use one continuous scroll-controlled cinematic timeline rather than treating every section as an unrelated page.

| Progress | Scene | Main Action |
|---|---|---|
| 0.00–0.12 | Hero | Typography enters; bottle almost invisible |
| 0.12–0.25 | Reveal | Edge light exposes silhouette and body |
| 0.25–0.45 | Cap | Camera travels upward; cap becomes hero |
| 0.45–0.67 | Body | Camera descends; bottle construction is inspected |
| 0.67–0.78 | Exploded View | Layers separate and specifications appear |
| 0.78–0.90 | Reconstruction | Layers return to complete bottle |
| 0.90–0.96 | Transformation | Bottle rotates horizontal; environment turns red |
| 0.96–1.00 | CTA | Final composition and order button |

Do not interpret these percentages as literal requirements. Tune the distances during implementation.

---

# 8. Technical Architecture

## Recommended stack

```text
Vite
├── React
├── Three.js
├── React Three Fiber
├── Drei
├── GSAP
│   └── ScrollTrigger
└── GLSL shaders
```

Alternative:

```text
Vite
├── Vanilla JavaScript
├── Three.js
└── GSAP
```

For a single experimental site, vanilla Three.js is perfectly valid.

For a larger reusable system, React Three Fiber gives you a cleaner component structure.

---

# 9. Responsibility of Each Technology

## HTML / React

Responsible for:

- navigation
- typography
- specification labels
- buttons
- accessibility text
- loading UI
- page structure

Do not render everything inside WebGL.

Normal HTML text will be easier to position, read, index and make responsive.

---

## Three.js

Responsible for the 3D world:

- bottle model
- camera
- lights
- materials
- environment
- particles
- object transforms
- post-processing
- rendering

Three.js's `WebGLRenderer` renders the scene through WebGL 2.

---

## GLTF / GLB

The bottle should be exported from Blender as GLB.

Suggested Blender object hierarchy:

```text
PureVessel
├── Bottle
│   ├── OuterShell
│   ├── ThermalBarrier
│   ├── VacuumVolume
│   └── InnerVessel
├── Cap
│   ├── CapOuter
│   ├── CapCore
│   └── Gasket
├── Label
└── Decorative
```

Keep important components as separate named meshes.

This makes it possible to animate them independently in Three.js.

---

## GSAP

GSAP controls:

- HTML text
- opacity
- UI
- camera interpolation
- object transforms
- section timing
- transitions

Use `ScrollTrigger` as the bridge between page scroll and the cinematic timeline.

The ideal architecture is one master timeline rather than dozens of unrelated scroll triggers.

---

# 10. Scene Architecture

Suggested project structure:

```text
src/
├── main.jsx
├── App.jsx
│
├── components/
│   ├── Experience.jsx
│   ├── Bottle.jsx
│   ├── Lighting.jsx
│   ├── Environment.jsx
│   ├── UI.jsx
│   ├── Specs.jsx
│   └── LoadingScreen.jsx
│
├── animation/
│   ├── timeline.js
│   ├── camera.js
│   ├── bottle.js
│   └── transitions.js
│
├── three/
│   ├── scene.js
│   ├── materials.js
│   ├── postprocessing.js
│   └── particles.js
│
├── styles/
│   ├── global.css
│   └── typography.css
│
└── assets/
    ├── models/
    │   └── pure-vessel.glb
    ├── textures/
    └── audio/
```

---

# 11. Camera System

Do not think of the camera as simply:

```js
camera.position = ...
```

Treat the camera like a cinematographer.

Create named camera states.

```js
const cameraStates = {
  hero: {
    position: [0, 0.4, 8],
    target: [0, 0, 0]
  },

  reveal: {
    position: [0.4, 0.2, 5.5],
    target: [0, 0, 0]
  },

  cap: {
    position: [2.0, 1.8, 4.0],
    target: [0, 1.8, 0]
  },

  body: {
    position: [-1.8, -0.2, 4.2],
    target: [0, 0, 0]
  },

  exploded: {
    position: [3.5, 0.4, 5.5],
    target: [0, 0, 0]
  },

  final: {
    position: [0, 0.2, 6.5],
    target: [0, 0, 0]
  }
};
```

The exact numbers should be tuned against the actual model.

---

# 12. Camera Choreography

## Shot 01 — Hero

Camera:

```text
far
slightly above center
three-quarter angle
```

The bottle is barely visible.

Movement:

- almost static
- tiny breathing movement
- subtle lens/parallax effect

Purpose:

Create anticipation.

---

## Shot 02 — Reveal

Camera slowly approaches.

Target remains near the bottle center.

The bottle does not need to rotate much.

Instead:

- camera moves
- light moves
- reflections reveal geometry

This creates a premium product-photography effect.

---

## Shot 03 — Cap Inspection

Camera travels vertically.

```text
BODY
 ↓
NECK
 ↓
CAP
```

At the end of the move, the cap fills approximately 50–70% of the viewport.

The bottle can rotate 10–20 degrees to expose the cap construction.

Do not rotate the entire product continuously just because you can.

Movement needs a reason.

---

## Shot 04 — Body Inspection

Camera reverses direction.

It travels downward along the bottle.

Use a slight orbital movement.

```text
camera path:

       ●
      /
     /
    ●
    |
    |
    ●
```

The bottle remains approximately centered while the camera changes angle.

This should feel like a macro product inspection.

---

## Shot 05 — Exploded View

Camera stops.

The bottle separates.

The camera performs a slow lateral orbit around the exploded structure.

This allows the user to understand the layers spatially.

---

## Shot 06 — Reconstruction

Reverse the exploded movement.

The layers converge.

Camera slowly backs away.

The complete product returns.

---

## Shot 07 — Final Rotation

This is the most dramatic camera move.

Bottle:

```text
vertical
   ↓
rotate Y/Z
   ↓
horizontal
```

Camera:

```text
front 3/4
   ↓
side
   ↓
slightly low angle
```

The camera should not simply rotate around the bottle.

The **bottle and camera should move together as a composed shot**.

---

# 13. Scroll → Timeline Architecture

Use a single master GSAP timeline.

Conceptually:

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".experience",
    start: "top top",
    end: "+=8000",
    scrub: 1,
    pin: true
  }
});
```

Then:

```js
tl
  .addLabel("hero")
  .to(heroText, {...})

  .addLabel("reveal")
  .to(camera, {...})

  .addLabel("cap")
  .to(cap, {...})

  .addLabel("body")
  .to(body, {...})

  .addLabel("explode")
  .to(layers, {...})

  .addLabel("reconstruct")
  .to(layers, {...})

  .addLabel("final")
  .to(bottle.rotation, {...})
  .to(background, {...});
```

The exact implementation may differ depending on whether React Three Fiber's render loop or GSAP owns particular values.

The important idea is:

> **One scroll position = one cinematic playhead.**

GSAP ScrollTrigger supports scrubbed timelines, pinning and snapping, which makes this model appropriate for the experience.

---

# 14. Bottle Animation Data

Avoid hardcoding animation into components.

Create a small state system:

```js
const bottleState = {
  hero: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1
  },

  cap: {
    position: [0, 0, 0],
    rotation: [0, 0.2, 0]
  },

  exploded: {
    outerShell: [0, 0, 0],
    thermalBarrier: [0, 0.15, 0],
    innerVessel: [0, 0.3, 0],
    cap: [0, 0.7, 0]
  },

  final: {
    rotation: [0, 0, Math.PI / 2]
  }
};
```

This makes iteration much easier.

---

# 15. Lighting

Lighting is one of the most important parts of the concept.

Do not illuminate the bottle evenly.

## Hero lighting

Use:

- very low ambient illumination
- narrow rim light
- soft top light
- subtle environment reflection

Goal:

```text
black
████████
    ╱
   ╱ thin highlight
  ╱
████████
```

The silhouette should be discovered through reflections.

---

## Cap

Increase contrast.

Use a harder key light.

The cap should look almost machined.

---

## Body

Use a broad softbox-style light.

This exposes:

- surface texture
- curvature
- material differences

---

## Final red scene

Replace the neutral environment with a large red environment/light setup.

Do not simply put a CSS red background behind a black-lit bottle.

The red should affect the scene's reflections.

---

# 16. Materials

Use physically based materials.

The bottle can use:

```text
MeshPhysicalMaterial
```

Potential material settings:

### Outer shell

- metalness: high
- roughness: medium
- subtle clearcoat if appropriate

### Inner steel

- metalness: high
- lower roughness

### Cap

- slightly higher roughness
- subtle microtexture

### Gasket

- dark rubber-like material
- high roughness
- low specular response

Do not exaggerate metallic reflections.

Real luxury product photography is controlled, not a disco ball.

---

# 17. Edge Shine

The signature hero effect should be a moving reflection.

Possible implementation:

### Option A — Real light

Move an area/spot light around the bottle.

Advantages:

- physically understandable
- easy to art-direct
- good for the hero

### Option B — Shader

Use a custom Fresnel/rim-light shader.

Conceptually:

```text
view direction
      +
surface normal
      ↓
Fresnel
      ↓
edge intensity
```

Use this subtly.

### Option C — Post-processing

Add bloom to the brightest highlights.

Keep bloom restrained.

The bottle should not look radioactive.

---

# 18. Exploded Bottle

The exploded view should be prepared in Blender with clean origin points.

Example:

```text
Normal:

┌─────┐
│ cap │
├─────┤
│     │
│body │
│     │
└─────┘


Exploded:

   CAP
    ↑

 OUTER SHELL
    ↑

 THERMAL BARRIER
    ↑

 INNER VESSEL
```

In Three.js, animate each mesh independently.

Do not export the exploded state as a separate animation unless there is a specific reason.

Controlling the components from code gives you more flexibility.

---

# 19. Technical Callouts

Create the labels as HTML, not 3D text, unless the label physically belongs inside the 3D world.

Example:

```text
┌──────────────────────────────┐
│  DOUBLE-SEAL CLOSURE         │
│  Precision threaded system   │
└──────────────┬───────────────┘
               │
               └────────────→ CAP
```

Use a thin SVG/CSS line from the label toward the mesh.

The endpoint can be calculated from the 3D object's world position projected into screen coordinates.

Conceptually:

```js
object.getWorldPosition(worldPosition);

worldPosition.project(camera);

screenX = ...
screenY = ...
```

Then position the HTML label accordingly.

This lets your technical annotations stay crisp at any resolution.

---

# 20. Typography Animation

Hero:

```text
PURE VESSEL
```

Split into characters.

Animation:

```text
opacity: 0 → 1
y: 20 → 0
filter: blur(8px) → blur(0)
stagger: 0.025–0.05
```

Keep the movement restrained.

For technical specifications:

```text
CAP
SYSTEM
01
```

Use small staggered reveals.

The text should feel like a technical interface, not a nightclub flyer.

---

# 21. Transition to Red

This deserves its own animation sequence.

Timeline:

```text
Bottle complete
      ↓
camera pulls back
      ↓
bottle begins rotating
      ↓
background darkens
      ↓
red enters from edges
      ↓
bottle becomes horizontal
      ↓
lighting switches
      ↓
red fills environment
      ↓
CTA appears
```

Do not change everything simultaneously.

Stage the transition.

The user should feel that something has happened.

---

# 22. WebGL Render Loop

The core loop is conceptually:

```js
function animate() {
  requestAnimationFrame(animate);

  updateCamera();
  updateBottle();
  updateParticles();
  updateMaterials();

  renderer.render(scene, camera);
}
```

If React Three Fiber is used, the render loop is handled by the framework and scene updates can be driven through its render/update hooks.

Three.js remains responsible for the actual 3D scene and WebGL rendering.

---

# 23. Performance Strategy

This website will be expensive if you let it become expensive.

Target:

- desktop: stable high frame rate
- mobile: stable usable frame rate
- fast initial visual response
- no huge uncompressed textures
- no unnecessary geometry

## Model

Use GLB.

Use geometry compression where useful.

Three.js's GLTFLoader supports modern glTF compression extensions including Draco and Meshopt.

## Textures

Prefer:

- WebP/AVIF where appropriate
- KTX2/Basis for GPU-friendly texture compression when the pipeline justifies it

Avoid 4K textures everywhere.

## Geometry

The bottle does not need millions of polygons.

Spend polygons on:

- silhouette
- cap details
- important bevels

Do not waste them on invisible surfaces.

---

# 24. Loading Experience

The opening black screen is useful for hiding loading.

Use:

```text
PURE VESSEL
INITIALIZING...
```

Then:

```text
100%
```

But don't force a fake loading animation if the model is already ready.

Once the assets are loaded:

```text
loading UI fades
↓
hero begins
```

Use a loading manager or asset-loading state.

---

# 25. Responsive Strategy

Do not simply scale the desktop scene down.

Desktop:

```text
large bottle
wide camera movement
large exploded spacing
large technical labels
```

Mobile:

```text
smaller camera movement
reduced exploded spacing
fewer particles
simplified post-processing
shorter scroll distances
labels moved into safer screen positions
```

The story remains the same.

The composition changes.

---

# 26. Audio

Optional but highly recommended.

Use subtle:

- low-frequency ambience
- mechanical clicks
- cap locking sound
- impact sound
- metallic movement
- transition hit
- final bass/impact

Do not autoplay audio aggressively.

Let the user activate sound if necessary.

The audio should reinforce the mechanical/luxury language.

---

# 27. Development Order

Do not build the final visual version immediately.

## Phase 1 — Greybox

Build:

- basic bottle
- camera
- scroll
- section timeline
- placeholder text

No shaders.

No fancy textures.

No particles.

Goal:

> Does the story work?

---

## Phase 2 — Camera

Implement:

1. Hero
2. Reveal
3. Cap inspection
4. Body inspection
5. Exploded view
6. Reconstruction
7. Final rotation

Goal:

> Does the camera make the product interesting?

---

## Phase 3 — Materials

Add:

- steel
- glass/finish
- rubber
- powder coat
- labels
- surface detail

Goal:

> Does it look physically believable?

---

## Phase 4 — Lighting

Build the actual lighting choreography.

Goal:

> Can the bottle be revealed almost entirely through light?

---

## Phase 5 — Typography

Add:

- hero
- feature copy
- technical labels
- CTA

Goal:

> Does the information appear exactly when the viewer needs it?

---

## Phase 6 — Effects

Only now add:

- bloom
- particles
- shaders
- grain
- subtle distortion

Effects are seasoning. If the food needs seasoning to become edible, the food is the problem.

---

## Phase 7 — Optimization

Test:

- desktop
- mid-range Android
- iPhone
- slow network
- reduced-motion preference

---

# 28. Acceptance Criteria

The site is successful when:

### Story

- The user understands the product without reading a conventional product page.
- Each scroll movement reveals new information.
- The sequence feels like one continuous film.

### 3D

- The bottle looks materially convincing.
- Camera movement has intentional composition.
- Technical features are demonstrated visually.

### Interaction

- Scroll controls the experience smoothly.
- Scrolling backwards works correctly.
- No animation gets permanently stuck.

### Performance

- Initial load is reasonable.
- Mobile does not become unusable.
- Effects degrade gracefully.

### Brand

Pure Vessel should feel like:

> **A machine disguised as a bottle.**

---

# 29. Final Experience Script

## 00 — DARKNESS

Screen: black.

A faint metallic edge appears.

Text:

> PURE VESSEL

Small line:

> ENGINEERED FOR THE EVERYDAY.

---

## 01 — REVEAL

The light moves.

The silhouette becomes visible.

Text:

> NOT JUST A BOTTLE.

Pause.

> A VESSEL.

The complete bottle emerges.

---

## 02 — CAP

Camera travels upward.

Cap fills the screen.

Text:

> THE CAP ISN'T AN AFTERTHOUGHT.

Then technical callouts:

> IMPACT-RESISTANT SHELL  
> PRECISION THREAD  
> DOUBLE-SEAL GASKET  
> LOCKED CLOSURE

Main statement:

> BUILT TO TAKE THE DAILY ABUSE.

---

## 03 — BODY

Camera travels down.

The outer surface becomes the focus.

Macro texture.

Text:

> THE OUTSIDE IS ONLY THE BEGINNING.

Bottle separates.

---

## 04 — INTERNAL SYSTEM

Layers spread apart.

Text:

> THE BOTTLE IS A SYSTEM.

Then:

> OUTER SHELL  
> THERMAL BARRIER  
> VACUUM CORE  
> INNER VESSEL

Main statement:

> FOUR LAYERS.  
> ONE JOB.

Supporting:

> KEEP THE INSIDE SEPARATE FROM THE OUTSIDE.

---

## 05 — RECONSTRUCTION

The layers return.

The bottle closes.

Camera pulls back.

Text:

> PURE FORM.  
> PURE FUNCTION.

---

## 06 — THE SHIFT

Bottle begins rotating.

The environment darkens.

Red enters.

The bottle becomes horizontal.

Text:

> NOTHING UNNECESSARY.

Beat.

> NOTHING COMPROMISED.

---

## 07 — FINAL

Pure Vessel floats horizontally against the red environment.

Small product information:

> PURE VESSEL  
> 750 ML  
> THERMAL INSULATED  
> ENGINEERED FOR EVERYDAY USE

Main:

> JOIN THE PURE VESSEL CULT.

Supporting:

> CARRY LESS.  
> KEEP MORE.  
> MAKE IT YOURS.

Button:

> ORDER PURE VESSEL

---

# 30. Core Design Principle

Do not ask:

> "What cool 3D animation can I put here?"

Ask:

> **"What does the user need to understand here, and what can the 3D scene communicate better than text?"**

If the answer is "nothing", don't animate it.

The strongest version of Pure Vessel will use 3D only where **geometry, light, material, camera movement and transformation communicate something**.

That is what separates an interactive product film from a website with a spinning GLB.
