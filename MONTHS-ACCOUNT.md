# Month history and account controls

Added locally on October 4, 2026. Nothing deployed.

- Home, Transactions and Insights have a persistent January–December 2026 selector.
- January–September contain explicitly labelled illustrative budgets, spending totals and category breakdowns. These are read-only demo snapshots; individual historical transactions were not supplied.
- October retains the existing accepted plan, transaction sample and financial scenario calculations. Other months do not modify that plan.
- November–December are selectable upcoming months with honest empty states.
- `#/history` compares all 12 months; choosing a month opens its Home view.
- The account name opens a keyboard-accessible dropdown with Profile, Monthly history and Log out. Escape and clicking outside close it.
- `#/profile` allows local display-name edits. Logout clears the mock session and returns to `#/login`, preserving saved demo plans. Public demo access remains available. Authentication remains a local simulation.
- Signup uses the entered display name. A saved profile name can be reused on mock login. Financial fixtures continue to belong to Aanya independently of the display name.

Validation: all four test suites pass. Browser checks verified month selection across pages, January year-link navigation, December empty state, profile saving and logout. Home, Transactions, Insights, History and Profile had no horizontal overflow at 375, 768 and 1440px. The original October view and seeded display name were restored after testing.
