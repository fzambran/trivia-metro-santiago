// Applause recording supplied by the user via YouTube; buzzer synthesized locally.
const APPLAUSE_URL = './assets/applause.mp3';
async function loadRecording(context) {
  const response=await fetch(APPLAUSE_URL);
  if(!response.ok)throw new Error('Applause recording could not be loaded');
  return context.decodeAudioData(await response.arrayBuffer());
}
export class FeedbackAudio {
  constructor(createContext = () => new (globalThis.AudioContext || globalThis.webkitAudioContext)(), loadApplause=loadRecording) {
    this.createContext=createContext; this.loadApplause=loadApplause; this.context=null; this.applause=null; this.active=[]; this.ready=null; this.generation=0;
  }
  unlock() {
    try {
      this.context ??= this.createContext();
      if(this.context.state==='suspended')this.context.resume().catch(()=>{});
      if(!this.ready)this.ready=Promise.resolve(this.loadApplause(this.context)).then(buffer=>{this.applause=buffer;}).catch(()=>{this.ready=null;});
    } catch { /* Audio support is optional; it never blocks a game action. */ }
  }
  stop() { this.generation++; for(const source of this.active){try{source.stop();}catch{}} this.active=[]; }
  play(correct) {
    const ctx=this.context;if(!ctx||ctx.state!=='running')return;
    this.stop();
    try {
      const gain=ctx.createGain();gain.connect(ctx.destination);
      if(correct) {
        if(!this.applause) {
          // Decode may still be in flight on a slow connection. Cancel pending
          // playback if a reset or a newer result occurs before it completes.
          gain.disconnect();
          const generation=this.generation;
          this.ready?.then(()=>{if(this.applause&&generation===this.generation)this.play(true);});
          return;
        }
        const source=ctx.createBufferSource();source.buffer=this.applause;
        gain.gain.value=.8;source.connect(gain);source.start();
        source.onended=()=>gain.disconnect();this.active.push(source);
      } else {
        const now=ctx.currentTime;
        gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.12,now+.02);
        gain.gain.setValueAtTime(.12,now+.55);gain.gain.linearRampToValueAtTime(0,now+.7);
        for(const frequency of [130,173]) {
          const oscillator=ctx.createOscillator();oscillator.type='sawtooth';
          oscillator.frequency.value=frequency;oscillator.connect(gain);
          oscillator.start(now);oscillator.stop(now+.72);this.active.push(oscillator);
        }
        this.active.at(-1).onended=()=>gain.disconnect();
      }
    } catch { /* A disconnected output must not prevent result rendering. */ }
  }
}
