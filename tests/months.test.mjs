import assert from 'node:assert/strict';
import {history,monthSelector,monthView,yearView,calendarGrid} from '../dist/months.mjs';
assert.equal(history.length,12);
assert.match(monthSelector(9),/September 2026/);
assert.match(monthSelector(9),/aria-haspopup="dialog"/);
assert.equal((calendarGrid(2).match(/data-calendar="day"/g)||[]).length,28);
assert.equal((calendarGrid(10).match(/data-calendar="day"/g)||[]).length,31);
assert.match(calendarGrid(10,3),/October 3, 2026" aria-pressed="true"/);
for(let month=1;month<=9;month++){const h=history[month-1];assert.ok(h.budget>0&&h.spent>0);assert.match(monthView(month,'home'),/read-only/);assert.match(monthView(month,'transactions'),/Individual transaction records were not supplied/);}
for(let month of [11,12]){assert.equal(history[month-1].spent,null);assert.match(monthView(month,'home'),/No actual spending/);}
assert.equal((yearView().match(/data-month=/g)||[]).length,12);
console.log('PASS: 12 months, historical budgets, future empty states and year navigation.');
