import { questions } from './questions.js';
export const TRAVEL_MS = 2500;
export const SUSPENSE_MS = 2000;
export class Game {
  constructor(random = Math.random) { this.random = random; this.reset(); }
  reset() { this.phase='intro'; this.index=-1; this.hits=0; this.safe=false; this.selected=null; this.hidden=[]; this.votes=null; this.used={half:false,poll:false}; }
  get question() { return questions[this.index]; }
  start() { if(this.phase!=='intro')return false; this.index=0; this.phase='travel'; return true; }
  arrive() { if(this.phase!=='travel')return false; this.phase='question'; return true; }
  select(index) { if(this.phase!=='question'||!Number.isInteger(index)||index<0||index>3||this.hidden.includes(index))return false; this.selected=index; this.phase='suspense'; return true; }
  resolve() { if(this.phase!=='suspense')return false; if(this.selected===this.question.correct) { this.hits++; if(this.index===4)this.safe=true; this.phase=this.index===9?'victory':'correct'; } else this.phase='wrong'; return true; }
  next() { if(this.phase!=='correct')return false; this.index++; this.selected=null; this.hidden=[]; this.votes=null; this.phase='travel'; return true; }
  finish() { if(this.phase!=='wrong')return false; this.phase='defeat'; return true; }
  lifeline(kind) {
    if(this.phase!=='question'||!Object.hasOwn(this.used,kind)||this.used[kind])return false;
    this.used[kind]=true;
    if(kind==='half') {
      const wrong=[0,1,2,3].filter(i=>i!==this.question.correct);
      for(let i=wrong.length-1;i>0;i--) { const j=Math.floor(this.random()*(i+1)); [wrong[i],wrong[j]]=[wrong[j],wrong[i]]; }
      this.hidden=wrong.slice(0,2);
    } else {
      const remaining=[0,1,2,3].filter(i=>!this.hidden.includes(i)&&i!==this.question.correct);
      this.votes=[0,0,0,0]; const correct=62+Math.floor(this.random()*15); this.votes[this.question.correct]=correct;
      let rest=100-correct; remaining.forEach((i,n)=>{const value=n===remaining.length-1?rest:Math.floor(rest/(remaining.length-n));this.votes[i]=value;rest-=value;});
    }
    return true;
  }
}
