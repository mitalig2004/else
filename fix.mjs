import {readFileSync,writeFileSync} from 'node:fs';
const p='dist/app.mjs';let s=readFileSync(p,'utf8');s=s.replace("function purchase(){return", "function purchase(){plan=transition(plan,'SCENARIO_DRAFT');return");writeFileSync(p,s);
