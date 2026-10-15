// Original synthesized effects; no recordings, downloads or external services.
export class FeedbackAudio {
  constructor(createContext = () => new (globalThis.AudioContext || globalThis.webkitAudioContext)()) {
    this.createContext=createContext; this.context=null; this.applause=null; this.active=[];
  }
  unlock() {
    try {
      this.context ??= this.createContext();
      if(this.context.state==='suspended')this.context.resume().catch(()=>{});
    } catch { /* Audio support is optional; it never blocks a game action. */ }
  }
  stop() { for(const source of this.active){try{source.stop();}catch{}} this.active=[]; }
  play(correct) {
    const ctx=this.context;if(!ctx||ctx.state!=='running')return;
    this.stop();
    try {
      const gain=ctx.createGain();gain.connect(ctx.destination);
      if(correct) {
        if(!this.applause) {
          const duration=2.4, rate=ctx.sampleRate;
          this.applause=ctx.createBuffer(2,Math.ceil(rate*duration),rate);
          // Many short, staggered handclaps with a brief crowd-like decay.
          for(let channel=0;channel<2;channel++) {
            const data=this.applause.getChannelData(channel);
            for(let clap=0;clap<85;clap++) {
              const start=Math.floor((Math.random()*1.85+channel*.004)*rate);
              const amplitude=.2+Math.random()*.35;let previous=0;
              for(let j=0;j<rate*.13&&start+j<data.length;j++) {
                const noise=Math.random()*2-1;
                data[start+j]+=(noise-previous*.65)*Math.exp(-j/(rate*.018))*amplitude;
                previous=noise;
              }
            }
            for(let i=0;i<data.length;i++)data[i]=Math.tanh(data[i]);
          }
        }
        const source=ctx.createBufferSource();source.buffer=this.applause;
        gain.gain.value=.48;source.connect(gain);source.start();
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
