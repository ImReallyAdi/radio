# agents.md

Project: **Radio**
Browser Title: **Radio by Adi**
UI System: **Magic UI (Required)** 
Get Inspired by: **21st.dev**
FOR SONG INFO: **https://api.popcat.xyz/v2/itunes?q=** (OR A BETTER)
Design Direction: Apple Music Now Playing × Material 3 Expressive

---

# 🎧 Vision

Radio is a cinematic web radio app that:

• Streams random music from YouTube
• Displays immersive blurred backgrounds
• Shows fully synced Apple Music–style lyrics
• Uses elastic Material 3 expressive motion
• Feels premium and fluid

No visible logo.
Dark mode default.
Mobile-first.

---

# 🧠 Agent Architecture + Embedded Skills

Each agent has defined responsibilities AND required skills.

---

# 1️⃣ Playback Agent

## Responsibilities

• Embed YouTube player
• Autoplay
• Detect video end
• Handle skip
• Expose playback time
• Expose duration
• Handle buffering state
• Maintain playback state
• Prevent repeating last 5 tracks
• Smooth track transitions

## Skills

• YouTube Iframe API integration
• Event handling (onReady, onStateChange)
• State synchronization
• Playback time polling optimization
• Debounced updates
• Buffer detection logic
• Track preload logic
• Session memory handling
• Smooth crossfade timing control

Must use:

```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1&controls=0&modestbranding=1&rel=0&enablejsapi=1
```

No iframe flicker allowed.

---

# 2️⃣ Station Agent

## Responsibilities

• Manage curated video list
• Shuffle algorithm
• Avoid repetition
• Maintain track history
• Recently played drawer
• Session-based memory

## Skills

• Randomized weighted selection
• Queue management
• Circular buffer logic
• Lightweight local storage handling
• Track deduplication
• Session persistence
• Efficient list mutation

Station must feel continuous and intelligent.

---

# 3️⃣ Lyrics Agent (Apple Music Style Required)

This is critical.

Lyrics must visually behave like Apple Music.

## Responsibilities

• Fetch synced lyrics from LRCLIB
• Parse timestamped LRC format
• Sync with playback time
• Animate active line
• Auto-scroll smoothly
• Handle missing lyrics gracefully

## Skills

• API integration (LRCLIB)
• Timestamp parsing
• Time-based synchronization
• Scroll position interpolation
• Spring animation timing
• Text scaling transitions
• Opacity layering
• Smooth vertical snapping

---

## 🎼 Apple Music–Style Lyric Behavior (Mandatory)

Lyrics must:

• Be center-aligned
• Large, readable typography
• Generous line spacing
• Active line:
+ should show the album cover
* Larger font size
* Brighter color
* Slight scale-up animation
* Smooth spring transition
  • Inactive lines:
* Lower opacity
* Slight blur (very subtle)
  • Auto-scroll so active line remains vertically centered
  • Smooth animated transitions between lines
  • No jumpy scroll
  • No harsh snapping

When no lyrics:

• Show subtle faded message
• Maintain layout
- Close the tab.
The lyric section should feel immersive and cinematic, not like plain scrolling text.

---

# 4️⃣ Background Agent

## Responsibilities

• Load video thumbnail
• Extract dominant colors
• Apply fullscreen blur
• Add animated gradient overlay
• Add vignette
• Add subtle grain
• Smooth crossfade on track change

## Skills

• Image processing
• Color extraction logic
• CSS backdrop filtering
• Gradient animation
• Layer compositing
• Crossfade timing control
• GPU-accelerated transitions

The background must feel alive but subtle.

---

# 5️⃣ UI Agent (Magic UI Required)

All UI components must use Magic UI primitives.

No raw unstyled components.

## Responsibilities

• Layout structure
• Glass card system
• Motion containers
• Responsive behavior
• Accessibility compliance

## Skills

• Magic UI component composition
• Glassmorphism layering
• Backdrop blur layering
• Responsive spacing
• Safe-area handling (iOS)
• Focus states
• Accessibility contrast compliance

UI Rules:

• Frosted glass cards
• Rounded corners
• Floating layout
• Soft depth shadows
• Minimal borders
• Elegant typography
• Dark theme default

Must feel like Apple Music’s Now Playing screen.

---

# 6️⃣ Motion Agent

## Responsibilities

• Spring animations
• Button bounce
• Album art subtle float
• Progress bar smooth movement
• Lyric line scaling animation
• Background crossfade

## Skills

• Spring physics configuration
• Easing curve tuning
• GPU-friendly animation
• Micro-interaction design
• Transition orchestration
• Performance optimization

Motion must feel:

Elastic
Fluid
Premium

Never robotic.

---

# 7️⃣ Theme Agent

## Responsibilities

• Dark mode default
• Dynamic accent color extraction
• Adaptive UI tinting
• Accessibility color contrast

## Skills

• Color harmonization
• Contrast ratio validation
• Dynamic theme injection
• Accent propagation logic
• UI variable management

No harsh whites.
No flat dull backgrounds.

---

# 🎛 Required Features Checklist

✔ Random YouTube playback
✔ Auto-skip
✔ Shuffle
✔ Avoid repeat
✔ Now Playing display
✔ Progress bar
✔ Current time + duration
✔ Volume control
✔ Play/Pause
✔ Skip
✔ Open in YouTube
✔ Share link
✔ Recently played
✔ Apple Music–style synced lyrics
✔ Dynamic blurred background
✔ Magic UI components
✔ Spring animations
✔ Mobile optimized
✔ iOS Safari optimized
✔ No layout shift
✔ No iframe flicker

---

# 🎧 Experience Philosophy

Radio is not a player.
It’s an atmosphere engine.

The lyrics breathe.
The background glows.
The controls feel alive.

Browser tab only shows:

**Radio by Adi**

No branding inside.

