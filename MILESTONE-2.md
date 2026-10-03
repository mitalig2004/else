# NIVA · Milestone 2

Milestone 1's page composition, typography, purchase inputs, before/after comparison and preview journey are preserved. Additions extend the same static ES-module app; no backend, payments, bank API, production authentication or further milestone features.

## Screens to inspect

| Route | What to review |
| --- | --- |
| `/#/transactions` | Merchant/category search, All/Income/Spending/Bills filters, date groups, empty state |
| `/#/transactions/third-wave` | ₹420, Oct 03 at 10:42 AM, category, masked account and completed status |
| `/#/goals` | Goa and protected Emergency Fund; shared accepted contribution/date |
| `/#/goals/goa` | Current contribution, remaining amount, illustrative contribution timeline, Undo |
| `/#/goals/emergency` | ₹96,000 / ₹1,50,000, 64%, protection explanation |
| `/#/goals/goa/scenario` | ₹10,000 scenario, flexibility trade-off, buffer consequence, explicit apply or keep |
| `/#/recurring` | ₹3,942/month, utility/lifestyle grouping, reference scope explanation |
| `/#/recurring/review` | Netflix + Spotify + iCloud = ₹843/month |
| `/#/recurring/netflix` | ₹649/month, Oct 15 illustrative date, three payments and ₹7,788 annual equivalent |
| `/#/insights` | ₹38,400, comparable ₹35,100, +₹3,300 / +9.4%, horizontal category chart |
| `/#/insights/category/food` | ₹9,450, comparable ₹7,600, +₹1,850, related sample activity |
| `/#/home` | Approved financial hierarchy plus compact three-entry recent activity and related links |

All nine transactions and all six recurring items have detail routes using their fixture IDs. All five chart categories have `/#/insights/category/<id>` routes.

## Added components

Four-destination desktop/mobile navigation with active state; reusable semantic transaction list and date groups; search/filter controls; detail facts; goal panels and horizontal progress; contribution timeline; current/scenario comparison; recurring grouping and payment history; labeled horizontal category chart with category drilldown; shared Undo notice; restrained Home entries. Components live in `dist/ecosystem.mjs`, styles in `dist/ecosystem.css` and all new data/queries in `dist/ecosystem-model.mjs`.

## Shared state and persistence

One accepted plan in `app.mjs` supplies Home, Goals, Goa detail, goal scenarios, purchase scenarios and the related insight. `model.mjs` calculates purchase effects, illustrative completion dates and Apply/Undo transitions. Purchase adjustments now derive from the current accepted Goa contribution instead of always assuming ₹8,000.

Accepted contribution, date and one undo snapshot persist under `niva-october-2026-plan-v2` in browser local storage. Drafts and hypothetical purchases never enter transaction fixtures or change balance. Storage writes happen before the accepted in-memory plan changes; a failure announces that the previous plan is intact. Invalid persisted records safely fall back to the fixture. Local storage is device/browser-specific, with no cross-account sync or server persistence.

## Financial transparency

- Original dataset retained: ₹42,800 available − ₹26,700 committed = ₹16,100 flexible before goals; ₹7,000 is a preference. Protected fund remains separate.
- Original phone buffer inconsistency remains corrected: reducing Goa from ₹8,000 to ₹5,100 reallocates ₹2,900 but cannot restore the ₹4,100 cash remainder to ₹7,000.
- Trying ₹10,000 for Goa leaves ₹6,100 after that contribution, ₹2,000 less flexibility than the default plan, and a ₹900 preferred-buffer gap. Oct 30 is explicitly an illustrative date assuming the additional ₹2,000 needed to complete the ₹30,000 target is also added by then.
- Actual activity is a nine-entry sample, not a complete ledger or a reconstruction of the balance. Hypothetical phone purchases are excluded.
- Recurring payments are a full-cycle reference, not reconciled to the remaining commitment snapshot. They are not subtracted again; reference dates/history are illustrative. There is no cancellation control.
- Insights compares Oct 01–03 with Sep 01–03, 2026. Its fixed category summary contains more activity than the small sample ledger. Categories sum to ₹38,400; +₹3,300 / ₹35,100 = +9.4%. Comparison periods and summary scope are visible.

## Mobile and accessibility

Four persistent bottom destinations at mobile widths with 52px targets and safe-area padding; recurring lives under Transactions. Transaction rows preserve merchant/category/amount rather than shrink a desktop table. Goal and insight comparisons stack sequentially. The chart uses labeled amounts/shares and semantic linked list items rather than color alone.

Semantic lists and definition lists, labeled search and amount controls, pressed filter states, active navigation, associated errors, live result counts/goal recalculation/status, route-heading focus, skip link, visible focus outlines, textual progress, reduced-motion support and inherited contrast adjustments. No claim of independent WCAG certification.

## Verification

- `npm test`: original purchase arithmetic/preview/apply/undo tests and ecosystem tests pass.
- Extended tests cover transaction search, income/spending/bills and empty filters, exclusion of the hypothetical phone, recurring/review/annual totals, category sums and comparisons, goal flexibility/buffer arithmetic, invalid amounts, persistence/restoration, corrupted records and storage failure isolation.
- Browser verified Explore demo → phone draft → impact → preview → Apply; Home/Goals/Goa synchronized at ₹5,100 / Nov 20; reload retained it; Undo restored ₹8,000 / Nov 08.
- Browser verified Third Wave search/detail, Salary-only income filter, eight expense results, empty/reset state, recurring totals/review/Netflix detail, goal scenario invalid zero and explicit ₹10,000 Apply/Undo, Insights labels/chart and category links.
- 84 browser overflow checks: 14 core/new routes × 375, 390, 430, 768, 1280, 1440px; no horizontal overflow. Mobile navigation present at all three mobile widths. Mobile Insights visually inspected at 375px.

Start locally with `npm start`; source lives in `dist` because the existing Site is buildless. Milestone 2 remains local-only at the user's request. The existing published Milestone 1 site has not been updated. A hidden Node server is running on 127.0.0.1:5173 for local review.
