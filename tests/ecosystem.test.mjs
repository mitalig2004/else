import assert from 'node:assert/strict';
import {analyze,fixture,total,transition,estimatedDate} from '../dist/model.mjs';
import {transactions,filterTransactions,recurring,recurringTotal,reviewTotal,categories,insights,initialPlan,goalScenario,loadPlan,saveAcceptedPlan,storageKey} from '../dist/ecosystem-model.mjs';

const memory=new Map();const storage={getItem:key=>memory.get(key)??null,setItem:(key,value)=>memory.set(key,value)};
assert.equal(transactions.length,9);
assert.equal(transactions.some(t=>t.merchant==='New phone'||t.amount===-12000),false);
assert.deepEqual(filterTransactions('Third Wave').map(t=>[t.merchant,t.amount]),[['Third Wave Coffee',-420]]);
assert.deepEqual(filterTransactions('','income').map(t=>[t.merchant,t.amount]),[['Salary',85000]]);
assert.equal(filterTransactions('','spending').length,8);
assert.deepEqual(filterTransactions('','bills').map(t=>t.id),['netflix','cult-fit']);
assert.equal(filterTransactions('no such merchant').length,0);
assert.equal(recurringTotal,3942);assert.equal(reviewTotal,843);
assert.equal(recurring.find(r=>r.id==='netflix').amount*12,7788);
assert.equal(categories.reduce((sum,c)=>sum+c.amount,0),38400);
assert.equal(insights.spent-insights.previous,3300);
assert.equal(((insights.spent-insights.previous)/insights.previous*100).toFixed(1),'9.4');
assert.equal(categories.find(c=>c.id==='food').amount-categories.find(c=>c.id==='food').reference,1850);
assert.equal(categories.find(c=>c.id==='transport').amount-categories.find(c=>c.id==='transport').reference,-620);

const original=loadPlan(storage);assert.deepEqual(original,initialPlan);
const purchase=analyze(12000,original.contribution);
const preview={...transition(original,'ADJUSTMENT_PREVIEW'),proposed:purchase.proposed};
assert.equal(preview.contribution,8000);assert.equal(loadPlan(storage).contribution,8000);
const applied=saveAcceptedPlan(transition(preview,'APPLY'),storage);
assert.equal(applied.contribution,5100);assert.equal(applied.date,'Nov 20');
assert.equal(loadPlan(storage).contribution,5100);assert.equal(loadPlan(storage).date,'Nov 20');
// Navigation screens derive from this same accepted object, not local fixtures.
assert.equal(goalScenario(10000,applied.contribution).flexibilityChange,-4900);
const undone=saveAcceptedPlan(transition(loadPlan(storage),'UNDO'),storage);
assert.equal(undone.contribution,8000);assert.equal(undone.date,'Nov 08');assert.equal(loadPlan(storage).previous,null);
const keep={...undone};analyze(12000,keep.contribution);assert.equal(keep.contribution,8000);

const goal=goalScenario(10000,8000);assert.equal(goal.remainder,6100);assert.equal(goal.bufferGap,900);assert.equal(goal.flexibilityChange,-2000);assert.equal(goal.remainingGoal,2000);assert.equal(goal.date,'Oct 30');
assert.equal(goalScenario(5100,8000).remainder,11000);
for(const bad of [0,-1,NaN,1.2,10000001])assert.throws(()=>goalScenario(bad,8000),RangeError);
const more=saveAcceptedPlan(transition({...undone,proposed:10000},'APPLY'),storage);
assert.equal(more.date,'Oct 30');assert.equal(loadPlan(storage).contribution,10000);
assert.equal(saveAcceptedPlan(transition(more,'UNDO'),storage).contribution,8000);
const beforeFailure=loadPlan(storage);
assert.throws(()=>saveAcceptedPlan(transition({...beforeFailure,proposed:5100},'APPLY'),{setItem(){throw Error('quota');}}));
assert.equal(loadPlan(storage).contribution,8000);
storage.setItem(storageKey,'invalid JSON');assert.deepEqual(loadPlan(storage),initialPlan);
storage.setItem(storageKey,JSON.stringify({version:2,plan:{contribution:5100,date:'Wrong date'}}));assert.deepEqual(loadPlan(storage),initialPlan);
assert.equal(estimatedDate(8000),'Nov 08');assert.equal(fixture.balance,42800);assert.equal(fixture.emergency,96000);assert.equal(total,26700);
console.log('PASS: transaction search/filters, recurring totals, insight arithmetic, shared state, refresh, apply/undo, goal consequences and storage failure isolation.');
