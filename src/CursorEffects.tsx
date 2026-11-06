import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import {gsap} from 'gsap';

export default function CursorEffects(){
 const [enabled,setEnabled]=useState(false);

 useEffect(()=>{
  const finePointer=window.matchMedia('(pointer: fine)');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>setEnabled(finePointer.matches&&!reducedMotion.matches);
  update();
  finePointer.addEventListener('change',update);
  reducedMotion.addEventListener('change',update);
  return()=>{
   finePointer.removeEventListener('change',update);
   reducedMotion.removeEventListener('change',update);
  };
 },[]);

 useEffect(()=>{
  if(!enabled)return;
  const cursor=document.querySelector<HTMLElement>('.custom-cursor');
  const dot=cursor?.querySelector<HTMLElement>('.custom-cursor-dot');
  const ring=cursor?.querySelector<HTMLElement>('.custom-cursor-ring');
  const label=cursor?.querySelector<HTMLElement>('.custom-cursor-label');
  if(!cursor||!dot||!ring||!label)return;
  gsap.set([dot,ring,label],{xPercent:-50,yPercent:-50});
  const dotX=gsap.quickTo(dot,'x',{duration:.01,ease:'none'});
  const dotY=gsap.quickTo(dot,'y',{duration:.01,ease:'none'});
  const ringX=gsap.quickTo(ring,'x',{duration:.16,ease:'power2.out'});
  const ringY=gsap.quickTo(ring,'y',{duration:.16,ease:'power2.out'});
  const labelX=gsap.quickTo(label,'x',{duration:.16,ease:'power2.out'});
  const labelY=gsap.quickTo(label,'y',{duration:.16,ease:'power2.out'});
  document.body.classList.add('has-custom-cursor');
  const move=(event:PointerEvent)=>{
   if(event.pointerType==='touch')return;
   const {clientX,clientY}=event;
   dotX(clientX);
   dotY(clientY);
   const active=document.elementFromPoint(clientX,clientY)?.closest<HTMLElement>('a,button,.project,.skill,.beyond-grid>div');
   if(active){
    cursor.classList.add('is-hovering');
    label.textContent=active.dataset.cursorLabel??(active.matches('button')?'SELECT':'EXPLORE');
    const bounds=active.getBoundingClientRect();
    ringX(clientX+(bounds.left+bounds.width/2-clientX)*.12);
    ringY(clientY+(bounds.top+bounds.height/2-clientY)*.12);
   }else{
    cursor.classList.remove('is-hovering');
    label.textContent='';
    ringX(clientX);
    ringY(clientY);
   }
   labelX(clientX+19);
   labelY(clientY-9);
  };
  const press=()=>cursor.classList.add('is-clicking');
  const release=()=>cursor.classList.remove('is-clicking');
  const leave=()=>cursor.classList.remove('is-hovering','is-clicking');
  window.addEventListener('pointermove',move,{passive:true});
  window.addEventListener('pointerdown',press);
  window.addEventListener('pointerup',release);
  window.addEventListener('pointercancel',release);
  window.addEventListener('blur',leave);
  return()=>{
   window.removeEventListener('pointermove',move);
   window.removeEventListener('pointerdown',press);
   window.removeEventListener('pointerup',release);
   window.removeEventListener('pointercancel',release);
   window.removeEventListener('blur',leave);
   gsap.killTweensOf([dot,ring,label]);
   document.body.classList.remove('has-custom-cursor');
  };
 },[enabled]);

 if(!enabled)return null;
 return createPortal(<div className="custom-cursor" aria-hidden="true"><span className="custom-cursor-dot"/><span className="custom-cursor-ring"/><span className="custom-cursor-label"/></div>,document.body);
}
