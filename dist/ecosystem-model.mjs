import {fixture, total, estimatedDate} from './model.mjs';

// Reference activity is deliberately separate from hypothetical purchase drafts.
export const transactions = Object.freeze([
  {id:'third-wave',merchant:'Third Wave Coffee',category:'Food & dining',amount:-420,date:'2026-10-03',time:'10:42 AM',kind:'spending'},
  {id:'uber',merchant:'Uber',category:'Transport',amount:-286,date:'2026-10-03',time:null,kind:'spending'},
  {id:'swiggy',merchant:'Swiggy',category:'Food & dining',amount:-640,date:'2026-10-02',time:null,kind:'spending'},
  {id:'amazon',merchant:'Amazon',category:'Shopping',amount:-1249,date:'2026-10-02',time:null,kind:'spending'},
  {id:'salary',merchant:'Salary',category:'Income',amount:85000,date:'2026-10-01',time:null,kind:'income'},
  {id:'netflix',merchant:'Netflix',category:'Subscription',amount:-649,date:'2026-10-01',time:null,kind:'bills'},
  {id:'dmart',merchant:'DMart',category:'Groceries',amount:-2340,date:'2026-09-30',time:null,kind:'spending'},
  {id:'metro',merchant:'Metro',category:'Transport',amount:-120,date:'2026-09-30',time:null,kind:'spending'},
  {id:'cult-fit',merchant:'Cult Fit',category:'Health',amount:-1500,date:'2026-09-29',time:null,kind:'bills'}
].map(Object.freeze));

export const recurring = Object.freeze([
  {id:'cult-fit',name:'Cult Fit',amount:1500,group:'Lifestyle',category:'Health',next:'Oct 29',review:false},
  {id:'netflix',name:'Netflix',amount:649,group:'Lifestyle',category:'Entertainment',next:'Oct 15',review:true},
  {id:'spotify',name:'Spotify',amount:119,group:'Lifestyle',category:'Entertainment',next:'Oct 18',review:true},
  {id:'icloud',name:'iCloud',amount:75,group:'Lifestyle',category:'Cloud storage',next:'Oct 21',review:true},
  {id:'mobile',name:'Mobile plan',amount:599,group:'Utility',category:'Connectivity',next:'Oct 10',review:false},
  {id:'internet',name:'Internet',amount:1000,group:'Utility',category:'Connectivity',next:'Oct 10',review:false}
].map(Object.freeze));
export const recurringTotal = recurring.reduce((sum,r)=>sum+r.amount,0);
export const reviewTotal = recurring.filter(r=>r.review).reduce((sum,r)=>sum+r.amount,0);
export const categories = Object.freeze([
  {id:'food',name:'Food & dining',amount:9450,color:'var(--teal)',reference:7600},
  {id:'housing',name:'Housing & utilities',amount:18400,color:'var(--blue)'},
  {id:'transport',name:'Transport',amount:4250,color:'var(--data-transport)',reference:4870},
  {id:'shopping',name:'Shopping',amount:3600,color:'var(--data-shopping)'},
  {id:'lifestyle',name:'Lifestyle',amount:2700,color:'var(--amber)'}
].map(Object.freeze));
export const insights = Object.freeze({spent:categories.reduce((sum,c)=>sum+c.amount,0),previous:35100,currentPeriod:'Oct 01–03, 2026',previousPeriod:'Sep 01–03, 2026'});
export const initialPlan = Object.freeze({state:'INITIAL',contribution:fixture.contribution,date:'Nov 08',previous:null});
export const storageKey = 'niva-october-2026-plan-v2';

export function filterTransactions(query='',filter='all'){
  const needle=query.trim().toLowerCase();
  return transactions.filter(t=>(filter==='all'||(filter==='spending'?t.amount<0:t.kind===filter))&&`${t.merchant} ${t.category}`.toLowerCase().includes(needle));
}

export function goalScenario(contribution,current,saved=fixture.goalSaved){
  if(!Number.isInteger(contribution)||contribution<=0||contribution>10000000)throw new RangeError('Enter an amount greater than ₹0.');
  const base=fixture.balance-total;
  const remainder=base-contribution;
  return {contribution,current,remainder,flexibilityChange:current-contribution,bufferGap:Math.max(0,fixture.buffer-remainder),aboveBuffer:Math.max(0,remainder-fixture.buffer),remainingGoal:Math.max(0,fixture.goalTarget-saved-contribution),date:estimatedDate(contribution)};
}

function validAccepted(p){return p&&Number.isInteger(p.contribution)&&p.contribution>=0&&p.contribution<=10000000&&p.date===estimatedDate(p.contribution);}
export function loadPlan(storage){
  try {const raw=storage.getItem(storageKey);if(!raw)return {...initialPlan};const saved=JSON.parse(raw);if(saved.version!==2||!validAccepted(saved.plan))return {...initialPlan};const p=saved.plan;return {state:p.previous?'ADJUSTMENT_APPLIED':'INITIAL',contribution:p.contribution,date:p.date,previous:validAccepted(p.previous)?{contribution:p.previous.contribution,date:p.previous.date}:null};}
  catch{return {...initialPlan};}
}
export function saveAcceptedPlan(next,storage){
  // Commit storage first. A failed write leaves the caller's accepted plan intact.
  if(!validAccepted(next))throw new TypeError('Invalid accepted plan');
  storage.setItem(storageKey,JSON.stringify({version:2,plan:{contribution:next.contribution,date:next.date,previous:next.previous}}));
  return next;
}
