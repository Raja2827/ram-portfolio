import {useEffect,useRef} from 'react';
import {gsap} from 'gsap';

type CinematicIntroProps={onDone:()=>void};

const statuses=['Initializing portfolio...','Loading experience...','Preparing design systems...'];

export default function CinematicIntro({onDone}:CinematicIntroProps){
 const root=useRef<HTMLDivElement>(null);
 const skip=useRef<HTMLButtonElement>(null);
 const finished=useRef(false);
 const finishIntro=useRef<()=>void>(()=>{});

 useEffect(()=>{
  const overlay=root.current;
  if(!overlay)return;
  const site=document.querySelector<HTMLElement>('.site-shell');
  const previousInert=site?.inert??false;
  const finish=()=>{if(finished.current)return;finished.current=true;onDone()};
  finishIntro.current=finish;
  if(site)site.inert=true;
  skip.current?.focus();
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
   finish();
   return()=>{finishIntro.current=()=>{};if(site)site.inert=previousInert};
  }
  const context=gsap.context(()=>{
   gsap.timeline({onComplete:finish})
    .from('.init-logo',{scale:.72,opacity:0,duration:.4,ease:'back.out(1.7)'})
    .from('.init-orbit',{rotation:-55,scale:.7,opacity:0,stagger:.1,duration:.48,ease:'power3.out'},'<')
    .from('.init-status',{clipPath:'inset(0 100% 0 0)',opacity:0,stagger:.14,duration:.2,ease:'power2.out'},.16)
    .to('.init-progress-fill',{scaleX:1,duration:.62,ease:'power2.inOut'},.44)
    .to(overlay,{opacity:0,duration:.22,ease:'power2.inOut'},1.3);
  },overlay);
  const onKeyDown=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){finish();return}
   if(event.key==='Tab'){event.preventDefault();skip.current?.focus()}
  };
  overlay.addEventListener('keydown',onKeyDown);
  return()=>{
   overlay.removeEventListener('keydown',onKeyDown);
   context.revert();
   finishIntro.current=()=>{};
   if(site)site.inert=previousInert;
  };
 },[onDone]);

 return <div className="preloader init-overlay" ref={root} role="dialog" aria-modal="true" aria-label="Initializing portfolio">
  <button className="skip init-skip" ref={skip} onClick={()=>finishIntro.current()}>Skip intro <span aria-hidden="true">↗</span></button>
  <div className="init-panel">
   <div className="init-logo"><span className="init-orbit init-orbit-a"/><span className="init-orbit init-orbit-b"/><strong>&lt; RAM /&gt;</strong></div>
   <div className="init-terminal"><span className="init-label"><i/> SYSTEM / INITIALIZE</span>{statuses.map((status,index)=><div className="init-status" key={status}><span>0{index+1}</span><b>{status}</b><i/></div>)}<div className="init-progress"><i className="init-progress-fill"/></div><span className="init-build-label">PREPARING INTERFACE</span></div>
  </div>
 </div>;
}
