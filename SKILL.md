---
name: ui-ux-pro-max
description: Applied design intelligence for this business website (UI UX Pro Max methodology)
source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
---

# Design System — Yorktown Hotel - Daban

Applied via the UI UX Pro Max reasoning engine. Product type: **Hotel** → rule set: Restaurant / Hotel / E-commerce Mart / Booking & Appointment.

## Pattern
Hero-Centric + Social Proof. Conversion-focused: single CTA above the fold ("Book on WhatsApp"),
rating badge in hero, trust chips, repeated CTA as sticky mobile bar.

## Style
Soft UI Evolution — soft layered shadows, gentle hover lifts (--ease: cubic-bezier(.22,1,.36,1)),
organic 14px radii, calming premium feel. No neon, no AI purple gradients, no glassmorphism.

## Colors (Deep Pine + Gold (premium, trustworthy))
| Token | Value | Use |
|---|---|---|
| --accent | #173f31 | primary CTA, links, price, badges |
| --accent-strong | #0f2e23 | CTA hover |
| --accent-soft | #e6efe9 | eyebrow chips, success panel |
Contrast: 4.5:1+ on all backgrounds (WCAG AA).

## Typography
Fraunces (display serif, weights 600/700) + Inter (body 400–700), Google Fonts, display=swap.
Fallback: Georgia / system-ui. Headlines use text-wrap:balance.

## Effects
Card hover: translateY(-4px) + deepened shadow, 300ms. Buttons: lift + shadow on hover, 250ms.
prefers-reduced-motion: all animations collapse to .01ms.

## Anti-patterns enforced (do NOT regress)
- No emojis as icons — inline SVG only
- No default-focus outlines removed — visible 3px focus rings on all interactives
- No text smaller than 16px body / 44px tap targets
- No contrast below 4.5:1
- No layout fixed widths — reflows at 375/768/1024/1440

## Pre-delivery checklist
[ ] One clear CTA ("Book on WhatsApp")
[ ] Social proof (rating) visible without scrolling
[ ] Forms validated client-side + honeypot spam trap
[ ] Alt text on every image
[ ] Cookie consent gates analytics
[ ] OG image (images/og-image.jpg) present for social sharing
[ ] Custom 404 returns 404 status
