# NIVA · Milestone 1

Run `npm start` and open http://127.0.0.1:5173. Run `npm test` for model checks. No dependencies or backend are required.

## Inspect these hash routes

- `/#/`: landing; Explore demo bypasses account creation.
- `/#/signup`: local mock signup, native form validation; password never saved or transmitted.
- `/#/setup`: three focused steps.
- `/#/home`: financial overview, commitments, protected fund and Goa snapshot.
- `/#/purchase`: editable amount, item and timing.
- `/#/scenario`: neutral impact, protected items, before/after comparison, buffer gap and optional adjustment.
- `/#/preview`: proposed versus current plan; no mutation until Apply.
- Apply and Undo return to `/#/home` with distinct status confirmations. They are states, not extra routes.

## Components and design

`app.mjs` contains reusable header/footer, money rows, segmented money breakdown, protected item list, scenario comparison, action helpers and screen renderers. `model.mjs` owns the immutable October fixture, commitments, currency formatting, scenario arithmetic and state transitions. CSS uses semantic canvas, surface, midnight, graphite, secondary, border, blue, teal, amber and error tokens, Manrope, tabular numerals, restrained borders and 250ms motion.

The user-specified #5576A5 remains the focus color; interaction blue is darkened to #42618D, secondary text to #626B7A and amber to #93601E for legibility. Mobile uses a single column, stacked decisions, 43px financial hero values and compact before/after columns. Desktop uses primary/supporting columns without a dashboard grid.

## State

In-memory local state resets on reload. Fixture: ₹85,000 income, ₹42,800 available, ₹26,700 commitments, ₹16,100 flexible before goals, ₹7,000 buffer preference, ₹8,000 Goa plan, ₹18,000 already saved, ₹96,000 protected emergency fund. INITIAL, SCENARIO_DRAFT, SCENARIO_ANALYZED, ADJUSTMENT_PREVIEW, ADJUSTMENT_APPLIED and ADJUSTMENT_UNDONE are the intended journey states. Preview never changes contribution. Apply stores the previous contribution/date; Undo restores them. Purchase scenarios never change account balance.

## Financial inconsistency in supplied brief

₹42,800 − ₹26,700 − ₹12,000 = ₹4,100 before optional goal contributions. Because Goa has not been deducted, reducing that contribution cannot restore the cash remainder to ₹7,000. The requested ₹8,000 → ₹5,100 plan adjustment and Nov 08 → Nov 20 illustrative dates are retained, but the interface explicitly explains that the ₹2,900 cash buffer gap remains. Purchase plus proposed ₹5,100 contribution would leave −₹1,000. This is shown as a neutral consequence rather than presented as a buffer-restoring recommendation.

Other compromises: setup commitment fields are editable exploration with live totals, but setup returns to the deterministic fixture; income/balance are read-only. Mock Log in opens the demo. Non-signature dates are qualitative rather than fabricated exact forecasts. No banking, payment, transaction history, authentication service or Milestone 2 features.

## Accessibility and verification

Semantic headings and landmarks, skip link, labels, native field validation, associated amount error, focus outlines, route-heading focus, 44–52px actions, textual chart equivalents, non-color state labels, live status and reduced-motion support. This is not an independent WCAG certification.

Model checks pass for arithmetic, preview isolation, apply/undo, immutable balance and boundary purchases. Browser verified demo → purchase → scenario → preview → apply → undo and repeated scenario → keep plan. Mobile scenario visually inspected at 375px. Home overflow checked at 375, 390, 430, 768, 1280 and 1440px. Browser verification of signup/setup and further responsive flow checks are recorded in the completion report where performed.
