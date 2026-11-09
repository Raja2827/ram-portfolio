import {useCallback,useEffect,useLayoutEffect,useRef,useState,type RefObject} from 'react';
import {createPortal} from 'react-dom';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ArrowUpRight,Download,Mail,Linkedin,ExternalLink,Code2,Layers3,Palette,Dumbbell,BookOpen,Menu,X,Briefcase,Globe,ShieldCheck,Clapperboard} from 'lucide-react';
import CinematicIntro from './CinematicIntro';
import CursorEffects from './CursorEffects';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import ServicesSection from './components/ServicesSection';
import ProjectEnquiryForm from './components/ProjectEnquiryForm';
import './contact-layout.css';

gsap.registerPlugin(ScrollTrigger);

function CharacterReveal({text,wrapWords=true}:{text:string;wrapWords?:boolean}){
 const words=wrapWords?text.split(' '):[];
 return <span className="character-reveal" role="text" aria-label={text}>{wrapWords?words.map((word,wordIndex)=><span className="reveal-word" key={`word-${wordIndex}`}>{Array.from(word).map((character,index)=><span className="reveal-character" aria-hidden="true" key={`${character}-${index}`}>{character}</span>)}</span>):Array.from(text).map((character,index)=><span className="reveal-character" aria-hidden="true" key={`${character}-${index}`}>{character===' '?' ':character}</span>)}</span>;
}
function ConstructionGuides(){return <><svg className="construction-outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><rect x=".5" y=".5" width="99" height="99"/></svg><span className="construction-handles" aria-hidden="true">{Array.from({length:8},(_,index)=><i key={index}/>)}</span></>}
function SectionFrame(){return <><svg className="construction-outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><rect x=".5" y=".5" width="99" height="99"/></svg><span className="construction-handles" aria-hidden="true">{Array.from({length:8},(_,index)=><i key={index}/>)}</span></>}
const agentNames=['design','content','media','motion'] as const;
type AgentName=typeof agentNames[number];
function ConstructionAgents({containerRef}:{containerRef:RefObject<HTMLDivElement>}){return createPortal(<div className="construction-agents" ref={containerRef} aria-hidden="true"><i className="construction-connector"/>{agentNames.map(agent=><span className={`construction-agent agent-${agent}`} data-agent={agent} key={agent}><i/></span>)}</div>,document.body)}
const jobs=[
{role:'Technology Lead',company:'Infosys Limited',date:'Sep 2024 — Oct 2026',description:'Led frontend delivery for seven developers across enterprise web implementations. Guided architecture, estimation, code reviews, mentoring, demos, accessibility and release quality.'},
{role:'Senior Information Technology Analyst',company:'Infosys Limited',date:'Apr 2022 — Sep 2024',description:'Built responsive enterprise CMS interfaces and React components integrated into Sitecore pages. Collaborated across UX, engineering and QA.'},
{role:'UI/UX Design & Frontend Technical Lead',company:'SPARC Private Limited',date:'Jan 2018 — Apr 2022',description:'Designed and built government and enterprise portals, mobile UI/UX, wireframes and multimedia assets. Guided 2–3 junior developers.'},
{role:'Earlier Frontend & Web Design Roles',company:'CSM Technologies · AABSyS IT · Skylite Web',date:'Jun 2015 — Dec 2017',description:'Responsive web design, JavaScript, jQuery, Bootstrap, WordPress, OpenCart and cross-browser delivery.'}
];
const projects=[
{tag:'DRUPAL · ENTERPRISE',title:'Altera.com Redesign',desc:'Reusable Drupal/Twig components, SCSS architecture, responsive navigation and frontend release quality.'},
{tag:'REACT · SITECORE',title:'Littelfuse CMS Integration',desc:'Developed React UI components and integrated interactive experiences into Sitecore enterprise pages.'},
{tag:'IDENTITY · SEARCH',title:'Enterprise Integrations',desc:'Shared global header/footer, Okta/MyAltera session flows and Vectara/Fluid Topics search experiences.'},
{tag:'UI/UX · PUBLIC SECTOR',title:'SPARC Design & Portals',desc:'Government and enterprise web portals, mobile app interface design, UX wireframes and GIS visualizations.'}
];
const stats=[
 {value:'11+',count:11,suffix:'+',label:'Years of Industry Experience',description:'Frontend engineering, UI/UX & technical leadership',icon:Briefcase},
 {value:'~50',count:50,prefix:'~',label:'Websites, Apps & CMS Solutions',description:'Drupal, Sitecore, React & enterprise platforms',icon:Globe},
 {value:'3 Core',label:'Frontend Quality Standards',description:'Figma fidelity · WCAG accessibility · web performance',icon:ShieldCheck},
 {value:'100+',count:100,suffix:'+',label:'Creative Design Works',description:'Graphics, UI designs & video editing',icon:Clapperboard}
];
function App(){
 const [intro,setIntro]=useState(true);
 const [menu,setMenu]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const buildTargets=useRef<Record<string,HTMLElement|null>>({});
 const animatedSections=useRef(new WeakSet<HTMLElement>());
 const constructionAgents=useRef<HTMLDivElement>(null);
 const assignHeroTarget=(name:string)=>(element:HTMLElement|null)=>{buildTargets.current[name]=element};
 const endIntro=useCallback(()=>setIntro(false),[]);
 useEffect(()=>{const updateScroll=()=>setScrolled(window.scrollY>12);updateScroll();window.addEventListener('scroll',updateScroll,{passive:true});return()=>window.removeEventListener('scroll',updateScroll)},[]);
 useEffect(()=>{if(!intro)return;const bodyOverflow=document.body.style.overflow;const htmlOverflow=document.documentElement.style.overflow;document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';return()=>{document.body.style.overflow=bodyOverflow;document.documentElement.style.overflow=htmlOverflow}},[intro]);
 useLayoutEffect(()=>{
  const site=document.querySelector<HTMLElement>('.site-shell');
  if(!site)return;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let refreshFrame=0;
  const animationCleanups:(()=>void)[]=[];
  const context=gsap.context(()=>{
   const targets=buildTargets.current;
   const heroTargets=['hello','hero-title','role','heroSummary','actions','metrics','portrait'].map(key=>targets[key]).filter((item):item is HTMLElement=>Boolean(item));
   if(intro){
    if(!reducedMotion)gsap.set(heroTargets,{autoAlpha:0,y:18});
    return;
   }
   if(reducedMotion){
    return;
   }
   const compactMotion=window.matchMedia('(max-width: 767px)').matches;
   const portraitFrameTime=compactMotion?1.22:1.42;
   const portraitRevealTime=compactMotion?1.52:1.78;
   const roleRevealTime=compactMotion?1.88:2.18;
   const summaryRevealTime=compactMotion?2.12:2.42;
   const actionsRevealTime=compactMotion?2.48:2.82;
   const statsRevealTime=compactMotion?3.02:3.42;
   const guideCleanupTime=compactMotion?3.78:4.2;
   const agentElements:Record<AgentName,HTMLElement|null>={
    design:constructionAgents.current?.querySelector<HTMLElement>('[data-agent="design"]')??null,
    content:constructionAgents.current?.querySelector<HTMLElement>('[data-agent="content"]')??null,
    media:constructionAgents.current?.querySelector<HTMLElement>('[data-agent="media"]')??null,
    motion:constructionAgents.current?.querySelector<HTMLElement>('[data-agent="motion"]')??null
   };
   gsap.set(Object.values(agentElements).filter((agent):agent is HTMLElement=>Boolean(agent)),{autoAlpha:0});
   const hero=gsap.timeline();
   const heroFrame=site.querySelector<HTMLElement>('.hero-copy[data-construction-frame]');
   const portraitFrame=site.querySelector<HTMLElement>('.hero-portrait[data-construction-frame]');
   const metricItems=Array.from(targets.metrics?.querySelectorAll<HTMLElement>('.metric')??[]);
   const metricGuides=metricItems.flatMap(item=>Array.from(item.querySelectorAll<HTMLElement>('.construction-outline,.construction-handles')));
   const metricGuideRects=metricItems.flatMap(item=>Array.from(item.querySelectorAll<SVGRectElement>('.construction-outline rect')));
   const heroFrames=[heroFrame,portraitFrame].filter((frame):frame is HTMLElement=>Boolean(frame));
   const guideElements=heroFrames.flatMap(frame=>Array.from(frame.querySelectorAll<HTMLElement>('.construction-outline,.construction-handles')));
   const guideRects=heroFrames.flatMap(frame=>Array.from(frame.querySelectorAll<SVGRectElement>('.construction-outline rect')));
   const connector=constructionAgents.current?.querySelector<HTMLElement>('.construction-connector');
   guideRects.forEach(rect=>{const length=rect.getTotalLength();gsap.set(rect,{strokeDasharray:length,strokeDashoffset:length})});
   metricGuideRects.forEach(rect=>{const length=rect.getTotalLength();gsap.set(rect,{strokeDasharray:length,strokeDashoffset:length})});
   gsap.set([...guideElements,...metricGuides],{autoAlpha:0});
   const aimAgent=(timeline:gsap.core.Timeline,agentName:AgentName,target:Element|null,time:number,duration=.28)=>{
    if(compactMotion)return;
    const cursor=agentElements[agentName];
    if(!cursor||!target)return;
    const bounds=target.getBoundingClientRect();
    timeline.to(cursor,{autoAlpha:1,x:bounds.left+bounds.width/2,y:bounds.top+bounds.height/2,duration,ease:'power2.inOut'},time);
    timeline.to(cursor,{scale:.72,duration:.07,repeat:1,yoyo:true,ease:'power1.inOut'},time+duration-.02);
   };
   const drawFrame=(timeline:gsap.core.Timeline,frame:HTMLElement|null,time:number)=>{
    if(!frame)return time;
    const outline=frame.querySelector<HTMLElement>('.construction-outline');
    const rect=frame.querySelector<SVGRectElement>('.construction-outline rect');
    const handles=frame.querySelector<HTMLElement>('.construction-handles');
    timeline.to([outline,handles].filter(Boolean),{autoAlpha:1,duration:.1},time);
    if(rect)timeline.to(rect,{strokeDashoffset:0,duration:.32,ease:'power2.inOut'},time+.04);
    if(handles)timeline.fromTo(handles.querySelectorAll('i'),{scale:0},{scale:1,duration:.14,stagger:.018,ease:'back.out(2)'},time+.28);
    return time+.5;
   };
   aimAgent(hero,'design',heroFrame,.02);
   drawFrame(hero,heroFrame,.32);
   aimAgent(hero,'content',targets.hello,.22);
   aimAgent(hero,'content',targets['hero-title'],.88,.2);
   aimAgent(hero,'content',targets.heroSummary,summaryRevealTime-.12,.2);
   aimAgent(hero,'media',portraitFrame,portraitFrameTime);
   drawFrame(hero,portraitFrame,portraitFrameTime);
   aimAgent(hero,'motion',targets.actions,actionsRevealTime-.12,.2);
   const titleCharacters=targets['hero-title']?.querySelectorAll('.reveal-character')??[];
   const roleCharacters=targets.role?.querySelectorAll('.reveal-character')??[];
   const summaryCharacters=targets.heroSummary?.querySelectorAll('.reveal-character')??[];
   const actionButtons=targets.actions?.querySelectorAll('.btn')??[];
   const metricCounters=Array.from(targets.metrics?.querySelectorAll<HTMLElement>('.metric-value[data-count]')??[]);
   metricItems.forEach(item=>gsap.set(item.querySelectorAll(':scope > svg:not(.construction-outline):not(.construction-handles),:scope > div'),{autoAlpha:0}));
   hero.fromTo(targets.hello,{autoAlpha:0,y:8},{autoAlpha:1,y:0,duration:.2,ease:'power2.out'},.7)
    .fromTo(targets['hero-title'],{autoAlpha:0},{autoAlpha:1,duration:.01},.88)
    .fromTo(titleCharacters,{yPercent:90,opacity:0},{yPercent:0,opacity:1,duration:.38,stagger:.02,ease:'power3.out'},.9)
    .fromTo(targets.role,{autoAlpha:0},{autoAlpha:1,duration:.01},roleRevealTime)
    .fromTo(roleCharacters,{yPercent:70,opacity:0},{yPercent:0,opacity:1,duration:.28,stagger:.014,ease:'power2.out'},roleRevealTime+.02)
    .fromTo(targets.heroSummary,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.28,ease:'power2.out'},summaryRevealTime)
    .fromTo(summaryCharacters,{autoAlpha:0,yPercent:35},{autoAlpha:1,yPercent:0,duration:.28,stagger:.004,ease:'power2.out'},summaryRevealTime+.01)
    .fromTo(targets.actions,{autoAlpha:0},{autoAlpha:1,duration:.01},actionsRevealTime)
    .fromTo(actionButtons,{autoAlpha:0,y:14,scale:.97},{autoAlpha:1,y:0,scale:1,duration:.3,stagger:.08,ease:'back.out(1.4)'},actionsRevealTime+.03)
    .fromTo(targets.metrics,{autoAlpha:0},{autoAlpha:1,duration:.01},statsRevealTime);
   metricItems.forEach((item,index)=>{
    const frameContentTime=drawFrame(hero,item,statsRevealTime+.02+index*.12);
    const content=item.querySelectorAll(':scope > svg:not(.construction-outline):not(.construction-handles),:scope > div');
    const contentEnd=frameContentTime+.65;
    hero.fromTo(content,{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.65,ease:'power2.out',onComplete:()=>gsap.set(content,{clearProps:'transform,opacity,visibility'})},frameContentTime);
    const outline=item.querySelector<HTMLElement>(':scope > .construction-outline');
    const handles=item.querySelector<HTMLElement>(':scope > .construction-handles');
    if(outline)hero.to(outline,{autoAlpha:0,duration:.18},contentEnd);
    if(handles)hero.to(handles,{autoAlpha:0,duration:.18},contentEnd);
   });
   metricCounters.forEach((element,index)=>{
    const counter={value:0};
    hero.fromTo(counter,{value:0},{value:Number(element.dataset.count),duration:.65,ease:'power1.out',onUpdate:()=>{
     element.textContent=`${element.dataset.prefix??''}${Math.round(counter.value)}${element.dataset.suffix??''}`;
    }},statsRevealTime+1.35+index*.08);
   });
   aimAgent(hero,'media',targets.portrait,portraitRevealTime);
   if(!compactMotion&&connector&&heroFrame&&portraitFrame){
    const heroBounds=heroFrame.getBoundingClientRect();
    const portraitBounds=portraitFrame.getBoundingClientRect();
    const connectorWidth=portraitBounds.left-heroBounds.right;
    if(connectorWidth>0){
     gsap.set(connector,{left:heroBounds.right,top:heroBounds.top+heroBounds.height*.45,width:connectorWidth,scaleX:0,transformOrigin:'left center'});
     hero.to(connector,{autoAlpha:1,scaleX:1,duration:.36,ease:'power2.inOut'},portraitFrameTime-.1).to(connector,{autoAlpha:0,duration:.16},portraitRevealTime);
    }
   }
   if(targets.portrait){
    hero.fromTo(targets.portrait,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.28,ease:'power2.out'},portraitRevealTime);
    const portraitImages=targets.portrait.querySelectorAll('img');
    if(portraitImages.length)hero.fromTo(portraitImages,{autoAlpha:0,clipPath:'inset(0 100% 0 0)'},{autoAlpha:1,clipPath:'inset(0 0% 0 0)',duration:.48,ease:'power3.inOut'},portraitRevealTime+.25);
   }
   hero.to(guideElements,{autoAlpha:0,duration:.18},guideCleanupTime);
   if(connector)hero.to(connector,{autoAlpha:0,duration:.16},guideCleanupTime);
   Object.values(agentElements).forEach(agent=>{if(agent)hero.to(agent,{autoAlpha:0,duration:.18},guideCleanupTime)});
   const drawSectionFrame=(timeline:gsap.core.Timeline,frame:HTMLElement,position=0)=>{
    const outline=frame.querySelector<HTMLElement>(':scope > .construction-outline');
    const rect=outline?.querySelector<SVGRectElement>('rect');
    if(!outline||!rect)return;
    const handles=frame.querySelector<HTMLElement>(':scope > .construction-handles');
    const length=rect.getTotalLength();
    gsap.set(rect,{strokeDasharray:length,strokeDashoffset:length});
    timeline.to(outline,{autoAlpha:1,duration:.08},position);
    timeline.to(rect,{strokeDashoffset:0,duration:.32,ease:'power2.inOut'},position+.04);
    if(handles){
     timeline.to(handles,{autoAlpha:1,duration:.08},position+.28);
     timeline.fromTo(handles.querySelectorAll('i'),{scale:0},{scale:1,duration:.14,stagger:.018,ease:'back.out(2)'},position+.28);
    }
    return position+.36;
   };
   const fadeSectionFrame=(timeline:gsap.core.Timeline,frame:HTMLElement,position:number)=>{
    const outline=frame.querySelector<HTMLElement>(':scope > .construction-outline');
    const handles=frame.querySelector<HTMLElement>(':scope > .construction-handles');
    if(outline)timeline.to(outline,{autoAlpha:0,duration:.18},position);
    if(handles)timeline.to(handles,{autoAlpha:0,duration:.18},position);
   };
   const revealCards=(timeline:gsap.core.Timeline,section:HTMLElement,selector:string,contentSelector:string,position=.5,duration=.55,stagger=.12,y=14)=>{
    const cards=Array.from(section.querySelectorAll<HTMLElement>(selector));
    cards.forEach((card,index)=>{
     const cardStart=position+index*stagger;
     const content=Array.from(card.querySelectorAll<HTMLElement>(contentSelector));
     if(content.length)timeline.fromTo(content,{autoAlpha:0,y},{autoAlpha:1,y:0,duration,ease:'power2.out',immediateRender:false,onComplete:()=>gsap.set(content,{clearProps:'transform,opacity,visibility'})},cardStart);
    });
   };
   const reveal=(timeline:gsap.core.Timeline,section:HTMLElement,selector:string,duration=.65,stagger=.12,y=16,position=0)=>{
    const elements=Array.from(section.querySelectorAll<HTMLElement>(selector));
    if(elements.length)gsap.set(elements,{autoAlpha:0});
    if(elements.length)timeline.fromTo(elements,{autoAlpha:0,y},{autoAlpha:1,y:0,duration,stagger,ease:'power2.out',immediateRender:false,onComplete:()=>gsap.set(elements,{clearProps:'transform,opacity,visibility'})},position);
   };
   const onSectionEnter=(section:HTMLElement,build:(timeline:gsap.core.Timeline)=>void,start='top 82%')=>{
    if(animatedSections.current.has(section))return;
    let timeline:gsap.core.Timeline|undefined;
    const trigger=ScrollTrigger.create({trigger:section,start,once:true,onEnter:()=>{animatedSections.current.add(section);timeline=gsap.timeline();build(timeline)}});
    animationCleanups.push(()=>{trigger.kill();timeline?.kill()});
   };
   const about=site.querySelector<HTMLElement>('#about');
   if(about)onSectionEnter(about,timeline=>{
    const heading=about.querySelector<HTMLElement>('.about-heading');
    const headingEnd=heading?drawSectionFrame(timeline,heading)??0:0;
    reveal(timeline,about,'.about-eyebrow,.about-title,.about-subtitle',.55,.08,14,headingEnd);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    reveal(timeline,about,'.about-story p',.55,.12,14,headingEnd+.42);
    const line=about.querySelector<HTMLElement>('.about-timeline-line');
    if(line)timeline.fromTo(line,{scaleY:0},{scaleY:1,duration:.9,ease:'power2.out',transformOrigin:'top center',immediateRender:false},headingEnd+.85);
    reveal(timeline,about,'.about-milestone',.48,.14,12,headingEnd+.9);
    reveal(timeline,about,'.about-quote p',.65,0,12,headingEnd+1.6);
   });
   const experience=site.querySelector<HTMLElement>('#experience');
   if(experience)onSectionEnter(experience,timeline=>{
    const heading=experience.querySelector<HTMLElement>('.section-heading');
    const headingEnd=heading?drawSectionFrame(timeline,heading)??0:0;
    reveal(timeline,experience,'.section-heading .eyebrow,.section-heading h2',.55,.08,14,headingEnd);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    revealCards(timeline,experience,'.job','.job-date,.job-body',headingEnd+.42,.6,.16,14);
   });
   const projectsSection=site.querySelector<HTMLElement>('#projects');
   if(projectsSection)onSectionEnter(projectsSection,timeline=>{
    const heading=projectsSection.querySelector<HTMLElement>('.section-heading');
    const headingEnd=heading?drawSectionFrame(timeline,heading)??0:0;
    reveal(timeline,projectsSection,'.section-heading .eyebrow,.section-heading h2',.55,.08,14,headingEnd);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    revealCards(timeline,projectsSection,'.project','.project-art,.project-content',headingEnd+.42,.6,.14,16);
    reveal(timeline,projectsSection,'.disclaimer',.45,0,10,headingEnd+1.25);
   });
   const skills=site.querySelector<HTMLElement>('#skills');
   if(skills)onSectionEnter(skills,timeline=>{
    const frame=skills.querySelector<HTMLElement>('.container');
    const heading=skills.querySelector<HTMLElement>('.section-heading');
    const headingEnd=heading?drawSectionFrame(timeline,heading)??0:0;
    reveal(timeline,skills,'.section-heading .eyebrow,.section-heading h2',.55,.08,14,headingEnd);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    if(frame)revealCards(timeline,frame,'.skill','svg:not(.construction-outline),h3,p',headingEnd+.42,.55,.12,14);
   });
   const beyond=site.querySelector<HTMLElement>('#beyond');
   if(beyond)onSectionEnter(beyond,timeline=>{
    const heading=beyond.querySelector<HTMLElement>('.section-heading');
    const headingEnd=heading?drawSectionFrame(timeline,heading)??0:0;
    reveal(timeline,beyond,'.section-heading .eyebrow,.section-heading h2',.55,.08,14,headingEnd);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    if(heading)fadeSectionFrame(timeline,heading,headingEnd+.68);
    reveal(timeline,beyond,'.beyond-intro-content',.55,0,14,headingEnd+.42);
    revealCards(timeline,beyond,'.beyond-grid>div','svg:not(.construction-outline),h3,p,a,.coming-soon',headingEnd+.75,.55,.14,14);
   });
   const contact=site.querySelector<HTMLElement>('#contact');
   if(contact)onSectionEnter(contact,timeline=>{
    const heading=contact.querySelector<HTMLElement>('.contact-heading');
    const contentStart=heading?drawSectionFrame(timeline,heading)??0:0;
    reveal(timeline,contact,'.eyebrow,h2',.6,.08,14,contentStart);
    reveal(timeline,contact,'.contact-email,.socials a',.55,.1,12,contentStart+.2);
    if(heading)fadeSectionFrame(timeline,heading,contentStart+.7);
   });
   const footer=site.querySelector<HTMLElement>('.footer');
   if(footer)onSectionEnter(footer,timeline=>{
    reveal(timeline,footer,'.footer > span,.footer > button',.5,.08,8,0);
   },'top 94%');
   refreshFrame=requestAnimationFrame(()=>ScrollTrigger.refresh());
  },site);
  return()=>{if(refreshFrame)cancelAnimationFrame(refreshFrame);animationCleanups.forEach(cleanup=>cleanup());context.revert()};
 },[intro]);
 const replayIntro=()=>{window.scrollTo({top:0,behavior:'instant'});setIntro(true)};
 return <>{intro&&<CinematicIntro onDone={endIntro}/>}<div className={`site-shell${intro?' is-building':''}`}>
 <header ref={assignHeroTarget('navigation')} className={`nav${scrolled?' nav-scrolled':''}`}><a className="logo" href="#home">&lt; RAM /&gt;</a><nav id="primary-navigation" aria-label="Main navigation" className={menu?'nav-open':''}>{[['Why Me','#why-work-with-me'],['Services','#services'],['About','#about'],['Experience','#experience'],['Projects','#projects'],['Skills','#skills'],['Beyond Code','#beyond']].map(([label,href])=><a onClick={()=>setMenu(false)} key={label} href={href}>{label}</a>)}<a onClick={()=>setMenu(false)} className="contact-nav mobile-contact" href="#contact">Contact Me</a></nav><a className="contact-nav desktop-contact" href="#contact">Contact Me</a><button className="mobile-menu" aria-label="Toggle menu" aria-controls="primary-navigation" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <main id="home"><section className="hero container" data-motion-section>
  <div className="hero-layout">
   <div className="hero-copy construction-frame" data-construction-frame ref={assignHeroTarget('heroFrame')}>
    <ConstructionGuides/>
    <div className="hero-content">
     <p className="hello" ref={assignHeroTarget('hello')} data-motion-content><CharacterReveal text="HELLO, I'M"/></p>
     <h1 className="hero-title" ref={assignHeroTarget('hero-title')} data-motion-content><span className="hero-heading-line"><span className="hero-name-raja"><CharacterReveal text="RAJA"/></span><span className="hero-name-asutosh"><CharacterReveal text="ASUTOSH"/></span></span><span className="hero-heading-line hero-name-mishra"><CharacterReveal text="MISHRA"/></span></h1>
     <div className="role" ref={assignHeroTarget('role')} data-motion-content><span/><CharacterReveal text="Frontend Technology Lead"/></div>
     <p className="hero-summary" ref={assignHeroTarget('heroSummary')} data-motion-content><CharacterReveal text="I turn Figma designs into responsive, accessible, production-ready web experiences — combining creative design understanding, 11+ years of frontend engineering, and enterprise delivery experience." wrapWords/></p>
     <div className="hero-actions" ref={assignHeroTarget('actions')} data-motion-content><a className="btn primary" href="#contact">Discuss a Project <ArrowUpRight size={18}/></a><a className="btn outline" href="/Raja_Asutosh_Mishra_Resume.docx" download><Download size={17}/> Download Resume</a><a className="positioning-project-link" href="#projects">View Projects</a></div>
    </div>
    </div>
    <figure className="hero-portrait construction-frame" data-construction-frame ref={assignHeroTarget('portrait')}>
    <ConstructionGuides/>
    <div className="portrait-circle-base">
     <img src="/images/raja-hero.png" alt="Raja Asutosh Mishra with hands raised, illuminated by red rim lighting" />
    </div>
    <div className="portrait-popout" aria-hidden="true">
     <img src="/images/raja-hero.png" alt="" />
    </div>
    </figure>
   </div>
   <div className="metrics" ref={assignHeroTarget('metrics')} data-motion-content aria-label="Career statistics">{stats.map(({value,count,prefix,suffix,label,description,icon:Icon})=><div className="metric construction-frame" key={label}><SectionFrame/><Icon aria-hidden="true"/><div><strong className="metric-value" data-count={count} data-prefix={prefix} data-suffix={suffix}>{value}</strong><span>{label}</span><span>{description}</span></div></div>)}</div>
 </section>
 <WhyWorkWithMe/>
 <ServicesSection/>
 <section id="about" className="section container about-section" data-motion-section>
  <div className="section-heading about-heading construction-frame"><SectionFrame/>
   <span className="eyebrow about-eyebrow">01 / ABOUT ME</span>
   <h2 className="about-title"><CharacterReveal text="Building Experience,"/><br/><em><CharacterReveal text="Leading With Purpose."/></em></h2>
   <p className="about-subtitle">A father's simple dream. A childhood passion for creativity. A journey that became a purpose.</p>
  </div>
  <div className="about-content-grid">
   <div className="about-story">
    <p>My father had a simple dream for me — to see me working in an air-conditioned office, confidently using a computer and building a better future.</p>
    <p>My connection with creativity began much earlier. As a child, I loved colors and drawing, and I completed a Diploma in Fine Arts around Class 10. Financial challenges meant professional design training wasn't an option, but my interest in creating never faded.</p>
    <p>My career began in 2011, far from the technology industry. I worked in customer care, surveys, and insurance, while also teaching students to support myself.</p>
    <p>In 2015, after graduation, I discovered web development. Writing my first lines of HTML and seeing a webpage come alive connected my artistic instincts with technology.</p>
    <p>What started with designing websites evolved into 11+ years of building digital experiences — from responsive websites and CMS platforms to enterprise applications.</p>
    <p>As my responsibilities grew, I moved from building interfaces to guiding developers, making technical decisions, and improving accessibility, performance, and delivery quality.</p>
    <p>Today, I combine frontend engineering, UI/UX thinking, creative design, and technical leadership — still driven by the same curiosity that started it all.</p>
   </div>
   <div className="about-journey">
    <h3 className="about-timeline-heading">Career Journey</h3>
    <div className="about-timeline">
     <span className="about-timeline-line" aria-hidden="true"/>
     <ol className="about-timeline-list">
      <li className="about-milestone"><span className="about-milestone-marker" aria-hidden="true"/><div><span className="about-milestone-year">CHILDHOOD</span><h4>Fine Arts &amp; Creativity</h4><p>Discovered a passion for colors, drawing, and visual storytelling.</p></div></li>
      <li className="about-milestone"><span className="about-milestone-marker" aria-hidden="true"/><div><span className="about-milestone-year">2011–2014</span><h4>Responsibility &amp; Independence</h4><p>Worked in customer care, surveys, insurance, and private tuition while pursuing education.</p></div></li>
      <li className="about-milestone"><span className="about-milestone-marker" aria-hidden="true"/><div><span className="about-milestone-year">2015</span><h4>Discovering Web Development</h4><p>After graduation, began a professional journey in web design, bringing creativity and technology together.</p></div></li>
      <li className="about-milestone"><span className="about-milestone-marker" aria-hidden="true"/><div><span className="about-milestone-year">2015–TODAY</span><h4>Engineering &amp; Leadership</h4><p>Grew into frontend engineering, CMS development, UI/UX, accessibility, performance optimization, and technical leadership.</p></div></li>
     </ol>
    </div>
   </div>
  </div>
  <blockquote className="about-quote"><p>What began as my father's dream became a purpose of my own: to <em>build experiences that matter</em>.</p></blockquote>
 </section>
 <section id="experience" className="section section-dark" data-motion-section><div className="container"><div className="section-heading construction-frame"><SectionFrame/><span className="eyebrow">02 / CAREER JOURNEY</span><h2><CharacterReveal text="Experience that"/><br/><em><CharacterReveal text="ships."/></em></h2></div><div className="timeline">{jobs.map((j,i)=><article className="job" key={i}><div className="job-date">{j.date}</div><div className="job-body"><h3><CharacterReveal text={j.role}/></h3><div className="company">{j.company}</div><p>{j.description}</p></div></article>)}</div></div></section>
 <section id="projects" className="section container" data-motion-section><div className="section-heading construction-frame"><SectionFrame/><span className="eyebrow">03 / SELECTED WORK</span><h2><CharacterReveal text="Work behind"/><br/><em><CharacterReveal text="the interfaces."/></em></h2></div><div className="project-grid">{projects.map((p,i)=><article className="project" key={p.title}><div className="project-art"><span className="project-index">0{i+1}</span><Code2 size={56} strokeWidth={.8}/><span className="project-watermark">RAM / {i+1}</span></div><div className="project-content"><span className="eyebrow">{p.tag}</span><h3><CharacterReveal text={p.title}/></h3><p>{p.desc}</p></div></article>)}</div><p className="disclaimer">Project summaries reflect professional contributions. Client assets are not reproduced here.</p></section>
 <section id="skills" className="section section-dark" data-motion-section><div className="container"><div className="section-heading construction-frame"><SectionFrame/><span className="eyebrow">04 / MY TOOLKIT</span><h2><CharacterReveal text="Versatility is"/><br/><em><CharacterReveal text="my advantage."/></em></h2></div><div className="skill-grid">{[['Frontend','HTML5 · CSS3 · SCSS · JavaScript · React · Bootstrap · jQuery'],['CMS & Integrations','Drupal · Twig · Sitecore · WordPress · REST APIs · Okta · Vectara'],['Leadership','Team mentoring · Architecture · Code reviews · Estimates · Client demos'],['Quality & Design','WCAG · Lighthouse · Responsive UI · Figma · Storybook · Adobe Creative Suite']].map(([a,b])=><div className="skill" key={a}><Layers3 size={22}/><h3><CharacterReveal text={a}/></h3><p>{b}</p></div>)}</div></div></section>
 <section id="beyond" className="section container" data-motion-section><div className="section-heading construction-frame"><SectionFrame/><span className="eyebrow">05 / BEYOND THE CODE</span><h2><CharacterReveal text="One person."/><br/><em><CharacterReveal text="Many disciplines."/></em></h2></div><p className="beyond-intro"><span className="beyond-intro-content">Engineering is one part of my story. Design, natural bodybuilding and creative experimentation shape how I think, work and grow.</span></p><div className="beyond-grid">{[<><Palette/><h3><CharacterReveal text="Design Studio"/></h3><p>UI/UX, graphics, motion and visual storytelling.</p><a href="https://www.behance.net/RajaAsutosh" target="_blank" rel="noreferrer">Explore Behance <ExternalLink size={15}/></a></>,<><Dumbbell/><h3><CharacterReveal text="The Old School Fitness"/></h3><p>Natural bodybuilding, discipline and training.</p><a href="https://www.youtube.com/@TOSFitness" target="_blank" rel="noreferrer">Watch TOS Fitness <ExternalLink size={15}/></a></>,<><BookOpen/><h3><CharacterReveal text="My Story"/></h3><p>A growing archive of lessons, experiments and milestones.</p><span className="coming-soon">More stories coming soon</span></>].map((card,i)=><div key={i}>{card}</div>)}</div></section>
 <section className="contact-section" id="contact" data-motion-section><div className="container contact-layout"><div className="contact-copy"><div className="contact-heading construction-frame"><SectionFrame/><span className="eyebrow">06 / LET'S CONNECT</span><h2><CharacterReveal text="Have a project in mind?"/><br/><em><CharacterReveal text="Let's build it."/></em></h2></div><p className="contact-supporting">Share your design, requirements, or an existing website that needs improvement. I'll review the details and connect with you to discuss the next steps.</p><a className="contact-email" href="mailto:raja.asutosh1992@gmail.com">Let's talk <ArrowUpRight/></a><div className="socials"><a href="mailto:raja.asutosh1992@gmail.com"><Mail size={17}/> Email</a><a href="https://www.linkedin.com/in/raja-asutosh-mishra-664722b3" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><a href="https://www.behance.net/RajaAsutosh" target="_blank" rel="noreferrer"><Palette size={17}/> Behance</a><a href="/Raja_Asutosh_Mishra_Resume.docx" download><Download size={17}/> Download Resume</a></div></div><ProjectEnquiryForm/></div></section></main><footer className="footer container"><span>© {new Date().getFullYear()} Raja Asutosh Mishra</span><button onClick={replayIntro}>Replay intro ↗</button></footer></div>{!intro&&<CursorEffects/>}{!intro&&<ConstructionAgents containerRef={constructionAgents}/>}</>
}
export default App;
