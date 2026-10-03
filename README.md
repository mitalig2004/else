# ELSE — a product exploration by Mitali Giri

ELSE is a responsive financial decision prototype with purchase scenarios, goals, recurring references, shared-goal permissions, a 12-month demo timeline, and local profile controls. It uses illustrative data; no bank connection, payment processing or production authentication is included.

Run `npm start` to preview at http://127.0.0.1:5173 and `npm test` to run all four model suites. Vercel serves `dist` using the checked-in `vercel.json`; its build runs the tests. Hash routes work without server rewrites.

Current routes: `/#/`, `/#/home`, `/#/transactions`, `/#/goals`, `/#/insights`, `/#/history`, `/#/profile`, `/#/login`, and `/#/signup`. See [MILESTONE-3.md](MILESTONE-3.md) and [MONTHS-ACCOUNT.md](MONTHS-ACCOUNT.md) for implementation details. The calendar now uses a compact anchored picker with dates and month selection.

## Original milestone notes

Milestone 2 is now implemented locally. See [MILESTONE-2.md](MILESTONE-2.md) for the current routes, shared plan persistence, model notes and verification report. The Milestone 1 details below document the original release; the accepted plan now persists across refresh. Milestone 2 has not been deployed.

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
