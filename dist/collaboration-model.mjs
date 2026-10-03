import {fixture,estimatedDate} from './model.mjs';
export const collaborationKey='else-goa-collaboration-v1';
export const defaultCollaboration=()=>({version:1,status:'ACCEPTED',email:'rohan@example.com',permission:'contribute',note:'Flights first, hotel next.',rohanExtra:0,events:[]});
export function collaborationTotal(c){return fixture.goalSaved+c.rohanExtra;}
export function collaborationTransition(c,event,payload={}){
 if(event==='INVITE_SENT'){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)||!['view','contribute'].includes(payload.permission))throw Error('Enter a valid email and permission.');return {...c,status:event,email:payload.email.toLowerCase(),permission:payload.permission};}
 if(event==='ACCEPTED'){if(c.status!=='INVITE_SENT')throw Error('No pending invite.');return {...c,status:event};}
 if(event==='REMOVED')return {...c,status:event};
 if(event==='PERMISSION'){if(!['view','contribute'].includes(payload.permission))throw Error('Invalid permission');return {...c,permission:payload.permission};}
 if(event==='NOTE'){if(payload.actor==='rohan'&&(c.status!=='ACCEPTED'||c.permission!=='contribute'))throw Error('This permission allows viewing only.');return {...c,note:String(payload.note).slice(0,240)};}
 if(event==='CONTRIBUTION'){if(c.status!=='ACCEPTED'||c.permission!=='contribute')throw Error('Contribution permission is required.');if(!Number.isInteger(payload.amount)||payload.amount<=0||payload.amount>12000-c.rohanExtra)throw Error('Enter a whole-rupee amount within the remaining goal.');return {...c,rohanExtra:c.rohanExtra+payload.amount,events:[{id:'contribution-'+(c.events.length+1),text:`Rohan recorded a demo contribution`,amount:payload.amount,date:'Oct 03'},...c.events]};}
 return c;
}
export function loadCollaboration(storage){try{const c=JSON.parse(storage.getItem(collaborationKey));if(c?.version===1&&['ACCEPTED','INVITE_SENT','REMOVED'].includes(c.status)&&['view','contribute'].includes(c.permission)&&Number.isInteger(c.rohanExtra)&&c.rohanExtra>=0&&c.rohanExtra<=12000&&typeof c.note==='string'&&Array.isArray(c.events))return c;}catch{}return defaultCollaboration();}
// Explicit allowlist: collaborator rendering receives no private financial object.
export function publicGoal(plan,c){return {name:'Goa',target:30000,saved:collaborationTotal(c),contributions:[{name:'Aanya',saved:12000},{name:'Rohan',saved:6000+c.rohanExtra}],plannedContribution:plan.contribution,estimatedCompletion:estimatedDate(plan.contribution),note:c.note,status:c.status,permission:c.permission,events:c.events.map(e=>({text:e.text,amount:e.amount,date:e.date})),planChange:plan.previous?{before:plan.previous.contribution,after:plan.contribution}:null};}
